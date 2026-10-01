/**
 * Celestial bodies at true scale.
 *
 * Each body is an analytic ray-cast sphere/spheroid ("impostor"): a coarse
 * proxy mesh is drawn in scaled space (placed at a fixed render distance along
 * the true direction and scaled so its angular size is exact), and the
 * fragment shader intersects the eye ray with the true body using a ray origin
 * computed on the CPU in double precision. Silhouettes are therefore exact at
 * any distance — from a sub-pixel dot to a limb that fills the whole field of
 * view — and both eyes share the physical origin (no false hyper-stereo: at
 * astronomical distances real parallax between your eyes is ~0).
 *
 * All shading is in absolute photometric units (cd/m²) multiplied by the
 * global exposure, then tone-mapped.
 */
import * as THREE from 'three';
import { BB_GLSL } from './blackbody';
import { NOISE_GLSL } from './glsl';

export const RENDER_DISTANCE = 2000; // m, scaled-space placement radius

const VERT = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const COMMON = /* glsl */ `
uniform sampler2D uBB;
uniform float uExposure;
uniform mat3 uToBody;       // scene (ship) frame → body-fixed frame
uniform vec3 uOrigin;       // eye position relative to body centre, body-fixed, in equatorial radii
uniform float uC;           // |origin|^2 - 1, computed in double precision on the CPU
uniform float uFlat;        // flattening (a - c)/a
uniform vec3 uSunDir;       // body-fixed unit vector toward the star (planets/moons)
uniform float uSunE;        // illuminance from the star at the body (lux)
uniform float uSunT;        // star temperature (K)
uniform float uSunAng;      // star angular radius seen from the body (rad)
uniform float uTime;        // simulation time (s)
uniform float uRadius;      // equatorial radius (m)
uniform float uPixelAngle;  // rad per pixel (approx)
uniform vec4 uOcc[4];       // occluders: centre (body-fixed, radii) + radius (radii)
uniform int uOccN;
varying vec3 vWorld;
${NOISE_GLSL}
${BB_GLSL}

vec3 rayDir() { return normalize(uToBody * normalize(vWorld - cameraPosition)); }

// sun visibility from point p (body-fixed, radii) given occluding spheres
float sunVisibility(vec3 p) {
  float vis = 1.0;
  for (int i = 0; i < 4; i++) {
    if (i >= uOccN) break;
    vec3 c = uOcc[i].xyz - p;
    float dist = length(c);
    if (dot(c, uSunDir) <= 0.0) continue;
    float ang = acos(clamp(dot(c / dist, uSunDir), -1.0, 1.0));
    float rOcc = asin(clamp(uOcc[i].w / dist, 0.0, 1.0));
    float rs = max(uSunAng, 1e-5);
    // fraction of the solar disk hidden (smooth overlap approximation)
    float cover = 1.0 - smoothstep(abs(rOcc - rs), rOcc + rs, ang);
    float maxCover = min(1.0, (rOcc * rOcc) / (rs * rs));
    vis *= 1.0 - cover * maxCover;
  }
  return vis;
}

vec3 sunColor() { return bbChroma(uSunT); }

vec4 finish(vec3 radiance, float alpha) {
  return vec4(radiance * uExposure, alpha);
}
`;

const PLANET_FRAG = /* glsl */ `
${COMMON}
uniform int uStyle;          // 0 jupiter, 1 io, 2 europa, 3 ganymede, 4 callisto
uniform vec3 uAlbedo;
uniform float uAtmTop;       // shell top above surface (radii)
uniform float uAtmH;         // scale height (radii)
uniform float uAtmTau;       // vertical optical depth at the reference level

float bandProfile(float lat) {
  // Jupiter's belts (dark) and zones (light), latitudes in degrees, smoothed
  float d = degrees(lat);
  float v = 0.0;
  v += smoothstep(6.0, 8.0, d) * (1.0 - smoothstep(17.0, 19.0, d));       // NEB
  v += 0.8 * smoothstep(24.0, 25.5, d) * (1.0 - smoothstep(29.0, 31.0, d)); // NTB
  v += 0.6 * smoothstep(35.0, 36.5, d) * (1.0 - smoothstep(39.0, 41.0, d)); // NNTB
  v += smoothstep(6.5, 8.5, -d) * (1.0 - smoothstep(19.0, 21.0, -d));      // SEB
  v += 0.75 * smoothstep(27.0, 28.5, -d) * (1.0 - smoothstep(32.0, 34.0, -d)); // STB
  v += 0.55 * smoothstep(38.0, 39.5, -d) * (1.0 - smoothstep(42.0, 44.0, -d)); // SSTB
  return clamp(v, 0.0, 1.0);
}

float windProfile(float lat) {
  // zonal wind (m/s): fast prograde jets at belt/zone boundaries
  float d = degrees(lat);
  return 100.0 * sin(radians(d) * 14.0) * exp(-abs(d) / 45.0) + 40.0 * exp(-d * d / 60.0) + 140.0 * exp(-(d - 23.5) * (d - 23.5) / 3.0);
}

vec3 jupiterAlbedo(vec3 n, float footprint) {
  float lat = asin(clamp(n.z, -1.0, 1.0));
  // differential rotation: each latitude drifts with its zonal wind; patterns are
  // re-seeded every few days with a cross-fade to bound shear
  float life = 4.0 * 86400.0;
  vec3 acc = vec3(0.0);
  for (int k = 0; k < 2; k++) {
    float ph = uTime / life + 0.5 * float(k);
    float f = fract(ph);
    float w = 1.0 - abs(2.0 * f - 1.0);
    float drift = windProfile(lat) * f * life / (uRadius * max(cos(lat), 0.05));
    float c = cos(-drift), s = sin(-drift);
    vec3 p = vec3(c * n.x - s * n.y, s * n.x + c * n.y, n.z) + floor(ph) * 3.7;
    // anisotropic turbulence: stretched along longitude
    vec3 q = p * vec3(6.0, 6.0, 26.0);
    vec3 warp = vec3(fbm(q * 0.7, 5, footprint * 6.0), fbm(q * 0.7 + 7.1, 5, footprint * 6.0), 0.0) - 0.5;
    float turb = fbm(q + warp * 3.0, 11, footprint * 26.0);
    float fine = fbm(q * 6.0 + warp * 8.0, 8, footprint * 160.0);
    float latp = lat + 0.035 * (turb - 0.5) + 0.006 * (fine - 0.5);
    float belt = bandProfile(latp);
    vec3 zone = vec3(0.93, 0.88, 0.78);
    vec3 beltC = mix(vec3(0.62, 0.42, 0.29), vec3(0.72, 0.52, 0.36), turb);
    vec3 col = mix(zone, beltC, belt);
    col *= 0.86 + 0.28 * mix(turb, fine, 0.4);
    // equatorial zone ochre tint and festoons
    col = mix(col, vec3(0.86, 0.72, 0.52), 0.35 * exp(-degrees(lat) * degrees(lat) / 30.0) * smoothstep(0.45, 0.75, fine));
    // polar regions: bluish haze with cyclone speckle
    float pol = smoothstep(radians(45.0), radians(60.0), abs(lat));
    col = mix(col, vec3(0.55, 0.56, 0.58) * (0.8 + 0.4 * fine), pol);
    acc += w * col;
  }
  // Great Red Spot (~16,000 x 12,000 km) at 22.5°S, slowly drifting in longitude
  float lon = atan(n.y, n.x);
  float grsLon = 1.2 - uTime * 2.0e-7;
  float dl = atan(sin(lon - grsLon), cos(lon - grsLon));
  vec2 e = vec2(dl / 0.24, (lat + radians(22.5)) / 0.085);
  float rr = length(e);
  float swirl = fbm(vec3(e * 4.0 + vec2(cos(rr * 6.0 - uTime * 4e-5), sin(rr * 6.0 - uTime * 4e-5)), 3.0), 6, footprint * 40.0);
  float grs = 1.0 - smoothstep(0.65, 1.05, rr + 0.15 * (swirl - 0.5));
  acc = mix(acc, mix(vec3(0.78, 0.40, 0.26), vec3(0.88, 0.55, 0.38), swirl), grs * 0.9);
  float collar = smoothstep(0.85, 1.0, rr) * (1.0 - smoothstep(1.0, 1.25, rr));
  acc = mix(acc, vec3(0.95, 0.92, 0.85), collar * 0.5);
  return acc;
}

vec3 moonAlbedo(vec3 n, float footprint) {
  vec3 p = n * 4.0;
  float a = fbm(p, 9, footprint * 4.0);
  float b = fbm(p * 3.0 + 11.0, 8, footprint * 12.0);
  if (uStyle == 1) { // Io: sulfur plains, red rings, dark paterae
    vec3 col = mix(vec3(0.92, 0.84, 0.45), vec3(0.95, 0.93, 0.8), smoothstep(0.4, 0.7, a));
    col = mix(col, vec3(0.75, 0.38, 0.2), smoothstep(0.62, 0.72, b) * 0.6);
    vec3 cell = floor(n * 9.0);
    vec3 h = hash33(cell);
    float spot = 1.0 - smoothstep(0.0, 0.12, length(fract(n * 9.0) - h) - 0.02);
    col = mix(col, vec3(0.12, 0.08, 0.05), spot * step(0.6, h.x));
    return col;
  }
  if (uStyle == 2) { // Europa: bright ice with reddish lineae
    float lines = 1.0 - smoothstep(0.0, 0.035, abs(fbm(p * vec3(1.0, 2.0, 1.0) + 3.0, 7, footprint * 6.0) - 0.5));
    float lines2 = 1.0 - smoothstep(0.0, 0.02, abs(b - 0.5));
    vec3 col = mix(vec3(0.9, 0.87, 0.8), vec3(0.78, 0.7, 0.6), a * 0.6);
    return mix(col, vec3(0.55, 0.32, 0.2), max(lines, lines2) * 0.7);
  }
  if (uStyle == 3) { // Ganymede: dark cratered + bright grooved terrain
    vec3 col = mix(vec3(0.36, 0.33, 0.29), vec3(0.68, 0.66, 0.62), smoothstep(0.45, 0.6, a));
    return col * (0.85 + 0.3 * b);
  }
  // Callisto: dark, saturated with bright crater ejecta
  vec3 col = vec3(0.24, 0.22, 0.2) * (0.8 + 0.4 * b);
  vec3 cell = floor(n * 14.0);
  vec3 h = hash33(cell + 5.0);
  float d = length(fract(n * 14.0) - h);
  return mix(col, vec3(0.75, 0.73, 0.7), (1.0 - smoothstep(0.03, 0.1, d)) * 0.8);
}

// single scattering through an exponential shell, numerically (Rayleigh + haze)
vec3 atmosphere(vec3 o, vec3 d, float tMax, inout float trans) {
  if (uAtmTau <= 0.0) return vec3(0.0);
  float R1 = 1.0 + uAtmTop;
  float b = dot(o, d);
  float c = dot(o, o) - R1 * R1;
  float disc = b * b - c;
  if (disc <= 0.0) return vec3(0.0);
  float t0 = max(0.0, -b - sqrt(disc));
  float t1 = min(tMax, -b + sqrt(disc));
  if (t1 <= t0) return vec3(0.0);
  const int N = 10;
  float dt = (t1 - t0) / float(N);
  vec3 betaR = vec3(0.32, 0.6, 1.0);    // λ^-4 weighting (relative)
  float mu = dot(d, uSunDir);
  float pR = 0.75 * (1.0 + mu * mu);
  float g = 0.72;
  float pM = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * mu, 1.5);
  vec3 sum = vec3(0.0);
  vec3 Tview = vec3(1.0);
  for (int i = 0; i < N; i++) {
    vec3 p = o + d * (t0 + (float(i) + 0.5) * dt);
    float r = length(p);
    float h = r - 1.0;
    float rho = exp(-h / uAtmH);
    // sun path: shadowed if the planet blocks it, else Chapman-like grazing attenuation
    vec3 n = p / r;
    float cosZ = dot(n, uSunDir);
    float lit = smoothstep(-0.02, 0.02, cosZ + sqrt(max(2.0 * h, 0.0)));
    float airmass = 1.0 / max(cosZ + 0.15 * pow(max(1.0 - cosZ, 0.0), 2.0), 0.03);
    vec3 dTau = uAtmTau * rho * dt / uAtmH * (0.55 * betaR + 0.45 * vec3(1.0));
    vec3 Tsun = exp(-uAtmTau * rho * airmass * (0.55 * betaR + 0.45));
    vec3 scatter = (0.55 * betaR * pR + 0.45 * vec3(pM)) / (4.0 * 3.14159);
    sum += Tview * dTau * scatter * Tsun * lit;
    Tview *= exp(-dTau);
  }
  trans = (Tview.r + Tview.g + Tview.b) / 3.0;
  return sum * uSunE * sunColor();
}

void main() {
  vec3 d = rayDir();
  vec3 o = uOrigin;
  vec3 S = vec3(1.0, 1.0, 1.0 / (1.0 - uFlat));
  vec3 os = o * S, ds = d * S;
  float A = dot(ds, ds);
  float B = dot(os, ds);
  float C = uFlat > 0.0 ? dot(os, os) - 1.0 : uC;
  float disc = B * B - A * C;
  float tHit = 1e30;
  vec3 color = vec3(0.0);
  float alpha = 0.0;
  if (disc > 0.0) {
    float t = (-B - sqrt(disc)) / A;
    if (t > 0.0) {
      tHit = t;
      vec3 p = o + d * t;
      vec3 n = normalize(p * S * S);
      float footprint = t * uPixelAngle;
      vec3 alb = (uStyle == 0 ? jupiterAlbedo(normalize(p * S), footprint) : moonAlbedo(normalize(p), footprint)) * uAlbedo;
      float mu0 = dot(n, uSunDir);
      float mu = max(dot(n, -d), 0.0);
      // Minnaert law (k = 0.9) for cloud decks, Lambert-ish for moons
      float k = uStyle == 0 ? 0.9 : 0.75;
      float lam = mu0 > 0.0 ? pow(mu0, k) * pow(max(mu, 0.02), k - 1.0) : 0.0;
      // soft terminator from the finite solar disk
      lam *= smoothstep(-uSunAng, uSunAng, mu0);
      float vis = sunVisibility(p);
      color = alb * (uSunE / 3.14159) * lam * vis * sunColor();
      alpha = 1.0;
    }
  }
  float trans = 1.0;
  vec3 atm = atmosphere(o, d, tHit, trans);
  color = color * trans + atm;
  // fade alpha for atmosphere-only fragments: additive (premultiplied, alpha 0)
  gl_FragColor = finish(color, alpha);
  if (alpha == 0.0 && dot(atm, atm) <= 0.0) discard;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const STAR_FRAG = /* glsl */ `
${COMMON}
uniform float uTeff;
uniform int uStarStyle;     // 0 sun-like (granulation), 1 red supergiant (giant cells)
uniform float uCellSize;    // granule size / radius

// Worley F1, F2
vec2 worley(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float f1 = 8.0, f2 = 8.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(x, y, z);
    vec3 o = hash33(i + g);
    float dd = length(g + o - f);
    if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
  }
  return vec2(f1, f2);
}

float granulation(vec3 n, float freq, float footprint, float tphase) {
  float lod = footprint * freq;
  if (lod > 1.2) return 0.5;
  vec3 q = n * freq + vec3(0.0, 0.0, tphase);
  vec2 w = worley(q + 0.15 * (vec3(vnoise(q * 0.5), vnoise(q * 0.5 + 9.0), 0.0) - 0.5));
  float g = smoothstep(0.0, 0.5, w.y - w.x);       // bright cell interiors, dark lanes
  return mix(g, 0.5, smoothstep(0.4, 1.2, lod));
}

void main() {
  vec3 d = rayDir();
  vec3 o = uOrigin;
  float B = dot(o, d);
  float disc = B * B - uC;
  if (disc <= 0.0) discard;
  float t = -B - sqrt(disc);
  if (t <= 0.0) discard;
  vec3 p = o + d * t;
  vec3 n = normalize(p);
  float mu = max(dot(n, -d), 0.0);
  float footprint = t * uPixelAngle;
  float T = uTeff;
  float bright = 1.0;
  if (uStarStyle == 0) {
    // granules (~1,000 km) evolving over ~10 min, supergranules (~30,000 km)
    float g = granulation(n, 1.0 / uCellSize, footprint, uTime / 600.0);
    float sg = fbm(n * 25.0 + uTime * 1e-6, 5, footprint * 25.0);
    T *= 1.0 + 0.035 * (g - 0.5) + 0.01 * (sg - 0.5);
    // a few sunspots
    for (int i = 0; i < 3; i++) {
      vec3 h = hash33(vec3(float(i) * 7.0, 3.0, 1.0));
      float lat = (h.x - 0.5) * 0.6;
      float lon = h.y * 6.283 + uTime * 2.8e-6;
      vec3 c = vec3(cos(lat) * cos(lon), cos(lat) * sin(lon), sin(lat));
      float r = acos(clamp(dot(n, c), -1.0, 1.0)) / (0.012 + 0.02 * h.z);
      float umbra = 1.0 - smoothstep(0.35, 0.5, r);
      float pen = 1.0 - smoothstep(0.8, 1.0, r + 0.1 * fbm(n * 300.0, 4, footprint * 300.0));
      T = mix(T, 4200.0, pen * 0.6);
      T = mix(T, 3600.0, umbra);
    }
  } else {
    // red supergiant: a handful of enormous convection cells plus smaller ones
    float big = granulation(n, 2.2, footprint, uTime / (86400.0 * 200.0));
    float mid = granulation(n, 9.0, footprint, uTime / (86400.0 * 40.0) + 3.0);
    float small = fbm(n * 60.0, 6, footprint * 60.0);
    T *= 1.0 + 0.09 * (big - 0.5) + 0.05 * (mid - 0.5) + 0.02 * (small - 0.5);
  }
  // limb darkening (quadratic law); cooler, redder limb
  float limb = 0.3 + 0.93 * mu - 0.23 * mu * mu;
  if (uStarStyle == 1) limb = 0.12 + 1.2 * mu - 0.32 * mu * mu;
  float Tl = T * (0.86 + 0.14 * pow(mu, 0.5));
  vec3 rad = bbChroma(Tl) * pow(10.0, bbLogL(T)) * limb * bright;
  gl_FragColor = finish(rad, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const GLOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  // camera-facing quad in scaled space
  vec4 c = viewMatrix * modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float s = length(modelMatrix[0].xyz);
  gl_Position = projectionMatrix * (c + vec4(position.xy * s, 0.0, 0.0));
}
`;

const GLOW_FRAG = /* glsl */ `
uniform sampler2D uBB;
uniform float uExposure;
uniform float uE;           // illuminance at the eye (lux) from the whole body
uniform float uT;           // colour temperature (K)
uniform float uHalfAngle;   // angular half-size of the quad (rad)
uniform float uPixelAngle;
uniform float uResolved;    // 0 = point source, 1 = resolved disc (core handled by body shader)
uniform float uGlare;       // glare strength (0 for planets)
varying vec2 vUv;
${BB_GLSL}
void main() {
  float th = length(vUv) * uHalfAngle;
  float sigma = 0.8 * uPixelAngle;
  float core = (1.0 - uResolved) * uE * exp(-0.5 * th * th / (sigma * sigma)) / (6.2832 * sigma * sigma);
  // CIE/Stiles–Holladay veiling glare: L = 10 E / θ²(deg), softened near the core
  float thd = degrees(max(th, 0.0));
  float glare = uGlare * 10.0 * uE / (thd * thd + 0.02) * (1.0 - smoothstep(0.6, 1.0, length(vUv)));
  vec3 c = bbChroma(uT) * (core + glare);
  gl_FragColor = vec4(c * uExposure, 0.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface BodyUniforms {
  [k: string]: THREE.IUniform;
}

function baseUniforms(bb: THREE.Texture): BodyUniforms {
  return {
    uBB: { value: bb },
    uExposure: { value: 1 },
    uToBody: { value: new THREE.Matrix3() },
    uOrigin: { value: new THREE.Vector3(0, 0, 3) },
    uC: { value: 8 },
    uFlat: { value: 0 },
    uSunDir: { value: new THREE.Vector3(1, 0, 0) },
    uSunE: { value: 0 },
    uSunT: { value: 5772 },
    uSunAng: { value: 0.001 },
    uTime: { value: 0 },
    uRadius: { value: 1 },
    uPixelAngle: { value: 0.0015 },
    uOcc: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, 0, 0)) },
    uOccN: { value: 0 },
  };
}

const PREMULT: Partial<THREE.ShaderMaterialParameters> = {
  transparent: true,
  depthTest: false,
  depthWrite: false,
  side: THREE.BackSide,
  blending: THREE.CustomBlending,
  blendSrc: THREE.OneFactor,
  blendDst: THREE.OneMinusSrcAlphaFactor,
  blendEquation: THREE.AddEquation,
};

export function planetMaterial(bb: THREE.Texture, style: number, albedo: THREE.Color, atm?: { top: number; H: number; tau: number }) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: PLANET_FRAG,
    uniforms: {
      ...baseUniforms(bb),
      uStyle: { value: style },
      uAlbedo: { value: new THREE.Vector3(albedo.r, albedo.g, albedo.b) },
      uAtmTop: { value: atm?.top ?? 0 },
      uAtmH: { value: atm?.H ?? 0.01 },
      uAtmTau: { value: atm?.tau ?? 0 },
    },
    ...PREMULT,
  });
}

export function starMaterial(bb: THREE.Texture, Teff: number, style: number, cellSize: number) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: STAR_FRAG,
    uniforms: {
      ...baseUniforms(bb),
      uTeff: { value: Teff },
      uStarStyle: { value: style },
      uCellSize: { value: cellSize },
    },
    ...PREMULT,
  });
}

export function glowMaterial(bb: THREE.Texture, T: number, glare: number) {
  return new THREE.ShaderMaterial({
    vertexShader: GLOW_VERT,
    fragmentShader: GLOW_FRAG,
    uniforms: {
      uBB: { value: bb },
      uExposure: { value: 1 },
      uE: { value: 0 },
      uT: { value: T },
      uHalfAngle: { value: 0.05 },
      uPixelAngle: { value: 0.0015 },
      uResolved: { value: 0 },
      uGlare: { value: glare },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Geodesic sphere proxy: radius 1, enough segments that the 2% over-size hides the polygonal limb. */
export const proxyGeometry = new THREE.IcosahedronGeometry(1, 5);
export const glowGeometry = new THREE.PlaneGeometry(2, 2);

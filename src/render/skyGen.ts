/**
 * Procedural celestial sphere ("sky at infinity"), generated once on the GPU
 * into an HDR cube map in the galactic frame (x → Galactic Centre, z → North
 * Galactic Pole).
 *
 * Texels store photometric data, not colours: R = luminance (mcd/m²),
 * G = luminance × colour temperature / 10⁴ K. Keeping a temperature lets the
 * relativistic renderer apply exact blackbody Doppler/gravitational shifts to
 * the background (T → gT) instead of tinting RGB. Filtering (mipmaps) averages
 * the temperature luminance-weighted.
 *
 * Content (all procedural, statistically motivated, not a real catalogue):
 *  - ~200k stars in three magnitude layers, N(<m) ∝ 10^{0.45 m}, concentrated
 *    toward the Galactic plane and bulge; point-spread over ~1 texel with flux
 *    conserved (so lensing magnification works on surface brightness);
 *  - diffuse Milky Way band with bulge, star clouds, dust lanes + reddening;
 *  - faint distant galaxies, plus an M31-like spiral near its real position.
 */
import * as THREE from 'three';
import { CUBE_GLSL, NOISE_GLSL } from './glsl';

const SKY_FRAG = /* glsl */ `
precision highp float;
uniform int uFace;
uniform float uSize;
${CUBE_GLSL}
${NOISE_GLSL}

const float PI = 3.14159265;
const float LUX0 = 2.54e-6;   // illuminance of a V = 0 star (lux)

float galDensity(vec3 d, float planeStrength) {
  float b = asin(clamp(d.z, -1.0, 1.0));
  float l = atan(d.y, d.x);
  float plane = exp(-abs(b) / 0.12);
  float bulge = exp(-(l * l / 0.12 + b * b / 0.05));
  return 1.0 + planeStrength * (2.5 * plane + 3.0 * bulge);
}

float dustTau(vec3 d, float footprint) {
  float b = asin(clamp(d.z, -1.0, 1.0));
  float lane = exp(-abs(b + 0.006) / 0.03);
  float n = fbm(d * 7.0 + vec3(3.1, 1.7, 0.4), 8, footprint * 7.0);
  float m = smoothstep(0.42, 0.78, n);
  return 3.0 * lane * m + 0.6 * lane;
}

float starTemp(float h) {
  // rough mix of spectral classes among naked-eye/telescopic stars
  if (h < 0.18) return mix(3100.0, 3700.0, fract(h * 37.0));   // M
  if (h < 0.48) return mix(4000.0, 5000.0, fract(h * 53.0));   // K (many giants)
  if (h < 0.63) return mix(5300.0, 6000.0, fract(h * 71.0));   // G
  if (h < 0.76) return mix(6100.0, 7400.0, fract(h * 13.0));   // F
  if (h < 0.91) return mix(7600.0, 10500.0, fract(h * 29.0));  // A
  return mix(11000.0, 32000.0, pow(fract(h * 91.0), 2.0));     // B/O
}

// Accumulates star luminance (cd/m^2) and luminance-weighted temperature.
void starLayer(vec3 d, float cs, float prob, float mMin, float mMax, float planeStrength, float seed, float sigma, float tau,
               inout float L, inout float LT) {
  vec3 p = d / cs;
  vec3 base = floor(p);
  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++)
  for (int k = -1; k <= 1; k++) {
    vec3 cell = base + vec3(i, j, k);
    vec3 h = hash33(cell + seed);
    vec3 sp = (cell + hash33(cell + seed + 91.7)) * cs;
    float rr = length(sp);
    if (abs(rr - 1.0) > 0.5 * cs) continue;
    vec3 sd = sp / rr;
    if (h.x > prob * galDensity(sd, planeStrength) / (1.0 + planeStrength * 2.0)) continue;
    float ang = acos(clamp(dot(sd, d), -1.0, 1.0));
    if (ang > 3.5 * sigma) continue;
    float m = mMax + log(max(h.y, 1e-6)) / (0.45 * 2.302585);
    if (m < mMin) m = mMin + fract(h.y * 7919.0) * 0.6;
    float E = LUX0 * pow(10.0, -0.4 * m) * exp(-0.8 * tau);
    float lum = E * exp(-0.5 * ang * ang / (sigma * sigma)) / (2.0 * PI * sigma * sigma);
    float T = starTemp(h.z);
    T = mix(T, 3600.0, clamp(tau * 0.15, 0.0, 0.5));
    L += lum;
    LT += lum * T;
  }
}

void galaxies(vec3 d, inout float L, inout float LT) {
  float cs = 0.22;
  vec3 base = floor(d / cs);
  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++)
  for (int k = -1; k <= 1; k++) {
    vec3 cell = base + vec3(i, j, k);
    vec3 h = hash33(cell + 501.0);
    vec3 sp = (cell + hash33(cell + 777.0)) * cs;
    float rr = length(sp);
    if (abs(rr - 1.0) > 0.5 * cs || h.x > 0.35) continue;
    vec3 sd = sp / rr;
    if (abs(sd.z) < 0.25) continue; // zone of avoidance
    vec3 t1 = normalize(cross(sd, abs(sd.z) < 0.9 ? vec3(0, 0, 1) : vec3(1, 0, 0)));
    vec3 t2 = cross(sd, t1);
    float rot = h.y * 6.283;
    vec3 ax = cos(rot) * t1 + sin(rot) * t2;
    vec3 ay = cross(sd, ax);
    float size = mix(0.0025, 0.009, h.z * h.z);
    float flat_ = mix(1.0, 4.0, fract(h.y * 13.7));
    vec2 q = vec2(dot(d - sd, ax), dot(d - sd, ay) * flat_) / size;
    float rq = length(q);
    if (rq > 4.0 || dot(d, sd) < 0.0) continue;
    float lum = 2.5e-3 * exp(-rq * 2.2) + 6e-3 * exp(-rq * rq * 30.0);
    L += lum;
    LT += lum * mix(4800.0, 6800.0, fract(h.z * 31.0));
  }
  // M31-like spiral near (l, b) = (121.2°, −21.6°)
  vec3 m31 = vec3(cos(-0.377) * cos(2.115), cos(-0.377) * sin(2.115), sin(-0.377));
  if (dot(d, m31) > 0.99) {
    vec3 t1 = normalize(cross(m31, vec3(0, 0, 1)));
    vec3 t2 = cross(m31, t1);
    float c = cos(0.6), s = sin(0.6);
    vec3 ax = c * t1 + s * t2, ay = cross(m31, ax);
    vec2 q = vec2(dot(d - m31, ax) / 0.026, dot(d - m31, ay) / 0.0075);
    float rq = length(q);
    float lum = 3.0e-3 * exp(-rq * 2.5) + 0.02 * exp(-rq * rq * 60.0);
    L += lum;
    LT += lum * 5200.0;
  }
}

void main() {
  vec2 st = gl_FragCoord.xy / uSize;
  vec3 d = cubeDir(uFace, st);
  float texel = 2.0 / uSize;
  float tau = dustTau(d, texel);
  float L = 0.0, LT = 0.0;
  float sigma = 0.85 * texel;
  starLayer(d, 0.05, 0.75, -1.5, 5.5, 0.35, 11.0, sigma, 0.0, L, LT);
  starLayer(d, 0.016, 0.7, 5.5, 8.5, 1.0, 23.0, sigma, tau * 0.5, L, LT);
  if (uSize >= 768.0) starLayer(d, 0.007, 0.55, 8.5, 11.0, 2.2, 37.0, sigma, tau, L, LT);

  // diffuse Milky Way
  float b = asin(clamp(d.z, -1.0, 1.0));
  float l = atan(d.y, d.x);
  float clouds = 0.45 + 1.1 * fbm(d * 5.0 + 9.0, 8, texel * 5.0);
  float band = exp(-abs(b) / 0.085) * (0.3 + 0.7 * exp(-l * l / 1.6)) * clouds;
  float bulge = 1.6 * exp(-(l * l / 0.06 + b * b / 0.022));
  float halo = 0.12 * exp(-abs(b) / 0.4);
  float Lmw = 1.6e-3 * (band + bulge + halo) * exp(-tau) + 2e-5;
  float Tmw = mix(mix(5400.0, 4600.0, bulge / (band + bulge + 1e-3)), 3300.0, 1.0 - exp(-0.5 * tau));
  L += Lmw;
  LT += Lmw * Tmw;
  galaxies(d, L, LT);

  float Lm = L * 1000.0;
  gl_FragColor = vec4(Lm, Lm * (LT / max(L, 1e-30)) * 1e-4, 0.0, 1.0);
}
`;

const FULLSCREEN_VERT = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export function fullscreenTriangle(): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  return g;
}

/** Render all 6 faces of a cube render target with a fragment shader that uses uFace. */
export function renderCubeFaces(
  renderer: THREE.WebGLRenderer,
  target: THREE.WebGLCubeRenderTarget,
  material: THREE.ShaderMaterial,
  faces: number[] = [0, 1, 2, 3, 4, 5],
) {
  const scene = new THREE.Scene();
  const mesh = new THREE.Mesh(fullscreenTriangle(), material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const prevTarget = renderer.getRenderTarget();
  const prevXr = renderer.xr.enabled;
  renderer.xr.enabled = false;
  const gen = target.texture.generateMipmaps;
  for (let i = 0; i < faces.length; i++) {
    material.uniforms.uFace.value = faces[i];
    target.texture.generateMipmaps = gen && i === faces.length - 1;
    renderer.setRenderTarget(target, faces[i]);
    renderer.render(scene, cam);
  }
  target.texture.generateMipmaps = gen;
  renderer.xr.enabled = prevXr;
  renderer.setRenderTarget(prevTarget);
  mesh.geometry.dispose();
}

export function generateSky(renderer: THREE.WebGLRenderer, size: number): THREE.WebGLCubeRenderTarget {
  const target = new THREE.WebGLCubeRenderTarget(size, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
  });
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERT,
    fragmentShader: SKY_FRAG,
    uniforms: { uFace: { value: 0 }, uSize: { value: size } },
    depthTest: false,
    depthWrite: false,
  });
  renderCubeFaces(renderer, target, material);
  material.dispose();
  return target;
}

export { FULLSCREEN_VERT };

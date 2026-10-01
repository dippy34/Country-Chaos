/**
 * GPU general-relativistic ray tracer for Kerr black holes.
 *
 * For every texel of a camera-centred cube map (or a narrow telescope frustum)
 * a photon is traced BACKWARD from the observer through Kerr–Schild spacetime:
 *   - initial momentum p'^μ = −e₀ + n^i e_i from the observer's tetrad, so
 *     aberration and Doppler shift from the observer's motion are built in;
 *   - Hamiltonian geodesic equations (analytic metric gradient), RK4, step
 *     ∝ r; horizon-penetrating coordinates let rays start inside r₊;
 *   - thin Novikov–Thorne disk in the equatorial plane: hit → blackbody at
 *     g·T(r) where g = 1/(p'_μ u^μ_disk) includes gravitational redshift,
 *     Doppler beaming, frame dragging and the light-travel time to each
 *     point of the disk (pattern evaluated at the emission coordinate time);
 *   - escaping rays sample the static sky with the exact blackbody shift
 *     g = 1/p'_t and a weak-field correction for the remaining bending;
 *   - rays captured by the hole return black (the shadow).
 * The resulting radiance cube is shared by both eyes, so VR head rotation
 * never waits on the tracer. Approximations are listed in docs/PHYSICS.md.
 */
import * as THREE from 'three';
import { BB_GLSL, toHalf } from './blackbody';
import { CUBE_GLSL, NOISE_GLSL } from './glsl';
import { FULLSCREEN_VERT, fullscreenTriangle } from './skyGen';

/** Kerr–Schild geometry helpers (GLSL). Needs `uniform float uSpin;` declared first; call `A2 = uSpin*uSpin` in main. */
export const KERR_GLSL = /* glsl */ `
float A2;

float ksR(vec3 x) {
  float b = dot(x, x) - A2;
  return sqrt(max(0.5 * (b + sqrt(b * b + 4.0 * A2 * x.z * x.z)), 1e-10));
}

// metric pieces at x: returns f, writes l
float ksF(vec3 x, out vec3 l) {
  float a = uSpin;
  float r = ksR(x);
  float r2 = r * r;
  float A = r2 + A2;
  l = vec3((r * x.x + a * x.y) / A, (r * x.y - a * x.x) / A, x.z / r);
  return 2.0 * r2 * r / (r2 * r2 + A2 * x.z * x.z);
}

vec4 lowerKS(vec3 x, vec4 v) {
  vec3 l;
  float f = ksF(x, l);
  float lv = v.x + dot(l, v.yzw);
  return vec4(-v.x + f * lv, v.yzw + f * lv * l);
}

float dotKS(vec3 x, vec4 u, vec4 v) {
  vec3 l;
  float f = ksF(x, l);
  float lu = u.x + dot(l, u.yzw);
  float lv = v.x + dot(l, v.yzw);
  return -u.x * v.x + dot(u.yzw, v.yzw) + f * lu * lv;
}

// Hamilton's equations, analytic gradient (mirror of src/physics/kerr.ts geodesicDeriv)
void deriv(vec3 x, vec3 p, float pt, out vec3 dx, out float dt, out vec3 dp) {
  float a = uSpin;
  float z = x.z, z2 = z * z;
  float r = ksR(x);
  float r2 = r * r, r3 = r2 * r;
  float iD = 1.0 / (r2 * r2 + A2 * z2);
  float f = 2.0 * r3 * iD;
  float A = r2 + A2;
  float iA = 1.0 / A;
  vec3 l = vec3((r * x.x + a * x.y) * iA, (r * x.y - a * x.x) * iA, z / r);
  float q = -pt + dot(l, p);
  float fq = f * q;
  dt = -pt + fq;
  dx = p - fq * l;
  vec3 dr = vec3(r3 * x.x * iD, r3 * x.y * iD, r * z * A * iD);
  float cf = 2.0 * r2 * (3.0 * A2 * z2 - r2 * r2) * iD * iD;
  vec3 df = cf * dr;
  df.z -= 4.0 * A2 * z * r3 * iD * iD;
  float W = (x.x * p.x + x.y * p.y) * iA - (l.x * p.x + l.y * p.y) * 2.0 * r * iA - p.z * z / r2;
  vec3 dq = W * dr + vec3((r * p.x - a * p.y) * iA, (a * p.x + r * p.y) * iA, p.z / r);
  dp = 0.5 * q * q * df + fq * dq;
}

// enforce H = 0 keeping p_t and the direction of travel (see renormalizeNull in kerr.ts)
vec3 nullMomentum(vec3 x, vec3 dir, float pt) {
  vec3 l;
  float f = ksF(x, l);
  float c = dot(l, dir);
  float A = 1.0 - f * c * c;
  float B = 2.0 * f * pt * c;
  float C = -(1.0 + f) * pt * pt;
  float disc = sqrt(max(B * B - 4.0 * A * C, 0.0));
  float m1 = (-B + disc) / (2.0 * A);
  float m2 = (-B - disc) / (2.0 * A);
  float v1 = m1 - f * (-pt + m1 * c) * c;
  return dir * (v1 > 0.0 ? m1 : m2);
}

// remaining weak-field deflection from position x moving along unit v toward infinity
vec3 asymptoticDir(vec3 x, vec3 v) {
  float s0 = dot(x, v);
  vec3 bvec = x - s0 * v;
  float b = length(bvec);
  if (b < 1e-4) return v;
  float defl = (2.0 / b) * (1.0 - s0 / sqrt(b * b + s0 * s0));
  return normalize(v - defl * bvec / b);
}

`;

export const KERR_TRACE_FRAG = /* glsl */ `
precision highp float;
uniform int uFace;            // 0..5 cube face, 6 = perspective (telescope)
uniform vec2 uRes;
uniform mat3 uPersp;          // perspective: columns = right, up, back (observer body frame)
uniform vec2 uTanHalf;
uniform vec4 uE0;
uniform vec4 uE1;
uniform vec4 uE2;
uniform vec4 uE3;
uniform vec3 uCamPos;
uniform float uCamT;
uniform float uSpin;
uniform float uRplus;
uniform float uDiskIn;
uniform float uDiskOut;
uniform int uDiskOn;
uniform sampler2D uDiskTemp;  // normalised T(r) on log r grid [uDiskIn, uDiskOut]
uniform float uDiskTmax;
uniform sampler2D uBB;
uniform samplerCube uSky;
uniform mat3 uSkyRot;         // KS frame → galactic sky frame
uniform float uExposure;
uniform int uMaxSteps;
uniform float uStepScale;
uniform float uFarR;
uniform float uPixelAngle;
${CUBE_GLSL}
${NOISE_GLSL}
${BB_GLSL}

${KERR_GLSL}
vec3 diskEmission(vec3 xi, float rd, vec3 p, float pt, float tEmit, float footprint) {
  float a = uSpin;
  float Om = 1.0 / (pow(rd, 1.5) + a);
  vec4 v = vec4(1.0, -Om * xi.y, Om * xi.x, 0.0);
  float nn = dotKS(xi, v, v);
  if (nn >= 0.0) return vec3(0.0);
  float ut = inversesqrt(-nn);
  float Ee = ut * (pt + Om * (-xi.y * p.x + xi.x * p.y));
  if (Ee <= 0.0) return vec3(0.0);
  float g = 1.0 / Ee;
  float u = log(rd / uDiskIn) / log(uDiskOut / uDiskIn);
  float Tn = texture(uDiskTemp, vec2(clamp(u, 0.0, 1.0), 0.5)).r;
  // co-rotating turbulence, re-seeded every ~2 local orbits with a cross-fade
  float life = 12.566 / Om;
  float ph = tEmit / life;
  float phi = atan(xi.y, xi.x);
  float lr = log(rd);
  float n = 0.0;
  for (int k = 0; k < 2; k++) {
    float pk = ph + 0.5 * float(k);
    float fk = fract(pk);
    float w = 1.0 - abs(2.0 * fk - 1.0);
    float ang = phi - Om * fk * life;
    vec3 q = vec3(cos(ang) * 3.0, sin(ang) * 3.0, lr * 7.0) + floor(pk) * 13.1;
    float fp = footprint / max(rd, 1.0) * 3.0;
    float m = fbm(q * vec3(1.0, 1.0, 1.0), 6, fp);
    float spiral = 0.5 + 0.5 * sin(2.0 * ang + lr * 9.0 + floor(pk));
    n += w * mix(m, spiral, 0.25);
  }
  float T = uDiskTmax * Tn * (0.86 + 0.28 * n);
  float mu = clamp(abs(p.z) * g, 0.0, 1.0);
  float limb = 0.42 + 0.87 * mu;                                  // Chandrasekhar electron-scattering limb law
  float edge = smoothstep(uDiskOut, uDiskOut * 0.8, rd);
  return bbRadiance(g * T) * limb * edge;
}

void main() {
  A2 = uSpin * uSpin;
  vec2 st = gl_FragCoord.xy / uRes;
  vec3 dirB;
  if (uFace < 6) dirB = cubeDir(uFace, st);
  else dirB = normalize(uPersp * vec3((2.0 * st.x - 1.0) * uTanHalf.x, (2.0 * st.y - 1.0) * uTanHalf.y, -1.0));

  // backward photon momentum (contravariant), normalised so E_observer = 1
  vec4 pc = -uE0 + dirB.x * uE1 + dirB.y * uE2 + dirB.z * uE3;
  vec3 x = uCamPos;
  vec4 pcov = lowerKS(x, pc);
  float pt = pcov.x;
  vec3 p = pcov.yzw;
  float t = 0.0;

  int result = 0;         // 0 running, 1 escaped, 2 opaque, 3 captured/unresolved
  vec3 escDir = dirB;
  vec3 color = vec3(0.0);
  float trans = 1.0;
  float rCam = ksR(x);
  bool inside = rCam < uRplus;
  float bWeak = max(60.0, 1.25 * uDiskOut);

  vec3 dx; float dt; vec3 dp;
  deriv(x, p, pt, dx, dt, dp);

  // far field: skip the (almost straight) approach analytically
  if (!inside && rCam > uFarR) {
    vec3 v = normalize(dx);
    float s0 = dot(x, v);
    float b = length(x - s0 * v);
    if (s0 >= 0.0 || b > bWeak) {
      result = 1;
      escDir = asymptoticDir(x, v);
    } else {
      float R = uFarR * 0.999;
      float s = -s0 - sqrt(max(R * R - b * b, 0.0));
      x += s * v;
      t -= s + 2.0 * log(rCam / R);      // flat distance + leading Shapiro term (KS time)
      p = nullMomentum(x, v, pt);
      deriv(x, p, pt, dx, dt, dp);
    }
  }

  float rEsc = max(uFarR, rCam * 1.02);
  float rr = ksR(x);
  for (int i = 0; i < 2000; i++) {
    if (result != 0) break;
    if (i >= uMaxSteps) { result = 3; break; }
    float spd = length(dx);
    float h = uStepScale * max(rr, 0.05) / spd;
    // RK4
    vec3 x0 = x, p0 = p; float t0 = t;
    vec3 k1x = dx, k1p = dp; float k1t = dt;
    vec3 k2x, k2p, k3x, k3p, k4x, k4p; float k2t, k3t, k4t;
    deriv(x0 + 0.5 * h * k1x, p0 + 0.5 * h * k1p, pt, k2x, k2t, k2p);
    deriv(x0 + 0.5 * h * k2x, p0 + 0.5 * h * k2p, pt, k3x, k3t, k3p);
    deriv(x0 + h * k3x, p0 + h * k3p, pt, k4x, k4t, k4p);
    x = x0 + h / 6.0 * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
    p = p0 + h / 6.0 * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
    t = t0 + h / 6.0 * (k1t + 2.0 * k2t + 2.0 * k3t + k4t);
    rr = ksR(x);
    deriv(x, p, pt, dx, dt, dp);

    // equatorial disk crossing
    if (uDiskOn == 1 && x0.z * x.z < 0.0) {
      float fr = x0.z / (x0.z - x.z);
      vec3 xi = mix(x0, x, fr);
      float rd = sqrt(max(dot(xi.xy, xi.xy) - A2, 0.0));
      if (rd > uDiskIn && rd < uDiskOut) {
        vec3 pi = mix(p0, p, fr);
        float ti = mix(t0, t, fr);
        float footprint = abs(ti) * uPixelAngle;
        vec3 em = diskEmission(xi, rd, pi, pt, uCamT + ti, footprint);
        float alpha = smoothstep(uDiskOut, uDiskOut * 0.85, rd);
        color += trans * em;
        trans *= 1.0 - alpha;
        if (trans < 0.01) { result = 2; break; }
      }
    }
    // capture: backward rays cannot cross the future horizon inward; they pile up at r₊ (shadow)
    if (!inside && rr < uRplus * 1.0005 + 1e-3 && dot(x, dx) < 0.0) { result = 3; break; }
    // runaway momentum = ray asymptoting to a horizon we cannot see through
    if (dot(p, p) > 1e8) { result = 3; break; }
    if (rr > rEsc && dot(x, dx) > 0.0) {
      result = 1;
      escDir = asymptoticDir(x, normalize(dx));
      break;
    }
  }

  // sky lookup with ray-differential filtering (stable under extreme lensing)
  vec3 skyDir = uSkyRot * escDir;
  vec3 gx = dFdx(skyDir), gy = dFdy(skyDir);
  float gl = max(length(gx), length(gy));
  float maxGrad = 0.25;
  if (gl > maxGrad) { gx *= maxGrad / gl; gy *= maxGrad / gl; }
  if (result == 1 && trans > 0.0 && pt > 0.0) {
    vec4 s = textureGrad(uSky, skyDir, gx, gy);
    float Lsky = s.r * 1e-3;
    if (Lsky > 0.0) {
      float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
      float g = 1.0 / pt;
      float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
      color += trans * bbChroma(g * T) * Lsky * ratio;
    }
  }
  gl_FragColor = vec4(min(color * uExposure, vec3(60000.0)), 1.0);
}
`;

export interface TracerParams {
  spin: number;
  rPlus: number;
  diskOn: boolean;
  diskIn: number;
  diskOut: number;
  diskTmax: number;
  diskTemp: THREE.Texture;
  sky: THREE.Texture;
  bb: THREE.Texture;
  skyRot: THREE.Matrix3;
}

export interface CameraState {
  /** Contravariant tetrad legs e0..e3 (KS coords, M = 1). e1..e3 are body axes. */
  e: number[][];
  pos: number[];
  t: number;
}

export class KerrTracer {
  readonly material: THREE.ShaderMaterial;
  private scene = new THREE.Scene();
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  cube: THREE.WebGLCubeRenderTarget;
  /** Faces rendered per call; < 6 amortises the cost over frames. */
  facesPerFrame = 6;
  private nextFace = 0;

  constructor(public size: number, params: TracerParams) {
    this.material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: KERR_TRACE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uFace: { value: 0 },
        uRes: { value: new THREE.Vector2(size, size) },
        uPersp: { value: new THREE.Matrix3() },
        uTanHalf: { value: new THREE.Vector2(1, 1) },
        uE0: { value: new THREE.Vector4() },
        uE1: { value: new THREE.Vector4() },
        uE2: { value: new THREE.Vector4() },
        uE3: { value: new THREE.Vector4() },
        uCamPos: { value: new THREE.Vector3() },
        uCamT: { value: 0 },
        uSpin: { value: params.spin },
        uRplus: { value: params.rPlus },
        uDiskIn: { value: params.diskIn },
        uDiskOut: { value: params.diskOut },
        uDiskOn: { value: params.diskOn ? 1 : 0 },
        uDiskTemp: { value: params.diskTemp },
        uDiskTmax: { value: params.diskTmax },
        uBB: { value: params.bb },
        uSky: { value: params.sky },
        uSkyRot: { value: params.skyRot },
        uExposure: { value: 1 },
        uMaxSteps: { value: 400 },
        uStepScale: { value: 0.04 },
        uFarR: { value: Math.max(200, params.diskOut * 1.6) },
        uPixelAngle: { value: 2 / size },
      },
    });
    const mesh = new THREE.Mesh(fullscreenTriangle(), this.material);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    this.cube = this.makeCube(size);
  }

  private makeCube(size: number) {
    return new THREE.WebGLCubeRenderTarget(size, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });
  }

  resize(size: number) {
    if (size === this.size) return;
    this.cube.dispose();
    this.size = size;
    this.cube = this.makeCube(size);
    this.material.uniforms.uRes.value.set(size, size);
    this.material.uniforms.uPixelAngle.value = 2 / size;
    this.nextFace = 0;
  }

  setParams(p: Partial<TracerParams>) {
    const u = this.material.uniforms;
    if (p.spin !== undefined) u.uSpin.value = p.spin;
    if (p.rPlus !== undefined) u.uRplus.value = p.rPlus;
    if (p.diskOn !== undefined) u.uDiskOn.value = p.diskOn ? 1 : 0;
    if (p.diskIn !== undefined) u.uDiskIn.value = p.diskIn;
    if (p.diskOut !== undefined) {
      u.uDiskOut.value = p.diskOut;
      u.uFarR.value = Math.max(200, p.diskOut * 1.6);
    }
    if (p.diskTmax !== undefined) u.uDiskTmax.value = p.diskTmax;
    if (p.diskTemp) u.uDiskTemp.value = p.diskTemp;
    if (p.skyRot) u.uSkyRot.value = p.skyRot;
  }

  setCamera(c: CameraState, exposure: number) {
    const u = this.material.uniforms;
    u.uE0.value.set(c.e[0][0], c.e[0][1], c.e[0][2], c.e[0][3]);
    u.uE1.value.set(c.e[1][0], c.e[1][1], c.e[1][2], c.e[1][3]);
    u.uE2.value.set(c.e[2][0], c.e[2][1], c.e[2][2], c.e[2][3]);
    u.uE3.value.set(c.e[3][0], c.e[3][1], c.e[3][2], c.e[3][3]);
    u.uCamPos.value.set(c.pos[0], c.pos[1], c.pos[2]);
    u.uCamT.value = c.t;
    u.uExposure.value = exposure;
  }

  setQuality(maxSteps: number, stepScale: number) {
    this.material.uniforms.uMaxSteps.value = maxSteps;
    this.material.uniforms.uStepScale.value = stepScale;
  }

  /** Trace (some of) the cube faces. */
  renderCube(renderer: THREE.WebGLRenderer) {
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    renderer.xr.enabled = false;
    const u = this.material.uniforms;
    u.uRes.value.set(this.size, this.size);
    const n = Math.min(6, this.facesPerFrame);
    for (let i = 0; i < n; i++) {
      const f = this.nextFace;
      this.nextFace = (this.nextFace + 1) % 6;
      u.uFace.value = f;
      this.cube.texture.generateMipmaps = f === 5 || n < 6;
      renderer.setRenderTarget(this.cube, f);
      renderer.render(this.scene, this.cam);
    }
    renderer.xr.enabled = prevXr;
    renderer.setRenderTarget(prevTarget);
  }

  /** Trace a perspective view (telescope) into a 2D target. basis columns = right, up, back in body frame. */
  renderPerspective(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget, basis: THREE.Matrix3, tanHalf: number) {
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    renderer.xr.enabled = false;
    const u = this.material.uniforms;
    const prevPix = u.uPixelAngle.value;
    u.uFace.value = 6;
    u.uPersp.value.copy(basis);
    u.uTanHalf.value.set(tanHalf * (target.width / target.height), tanHalf);
    u.uRes.value.set(target.width, target.height);
    u.uPixelAngle.value = (2 * tanHalf) / target.height;
    renderer.setRenderTarget(target);
    renderer.render(this.scene, this.cam);
    u.uRes.value.set(this.size, this.size);
    u.uPixelAngle.value = prevPix;
    renderer.xr.enabled = prevXr;
    renderer.setRenderTarget(prevTarget);
  }
}

/** Disk temperature profile texture (normalised to T_max) on a log-r grid. */
export function diskTempTexture(T: Float64Array, Tmax: number): THREE.DataTexture {
  const n = T.length;
  const data = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) data[i * 4] = T[i] / Tmax;
  const tex = new THREE.DataTexture(toHalf(data), n, 1, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Deferred gravitational lensing.
 *
 * The expensive part of black-hole rendering is integrating null geodesics;
 * what each ray *finds* (escape direction, disk hit point, frequency shift,
 * light-travel time) varies smoothly over most of the sky. So the work is split:
 *
 *  1. LensingMap: geodesics are traced at modest resolution into a cube-atlas
 *     of *geometry* (multiple render targets), in the observer's attitude-free
 *     reference frame, double-buffered and spread over several frames.
 *  2. Shading: every display pixel interpolates that geometry and evaluates
 *     the star field (high-resolution sky texture, ray-differential filtered)
 *     and the accretion disk (full-resolution texture detail, redshift,
 *     beaming, animation at the emission time) itself.
 *
 * Result: stars and disk structure are sharp at headset resolution, the
 * tracer cost is amortised (and zero for a static observer), and turning the
 * ship or your head never waits for a re-trace because attitude is applied
 * at shading time.
 */
import * as THREE from 'three';
import { BB_GLSL } from './blackbody';
import { CUBE_GLSL } from './glsl';
import { KERR_GLSL } from './kerrTracer';
import { FULLSCREEN_VERT, fullscreenTriangle } from './skyGen';

/** Inverse of cubeDir: face index and face coordinates of a direction. */
const DIR_TO_FACE_GLSL = /* glsl */ `
void dirToFace(vec3 d, out int f, out vec2 st) {
  vec3 a = abs(d);
  float sc, tc, ma;
  if (a.x >= a.y && a.x >= a.z) {
    ma = a.x;
    if (d.x > 0.0) { f = 0; sc = -d.z; tc = -d.y; } else { f = 1; sc = d.z; tc = -d.y; }
  } else if (a.y >= a.z) {
    ma = a.y;
    if (d.y > 0.0) { f = 2; sc = d.x; tc = d.z; } else { f = 3; sc = d.x; tc = -d.z; }
  } else {
    ma = a.z;
    if (d.z > 0.0) { f = 4; sc = d.x; tc = -d.y; } else { f = 5; sc = -d.x; tc = -d.y; }
  }
  st = vec2(sc, tc) / ma * 0.5 + 0.5;
}
`;

const TRACE_FRAG = /* glsl */ `
precision highp float;
precision highp int;
uniform vec2 uAtlas;
uniform float uN;
uniform vec4 uE0;
uniform vec4 uE1;
uniform vec4 uE2;
uniform vec4 uE3;
uniform vec3 uCamPos;
uniform float uSpin;
uniform float uRplus;
uniform float uDiskIn;
uniform float uDiskOut;
uniform int uDiskOn;
uniform mat3 uSkyRot;
uniform int uMaxSteps;
uniform float uStepScale;
uniform float uFarR;
layout(location = 0) out highp vec4 outA;  // escape direction (sky frame), sky transmittance
layout(location = 1) out highp vec4 outB;  // disk hit: x, y, g, light-travel time (premultiplied by coverage)
layout(location = 2) out highp vec4 outC;  // disk coverage
${CUBE_GLSL}
${KERR_GLSL}

float diskG(vec3 xi, float rd, vec3 p, float pt) {
  float Om = 1.0 / (pow(rd, 1.5) + uSpin);
  vec4 v = vec4(1.0, -Om * xi.y, Om * xi.x, 0.0);
  float nn = dotKS(xi, v, v);
  if (nn >= 0.0) return 0.0;
  float Ee = inversesqrt(-nn) * (pt + Om * (-xi.y * p.x + xi.x * p.y));
  return Ee > 0.0 ? 1.0 / Ee : 0.0;
}

void main() {
  A2 = uSpin * uSpin;
  float cell = uN + 2.0;
  vec2 px = gl_FragCoord.xy;
  float fx = floor(px.x / cell), fy = floor(px.y / cell);
  int face = int(fy * 3.0 + fx);
  vec2 st = (px - vec2(fx, fy) * cell - 1.0) / uN;   // gutter texels extrapolate past the face edge
  vec3 dirB = cubeDir(face, st);

  vec4 pc = -uE0 + dirB.x * uE1 + dirB.y * uE2 + dirB.z * uE3;
  vec3 x = uCamPos;
  vec4 pcov = lowerKS(x, pc);
  float pt = pcov.x;
  vec3 p = pcov.yzw;
  float t = 0.0;

  int result = 0;
  vec3 escDir = dirB;
  float trans = 1.0;
  vec4 hit = vec4(0.0);
  float cov = 0.0;
  float rCam = ksR(x);
  bool inside = rCam < uRplus;
  float bWeak = max(60.0, 1.25 * uDiskOut);

  vec3 dx; float dt; vec3 dp;
  deriv(x, p, pt, dx, dt, dp);
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
      t -= s + 2.0 * log(rCam / R);
      p = nullMomentum(x, v, pt);
      deriv(x, p, pt, dx, dt, dp);
    }
  }

  float rEsc = max(uFarR, rCam * 1.02);
  float rr = ksR(x);
  for (int i = 0; i < 2000; i++) {
    if (result != 0) break;
    if (i >= uMaxSteps) { result = 3; break; }
    float h = uStepScale * max(rr, 0.05) / length(dx);
    vec3 x0 = x, p0 = p; float t0 = t;
    vec3 k2x, k2p, k3x, k3p, k4x, k4p; float k2t, k3t, k4t;
    deriv(x0 + 0.5 * h * dx, p0 + 0.5 * h * dp, pt, k2x, k2t, k2p);
    deriv(x0 + 0.5 * h * k2x, p0 + 0.5 * h * k2p, pt, k3x, k3t, k3p);
    deriv(x0 + h * k3x, p0 + h * k3p, pt, k4x, k4t, k4p);
    x = x0 + h / 6.0 * (dx + 2.0 * k2x + 2.0 * k3x + k4x);
    p = p0 + h / 6.0 * (dp + 2.0 * k2p + 2.0 * k3p + k4p);
    t = t0 + h / 6.0 * (dt + 2.0 * k2t + 2.0 * k3t + k4t);
    rr = ksR(x);
    deriv(x, p, pt, dx, dt, dp);

    if (uDiskOn == 1 && x0.z * x.z < 0.0) {
      float fr = x0.z / (x0.z - x.z);
      vec3 xi = mix(x0, x, fr);
      float rd = sqrt(max(dot(xi.xy, xi.xy) - A2, 0.0));
      if (rd > uDiskIn && rd < uDiskOut) {
        if (cov == 0.0) {
          float g = diskG(xi, rd, mix(p0, p, fr), pt);
          hit = vec4(xi.xy, g, mix(t0, t, fr));
          cov = 1.0;
        }
        float alpha = smoothstep(uDiskOut, uDiskOut * 0.85, rd);
        trans *= 1.0 - alpha;
        if (trans < 0.01) { result = 2; break; }
      }
    }
    if (!inside && rr < uRplus * 1.0005 + 1e-3 && dot(x, dx) < 0.0) { result = 3; break; }
    if (dot(p, p) > 1e8) { result = 3; break; }
    if (rr > rEsc && dot(x, dx) > 0.0) {
      result = 1;
      escDir = asymptoticDir(x, normalize(dx));
      break;
    }
  }
  if (result != 1) trans = 0.0;
  if (pt <= 0.0) trans = 0.0;
  outA = vec4(uSkyRot * escDir, trans);
  outB = hit * cov;
  outC = vec4(cov, 0.0, 0.0, 1.0);
}
`;

/** Per-pixel shading from the lensing map (shared by the dome and the light probe). */
export const SHADE_GLSL = /* glsl */ `
uniform sampler2D uMapA;
uniform sampler2D uMapB;
uniform sampler2D uMapC;
uniform vec2 uAtlas;
uniform float uN;
uniform mat3 uAtt;          // body (view) frame → reference frame of the map
uniform samplerCube uSky;
uniform sampler2D uBB;
uniform sampler2D uDiskTemp;
uniform sampler2D uNoise;
uniform float uDiskTmax;
uniform float uDiskIn;
uniform float uDiskOut;
uniform float uSpinS;
uniform float uTime;        // observer's coordinate time (M)
uniform vec4 uR0;           // current reference tetrad (for the exact starlight shift)
uniform vec4 uR1;
uniform vec4 uR2;
uniform vec4 uR3;
uniform float uCamF;
uniform vec3 uCamL;
uniform float uExposure;
${BB_GLSL}
${DIR_TO_FACE_GLSL}

vec2 atlasUV(vec3 d) {
  int f; vec2 st;
  dirToFace(d, f, st);
  float cell = uN + 2.0;
  vec2 org = vec2(float(f - (f / 3) * 3), float(f / 3)) * cell;
  return (org + 1.0 + clamp(st, 0.0, 1.0) * uN) / uAtlas;
}

// E_obs / E_inf for starlight arriving from reference-frame direction d (p_t is conserved)
float starShift(vec3 d) {
  vec4 pc = -uR0 + d.x * uR1 + d.y * uR2 + d.z * uR3;
  float lp = pc.x + dot(uCamL, pc.yzw);
  float pt = -pc.x + uCamF * lp;
  return pt > 0.0 ? 1.0 / pt : 0.0;
}

vec3 diskShade(vec2 xy, float g, float tRel, float fp) {
  float a2 = uSpinS * uSpinS;
  float rd = sqrt(max(dot(xy, xy) - a2, 0.0));
  if (g <= 0.0 || rd < uDiskIn * 0.97) return vec3(0.0);
  float u = log(rd / uDiskIn) / log(uDiskOut / uDiskIn);
  float Tn = texture(uDiskTemp, vec2(clamp(u, 0.0, 1.0), 0.5)).r;
  float Om = 1.0 / (pow(rd, 1.5) + uSpinS);
  float tEmit = uTime + tRel;
  float life = 12.566 / Om;
  float ph = tEmit / life;
  float phi = atan(xy.y, xy.x);
  float lr = log(rd);
  float n = 0.0;
  for (int k = 0; k < 2; k++) {
    float pk = ph + 0.5 * float(k);
    float fk = fract(pk);
    float w = 1.0 - abs(2.0 * fk - 1.0);
    float ang = phi - Om * fk * life;
    float seed = floor(pk);
    vec2 q = vec2(ang * (4.0 / 6.2831853) + fract(seed * 0.618) * 7.0, lr * 1.6 + fract(seed * 0.414) * 5.0);
    float m = texture(uNoise, q).r * 0.55 + texture(uNoise, q * vec2(3.0, 3.0) + 0.37).r * 0.3 + texture(uNoise, q * vec2(9.0, 7.0) + 0.71).r * 0.15;
    float spiral = 0.5 + 0.5 * sin(2.0 * ang + lr * 9.0 + seed);
    n += w * mix(m, spiral, 0.22);
  }
  float T = uDiskTmax * Tn * (0.84 + 0.32 * n);
  float edge = smoothstep(uDiskOut, uDiskOut * 0.8, rd);
  return bbRadiance(g * T) * edge;
}

// radiance (cd/m^2 × exposure) arriving from body-frame direction dirBody
vec3 shadeKerr(vec3 dirBody) {
  vec3 dref = normalize(uAtt * dirBody);
  vec2 uv = atlasUV(dref);
  vec4 A = texture(uMapA, uv);
  vec4 B = texture(uMapB, uv);
  float cov = texture(uMapC, uv).r;
  vec3 esc = normalize(A.xyz + vec3(1e-6));
  // ray differentials → filtered star lookup (stable under extreme lensing)
  vec3 gx = dFdx(esc), gy = dFdy(esc);
  float gl = max(length(gx), length(gy));
  if (gl > 0.2) { gx *= 0.2 / gl; gy *= 0.2 / gl; }
  vec3 col = vec3(0.0);
  float trans = A.w;
  if (trans > 0.0) {
    vec4 s = textureGrad(uSky, esc, gx, gy);
    float L = s.r * 1e-3;
    if (L > 0.0) {
      float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
      float g = starShift(dref);
      float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
      col += trans * bbChroma(g * T) * L * ratio;
    }
  }
  if (cov > 0.002) {
    vec4 h = B / cov;
    float fp = max(length(dFdx(h.xy)), length(dFdy(h.xy)));
    float a2 = uSpinS * uSpinS;
    float rd = sqrt(max(dot(h.xy, h.xy) - a2, 0.0));
    float alpha = cov * smoothstep(uDiskOut, uDiskOut * 0.85, rd);
    col += alpha * diskShade(h.xy, h.z, h.w, fp);
  }
  return min(col * uExposure, vec3(6e4));
}
`;

const DOME_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;

const DOME_FRAG = /* glsl */ `
varying vec3 vDir;
${SHADE_GLSL}
void main() {
  gl_FragColor = vec4(shadeKerr(normalize(vDir)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const PROBE_FRAG = /* glsl */ `
uniform int uFace;
uniform float uSize;
${CUBE_GLSL}
${SHADE_GLSL}
void main() {
  gl_FragColor = vec4(shadeKerr(cubeDir(uFace, gl_FragCoord.xy / uSize)), 1.0);
}
`;

export interface MapCamera {
  /** Attitude-free reference tetrad (contravariant legs). */
  e: number[][];
  pos: number[];
  t: number;
}

export interface LensingScene {
  spin: number;
  rPlus: number;
  diskOn: boolean;
  diskIn: number;
  diskOut: number;
  skyRot: THREE.Matrix3;
}

function makeMapTarget(w: number, h: number) {
  return new THREE.WebGLRenderTarget(w, h, {
    count: 3,
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: false,
    depthBuffer: false,
  });
}

/** Double-buffered, amortised geodesic map. */
export class LensingMap {
  front: THREE.WebGLRenderTarget;
  private back: THREE.WebGLRenderTarget;
  readonly material: THREE.ShaderMaterial;
  private scene = new THREE.Scene();
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private nextFace = 0;
  /** Camera state the current front map was traced from. */
  frontCam: MapCamera | null = null;
  private pendingCam: MapCamera | null = null;
  facesPerFrame = 6;
  /** Increments every time a complete new map becomes visible. */
  generation = 0;

  constructor(public N: number, scene: LensingScene) {
    const W = 3 * (N + 2), H = 2 * (N + 2);
    this.front = makeMapTarget(W, H);
    this.back = makeMapTarget(W, H);
    this.material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: TRACE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uAtlas: { value: new THREE.Vector2(W, H) },
        uN: { value: N },
        uE0: { value: new THREE.Vector4() },
        uE1: { value: new THREE.Vector4() },
        uE2: { value: new THREE.Vector4() },
        uE3: { value: new THREE.Vector4() },
        uCamPos: { value: new THREE.Vector3() },
        uSpin: { value: scene.spin },
        uRplus: { value: scene.rPlus },
        uDiskIn: { value: scene.diskIn },
        uDiskOut: { value: scene.diskOut },
        uDiskOn: { value: scene.diskOn ? 1 : 0 },
        uSkyRot: { value: scene.skyRot },
        uMaxSteps: { value: 400 },
        uStepScale: { value: 0.04 },
        uFarR: { value: Math.max(200, scene.diskOut * 1.6) },
      },
    });
    const mesh = new THREE.Mesh(fullscreenTriangle(), this.material);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
  }

  setQuality(steps: number, h: number) {
    this.material.uniforms.uMaxSteps.value = steps;
    this.material.uniforms.uStepScale.value = h;
  }

  setDisk(on: boolean) {
    this.material.uniforms.uDiskOn.value = on ? 1 : 0;
  }

  resize(N: number) {
    if (N === this.N) return;
    this.N = N;
    const W = 3 * (N + 2), H = 2 * (N + 2);
    this.front.dispose();
    this.back.dispose();
    this.front = makeMapTarget(W, H);
    this.back = makeMapTarget(W, H);
    this.material.uniforms.uAtlas.value.set(W, H);
    this.material.uniforms.uN.value = N;
    this.nextFace = 0;
    this.frontCam = null;
  }

  private setCamera(c: MapCamera) {
    const u = this.material.uniforms;
    u.uE0.value.set(c.e[0][0], c.e[0][1], c.e[0][2], c.e[0][3]);
    u.uE1.value.set(c.e[1][0], c.e[1][1], c.e[1][2], c.e[1][3]);
    u.uE2.value.set(c.e[2][0], c.e[2][1], c.e[2][2], c.e[2][3]);
    u.uE3.value.set(c.e[3][0], c.e[3][1], c.e[3][2], c.e[3][3]);
    u.uCamPos.value.set(c.pos[0], c.pos[1], c.pos[2]);
  }

  private traceFace(renderer: THREE.WebGLRenderer, face: number) {
    const cell = this.N + 2;
    const fx = face % 3, fy = Math.floor(face / 3);
    const t = this.back;
    t.scissor.set(fx * cell, fy * cell, cell, cell);
    t.scissorTest = true;
    renderer.setRenderTarget(t);
    renderer.render(this.scene, this.cam);
    t.scissorTest = false;
  }

  /**
   * Advance the amortised trace. `cam` is sampled when a new map starts so all
   * six faces of one map share a consistent observer state. Set `full` to
   * trace a complete map immediately (first frame, teleports, view changes).
   */
  update(renderer: THREE.WebGLRenderer, cam: () => MapCamera, full = false) {
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    renderer.xr.enabled = false;
    if (full) this.nextFace = 0;
    const n = full ? 6 : Math.max(1, Math.min(6, this.facesPerFrame));
    for (let i = 0; i < n; i++) {
      if (this.nextFace === 0) {
        this.pendingCam = cam();
        this.setCamera(this.pendingCam);
      }
      this.traceFace(renderer, this.nextFace);
      this.nextFace++;
      if (this.nextFace === 6) {
        const tmp = this.front;
        this.front = this.back;
        this.back = tmp;
        this.frontCam = this.pendingCam;
        this.nextFace = 0;
        this.generation++;
        if (!full) break;
      }
    }
    renderer.xr.enabled = prevXr;
    renderer.setRenderTarget(prevTarget);
  }

  dispose() {
    this.front.dispose();
    this.back.dispose();
    this.material.dispose();
  }
}

/** Tileable fbm noise texture for disk turbulence (baked once on the CPU). */
export function makeNoiseTexture(size = 256): THREE.DataTexture {
  const data = new Uint8Array(size * size);
  const lattice = (period: number, seed: number) => {
    const g = new Float32Array(period * period);
    let s = seed;
    for (let i = 0; i < g.length; i++) {
      s = (s * 1664525 + 1013904223) >>> 0;
      g[i] = s / 4294967296;
    }
    return (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const fx = x - xi, fy = y - yi;
      const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
      const at = (i: number, j: number) => g[(((j % period) + period) % period) * period + (((i % period) + period) % period)];
      const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
      return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
    };
  };
  const octaves = [4, 8, 16, 32, 64].map((p, i) => ({ p, f: lattice(p, 7919 * (i + 1)), a: 0.5 ** i }));
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let v = 0, w = 0;
      for (const o of octaves) {
        v += o.a * o.f((x / size) * o.p, (y / size) * o.p);
        w += o.a;
      }
      v /= w;
      data[y * size + x] = Math.max(0, Math.min(255, Math.round(((v - 0.5) * 1.8 + 0.5) * 255)));
    }
  const tex = new THREE.DataTexture(data, size, size, THREE.RedFormat, THREE.UnsignedByteType);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

export interface ShadeTextures {
  sky: THREE.Texture;
  bb: THREE.Texture;
  diskTemp: THREE.Texture;
  noise: THREE.Texture;
}

function shadeUniforms(t: ShadeTextures, scene: LensingScene, diskTmax: number) {
  return {
    uMapA: { value: null as THREE.Texture | null },
    uMapB: { value: null as THREE.Texture | null },
    uMapC: { value: null as THREE.Texture | null },
    uAtlas: { value: new THREE.Vector2(1, 1) },
    uN: { value: 1 },
    uAtt: { value: new THREE.Matrix3() },
    uSky: { value: t.sky },
    uBB: { value: t.bb },
    uDiskTemp: { value: t.diskTemp },
    uNoise: { value: t.noise },
    uDiskTmax: { value: diskTmax },
    uDiskIn: { value: scene.diskIn },
    uDiskOut: { value: scene.diskOut },
    uSpinS: { value: scene.spin },
    uTime: { value: 0 },
    uR0: { value: new THREE.Vector4() },
    uR1: { value: new THREE.Vector4() },
    uR2: { value: new THREE.Vector4() },
    uR3: { value: new THREE.Vector4() },
    uCamF: { value: 0 },
    uCamL: { value: new THREE.Vector3() },
    uExposure: { value: 1 },
  };
}

export type ShadeUniforms = ReturnType<typeof shadeUniforms>;

export interface ShadeState {
  map: LensingMap;
  /** body → reference rotation (rows: reference components of each body axis). */
  att: THREE.Matrix3;
  /** current reference tetrad, KS metric pieces at the camera */
  ref: number[][];
  f: number;
  l: [number, number, number];
  t: number;
  exposure: number;
}

export function applyShadeState(u: ShadeUniforms, s: ShadeState) {
  const m = s.map;
  u.uMapA.value = m.front.textures[0];
  u.uMapB.value = m.front.textures[1];
  u.uMapC.value = m.front.textures[2];
  u.uAtlas.value.set(3 * (m.N + 2), 2 * (m.N + 2));
  u.uN.value = m.N;
  u.uAtt.value.copy(s.att);
  u.uR0.value.set(s.ref[0][0], s.ref[0][1], s.ref[0][2], s.ref[0][3]);
  u.uR1.value.set(s.ref[1][0], s.ref[1][1], s.ref[1][2], s.ref[1][3]);
  u.uR2.value.set(s.ref[2][0], s.ref[2][1], s.ref[2][2], s.ref[2][3]);
  u.uR3.value.set(s.ref[3][0], s.ref[3][1], s.ref[3][2], s.ref[3][3]);
  u.uCamF.value = s.f;
  u.uCamL.value.set(s.l[0], s.l[1], s.l[2]);
  u.uTime.value = s.t;
  u.uExposure.value = s.exposure;
}

/** Camera-centred dome that shades the lensed sky per pixel. */
export function makeKerrDome(t: ShadeTextures, scene: LensingScene, diskTmax: number) {
  const material = new THREE.ShaderMaterial({
    vertexShader: DOME_VERT,
    fragmentShader: DOME_FRAG,
    uniforms: shadeUniforms(t, scene, diskTmax),
    side: THREE.BackSide,
    depthTest: false,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1000;
  return { mesh, material, uniforms: material.uniforms as unknown as ShadeUniforms };
}

/** Small radiance cube of the lensed sky: cockpit lighting and reflections. */
export class LightProbe {
  readonly target: THREE.WebGLCubeRenderTarget;
  readonly material: THREE.ShaderMaterial;
  readonly uniforms: ShadeUniforms;
  private scene = new THREE.Scene();
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private face = 0;

  constructor(t: ShadeTextures, scene: LensingScene, diskTmax: number, size = 32) {
    this.target = new THREE.WebGLCubeRenderTarget(size, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });
    this.material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: PROBE_FRAG,
      uniforms: { ...shadeUniforms(t, scene, diskTmax), uFace: { value: 0 }, uSize: { value: size } },
      depthTest: false,
      depthWrite: false,
    });
    this.uniforms = this.material.uniforms as unknown as ShadeUniforms;
    const mesh = new THREE.Mesh(fullscreenTriangle(), this.material);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
  }

  /** Render `faces` faces (round-robin); mipmaps regenerate on the last face. */
  update(renderer: THREE.WebGLRenderer, faces = 2) {
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    renderer.xr.enabled = false;
    for (let i = 0; i < faces; i++) {
      this.material.uniforms.uFace.value = this.face;
      this.target.texture.generateMipmaps = this.face === 5;
      renderer.setRenderTarget(this.target, this.face);
      renderer.render(this.scene, this.cam);
      this.face = (this.face + 1) % 6;
    }
    renderer.xr.enabled = prevXr;
    renderer.setRenderTarget(prevTarget);
  }

  dispose() {
    this.target.dispose();
    this.material.dispose();
  }
}

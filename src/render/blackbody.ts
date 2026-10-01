/**
 * Blackbody colour and absolute luminance.
 *
 * Planck spectral radiance integrated against the CIE 1931 2° colour-matching
 * functions (multi-lobe Gaussian fit of Wyman, Sloan & Shirley 2013, JCGT 2(2))
 * and converted to linear Rec.709/sRGB primaries. Photometric luminance is
 * 683 lm/W × ∫ B_λ ȳ dλ, in cd/m².
 *
 * Because I_ν/ν³ is invariant along a ray, a blackbody at T observed with
 * frequency ratio g is exactly a blackbody at gT. Every relativistic colour
 * shift in the renderer goes through this table, so gravitational redshift,
 * Doppler shift and beaming of the disk, stars and ship lights are physically
 * consistent rather than hand-tinted.
 */
import * as THREE from 'three';

const H = 6.626_070_15e-34;
const KB = 1.380_649e-23;
const CL = 299_792_458;

const lobe = (l: number, mu: number, s1: number, s2: number) => {
  const t = (l - mu) / (l < mu ? s1 : s2);
  return Math.exp(-0.5 * t * t);
};
export const cieX = (l: number) => 1.056 * lobe(l, 599.8, 37.9, 31.0) + 0.362 * lobe(l, 442.0, 16.0, 26.7) - 0.065 * lobe(l, 501.1, 20.4, 26.2);
export const cieY = (l: number) => 0.821 * lobe(l, 568.8, 46.9, 40.5) + 0.286 * lobe(l, 530.9, 16.3, 31.1);
export const cieZ = (l: number) => 1.217 * lobe(l, 437.0, 11.8, 36.0) + 0.681 * lobe(l, 459.0, 26.0, 13.8);

/** Planck B_λ in W m⁻² sr⁻¹ m⁻¹. */
export function planck(lambdaNm: number, T: number) {
  const l = lambdaNm * 1e-9;
  const x = (H * CL) / (l * KB * T);
  if (x > 700) return 0;
  return (2 * H * CL * CL) / (l ** 5 * Math.expm1(x));
}

export interface BBSample {
  /** Linear sRGB with unit luminance (Y = 1). */
  rgb: [number, number, number];
  /** Luminance in cd/m². */
  L: number;
}

export function blackbody(T: number): BBSample {
  let X = 0, Y = 0, Z = 0;
  const dl = 2;
  for (let l = 360; l <= 830; l += dl) {
    const b = planck(l, T) * dl * 1e-9;
    X += b * cieX(l);
    Y += b * cieY(l);
    Z += b * cieZ(l);
  }
  const L = 683 * Y;
  if (Y <= 0) return { rgb: [1, 0.2, 0], L: 0 };
  X /= Y;
  Z /= Y;
  let r = 3.2406 * X - 1.5372 - 0.4986 * Z;
  let g = -0.9689 * X + 1.8758 + 0.0415 * Z;
  let b = 0.0557 * X - 0.204 + 1.057 * Z;
  // out-of-gamut (very cool) colours: desaturate toward white just enough
  const m = Math.min(r, g, b);
  if (m < 0) {
    r -= m;
    g -= m;
    b -= m;
  }
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return { rgb: [r / y, g / y, b / y], L };
}

export const BB_LOG_T0 = Math.log10(400);
export const BB_LOG_T1 = 9;
export const BB_SIZE = 512;

/** RGBA half-float LUT: rgb = unit-luminance colour, a = log10(L / cd m⁻²). */
export function makeBlackbodyLUT(): THREE.DataTexture {
  const data = new Float32Array(BB_SIZE * 4);
  for (let i = 0; i < BB_SIZE; i++) {
    const T = Math.pow(10, BB_LOG_T0 + ((BB_LOG_T1 - BB_LOG_T0) * i) / (BB_SIZE - 1));
    const s = blackbody(T);
    data.set([s.rgb[0], s.rgb[1], s.rgb[2], Math.log10(Math.max(s.L, 1e-30))], i * 4);
  }
  const tex = new THREE.DataTexture(toHalf(data), BB_SIZE, 1, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

export function toHalf(src: Float32Array): Uint16Array {
  const out = new Uint16Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = THREE.DataUtils.toHalfFloat(src[i]);
  return out;
}

/** GLSL helpers matching the LUT. Requires `uniform sampler2D uBB;`. */
export const BB_GLSL = /* glsl */ `
const float BB_LOG_T0 = ${BB_LOG_T0.toFixed(6)};
const float BB_LOG_T1 = ${BB_LOG_T1.toFixed(6)};
vec4 bbFetch(float T) {
  float u = (log2(max(T, 1.0)) * 0.30103 - BB_LOG_T0) / (BB_LOG_T1 - BB_LOG_T0);
  u = clamp(u, 0.0, 1.0) * ${((BB_SIZE - 1) / BB_SIZE).toFixed(6)} + ${(0.5 / BB_SIZE).toFixed(6)};
  return texture(uBB, vec2(u, 0.5));
}
// Absolute linear-sRGB radiance (cd/m^2 scale) of a blackbody at temperature T.
vec3 bbRadiance(float T) {
  if (T < 300.0) return vec3(0.0);
  vec4 s = bbFetch(T);
  float fade = smoothstep(300.0, 500.0, T);
  return s.rgb * exp2(s.a * 3.321928) * fade;
}
// Log10 luminance of a blackbody at T.
float bbLogL(float T) { return bbFetch(T).a; }
vec3 bbChroma(float T) { return bbFetch(T).rgb; }
`;

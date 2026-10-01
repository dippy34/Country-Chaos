/** Shared GLSL snippets (GLSL ES 3.00 via three.js ShaderMaterial/RawShaderMaterial). */

export const CUBE_GLSL = /* glsl */ `
// Direction for cube face f (GL order +X,-X,+Y,-Y,+Z,-Z) at face coords st in [0,1]^2.
// Matches the GL sampling convention so texture(samplerCube, dir) reads this texel back.
vec3 cubeDir(int f, vec2 st) {
  float sc = 2.0 * st.x - 1.0;
  float tc = 2.0 * st.y - 1.0;
  if (f == 0) return normalize(vec3(1.0, -tc, -sc));
  if (f == 1) return normalize(vec3(-1.0, -tc, sc));
  if (f == 2) return normalize(vec3(sc, 1.0, tc));
  if (f == 3) return normalize(vec3(sc, -1.0, -tc));
  if (f == 4) return normalize(vec3(sc, -tc, 1.0));
  return normalize(vec3(-sc, -tc, -1.0));
}
`;

export const NOISE_GLSL = /* glsl */ `
uvec3 pcg3d(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
vec3 hash33(vec3 p) {
  uvec3 u = pcg3d(uvec3(ivec3(floor(p)) + ivec3(1 << 20)));
  return vec3(u) * (1.0 / 4294967295.0);
}
float hash13(vec3 p) { return hash33(p).x; }
// Smooth value noise in [0,1]
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i), n100 = hash13(i + vec3(1,0,0)), n010 = hash13(i + vec3(0,1,0)), n110 = hash13(i + vec3(1,1,0));
  float n001 = hash13(i + vec3(0,0,1)), n101 = hash13(i + vec3(1,0,1)), n011 = hash13(i + vec3(0,1,1)), n111 = hash13(i + vec3(1,1,1));
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y), mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}
// Band-limited fbm: octaves whose wavelength is below 'footprint' fade to their mean
// (temporal stability in VR) and are skipped entirely once fully faded.
float fbm(vec3 p, int octaves, float footprint) {
  float s = 0.0, a = 0.5, w = 0.0, freq = 1.0;
  for (int i = 0; i < 12; i++) {
    if (i >= octaves) break;
    float fade = 1.0 - smoothstep(0.25, 1.0, footprint * freq);
    if (fade <= 0.0) {
      // remaining octaves contribute only their mean (0.5)
      float rem = a * 2.0 * (1.0 - exp2(-float(octaves - i)));
      s += 0.5 * rem;
      w += rem;
      break;
    }
    s += a * (fade * vnoise(p * freq + float(i) * 17.17) + (1.0 - fade) * 0.5);
    w += a;
    freq *= 2.03;
    a *= 0.5;
  }
  return s / max(w, 1e-5);
}
`;

/** Tone mapping + exposure helpers for custom shaders writing to the screen. */
export const OUTPUT_GLSL = /* glsl */ `
uniform float uExposure;
`;

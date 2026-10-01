/**
 * Kerr spacetime in Cartesian Kerr–Schild coordinates (ingoing, horizon-penetrating).
 *
 *   g_{μν} = η_{μν} + f l_μ l_ν,       g^{μν} = η^{μν} − f l^μ l^ν
 *   f   = 2 M r^3 / (r^4 + a^2 z^2)
 *   l_μ = (1, (r x + a y)/(r^2 + a^2), (r y − a x)/(r^2 + a^2), z / r)
 *   r   defined implicitly by  r^4 − (x^2 + y^2 + z^2 − a^2) r^2 − a^2 z^2 = 0
 *
 * Signature (−,+,+,+), index order (t, x, y, z). Spin is along +z.
 * Units are geometric (G = c = 1); the simulation uses M = 1 internally.
 *
 * Geodesics use the super-Hamiltonian H = ½ g^{μν} p_μ p_ν, which is exact for
 * both null (H = 0) and timelike (H = −½ with p = u) curves. Because the metric
 * is stationary, p_t is conserved and the integrator never touches it.
 *
 * Kerr–Schild coordinates are regular across the future event horizon, which is
 * what lets both the ship and backward-traced light rays continue through r = r₊
 * instead of hitting a coordinate singularity (Boyer–Lindquist would blow up).
 */

export interface KerrParams {
  /** Mass (geometric units, normally 1). */
  M: number;
  /** Spin parameter a = J/M (same units as M), |a| ≤ M. */
  a: number;
}

export const horizonPlus = (k: KerrParams) => k.M + Math.sqrt(Math.max(k.M * k.M - k.a * k.a, 0));
export const horizonMinus = (k: KerrParams) => k.M - Math.sqrt(Math.max(k.M * k.M - k.a * k.a, 0));
/** Outer boundary of the ergoregion at polar angle θ (via cos θ). */
export const ergosphere = (k: KerrParams, cosTheta: number) =>
  k.M + Math.sqrt(Math.max(k.M * k.M - k.a * k.a * cosTheta * cosTheta, 0));

/** Kerr–Schild radial coordinate r(x, y, z). */
export function ksR(a: number, x: number, y: number, z: number): number {
  const b = x * x + y * y + z * z - a * a;
  const r2 = 0.5 * (b + Math.sqrt(b * b + 4 * a * a * z * z));
  return Math.sqrt(Math.max(r2, 1e-300));
}

/** Pointwise metric data: r, f and the spatial part of the null vector l. */
export interface KSPoint {
  r: number;
  f: number;
  lx: number;
  ly: number;
  lz: number;
}

export function ksPoint(k: KerrParams, x: number, y: number, z: number, out?: KSPoint): KSPoint {
  const { M, a } = k;
  const r = ksR(a, x, y, z);
  const r2 = r * r;
  const D = r2 * r2 + a * a * z * z;
  const A = r2 + a * a;
  const o = out ?? { r: 0, f: 0, lx: 0, ly: 0, lz: 0 };
  o.r = r;
  o.f = (2 * M * r2 * r) / D;
  o.lx = (r * x + a * y) / A;
  o.ly = (r * y - a * x) / A;
  o.lz = z / r;
  return o;
}

/** Lower an index: v^μ → v_μ. */
export function lower(p: KSPoint, v: ArrayLike<number>, out: number[] | Float64Array = [0, 0, 0, 0]) {
  const lv = v[0] + p.lx * v[1] + p.ly * v[2] + p.lz * v[3];
  const fl = p.f * lv;
  out[0] = -v[0] + fl;
  out[1] = v[1] + fl * p.lx;
  out[2] = v[2] + fl * p.ly;
  out[3] = v[3] + fl * p.lz;
  return out;
}

/** Raise an index: w_μ → w^μ. */
export function raise(p: KSPoint, w: ArrayLike<number>, out: number[] | Float64Array = [0, 0, 0, 0]) {
  const lw = -w[0] + p.lx * w[1] + p.ly * w[2] + p.lz * w[3];
  const fl = p.f * lw;
  out[0] = -w[0] + fl;
  out[1] = w[1] - fl * p.lx;
  out[2] = w[2] - fl * p.ly;
  out[3] = w[3] - fl * p.lz;
  return out;
}

/** g_{μν} a^μ b^ν for two contravariant vectors. */
export function dot(p: KSPoint, A: ArrayLike<number>, B: ArrayLike<number>): number {
  const la = A[0] + p.lx * A[1] + p.ly * A[2] + p.lz * A[3];
  const lb = B[0] + p.lx * B[1] + p.ly * B[2] + p.lz * B[3];
  return -A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + A[3] * B[3] + p.f * la * lb;
}

/** g^{μν} w_μ w_ν for a covector. */
export function normCov(p: KSPoint, w: ArrayLike<number>): number {
  const lw = -w[0] + p.lx * w[1] + p.ly * w[2] + p.lz * w[3];
  return -w[0] * w[0] + w[1] * w[1] + w[2] * w[2] + w[3] * w[3] - p.f * lw * lw;
}

/**
 * Hamilton's equations for the state s = [t, x, y, z, p_t, p_x, p_y, p_z].
 * out receives d/dλ of the state. The gradient of the metric is analytic, so
 * this is exact up to floating point (no finite differences).
 */
export function geodesicDeriv(M: number, a: number, s: ArrayLike<number>, out: Float64Array | number[]) {
  const x = s[1], y = s[2], z = s[3];
  const pt = s[4], px = s[5], py = s[6], pz = s[7];
  const a2 = a * a, z2 = z * z;
  const r = ksR(a, x, y, z);
  const r2 = r * r, r3 = r2 * r;
  const D = r2 * r2 + a2 * z2;
  const invD = 1 / D;
  const f = 2 * M * r3 * invD;
  const A = r2 + a2;
  const invA = 1 / A;
  const lx = (r * x + a * y) * invA;
  const ly = (r * y - a * x) * invA;
  const lz = z / r;
  const q = -pt + lx * px + ly * py + lz * pz;
  const fq = f * q;

  out[0] = -pt + fq;
  out[1] = px - fq * lx;
  out[2] = py - fq * ly;
  out[3] = pz - fq * lz;

  // ∂_i r
  const drx = r3 * x * invD;
  const dry = r3 * y * invD;
  const drz = r * z * A * invD;
  // ∂_i f
  const cf = 2 * M * r2 * (3 * a2 * z2 - r2 * r2) * invD * invD;
  const dfx = cf * drx;
  const dfy = cf * dry;
  const dfz = cf * drz - 4 * M * a2 * z * r3 * invD * invD;
  // ∂_i q = Σ_j p_j ∂_i l_j  (coefficient of ∂_i r collected in W)
  const W = (x * px + y * py) * invA - (lx * px + ly * py) * 2 * r * invA - (pz * z) / r2;
  const dqx = W * drx + (r * px - a * py) * invA;
  const dqy = W * dry + (a * px + r * py) * invA;
  const dqz = W * drz + pz / r;

  const hq2 = 0.5 * q * q;
  out[4] = 0;
  out[5] = hq2 * dfx + fq * dqx;
  out[6] = hq2 * dfy + fq * dqy;
  out[7] = hq2 * dfz + fq * dqz;
}

/** Super-Hamiltonian H = ½ g^{μν} p_μ p_ν at state s. */
export function hamiltonian(k: KerrParams, s: ArrayLike<number>): number {
  const p = ksPoint(k, s[1], s[2], s[3]);
  return 0.5 * normCov(p, [s[4], s[5], s[6], s[7]]);
}

const k1 = new Float64Array(8), k2 = new Float64Array(8), k3 = new Float64Array(8), k4 = new Float64Array(8);
const tmp = new Float64Array(8);

/** One classical RK4 step of size h (in λ or τ) applied in place to s. */
export function rk4Step(M: number, a: number, s: Float64Array, h: number) {
  geodesicDeriv(M, a, s, k1);
  for (let i = 0; i < 8; i++) tmp[i] = s[i] + 0.5 * h * k1[i];
  geodesicDeriv(M, a, tmp, k2);
  for (let i = 0; i < 8; i++) tmp[i] = s[i] + 0.5 * h * k2[i];
  geodesicDeriv(M, a, tmp, k3);
  for (let i = 0; i < 8; i++) tmp[i] = s[i] + h * k3[i];
  geodesicDeriv(M, a, tmp, k4);
  for (let i = 0; i < 8; i++) s[i] += (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
}

/** Spatial coordinate speed |dx/dλ| at state s (used to pick step sizes). */
export function coordSpeed(M: number, a: number, s: Float64Array): number {
  geodesicDeriv(M, a, s, k1);
  return Math.hypot(k1[1], k1[2], k1[3]);
}

/**
 * Rescale a covariant momentum so that the null condition H = 0 holds exactly,
 * keeping p_t (the conserved energy at infinity) fixed and the spatial
 * direction of p_i unchanged. Of the two roots, the one whose coordinate
 * velocity dx^i/dλ points along +p̂ is chosen (the other is the time-reversed
 * partner travelling the opposite way); ties go to the closest magnitude.
 */
export function renormalizeNull(k: KerrParams, s: Float64Array) {
  const p = ksPoint(k, s[1], s[2], s[3]);
  const pt = s[4];
  const sx = s[5], sy = s[6], sz = s[7];
  const n = Math.hypot(sx, sy, sz);
  if (n === 0) return;
  const ux = sx / n, uy = sy / n, uz = sz / n;
  const c = p.lx * ux + p.ly * uy + p.lz * uz;
  // m² (1 − f c²) + 2 f p_t c m − (1 + f) p_t² = 0
  const A = 1 - p.f * c * c;
  const B = 2 * p.f * pt * c;
  const Cc = -(1 + p.f) * pt * pt;
  let roots: number[];
  if (Math.abs(A) < 1e-12) roots = [-Cc / B];
  else {
    const disc = B * B - 4 * A * Cc;
    if (disc < 0) return;
    const sq = Math.sqrt(disc);
    roots = [(-B + sq) / (2 * A), (-B - sq) / (2 * A)];
  }
  // projected coordinate velocity along û for momentum magnitude m
  const vel = (m: number) => m - p.f * (-pt + m * c) * c;
  roots.sort((r1, r2) => {
    const s1 = vel(r1) > 0 ? 0 : 1, s2 = vel(r2) > 0 ? 0 : 1;
    return s1 !== s2 ? s1 - s2 : Math.abs(r1 - n) - Math.abs(r2 - n);
  });
  const m = roots[0];
  s[5] = ux * m;
  s[6] = uy * m;
  s[7] = uz * m;
}

/** Scale a covariant 4-velocity so g^{μν} u_μ u_ν = −1. */
export function renormalizeTimelike(k: KerrParams, s: Float64Array) {
  const p = ksPoint(k, s[1], s[2], s[3]);
  const n = normCov(p, [s[4], s[5], s[6], s[7]]);
  if (n >= 0) return false;
  const sc = 1 / Math.sqrt(-n);
  s[4] *= sc;
  s[5] *= sc;
  s[6] *= sc;
  s[7] *= sc;
  return true;
}

/**
 * Prograde equatorial circular orbits (Bardeen, Press & Teukolsky 1972).
 * All quantities for M = 1 scaled by the given M.
 */
export function iscoRadius(k: KerrParams, prograde = true): number {
  const M = k.M;
  const s = k.a / M;
  const z1 = 1 + Math.cbrt(1 - s * s) * (Math.cbrt(1 + s) + Math.cbrt(1 - s));
  const z2 = Math.sqrt(3 * s * s + z1 * z1);
  const sign = prograde ? -1 : 1;
  return M * (3 + z2 + sign * Math.sqrt((3 - z1) * (3 + z1 + 2 * z2)));
}

/** Prograde equatorial photon-orbit radius. */
export function photonOrbitRadius(k: KerrParams, prograde = true): number {
  const s = k.a / k.M;
  const sign = prograde ? -1 : 1;
  return 2 * k.M * (1 + Math.cos((2 / 3) * Math.acos(sign * s)));
}

export const keplerOmega = (k: KerrParams, r: number) =>
  Math.sqrt(k.M) / (Math.pow(r, 1.5) + k.a * Math.sqrt(k.M));

/** Specific energy and angular momentum of a prograde circular equatorial orbit (M = 1 form, scaled). */
export function circularEL(k: KerrParams, r: number): { E: number; L: number; Omega: number } {
  const M = k.M, a = k.a;
  const sr = Math.sqrt(r), sM = Math.sqrt(M);
  const den = Math.pow(r, 0.75) * Math.sqrt(Math.pow(r, 1.5) - 3 * M * sr + 2 * a * sM);
  const E = (Math.pow(r, 1.5) - 2 * M * sr + a * sM) / den;
  const L = (sM * (r * r - 2 * a * sM * sr + a * a)) / den;
  return { E, L, Omega: keplerOmega(k, r) };
}

/** Surface gravity of the outer horizon. Late-time redshift of infalling sources ∝ exp(−κ t). */
export function surfaceGravity(k: KerrParams): number {
  const rp = horizonPlus(k), rm = horizonMinus(k);
  return (rp - rm) / (2 * (rp * rp + k.a * k.a));
}

/**
 * Local orthonormal frames (tetrads) in Kerr–Schild coordinates.
 *
 * Reference frame: the "normal" observer of the Kerr–Schild t = const slicing,
 * n_μ = −α ∇_μ t with α = 1/√(1+f). It exists everywhere, including inside the
 * horizon, so it gives a smooth reference for attitude and aberration on both
 * sides of r₊. Its spatial triad is the symmetric orthonormalisation of the
 * coordinate axes, γ^{−1/2} = I + (1/√(1+f) − 1) l lᵀ (closed form since |l| = 1).
 *
 * Any other observer's frame is the pure Lorentz boost of that reference frame
 * to the observer's 4-velocity, followed by the ship's attitude rotation.
 */
import { KSPoint, KerrParams, dot, horizonPlus, ksPoint, lower, raise } from './kerr';

export type V4 = [number, number, number, number];

export interface Tetrad {
  /** e[0] = 4-velocity, e[1..3] = spatial legs. All contravariant. */
  e: [V4, V4, V4, V4];
  point: KSPoint;
}

export function normalObserver(p: KSPoint): { n: V4; eps: [V4, V4, V4] } {
  const sf = Math.sqrt(1 + p.f);
  const n: V4 = [sf, (-p.f * p.lx) / sf, (-p.f * p.ly) / sf, (-p.f * p.lz) / sf];
  const c = 1 / sf - 1;
  const l = [p.lx, p.ly, p.lz];
  const eps = [0, 1, 2].map((k) => {
    const v: V4 = [0, 0, 0, 0];
    for (let i = 0; i < 3; i++) v[i + 1] = (i === k ? 1 : 0) + c * l[k] * l[i];
    return v;
  }) as [V4, V4, V4];
  return { n, eps };
}

/** Pure boost of (n, eps) to 4-velocity u (contravariant). */
export function boostFrame(p: KSPoint, n: V4, eps: [V4, V4, V4], u: V4): [V4, V4, V4] {
  const gamma = -dot(p, n, u);
  const un: V4 = [u[0] + n[0], u[1] + n[1], u[2] + n[2], u[3] + n[3]];
  return eps.map((e) => {
    const k = dot(p, u, e) / (1 + gamma);
    return [e[0] + k * un[0], e[1] + k * un[1], e[2] + k * un[2], e[3] + k * un[3]] as V4;
  }) as [V4, V4, V4];
}

/** Rotation matrix (column-major 3x3 as rows[i][j]) from quaternion [x, y, z, w]. */
export function quatToMat3(q: ArrayLike<number>): number[][] {
  const [x, y, z, w] = [q[0], q[1], q[2], q[3]];
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
    [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
    [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
  ];
}

/**
 * Tetrad of an observer at (x, y, z) with covariant 4-velocity uCov, whose body
 * axes are rotated by quaternion q relative to the boosted reference triad.
 * Body convention (three.js): +X right, +Y up, −Z forward.
 */
export function bodyTetrad(k: KerrParams, pos: ArrayLike<number>, uCov: ArrayLike<number>, q: ArrayLike<number>): Tetrad {
  const p = ksPoint(k, pos[0], pos[1], pos[2]);
  const u = raise(p, uCov, [0, 0, 0, 0]) as V4;
  const { n, eps } = normalObserver(p);
  const ref = boostFrame(p, n, eps, u);
  const R = quatToMat3(q);
  const legs = [0, 1, 2].map((i) => {
    const v: V4 = [0, 0, 0, 0];
    for (let j = 0; j < 3; j++) for (let m = 0; m < 4; m++) v[m] += R[j][i] * ref[j][m];
    return v;
  });
  return { e: [u, legs[0], legs[1], legs[2]], point: p };
}

/** Static observer 4-velocity (contravariant); null if inside the ergoregion. */
export function staticObserver(p: KSPoint): V4 | null {
  const s = 1 - p.f; // −g_tt
  if (s <= 1e-9) return null;
  return [1 / Math.sqrt(s), 0, 0, 0];
}

/**
 * Zero-angular-momentum observer (ZAMO) 4-velocity, contravariant, valid outside
 * the outer horizon. u ∝ ξ_(t) + ω ξ_(φ), ξ_(φ) = (0, −y, x, 0).
 */
export function zamo(k: KerrParams, x: number, y: number, z: number): V4 | null {
  const p = ksPoint(k, x, y, z);
  if (p.r <= horizonPlus(k) * (1 + 1e-6)) return null;
  const xt: V4 = [1, 0, 0, 0];
  const xp: V4 = [0, -y, x, 0];
  const gtp = dot(p, xt, xp);
  const gpp = dot(p, xp, xp);
  if (gpp <= 0) return null;
  const w = -gtp / gpp;
  const v: V4 = [1, -w * y, w * x, 0];
  const nn = dot(p, v, v);
  if (nn >= 0) return null;
  const s = 1 / Math.sqrt(-nn);
  return [v[0] * s, v[1] * s, v[2] * s, v[3] * s];
}

/** Lorentz factor between two observers at the same event. */
export const relGamma = (p: KSPoint, u1: V4, u2: V4) => -dot(p, u1, u2);

/** Express a contravariant vector in tetrad components (frame components V^(a)). */
export function toFrame(t: Tetrad, v: ArrayLike<number>): V4 {
  const out: V4 = [0, 0, 0, 0];
  // V^(0) = −e_0 · V, V^(i) = e_i · V
  out[0] = -dot(t.point, t.e[0], v);
  for (let i = 1; i < 4; i++) out[i] = dot(t.point, t.e[i], v);
  return out;
}

/** Covariant form of each tetrad leg. */
export function tetradCov(t: Tetrad): V4[] {
  return t.e.map((e) => lower(t.point, e, [0, 0, 0, 0]) as V4);
}

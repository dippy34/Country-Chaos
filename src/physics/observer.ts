/**
 * EXTERNAL (RELATIVISTIC) OBSERVER.
 *
 * A static observer far from the hole receives light that left the ship
 * earlier. For each recorded event on the ship's worldline we solve the
 * connecting null geodesic (shooting from the observer, Gauss–Newton on the two
 * sky angles). That gives, per emission event:
 *   - the direction on the observer's sky (lensed),
 *   - the coordinate travel time (so arrival time = t_emit + Δt),
 *   - the frequency ratio g = E_obs / E_emit (gravitational + Doppler),
 *   - an angular-diameter distance from the ray Jacobian (size of the image),
 *   - the direction in the ship's own frame along which the photon left
 *     (which side of the ship the observer actually sees).
 * At observer time T the view shows the emission event whose light arrives at
 * T. Near the horizon arrival times diverge logarithmically, so the image
 * freezes, reddens and fades exponentially (rate = horizon surface gravity) —
 * a separate history from what the pilot experiences.
 */
import { KerrParams, geodesicDeriv, horizonPlus, ksPoint, ksR, lower, raise, rk4Step } from './kerr';
import { Tetrad, V4, bodyTetrad, staticObserver } from './frames';
import { HistorySample } from './shipKerr';

export interface ImageSolution {
  ok: boolean;
  /** Unit direction in observer body frame (where the ship appears). */
  dir: [number, number, number];
  travelT: number;
  g: number;
  DA: number;
  /** Direction (ship body frame) from the ship toward the observer along the emitted photon. */
  emitDirShip: [number, number, number];
  residual: number;
}

const FAIL: ImageSolution = {
  ok: false, dir: [0, 0, -1], travelT: Infinity, g: 0, DA: Infinity, emitDirShip: [0, 0, 1], residual: Infinity,
};

/** Quaternion [x,y,z,w] rotating body −Z to `fwd` and body +Y toward `up` (both in the reference triad). */
export function lookQuat(fwd: number[], up: number[]): [number, number, number, number] {
  const f = norm(fwd);
  const zb = [-f[0], -f[1], -f[2]]; // body +Z
  let xb = cross(up, zb);
  if (Math.hypot(...xb) < 1e-9) xb = cross([1, 0, 0], zb);
  xb = norm(xb);
  const yb = cross(zb, xb);
  // rotation matrix columns = body axes in reference coords
  const m = [
    [xb[0], yb[0], zb[0]],
    [xb[1], yb[1], zb[1]],
    [xb[2], yb[2], zb[2]],
  ];
  return mat3ToQuat(m);
}

export function mat3ToQuat(m: number[][]): [number, number, number, number] {
  const tr = m[0][0] + m[1][1] + m[2][2];
  let x, y, z, w;
  if (tr > 0) {
    const s = 0.5 / Math.sqrt(tr + 1);
    w = 0.25 / s;
    x = (m[2][1] - m[1][2]) * s;
    y = (m[0][2] - m[2][0]) * s;
    z = (m[1][0] - m[0][1]) * s;
  } else if (m[0][0] > m[1][1] && m[0][0] > m[2][2]) {
    const s = 2 * Math.sqrt(1 + m[0][0] - m[1][1] - m[2][2]);
    w = (m[2][1] - m[1][2]) / s;
    x = 0.25 * s;
    y = (m[0][1] + m[1][0]) / s;
    z = (m[0][2] + m[2][0]) / s;
  } else if (m[1][1] > m[2][2]) {
    const s = 2 * Math.sqrt(1 + m[1][1] - m[0][0] - m[2][2]);
    w = (m[0][2] - m[2][0]) / s;
    x = (m[0][1] + m[1][0]) / s;
    y = 0.25 * s;
    z = (m[1][2] + m[2][1]) / s;
  } else {
    const s = 2 * Math.sqrt(1 + m[2][2] - m[0][0] - m[1][1]);
    w = (m[1][0] - m[0][1]) / s;
    x = (m[0][2] + m[2][0]) / s;
    y = (m[1][2] + m[2][1]) / s;
    z = 0.25 * s;
  }
  const n = Math.hypot(x, y, z, w);
  return [x / n, y / n, z / n, w / n];
}

const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: number[]) => {
  const n = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / n, a[1] / n, a[2] / n];
};

interface ShotResult {
  ok: boolean;
  closest: number[];
  t: number;
  p: number[]; // covariant momentum at closest approach
  miss: number[];
}

export class ExternalObserver {
  readonly tetrad: Tetrad;
  readonly rPlus: number;
  private cache = new WeakMap<HistorySample, ImageSolution>();
  private hint = 0;
  private lastDir: [number, number, number] | null = null;
  solvesThisFrame = 0;
  maxSolvesPerFrame = 8;
  private s = new Float64Array(8);
  private d = new Float64Array(8);
  private prev = new Float64Array(8);

  constructor(public k: KerrParams, public pos: [number, number, number], lookAt: [number, number, number] = [0, 0, 0]) {
    const p = ksPoint(k, pos[0], pos[1], pos[2]);
    const u = staticObserver(p);
    if (!u) throw new Error('observer must be outside the ergoregion');
    const uCov = lower(p, u) as V4;
    const fwd = [lookAt[0] - pos[0], lookAt[1] - pos[1], lookAt[2] - pos[2]];
    const q = lookQuat(fwd, Math.abs(norm(fwd)[2]) > 0.95 ? [0, 1, 0] : [0, 0, 1]);
    this.tetrad = bodyTetrad(k, pos, uCov, q);
    this.rPlus = horizonPlus(k);
  }

  /** Shoot a backward ray from the observer along body-frame direction dir and find closest approach to target. */
  private shoot(dir: number[], target: number[]): ShotResult {
    const { k, tetrad } = this;
    const e = tetrad.e;
    const pc: number[] = [0, 0, 0, 0];
    for (let m = 0; m < 4; m++) pc[m] = -e[0][m] + dir[0] * e[1][m] + dir[1] * e[2][m] + dir[2] * e[3][m];
    const pcov = lower(tetrad.point, pc);
    const s = this.s;
    s.set([0, this.pos[0], this.pos[1], this.pos[2], pcov[0], pcov[1], pcov[2], pcov[3]]);
    const rT = ksR(k.a, target[0], target[1], target[2]);
    const rEsc = 3 * Math.max(Math.hypot(...this.pos), Math.hypot(target[0], target[1], target[2]), 20);
    const dist = () => Math.hypot(s[1] - target[0], s[2] - target[1], s[3] - target[2]);
    let prevDist = dist();
    const prev = this.prev;
    for (let i = 0; i < 20000; i++) {
      geodesicDeriv(k.M, k.a, s, this.d);
      const v = Math.hypot(this.d[1], this.d[2], this.d[3]);
      const r = ksR(k.a, s[1], s[2], s[3]);
      const h = Math.max(Math.min(0.02 * Math.max(r, 0.3), 0.25 * prevDist), 1e-12) / v;
      prev.set(s);
      rk4Step(k.M, k.a, s, h);
      const dd = dist();
      if (dd > prevDist) {
        // closest point on segment prev → s
        const ax = prev[1], ay = prev[2], az = prev[3];
        const bx = s[1] - ax, by = s[2] - ay, bz = s[3] - az;
        const L2 = bx * bx + by * by + bz * bz;
        let f = L2 > 0 ? ((target[0] - ax) * bx + (target[1] - ay) * by + (target[2] - az) * bz) / L2 : 0;
        f = Math.min(1, Math.max(0, f));
        const c = [ax + f * bx, ay + f * by, az + f * bz];
        const lerp = (j: number) => prev[j] + f * (s[j] - prev[j]);
        return {
          ok: true,
          closest: c,
          t: lerp(0),
          p: [lerp(4), lerp(5), lerp(6), lerp(7)],
          miss: [c[0] - target[0], c[1] - target[1], c[2] - target[2]],
        };
      }
      prevDist = dd;
      const rn = ksR(k.a, s[1], s[2], s[3]);
      if (rn > rEsc) break;
      if (rT > this.rPlus && rn < this.rPlus * (1 + 1e-7)) break;
    }
    return { ok: false, closest: [0, 0, 0], t: 0, p: [0, 0, 0, 0], miss: [1e9, 1e9, 1e9] };
  }

  private straightGuess(target: number[]): [number, number, number] {
    const w = [0, target[0] - this.pos[0], target[1] - this.pos[1], target[2] - this.pos[2]];
    const p = this.tetrad.point;
    const e = this.tetrad.e;
    const comp = (i: number) => {
      const ei = lower(p, e[i]);
      return ei[0] * w[0] + ei[1] * w[1] + ei[2] * w[2] + ei[3] * w[3];
    };
    return norm([comp(1), comp(2), comp(3)]) as [number, number, number];
  }

  solve(sample: HistorySample): ImageSolution {
    const cached = this.cache.get(sample);
    if (cached) return cached;
    const { k } = this;
    const target = [sample.x, sample.y, sample.z];
    const rT = ksR(k.a, target[0], target[1], target[2]);
    if (rT <= this.rPlus) {
      this.cache.set(sample, FAIL);
      return FAIL;
    }
    this.solvesThisFrame++;
    const D = Math.hypot(target[0] - this.pos[0], target[1] - this.pos[1], target[2] - this.pos[2]);
    const tol = 1e-7 * Math.max(D, 1);
    let d: number[] = this.lastDir ?? this.straightGuess(target);
    let shot = this.shoot(d, target);
    if (!shot.ok) {
      d = this.straightGuess(target);
      shot = this.shoot(d, target);
    }
    const delta = 1e-6;
    let J: number[][] = [[0, 0], [0, 0], [0, 0]];
    for (let iter = 0; iter < 14 && shot.ok; iter++) {
      const b1 = norm(cross(d, Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
      const b2 = cross(d, b1);
      const s1 = this.shoot(norm([d[0] + delta * b1[0], d[1] + delta * b1[1], d[2] + delta * b1[2]]), target);
      const s2 = this.shoot(norm([d[0] + delta * b2[0], d[1] + delta * b2[1], d[2] + delta * b2[2]]), target);
      if (!s1.ok || !s2.ok) break;
      J = [0, 1, 2].map((i) => [(s1.miss[i] - shot.miss[i]) / delta, (s2.miss[i] - shot.miss[i]) / delta]);
      if (Math.hypot(...shot.miss) < tol) break;
      // normal equations
      const a11 = J[0][0] ** 2 + J[1][0] ** 2 + J[2][0] ** 2;
      const a22 = J[0][1] ** 2 + J[1][1] ** 2 + J[2][1] ** 2;
      const a12 = J[0][0] * J[0][1] + J[1][0] * J[1][1] + J[2][0] * J[2][1];
      const r1 = -(J[0][0] * shot.miss[0] + J[1][0] * shot.miss[1] + J[2][0] * shot.miss[2]);
      const r2 = -(J[0][1] * shot.miss[0] + J[1][1] * shot.miss[1] + J[2][1] * shot.miss[2]);
      const det = a11 * a22 - a12 * a12;
      if (Math.abs(det) < 1e-300) break;
      let x1 = (r1 * a22 - r2 * a12) / det;
      let x2 = (a11 * r2 - a12 * r1) / det;
      const st = Math.hypot(x1, x2);
      if (st > 0.2) {
        x1 *= 0.2 / st;
        x2 *= 0.2 / st;
      }
      const dn = norm([d[0] + x1 * b1[0] + x2 * b2[0], d[1] + x1 * b1[1] + x2 * b2[1], d[2] + x1 * b1[2] + x2 * b2[2]]);
      const ns = this.shoot(dn, target);
      if (!ns.ok) break;
      d = dn;
      shot = ns;
    }
    const residual = Math.hypot(...shot.miss);
    if (!shot.ok || residual > Math.max(1e-3 * D, 1e-4)) {
      this.cache.set(sample, FAIL);
      return FAIL;
    }
    this.lastDir = d as [number, number, number];
    // redshift: E_obs = 1 by construction; E_emit = p'_μ u_ship^μ
    const pp = ksPoint(k, target[0], target[1], target[2]);
    const uShip = raise(pp, sample.u);
    const Eemit = shot.p[0] * uShip[0] + shot.p[1] * uShip[1] + shot.p[2] * uShip[2] + shot.p[3] * uShip[3];
    const g = Eemit > 0 ? 1 / Eemit : 0;
    // angular-diameter distance from the ray Jacobian
    const a11 = J[0][0] ** 2 + J[1][0] ** 2 + J[2][0] ** 2;
    const a22 = J[0][1] ** 2 + J[1][1] ** 2 + J[2][1] ** 2;
    const a12 = J[0][0] * J[0][1] + J[1][0] * J[1][1] + J[2][0] * J[2][1];
    const DA = Math.sqrt(Math.sqrt(Math.max(a11 * a22 - a12 * a12, 0))) || D;
    // emitted photon (forward) = −p'; its direction in the ship frame
    const shipT = bodyTetrad(k, target, sample.u, sample.q);
    const pCon = raise(pp, shot.p);
    const comp = (i: number) => {
      const ei = lower(pp, shipT.e[i]);
      return -(ei[0] * pCon[0] + ei[1] * pCon[1] + ei[2] * pCon[2] + ei[3] * pCon[3]);
    };
    const emit = norm([comp(1), comp(2), comp(3)]) as [number, number, number];
    const sol: ImageSolution = { ok: true, dir: d as [number, number, number], travelT: -shot.t, g, DA, emitDirShip: emit, residual };
    this.cache.set(sample, sol);
    return sol;
  }

  arrival(sample: HistorySample): number {
    const s = this.solve(sample);
    return s.ok ? sample.t + s.travelT : Infinity;
  }

  /**
   * What the observer sees at coordinate time T: interpolated image between the
   * two recorded emission events bracketing the arrival time.
   */
  imageAt(T: number, history: HistorySample[]): null | {
    a: HistorySample; b: HistorySample | null; frac: number; sol: ImageSolution; solB: ImageSolution | null; tauEmit: number;
  } {
    const n = history.length;
    if (n === 0) return null;
    this.solvesThisFrame = 0;
    let i = Math.min(this.hint, n - 1);
    const budget = () => this.solvesThisFrame < this.maxSolvesPerFrame || this.cache.has(history[Math.min(i + 1, n - 1)]);
    if (this.arrival(history[i]) > T) {
      // binary search for the last sample arriving before T
      let lo = 0, hi = i;
      if (this.arrival(history[0]) > T) return null;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (this.arrival(history[mid]) <= T) lo = mid;
        else hi = mid;
      }
      i = lo;
    } else {
      while (i + 1 < n && budget() && this.arrival(history[i + 1]) <= T) i++;
    }
    this.hint = i;
    const a = history[i];
    const sol = this.solve(a);
    if (!sol.ok) return null;
    let b: HistorySample | null = null, solB: ImageSolution | null = null, frac = 0;
    if (i + 1 < n) {
      const sb = this.solve(history[i + 1]);
      if (sb.ok) {
        b = history[i + 1];
        solB = sb;
        const ta = a.t + sol.travelT, tb = b.t + sb.travelT;
        frac = tb > ta ? Math.min(1, Math.max(0, (T - ta) / (tb - ta))) : 0;
      }
    }
    const tauEmit = a.tau + (b ? frac * (b.tau - a.tau) : 0);
    return { a, b, frac, sol, solB, tauEmit };
  }
}

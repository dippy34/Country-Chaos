/**
 * Spacecraft dynamics in Kerr spacetime.
 *
 * State: Kerr–Schild position x^μ and covariant 4-velocity u_μ, advanced in the
 * ship's proper time τ with
 *     dx^μ/dτ = g^{μν} u_ν,     du_μ/dτ = −∂_μ H + a_μ
 * where a^μ is the engine's 4-acceleration (orthogonal to u, built from the
 * ship's body tetrad). No scripted motion: whatever the pilot does, the hole's
 * gravity, frame dragging and the horizon act on this state.
 */
import { KerrParams, geodesicDeriv, horizonMinus, horizonPlus, ksPoint, ksR, lower, renormalizeTimelike } from './kerr';
import { Tetrad, V4, bodyTetrad, normalObserver, relGamma, toFrame, zamo } from './frames';
import { christoffel } from './tidal';

export interface HistorySample {
  tau: number;
  t: number;
  x: number;
  y: number;
  z: number;
  u: V4; // covariant
  q: [number, number, number, number];
  thrust: number; // engine output 0..1 (for plume brightness)
}

export class KerrShip {
  /** [t, x, y, z, u_t, u_x, u_y, u_z] */
  s = new Float64Array(8);
  tau = 0;
  /** Body → reference-frame rotation, [x, y, z, w]. */
  q: [number, number, number, number] = [0, 0, 0, 1];
  /** Engine command: proper acceleration in body frame (geometric units). */
  thrustBody: [number, number, number] = [0, 0, 0];
  readonly rPlus: number;
  readonly rMinus: number;
  history: HistorySample[] = [];
  maxHistory = 120_000;
  /** Set when the worldline has reached a region the model cannot follow. */
  terminated: null | 'inner-horizon' | 'singularity' = null;
  private lastRecordTau = -Infinity;
  private lastRecordLog = Infinity;

  constructor(public k: KerrParams) {
    this.rPlus = horizonPlus(k);
    this.rMinus = horizonMinus(k);
  }

  get r() {
    return ksR(this.k.a, this.s[1], this.s[2], this.s[3]);
  }
  get pos(): [number, number, number] {
    return [this.s[1], this.s[2], this.s[3]];
  }
  get uCov(): V4 {
    return [this.s[4], this.s[5], this.s[6], this.s[7]];
  }
  get insideHorizon() {
    return this.r < this.rPlus;
  }

  /** Place the ship at rest relative to the local ZAMO (static for a = 0). */
  placeAtRest(pos: [number, number, number]) {
    const z = zamo(this.k, pos[0], pos[1], pos[2]);
    if (!z) throw new Error('cannot start inside horizon');
    const p = ksPoint(this.k, pos[0], pos[1], pos[2]);
    const u = lower(p, z);
    this.s.set([0, pos[0], pos[1], pos[2], u[0], u[1], u[2], u[3]]);
    this.tau = 0;
    this.history = [];
    this.terminated = null;
    this.lastRecordTau = -Infinity;
    this.record(true);
  }

  /** Set velocity: ZAMO frame + 3-velocity (frame components along KS-normal triad), |v| < 1. */
  setVelocityRelZamo(v: [number, number, number]) {
    const pos = this.pos;
    const z = zamo(this.k, pos[0], pos[1], pos[2]);
    if (!z) return;
    const p = ksPoint(this.k, pos[0], pos[1], pos[2]);
    const zamoT = bodyTetrad(this.k, pos, lower(p, z), [0, 0, 0, 1]);
    const v2 = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    const g = 1 / Math.sqrt(1 - v2);
    const u: V4 = [0, 0, 0, 0];
    for (let m = 0; m < 4; m++)
      u[m] = g * (zamoT.e[0][m] + v[0] * zamoT.e[1][m] + v[1] * zamoT.e[2][m] + v[2] * zamoT.e[3][m]);
    const uc = lower(p, u);
    this.s[4] = uc[0];
    this.s[5] = uc[1];
    this.s[6] = uc[2];
    this.s[7] = uc[3];
    renormalizeTimelike(this.k, this.s);
  }

  tetrad(): Tetrad {
    return bodyTetrad(this.k, this.pos, this.uCov, this.q);
  }

  private deriv(st: Float64Array, out: Float64Array) {
    geodesicDeriv(this.k.M, this.k.a, st, out);
    const tb = this.thrustBody;
    if (tb[0] === 0 && tb[1] === 0 && tb[2] === 0) return;
    const t = bodyTetrad(this.k, [st[1], st[2], st[3]], [st[4], st[5], st[6], st[7]], this.q);
    const aCon: V4 = [0, 0, 0, 0];
    for (let m = 0; m < 4; m++) aCon[m] = tb[0] * t.e[1][m] + tb[1] * t.e[2][m] + tb[2] * t.e[3][m];
    const aCov = lower(t.point, aCon);
    for (let m = 0; m < 4; m++) out[4 + m] += aCov[m];
  }

  private k1 = new Float64Array(8);
  private k2 = new Float64Array(8);
  private k3 = new Float64Array(8);
  private k4 = new Float64Array(8);
  private tmp = new Float64Array(8);

  private rk4(h: number) {
    const { s, k1, k2, k3, k4, tmp } = this;
    this.deriv(s, k1);
    for (let i = 0; i < 8; i++) tmp[i] = s[i] + 0.5 * h * k1[i];
    this.deriv(tmp, k2);
    for (let i = 0; i < 8; i++) tmp[i] = s[i] + 0.5 * h * k2[i];
    this.deriv(tmp, k3);
    for (let i = 0; i < 8; i++) tmp[i] = s[i] + h * k3[i];
    this.deriv(tmp, k4);
    for (let i = 0; i < 8; i++) s[i] += (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    renormalizeTimelike(this.k, s);
  }

  /** Largest safe proper-time substep at the current state. */
  maxSubstep(): number {
    const r = this.r;
    const rp = this.rPlus;
    let h = 0.01 * Math.pow(Math.max(r, 0.05), 1.5);
    // densely sample the approach to (and departure from) the horizon so the
    // external observer can resolve the exponential redshift of the last light
    const dh = Math.abs(r - rp);
    if (dh < 1) h = Math.min(h, Math.max(0.04 * dh, 2e-7));
    // near the inner horizon / singularity, refine with distance to the end
    if (r < rp) h = Math.min(h, Math.max(0.02 * (r - this.rMinus), 1e-7));
    const a = Math.hypot(...this.thrustBody);
    if (a > 0) h = Math.min(h, 0.02 / a);
    return h;
  }

  /**
   * Advance by dTau of proper time with at most maxSteps substeps. Returns the
   * proper time actually advanced (less than requested if the budget ran out).
   */
  advance(dTau: number, maxSteps = 400): number {
    if (this.terminated) return 0;
    let done = 0;
    for (let i = 0; i < maxSteps && done < dTau; i++) {
      const h = Math.min(this.maxSubstep(), dTau - done);
      this.rk4(h);
      done += h;
      this.tau += h;
      this.record(false);
      const r = this.r;
      if (this.k.a !== 0 && r < this.rMinus * 1.02 + 1e-6) {
        this.terminated = 'inner-horizon';
        break;
      }
      if (r < 0.02 * this.rPlus) {
        this.terminated = 'singularity';
        break;
      }
    }
    return done;
  }

  private record(force: boolean) {
    const r = this.r;
    const lg = Math.log(Math.abs(r - this.rPlus) + 1e-300);
    const near = Math.abs(r - this.rPlus) < 2;
    const dTauRec = 0.02 * Math.pow(Math.max(r, 1), 1.5);
    if (!force) {
      if (near) {
        if (Math.abs(lg - this.lastRecordLog) < 0.03 && this.tau - this.lastRecordTau < dTauRec) return;
      } else if (this.tau - this.lastRecordTau < dTauRec) return;
    }
    this.lastRecordTau = this.tau;
    this.lastRecordLog = lg;
    const s = this.s;
    this.history.push({
      tau: this.tau,
      t: s[0],
      x: s[1],
      y: s[2],
      z: s[3],
      u: [s[4], s[5], s[6], s[7]],
      q: [...this.q] as [number, number, number, number],
      thrust: Math.min(1, Math.hypot(...this.thrustBody) > 0 ? 1 : 0),
    });
    if (this.history.length > this.maxHistory) this.history.splice(0, this.history.length - this.maxHistory);
  }

  /**
   * Give the ship a past: integrate the (unpowered) worldline backward by
   * dTauBack, then forward again while recording history. The external
   * observer can then immediately see light the ship emitted before "now".
   */
  preroll(dTauBack: number) {
    const thrust = this.thrustBody;
    this.thrustBody = [0, 0, 0];
    const start = Float64Array.from(this.s);
    let back = 0;
    for (let i = 0; i < 20000 && back < dTauBack; i++) {
      const h = Math.min(this.maxSubstep(), dTauBack - back);
      this.rk4(-h);
      back += h;
      if (this.r < this.rPlus * 1.5) break; // do not reconstruct a past inside the hole
    }
    const t0 = this.s[0];
    this.history = [];
    this.lastRecordTau = -Infinity;
    this.tau = -back;
    this.record(true);
    let fwd = 0;
    for (let i = 0; i < 40000 && fwd < back; i++) {
      const h = Math.min(this.maxSubstep(), back - fwd);
      this.rk4(h);
      fwd += h;
      this.tau += h;
      this.record(false);
    }
    // snap back exactly onto the starting state (removes integration round-off)
    this.s.set(start);
    this.tau = 0;
    this.thrustBody = thrust;
    void t0;
  }

  /** Lorentz factor and speed relative to the ZAMO (outside) or KS-normal observer (inside). */
  localSpeed(): { gamma: number; v: number; frame: 'ZAMO' | 'KS-normal' } {
    const pos = this.pos;
    const p = ksPoint(this.k, pos[0], pos[1], pos[2]);
    const u = this.tetrad().e[0];
    const z = zamo(this.k, pos[0], pos[1], pos[2]);
    const ref = z ?? normalObserver(p).n;
    const gamma = Math.max(1, relGamma(p, u, ref));
    return { gamma, v: Math.sqrt(1 - 1 / (gamma * gamma)), frame: z ? 'ZAMO' : 'KS-normal' };
  }

  /**
   * Velocity of the local ZAMO as seen in the ship's body frame (frame
   * components). Used by the station-keeping autopilot. Null inside r₊.
   */
  zamoVelocityInBody(): [number, number, number] | null {
    const pos = this.pos;
    const z = zamo(this.k, pos[0], pos[1], pos[2]);
    if (!z) return null;
    const f = toFrame(this.tetrad(), z);
    return [f[1] / f[0], f[2] / f[0], f[3] / f[0]];
  }
}

/**
 * 4-acceleration a^μ = u^ν ∇_ν u^μ of the ZAMO congruence at pos (contravariant),
 * i.e. the proper acceleration engines must supply to hold station there.
 * Directional derivative by finite difference along u, plus Γ^μ_{νλ} u^ν u^λ.
 */
export function zamoAcceleration(k: KerrParams, pos: [number, number, number]): V4 | null {
  const u = zamo(k, pos[0], pos[1], pos[2]);
  if (!u) return null;
  const r = ksR(k.a, pos[0], pos[1], pos[2]);
  const eps = 1e-6 * Math.max(r, 1);
  const p2: [number, number, number] = [pos[0] + eps * u[1], pos[1] + eps * u[2], pos[2] + eps * u[3]];
  const u2 = zamo(k, p2[0], p2[1], p2[2]);
  if (!u2) return null;
  const G = christoffel(k, pos[0], pos[1], pos[2]);
  const a: V4 = [0, 0, 0, 0];
  for (let m = 0; m < 4; m++) {
    let s = (u2[m] - u[m]) / eps;
    for (let n = 0; n < 4; n++) for (let l = 0; l < 4; l++) s += G[m * 16 + n * 4 + l] * u[n] * u[l];
    a[m] = s;
  }
  return a;
}

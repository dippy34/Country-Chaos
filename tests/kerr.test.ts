import { describe, expect, it } from 'vitest';
import {
  KerrParams, circularEL, dot, geodesicDeriv, hamiltonian, horizonPlus, iscoRadius, ksPoint, ksR,
  lower, photonOrbitRadius, raise, renormalizeNull, rk4Step,
} from '../src/physics/kerr';
import { bodyTetrad, normalObserver } from '../src/physics/frames';
import { eigenSym3, tidalTensor } from '../src/physics/tidal';
import { ntFluxDimensionless } from '../src/physics/disk';

const S: KerrParams = { M: 1, a: 0 };
const K: KerrParams = { M: 1, a: 0.9 };

function nullState(k: KerrParams, pos: number[], dir: number[]): Float64Array {
  // photon leaving pos along spatial direction dir (unit, coordinate), energy at infinity = 1
  const s = new Float64Array([0, pos[0], pos[1], pos[2], -1, dir[0], dir[1], dir[2]]);
  renormalizeNull(k, s);
  return s;
}

function integrate(k: KerrParams, s: Float64Array, until: (s: Float64Array) => boolean, hfrac = 0.01, maxSteps = 2e6) {
  const d = new Float64Array(8);
  for (let i = 0; i < maxSteps; i++) {
    if (until(s)) return i;
    geodesicDeriv(k.M, k.a, s, d);
    const r = ksR(k.a, s[1], s[2], s[3]);
    const v = Math.hypot(d[1], d[2], d[3]);
    rk4Step(k.M, k.a, s, (hfrac * Math.max(r, 0.5)) / v);
  }
  throw new Error('did not terminate');
}

describe('Kerr–Schild metric', () => {
  it('horizons and ISCO match textbook values', () => {
    expect(horizonPlus(S)).toBeCloseTo(2, 12);
    expect(iscoRadius(S)).toBeCloseTo(6, 10);
    expect(iscoRadius({ M: 1, a: 0.998 })).toBeCloseTo(1.2369, 3);
    expect(photonOrbitRadius(S)).toBeCloseTo(3, 10);
    expect(photonOrbitRadius({ M: 1, a: 1 })).toBeCloseTo(1, 6);
  });

  it('raise/lower are inverse and r solves the quartic', () => {
    const p = ksPoint(K, 1.3, -0.7, 0.9);
    const r = p.r;
    expect(r ** 4 - (1.3 ** 2 + 0.7 ** 2 + 0.9 ** 2 - 0.81) * r * r - 0.81 * 0.81).toBeCloseTo(0, 10);
    const v = [0.3, -1.2, 0.4, 2.0];
    const back = raise(p, lower(p, v));
    v.forEach((c, i) => expect(back[i]).toBeCloseTo(c, 12));
  });

  it('analytic Hamiltonian gradient matches finite differences (inside and outside horizon)', () => {
    for (const pos of [[5, 2, -3], [1.1, 0.3, 0.4], [0.2, 0.8, -0.6]]) {
      const s = [0, pos[0], pos[1], pos[2], -0.8, 0.3, -0.5, 0.9];
      const d = new Float64Array(8);
      geodesicDeriv(K.M, K.a, s, d);
      for (let i = 1; i < 4; i++) {
        const h = 1e-6;
        const sp = s.slice(), sm = s.slice();
        sp[i] += h;
        sm[i] -= h;
        const num = -(hamiltonian(K, sp) - hamiltonian(K, sm)) / (2 * h);
        expect(d[i + 4]).toBeCloseTo(num, 6);
      }
      for (let i = 4; i < 8; i++) {
        const h = 1e-6;
        const sp = s.slice(), sm = s.slice();
        sp[i] += h;
        sm[i] -= h;
        const num = (hamiltonian(K, sp) - hamiltonian(K, sm)) / (2 * h);
        expect(d[i - 4]).toBeCloseTo(num, 6);
      }
    }
  });
});

describe('geodesics', () => {
  it('timelike circular orbit at r = 10 stays circular with Ω = 1/(r^1.5 + a)', () => {
    for (const k of [S, K]) {
      const r0 = 10;
      const { Omega } = circularEL(k, r0);
      const p = ksPoint(k, r0, 0, 0);
      // u^μ = u^t (1, −Ω y, Ω x, 0) — Killing vectors coincide with Boyer–Lindquist ones
      const v = [1, 0, Omega * r0, 0];
      // equatorial x-axis point in KS: x = r cosφ − a sinφ... at φ_KS = 0, (x, y) = (r, a)
      const pos = [r0, k.a, 0];
      const pp = ksPoint(k, pos[0], pos[1], pos[2]);
      expect(pp.r).toBeCloseTo(r0, 10);
      v[1] = -Omega * pos[1];
      v[2] = Omega * pos[0];
      const n = dot(pp, v, v);
      const ut = 1 / Math.sqrt(-n);
      const u = lower(pp, v.map((c) => c * ut));
      void p;
      const s = new Float64Array([0, pos[0], pos[1], pos[2], u[0], u[1], u[2], u[3]]);
      const T = (2 * Math.PI) / Omega;
      const N = 4000;
      for (let i = 0; i < N; i++) rk4Step(k.M, k.a, s, T / ut / N);
      expect(ksR(k.a, s[1], s[2], s[3])).toBeCloseTo(r0, 5);
      expect(s[0]).toBeCloseTo(T, 3);
      expect(s[3]).toBeCloseTo(0, 10);
    }
  });

  it('weak-field light deflection ≈ 4M/b + 15π M²/(4 b²)', () => {
    const b = 400;
    const s = nullState(S, [-2e5, b, 0], [1, 0, 0]);
    integrate(S, s, (st) => st[1] > 2e5, 0.005);
    const defl = Math.atan2(-s[6], s[5]);
    const expected = 4 / b + (15 * Math.PI) / (4 * b * b);
    // finite start/end distance removes ~2b/2e5 per side of the 4M/b integral
    const truncation = (4 / b) * (1 - 2e5 / Math.hypot(2e5, b));
    expect(defl).toBeCloseTo(expected - truncation, 4);
  });

  it('outgoing radial light delay matches (r_o − r_e) + 4M ln((r_o − 2M)/(r_e − 2M)) in KS time', () => {
    const re = 2.5, ro = 100;
    const s = nullState(S, [re, 0, 0], [1, 0, 0]);
    integrate(S, s, (st) => st[1] >= ro, 0.002);
    // step back to exactly ro by linear correction
    const d = new Float64Array(8);
    geodesicDeriv(1, 0, s, d);
    const t = s[0] - ((s[1] - ro) * d[0]) / d[1];
    expect(t).toBeCloseTo(ro - re + 4 * Math.log((ro - 2) / (re - 2)), 3);
  });

  it('static-emitter redshift to infinity is √(1 − 2M/r)', () => {
    const r = 10;
    const p = ksPoint(S, r, 0, 0);
    const uStatic = [1 / Math.sqrt(1 - p.f), 0, 0, 0];
    const s = nullState(S, [r, 0, 0], [0.6, 0.8, 0]);
    // energy measured by static emitter: E = −p_μ u^μ ; at infinity E∞ = −p_t = 1
    const E = -(s[4] * uStatic[0]);
    expect(1 / E).toBeCloseTo(Math.sqrt(1 - 2 / r), 10);
  });

  it('Hamiltonian is conserved along a strongly bent Kerr photon', () => {
    const s = nullState(K, [-30, 3.2, 1], [1, 0, 0]);
    let maxH = 0;
    integrate(K, s, (st) => {
      maxH = Math.max(maxH, Math.abs(hamiltonian(K, st)));
      return Math.hypot(st[1], st[2], st[3]) > 60 || ksR(K.a, st[1], st[2], st[3]) < horizonPlus(K) * 1.01;
    }, 0.01);
    expect(maxH).toBeLessThan(1e-6);
  });
});

describe('frames', () => {
  it('body tetrad is orthonormal everywhere, including inside the horizon', () => {
    for (const pos of [[8, 1, 2], [1.2, 0.4, 0.3], [0.6, 0.2, -0.3]]) {
      const p = ksPoint(K, pos[0], pos[1], pos[2]);
      const { n } = normalObserver(p);
      // a boosted velocity: n plus some spatial motion, normalised
      const v = [n[0], n[1] + 0.12, n[2] - 0.09, n[3] + 0.15];
      const nn = dot(p, v, v);
      const u = lower(p, v.map((c) => c / Math.sqrt(-nn)));
      const t = bodyTetrad(K, pos, u, [0.1, 0.2, 0.3, Math.sqrt(1 - 0.14)]);
      const eta = [-1, 1, 1, 1];
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) expect(dot(p, t.e[i], t.e[j])).toBeCloseTo(i === j ? eta[i] : 0, 9);
    }
  });
});

describe('tidal tensor', () => {
  const staticTetrad = (k: KerrParams, pos: number[]) => {
    const p = ksPoint(k, pos[0], pos[1], pos[2]);
    const u = lower(p, [1 / Math.sqrt(1 - p.f), 0, 0, 0]);
    return bodyTetrad(k, pos, u, [0, 0, 0, 1]);
  };

  it('Schwarzschild static observer: eigenvalues (−2, 1, 1) M/r³', () => {
    const r = 10;
    const pos = [r / Math.sqrt(3), r / Math.sqrt(3), r / Math.sqrt(3)];
    const E = tidalTensor(S, pos, staticTetrad(S, pos));
    const { values } = eigenSym3(E);
    expect(values[0]).toBeCloseTo(-2 / r ** 3, 7);
    expect(values[1]).toBeCloseTo(1 / r ** 3, 7);
    expect(values[2]).toBeCloseTo(1 / r ** 3, 7);
  });

  it('radially boosted observer sees the same Schwarzschild tidal field', () => {
    const r = 10;
    const pos = [r, 0, 0];
    const p = ksPoint(S, ...(pos as [number, number, number]));
    // free fall from rest at infinity: E = 1, radial; u_t = −1, choose u_x so that norm = −1
    // g^{μν}u_μu_ν = −1 solved for u_x (ingoing)
    const solve = (ux: number) => {
      const lw = 1 + p.lx * ux;
      return -1 + ux * ux - p.f * lw * lw + 1;
    };
    // quadratic: (1 − f) ux² − 2 f ux − f = 0  →  ingoing root
    const f = p.f;
    const ux = (2 * f - Math.sqrt(4 * f * f + 4 * (1 - f) * f)) / (2 * (1 - f));
    expect(solve(ux)).toBeCloseTo(0, 12);
    const t = bodyTetrad(S, pos, [-1, ux, 0, 0], [0, 0, 0, 1]);
    const { values } = eigenSym3(tidalTensor(S, pos, t));
    expect(values[0]).toBeCloseTo(-2 / r ** 3, 7);
    expect(values[2]).toBeCloseTo(1 / r ** 3, 7);
  });

  it('Kerr on-axis static observer matches Re ψ₂ and the tensor is traceless', () => {
    const r = 5, a = 0.9;
    const pos = [0, 0, r];
    const E = tidalTensor(K, pos, staticTetrad(K, pos));
    const expected = (-2 * (r ** 3 - 3 * r * a * a)) / (r * r + a * a) ** 3;
    expect(E[2][2]).toBeCloseTo(expected, 7);
    expect(E[0][0] + E[1][1] + E[2][2]).toBeCloseTo(0, 8);
  });
});

describe('Novikov–Thorne disk', () => {
  it('matches the closed-form Schwarzschild Page–Thorne flux', () => {
    // (E − ΩL) L_{,r} = (r − 6) / (2 √r (r − 3)); with u = √r its integral is u − (√3/2) ln((u − √3)/(u + √3))
    const I = (r: number) => {
      const F = (u: number) => u - (Math.sqrt(3) / 2) * Math.log((u - Math.sqrt(3)) / (u + Math.sqrt(3)));
      return F(Math.sqrt(r)) - F(Math.sqrt(6));
    };
    for (const r of [8, 20, 2000]) {
      const exact = (1 / (4 * Math.PI * r)) * 1.5 * r ** -2.5 * (r / (r - 3)) * I(r);
      expect(ntFluxDimensionless(S, 6, r, 3000) / exact).toBeCloseTo(1, 4);
    }
  });
});

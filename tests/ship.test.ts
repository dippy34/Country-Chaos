import { describe, expect, it } from 'vitest';
import { KerrShip } from '../src/physics/shipKerr';
import { ExternalObserver } from '../src/physics/observer';
import { KerrParams, ksPoint, lower } from '../src/physics/kerr';

const S: KerrParams = { M: 1, a: 0 };

function dropFromRest(k: KerrParams, r0: number) {
  const ship = new KerrShip(k);
  ship.placeAtRest([r0, 0, 0]);
  return ship;
}

describe('ship in Schwarzschild spacetime', () => {
  it('free fall from rest: proper time follows the cycloid τ = √(r0³/8M)(η + sin η)', () => {
    const r0 = 10;
    const ship = dropFromRest(S, r0);
    const rEnd = 0.5;
    while (ship.r > rEnd && !ship.terminated) ship.advance(0.05, 1000);
    // interpolate τ at rEnd from the history tail
    const h = ship.history;
    const last = h[h.length - 1];
    const eta = Math.acos((2 * Math.hypot(last.x, last.y, last.z)) / r0 - 1);
    const tauExpected = Math.sqrt(r0 ** 3 / 8) * (eta + Math.sin(eta));
    expect(last.tau).toBeCloseTo(tauExpected, 4);
    // crossed the horizon without anything special happening
    expect(h.some((s) => Math.hypot(s.x, s.y, s.z) < 2)).toBe(true);
  });

  it('hovering engines need a = M / (r² √(1 − 2M/r)) to stay put', () => {
    const r0 = 6;
    const ship = dropFromRest(S, r0);
    // body −Z forward by default; point +Y (up) outward along +x: thrust along +Y body after rotating
    // rotate body so +Y maps to +x reference: quaternion for −90° about z
    const s = Math.SQRT1_2;
    ship.q = [0, 0, -s, s];
    const a = 1 / (r0 * r0 * Math.sqrt(1 - 2 / r0));
    ship.thrustBody = [0, a, 0];
    for (let i = 0; i < 100; i++) ship.advance(0.5);
    expect(ship.r).toBeCloseTo(r0, 4);
  });
});

describe('external observer', () => {
  it('radial infall: arrival delay, exponential late-time fading at the surface-gravity rate', () => {
    const ship = dropFromRest(S, 10);
    while (!ship.terminated && ship.r > 1.0) ship.advance(0.05, 4000);
    const obs = new ExternalObserver(S, [60, 0, 0]);
    obs.maxSolvesPerFrame = 1e9;
    const outside = ship.history.filter((s) => Math.hypot(s.x, s.y, s.z) > 2.000001);
    // check travel time against the analytic radial formula for a few samples
    for (const smp of [outside[5], outside[Math.floor(outside.length / 2)]]) {
      const re = Math.hypot(smp.x, smp.y, smp.z);
      const sol = obs.solve(smp);
      expect(sol.ok).toBe(true);
      expect(sol.travelT).toBeCloseTo(60 - re + 4 * Math.log((60 - 2) / (re - 2)), 2);
    }
    // late-time: ln g vs arrival time slope → −κ = −1/(4M)
    const late = outside.filter((s) => Math.hypot(s.x, s.y, s.z) - 2 < 1e-3 && Math.hypot(s.x, s.y, s.z) - 2 > 1e-5);
    const pts = late.map((s) => ({ T: obs.arrival(s), lg: Math.log(obs.solve(s).g) }));
    const first = pts[0], lastp = pts[pts.length - 1];
    const slope = (lastp.lg - first.lg) / (lastp.T - first.T);
    expect(slope).toBeCloseTo(-0.25, 2);
    // the observed image at a very late time is still the frozen, faded ship (not a crossing)
    const img = obs.imageAt(1e4, ship.history);
    expect(img).not.toBeNull();
    expect(img!.sol.g).toBeLessThan(1e-3);
  });

  it('off-axis observer finds a lensed path with consistent redshift', () => {
    const k: KerrParams = { M: 1, a: 0.9 };
    const ship = new KerrShip(k);
    ship.placeAtRest([8, 0, 1]);
    const obs = new ExternalObserver(k, [0, 40, 5]);
    const sol = obs.solve(ship.history[0]);
    expect(sol.ok).toBe(true);
    expect(sol.residual).toBeLessThan(1e-4);
    // ship at rest w.r.t. ZAMO deep in the well: light is redshifted on the way out
    expect(sol.g).toBeLessThan(1);
    expect(sol.g).toBeGreaterThan(0.5);
    const p = ksPoint(k, 8, 0, 1);
    void lower(p, [1, 0, 0, 0]);
  });
});

import { zamoAcceleration } from '../src/physics/shipKerr';
import { dot as kdot } from '../src/physics/kerr';
describe('station keeping', () => {
  it('ZAMO acceleration in Schwarzschild equals M / (r² √(1 − 2M/r))', () => {
    const r = 7;
    const a = zamoAcceleration(S, [r, 0, 0])!;
    const p = ksPoint(S, r, 0, 0);
    const mag = Math.sqrt(kdot(p, a, a));
    expect(mag).toBeCloseTo(1 / (r * r * Math.sqrt(1 - 2 / r)), 5);
  });
});

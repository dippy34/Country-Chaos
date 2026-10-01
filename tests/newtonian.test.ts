import { describe, expect, it } from 'vitest';
import { NewtonianWorld } from '../src/world/newtonianWorld';
import { SYSTEMS, NewtonianSystemDef } from '../src/world/systems';
import { G } from '../src/physics/constants';

const jup = SYSTEMS.find((s) => s.id === 'jupiter') as NewtonianSystemDef;
const noCtl = { thrust: [0, 0, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] };

describe('Newtonian systems', () => {
  it('a circular orbit around Jupiter stays circular for a full period', () => {
    const w = new NewtonianWorld(jup);
    const J = w.bodies.find((b) => b.def.name === 'Jupiter')!;
    const r = 8 * J.def.radius;
    w.pos = [J.pos[0], J.pos[1], J.pos[2] + r]; // over the pole: avoids the moons' plane
    const v = Math.sqrt((G * J.def.mass) / r);
    w.w = [J.vel[0] + v, J.vel[1], J.vel[2]];
    const period = (2 * Math.PI * r) / v;
    for (let i = 0; i < 200; i++) w.update(period / 200, 1, noCtl);
    const d = Math.hypot(w.pos[0] - J.pos[0], w.pos[1] - J.pos[1], w.pos[2] - J.pos[2]);
    expect(Math.abs(d / r - 1)).toBeLessThan(0.02);
  });

  it('weak-field time dilation matches Σ GM/(r c²) + v²/2c²', () => {
    const w = new NewtonianWorld(jup);
    const t = w.telemetry();
    const c2 = 299_792_458 ** 2;
    let phi = 0;
    for (const b of w.bodies) phi += (G * b.def.mass) / Math.hypot(w.pos[0] - b.pos[0], w.pos[1] - b.pos[1], w.pos[2] - b.pos[2]);
    const v = w.vel;
    const expected = phi / c2 + (v[0] ** 2 + v[1] ** 2 + v[2] ** 2) / (2 * c2);
    expect((1 - t.dTauDt!) / expected).toBeCloseTo(1, 3);
  });

  it('entering the atmosphere at ~45 km/s is immediately catastrophic (like an unshielded Galileo probe)', () => {
    const w = new NewtonianWorld(jup);
    const J = w.bodies.find((b) => b.def.name === 'Jupiter')!;
    w.pos = [J.pos[0] + J.def.radius + 60e3, J.pos[1], J.pos[2]];
    w.w = [J.vel[0] - 5e3, J.vel[1] + 45e3, J.vel[2]];
    let maxT = 0;
    for (let i = 0; i < 2000 && !w.structure.failed; i++) {
      w.update(0.05, 1, noCtl);
      maxT = Math.max(maxT, w.env.hullTemp);
    }
    expect(maxT).toBeGreaterThan(2500);
    expect(w.structure.failed).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { Structure } from '../src/physics/structure';
import { KerrParams, horizonPlus, ksPoint, lower } from '../src/physics/kerr';
import { bodyTetrad, normalObserver } from '../src/physics/frames';
import { tidalTensor } from '../src/physics/tidal';
import { M_SUN, gravTime } from '../src/physics/constants';

/** SI tidal tensor felt by a "rain" observer at the outer horizon of a hole of given mass. */
function horizonTides(massSolar: number, a: number) {
  const k: KerrParams = { M: 1, a };
  const r = horizonPlus(k) * 1.0001;
  const pos = [r, 0, 0];
  const p = ksPoint(k, r, 0, 0);
  const t = bodyTetrad(k, pos, lower(p, normalObserver(p).n), [0, 0, 0, 1]);
  const Tm = gravTime(massSolar * M_SUN);
  return tidalTensor(k, pos, t).map((row) => row.map((v) => v / (Tm * Tm)));
}

function load(E: number[][]) {
  const s = new Structure();
  s.update(E, 1, { hullTemp: 300, pressure: 0, dynPressure: 0 });
  return s;
}

describe('tidal damage is derived from the hole, not from distance', () => {
  it('a 10 M☉ hole destroys the ship long before the horizon is reached', () => {
    const s = load(horizonTides(10, 0.7));
    expect(s.stress).toBeGreaterThan(1e3);
    expect(s.failed).toBe(true);
    expect(s.crew).toBe('killed');
  });

  it('crossing the horizon of Sgr A* is uneventful for ship and pilot', () => {
    const s = load(horizonTides(4.3e6, 0.9));
    expect(s.stress).toBeLessThan(1e-4);
    expect(s.failed).toBe(false);
    expect(['nominal', 'aware']).toContain(s.crew);
  });

  it('horizon tides scale as 1/M²', () => {
    const e1 = Math.abs(horizonTides(1e6, 0)[0][0]);
    const e2 = Math.abs(horizonTides(1e7, 0)[0][0]);
    expect(e1 / e2).toBeCloseTo(100, 3);
  });

  it('unmanned probe mode reports loads without failing', () => {
    const s = new Structure();
    s.invulnerable = true;
    s.update(horizonTides(10, 0.7), 1, { hullTemp: 300, pressure: 0, dynPressure: 0 });
    expect(s.stress).toBeGreaterThan(1);
    expect(s.failed).toBe(false);
  });
});

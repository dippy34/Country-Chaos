/**
 * Structural and crew response to the physical environment.
 *
 * Tidal loading comes from the measured tidal tensor E (s⁻², ship body frame):
 * for each principal axis with eigenvalue λ, a slender structure of half-extent
 * ℓ along that axis carries a peak internal stress σ ≈ ρ_eff |λ| ℓ² / 2
 * (integrating the differential acceleration −λ ξ over the mass from the end
 * to the centre). Nothing here is triggered by distance to an object: the
 * same code produces destruction 1,600 km outside a 10 M☉ hole and a calm
 * horizon crossing at Sgr A*, purely through E.
 *
 * Material numbers are representative of a high-strength titanium-alloy
 * truss (σ_y ≈ 0.9 GPa) with an effective (structure-averaged) density of
 * 400 kg/m³. Human tolerance thresholds are rough, order-of-magnitude values.
 */
import { eigenSym3 } from './tidal';

export type CrewState = 'nominal' | 'aware' | 'strained' | 'injured' | 'incapacitated' | 'killed';

export const INSTRUMENTS = ['navigation', 'relativity', 'structure', 'status', 'legend'] as const;

export class Structure {
  /** Half extents of the ship (m): x = half-span, y = half-height, z = half-length. */
  half: [number, number, number] = [10, 4, 31];
  rhoEff = 400;
  yieldPa = 0.9e9;
  ultimatePa = 1.25e9;
  compressionFactor = 1.4; // buckling: weaker in compression
  hullTempLimit = 2500;
  hullTempDestroy = 3600;
  crushPa = 2.5e6;

  stress = 0; // fraction of yield (max over axes)
  integrity = 1;
  /** Permanent plastic strain along each principal direction (body frame), as stretch factors. */
  deformation: { axis: [number, number, number]; strain: number }[] = [];
  failed = false;
  failReason = '';
  crew: CrewState = 'nominal';
  crewDiffAccel = 0;
  shipDiffAccel = 0;
  instrumentsDown = new Set<string>();
  hullTemp = 3;
  pressure = 0;
  tidalEig: [number, number, number] = [0, 0, 0];

  reset() {
    this.stress = 0;
    this.integrity = 1;
    this.deformation = [];
    this.failed = false;
    this.failReason = '';
    this.crew = 'nominal';
    this.instrumentsDown.clear();
  }

  private extentAlong(v: number[]): number {
    const [a, b, c] = this.half;
    return 1 / Math.sqrt((v[0] / a) ** 2 + (v[1] / b) ** 2 + (v[2] / c) ** 2);
  }

  /**
   * @param E tidal tensor in body frame (s⁻²)
   * @param dt proper time elapsed for the ship (s)
   */
  update(E: number[][], dt: number, env: { hullTemp: number; pressure: number; dynPressure: number }) {
    const { values, vectors } = eigenSym3(E);
    this.tidalEig = [values[0], values[1], values[2]];
    let worst = 0;
    let worstAxis = vectors[0];
    let maxDiff = 0;
    for (let i = 0; i < 3; i++) {
      const lam = values[i];
      const v = vectors[i];
      const l = this.extentAlong(v);
      const sigma = (this.rhoEff * Math.abs(lam) * l * l) / 2;
      const frac = (sigma * (lam > 0 ? this.compressionFactor : 1)) / this.yieldPa;
      maxDiff = Math.max(maxDiff, Math.abs(lam) * 2 * l);
      if (frac > worst) {
        worst = frac;
        worstAxis = v;
      }
    }
    this.shipDiffAccel = maxDiff;
    // pilot seated, spine along body +Y, ~1.8 m
    const spine = [E[0][1] * 1.8, E[1][1] * 1.8, E[2][1] * 1.8];
    this.crewDiffAccel = Math.hypot(spine[0], spine[1], spine[2]);
    // pressure loads add directly
    const pFrac = Math.max(env.pressure / this.crushPa, env.dynPressure / 6e5);
    this.stress = Math.max(worst, pFrac);
    this.hullTemp = env.hullTemp;
    this.pressure = env.pressure;

    if (!this.failed) {
      // plastic flow above yield → permanent stretch, loss of integrity
      if (worst > 1) {
        const rate = 0.02 * (worst - 1) ** 1.5;
        this.addStrain(worstAxis as [number, number, number], rate * dt);
        this.integrity -= rate * dt * 4;
      }
      if (env.hullTemp > this.hullTempLimit) this.integrity -= dt * 0.05 * ((env.hullTemp - this.hullTempLimit) / 300);
      if (pFrac > 1) this.integrity -= dt * 0.3 * pFrac;
      // instruments fail probabilistically as stress approaches yield
      const pFail = Math.max(0, this.stress - 0.55) ** 2 * 0.6 * dt;
      for (const name of ['navigation', 'relativity', 'structure', 'status', 'legend']) {
        if (Math.random() < pFail) this.instrumentsDown.add(name);
      }
      const ult = this.ultimatePa / this.yieldPa;
      if (worst > ult) this.fail('Catastrophic structural failure: tidal stress exceeded ultimate strength');
      else if (env.hullTemp > this.hullTempDestroy) this.fail('Hull destroyed by radiative heating');
      else if (pFrac > 2.5) this.fail('Hull collapse under atmospheric pressure');
      else if (this.integrity <= 0) this.fail('Structural integrity lost');
    }

    const a = this.crewDiffAccel;
    const rank: CrewState[] = ['nominal', 'aware', 'strained', 'injured', 'incapacitated', 'killed'];
    const now: CrewState = a > 1500 ? 'killed' : a > 400 ? 'incapacitated' : a > 120 ? 'injured' : a > 20 ? 'strained' : a > 1 ? 'aware' : 'nominal';
    // injuries do not heal within a flight
    if (rank.indexOf(now) > rank.indexOf(this.crew) || rank.indexOf(this.crew) < 3) this.crew = now;
    if (env.hullTemp > 900 && rank.indexOf(this.crew) < 3) this.crew = 'injured';
  }

  private addStrain(axis: [number, number, number], d: number) {
    for (const def of this.deformation) {
      if (Math.abs(def.axis[0] * axis[0] + def.axis[1] * axis[1] + def.axis[2] * axis[2]) > 0.95) {
        def.strain += d;
        return;
      }
    }
    this.deformation.push({ axis, strain: d });
  }

  fail(reason: string) {
    this.failed = true;
    this.failReason = reason;
    this.integrity = 0;
  }

  /** 3x3 deformation (I + Σ strain · a aᵀ) applied to cockpit geometry, row-major. */
  deformationMatrix(): number[][] {
    const m = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    for (const d of this.deformation) {
      const s = Math.min(d.strain, 0.6);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) m[i][j] += s * d.axis[i] * d.axis[j];
    }
    return m;
  }
}

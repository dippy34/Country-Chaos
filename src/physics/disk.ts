/**
 * Geometrically thin, optically thick accretion disk (Novikov & Thorne 1973;
 * Page & Thorne 1974) in the Kerr equatorial plane.
 *
 * Local flux  F(r) = Ṁ/(4π r) · (−Ω_{,r}) / (E − Ω L)² · ∫_{r_isco}^{r} (E − Ω L) L_{,r} dr
 * with zero torque at the ISCO. Emission is treated as a local blackbody at
 * T = (F/σ)^{1/4}, so the observed spectrum is a blackbody at g·T, exactly.
 */
import { C, SIGMA_SB, eddingtonLuminosity, gravLength } from './constants';
import { KerrParams, circularEL, iscoRadius } from './kerr';

export interface DiskProfile {
  rIn: number;
  rOut: number;
  /** Radii (M units), log-spaced. */
  r: Float64Array;
  /** Effective temperature (K) at each radius. */
  T: Float64Array;
  Tmax: number;
  rTmax: number;
  /** Radiative efficiency 1 − E_isco. */
  efficiency: number;
  /** Accretion rate (kg/s). */
  mdot: number;
}

/** Dimensionless Novikov–Thorne flux F̃(r) (M = 1), i.e. F = Ṁ c² F̃ / (GM/c²)². */
export function ntFluxDimensionless(k: KerrParams, rIn: number, r: number, steps = 400): number {
  if (r <= rIn) return 0;
  const h = 1e-5 * r;
  const at = (rr: number) => circularEL(k, rr);
  const c0 = at(r);
  const Om_r = (at(r + h).Omega - at(r - h).Omega) / (2 * h);
  // ∫ (E − ΩL) L_{,r} dr, trapezoid in log r
  let integral = 0;
  const lr0 = Math.log(rIn), lr1 = Math.log(r);
  let prev = 0;
  for (let i = 0; i <= steps; i++) {
    const rr = Math.exp(lr0 + ((lr1 - lr0) * i) / steps);
    const hh = 1e-5 * rr;
    const c = at(rr);
    const Lr = (at(rr + hh).L - at(Math.max(rr - hh, rIn)).L) / (rr + hh - Math.max(rr - hh, rIn));
    const val = (c.E - c.Omega * c.L) * Lr * rr; // × r for d(log r)
    if (i > 0) integral += 0.5 * (val + prev) * ((lr1 - lr0) / steps);
    prev = val;
  }
  const emol = c0.E - c0.Omega * c0.L;
  return ((-Om_r / (emol * emol)) * integral) / (4 * Math.PI * r);
}

export function buildDiskProfile(
  k: KerrParams,
  massKg: number,
  eddingtonFraction: number,
  rOut: number,
  samples = 256,
): DiskProfile {
  const rIn = iscoRadius(k);
  const efficiency = 1 - circularEL(k, rIn).E;
  const mdot = (eddingtonFraction * eddingtonLuminosity(massKg)) / (efficiency * C * C);
  const Lm = gravLength(massKg);
  const r = new Float64Array(samples);
  const T = new Float64Array(samples);
  let Tmax = 0, rTmax = rIn;
  for (let i = 0; i < samples; i++) {
    const rr = rIn * Math.pow(rOut / rIn, i / (samples - 1));
    r[i] = rr;
    const Ft = ntFluxDimensionless(k, rIn, rr, 200);
    const F = (mdot * C * C * Ft) / (Lm * Lm);
    T[i] = Math.pow(Math.max(F, 0) / SIGMA_SB, 0.25);
    if (T[i] > Tmax) {
      Tmax = T[i];
      rTmax = rr;
    }
  }
  return { rIn, rOut, r, T, Tmax, rTmax, efficiency, mdot };
}

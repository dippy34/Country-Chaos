/**
 * Destinations. Real astronomical values where they are known; anything
 * illustrative is labelled as such in `notes` (and shown in-game).
 */
import { AU, DAY, HOUR, M_SUN, R_SUN, YEAR } from '../physics/constants';

export type BodyKind = 'star' | 'gasgiant' | 'rocky';

export interface BodyDef {
  name: string;
  kind: BodyKind;
  mass: number; // kg
  radius: number; // equatorial, m
  flattening?: number; // (a − c)/a
  J2?: number;
  /** Circular orbit about `parent` (or fixed at origin when absent). */
  parent?: string;
  orbitRadius?: number; // m
  orbitPeriod?: number; // s
  orbitPhase?: number; // rad at t = 0
  rotationPeriod: number; // s
  obliquity?: number; // rad
  /** Stars: photospheric effective temperature (K). */
  Teff?: number;
  /** Planets/moons: geometric-ish albedo used for diffuse lighting. */
  albedo?: number;
  /** Shader style key. */
  style: string;
  atmosphere?: { scaleHeight: number; rho0: number; p0: number; top: number };
}

export interface NewtonianSystemDef {
  kind: 'newtonian';
  id: string;
  name: string;
  blurb: string;
  bodies: BodyDef[];
  start: { near: string; distance: number; direction: [number, number, number]; velocityMatch: string };
  skyFrame: 'ecliptic' | 'random';
  notes: string[];
}

export interface KerrSystemDef {
  kind: 'kerr';
  id: string;
  name: string;
  blurb: string;
  massSolar: number;
  spin: number; // a/M
  disk: boolean;
  eddington: number; // accretion rate as Eddington fraction
  diskOuter: number; // in M
  /** Spin-axis orientation in the galactic sky frame (Euler angles, rad). */
  orientation: [number, number, number];
  startR: number; // in M
  startTheta: number; // polar angle from spin axis, rad
  /** Initial speed as a fraction of the local circular speed (default ≈ 1: parking orbit). */
  startOrbitFraction?: number;
  observerR: number; // static observer distance, M
  notes: string[];
}

export type SystemDef = NewtonianSystemDef | KerrSystemDef;

const JUPITER_SMA = 5.2044 * AU;

const SUN: BodyDef = {
  name: 'Sun', kind: 'star', mass: M_SUN, radius: R_SUN, rotationPeriod: 25.38 * DAY, obliquity: 0.1265, Teff: 5772, style: 'sun',
};

const jupiterSystem = (startNear: string, startDistance: number, dir: [number, number, number]): NewtonianSystemDef => ({
  kind: 'newtonian',
  id: startNear === 'Sun' ? 'sun' : 'jupiter',
  name: startNear === 'Sun' ? 'The Sun (close approach)' : 'Jupiter',
  blurb:
    startNear === 'Sun'
      ? 'Start 0.1 AU from the photosphere. Granulation cells are the size of countries; the disc is 13° across.'
      : 'Start 3.2 million km out. Jupiter is 143,000 km wide; Io, Europa, Ganymede and Callisto orbit at true scale.',
  bodies: [
    SUN,
    {
      name: 'Jupiter', kind: 'gasgiant', mass: 1.898_19e27, radius: 71_492e3, flattening: 0.064_87, J2: 0.014_736,
      parent: 'Sun', orbitRadius: JUPITER_SMA, orbitPeriod: 11.862 * YEAR, orbitPhase: 0.6, rotationPeriod: 9.925 * HOUR,
      obliquity: 0.0546, albedo: 0.52, style: 'jupiter',
      atmosphere: { scaleHeight: 27e3, rho0: 0.16, p0: 1e5, top: 400e3 },
    },
    { name: 'Io', kind: 'rocky', mass: 8.931_9e22, radius: 1_821.6e3, parent: 'Jupiter', orbitRadius: 421_700e3, orbitPeriod: 1.769_138 * DAY, orbitPhase: 0.3, rotationPeriod: 1.769_138 * DAY, albedo: 0.63, style: 'io' },
    { name: 'Europa', kind: 'rocky', mass: 4.799_8e22, radius: 1_560.8e3, parent: 'Jupiter', orbitRadius: 671_034e3, orbitPeriod: 3.551_181 * DAY, orbitPhase: 2.1, rotationPeriod: 3.551_181 * DAY, albedo: 0.67, style: 'europa' },
    { name: 'Ganymede', kind: 'rocky', mass: 1.481_9e23, radius: 2_634.1e3, parent: 'Jupiter', orbitRadius: 1_070_412e3, orbitPeriod: 7.154_553 * DAY, orbitPhase: 4.0, rotationPeriod: 7.154_553 * DAY, albedo: 0.43, style: 'ganymede' },
    { name: 'Callisto', kind: 'rocky', mass: 1.075_9e23, radius: 2_410.3e3, parent: 'Jupiter', orbitRadius: 1_882_709e3, orbitPeriod: 16.689_018 * DAY, orbitPhase: 5.3, rotationPeriod: 16.689_018 * DAY, albedo: 0.22, style: 'callisto' },
  ],
  start: { near: startNear, distance: startDistance, direction: dir, velocityMatch: startNear },
  skyFrame: 'ecliptic',
  notes: [
    'Positions use circular orbits with real radii/periods (phases illustrative).',
    'Cloud bands, Great Red Spot and moon surfaces are procedural, not mapped imagery.',
  ],
});

export const SYSTEMS: SystemDef[] = [
  jupiterSystem('Jupiter', 3.2e9, [0.55, -0.8, 0.12]),
  jupiterSystem('Sun', R_SUN + 0.1 * AU, [-0.3, 0.95, 0.05]),
  {
    kind: 'newtonian',
    id: 'betelgeuse',
    name: 'Betelgeuse (red supergiant)',
    blurb: 'About 760 solar radii — if it replaced the Sun its surface would lie beyond the asteroid belt. Start 12 AU out.',
    bodies: [
      {
        name: 'Betelgeuse', kind: 'star', mass: 18 * M_SUN, radius: 764 * R_SUN, rotationPeriod: 36 * YEAR, Teff: 3600, style: 'supergiant',
      },
    ],
    start: { near: 'Betelgeuse', distance: 12 * AU, direction: [0.2, -0.95, 0.25], velocityMatch: 'Betelgeuse' },
    skyFrame: 'random',
    notes: [
      'Radius ≈ 764 R☉, Teff ≈ 3600 K, M ≈ 18 M☉ (literature values carry large uncertainties).',
      'Giant convection cells are procedural; real Betelgeuse also has an extended dusty envelope not modelled here.',
    ],
  },
  {
    kind: 'kerr',
    id: 'stellar',
    name: 'Stellar-mass black hole (10 M☉)',
    blurb: 'Horizon radius ≈ 26 km. You start 22,000 km out; tides kill the pilot near 1,500 km and break the ship near 850 km.',
    massSolar: 10,
    spin: 0.7,
    disk: true,
    eddington: 1e-13,
    diskOuter: 40,
    orientation: [0.3, 1.1, 0.4],
    startR: 1500,
    startTheta: 1.35,
    observerR: 2000,
    notes: ['Quiescent: accretion 10⁻¹³ Eddington so the disk (~10⁴ K) does not vaporise you. An actively accreting stellar hole (~10⁷ K, X-rays) would.'],
  },
  {
    kind: 'kerr',
    id: 'sgra',
    name: 'Sagittarius A* (4.3 million M☉)',
    blurb: 'Horizon ≈ 0.08 AU across. You can cross it intact; the tides only kill you ~30 s of proper time later.',
    massSolar: 4.3e6,
    spin: 0.9,
    disk: true,
    eddington: 3e-9,
    diskOuter: 30,
    orientation: [0.1, 0.5, -0.3],
    startR: 30,
    startTheta: 1.05,
    observerR: 140,
    notes: [
      'Sgr A* really has a faint, hot, radiatively inefficient flow, not a thin disk. The thin disk (3×10⁻⁹ Eddington, ~3,500 K peak) is illustrative — toggle it off for realism.',
      'Spin of Sgr A* is not well measured; a = 0.9 is a choice.',
    ],
  },
  {
    kind: 'kerr',
    id: 'm87',
    name: 'M87* (6.5 billion M☉)',
    blurb: 'Horizon ≈ 250 AU across — larger than the orbit of Pluto. One orbit at the ISCO takes days.',
    massSolar: 6.5e9,
    spin: 0.94,
    disk: true,
    eddington: 3e-6,
    diskOuter: 45,
    orientation: [0.6, -0.4, 0.2],
    startR: 35,
    startTheta: 1.1,
    observerR: 180,
    notes: ['Mass from the Event Horizon Telescope (2019). Spin and disk are illustrative.'],
  },
  {
    kind: 'kerr',
    id: 'ton618',
    name: 'TON 618-class ultramassive hole (6.6×10¹⁰ M☉)',
    blurb: 'Horizon ≈ 2,600 AU across. Tidal forces at the horizon are gentler than standing on Earth.',
    massSolar: 6.6e10,
    spin: 0.6,
    disk: true,
    eddington: 1e-4,
    diskOuter: 60,
    orientation: [-0.3, 0.9, 0.7],
    startR: 40,
    startTheta: 1.15,
    observerR: 220,
    notes: ['Mass estimate for TON 618 is uncertain (≈4–7×10¹⁰ M☉). The real object is a quasar near the Eddington limit whose light would vaporise a ship at these distances; accretion here is 10⁻⁴ Eddington.'],
  },
];

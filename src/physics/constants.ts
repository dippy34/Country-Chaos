// Physical constants (SI). CODATA 2018 / IAU 2015 nominal values.
export const C = 299_792_458; // m/s
export const G = 6.674_30e-11; // m^3 kg^-1 s^-2
export const SIGMA_SB = 5.670_374_419e-8; // W m^-2 K^-4
export const M_SUN = 1.988_47e30; // kg
export const R_SUN = 6.957e8; // m (IAU nominal)
export const L_SUN = 3.828e26; // W (IAU nominal)
export const AU = 1.495_978_707e11; // m
export const LY = 9.460_730_472_580_8e15; // m
export const PC = 3.085_677_581e16; // m
export const G0 = 9.806_65; // m/s^2, standard gravity
export const M_PROTON = 1.672_621_923_69e-27; // kg
export const SIGMA_THOMSON = 6.652_458_732_1e-29; // m^2
export const HOUR = 3600;
export const DAY = 86_400;
export const YEAR = 365.25 * DAY;

/** Gravitational length GM/c^2 in metres for a mass in kg. */
export const gravLength = (massKg: number) => (G * massKg) / (C * C);
/** Gravitational time GM/c^3 in seconds for a mass in kg. */
export const gravTime = (massKg: number) => (G * massKg) / (C * C * C);
/** Eddington luminance (W) for a mass in kg, pure-hydrogen electron scattering. */
export const eddingtonLuminosity = (massKg: number) => (4 * Math.PI * G * massKg * M_PROTON * C) / SIGMA_THOMSON;

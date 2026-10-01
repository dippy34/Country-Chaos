/** Data the cockpit instruments and desktop overlay display. SI units unless noted. */
export interface Telemetry {
  system: string;
  mode: 'newtonian' | 'kerr';
  view: 'pilot' | 'external';
  properTime: number;
  coordTime: number;
  dTauDt: number;
  warp: number;
  warpLimited: boolean;
  thrustG: number;
  assist: string;
  speed: number;
  gamma: number;
  speedFrame: string;
  target?: {
    name: string;
    distance: number;
    altitude: number;
    angularDiameterDeg: number;
    closingSpeed: number;
  };
  gravity: number; // local gravitational acceleration magnitude (Newtonian) or hover accel (Kerr)
  tidal: { eig: [number, number, number]; shipDiffAccel: number; crewDiffAccel: number };
  structure: {
    stress: number; // fraction of yield
    integrity: number;
    plasticStrain: number;
    hullTemp: number;
    pressure: number;
    failed: boolean;
    crew: string;
    instrumentsDown: string[];
  };
  bh?: {
    massSolar: number;
    spin: number;
    rOverM: number;
    rPlusOverM: number;
    distToHorizonM: number; // metres (negative inside)
    inside: boolean;
    horizonCrossTau?: number;
    hoverAccelG?: number; // proper acceleration needed to hover (∞ inside)
    gravRedshiftAhead: number; // frequency ratio of starlight ahead
    gravRedshiftBehind: number;
    terminated?: string;
    observer?: {
      seen: boolean;
      delay: number; // s between emission and reception
      g: number;
      tauEmit: number;
      lastFrozen: boolean;
      telescopeZoom: number;
    };
  };
  notices: string[];
  physics: { established: string[]; approximated: string[]; speculative: string[] };
}

export const fmtDist = (m: number): string => {
  const a = Math.abs(m);
  if (a < 1e3) return `${m.toFixed(0)} m`;
  if (a < 1e6) return `${(m / 1e3).toFixed(a < 1e4 ? 2 : 1)} km`;
  if (a < 1e9) return `${(m / 1e3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km`;
  if (a < 1.496e13) return `${(m / 1e9).toFixed(2)} million km`;
  return `${(m / 1.496e11).toFixed(1)} AU`;
};

export const fmtTime = (s: number): string => {
  const a = Math.abs(s);
  if (!isFinite(s)) return '∞';
  if (a < 1e-3) return `${(s * 1e6).toFixed(1)} µs`;
  if (a < 1) return `${(s * 1e3).toFixed(1)} ms`;
  if (a < 120) return `${s.toFixed(2)} s`;
  if (a < 7200) return `${(s / 60).toFixed(1)} min`;
  if (a < 172800) return `${(s / 3600).toFixed(2)} h`;
  if (a < 3.156e7 * 2) return `${(s / 86400).toFixed(1)} d`;
  return `${(s / 3.156e7).toFixed(2)} yr`;
};

export const fmtSpeed = (v: number): string => {
  const c = 299_792_458;
  if (v > 0.01 * c) return `${(v / c).toFixed(4)} c`;
  if (v > 1e4) return `${(v / 1e3).toFixed(1)} km/s`;
  return `${v.toFixed(1)} m/s`;
};

export const fmtSci = (x: number, d = 2): string => {
  if (!isFinite(x)) return '∞';
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e < 4) return x.toFixed(Math.max(0, d - Math.max(e, 0)));
  return `${(x / 10 ** e).toFixed(d)}e${e}`;
};

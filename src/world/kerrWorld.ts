/**
 * Black-hole systems: everything in Kerr spacetime (geometric units, M = 1).
 * SI conversions: lengths × GM/c², times × GM/c³, tidal tensor ÷ (GM/c³)².
 */
import * as THREE from 'three';
import { C, G0, M_SUN, SIGMA_SB, gravLength, gravTime } from '../physics/constants';
import { DiskProfile, buildDiskProfile } from '../physics/disk';
import { bodyTetrad, staticObserver, zamo, V4 } from '../physics/frames';
import { KerrParams, dot, horizonMinus, horizonPlus, iscoRadius, ksPoint, ksR, lower, raise } from '../physics/kerr';
import { ExternalObserver } from '../physics/observer';
import { KerrShip, zamoAcceleration } from '../physics/shipKerr';
import { Structure } from '../physics/structure';
import { tidalTensor } from '../physics/tidal';
import { KerrSystemDef } from './systems';
import { Telemetry } from './telemetry';
import { Controls } from './newtonianWorld';

export class KerrWorld {
  readonly k: KerrParams;
  readonly massKg: number;
  readonly Lm: number;
  readonly Tm: number;
  readonly rPlus: number;
  readonly rMinus: number;
  disk: DiskProfile;
  ship: KerrShip;
  observer: ExternalObserver;
  structure = new Structure();
  thrustG = 1;
  assist = false;
  warpLimited = false;
  notices: string[] = [];
  horizonCrossTau: number | null = null;
  observerT = 0;
  probeMode = false;
  diskOn: boolean;
  skyRot: THREE.Matrix3;
  private E: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  private hoverAccel = 0;
  private tidalTimer = 0;
  events: string[] = [];

  constructor(public def: KerrSystemDef) {
    this.k = { M: 1, a: def.spin };
    this.massKg = def.massSolar * M_SUN;
    this.Lm = gravLength(this.massKg);
    this.Tm = gravTime(this.massKg);
    this.rPlus = horizonPlus(this.k);
    this.rMinus = horizonMinus(this.k);
    this.diskOn = def.disk;
    this.disk = buildDiskProfile(this.k, this.massKg, def.eddington, def.diskOuter, 192);
    this.ship = new KerrShip(this.k);
    this.resetShip();
    const th = def.startTheta - 0.25, ph = -0.85, R = def.observerR;
    this.observer = new ExternalObserver(this.k, [R * Math.sin(th) * Math.cos(ph), R * Math.sin(th) * Math.sin(ph), R * Math.cos(th)]);
    const [ex, ey, ez] = def.orientation;
    this.skyRot = new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(ex, ey, ez)));
  }

  resetShip() {
    const { def } = this;
    const r = def.startR, th = def.startTheta;
    const pos: [number, number, number] = [r * Math.sin(th), 0, r * Math.cos(th)];
    this.ship.placeAtRest(pos);
    // parking orbit: local circular speed relative to the ZAMO, along +φ (prograde)
    const v = Math.min(Math.sqrt(1 / Math.max(r - 2, 1)), 0.9) * (def.startOrbitFraction ?? 0.98);
    this.ship.setVelocityRelZamo([0, v, 0]);
    // nose toward the hole, "up" along the spin axis
    const fwd = [-pos[0], -pos[1], -pos[2]];
    this.ship.q = lookQuatArr(fwd, [0, 0, 1]);
    this.ship.history = [];
    // the ship has been coasting on this orbit for a while: give it a past light cone
    this.ship.preroll(1.6 * (def.observerR + def.startR));
    this.structure.reset();
    this.horizonCrossTau = null;
    this.observerT = 0;
    this.events = [];
  }

  update(dtReal: number, warp: number, ctl: Controls, externalView: boolean) {
    this.notices = [];
    const ship = this.ship;
    // attitude
    const rate = 0.6 * dtReal;
    const q = new THREE.Quaternion(...ship.q);
    q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(ctl.rot[0] * rate, ctl.rot[1] * rate, ctl.rot[2] * rate, 'XYZ'))).normalize();
    ship.q = [q.x, q.y, q.z, q.w];

    const dTau = (dtReal * warp) / this.Tm;
    const toGeo = this.Lm / (C * C);
    let tb: [number, number, number] = [ctl.thrust[0] * this.thrustG * G0 * toGeo, ctl.thrust[1] * this.thrustG * G0 * toGeo, ctl.thrust[2] * this.thrustG * G0 * toGeo];
    // station keeping: hold the local ZAMO (impossible inside the horizon)
    const aZ = ship.insideHorizon ? null : zamoAcceleration(this.k, ship.pos);
    if (aZ) {
      const p = ksPoint(this.k, ...ship.pos);
      this.hoverAccel = (Math.sqrt(Math.max(dot(p, aZ, aZ), 0)) * C * C) / this.Lm;
    } else this.hoverAccel = Infinity;
    if (this.assist && Math.hypot(...ctl.thrust) < 1e-3) {
      const w = ship.zamoVelocityInBody();
      if (!w || !aZ) this.notices.push('No stationary frame exists inside the horizon: station-keeping impossible');
      else {
        const t = ship.tetrad();
        const p = t.point;
        const fa = [1, 2, 3].map((i) => dot(p, t.e[i], aZ));
        const K = 1 / Math.max(dTau * 5, 1e-9);
        let cmd = [fa[0] + K * w[0], fa[1] + K * w[1], fa[2] + K * w[2]];
        const maxGeo = 30 * G0 * toGeo;
        const m = Math.hypot(cmd[0], cmd[1], cmd[2]);
        if (m > maxGeo) {
          cmd = cmd.map((c) => (c * maxGeo) / m);
          this.notices.push(`Hovering here needs ${(this.hoverAccel / G0).toExponential(2)} g — engines saturated`);
        }
        tb = cmd as [number, number, number];
      }
    }
    ship.thrustBody = tb;

    const budget = 1500;
    let target = dTau;
    if (externalView) {
      // the external observer's clock drives the simulation; keep the ship's KS time in step
      this.observerT += dTau * this.observerRate();
      target = Math.max(0, Math.min(dTau * 4, this.observerT - ship.s[0] > 0 ? dTau * 2 : 0));
    }
    const wasInside = ship.insideHorizon;
    const done = ship.advance(target, budget);
    this.warpLimited = done < target * 0.999 && !ship.terminated;
    if (!externalView) this.observerT = Math.max(this.observerT, ship.s[0]);
    if (!wasInside && ship.insideHorizon && this.horizonCrossTau === null) {
      this.horizonCrossTau = ship.tau;
      this.events.push('horizon');
    }

    // tidal tensor in the ship frame (geometric → SI)
    this.tidalTimer -= dtReal;
    if (this.tidalTimer <= 0 || warp > 1) {
      this.tidalTimer = 0.05;
      const t = ship.tetrad();
      const Eg = tidalTensor(this.k, ship.pos, t);
      const s = 1 / (this.Tm * this.Tm);
      this.E = Eg.map((row) => row.map((v) => v * s));
    }
    this.structure.invulnerable = this.probeMode;
    this.structure.update(this.E, done * this.Tm, { hullTemp: this.hullTemp(), pressure: 0, dynPressure: 0 });
  }

  /** dT_obs/dτ ratio used to advance the observer's clock in external view. */
  private observerRate() {
    // advance coordinate time at roughly the ship's current dt/dτ, so time compression feels the same
    const p = ksPoint(this.k, ...this.ship.pos);
    const u = raise(p, this.ship.uCov);
    return Math.min(Math.max(u[0], 1), 50);
  }

  /**
   * Radiative-equilibrium hull temperature from the disk's luminosity,
   * F ≈ L_disk / (4π d²) on a sunward-facing plate (no shadowing or lensing
   * focus — an approximation that is poor inside a few M).
   */
  hullTemp(): number {
    if (!this.diskOn) return 3;
    const L = this.disk.efficiency * this.disk.mdot * C * C;
    const d = Math.max(this.ship.r, this.disk.rIn) * this.Lm;
    const F = L / (4 * Math.PI * d * d);
    return Math.pow(F / SIGMA_SB + 81, 0.25);
  }

  tetradForCamera(externalView: boolean) {
    if (externalView) return { e: this.observer.tetrad.e, pos: this.observer.pos, t: this.observerT };
    const t = this.ship.tetrad();
    return { e: t.e, pos: this.ship.pos, t: this.ship.s[0] };
  }

  /** Frequency ratio of starlight arriving from body-frame direction n (exact: p_t is conserved). */
  starlightShift(n: [number, number, number]): number {
    const t = this.ship.tetrad();
    const pc = [0, 0, 0, 0].map((_, m) => -t.e[0][m] + n[0] * t.e[1][m] + n[1] * t.e[2][m] + n[2] * t.e[3][m]);
    const pcov = lower(t.point, pc);
    return pcov[0] > 0 ? 1 / pcov[0] : Infinity;
  }

  telemetry(): Partial<Telemetry> {
    const ship = this.ship;
    const p = ksPoint(this.k, ...ship.pos);
    const u = raise(p, ship.uCov) as V4;
    const r = ship.r;
    const ls = ship.localSpeed();
    const s = this.structure;
    const notices = [...this.notices];
    if (ship.insideHorizon) notices.push('INSIDE THE EVENT HORIZON — every future-directed path leads to smaller r');
    if (ship.terminated === 'inner-horizon') notices.push('Reached the inner (Cauchy) horizon: simulation stops (see legend)');
    if (ship.terminated === 'singularity') notices.push('Approached r → 0: classical GR breaks down here');
    const shadowAng = r > 3 ? (2 * Math.asin(Math.min(1, (3 * Math.sqrt(3) * Math.sqrt(Math.max(1 - 2 / r, 0))) / r)) * 180) / Math.PI : 180;
    const drdtau = (() => {
      const e = 1e-6;
      const x = ship.pos, v = [u[1], u[2], u[3]];
      return (ksR(this.k.a, x[0] + e * v[0], x[1] + e * v[1], x[2] + e * v[2]) - r) / e;
    })();
    const physics = {
      established: [
        'Ship follows Kerr geodesics + engine 4-force (Kerr–Schild, through the horizon)',
        'Light paths: lensing, multiple images, shadow, photon ring',
        'Colour/brightness shifts: g = E_obs/E_emit (gravity + Doppler + aberration), T → gT',
        'Tidal stress from the Riemann tensor in the ship frame',
        'External observer: light-travel delay, freezing and e^(−κt) fading',
      ],
      approximated: [
        'Thin Novikov–Thorne blackbody disk; no corona, jets or radiative transfer',
        'Ray tracer: RK4 at cube-map resolution; weak-field tail beyond r_far',
        'Background sky is procedural, same for every system',
        'Ship attitude referenced to boosted Kerr–Schild frame (no gyroscope precession)',
        'Observer image size from ray Jacobian; primary image only',
      ],
      speculative: [] as string[],
    };
    if (ship.insideHorizon) physics.speculative.push('Sky regions whose light would come from the white hole / other universe of eternal Kerr have no physical source: shown black');
    if (ship.terminated === 'inner-horizon' || (this.k.a > 0 && r < this.rMinus * 1.3))
      physics.speculative.push('Beyond the inner horizon: mass-inflation instability; what an observer meets is unknown — not rendered');
    if (this.k.a === 0 && r < 0.3) physics.speculative.push('Near r = 0 quantum gravity is needed; nothing is shown as fact');
    return {
      mode: 'kerr',
      properTime: ship.tau * this.Tm,
      coordTime: ship.s[0] * this.Tm,
      dTauDt: 1 / u[0],
      thrustG: this.thrustG,
      assist: this.assist ? 'HOLD ZAMO' : 'OFF',
      speed: ls.v * C,
      gamma: ls.gamma,
      speedFrame: ls.frame,
      target: {
        name: this.def.name.split(' (')[0],
        distance: r * this.Lm,
        altitude: (r - this.rPlus) * this.Lm,
        angularDiameterDeg: shadowAng,
        closingSpeed: -drdtau * C,
      },
      gravity: this.hoverAccel,
      tidal: { eig: s.tidalEig, shipDiffAccel: s.shipDiffAccel, crewDiffAccel: s.crewDiffAccel },
      structure: {
        stress: s.stress,
        integrity: s.integrity,
        plasticStrain: s.deformation.reduce((m, d) => Math.max(m, d.strain), 0),
        hullTemp: s.hullTemp,
        pressure: 0,
        failed: s.failed,
        crew: s.crew,
        instrumentsDown: [...s.instrumentsDown],
      },
      bh: {
        massSolar: this.def.massSolar,
        spin: this.k.a,
        rOverM: r,
        rPlusOverM: this.rPlus,
        distToHorizonM: (r - this.rPlus) * this.Lm,
        inside: ship.insideHorizon,
        horizonCrossTau: this.horizonCrossTau === null ? undefined : this.horizonCrossTau * this.Tm,
        hoverAccelG: this.hoverAccel / G0,
        gravRedshiftAhead: this.starlightShift([0, 0, -1]),
        gravRedshiftBehind: this.starlightShift([0, 0, 1]),
        terminated: ship.terminated ?? undefined,
      },
      notices,
      physics,
    };
  }

  info() {
    return {
      isco: iscoRadius(this.k),
      horizonKm: (this.rPlus * this.Lm) / 1e3,
      Tmax: this.disk.Tmax,
    };
  }
}

export function lookQuatArr(fwd: number[], up: number[]): [number, number, number, number] {
  const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), new THREE.Vector3(fwd[0], fwd[1], fwd[2]).normalize(), new THREE.Vector3(up[0], up[1], up[2]));
  const q = new THREE.Quaternion().setFromRotationMatrix(m);
  return [q.x, q.y, q.z, q.w];
}

export { staticObserver, zamo, bodyTetrad };

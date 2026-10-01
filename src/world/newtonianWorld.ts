/**
 * Star/planet systems: Newtonian gravity (point masses + Jupiter's J2) with
 * special-relativistic ship kinematics, weak-field gravitational time
 * dilation, atmospheric drag/heating/pressure and stellar radiative heating.
 * Body orbits are analytic (circular, real radii and periods).
 */
import * as THREE from 'three';
import { C, G, G0, SIGMA_SB } from '../physics/constants';
import { Structure } from '../physics/structure';
import { BodyDef, NewtonianSystemDef } from './systems';
import { Telemetry } from './telemetry';

export type V3 = [number, number, number];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scl = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const dot3 = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a: V3) => Math.hypot(a[0], a[1], a[2]);

export interface BodyState {
  def: BodyDef;
  pos: V3;
  vel: V3;
  /** Body-fixed → world rotation. */
  rot: THREE.Matrix3;
  spinAxis: V3;
}

export interface Controls {
  thrust: V3; // body frame, each −1..1
  rot: V3; // pitch, yaw, roll −1..1
}

const SHIP_MASS = 120_000; // kg
const SHIP_CDA = 1.2 * 150; // m²

export class NewtonianWorld {
  t = 0;
  tau = 0;
  pos: V3 = [0, 0, 0];
  w: V3 = [0, 0, 0]; // γ v
  q = new THREE.Quaternion();
  bodies: BodyState[] = [];
  structure = new Structure();
  targetIndex = 0;
  thrustG = 1;
  assist = false;
  warpLimited = false;
  lastThrustWorld: V3 = [0, 0, 0];
  notices: string[] = [];
  env = { rho: 0, pressure: 0, dynPressure: 0, hullTemp: 3, heatFlux: 0, starFlux: 0 };
  probeMode = false;

  constructor(public def: NewtonianSystemDef) {
    this.bodies = def.bodies.map((d) => ({ def: d, pos: [0, 0, 0], vel: [0, 0, 0], rot: new THREE.Matrix3(), spinAxis: [0, 0, 1] }));
    this.updateBodies(0);
    const near = this.bodies.findIndex((b) => b.def.name === def.start.near);
    this.targetIndex = near;
    const b = this.bodies[near];
    const dir = def.start.direction;
    const dl = len(dir);
    this.pos = add(b.pos, scl(dir, def.start.distance / dl));
    this.w = [...b.vel] as V3;
    // face the target
    const toB = sub(b.pos, this.pos);
    const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), new THREE.Vector3(...toB).normalize(), new THREE.Vector3(0, 0, 1));
    this.q.setFromRotationMatrix(m);
  }

  get vel(): V3 {
    const g = Math.sqrt(1 + dot3(this.w, this.w) / (C * C));
    return scl(this.w, 1 / g);
  }

  private bodyIndex(name: string) {
    return this.bodies.findIndex((b) => b.def.name === name);
  }

  updateBodies(t: number) {
    for (const b of this.bodies) {
      const d = b.def;
      if (d.parent) {
        const p = this.bodies[this.bodyIndex(d.parent)];
        const n = (2 * Math.PI) / d.orbitPeriod!;
        const th = (d.orbitPhase ?? 0) + n * t;
        const R = d.orbitRadius!;
        const tilt = p.def.obliquity ?? 0;
        // orbit in the parent's equatorial plane (planets: ecliptic)
        const ct = Math.cos(tilt), st = Math.sin(tilt);
        const lx = R * Math.cos(th), ly = R * Math.sin(th);
        const vx = -R * n * Math.sin(th), vy = R * n * Math.cos(th);
        const useTilt = p.def.kind !== 'star';
        b.pos = add(p.pos, useTilt ? [lx, ly * ct, ly * st] : [lx, ly, 0]);
        b.vel = add(p.vel, useTilt ? [vx, vy * ct, vy * st] : [vx, vy, 0]);
      } else {
        b.pos = [0, 0, 0];
        b.vel = [0, 0, 0];
      }
      const obl = d.obliquity ?? 0;
      const ang = (2 * Math.PI * t) / d.rotationPeriod;
      const rx = new THREE.Matrix3().set(1, 0, 0, 0, Math.cos(obl), -Math.sin(obl), 0, Math.sin(obl), Math.cos(obl));
      const rz = new THREE.Matrix3().set(Math.cos(ang), -Math.sin(ang), 0, Math.sin(ang), Math.cos(ang), 0, 0, 0, 1);
      b.rot = rx.multiply(rz);
      b.spinAxis = [0, -Math.sin(obl), Math.cos(obl)];
    }
  }

  gravity(p: V3): V3 {
    let a: V3 = [0, 0, 0];
    for (const b of this.bodies) {
      const r = sub(p, b.pos);
      const d = len(r);
      const GM = G * b.def.mass;
      a = add(a, scl(r, -GM / (d * d * d)));
      if (b.def.J2) {
        const k = b.spinAxis;
        const s = dot3(r, k) / d;
        const R = b.def.radius;
        const f = (1.5 * b.def.J2 * GM * R * R) / d ** 4;
        a = add(a, add(scl(r, (f * (5 * s * s - 1)) / d), scl(k, -2 * f * s)));
      }
    }
    return a;
  }

  potential(p: V3): number {
    let phi = 0;
    for (const b of this.bodies) phi -= (G * b.def.mass) / len(sub(p, b.pos));
    return phi;
  }

  /** Newtonian tidal tensor (s⁻²) in world frame: Σ GM/r³ (I − 3 r̂ r̂ᵀ). */
  tidalWorld(p: V3): number[][] {
    const E = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (const b of this.bodies) {
      const r = sub(p, b.pos);
      const d = len(r);
      const k = (G * b.def.mass) / d ** 3;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) E[i][j] += k * ((i === j ? 1 : 0) - (3 * r[i] * r[j]) / (d * d));
    }
    return E;
  }

  altitude(b: BodyState, p: V3): number {
    const r = sub(p, b.pos);
    const d = len(r);
    const f = b.def.flattening ?? 0;
    const s = dot3(r, b.spinAxis) / d;
    const Rloc = b.def.radius * (1 - f * s * s);
    return d - Rloc;
  }

  private atmosphereAt(p: V3, v: V3) {
    for (const b of this.bodies) {
      const atm = b.def.atmosphere;
      if (!atm) continue;
      const h = this.altitude(b, p);
      if (h > atm.top) continue;
      const rho = atm.rho0 * Math.exp(Math.min(-h / atm.scaleHeight, 12));
      const pressure = atm.p0 * Math.exp(Math.min(-h / atm.scaleHeight, 12));
      const omega = scl(b.spinAxis, (2 * Math.PI) / b.def.rotationPeriod);
      const r = sub(p, b.pos);
      const vAtm = add(b.vel, [omega[1] * r[2] - omega[2] * r[1], omega[2] * r[0] - omega[0] * r[2], omega[0] * r[1] - omega[1] * r[0]]);
      const vr = sub(v, vAtm);
      return { rho, pressure, vr };
    }
    return null;
  }

  private deriv(p: V3, w: V3, thrustWorld: V3): [V3, V3] {
    const g2 = 1 + dot3(w, w) / (C * C);
    const gam = Math.sqrt(g2);
    const v = scl(w, 1 / gam);
    // proper acceleration → system frame: A = α + (γ−1)(v̂·α)v̂ ; dw/dt = A/γ
    const vv = len(v);
    let A = thrustWorld;
    if (vv > 0) {
      const vh = scl(v, 1 / vv);
      A = add(thrustWorld, scl(vh, (gam - 1) * dot3(vh, thrustWorld)));
    }
    let dw = add(scl(A, 1 / gam), scl(this.gravity(p), gam));
    const atm = this.atmosphereAt(p, v);
    if (atm) {
      const sp = len(atm.vr);
      dw = add(dw, scl(atm.vr, (-0.5 * atm.rho * sp * SHIP_CDA) / SHIP_MASS));
    }
    return [v, dw];
  }

  private rk4(h: number, thrustWorld: V3) {
    const p0 = this.pos, w0 = this.w;
    const [k1p, k1w] = this.deriv(p0, w0, thrustWorld);
    const [k2p, k2w] = this.deriv(add(p0, scl(k1p, h / 2)), add(w0, scl(k1w, h / 2)), thrustWorld);
    const [k3p, k3w] = this.deriv(add(p0, scl(k2p, h / 2)), add(w0, scl(k2w, h / 2)), thrustWorld);
    const [k4p, k4w] = this.deriv(add(p0, scl(k3p, h)), add(w0, scl(k3w, h)), thrustWorld);
    this.pos = add(p0, scl(add(add(k1p, scl(k2p, 2)), add(scl(k3p, 2), k4p)), h / 6));
    this.w = add(w0, scl(add(add(k1w, scl(k2w, 2)), add(scl(k3w, 2), k4w)), h / 6));
  }

  bodyAccel(b: BodyState): V3 {
    // acceleration of a body's centre (finite difference of the analytic orbit)
    const h = 60;
    this.updateBodies(this.t + h);
    const v1 = [...b.vel] as V3;
    this.updateBodies(this.t - h);
    const v0 = [...b.vel] as V3;
    this.updateBodies(this.t);
    return scl(sub(v1, v0), 1 / (2 * h));
  }

  update(dtReal: number, warp: number, ctl: Controls) {
    this.notices = [];
    // attitude: body-rate command
    const rate = 0.6;
    const dq = new THREE.Quaternion().setFromEuler(new THREE.Euler(ctl.rot[0] * rate * dtReal, ctl.rot[1] * rate * dtReal, ctl.rot[2] * rate * dtReal, 'XYZ'));
    this.q.multiply(dq).normalize();

    const dt = dtReal * warp;
    const target = this.bodies[this.targetIndex];
    // engine command in body frame → world
    const tb = new THREE.Vector3(...ctl.thrust).multiplyScalar(this.thrustG * G0).applyQuaternion(this.q);
    let thrust: V3 = [tb.x, tb.y, tb.z];
    if (this.assist && len(ctl.thrust) < 1e-3) {
      // station keeping relative to the target: match its velocity and acceleration
      const aB = this.bodyAccel(target);
      const gS = this.gravity(this.pos);
      const tau = Math.max(5, dt * 4);
      const dv = sub(this.vel, target.vel);
      let cmd = sub(sub(aB, gS), scl(dv, 1 / tau));
      const maxA = 30 * G0;
      const m = len(cmd);
      if (m > maxA) {
        cmd = scl(cmd, maxA / m);
        this.notices.push('Station-keeping saturated (30 g limit)');
      }
      thrust = cmd;
    }
    this.lastThrustWorld = thrust;

    // substeps: resolve orbital timescales and close approaches
    let remaining = dt;
    let steps = 0;
    this.warpLimited = false;
    while (remaining > 0) {
      let h = remaining;
      for (const b of this.bodies) {
        const d = len(sub(this.pos, b.pos));
        h = Math.min(h, 0.01 * Math.sqrt((d * d * d) / (G * b.def.mass)));
        const alt = Math.max(this.altitude(b, this.pos), 1);
        const vrel = len(sub(this.vel, b.vel)) + 1;
        h = Math.min(h, Math.max((0.05 * alt) / vrel, 0.002));
      }
      if (len(thrust) > 0) h = Math.min(h, 2.0 + (0.01 * len(this.vel)) / len(thrust));
      if (++steps > 600) {
        this.warpLimited = true;
        break;
      }
      this.updateBodies(this.t);
      this.rk4(h, thrust);
      const v = this.vel;
      const dTau = h * Math.sqrt(Math.max(1 + (2 * this.potential(this.pos)) / (C * C) - dot3(v, v) / (C * C), 0));
      this.t += h;
      this.tau += dTau;
      remaining -= h;
    }
    this.updateBodies(this.t);
    this.updateEnvironment(dtReal, dt);
  }

  private updateEnvironment(_dtReal: number, dt: number) {
    const v = this.vel;
    const atm = this.atmosphereAt(this.pos, v);
    let heatFlux = 0;
    let pressure = 0;
    let dyn = 0;
    if (atm) {
      const sp = len(atm.vr);
      heatFlux = 1.7e-4 * Math.sqrt(atm.rho / 1.5) * sp ** 3;
      pressure = atm.pressure;
      dyn = 0.5 * atm.rho * sp * sp;
    }
    let starFlux = 0;
    for (const b of this.bodies) {
      if (b.def.kind !== 'star') continue;
      const d = len(sub(this.pos, b.pos));
      if (d < b.def.radius) {
        this.structure.fail(`Entered the photosphere of ${b.def.name}`);
        starFlux += SIGMA_SB * b.def.Teff! ** 4;
      } else starFlux += SIGMA_SB * b.def.Teff! ** 4 * (b.def.radius / d) ** 2;
    }
    const hullTemp = Math.pow((starFlux + heatFlux) / (0.9 * SIGMA_SB) + 3 ** 4, 0.25);
    for (const b of this.bodies) {
      if (b.def.kind === 'rocky' && this.altitude(b, this.pos) < 0) this.structure.fail(`Impact on ${b.def.name}`);
    }
    this.env = { rho: atm?.rho ?? 0, pressure, dynPressure: dyn, hullTemp, heatFlux, starFlux };
    const Ew = this.tidalWorld(this.pos);
    const R = new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(this.q)).elements; // column-major
    // E_body = Rᵀ E R
    const Rm = (i: number, j: number) => R[j * 3 + i];
    const Eb: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        let s = 0;
        for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) s += Rm(a, i) * Ew[a][b] * Rm(b, j);
        Eb[i][j] = s;
      }
    if (!this.probeMode) this.structure.update(Eb, dt, { hullTemp, pressure, dynPressure: dyn });
  }

  telemetry(): Partial<Telemetry> {
    const b = this.bodies[this.targetIndex];
    const r = sub(this.pos, b.pos);
    const d = len(r);
    const vrel = sub(this.vel, b.vel);
    const v = this.vel;
    const speed = len(vrel);
    const gamma = 1 / Math.sqrt(1 - dot3(v, v) / (C * C));
    const dTauDt = Math.sqrt(Math.max(1 + (2 * this.potential(this.pos)) / (C * C) - dot3(v, v) / (C * C), 0));
    const notices = [...this.notices];
    if (this.env.rho > 0) notices.push(`In ${b.def.name}'s atmosphere: ρ = ${this.env.rho.toExponential(2)} kg/m³, ${(this.env.pressure / 1e5).toFixed(2)} bar`);
    if (this.env.hullTemp > 1200) notices.push(`HULL HEATING ${this.env.hullTemp.toFixed(0)} K`);
    const s = this.structure;
    return {
      mode: 'newtonian',
      properTime: this.tau,
      coordTime: this.t,
      dTauDt,
      thrustG: this.thrustG,
      assist: this.assist ? 'STATION-KEEP' : 'OFF',
      speed,
      gamma,
      speedFrame: `rel. ${b.def.name}`,
      target: {
        name: b.def.name,
        distance: d,
        altitude: this.altitude(b, this.pos),
        angularDiameterDeg: (2 * Math.asin(Math.min(1, b.def.radius / d)) * 180) / Math.PI,
        closingSpeed: -dot3(vrel, r) / d,
      },
      gravity: len(this.gravity(this.pos)),
      tidal: { eig: s.tidalEig, shipDiffAccel: s.shipDiffAccel, crewDiffAccel: s.crewDiffAccel },
      structure: {
        stress: s.stress,
        integrity: s.integrity,
        plasticStrain: s.deformation.reduce((m, d) => Math.max(m, d.strain), 0),
        hullTemp: this.env.hullTemp,
        pressure: this.env.pressure,
        failed: s.failed,
        crew: s.crew,
        instrumentsDown: [...s.instrumentsDown],
      },
      notices,
      physics: {
        established: ['Newtonian gravity + Jupiter J2 (weak field, v ≪ c)', 'Special-relativistic ship kinematics & aberration/Doppler of starlight', 'Weak-field time dilation dτ/dt = √(1 + 2Φ/c² − v²/c²)', 'Radiative equilibrium hull heating', 'Exponential-atmosphere drag & pressure'],
        approximated: ['Circular analytic orbits (real radii/periods)', 'Procedural cloud/surface detail', 'Single-scattering haze with 10 samples', 'Glare: CIE disability-glare law, not a full eye model'],
        speculative: [],
      },
    };
  }
}

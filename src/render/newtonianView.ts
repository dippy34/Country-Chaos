/** Renders a NewtonianWorld from the pilot's seat: bodies in scaled space, sky, lighting. */
import * as THREE from 'three';
import { NewtonianWorld, BodyState, V3 } from '../world/newtonianWorld';
import { RENDER_DISTANCE, glowGeometry, glowMaterial, planetMaterial, proxyGeometry, starMaterial } from './bodies';
import { blackbody } from './blackbody';
import { C } from '../physics/constants';

const STYLE: Record<string, number> = { jupiter: 0, io: 1, europa: 2, ganymede: 3, callisto: 4 };
const ALBEDO: Record<string, number> = { jupiter: 0xffffff, io: 0xc8c0a0, europa: 0xd0ccc2, ganymede: 0x8c8780, callisto: 0x5c5650 };

interface BodyVis {
  state: BodyState;
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  glowMat: THREE.ShaderMaterial;
  bound: number;
  /** cached photometry */
  Lstar?: number;
}

export interface LightingOut {
  keyDir: THREE.Vector3;
  keyE: THREE.Vector3;
  fillDir: THREE.Vector3;
  fillE: THREE.Vector3;
}

export class NewtonianView {
  readonly group = new THREE.Group();
  private vis: BodyVis[] = [];
  readonly skyRotBodyToGal = new THREE.Matrix3();
  readonly betaBody = new THREE.Vector3();
  private worldToGal: THREE.Matrix3;

  constructor(private world: NewtonianWorld, bb: THREE.Texture, exposure: THREE.IUniform) {
    for (const b of world.bodies) {
      const d = b.def;
      let mat: THREE.ShaderMaterial;
      let bound = d.radius * 1.03;
      if (d.kind === 'star') {
        const sun = d.style === 'sun';
        mat = starMaterial(bb, d.Teff!, sun ? 0 : 1, sun ? 1.0e6 / d.radius : 0.05);
      } else {
        // haze optical depth above the visible cloud deck (Jupiter: upper-tropospheric/stratospheric haze)
        const atm = d.atmosphere ? { top: d.atmosphere.top / d.radius, H: (d.atmosphere.scaleHeight * 1.5) / d.radius, tau: 0.12 } : undefined;
        if (atm) bound = d.radius * (1 + atm.top) * 1.02;
        // albedo tint normalised so the shader's pattern averages to the body's albedo
        const tint = new THREE.Color(ALBEDO[d.style] ?? 0x888888);
        const lum = 0.2126 * tint.r + 0.7152 * tint.g + 0.0722 * tint.b;
        const norm = (d.albedo ?? 0.4) / (lum * (d.style === 'jupiter' ? 0.8 : 0.6));
        mat = planetMaterial(bb, STYLE[d.style] ?? 3, tint.multiplyScalar(norm), atm);
        mat.uniforms.uFlat.value = d.flattening ?? 0;
      }
      mat.uniforms.uExposure = exposure;
      mat.uniforms.uRadius.value = d.radius;
      const mesh = new THREE.Mesh(proxyGeometry, mat);
      mesh.frustumCulled = false;
      const glowMat = glowMaterial(bb, d.Teff ?? 5772, d.kind === 'star' ? 0.25 : 0);
      glowMat.uniforms.uExposure = exposure;
      const glow = new THREE.Mesh(glowGeometry, glowMat);
      glow.frustumCulled = false;
      this.group.add(mesh, glow);
      const v: BodyVis = { state: b, mesh, glow, mat, glowMat, bound };
      if (d.kind === 'star') v.Lstar = blackbody(d.Teff!).L;
      this.vis.push(v);
    }
    // galactic orientation of the system's reference frame
    if (world.def.skyFrame === 'ecliptic') {
      const eps = THREE.MathUtils.degToRad(23.4393);
      const eclToEq = new THREE.Matrix3().set(1, 0, 0, 0, Math.cos(eps), -Math.sin(eps), 0, Math.sin(eps), Math.cos(eps));
      const eqToGal = new THREE.Matrix3().set(
        -0.0548755604, -0.8734370902, -0.4838350155,
        0.4941094279, -0.44482963, 0.7469822445,
        -0.867666149, -0.1980763734, 0.4559837762,
      );
      this.worldToGal = eqToGal.multiply(eclToEq);
    } else {
      this.worldToGal = new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.4, 1.9, -0.7)));
    }
  }

  /** Star illuminance (lux) at point p and the eclipse fraction from other bodies. */
  private starLight(p: V3, exclude?: BodyState) {
    let best: { dir: V3; E: number; T: number; ang: number } | null = null;
    for (const v of this.vis) {
      if (v.state.def.kind !== 'star') continue;
      const s = v.state;
      const r: V3 = [s.pos[0] - p[0], s.pos[1] - p[1], s.pos[2] - p[2]];
      const d = Math.hypot(...r);
      const ang = Math.asin(Math.min(1, s.def.radius / d));
      let E = v.Lstar! * Math.PI * Math.sin(ang) ** 2;
      // eclipse by planets/moons
      for (const o of this.vis) {
        if (o.state === exclude || o.state.def.kind === 'star') continue;
        const q: V3 = [o.state.pos[0] - p[0], o.state.pos[1] - p[1], o.state.pos[2] - p[2]];
        const dq = Math.hypot(...q);
        if (dq > d) continue;
        const sep = Math.acos(Math.max(-1, Math.min(1, (q[0] * r[0] + q[1] * r[1] + q[2] * r[2]) / (dq * d))));
        const ro = Math.asin(Math.min(1, o.state.def.radius / dq));
        const cover = 1 - THREE.MathUtils.smoothstep(sep, Math.abs(ro - ang), ro + ang);
        E *= 1 - cover * Math.min(1, (ro * ro) / (ang * ang));
      }
      if (!best || E > best.E) best = { dir: [r[0] / d, r[1] / d, r[2] / d], E, T: s.def.Teff!, ang };
    }
    return best;
  }

  update(pixelAngle: number): LightingOut {
    const w = this.world;
    const Rship = new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(w.q));
    const RshipT = Rship.clone().transpose();
    this.skyRotBodyToGal.copy(this.worldToGal).multiply(Rship);
    const v = w.vel;
    this.betaBody.set(v[0] / C, v[1] / C, v[2] / C).applyMatrix3(RshipT);

    const sorted = [...this.vis].sort((a, b) => dist(b.state.pos, w.pos) - dist(a.state.pos, w.pos));
    const out: LightingOut = { keyDir: new THREE.Vector3(0, 1, 0), keyE: new THREE.Vector3(), fillDir: new THREE.Vector3(0, -1, 0), fillE: new THREE.Vector3() };
    const shipLight = this.starLight(w.pos);
    if (shipLight) {
      out.keyDir.set(...shipLight.dir).applyMatrix3(RshipT);
      const c = blackbody(shipLight.T).rgb;
      out.keyE.set(c[0], c[1], c[2]).multiplyScalar(shipLight.E);
    }
    let maxFill = 0;
    sorted.forEach((vis, rank) => {
      const s = vis.state;
      const d = s.def;
      const rel: V3 = [s.pos[0] - w.pos[0], s.pos[1] - w.pos[1], s.pos[2] - w.pos[2]];
      const dd = Math.hypot(...rel);
      const dirShip = new THREE.Vector3(rel[0] / dd, rel[1] / dd, rel[2] / dd).applyMatrix3(RshipT);
      const sc = RENDER_DISTANCE / dd;
      vis.mesh.position.copy(dirShip).multiplyScalar(RENDER_DISTANCE);
      vis.mesh.scale.setScalar(vis.bound * sc);
      vis.mesh.renderOrder = -500 + rank * 2;
      // body-fixed transforms
      const RbT = s.rot.clone().transpose();
      const toBody = RbT.clone().multiply(Rship);
      const u = vis.mat.uniforms;
      u.uToBody.value.copy(toBody);
      const o = new THREE.Vector3(-rel[0], -rel[1], -rel[2]).applyMatrix3(RbT).divideScalar(d.radius);
      u.uOrigin.value.copy(o);
      u.uC.value = ((dd - d.radius) * (dd + d.radius)) / (d.radius * d.radius);
      u.uTime.value = w.t;
      u.uPixelAngle.value = pixelAngle;
      const angR = Math.asin(Math.min(1, d.radius / dd));
      let Eeye = 0;
      if (d.kind !== 'star') {
        const L = this.starLight(s.pos, s);
        if (L) {
          u.uSunDir.value.set(...L.dir).applyMatrix3(RbT);
          u.uSunE.value = L.E;
          u.uSunT.value = L.T;
          u.uSunAng.value = L.ang;
          // planet-shine on the ship: average lit-disc luminance × solid angle × phase
          const cosPhase = -(L.dir[0] * rel[0] + L.dir[1] * rel[1] + L.dir[2] * rel[2]) / dd;
          const phase = 0.5 * (1 + cosPhase);
          Eeye = ((d.albedo ?? 0.3) * L.E) / Math.PI * Math.PI * Math.sin(angR) ** 2 * phase;
          if (Eeye > maxFill) {
            maxFill = Eeye;
            out.fillDir.copy(dirShip);
            const c = blackbody(L.T).rgb;
            const tint = d.style === 'jupiter' ? [1.0, 0.85, 0.65] : [1, 1, 1];
            out.fillE.set(c[0] * tint[0], c[1] * tint[1], c[2] * tint[2]).multiplyScalar(Eeye);
          }
        }
        // occluders for shadows on this body
        let n = 0;
        for (const ov of this.vis) {
          if (ov === vis || ov.state.def.kind === 'star' || n >= 4) continue;
          const oc = new THREE.Vector3(ov.state.pos[0] - s.pos[0], ov.state.pos[1] - s.pos[1], ov.state.pos[2] - s.pos[2]).applyMatrix3(RbT).divideScalar(d.radius);
          u.uOcc.value[n].set(oc.x, oc.y, oc.z, ov.state.def.radius / d.radius);
          n++;
        }
        u.uOccN.value = n;
      } else {
        Eeye = vis.Lstar! * Math.PI * Math.sin(angR) ** 2;
      }
      // point-source / glare quad
      const gu = vis.glowMat.uniforms;
      const half = d.kind === 'star' ? Math.min(0.35, Math.max(angR * 3, 0.05)) : Math.max(angR * 1.5, pixelAngle * 4);
      vis.glow.position.copy(vis.mesh.position);
      vis.glow.scale.setScalar(Math.tan(half) * RENDER_DISTANCE);
      vis.glow.renderOrder = -500 + rank * 2 + 1;
      gu.uE.value = Eeye;
      gu.uHalfAngle.value = half;
      gu.uPixelAngle.value = pixelAngle;
      gu.uResolved.value = THREE.MathUtils.smoothstep(angR / pixelAngle, 0.4, 1.5);
      if (d.kind !== 'star') gu.uT.value = u.uSunT.value;
      vis.glow.visible = d.kind === 'star' || gu.uResolved.value < 1;
    });
    return out;
  }

  /** Procedural detail budget (octaves) for the current quality level. */
  setOctaves(n: number) {
    for (const v of this.vis) v.mat.uniforms.uOct.value = n;
  }

  dispose() {
    for (const v of this.vis) {
      v.mat.dispose();
      v.glowMat.dispose();
    }
  }
}

const dist = (a: V3, b: V3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

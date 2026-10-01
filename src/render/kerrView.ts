/**
 * Renders a KerrWorld: the ray-traced sky for whichever observer is active
 * and, for the EXTERNAL OBSERVER, a tracking telescope that shows the ship
 * as the light now arriving at the observer depicts it.
 */
import * as THREE from 'three';
import { KerrWorld } from '../world/kerrWorld';
import { KerrTracer, diskTempTexture } from './kerrTracer';
import { LensingMap, LensingScene, LightProbe, applyShadeState, makeKerrDome, makeNoiseTexture } from './lensing';
import { ShipModel } from './shipModel';
import { bodyTetrad } from '../physics/frames';
import { dot, ksPoint } from '../physics/kerr';
import { blackbody } from './blackbody';
import { gravLength } from '../physics/constants';

export interface Quality {
  /** lensing-map face resolution (geometry; shading is always per display pixel) */
  map: number;
  /** cube faces traced per frame (6 = whole map every frame) */
  faces: number;
  steps: number;
  h: number;
  /** fbm octave budget for planet/star surfaces */
  octaves: number;
  /** telescope trace resolution and refresh divisor */
  telescope: number;
}

export const QUALITY: Record<string, Quality> = {
  low: { map: 224, faces: 1, steps: 260, h: 0.055, octaves: 5, telescope: 192 },
  medium: { map: 320, faces: 2, steps: 360, h: 0.045, octaves: 7, telescope: 256 },
  high: { map: 448, faces: 6, steps: 500, h: 0.035, octaves: 10, telescope: 384 },
  ultra: { map: 640, faces: 6, steps: 700, h: 0.028, octaves: 12, telescope: 512 },
};

export class KerrView {
  /** Full-radiance tracer, used only for the narrow telescope view. */
  tracer: KerrTracer;
  readonly pilotMap: LensingMap;
  readonly obsMap: LensingMap;
  readonly dome: ReturnType<typeof makeKerrDome>;
  /** Second dome for the desktop dual view (shows the other observer). */
  readonly dome2: ReturnType<typeof makeKerrDome>;
  readonly probe: LightProbe;
  telescopeRT = new THREE.WebGLRenderTarget(384, 384, { type: THREE.HalfFloatType });
  readonly telescopePanel: THREE.Mesh;
  readonly marker: THREE.Mesh;
  readonly ship: ShipModel;
  private shipScene = new THREE.Scene();
  private shipCam = new THREE.PerspectiveCamera(10, 1, 0.1, 1e5);
  telescopeZoom = 1;
  image: ReturnType<KerrWorld['observer']['imageAt']> = null;
  private diskTex: THREE.DataTexture;
  private noise: THREE.DataTexture;
  private quality: Quality;
  private frame = 0;

  constructor(private world: KerrWorld, private bb: THREE.Texture, private sky: THREE.Texture, quality: Quality) {
    this.quality = quality;
    this.diskTex = diskTempTexture(world.disk.T, world.disk.Tmax);
    this.noise = makeNoiseTexture(256);
    this.tracer = this.makeTracer(quality);
    const scene = this.lensingScene();
    this.pilotMap = new LensingMap(quality.map, scene);
    this.obsMap = new LensingMap(quality.map, scene);
    for (const m of [this.pilotMap, this.obsMap]) m.setQuality(quality.steps, quality.h);
    this.pilotMap.facesPerFrame = quality.faces;
    const tex = { sky, bb, diskTemp: this.diskTex, noise: this.noise };
    this.dome = makeKerrDome(tex, scene, world.disk.Tmax);
    this.dome2 = makeKerrDome(tex, scene, world.disk.Tmax);
    this.probe = new LightProbe(tex, scene, world.disk.Tmax, 32);
    this.telescopeRT.setSize(quality.telescope, quality.telescope);
    const panelMat = new THREE.MeshBasicMaterial({ map: this.telescopeRT.texture, toneMapped: true });
    this.telescopePanel = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), panelMat);
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.66), new THREE.MeshBasicMaterial({ color: 0x0b1118, toneMapped: false }));
    frame.position.set(0, 0.025, -0.002);
    this.telescopePanel.add(frame);
    this.telescopePanel.position.set(-0.62, -0.32, -0.95);
    this.telescopePanel.rotation.set(-0.25, 0.45, 0);
    this.marker = new THREE.Mesh(
      new THREE.RingGeometry(1.1, 1.35, 40),
      new THREE.MeshBasicMaterial({ color: 0xff70e0, toneMapped: false, depthTest: false, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    );
    this.marker.renderOrder = 5;
    this.ship = new ShipModel(bb);
    this.shipScene.add(this.ship.group);
  }

  private lensingScene(): LensingScene {
    const w = this.world;
    return { spin: w.k.a, rPlus: w.rPlus, diskOn: w.diskOn, diskIn: w.disk.rIn, diskOut: w.disk.rOut, skyRot: w.skyRot };
  }

  private makeTracer(q: Quality) {
    const w = this.world;
    const t = new KerrTracer(16, {
      spin: w.k.a, rPlus: w.rPlus, diskOn: w.diskOn, diskIn: w.disk.rIn, diskOut: w.disk.rOut, diskTmax: w.disk.Tmax,
      diskTemp: this.diskTex, sky: this.sky, bb: this.bb, skyRot: w.skyRot,
    });
    t.setQuality(q.steps, q.h);
    return t;
  }

  setQuality(q: Quality) {
    this.quality = q;
    this.tracer.setQuality(q.steps, q.h);
    for (const m of [this.pilotMap, this.obsMap]) {
      m.resize(q.map);
      m.setQuality(q.steps, q.h);
    }
    this.pilotMap.facesPerFrame = q.faces;
    this.telescopeRT.setSize(q.telescope, q.telescope);
  }

  setDisk(on: boolean) {
    this.tracer.setParams({ diskOn: on });
    for (const m of [this.pilotMap, this.obsMap]) {
      m.setDisk(on);
      m.frontCam = null; // force a full re-trace
    }
  }

  private mapCamera(external: boolean) {
    const v = this.world.viewState(external);
    return { e: v.ref, pos: v.pos, t: v.t };
  }

  private shade(u: Parameters<typeof applyShadeState>[0], external: boolean, exposure: number) {
    const v = this.world.viewState(external);
    applyShadeState(u, { map: external ? this.obsMap : this.pilotMap, att: v.att, ref: v.ref, f: v.f, l: v.l, t: v.t, exposure });
  }

  /**
   * Advance the lensing map for the active observer and update the dome and
   * light probe. The external observer is static, so its map is traced once.
   */
  renderSky(renderer: THREE.WebGLRenderer, external: boolean, exposure: number) {
    this.frame++;
    if (external) {
      if (!this.obsMap.frontCam) this.obsMap.update(renderer, () => this.mapCamera(true), true);
    } else {
      this.pilotMap.update(renderer, () => this.mapCamera(false), !this.pilotMap.frontCam);
    }
    this.shade(this.dome.uniforms, external, exposure);
    this.shade(this.probe.uniforms, external, exposure);
    this.probe.update(renderer, 1);
  }

  /** Desktop dual view: the other observer's sky into dome2. */
  renderOther(renderer: THREE.WebGLRenderer, external: boolean, exposure: number) {
    const other = !external;
    const map = other ? this.obsMap : this.pilotMap;
    if (!map.frontCam || !other) map.update(renderer, () => this.mapCamera(other), !map.frontCam);
    this.shade(this.dome2.uniforms, other, exposure);
  }

  /** External observer: solve the retarded image, aim the telescope, render it. */
  updateExternal(renderer: THREE.WebGLRenderer, exposure: number) {
    const w = this.world;
    const img = w.observer.imageAt(w.observerT, w.ship.history);
    this.image = img;
    this.marker.visible = !!img;
    if (!img) {
      this.telescopeZoom = 1;
      return;
    }
    const f = img.frac;
    const lerp3 = (a: number[], b: number[] | undefined) => (b ? a.map((x, i) => x + f * (b[i] - x)) : a);
    const dir = new THREE.Vector3(...lerp3(img.sol.dir, img.solB?.dir)).normalize();
    const g = img.solB ? img.sol.g + f * (img.solB.g - img.sol.g) : img.sol.g;
    const DA = img.solB ? img.sol.DA + f * (img.solB.DA - img.sol.DA) : img.sol.DA;
    this.marker.position.copy(dir).multiplyScalar(100);
    this.marker.lookAt(0, 0, 0);

    const Lm = gravLength(w.massKg);
    const theta = this.ship.length / Math.max(DA * Lm, 1);
    const fov = THREE.MathUtils.clamp(theta * 5, 1e-12, 0.3);
    this.telescopeZoom = 1.6 / fov;
    const fwd = dir.clone();
    const upRef = Math.abs(fwd.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(fwd, upRef).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd).normalize();
    const back = fwd.clone().negate();
    const basis = new THREE.Matrix3().set(right.x, up.x, back.x, right.y, up.y, back.y, right.z, up.z, back.z);

    // telescope auto-gain: expose for the hull's predicted surface brightness, up to a sensor limit
    const keyT = w.disk.Tmax * 0.6;
    const keyK = w.diskOn ? 0.15 * Math.min(1, (w.def.diskOuter * w.def.diskOuter) / (img.a.x ** 2 + img.a.y ** 2 + img.a.z ** 2 + 1)) + 1e-4 : 1e-4;
    const Lhull = blackbody(Math.max(g * keyT, 300)).L * keyK * 0.3 + 1e-30;
    const gainMax = exposure * 1e6;
    const telExposure = Math.min(0.25 / Lhull, gainMax);

    // the telescope trace is the expensive part; on headsets refresh it every third frame
    if (this.quality.faces >= 6 || this.frame % 3 === 0) {
      this.tracer.setCamera({ e: w.observer.tetrad.e, pos: w.observer.pos, t: w.observerT }, telExposure);
      this.tracer.renderPerspective(renderer, this.telescopeRT, basis, Math.tan(fov / 2));
    }

    // ship orientation as seen: TRIAD alignment of (photon direction, spin axis) between frames
    const sample = img.a;
    const shipT = bodyTetrad(w.k, [sample.x, sample.y, sample.z], sample.u, sample.q);
    const ez = [0, 0, 0, 1];
    const spinShip = new THREE.Vector3(...[1, 2, 3].map((i) => dot(shipT.point, shipT.e[i], ez)));
    const obsT = w.observer.tetrad;
    const spinObs = new THREE.Vector3(...[1, 2, 3].map((i) => dot(obsT.point, obsT.e[i], ez)));
    const spinCam = new THREE.Vector3(spinObs.dot(right), spinObs.dot(up), spinObs.dot(back));
    const a1 = new THREE.Vector3(...lerp3(img.sol.emitDirShip, img.solB?.emitDirShip)).normalize();
    const b1 = new THREE.Vector3(0, 0, 1);
    const triad = (v1: THREE.Vector3, v2: THREE.Vector3) => {
      const t1 = v1.clone();
      const t2 = v2.clone().sub(t1.clone().multiplyScalar(v2.dot(t1)));
      if (t2.lengthSq() < 1e-12) t2.set(0, 1, 0).sub(t1.clone().multiplyScalar(t1.y));
      t2.normalize();
      const t3 = new THREE.Vector3().crossVectors(t1, t2);
      return new THREE.Matrix4().makeBasis(t1, t2, t3);
    };
    const A = triad(a1, spinShip);
    const B = triad(b1, spinCam);
    const rot = B.multiply(A.transpose());
    this.ship.group.quaternion.setFromRotationMatrix(rot);
    const D = 100;
    this.ship.group.position.set(0, 0, -D);
    this.ship.group.scale.setScalar(D / Math.max(DA * Lm, 1e-3));
    // lighting from the inner disk, expressed in the ship frame
    const toHole = [0, -sample.x, -sample.y, -sample.z];
    const kd = new THREE.Vector3(...[1, 2, 3].map((i) => dot(shipT.point, shipT.e[i], toHole))).normalize();
    const sh = this.ship.shared;
    sh.uKeyDir.value.copy(kd);
    sh.uG.value = g;
    sh.uKeyT.value = keyT;
    sh.uKeyK.value = keyK;
    sh.uEngine.value = sample.thrust;
    sh.uTauEmit.value = img.tauEmit * w.Tm;
    sh.uExposure.value = telExposure;
    this.shipCam.fov = THREE.MathUtils.radToDeg(fov);
    this.shipCam.near = D * 0.01;
    this.shipCam.far = D * 100;
    this.shipCam.updateProjectionMatrix();
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    const prevAuto = renderer.autoClear;
    renderer.xr.enabled = false;
    renderer.autoClear = false;
    renderer.setRenderTarget(this.telescopeRT);
    renderer.clearDepth();
    renderer.render(this.shipScene, this.shipCam);
    renderer.setRenderTarget(prevTarget);
    renderer.autoClear = prevAuto;
    renderer.xr.enabled = prevXr;
    void ksPoint;
  }

  observerTelemetry() {
    const img = this.image;
    const w = this.world;
    if (!img) return { seen: false, delay: 0, g: 0, tauEmit: 0, lastFrozen: false, telescopeZoom: 1 };
    const tEmit = img.a.t + (img.b ? img.frac * (img.b.t - img.a.t) : 0);
    const g = img.solB ? img.sol.g + img.frac * (img.solB.g - img.sol.g) : img.sol.g;
    return {
      seen: true,
      delay: (w.observerT - tEmit) * w.Tm,
      g,
      tauEmit: img.tauEmit * w.Tm,
      lastFrozen: !img.b,
      telescopeZoom: this.telescopeZoom,
    };
  }

  dispose() {
    this.tracer.cube.dispose();
    this.tracer.material.dispose();
    this.pilotMap.dispose();
    this.obsMap.dispose();
    this.probe.dispose();
    this.dome.material.dispose();
    this.dome2.material.dispose();
    this.telescopeRT.dispose();
    this.diskTex.dispose();
    this.noise.dispose();
  }
}

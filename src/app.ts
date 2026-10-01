/**
 * Lightcone application: renderer + WebXR session, world/view lifecycle,
 * input → physics → rendering → instruments, every frame.
 */
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { makeBlackbodyLUT, blackbody } from './render/blackbody';
import { generateSky } from './render/skyGen';
import { SkyDome } from './render/skyDome';
import { AutoExposure } from './render/exposure';
import { Cockpit, makeObserverDeck } from './render/cockpit';
import { NewtonianView } from './render/newtonianView';
import { KerrView, QUALITY } from './render/kerrView';
import { NewtonianWorld } from './world/newtonianWorld';
import { KerrWorld, lookQuatArr } from './world/kerrWorld';
import { SYSTEMS, SystemDef, KerrSystemDef } from './world/systems';
import { Telemetry } from './world/telemetry';
import { Hud, overlayText } from './ui/hud';
import { Action, Input } from './input/controls';
import { UIPanel, VRUI } from './ui/vrui';
import { makeMenuButton, makeMenuPanel, makeWelcomePanel } from './ui/menus';
import { LabelLayer } from './ui/labels';
import { fmtDist, fmtTime } from './world/telemetry';
import { dot as kdot } from './physics/kerr';

const WARPS = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8];
const THRUSTS = [0.1, 0.3, 1, 3, 10, 30];
const CELESTIAL_LAYER = 3;

export class App {
  renderer!: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.02, 1e5);
  celestial = new THREE.Group();
  cockpit = new Cockpit();
  deck: THREE.Group;
  hud = new Hud();
  input!: Input;
  exposure = new AutoExposure();
  exposureU = { value: 1 };
  bb!: THREE.DataTexture;
  sky!: THREE.WebGLCubeRenderTarget;
  dome!: SkyDome;
  dualScene = new THREE.Scene();
  systems: SystemDef[] = SYSTEMS.map((s) => ({ ...s }));
  current!: SystemDef;
  nWorld: NewtonianWorld | null = null;
  nView: NewtonianView | null = null;
  kWorld: KerrWorld | null = null;
  kView: KerrView | null = null;
  view: 'pilot' | 'external' = 'pilot';
  warpIdx = 0;
  thrustIdx = 2;
  quality: keyof typeof QUALITY = 'high';
  dual = false;
  private last = 0;
  private overlayTimer = 0;
  private frameAvg = 16;
  private slowFrames = 0;
  private fastAdapt = 0;
  private flash: { text: string; until: number } | null = null;
  private overlay = document.getElementById('overlay')!;
  ui!: VRUI;
  uiRoot = new THREE.Group();
  menuPanel!: UIPanel;
  welcomePanel!: UIPanel;
  menuButtons: UIPanel[] = [];
  labels = new LabelLayer();

  constructor(private container: HTMLElement) {
    this.deck = makeObserverDeck(this.cockpit.shared);
  }

  async start() {
    const r = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer = r;
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.setSize(window.innerWidth, window.innerHeight);
    // hue-preserving display transform keeps blackbody colours (orange supergiants, red-shifted disks) honest
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.xr.enabled = true;
    r.xr.setReferenceSpaceType('local');
    r.xr.setFoveation(1);
    this.container.appendChild(r.domElement);
    const q = new URLSearchParams(location.search);
    const tm = q.get('tm');
    if (tm === 'agx') r.toneMapping = THREE.AgXToneMapping;
    if (tm === 'aces') r.toneMapping = THREE.ACESFilmicToneMapping;
    if (q.get('quality') && q.get('quality')! in QUALITY) this.quality = q.get('quality') as keyof typeof QUALITY;
    const vrButton = VRButton.createButton(r);
    document.body.appendChild(vrButton);
    r.xr.addEventListener('sessionstart', () => {
      // standalone headsets: lighter geodesic load, 72 Hz target, menus usable by laser
      if (this.quality === 'high' || this.quality === 'ultra') this.setQuality('medium');
      const s = r.xr.getSession() as (XRSession & { updateTargetFrameRate?: (r: number) => Promise<void>; supportedFrameRates?: Float32Array }) | null;
      if (s?.updateTargetFrameRate && s.supportedFrameRates && Array.from(s.supportedFrameRates).includes(72)) s.updateTargetFrameRate(72).catch(() => {});
      this.welcomePanel.mesh.visible = true;
      this.welcomePanel.dirty = true;
    });
    this.input = new Input(r.domElement);
    // visible controllers (models are fetched from the WebXR input-profiles CDN on device)
    const factory = new XRControllerModelFactory();
    for (let i = 0; i < 2; i++) {
      const grip = r.xr.getControllerGrip(i);
      grip.add(factory.createControllerModel(grip));
      this.scene.add(grip);
    }
    window.addEventListener('resize', () => this.resize());
    this.resize();

    await new Promise((res) => setTimeout(res, 30));
    this.bb = makeBlackbodyLUT();
    this.sky = generateSky(r, q.get('sky') ? parseInt(q.get('sky')!) : this.quality === 'low' ? 512 : 1024);
    this.dome = new SkyDome(this.sky.texture, this.bb);
    this.dome.material.uniforms.uExposure = this.exposureU;

    this.camera.layers.enable(CELESTIAL_LAYER);
    this.scene.add(this.camera);
    this.scene.add(this.celestial);
    this.celestial.add(this.dome.mesh);
    this.scene.add(this.cockpit.group);
    this.scene.add(this.deck);
    // the lit cockpit takes part in eye adaptation; the self-luminous instrument
    // displays do not (their brightness does not scale with exposure)
    this.cockpit.body.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && (m.material as THREE.ShaderMaterial).uniforms?.uEmissive?.value.lengthSq() === 0) o.layers.enable(CELESTIAL_LAYER);
    });
    this.hud.attach(this.cockpit.panelAnchors);
    this.deck.visible = false;
    this.setupUI();

    this.buildPanel();
    let sys = this.systems.find((s) => s.id === (q.get('sys') ?? 'sgra')) ?? this.systems[0];
    // debugging / sharing: override start distance (m) or radius (M)
    if (sys.kind === 'newtonian' && q.get('dist')) sys = { ...sys, start: { ...sys.start, distance: parseFloat(q.get('dist')!) } };
    if (sys.kind === 'kerr' && q.get('r')) sys = { ...sys, startR: parseFloat(q.get('r')!) };
    if (sys.kind === 'kerr' && q.get('th')) sys = { ...sys, startTheta: parseFloat(q.get('th')!) };
    if (sys.kind === 'kerr' && q.get('orbit')) sys = { ...sys, startOrbitFraction: parseFloat(q.get('orbit')!) };
    if (sys.kind === 'kerr' && q.get('disk') === '0') sys = { ...sys, disk: false };
    this.loadSystem(sys);
    if (q.get('view') === 'external') this.setView('external');
    if (q.get('meter') === 'sync') this.exposure.sync = true;
    if (q.get('probe') === '1') (this.kWorld ?? this.nWorld)!.probeMode = true;
    if (q.get('warp')) this.warpIdx = Math.max(0, WARPS.indexOf(parseFloat(q.get('warp')!)));
    document.getElementById('loading')!.remove();
    r.setAnimationLoop((t) => this.frame(t));
  }

  private setupUI() {
    this.scene.add(this.uiRoot);
    this.scene.add(this.labels.group);
    this.menuPanel = makeMenuPanel(() => {
      const w = (this.kWorld ?? this.nWorld)!;
      return {
        systems: this.systems,
        current: this.current?.id ?? '',
        view: this.view,
        isBlackHole: !!this.kWorld,
        diskOn: this.kWorld?.diskOn ?? false,
        assist: w?.assist ?? false,
        probe: w?.probeMode ?? false,
        warp: WARPS[this.warpIdx],
        thrustG: THRUSTS[this.thrustIdx],
        quality: this.quality,
      };
    });
    this.menuPanel.mesh.position.set(0, -0.06, -0.82);
    this.menuPanel.mesh.rotation.x = -0.12;
    this.menuPanel.mesh.visible = false;
    this.welcomePanel = makeWelcomePanel();
    this.welcomePanel.mesh.position.set(0, -0.02, -0.9);
    this.welcomePanel.mesh.rotation.x = -0.06;
    this.uiRoot.add(this.menuPanel.mesh, this.welcomePanel.mesh);
    const b1 = makeMenuButton();
    this.cockpit.panelAnchors.menu.add(b1.mesh);
    const b2 = makeMenuButton();
    b2.mesh.position.set(-0.05, -0.62, -0.92);
    b2.mesh.rotation.x = -0.6;
    this.deck.add(b2.mesh);
    this.menuButtons = [b1, b2];
    this.ui = new VRUI(this.renderer, this.scene, this.camera, this.renderer.domElement);
    this.ui.panels = [this.welcomePanel, this.menuPanel, b1, b2];
    this.ui.onClick = (panel, id) => this.onUIClick(panel, id);
  }

  private get uiOpen() {
    return this.menuPanel.mesh.visible || this.welcomePanel.mesh.visible;
  }

  private showMenu(on: boolean) {
    this.menuPanel.mesh.visible = on;
    if (on) this.welcomePanel.mesh.visible = false;
    this.menuPanel.dirty = true;
  }

  private onUIClick(panel: UIPanel, id: string) {
    if (panel === this.welcomePanel) {
      this.welcomePanel.mesh.visible = false;
      if (id === 'menu') this.showMenu(true);
      return;
    }
    if (this.menuButtons.includes(panel)) {
      this.showMenu(!this.menuPanel.mesh.visible);
      return;
    }
    const map: Record<string, Action> = {
      view: 'toggleView', assist: 'toggleAssist', point: 'pointTarget', reset: 'reset', 'warp-': 'warpDown', 'warp+': 'warpUp',
      'thr-': 'thrustDown', 'thr+': 'thrustUp', disk: 'disk', probe: 'probe',
    };
    if (id.startsWith('dest:')) {
      const i = parseInt(id.slice(5));
      this.showMenu(false);
      this.loadSystem(this.systems[i]);
    } else if (id === 'close') this.showMenu(false);
    else if (id === 'help') {
      this.showMenu(false);
      this.welcomePanel.mesh.visible = true;
      this.welcomePanel.dirty = true;
    } else if (id === 'quality') {
      const order: (keyof typeof QUALITY)[] = ['low', 'medium', 'high', 'ultra'];
      this.setQuality(order[(order.indexOf(this.quality) + 1) % order.length]);
    } else if (map[id]) this.handle(new Set([map[id]]));
    this.menuPanel.dirty = true;
  }

  /** Name tags for what is in the sky. */
  private updateLabels() {
    this.labels.begin();
    const deg = (r: number) => (r * 180) / Math.PI;
    if (this.nWorld && this.nView) {
      const w = this.nWorld;
      const Rt = new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(w.q)).transpose();
      w.bodies.forEach((b, i) => {
        const rel = new THREE.Vector3(b.pos[0] - w.pos[0], b.pos[1] - w.pos[1], b.pos[2] - w.pos[2]);
        const d = rel.length();
        const ang = Math.asin(Math.min(1, b.def.radius / d));
        const alt = w.altitude(b, w.pos);
        const isTarget = i === w.targetIndex;
        if (!isTarget && deg(ang) < 0.05 && b.def.kind !== 'star') return;
        this.labels.put(`b${i}`, rel.applyMatrix3(Rt), b.def.name, `${fmtDist(Math.max(alt, 0))} away · ${deg(2 * ang).toFixed(deg(ang) < 1 ? 2 : 0)}° wide`, isTarget ? '#ffd27a' : '#7fe0ff', Math.min(ang * 1.05, 0.5) + 0.01);
      });
    } else if (this.kWorld) {
      const k = this.kWorld;
      const ext = this.view === 'external';
      const t = ext ? k.observer.tetrad : k.ship.tetrad();
      const pos = ext ? k.observer.pos : k.ship.pos;
      const toHole = [0, -pos[0], -pos[1], -pos[2]];
      const dir = new THREE.Vector3(...[1, 2, 3].map((i) => kdot(t.point, t.e[i], toHole)));
      const name = this.current.name.replace(/ \(.*\)$/, '');
      const tel = k.telemetry();
      const detail = tel.bh?.inside ? 'you are inside its event horizon' : `horizon ${fmtDist(tel.bh!.distToHorizonM)} away`;
      this.labels.put('bh', dir, name, ext ? 'seen from the observation deck' : detail, '#ffd27a', 0.25);
      if (ext && this.kView?.image) {
        const o = this.kView.observerTelemetry();
        this.labels.put('ship', this.kView.marker.position.clone(), 'Your ship', `as it was ${fmtTime(o.delay)} ago`, '#ff8cf0', 0.03);
      }
    }
    this.labels.end();
  }

  private resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(w, h);
  }

  // ───────────────────────────── systems ─────────────────────────────

  loadSystem(def: SystemDef) {
    this.nView?.group.removeFromParent();
    this.nView?.dispose();
    this.kView?.telescopePanel.removeFromParent();
    this.kView?.marker.removeFromParent();
    this.kView?.dome.mesh.removeFromParent();
    this.kView?.dome2.mesh.removeFromParent();
    this.kView?.dispose();
    this.nWorld = this.nView = this.kWorld = this.kView = null;
    this.current = def;
    this.warpIdx = 0;
    if (def.kind === 'kerr') {
      this.kWorld = new KerrWorld(def);
      this.kView = new KerrView(this.kWorld, this.bb, this.sky.texture, QUALITY[this.quality]);
      this.deck.add(this.kView.telescopePanel);
      this.celestial.add(this.kView.marker);
      this.celestial.add(this.kView.dome.mesh);
      this.dualScene.add(this.kView.dome2.mesh);
      this.dome.mesh.visible = false;
      this.kView.marker.layers.enable(0);
      this.kWorld.thrustG = THRUSTS[this.thrustIdx];
      const L0 = blackbody(this.kWorld.disk.Tmax * 0.6).L * (def.disk ? Math.min(0.3, (def.diskOuter / def.startR) ** 2) : 0) + 2e-3;
      this.exposure.snapTo(L0);
    } else {
      this.dome.mesh.visible = true;
      this.nWorld = new NewtonianWorld(def);
      this.nView = new NewtonianView(this.nWorld, this.bb, this.exposureU);
      this.celestial.add(this.nView.group);
      this.nView.setOctaves(QUALITY[this.quality].octaves);
      this.nWorld.thrustG = THRUSTS[this.thrustIdx];
      this.exposure.snapTo(0.05);
      this.setView('pilot');
    }
    this.fastAdapt = 2.5;
    this.celestial.traverse((o) => o.layers.enable(CELESTIAL_LAYER));
    this.kView?.marker.layers.disable(CELESTIAL_LAYER);
    this.syncPanel();
    this.say(`${def.name}: ${def.blurb}`);
  }

  setView(v: 'pilot' | 'external') {
    if (v === 'external' && !this.kWorld) {
      this.say('The EXTERNAL OBSERVER view is available at black holes.');
      v = 'pilot';
    }
    this.view = v;
    const ext = v === 'external';
    this.cockpit.group.visible = !ext;
    this.deck.visible = ext;
    if (this.kView) this.kView.marker.visible = ext;
    // move the status + legend displays onto the observer deck
    if (ext) {
      this.deck.add(this.hud.status.mesh);
      this.hud.status.mesh.position.set(0.05, -0.62, -1.0);
      this.hud.status.mesh.rotation.set(-0.6, 0, 0);
      this.deck.add(this.hud.legend.mesh);
      this.hud.legend.mesh.position.set(0.68, -0.38, -0.8);
      this.hud.legend.mesh.rotation.set(-0.3, -0.5, 0);
    } else {
      this.cockpit.panelAnchors.status.add(this.hud.status.mesh);
      this.cockpit.panelAnchors.legend.add(this.hud.legend.mesh);
      for (const m of [this.hud.status.mesh, this.hud.legend.mesh]) {
        m.position.set(0, 0, 0);
        m.rotation.set(0, 0, 0);
      }
    }
  }

  setQuality(q: keyof typeof QUALITY) {
    this.quality = q;
    this.kView?.setQuality(QUALITY[q]);
    this.nView?.setOctaves(QUALITY[q].octaves);
    (document.getElementById('quality') as HTMLSelectElement).value = q;
  }

  private say(text: string, seconds = 6) {
    this.flash = { text, until: performance.now() + seconds * 1000 };
  }

  // ───────────────────────────── input ─────────────────────────────

  private handle(actions: Set<Action>) {
    const w = this.nWorld ?? this.kWorld;
    if (!w) return;
    for (const a of actions) {
      switch (a) {
        case 'toggleView':
          this.setView(this.view === 'pilot' ? 'external' : 'pilot');
          break;
        case 'warpUp':
          this.warpIdx = Math.min(WARPS.length - 1, this.warpIdx + 1);
          break;
        case 'warpDown':
          this.warpIdx = Math.max(0, this.warpIdx - 1);
          break;
        case 'thrustUp':
        case 'thrustDown':
          this.thrustIdx = THREE.MathUtils.clamp(this.thrustIdx + (a === 'thrustUp' ? 1 : -1), 0, THRUSTS.length - 1);
          w.thrustG = THRUSTS[this.thrustIdx];
          break;
        case 'toggleAssist':
          w.assist = !w.assist;
          break;
        case 'pointTarget':
          this.pointAtTarget();
          break;
        case 'nextTarget':
          if (this.nWorld) this.nWorld.targetIndex = (this.nWorld.targetIndex + 1) % this.nWorld.bodies.length;
          break;
        case 'reset':
          this.loadSystem(this.current);
          break;
        case 'probe':
          w.probeMode = !w.probeMode;
          if (w.probeMode) {
            w.structure.failed = false;
            w.structure.integrity = Math.max(w.structure.integrity, 0.01);
            this.say('UNMANNED PROBE MODE: structural limits ignored so you can keep watching. Not a survivable trajectory.');
          }
          break;
        case 'dual':
          this.dual = !this.dual && !!this.kWorld;
          break;
        case 'disk':
          if (this.kWorld && this.kView) {
            this.kWorld.diskOn = !this.kWorld.diskOn;
            this.kView.setDisk(this.kWorld.diskOn);
          }
          break;
        case 'menu':
          this.showMenu(!this.menuPanel.mesh.visible);
          break;
        case 'help':
          document.getElementById('panel')!.classList.toggle('hidden');
          break;
        default:
          if (a.startsWith('dest')) {
            const i = parseInt(a.slice(4));
            if (this.systems[i]) this.loadSystem(this.systems[i]);
          }
      }
    }
  }

  private pointAtTarget() {
    if (this.nWorld) {
      const w = this.nWorld;
      const b = w.bodies[w.targetIndex];
      const d = new THREE.Vector3(b.pos[0] - w.pos[0], b.pos[1] - w.pos[1], b.pos[2] - w.pos[2]).normalize();
      w.q.setFromRotationMatrix(new THREE.Matrix4().lookAt(new THREE.Vector3(), d, new THREE.Vector3(0, 0, 1)));
    } else if (this.kWorld) {
      const p = this.kWorld.ship.pos;
      this.kWorld.ship.q = lookQuatArr([-p[0], -p[1], -p[2]], [0, 0, 1]);
    }
  }

  // ───────────────────────────── frame ─────────────────────────────

  private frame(time: number) {
    const dt = THREE.MathUtils.clamp((time - this.last) / 1000, 0, 0.1);
    this.last = time;
    const r = this.renderer;
    const session = r.xr.getSession();
    this.ui.update();
    this.input.poll(session, this.ui.busyHands);
    const actions = this.input.take();
    if (this.uiOpen) {
      // menus are modal: no flying while one is open
      this.input.thrust = [0, 0, 0];
      this.input.rot = [0, 0, 0];
    }
    this.handle(actions);

    const warp = WARPS[this.warpIdx];
    const ctl = { thrust: this.input.thrust, rot: this.input.rot };
    if (this.kWorld) this.kWorld.update(dt, warp, ctl, this.view === 'external');
    else this.nWorld!.update(dt, warp, ctl);
    this.autoWarp();

    // head orientation for metering
    const presenting = r.xr.isPresenting;
    if (!presenting) this.camera.quaternion.setFromEuler(new THREE.Euler(this.input.look.pitch, this.input.look.yaw, 0, 'YXZ'));
    const headQ = presenting ? r.xr.getCamera().quaternion : this.camera.quaternion;
    const pixelAngle = presenting ? 0.0011 : THREE.MathUtils.degToRad(this.camera.fov) / (window.innerHeight * r.getPixelRatio());

    const exposure = this.exposure.exposure;
    this.exposureU.value = exposure;
    const cs = this.cockpit.shared;
    cs.uExposure.value = exposure;
    if (this.kWorld && this.kView) {
      const ext = this.view === 'external';
      this.kView.renderSky(r, ext, exposure);
      cs.uEnv.value = this.kView.probe.target.texture;
      cs.uEnvMode.value = 1;
      cs.uEnvMip.value = 4;
      cs.uKeyE.value.set(0, 0, 0);
      cs.uFillE.value.set(0, 0, 0);
      if (ext) this.kView.updateExternal(r, exposure);
    } else if (this.nWorld && this.nView) {
      const L = this.nView.update(pixelAngle);
      this.dome.useStatic(this.nView.skyRotBodyToGal, this.nView.betaBody, exposure);
      this.dome.material.uniforms.uExposure = this.exposureU;
      cs.uEnvMode.value = 0;
      cs.uKeyDir.value.copy(L.keyDir);
      cs.uKeyE.value.copy(L.keyE);
      cs.uFillDir.value.copy(L.fillDir);
      cs.uFillE.value.copy(L.fillE);
    }
    const w = (this.kWorld ?? this.nWorld)!;
    // structural deformation of the cockpit
    const D = w.structure.deformationMatrix();
    this.cockpit.setDeformation(new THREE.Matrix4().set(D[0][0], D[0][1], D[0][2], 0, D[1][0], D[1][1], D[1][2], 0, D[2][0], D[2][1], D[2][2], 0, 0, 0, 0, 1));

    // eye adaptation
    this.exposure.meter(r, this.scene, headQ);
    if (this.fastAdapt > 0 || this.exposure.sync) {
      this.fastAdapt -= dt;
      this.exposure.update(this.exposure.sync ? 1 : dt * 6);
    } else this.exposure.update(dt);

    this.updateLabels();
    const tel = this.telemetry(warp);
    this.hud.update(dt, tel, this.systems, this.current.id);
    this.overlayTimer -= dt;
    if (this.overlayTimer <= 0 && !presenting) {
      this.overlayTimer = 0.15;
      let html = overlayText(tel);
      if (this.flash && performance.now() < this.flash.until) html = `<div class="warn">${this.flash.text}</div>` + html;
      this.overlay.innerHTML = html;
    }

    r.render(this.scene, this.camera);
    if (this.dual && !presenting && this.kView) this.renderDual(exposure);
    this.adaptQuality(dt, presenting);
  }

  private renderDual(exposure: number) {
    const r = this.renderer;
    this.kView!.renderOther(r, this.view === 'external', exposure);
    const W = window.innerWidth, H = window.innerHeight;
    const w = Math.round(W * 0.32), h = Math.round(H * 0.32);
    r.setScissorTest(true);
    r.setScissor(W - w - 10, 10, w, h);
    r.setViewport(W - w - 10, 10, w, h);
    const cam = this.camera.clone();
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    const prevAuto = r.autoClear;
    r.autoClear = true;
    r.render(this.dualScene, cam);
    r.autoClear = prevAuto;
    r.setScissorTest(false);
    r.setViewport(0, 0, W, H);
  }

  private adaptQuality(dt: number, presenting: boolean) {
    this.frameAvg = this.frameAvg * 0.95 + dt * 1000 * 0.05;
    const budget = presenting ? 1000 / 72 : 1000 / 45;
    if (this.frameAvg > budget * 1.25) {
      if (++this.slowFrames > 90) {
        const order: (keyof typeof QUALITY)[] = ['ultra', 'high', 'medium', 'low'];
        const i = order.indexOf(this.quality);
        if (i < order.length - 1) {
          this.setQuality(order[i + 1]);
          this.say(`Quality reduced to ${order[i + 1]} to hold frame rate`, 3);
        }
        this.slowFrames = 0;
      }
    } else this.slowFrames = 0;
  }

  private autoWarp() {
    const w = (this.kWorld ?? this.nWorld)!;
    const s = w.structure;
    if (this.kWorld) {
      if (this.kWorld.events.includes('horizon')) {
        this.warpIdx = 0;
        this.say('You crossed the event horizon. Locally, nothing marked the moment — but no signal from here can ever get out.', 9);
      }
      this.kWorld.events = [];
      if (this.kWorld.ship.terminated) this.warpIdx = 0;
    } else if (this.nWorld) {
      if (this.nWorld.env.rho > 1e-6 || this.nWorld.env.hullTemp > 1500) this.warpIdx = Math.min(this.warpIdx, 1);
    }
    if ((s.stress > 0.3 || s.failed) && this.warpIdx > 0 && !w.probeMode) this.warpIdx = 0;
  }

  private telemetry(warp: number): Telemetry {
    const w = (this.kWorld ?? this.nWorld)!;
    const t = w.telemetry() as Telemetry;
    t.system = this.current.name;
    t.view = this.view;
    t.warp = warp;
    t.warpLimited = w.warpLimited;
    if (w.probeMode) t.notices.unshift('UNMANNED PROBE MODE (structural limits ignored)');
    if (this.kView && t.bh && this.view === 'external') t.bh.observer = this.kView.observerTelemetry();
    if (this.kWorld && this.view === 'pilot') t.notices.push('V / A-button: switch to EXTERNAL OBSERVER view');
    return t;
  }

  // ───────────────────────────── desktop panel ─────────────────────────────

  private buildPanel() {
    const dests = document.getElementById('dests')!;
    this.systems.forEach((s, i) => {
      const b = document.createElement('button');
      b.textContent = `${i + 1}. ${s.name}`;
      b.title = s.blurb;
      b.dataset.id = s.id;
      b.onclick = () => this.loadSystem(this.systems[i]);
      dests.appendChild(b);
    });
    const spin = document.getElementById('spin') as HTMLInputElement;
    const mass = document.getElementById('mass') as HTMLInputElement;
    const disk = document.getElementById('disk') as HTMLInputElement;
    const acc = document.getElementById('acc') as HTMLInputElement;
    const tilt = document.getElementById('tilt') as HTMLInputElement;
    const upd = () => {
      document.getElementById('tiltv')!.textContent = `${((parseFloat(tilt.value) * 180) / Math.PI).toFixed(0)}°`;
      document.getElementById('spinv')!.textContent = parseFloat(spin.value).toFixed(3);
      document.getElementById('massv')!.textContent = (10 ** parseFloat(mass.value)).toExponential(2);
      document.getElementById('accv')!.textContent = (10 ** parseFloat(acc.value)).toExponential(0);
    };
    spin.oninput = mass.oninput = acc.oninput = tilt.oninput = upd;
    document.getElementById('applyBh')!.onclick = () => {
      if (this.current.kind !== 'kerr') return;
      const i = this.systems.indexOf(this.current);
      const acc = document.getElementById('acc') as HTMLInputElement;
      const tilt = document.getElementById('tilt') as HTMLInputElement;
      const o = this.current.orientation;
      const def: KerrSystemDef = {
        ...this.current, spin: parseFloat(spin.value), massSolar: 10 ** parseFloat(mass.value), disk: disk.checked,
        eddington: 10 ** parseFloat(acc.value), orientation: [parseFloat(tilt.value), o[1], o[2]],
      };
      this.systems[i] = def;
      this.loadSystem(def);
    };
    const qs = document.getElementById('quality') as HTMLSelectElement;
    qs.value = this.quality;
    qs.onchange = () => this.setQuality(qs.value as keyof typeof QUALITY);
  }

  private syncPanel() {
    document.querySelectorAll<HTMLButtonElement>('#dests button').forEach((b) => b.classList.toggle('cur', b.dataset.id === this.current.id));
    const bh = document.getElementById('bh')!;
    bh.style.display = this.current.kind === 'kerr' ? 'block' : 'none';
    if (this.current.kind === 'kerr') {
      (document.getElementById('spin') as HTMLInputElement).value = String(this.current.spin);
      (document.getElementById('mass') as HTMLInputElement).value = String(Math.log10(this.current.massSolar));
      (document.getElementById('disk') as HTMLInputElement).checked = this.current.disk;
      (document.getElementById('acc') as HTMLInputElement).value = String(Math.log10(this.current.eddington));
      (document.getElementById('tilt') as HTMLInputElement).value = String(this.current.orientation[0]);
      (document.getElementById('spin') as HTMLInputElement).dispatchEvent(new Event('input'));
    }
  }
}

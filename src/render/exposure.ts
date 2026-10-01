/**
 * Physically motivated auto-exposure ("eye adaptation").
 *
 * Two tiny HDR metering renders of the actual scene are read back
 * asynchronously each cycle:
 *  - a wide (80°) centre-weighted view: log-average luminance plus a
 *    highlight term (98th percentile) so a bright region that fills more than
 *    ~1% of the view keeps its structure instead of clipping;
 *  - a narrow (3°) "foveal" view: whatever you fixate (head direction ≈ gaze
 *    in VR) drives adaptation, as with the human eye.
 * Adaptation is faster toward bright scenes than toward dark ones. A
 * luminance floor keeps empty space black instead of amplifying it to grey.
 * All values are in cd/m² (the scene is rendered in absolute photometric
 * units multiplied by the exposure in use).
 */
import * as THREE from 'three';

interface Meter {
  target: THREE.WebGLRenderTarget;
  camera: THREE.PerspectiveCamera;
  size: number;
  buf: Uint16Array;
  pending: boolean;
  value: number;
  reads: number;
  lastUsed: number;
}

export class AutoExposure {
  exposure = 1;
  measuredL = 0;
  key = 0.2;
  floorL = 1.5e-3;
  bias = 1;
  minExposure = 1e-14;
  maxExposure = 1e5;
  locked = false;
  /** Synchronous readback (testing / headless): deterministic but stalls the GPU. */
  sync = false;
  private frame = 0;
  private wide: Meter;
  private fovea: Meter;

  constructor() {
    this.wide = this.makeMeter(48, 80);
    this.fovea = this.makeMeter(16, 3);
  }

  private makeMeter(size: number, fov: number): Meter {
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.05, 5e4);
    camera.layers.set(3); // celestial layer + lit cockpit; not the instrument displays
    return {
      target: new THREE.WebGLRenderTarget(size, size, { type: THREE.HalfFloatType, depthBuffer: true }),
      camera,
      size,
      buf: new Uint16Array(size * size * 4),
      pending: false,
      value: 0,
      reads: 0,
      lastUsed: 0,
    };
  }

  meter(renderer: THREE.WebGLRenderer, scene: THREE.Scene, viewQuat: THREE.Quaternion) {
    this.frame++;
    if (this.frame % 3 !== 0 && !this.sync) return;
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    renderer.xr.enabled = false;
    for (const m of [this.wide, this.fovea]) {
      if (m.pending) continue;
      m.camera.quaternion.copy(viewQuat);
      m.camera.position.set(0, 0, 0);
      m.camera.updateMatrixWorld();
      renderer.setRenderTarget(m.target);
      renderer.clear();
      renderer.render(scene, m.camera);
      const used = this.exposure;
      if (this.sync) {
        renderer.readRenderTargetPixels(m.target, 0, 0, m.size, m.size, m.buf);
        m.reads++;
        m.lastUsed = used;
        m.value = m === this.wide ? this.analyseWide(m, used) : this.analyseFovea(m, used);
        this.combine();
        continue;
      }
      m.pending = true;
      renderer
        .readRenderTargetPixelsAsync(m.target, 0, 0, m.size, m.size, m.buf)
        .then(() => {
          m.pending = false;
          m.reads++;
          m.lastUsed = used;
          m.value = m === this.wide ? this.analyseWide(m, used) : this.analyseFovea(m, used);
          this.combine();
        })
        .catch(() => (m.pending = false));
    }
    renderer.setRenderTarget(prevTarget);
    renderer.xr.enabled = prevXr;
  }

  private lum(m: Meter, i: number, used: number) {
    const r = THREE.DataUtils.fromHalfFloat(m.buf[i]);
    const g = THREE.DataUtils.fromHalfFloat(m.buf[i + 1]);
    const b = THREE.DataUtils.fromHalfFloat(m.buf[i + 2]);
    let L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (!Number.isFinite(L)) L = 65504;
    return Math.max(L, 0) / used;
  }

  private analyseWide(m: Meter, used: number) {
    const n = m.size;
    let sumW = 0, sumLog = 0;
    const all: number[] = [];
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const L = this.lum(m, (y * n + x) * 4, used);
        const dx = (x + 0.5) / n - 0.5, dy = (y + 0.5) / n - 0.5;
        const w = Math.exp(-(dx * dx + dy * dy) / 0.08);
        sumW += w;
        sumLog += w * Math.log(L + this.floorL * 0.05);
        all.push(L);
      }
    all.sort((a, b) => a - b);
    const p98 = all[Math.floor(all.length * 0.98)];
    return Math.max(Math.exp(sumLog / sumW), p98 / 10);
  }

  private analyseFovea(m: Meter, used: number) {
    let s = 0;
    const n = m.size * m.size;
    for (let i = 0; i < n; i++) s += this.lum(m, i * 4, used);
    return s / n / 5;
  }

  private combine() {
    const v = Math.max(this.wide.value, this.fovea.value);
    if (Number.isFinite(v) && v > 0) this.measuredL = v;
  }

  update(dt: number) {
    if (this.locked || this.measuredL <= 0) return;
    const L = Math.max(this.measuredL, this.floorL);
    const goal = THREE.MathUtils.clamp((this.key * this.bias) / L, this.minExposure, this.maxExposure);
    if (!Number.isFinite(this.exposure) || this.exposure <= 0) this.exposure = goal;
    // brighter scene → adapt fast (~0.4 s); darker → slow (~3 s)
    const tau = goal < this.exposure ? 0.4 : 3.0;
    const k = 1 - Math.exp(-dt / tau);
    this.exposure = Math.exp(Math.log(this.exposure) + (Math.log(goal) - Math.log(this.exposure)) * k);
  }

  snapTo(L: number) {
    this.measuredL = L;
    this.exposure = THREE.MathUtils.clamp(this.key / Math.max(L, this.floorL), this.minExposure, this.maxExposure);
  }
}

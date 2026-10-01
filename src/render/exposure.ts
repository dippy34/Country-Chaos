/**
 * Physically motivated auto-exposure ("eye adaptation").
 *
 * A small HDR metering render of the actual scene (sky, bodies, glare) is read
 * back asynchronously; the centre-weighted log-average luminance (cd/m²)
 * drives exposure toward a mid-grey key, with faster adaptation to light than
 * to dark, as in human vision. A luminance floor keeps empty space black
 * instead of amplifying it to grey.
 */
import * as THREE from 'three';

export class AutoExposure {
  exposure = 1;
  /** Exposure that was used for the frame currently being metered. */
  private meteredWith = 1;
  private target: THREE.WebGLRenderTarget;
  private camera = new THREE.PerspectiveCamera(80, 1, 0.05, 5e4);
  private pending = false;
  private buf: Uint16Array;
  private frame = 0;
  measuredL = 0;
  key = 0.16;
  floorL = 1.5e-3;
  bias = 1;
  minExposure = 1e-14;
  maxExposure = 1e5;
  locked = false;

  constructor(private size = 48) {
    this.target = new THREE.WebGLRenderTarget(size, size, { type: THREE.HalfFloatType, depthBuffer: false });
    this.buf = new Uint16Array(size * size * 4);
  }

  /** Render the metering view if due. viewQuat: head orientation in scene frame. */
  meter(renderer: THREE.WebGLRenderer, scene: THREE.Scene, viewQuat: THREE.Quaternion) {
    this.frame++;
    if (this.pending || this.frame % 3 !== 0) return;
    const prevTarget = renderer.getRenderTarget();
    const prevXr = renderer.xr.enabled;
    const prevTM = renderer.toneMapping;
    renderer.xr.enabled = false;
    renderer.toneMapping = THREE.NoToneMapping;
    this.camera.quaternion.copy(viewQuat);
    this.camera.position.set(0, 0, 0);
    this.camera.updateMatrixWorld();
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(scene, this.camera);
    renderer.setRenderTarget(prevTarget);
    renderer.toneMapping = prevTM;
    renderer.xr.enabled = prevXr;
    this.meteredWith = this.exposure;
    this.pending = true;
    const used = this.meteredWith;
    renderer
      .readRenderTargetPixelsAsync(this.target, 0, 0, this.size, this.size, this.buf)
      .then(() => {
        this.pending = false;
        this.consume(used);
      })
      .catch(() => {
        this.pending = false;
      });
  }

  private consume(used: number) {
    const n = this.size;
    let sumW = 0, sumLog = 0;
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const i = (y * n + x) * 4;
        const r = THREE.DataUtils.fromHalfFloat(this.buf[i]);
        const g = THREE.DataUtils.fromHalfFloat(this.buf[i + 1]);
        const b = THREE.DataUtils.fromHalfFloat(this.buf[i + 2]);
        const L = Math.max(0.2126 * r + 0.7152 * g + 0.0722 * b, 0) / used;
        const dx = (x + 0.5) / n - 0.5, dy = (y + 0.5) / n - 0.5;
        const w = Math.exp(-(dx * dx + dy * dy) / 0.08);
        sumW += w;
        sumLog += w * Math.log(L + this.floorL * 0.05);
      }
    this.measuredL = Math.exp(sumLog / sumW);
  }

  update(dt: number) {
    if (this.locked || this.measuredL <= 0) return;
    const L = Math.max(this.measuredL, this.floorL);
    const goal = THREE.MathUtils.clamp((this.key * this.bias) / L, this.minExposure, this.maxExposure);
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

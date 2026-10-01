/** Floating name tags for objects in the sky ("what am I looking at?"). */
import * as THREE from 'three';

const FONT = 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif';

class Label {
  readonly sprite: THREE.Sprite;
  private canvas = document.createElement('canvas');
  private ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private key = '';
  private last = 0;

  constructor() {
    this.canvas.width = 768;
    this.canvas.height = 160;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.SpriteMaterial({ map: this.texture, depthTest: false, depthWrite: false, toneMapped: false, transparent: true });
    this.sprite = new THREE.Sprite(mat);
    this.sprite.renderOrder = 40;
    this.sprite.center.set(0, 0.5);
  }

  set(title: string, detail: string, color: string) {
    const key = `${title}|${detail}|${color}`;
    if (key === this.key) return;
    // distances change every frame: repaint the texture at most 4×/s
    const now = performance.now();
    if (this.key && now - this.last < 250 && this.key.startsWith(`${title}|`)) return;
    this.last = now;
    this.key = key;
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // leader tick + text, readable on any background
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(4, 80);
    ctx.lineTo(56, 80);
    ctx.stroke();
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 10;
    ctx.font = `700 54px ${FONT}`;
    ctx.fillStyle = color;
    ctx.fillText(title, 70, 70);
    ctx.font = `400 36px ${FONT}`;
    ctx.fillStyle = '#d8e6f2';
    ctx.fillText(detail, 70, 122);
    ctx.shadowBlur = 0;
    this.texture.needsUpdate = true;
  }
}

/** Places labels at directions (in the scene/body frame) with constant angular size. */
export class LabelLayer {
  readonly group = new THREE.Group();
  private labels = new Map<string, Label>();
  private used = new Set<string>();
  /** Angular height of a label (rad). */
  angularSize = 0.05;
  enabled = true;

  begin() {
    this.used.clear();
  }

  put(id: string, dir: THREE.Vector3, title: string, detail: string, color = '#7fe0ff', offsetRad = 0) {
    if (!this.enabled) return;
    let l = this.labels.get(id);
    if (!l) {
      l = new Label();
      this.labels.set(id, l);
      this.group.add(l.sprite);
    }
    this.used.add(id);
    l.set(title, detail, color);
    const D = 40;
    const d = dir.clone().normalize();
    if (offsetRad > 0) {
      // nudge to the right of the object so the tag does not cover it
      const right = new THREE.Vector3().crossVectors(d, new THREE.Vector3(0, 1, 0));
      if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
      d.addScaledVector(right.normalize(), Math.tan(Math.min(offsetRad, 0.6))).normalize();
    }
    l.sprite.position.copy(d).multiplyScalar(D);
    const h = D * Math.tan(this.angularSize);
    l.sprite.scale.set(h * 4.8, h, 1);
    l.sprite.visible = true;
  }

  end() {
    for (const [id, l] of this.labels) if (!this.used.has(id)) l.sprite.visible = false;
  }
}

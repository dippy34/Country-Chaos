/** A canvas-backed instrument panel rendered as a mesh in the cockpit. */
import * as THREE from 'three';

export class Panel {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly texture: THREE.CanvasTexture;
  readonly mesh: THREE.Mesh;
  failed = false;
  flicker = 0;

  constructor(public w: number, public h: number, widthM: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
    const mat = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, toneMapped: false, depthWrite: false });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthM, (widthM * h) / w), mat);
    this.mesh.renderOrder = 10;
  }

  begin(title: string, accent = '#5fd7ff') {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(6, 12, 18, 0.82)';
    roundRect(ctx, 4, 4, w - 8, h - 8, 18);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.font = 'bold 30px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(title, 24, 46);
    ctx.fillRect(24, 58, w - 48, 2);
    return 98;
  }

  line(y: number, label: string, value: string, color = '#e8f4ff', size = 26) {
    const { ctx, w } = this;
    ctx.font = `${size}px ui-monospace, Menlo, Consolas, monospace`;
    ctx.fillStyle = '#8fa9bf';
    ctx.fillText(label, 24, y);
    ctx.fillStyle = color;
    const tw = ctx.measureText(value).width;
    ctx.fillText(value, w - 24 - tw, y);
    return y + size + 10;
  }

  text(y: number, s: string, color = '#e8f4ff', size = 24) {
    const { ctx, w } = this;
    ctx.font = `${size}px ui-monospace, Menlo, Consolas, monospace`;
    ctx.fillStyle = color;
    const words = s.split(' ');
    let line = '';
    for (const word of words) {
      const t = line ? line + ' ' + word : word;
      if (ctx.measureText(t).width > w - 48) {
        ctx.fillText(line, 24, y);
        y += size + 6;
        line = word;
      } else line = t;
    }
    if (line) {
      ctx.fillText(line, 24, y);
      y += size + 6;
    }
    return y;
  }

  bar(y: number, label: string, frac: number, color: string) {
    const { ctx, w } = this;
    ctx.font = '22px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillStyle = '#8fa9bf';
    ctx.fillText(label, 24, y);
    const x0 = 250, x1 = w - 24;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(x0, y - 18, x1 - x0, 20);
    ctx.fillStyle = color;
    ctx.fillRect(x0, y - 18, (x1 - x0) * Math.max(0, Math.min(1, frac)), 20);
    return y + 34;
  }

  end() {
    if (this.failed) {
      const { ctx, w, h } = this;
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ff5050';
      ctx.font = 'bold 36px ui-monospace, monospace';
      ctx.fillText('INSTRUMENT FAILURE', 40, h / 2);
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
        ctx.fillRect(0, Math.random() * h, w, 2);
      }
    }
    this.texture.needsUpdate = true;
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

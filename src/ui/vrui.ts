/**
 * Point-and-click UI for VR (and mouse on desktop): canvas panels with
 * buttons, a laser ray from each controller, hover highlight, trigger to click.
 */
import * as THREE from 'three';

export interface UIButton {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const FONT = 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif';
export const UI_COLORS = {
  bg: 'rgba(8, 14, 22, 0.94)',
  card: 'rgba(22, 36, 52, 0.95)',
  cardHover: 'rgba(40, 74, 104, 0.98)',
  cardActive: 'rgba(28, 82, 64, 0.98)',
  line: '#2c5576',
  text: '#eaf3fb',
  dim: '#9db4c8',
  accent: '#6fd6ff',
  warm: '#ffc66b',
  good: '#7dffb0',
};

export class UIPanel {
  readonly canvas = document.createElement('canvas');
  readonly ctx: CanvasRenderingContext2D;
  readonly texture: THREE.CanvasTexture;
  readonly mesh: THREE.Mesh;
  buttons: UIButton[] = [];
  hover: string | null = null;
  private lastHover: string | null = null;
  dirty = true;

  constructor(
    public w: number,
    public h: number,
    widthM: number,
    private paint: (p: UIPanel) => void,
  ) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 8;
    const mat = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, toneMapped: false, depthWrite: false, depthTest: false });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthM, (widthM * h) / w), mat);
    this.mesh.renderOrder = 50;
    this.mesh.userData.panel = this;
  }

  /** Repaint if something changed. */
  refresh(force = false) {
    if (!force && !this.dirty && this.hover === this.lastHover) return;
    this.lastHover = this.hover;
    this.dirty = false;
    this.buttons = [];
    this.paint(this);
    this.texture.needsUpdate = true;
  }

  hit(uv: THREE.Vector2): UIButton | null {
    const x = uv.x * this.w, y = (1 - uv.y) * this.h;
    return this.buttons.find((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) ?? null;
  }

  // ── drawing helpers ──
  background(title?: string) {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = UI_COLORS.bg;
    roundRect(ctx, 6, 6, w - 12, h - 12, 28);
    ctx.fill();
    ctx.strokeStyle = UI_COLORS.line;
    ctx.lineWidth = 4;
    ctx.stroke();
    if (title) {
      ctx.fillStyle = UI_COLORS.accent;
      ctx.font = `700 52px ${FONT}`;
      ctx.fillText(title, 48, 86);
    }
  }

  text(s: string, x: number, y: number, size: number, color: string = UI_COLORS.text, weight = 400, maxW?: number) {
    const { ctx } = this;
    ctx.font = `${weight} ${size}px ${FONT}`;
    ctx.fillStyle = color;
    if (!maxW) {
      ctx.fillText(s, x, y);
      return y + size * 1.25;
    }
    const words = s.split(' ');
    let line = '';
    for (const word of words) {
      const t = line ? `${line} ${word}` : word;
      if (ctx.measureText(t).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += size * 1.25;
        line = word;
      } else line = t;
    }
    if (line) ctx.fillText(line, x, y);
    return y + size * 1.25;
  }

  /** A clickable card/button. Returns its rect. */
  button(id: string, x: number, y: number, w: number, h: number, label: string, opts: { sub?: string; active?: boolean; size?: number; color?: string } = {}) {
    const { ctx } = this;
    const hov = this.hover === id;
    ctx.fillStyle = hov ? UI_COLORS.cardHover : opts.active ? UI_COLORS.cardActive : UI_COLORS.card;
    roundRect(ctx, x, y, w, h, 18);
    ctx.fill();
    ctx.lineWidth = hov ? 5 : 2;
    ctx.strokeStyle = hov ? UI_COLORS.accent : opts.active ? UI_COLORS.good : UI_COLORS.line;
    ctx.stroke();
    const size = opts.size ?? 34;
    if (opts.sub) {
      this.text(label, x + 24, y + 22 + size, size, opts.color ?? UI_COLORS.text, 700, w - 48);
      this.text(opts.sub, x + 24, y + 30 + size * 2.2, Math.round(size * 0.68), UI_COLORS.dim, 400, w - 48);
    } else {
      ctx.font = `700 ${size}px ${FONT}`;
      ctx.fillStyle = opts.color ?? UI_COLORS.text;
      const tw = ctx.measureText(label).width;
      ctx.fillText(label, x + (w - tw) / 2, y + h / 2 + size * 0.36);
    }
    this.buttons.push({ id, x, y, w, h });
  }
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

interface Pointer {
  ray: THREE.Line;
  dot: THREE.Mesh;
  target: THREE.Object3D;
  hand: 'left' | 'right' | 'none';
  hovering: UIPanel | null;
}

/** Laser pointers + click dispatch for a set of UIPanels. */
export class VRUI {
  panels: UIPanel[] = [];
  private pointers: Pointer[] = [];
  private raycaster = new THREE.Raycaster();
  onClick: (panel: UIPanel, id: string) => void = () => {};
  /** Hands currently aiming at a visible panel (their trigger clicks instead of firing the engine). */
  readonly busyHands = new Set<'left' | 'right'>();

  constructor(private renderer: THREE.WebGLRenderer, parent: THREE.Object3D, private camera: THREE.Camera, dom: HTMLElement) {
    for (let i = 0; i < 2; i++) {
      const target = renderer.xr.getController(i);
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
      const ray = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x6fd6ff, transparent: true, opacity: 0.85, toneMapped: false, depthTest: false }));
      ray.renderOrder = 60;
      ray.scale.z = 0.6;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.006, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, depthTest: false }));
      dot.renderOrder = 61;
      dot.visible = false;
      target.add(ray);
      parent.add(target);
      parent.add(dot);
      const p: Pointer = { ray, dot, target, hand: 'none', hovering: null };
      target.addEventListener('connected', (e) => {
        p.hand = ((e as unknown as { data: XRInputSource }).data.handedness as 'left' | 'right') ?? 'none';
      });
      target.addEventListener('disconnected', () => (p.hand = 'none'));
      target.addEventListener('selectstart', () => this.click(p));
      this.pointers.push(p);
    }
    // desktop: click on a panel with the mouse (a drag still looks around)
    let down: { x: number; y: number } | null = null;
    dom.addEventListener('pointerdown', (e) => (down = { x: e.clientX, y: e.clientY }));
    dom.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      const rect = dom.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      this.raycaster.setFromCamera(ndc, this.camera);
      const hit = this.cast();
      if (hit) {
        const b = hit.panel.hit(hit.uv);
        if (b) this.onClick(hit.panel, b.id);
      }
    });
    dom.addEventListener('pointermove', (e) => {
      if (this.renderer.xr.isPresenting) return;
      const rect = dom.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      this.raycaster.setFromCamera(ndc, this.camera);
      const hit = this.cast();
      for (const pnl of this.panels) pnl.hover = hit && hit.panel === pnl ? hit.panel.hit(hit.uv)?.id ?? null : null;
      dom.style.cursor = hit && hit.panel.hit(hit.uv) ? 'pointer' : '';
    });
  }

  private cast(): { panel: UIPanel; uv: THREE.Vector2; point: THREE.Vector3; distance: number } | null {
    const meshes = this.panels.filter((p) => isVisible(p.mesh)).map((p) => p.mesh);
    const hits = this.raycaster.intersectObjects(meshes, false);
    const h = hits[0];
    if (!h || !h.uv) return null;
    return { panel: h.object.userData.panel as UIPanel, uv: h.uv, point: h.point, distance: h.distance };
  }

  private click(p: Pointer) {
    if (!p.hovering) return;
    const id = p.hovering.hover;
    if (id) this.onClick(p.hovering, id);
  }

  /** Raycast from each controller; call once per frame while presenting. */
  update() {
    this.busyHands.clear();
    const presenting = this.renderer.xr.isPresenting;
    const anyPanel = this.panels.some((p) => isVisible(p.mesh));
    if (presenting) for (const pnl of this.panels) pnl.hover = null;
    for (const p of this.pointers) {
      p.ray.visible = presenting && p.hand !== 'none';
      p.dot.visible = false;
      p.hovering = null;
      if (!presenting || p.hand === 'none') continue;
      const m = p.target.matrixWorld;
      const origin = new THREE.Vector3().setFromMatrixPosition(m);
      const dir = new THREE.Vector3(0, 0, -1).applyMatrix4(new THREE.Matrix4().extractRotation(m)).normalize();
      this.raycaster.set(origin, dir);
      const hit = anyPanel ? this.cast() : null;
      if (hit) {
        p.ray.scale.z = hit.distance;
        p.dot.visible = true;
        p.dot.position.copy(hit.point);
        p.hovering = hit.panel;
        const b = hit.panel.hit(hit.uv);
        if (b) hit.panel.hover = b.id;
        if (p.hand === 'left' || p.hand === 'right') this.busyHands.add(p.hand);
        (p.ray.material as THREE.LineBasicMaterial).opacity = 0.95;
      } else {
        p.ray.scale.z = 0.35;
        (p.ray.material as THREE.LineBasicMaterial).opacity = 0.35;
      }
    }
    for (const pnl of this.panels) if (isVisible(pnl.mesh)) pnl.refresh();
  }
}

function isVisible(o: THREE.Object3D): boolean {
  let n: THREE.Object3D | null = o;
  while (n) {
    if (!n.visible) return false;
    n = n.parent;
  }
  return true;
}

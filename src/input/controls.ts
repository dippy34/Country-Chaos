/**
 * Input: keyboard + mouse on desktop, xr-standard gamepads in VR.
 * Produces continuous axes (thrust, rotation) and discrete one-shot actions.
 */
import * as THREE from 'three';

export type Action =
  | 'toggleView' | 'warpUp' | 'warpDown' | 'toggleAssist' | 'menu' | 'thrustUp' | 'thrustDown'
  | 'pointTarget' | 'nextTarget' | 'reset' | 'probe' | 'dual' | 'disk' | 'menuUp' | 'menuDown' | 'menuSelect'
  | 'help' | `dest${number}`;

export class Input {
  thrust: [number, number, number] = [0, 0, 0];
  rot: [number, number, number] = [0, 0, 0];
  actions = new Set<Action>();
  /** Desktop head look (yaw, pitch), radians. */
  look = { yaw: 0, pitch: 0 };
  private keys = new Set<string>();
  private prevButtons = new Map<string, boolean>();
  private dragging = false;

  constructor(dom: HTMLElement) {
    window.addEventListener('keydown', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (!this.keys.has(e.code)) this.onKey(e.code);
      this.keys.add(e.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    dom.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      dom.setPointerCapture(e.pointerId);
    });
    dom.addEventListener('pointerup', () => (this.dragging = false));
    dom.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      this.look.yaw -= e.movementX * 0.003;
      this.look.pitch = THREE.MathUtils.clamp(this.look.pitch - e.movementY * 0.003, -1.4, 1.4);
    });
  }

  private onKey(code: string) {
    const map: Record<string, Action> = {
      KeyV: 'toggleView', Period: 'warpUp', Comma: 'warpDown', KeyH: 'toggleAssist', KeyM: 'menu',
      BracketRight: 'thrustUp', BracketLeft: 'thrustDown', KeyG: 'pointTarget', KeyT: 'nextTarget',
      Backspace: 'reset', KeyP: 'probe', KeyB: 'dual', KeyK: 'disk', F1: 'help', Slash: 'help',
    };
    if (map[code]) this.actions.add(map[code]);
    const m = code.match(/^Digit([1-9])$/);
    if (m) this.actions.add(`dest${parseInt(m[1]) - 1}`);
  }

  private k(code: string) {
    return this.keys.has(code) ? 1 : 0;
  }

  /** Poll devices; call once per frame. */
  poll(session: XRSession | null, uiHands: Set<'left' | 'right'> = new Set()) {
    const k = (c: string) => this.k(c);
    this.thrust = [k('KeyD') - k('KeyA'), k('KeyR') + k('Space') - k('KeyF') - k('ControlLeft'), k('KeyS') - k('KeyW')];
    this.rot = [k('ArrowUp') - k('ArrowDown'), k('ArrowLeft') - k('ArrowRight'), k('KeyQ') - k('KeyE')];
    if (!session) return;
    for (const src of session.inputSources) {
      const gp = src.gamepad;
      if (!gp) continue;
      const hand = src.handedness;
      const ax = (i: number) => (Math.abs(gp.axes[i] ?? 0) > 0.12 ? gp.axes[i] : 0);
      const pressed = (i: number) => !!gp.buttons[i]?.pressed;
      const val = (i: number) => gp.buttons[i]?.value ?? 0;
      const edge = (i: number, a: Action) => {
        const key = `${hand}${i}`;
        const now = pressed(i);
        if (now && !this.prevButtons.get(key)) this.actions.add(a);
        this.prevButtons.set(key, now);
      };
      if (hand === 'left') {
        this.thrust[0] += ax(2);
        this.thrust[2] += ax(3);
        if (!uiHands.has('left')) this.thrust[2] += val(0); // trigger: retro thrust (toward +Z body)
        if (pressed(1)) this.rot[2] += 1; // grip: roll left
        edge(3, 'toggleAssist');
        edge(4, 'warpDown');
        edge(5, 'menu');
      } else if (hand === 'right') {
        this.rot[1] -= ax(2);
        this.rot[0] -= ax(3);
        if (!uiHands.has('right')) this.thrust[2] -= val(0); // trigger: main engine (forward)
        if (pressed(1)) this.rot[2] -= 1; // grip: roll right
        edge(3, 'pointTarget');
        edge(4, 'toggleView');
        edge(5, 'warpUp');
      }
    }
    this.thrust = this.thrust.map((v) => THREE.MathUtils.clamp(v, -1, 1)) as [number, number, number];
    this.rot = this.rot.map((v) => THREE.MathUtils.clamp(v, -1, 1)) as [number, number, number];
  }

  take(): Set<Action> {
    const a = this.actions;
    this.actions = new Set();
    return a;
  }
}

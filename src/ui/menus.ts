/** The welcome screen, the main menu and the dashboard menu button. */
import { SystemDef } from '../world/systems';
import { UIPanel, UI_COLORS } from './vrui';

export interface MenuState {
  systems: SystemDef[];
  current: string;
  view: 'pilot' | 'external';
  isBlackHole: boolean;
  diskOn: boolean;
  assist: boolean;
  probe: boolean;
  warp: number;
  thrustG: number;
  quality: string;
}

const SHORT: Record<string, string> = {
  jupiter: 'True-scale gas giant and its four big moons',
  sun: 'Skim the photosphere — watch your hull heat',
  betelgeuse: 'A star wider than the asteroid belt',
  stellar: 'Small hole, brutal tides: spaghettification',
  sgra: 'Our galaxy’s black hole — cross the horizon intact',
  m87: 'A horizon wider than Pluto’s orbit',
  ton618: 'Ultramassive: hovering near it takes ~1 g',
};

const fmtWarp = (w: number) => (w >= 1000 ? `×10^${Math.round(Math.log10(w))}` : `×${w}`);

export function makeMenuPanel(get: () => MenuState): UIPanel {
  return new UIPanel(1600, 1240, 1.05, (p) => {
    const s = get();
    p.background('Where to?');
    p.text('Pick a destination, or change how you fly. Point and pull the trigger.', 48, 136, 30, UI_COLORS.dim);
    const colW = 740, cardH = 116, gap = 14, x0 = 48, y0 = 170;
    s.systems.forEach((sys, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const here = sys.id === s.current;
      p.button(`dest:${i}`, x0 + col * (colW + gap + 12), y0 + row * (cardH + gap), colW, cardH, `${i + 1}. ${sys.name.replace(/ \(.*\)$/, '')}${here ? '  ✓ here' : ''}`, {
        sub: SHORT[sys.id] ?? sys.blurb,
        active: here,
        size: 34,
      });
    });
    let y = y0 + 4 * (cardH + gap) + 26;
    p.text('Flight', 48, y + 6, 30, UI_COLORS.warm, 700);
    y += 26;
    const bw = 360, bh = 92, bx = (k: number) => 48 + k * (bw + 20);
    p.button('view', bx(0), y, bw, bh, s.view === 'external' ? 'External observer' : 'Pilot view', { active: s.view === 'external', size: 30 });
    p.button('assist', bx(1), y, bw, bh, s.assist ? 'Station-keep: ON' : 'Station-keep: off', { active: s.assist, size: 30 });
    p.button('point', bx(2), y, bw, bh, 'Point at target', { size: 30 });
    p.button('reset', bx(3), y, bw, bh, 'Restart here', { size: 30 });
    y += bh + 18;
    p.button('warp-', bx(0), y, 170, bh, 'Time −', { size: 30 });
    p.button('warpv', bx(0) + 190, y, 170, bh, fmtWarp(s.warp), { size: 30, color: UI_COLORS.warm });
    p.button('warp+', bx(1), y, 170, bh, 'Time +', { size: 30 });
    p.button('thr-', bx(1) + 190, y, 170, bh, 'Engine −', { size: 28 });
    p.button('thrv', bx(2), y, 170, bh, `${s.thrustG} g`, { size: 30, color: UI_COLORS.warm });
    p.button('thr+', bx(2) + 190, y, 170, bh, 'Engine +', { size: 28 });
    p.button('quality', bx(3), y, bw, bh, `Quality: ${s.quality}`, { size: 30 });
    y += bh + 18;
    if (s.isBlackHole) {
      p.button('disk', bx(0), y, bw, bh, s.diskOn ? 'Accretion disk: ON' : 'Accretion disk: off', { active: s.diskOn, size: 30 });
      p.button('probe', bx(1), y, bw, bh, s.probe ? 'Unmanned probe: ON' : 'Unmanned probe: off', { active: s.probe, size: 30 });
    }
    p.button('help', bx(2), y, bw, bh, 'How to fly', { size: 30 });
    p.button('close', bx(3), y, bw, bh, 'Close menu', { size: 30, color: UI_COLORS.accent });
  });
}

export function makeWelcomePanel(): UIPanel {
  return new UIPanel(1600, 1060, 1.0, (p) => {
    p.background();
    p.text('LIGHTCONE', 56, 104, 72, UI_COLORS.accent, 800);
    p.text('You are in a ship that obeys real physics. Planets and stars are true size; black holes bend light and time exactly as general relativity says.', 56, 168, 32, UI_COLORS.text, 400, 1490);
    let y = 290;
    p.text('How to fly', 56, y, 36, UI_COLORS.warm, 700);
    y += 54;
    const left = [
      ['Left stick', 'slide / move forward-back'],
      ['Left trigger', 'reverse thrust'],
      ['Left grip', 'roll left'],
      ['X', 'slow time down'],
      ['Y', 'open the menu'],
      ['Stick click', 'station-keep'],
    ];
    const right = [
      ['Right trigger', 'main engine'],
      ['Right stick', 'turn the ship'],
      ['Right grip', 'roll right'],
      ['B', 'speed time up'],
      ['A', 'pilot ⇄ external observer'],
      ['Stick click', 'point at target'],
    ];
    const row = (items: string[][], x: number) => {
      let yy = y;
      for (const [k, v] of items) {
        p.text(k, x, yy, 30, UI_COLORS.accent, 700);
        p.text(v, x + 250, yy, 30, UI_COLORS.text);
        yy += 46;
      }
    };
    p.text('LEFT CONTROLLER', 56, y, 24, UI_COLORS.dim, 700);
    p.text('RIGHT CONTROLLER', 820, y, 24, UI_COLORS.dim, 700);
    y += 46;
    row(left, 56);
    row(right, 820);
    y += 6 * 46 + 20;
    p.text('Distances are real, so things take real time: use time warp (B) to cross them. Point at any menu with either controller and pull the trigger.', 56, y, 28, UI_COLORS.dim, 400, 1490);
    p.button('start', 56, 900, 700, 110, 'Start flying', { size: 40, color: UI_COLORS.good });
    p.button('menu', 844, 900, 700, 110, 'Choose a destination', { size: 40, color: UI_COLORS.accent });
  });
}

export function makeMenuButton(): UIPanel {
  return new UIPanel(420, 140, 0.2, (p) => {
    p.ctx.clearRect(0, 0, p.w, p.h);
    p.button('open', 6, 6, 408, 128, '☰  MENU', { size: 48, color: UI_COLORS.accent });
  });
}

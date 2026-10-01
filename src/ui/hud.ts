/** Cockpit instrument panels + desktop overlay text, both driven by Telemetry. */
import * as THREE from 'three';
import { Panel } from './panel';
import { Telemetry, fmtDist, fmtSci, fmtSpeed, fmtTime } from '../world/telemetry';
import { G0 } from '../physics/constants';
import { SystemDef } from '../world/systems';

const GOOD = '#7dffb0', WARN = '#ffcf5f', BAD = '#ff6b6b', CYAN = '#5fd7ff', MAG = '#ff8cf0';

export class Hud {
  nav = new Panel(768, 512, 0.42);
  rel = new Panel(768, 512, 0.42);
  str = new Panel(768, 512, 0.42);
  status = new Panel(1280, 160, 0.78);
  legend = new Panel(768, 900, 0.36);
  menu = new Panel(768, 900, 0.36);
  menuOpen = false;
  menuIndex = 0;
  private timer = 0;
  private next = 0;

  attach(anchors: Record<string, THREE.Object3D>) {
    anchors.left.add(this.nav.mesh);
    anchors.center.add(this.rel.mesh);
    anchors.right.add(this.str.mesh);
    anchors.status.add(this.status.mesh);
    anchors.legend.add(this.legend.mesh);
    anchors.menu.add(this.menu.mesh);
  }

  update(dt: number, tel: Telemetry, systems: SystemDef[], current: string) {
    // round-robin: one canvas re-upload per tick keeps texture bandwidth low on standalone headsets
    this.timer -= dt;
    if (this.timer > 0) return;
    this.timer = 0.04;
    const down = new Set(tel.structure.instrumentsDown);
    this.nav.failed = down.has('navigation');
    this.rel.failed = down.has('relativity');
    this.str.failed = down.has('structure');
    this.status.failed = down.has('status');
    this.legend.failed = down.has('legend');
    const draws = [
      () => this.drawNav(tel),
      () => this.drawRel(tel),
      () => this.drawStr(tel),
      () => this.drawStatus(tel),
      () => this.drawStatus(tel),
      () => this.drawLegend(tel),
      () => this.drawMenu(systems, current),
    ];
    if (this.next === 0 || this.menuOpen) this.drawMenu(systems, current);
    draws[this.next % draws.length]();
    this.next++;
  }

  private drawNav(t: Telemetry) {
    const p = this.nav;
    let y = p.begin('NAVIGATION');
    if (t.target) {
      y = p.line(y, 'Target', t.target.name, CYAN);
      y = p.line(y, 'Distance (centre)', fmtDist(t.target.distance));
      y = p.line(y, t.mode === 'kerr' ? 'Above horizon' : 'Altitude', fmtDist(t.target.altitude), t.target.altitude < 0 ? BAD : '#e8f4ff');
      y = p.line(y, t.mode === 'kerr' ? 'Shadow size (approx.)' : 'Angular diameter', `${t.target.angularDiameterDeg.toFixed(t.target.angularDiameterDeg < 1 ? 4 : 1)}°`, WARN, 34);
      y = p.line(y, 'Closing speed', fmtSpeed(t.target.closingSpeed));
    }
    y = p.line(y, `Speed (${t.speedFrame})`, fmtSpeed(t.speed));
    y = p.line(y, 'Engine / assist', `${t.thrustG} g / ${t.assist}`);
    p.line(y, 'Time warp', `×${fmtSci(t.warp, 0)}${t.warpLimited ? ' (limited)' : ''}`, t.warpLimited ? WARN : '#e8f4ff');
    p.end();
  }

  private drawRel(t: Telemetry) {
    const p = this.rel;
    let y = p.begin('RELATIVITY', MAG);
    y = p.line(y, 'Proper time τ (you)', fmtTime(t.properTime), CYAN);
    y = p.line(y, 'Coordinate time t', fmtTime(t.coordTime));
    y = p.line(y, 'dτ/dt', t.dTauDt > 0.999999 ? t.dTauDt.toFixed(9) : fmtSci(t.dTauDt, 4));
    y = p.line(y, 'Lorentz γ (local)', t.gamma < 1.0001 ? t.gamma.toFixed(7) : t.gamma.toFixed(3));
    if (t.bh) {
      const b = t.bh;
      y = p.line(y, 'r / M', b.rOverM.toFixed(b.rOverM < 10 ? 4 : 1), b.inside ? BAD : '#e8f4ff');
      y = p.line(y, 'Hover needs', isFinite(b.hoverAccelG ?? Infinity) ? `${fmtSci(b.hoverAccelG!, 2)} g` : 'impossible', isFinite(b.hoverAccelG ?? Infinity) ? '#e8f4ff' : BAD);
      y = p.line(y, 'Starlight ahead/behind', `×${fmtSci(b.gravRedshiftAhead, 3)} / ×${fmtSci(b.gravRedshiftBehind, 3)}`);
      if (b.horizonCrossTau !== undefined) y = p.line(y, 'Crossed horizon at τ', fmtTime(b.horizonCrossTau), MAG);
      if (b.inside) p.text(y + 4, 'INSIDE EVENT HORIZON', BAD, 30);
    } else {
      p.text(y + 4, `1 s of your time = ${(1 / t.dTauDt).toFixed(12)} s far away`, '#8fa9bf', 22);
    }
    p.end();
  }

  private drawStr(t: Telemetry) {
    const p = this.str;
    const s = t.structure;
    let y = p.begin('STRUCTURE & TIDES', s.failed ? BAD : GOOD);
    const e = t.tidal.eig;
    y = p.line(y, 'Tidal eigenvalues s⁻²', `${fmtSci(e[0], 1)} ${fmtSci(e[1], 1)} ${fmtSci(e[2], 1)}`, '#e8f4ff', 22);
    y = p.line(y, 'Δa across ship', `${fmtSci(t.tidal.shipDiffAccel / G0, 2)} g`);
    y = p.line(y, 'Δa head–seat (pilot)', `${fmtSci(t.tidal.crewDiffAccel / G0, 2)} g`);
    const sc = s.stress < 0.5 ? GOOD : s.stress < 1 ? WARN : BAD;
    y = p.bar(y + 6, `Stress ${(s.stress * 100).toFixed(s.stress < 0.01 ? 4 : 0)}%`, Math.min(s.stress, 1.5) / 1.5, sc);
    y = p.bar(y, `Integrity ${(s.integrity * 100).toFixed(0)}%`, s.integrity, s.integrity > 0.6 ? GOOD : s.integrity > 0.25 ? WARN : BAD);
    y = p.line(y, 'Plastic strain', `${(s.plasticStrain * 100).toFixed(2)}%`);
    y = p.line(y, 'Hull temperature', `${s.hullTemp.toFixed(0)} K`, s.hullTemp > 2000 ? BAD : s.hullTemp > 900 ? WARN : '#e8f4ff');
    if (s.pressure > 0) y = p.line(y, 'Pressure', `${(s.pressure / 1e5).toFixed(2)} bar`);
    const crewC = ['nominal', 'aware'].includes(s.crew) ? GOOD : s.crew === 'strained' ? WARN : BAD;
    p.line(y, 'Pilot', s.crew.toUpperCase(), crewC);
    p.end();
  }

  private drawStatus(t: Telemetry) {
    const p = this.status;
    const { ctx, w } = p;
    ctx.clearRect(0, 0, w, p.h);
    ctx.fillStyle = 'rgba(6,12,18,0.78)';
    ctx.fillRect(0, 0, w, p.h);
    ctx.font = 'bold 30px ui-monospace, monospace';
    ctx.fillStyle = t.view === 'external' ? MAG : CYAN;
    ctx.fillText(`${t.system}  ·  ${t.view === 'external' ? 'EXTERNAL OBSERVER VIEW' : 'PILOT VIEW'}`, 20, 40);
    ctx.font = '24px ui-monospace, monospace';
    const notes = t.structure.failed ? ['SHIP DESTROYED — press Backspace / reset, or P for unmanned probe'] : t.notices;
    notes.slice(0, 3).forEach((n, i) => {
      ctx.fillStyle = i === 0 && (t.structure.failed || n.startsWith('INSIDE')) ? BAD : WARN;
      ctx.fillText(n, 20, 80 + i * 30);
    });
    if (t.bh?.observer) {
      const o = t.bh.observer;
      ctx.fillStyle = '#e8f4ff';
      const txt = o.seen
        ? `Light now arriving left the ship at τ = ${fmtTime(o.tauEmit)}  ·  delay ${fmtTime(o.delay)}  ·  g = ${fmtSci(o.g, 3)}  ·  telescope ×${fmtSci(o.telescopeZoom, 0)}`
        : 'No light from the ship has reached the observer yet';
      ctx.fillText(txt, 20, 150);
    }
    p.end();
  }

  private drawLegend(t: Telemetry) {
    const p = this.legend;
    let y = p.begin('WHAT YOU ARE SEEING', CYAN);
    y = p.text(y, '■ Established physics', GOOD, 24);
    for (const s of t.physics.established) y = p.text(y, '· ' + s, '#cfe9d8', 19);
    y = p.text(y + 8, '■ Real-time approximations', WARN, 24);
    for (const s of t.physics.approximated) y = p.text(y, '· ' + s, '#efe1bd', 19);
    y = p.text(y + 8, '■ Speculative / unknown', MAG, 24);
    if (t.physics.speculative.length === 0) y = p.text(y, '· nothing speculative on screen', '#c9a9c4', 19);
    for (const s of t.physics.speculative) y = p.text(y, '· ' + s, '#f3c9ec', 19);
    p.end();
  }

  private drawMenu(systems: SystemDef[], current: string) {
    const p = this.menu;
    let y = p.begin(this.menuOpen ? 'DESTINATIONS (stick ↑↓, X = go)' : 'MENU: press Y / M', CYAN);
    systems.forEach((s, i) => {
      const sel = this.menuOpen && i === this.menuIndex;
      const cur = s.id === current;
      y = p.text(y, `${sel ? '▶' : ' '} ${i + 1}. ${s.name}${cur ? '  (here)' : ''}`, sel ? WARN : cur ? GOOD : '#e8f4ff', 22);
    });
    y = p.text(y + 10, 'Jumping between systems is a non-physical gameplay convenience. Everything after arrival is simulated.', '#8fa9bf', 18);
    p.end();
  }
}

/** Desktop text overlay. */
export function overlayText(t: Telemetry): string {
  const L: string[] = [];
  L.push(`<b>${t.system}</b> — ${t.view === 'external' ? '<span class="mag">EXTERNAL OBSERVER VIEW</span>' : 'PILOT VIEW'}`);
  if (t.target) {
    L.push(`${t.target.name}: ${fmtDist(t.target.distance)} · ${t.mode === 'kerr' ? 'above horizon' : 'alt'} ${fmtDist(t.target.altitude)} · <b>${t.target.angularDiameterDeg.toFixed(2)}°</b> across`);
  }
  L.push(`speed ${fmtSpeed(t.speed)} (${t.speedFrame}) · γ ${t.gamma.toFixed(t.gamma < 1.001 ? 7 : 3)} · engine ${t.thrustG} g · assist ${t.assist} · warp ×${fmtSci(t.warp, 0)}${t.warpLimited ? ' (limited)' : ''}`);
  L.push(`τ ${fmtTime(t.properTime)} · t ${fmtTime(t.coordTime)} · dτ/dt ${t.dTauDt.toPrecision(8)}`);
  if (t.bh) L.push(`r = ${t.bh.rOverM.toFixed(4)} M (r₊ = ${t.bh.rPlusOverM.toFixed(3)} M) · hover needs ${isFinite(t.bh.hoverAccelG ?? Infinity) ? fmtSci(t.bh.hoverAccelG!, 2) + ' g' : '∞'} ${t.bh.inside ? ' · <span class="bad">INSIDE HORIZON</span>' : ''}`);
  L.push(`tides Δa ship ${fmtSci(t.tidal.shipDiffAccel / 9.81, 2)} g · pilot ${fmtSci(t.tidal.crewDiffAccel / 9.81, 2)} g · stress ${(t.structure.stress * 100).toFixed(2)}% · integrity ${(t.structure.integrity * 100).toFixed(0)}% · hull ${t.structure.hullTemp.toFixed(0)} K · pilot ${t.structure.crew}`);
  for (const n of t.notices.slice(0, 3)) L.push(`<span class="warn">${n}</span>`);
  if (t.structure.failed) L.push(`<span class="bad">SHIP DESTROYED. Backspace = reset, P = continue as unmanned probe</span>`);
  if (t.bh?.observer) {
    const o = t.bh.observer;
    L.push(o.seen ? `observer receives light emitted at τ = ${fmtTime(o.tauEmit)} · delay ${fmtTime(o.delay)} · g = ${fmtSci(o.g, 3)}` : 'observer: no light from ship yet');
  }
  return L.join('<br>');
}

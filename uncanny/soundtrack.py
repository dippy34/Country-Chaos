"""The soundtrack for THE HALLWAY.

    python3 uncanny/soundtrack.py out.wav

Real CC0 recordings (Kenney's impact/RPG packs, and OpenGameArt packs: deep
bone breaks, horror breathing, 80 creature vocalisations, wet squishes; see
fetch_assets.py) bent out of shape with Rubber Band, filters and convolution,
plus synthesis where nothing recorded would do (ballast hum, the tape itself).
Every cue reads its frame from timeline.py.
"""
import functools
import os
import subprocess
import sys
import tempfile

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import timeline as T  # noqa: E402

SR = 48000
N = int(T.TOTAL / T.FPS * SR)
HERE = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.join(os.environ.get("HALLWAY_ASSETS", os.path.join(HERE, "assets")), "sfx", "wav")
rng = np.random.default_rng(1317)


# ------------------------------------------------------------------ plumbing
def sec(f):
    return f / T.FPS


def idx(f):
    return int(round(sec(f) * SR))


@functools.lru_cache(None)
def _load(name):
    sr, x = wavfile.read(os.path.join(SFX, name + ".wav"))
    x = x.astype(np.float32) / 32768.0
    return x if x.ndim == 2 else np.stack([x, x], 1)


def load(name, peak=0.9):
    x = _load(name).copy()
    return x * (peak / (np.abs(x).max() + 1e-9))


def oga(name, **kw):
    return load("oga__" + name, **kw)


def creature(name, **kw):
    return load("oga__80-CC0-creature-SFX_0__" + name, **kw)


def kenney(name, **kw):
    for pack in ("impact__Audio__", "rpg__Audio__"):
        if os.path.exists(os.path.join(SFX, pack + name + ".wav")):
            return load(pack + name, **kw)
    raise FileNotFoundError(name)


def rubber(x, tempo=1.0, semis=0.0):
    """Rubber Band time-stretch / pitch-shift (through ffmpeg)."""
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, "a.wav"), os.path.join(d, "b.wav")
        wavfile.write(a, SR, (np.clip(x, -1, 1) * 32767).astype(np.int16))
        filt = f"rubberband=tempo={tempo}:pitch={2 ** (semis / 12)}:transients=smooth:detector=soft"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", a, "-af", filt, b], check=True)
        return wavfile.read(b)[1].astype(np.float32) / 32768.0


def tape(x, semis):
    """Pitch like a slowed tape: lower and longer together."""
    r = 2 ** (semis / 12)
    n = int(len(x) / r)
    t = np.arange(n) * r
    return np.stack([np.interp(t, np.arange(len(x)), x[:, c]) for c in range(2)], 1).astype(np.float32)


def band(x, lo=None, hi=None, order=4):
    if lo and hi:
        sos = butter(order, [lo, hi], "bandpass", fs=SR, output="sos")
    elif lo:
        sos = butter(order, lo, "highpass", fs=SR, output="sos")
    else:
        sos = butter(order, hi, "lowpass", fs=SR, output="sos")
    return sosfilt(sos, x, axis=0).astype(np.float32)


def noise(n, ch=2):
    return rng.standard_normal((n, ch)).astype(np.float32)


def decay(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))[:, None].astype(np.float32)


def env(n, attack=0.005, release=0.05):
    e = np.ones(n, np.float32)
    a, r = int(attack * SR), int(release * SR)
    if a:
        e[:a] = np.linspace(0, 1, a)
    if r:
        e[-r:] *= np.linspace(1, 0, r)
    return e[:, None]


def pan(x, p):
    """p in -1 (left) .. 1 (right), constant power."""
    a = (p + 1) * np.pi / 4
    return x * np.array([np.cos(a), np.sin(a)], np.float32) * np.sqrt(2)


def mono(x):
    return np.repeat(x[:, None], 2, 1).astype(np.float32) if x.ndim == 1 else x


def tone(freq, dur, phase=0.0):
    t = np.arange(int(dur * SR)) / SR
    return np.sin(2 * np.pi * np.cumsum(np.broadcast_to(freq, t.shape)) / SR + phase).astype(np.float32)


def place(track, clip, at, gain=1.0):
    """Mix `clip` in starting at frame `at` (fractional frames allowed)."""
    a = idx(at)
    if a < 0:
        clip, a = clip[-a:], 0
    b = min(N, a + len(clip))
    if a < N:
        track[a:b] += clip[: b - a] * gain


def _ir(seconds, tau, lo=150, hi=7000, seed=0):
    r = np.random.default_rng(seed)
    n = int(seconds * SR)
    ir = band(r.standard_normal((n, 2)).astype(np.float32), lo, hi) * decay(n, tau)
    ir[: int(0.004 * SR)] = 0
    return ir / np.abs(ir).sum(0).max() * 8


HALL = _ir(2.6, 0.55, seed=1)        # the long corridor: hard walls, carpet floor
ROOM = _ir(0.5, 0.08, 300, 9000, 2)  # right next to you


def verb(x, wet=0.35, ir=HALL):
    y = np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], 1).astype(np.float32)
    return x * (1 - wet) + y * wet


def far(x, metres):
    """Push a sound down the corridor: quieter, duller, wetter."""
    cut = float(np.clip(9000 / (1 + metres / 6), 600, 9000))
    x = band(x, hi=cut, order=2)
    tail = np.zeros((int(1.2 * SR), 2), np.float32)
    return verb(np.concatenate([x, tail]), wet=float(np.clip(0.2 + metres / 30, 0.2, 0.85))) / (1 + metres / 4)


def drive(x, amount):
    return np.tanh(x * amount) / np.tanh(amount)


# ------------------------------------------------------------- the building
def room_tone():
    """Air handling, the camcorder's own hiss and motor. Stops dead with the tape."""
    hvac = band(noise(N), 25, 160) * 0.05
    hvac += band(noise(N), 160, 600) * 0.008
    hiss = band(noise(N), 3000, 14000) * 0.0045
    t = np.arange(N) / SR
    motor = mono(0.0012 * np.sin(2 * np.pi * 1210 * t) * (1 + 0.5 * np.sin(2 * np.pi * 0.7 * t)))
    out = hvac + hiss + motor
    out[idx(T.CUT):] = 0
    return out


def hum():
    """Ten tired magnetic ballasts: 120 Hz and its harmonics, plus the sizzle of
    the arc itself (noise amplitude-modulated at mains rate). Follows the lights."""
    t = np.arange(N) / SR
    tonal = np.zeros(N, np.float32)
    for h, a in ((1, 0.5), (2, 1.0), (3, 0.45), (4, 0.5), (5, 0.25), (6, 0.3), (8, 0.16), (10, 0.09), (12, 0.07)):
        tonal += a * np.sin(2 * np.pi * 60 * h * t + h * 0.7)
    tonal = np.tanh(tonal * 0.9).astype(np.float32)
    am = (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 60 * t))) ** 6
    sizzle = band(rng.standard_normal(N).astype(np.float32), 2200, 7500) * am
    level = np.repeat([T.hum_level(f) for f in range(T.TOTAL)], SR // T.FPS)[:N].astype(np.float32)
    level = np.convolve(level, np.ones(96) / 96, mode="same")
    wobble = 1 + 0.12 * band(rng.standard_normal(N).astype(np.float32)[:, None], hi=6)[:, 0] * 8
    out = (tonal * 0.10 + sizzle * 0.05) * level * wobble
    return np.stack([out, np.roll(out, 37)], 1).astype(np.float32)


def flicker():
    """Relays ticking, arcs spitting, ballasts pinging as tubes re-strike."""
    out = np.zeros((N, 2), np.float32)
    prev = [1.0] * T.N_LIGHTS
    for f in range(1, T.BLACKOUTS[-1][0] + 1):
        for i in range(T.N_LIGHTS):
            lvl = T.light_level(i, f)
            if lvl == prev[i]:
                continue
            metres = abs(T.LIGHT_Y[i] - 1.0)
            n = int(0.08 * SR)
            arc = band(noise(n), 1500, 9000) * (rng.random((n, 1)) > 0.93) * decay(n, 0.02) * 0.8
            tick = tape(kenney(f"impactMetal_light_00{rng.integers(0, 5)}"), 9)[: int(0.05 * SR)] * 0.35
            clip = np.zeros((n, 2), np.float32)
            clip[: len(tick)] += tick
            clip += arc
            if lvl > prev[i]:
                ping = tape(kenney(f"impactGlass_light_00{rng.integers(0, 5)}"), 7) * 0.12
                clip = np.concatenate([clip, np.zeros((max(0, len(ping) - n), 2), np.float32)])
                clip[: len(ping)] += ping
            place(out, pan(far(clip, metres), (i % 3 - 1) * 0.2), f, 0.6)
            prev[i] = lvl
    return out


def breaker(strength=1.0, seed=0):
    """A breaker somewhere in the walls dropping out."""
    r = np.random.default_rng(seed)
    metal = tape(kenney(f"impactMetal_heavy_00{r.integers(0, 5)}"), -7)
    body = tape(kenney(f"impactSoft_heavy_00{r.integers(0, 5)}"), -5)
    n = max(len(metal), len(body))
    clip = np.zeros((n, 2), np.float32)
    clip[: len(metal)] += metal * 0.7
    clip[: len(body)] += body
    return verb(np.concatenate([clip, np.zeros((SR, 2), np.float32)]), 0.45) * strength


def power():
    out = np.zeros((N, 2), np.float32)
    for k, (a, _) in enumerate(T.BLACKOUTS):
        place(out, breaker(0.55, k), a)
        n = int(0.22 * SR)                                   # the hum dying, pitch falling
        place(out, mono(tone(np.linspace(120, 50, n), n / SR) * np.linspace(1, 0, n) ** 2 * 0.05), a - 1)
    for k, (light, f) in enumerate(sorted(T.CREEP_OFF.items(), key=lambda kv: kv[1])):
        place(out, pan(breaker(0.25 + 0.09 * k, 10 + k), 0.15 - 0.03 * k), f)   # getting closer
    return out


def door():
    """The open office door down the hall, moving on its own."""
    x = tape(kenney("doorOpen_2"), -4)
    x = rubber(x, tempo=0.55)
    out = np.zeros((N, 2), np.float32)
    place(out, pan(far(x, 12), 0.35), 196, 0.5)
    return out


# ------------------------------------------------------------- the tenant
def steps(n_steps, dur_frames, metres, seed, skitter=False):
    """It moving in the dark: too many bare footfalls, too fast, on carpet."""
    r = np.random.default_rng(seed)
    length = int(sec(dur_frames) * SR)
    clip = np.zeros((length + SR, 2), np.float32)
    times = np.sort(r.uniform(0.02, sec(dur_frames) - 0.03, n_steps))
    for t in times:
        s = tape(kenney(f"footstep_carpet_00{r.integers(0, 5)}"), r.uniform(-7, -3)) * r.uniform(0.6, 1.0)
        thud = tape(kenney(f"impactSoft_medium_00{r.integers(0, 5)}"), r.uniform(-4, 0)) * 0.6
        a = int(t * SR)
        clip[a:a + len(s)] += band(s, hi=4000)
        clip[a:a + len(thud)] += thud
        if skitter:                                         # hands too, and nails
            c = tape(kenney(f"cloth{r.integers(1, 4)}"), 2)[: int(0.12 * SR)] * 0.4
            clip[a:a + len(c)] += c
            nail = tape(kenney(f"impactGeneric_light_00{r.integers(0, 5)}"), 12)[: int(0.03 * SR)] * 0.3
            b = a + int(0.04 * SR)
            clip[b:b + len(nail)] += nail
    clip[length:] *= 0                                      # it stops the instant the lights come back
    return far(clip, metres)


def movement():
    out = np.zeros((N, 2), np.float32)
    # blackout -> who it is, how far away, how many steps
    for (a, b), metres, n, skitter, p in zip(T.BLACKOUTS[:5], (23, 17, 11, 7, 3), (5, 5, 4, 7, 2),
                                             (False, False, False, True, False), (0.1, -0.25, 0.2, -0.1, 0.0)):
        place(out, pan(steps(n, b - a, metres, a, skitter), p), a, 1.6)
    return out


def croak(seconds, seed=0):
    """Its voice: a dead, clicking rattle from the bottom of a long throat.
    Recorded creature vocals slowed and dropped, over a synthetic glottal fry."""
    r = np.random.default_rng(seed)
    n = int(seconds * SR)
    rate = 26 + 9 * np.cumsum(r.standard_normal(n)) / np.sqrt(np.arange(1, n + 1)) / 3
    phase = np.cumsum(np.clip(rate, 12, 45)) / SR
    pulses = (np.diff(np.floor(phase), prepend=0) > 0).astype(np.float32)
    pulses *= r.uniform(0.4, 1.0, n).astype(np.float32)
    fry = np.zeros((n, 2), np.float32)
    for f0, bw, g in ((520, 160, 1.0), (1150, 220, 0.6), (2500, 400, 0.25)):    # an 'uh' with a dry throat
        fry += band(mono(pulses), f0 - bw, f0 + bw, 2) * g
    fry += band(noise(n), 300, 3000) * 0.05
    voice = np.zeros((n, 2), np.float32)
    for name, semis in (("weird_05", -6), ("monster_07", -4), ("grunt_02", -7)):
        v = rubber(creature(name), tempo=0.5, semis=semis)
        k = min(n, len(v))
        voice[:k] += v[:k] * 0.35
    out = fry * 3 + voice
    return out * env(n, 0.15, 0.4)


def cracks():
    """Its neck going over, one notch at a time: real bone breaks, slowed, with a creak."""
    out = np.zeros((N, 2), np.float32)
    for k, (f, _) in enumerate(T.ROLL_F6[1:]):
        brk = tape(oga(f"deep_breaks__Deep_Break_{k % 10 + 1}"), -2.5)
        crk = tape(kenney(f"creak{k % 3 + 1}"), -9)[: int(0.35 * SR)] * 0.25
        clip = np.zeros((max(len(brk), len(crk)), 2), np.float32)
        clip[: len(brk)] += brk
        clip[: len(crk)] += crk
        place(out, pan(verb(np.concatenate([clip, np.zeros((SR // 2, 2), np.float32)]), 0.18, ROOM), 0.05), f, 0.85)
    return out


def grin():
    """Lips peeling back off the teeth. Wet, slow, very close."""
    out = np.zeros((N, 2), np.float32)
    wet = ["eat_01", "eat_03", "spit_03", "eat_04", "spit_01", "eat_02"]
    a, b = 372, 458
    for k, f in enumerate(np.linspace(a, b, 6)):
        x = tape(creature(wet[k % len(wet)]), -5 - (k % 3)) * (0.14 + 0.04 * k)
        place(out, pan(band(x, 120, 6000), 0.08), f + rng.uniform(-3, 3))
    sq = tape(oga("im"), -6)                                # skin stretching under it
    place(out, band(sq[: int(3.5 * SR)], 80, 2500) * env(int(3.5 * SR), 1.0, 1.0) * 0.12, 395)
    return out


def tinnitus():
    a, b = T.FIGURES["F6"][0], T.BLACKOUTS[-1][0]
    t = np.arange(N) / SR
    f0 = 4100 + 180 * np.clip((t - sec(a)) / (sec(b) - sec(a)), 0, 1)
    x = np.sin(2 * np.pi * np.cumsum(f0) / SR).astype(np.float32)
    level = np.zeros(T.TOTAL, np.float32)
    level[a:b] = np.linspace(0, 1, b - a) ** 2
    lv = np.repeat(level, SR // T.FPS)[:N]
    return mono(x * np.convolve(lv, np.ones(4800) / 4800, mode="same") * 0.016)


def heartbeat():
    """The operator's, in their ears."""
    out = np.zeros((N, 2), np.float32)
    t, end = sec(T.FIGURES["F6"][0]) + 0.8, sec(T.BLACKOUTS[-1][0])
    k = 0
    while t < end:
        g = (t - sec(342)) / (end - sec(342))
        for off, amp in ((0.0, 1.0), (0.16, 0.55)):
            beat = band(tape(kenney(f"impactSoft_medium_00{k % 5}"), -9), hi=140) * amp * (0.35 + 0.5 * g)
            place(out, beat, (t + off) * T.FPS)
        t += 60 / (68 + 70 * g)
        k += 1
    return out


def operator_breath():
    """Night-shot: the operator trying to be quiet. Holds their breath before looking up."""
    out = np.zeros((N, 2), np.float32)
    br = oga("breathing_tired", peak=0.6)
    br = band(br, 150, 7000)
    t = sec(T.NV_START) + 0.5
    while t < sec(526):
        seg = br * rng.uniform(0.8, 1.0)
        place(out, pan(seg, -0.15), t * T.FPS, 0.55)
        t += len(br) / SR * rng.uniform(0.8, 0.95)
    out[idx(526):] = 0                                       # breath held
    gasp = tape(oga("breathing_tired", peak=0.9)[int(0.1 * SR):int(0.6 * SR)], -1)
    place(out, pan(gasp, -0.15), T.TILT[1] - 2, 0.7)          # ...and lost when they see it
    return out


def above():
    """Something on the ceiling, right over the microphone."""
    out = np.zeros((N, 2), np.float32)
    creak = tape(kenney("creak2"), -10)
    place(out, band(verb(creak, 0.25, ROOM), 80, 3000), 505, 0.3)            # a ceiling tile flexing
    sniff = tape(creature("nose"), -3)
    place(out, verb(sniff, 0.12, ROOM), 530, 0.55)                            # it smells you
    drip = tape(creature("spit_03"), 4)[: int(0.15 * SR)]
    place(out, verb(drip, 0.2, ROOM), 537, 0.25)
    breath = band(oga("horrorbreathing__horrorbreathing__horrorbreathing", peak=0.7), 60, 5000)
    breath = rubber(breath, tempo=0.85, semis=-2)
    place(out, breath[: idx(T.LUNGE[0]) - idx(T.TILT[1] - 4)] * env(idx(T.LUNGE[0]) - idx(T.TILT[1] - 4), 0.6, 0.05),
          T.TILT[1] - 4, 0.6)
    exhale = tape(oga("ghostbreath", peak=0.8), -3)
    place(out, band(exhale, 100, 6000), 579, 0.6)
    rattle = croak(sec(T.LUNGE[0] - 586), seed=7)
    place(out, rattle * np.linspace(0.2, 1.0, len(rattle))[:, None], 586, 0.55)
    return out


def f6_rattle():
    """Its voice, for the first time, once the grin is all the way open."""
    out = np.zeros((N, 2), np.float32)
    c = croak(sec(468 - 440), seed=3)
    place(out, c * np.linspace(0.3, 1.0, len(c))[:, None], 440, 0.5)
    for f, metres, g in ((214, 20, 0.5), (300, 9, 0.5), (330, 6, 0.6)):       # faint, earlier, far off
        c = croak(1.0, seed=f)
        place(out, far(c, metres), f, g)
    return out


def drone():
    """Wrongness under the floor: a stretched, dropped creature moan, and a cluster."""
    t = np.arange(N) / SR
    cluster = np.zeros(N, np.float32)
    for fq, a in ((36.7, 1.0), (55.0, 0.6), (58.3, 0.45), (73.4, 0.25), (77.8, 0.2)):
        cluster += a * np.sin(2 * np.pi * fq * t + rng.uniform(0, 6))
    cluster *= 0.6 + 0.4 * np.sin(2 * np.pi * 0.11 * t)
    moan = rubber(creature("monster_04"), tempo=0.12, semis=-12)
    moan = np.concatenate([moan, moan[::-1]] * 4)
    moan = band(moan, 40, 900)[:N]
    moan = np.pad(moan, ((0, N - len(moan)), (0, 0)))
    steps_ = np.zeros(T.TOTAL, np.float32)
    for k, key in enumerate(["F1", "F2", "F3", "F4", "F5"]):
        steps_[T.FIGURES[key][0]:] = 0.25 + 0.16 * k
    steps_[T.FIGURES["F6"][0]:] = 0.0                       # it stops moving; so does the music
    steps_[T.NV_START:T.CUT] = np.linspace(0.25, 0.9, T.CUT - T.NV_START)
    steps_[T.TILT[1]:T.LUNGE[0]] = 0.08
    lv = np.repeat(steps_, SR // T.FPS)[:N]
    lv = np.convolve(lv, np.ones(SR // 2) / (SR // 2), mode="same")[:, None]
    return (mono(cluster) * 0.12 + moan * 0.5) * lv * 0.5


def riser():
    """The tilt up: reversed reverb pulling in, a bowed-metal screech, sub swelling."""
    a, b = T.TILT
    n = idx(T.LUNGE[0]) - idx(a)
    out = np.zeros((N, 2), np.float32)
    scream = tape(creature("scream_02"), -12)
    tail = verb(np.concatenate([scream, np.zeros((3 * SR, 2), np.float32)]), 0.95)[::-1]
    tail = tail[-(idx(b) - idx(a)):] if len(tail) > idx(b) - idx(a) else tail
    place(out, tail * 0.5, b - len(tail) / SR * T.FPS)
    g = np.linspace(0, 1, idx(b) - idx(a)) ** 2.5
    bow = np.zeros((len(g), 2), np.float32)
    nz = noise(len(g))
    for f0 in (1830, 2470, 3310):
        bow += band(nz, f0 * 0.985, f0 * 1.015, 2) * 6
    place(out, bow * g[:, None] * 0.25, a)
    sub = mono(tone(np.linspace(28, 46, len(g)), len(g) / SR) * g) * 0.35
    place(out, sub, a)
    out[idx(b):idx(b) + n] *= 0                              # face to face: everything drops out
    return out


def lunge():
    """It comes for the lens. Everything at once, then nothing."""
    a, b = T.LUNGE
    n = idx(b) - idx(a)
    layers = [(tape(creature("scream_01"), -1), 1.0), (tape(creature("scream_02"), -5), 0.9),
              (tape(creature("hurt_02"), -3), 0.6), (tape(creature("roar_03"), -9), 0.8)]
    x = np.zeros((n, 2), np.float32)
    for clip, g in layers:
        k = min(n, len(clip))
        x[:k] += clip[:k] * g
    x += band(noise(n), 800, 5000) * 0.25
    t = np.arange(n) / SR
    x += mono(np.sin(2 * np.pi * 38 * t) * np.exp(-t / 0.3)) * 1.2
    x = drive(x * 1.6, 3.0)
    crush = np.round(x * 24) / 24                            # the tape giving up
    x = x * 0.6 + crush * 0.4
    out = np.zeros((N, 2), np.float32)
    place(out, x * env(n, 0.002, 0.0), a, 0.95)
    return out


def camcorder_beep():
    out = np.zeros((N, 2), np.float32)
    n = int(0.06 * SR)
    b = mono(np.sign(tone(1800, 0.06)) * np.minimum(1, np.minimum(np.arange(n), n - np.arange(n)) / 200))
    for k in range(2):
        place(out, b, T.NV_START + k * 0.1 * T.FPS, 0.06)
    return out


def title_booms():
    out = np.zeros((N, 2), np.float32)
    for f, g, k in ((636, 0.55, 0), (662, 0.8, 1)):
        hit = tape(kenney(f"impactPunch_heavy_00{k}"), -14)
        n = int(4 * SR)
        t = np.arange(n) / SR
        sub = mono(np.sin(2 * np.pi * np.cumsum(np.linspace(46, 26, n)) / SR) * np.exp(-t / 1.0))
        clip = sub * 0.8
        clip[: len(hit)] += hit * 0.7
        place(out, verb(clip, 0.5), f, g)
    return out


def mix():
    parts = [room_tone(), hum(), flicker(), power(), door(), movement(), cracks(), grin(), tinnitus(),
             heartbeat(), f6_rattle(), operator_breath(), above(), drone(), riser(), lunge(),
             camcorder_beep(), title_booms()]
    out = sum(parts)
    out[idx(T.CUT):idx(T.TITLE[0])] = 0.0                   # dead air
    fade = idx(T.TOTAL - 18)
    out[fade:] *= np.linspace(1, 0, N - fade)[:, None]
    return out / (np.abs(out).max() / 0.9)


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "hallway.wav"
    wavfile.write(path, SR, (mix() * 32767).astype(np.int16))
    print("wrote", path)


if __name__ == "__main__":
    main()

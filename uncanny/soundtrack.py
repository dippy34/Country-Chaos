"""Synthesises the soundtrack for THE HALLWAY from nothing but numpy.

    python3 uncanny/soundtrack.py out.wav

Every event is read from timeline.py so it lands on the right frame:
fluorescent hum that follows the lights, relay ticks when they sputter,
breaker clunks, the silence when it arrives, bone cracks when its head
jerks over, tinnitus, the operator breathing, and one very loud last second.
"""
import os
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import timeline as T  # noqa: E402

SR = 48000
N = int(T.TOTAL / T.FPS * SR)
rng = np.random.default_rng(1317)


def sec(f):
    return f / T.FPS


def idx(f):
    return int(round(sec(f) * SR))


def band(x, lo=None, hi=None, order=4):
    if lo and hi:
        sos = butter(order, [lo, hi], "bandpass", fs=SR, output="sos")
    elif lo:
        sos = butter(order, lo, "highpass", fs=SR, output="sos")
    else:
        sos = butter(order, hi, "lowpass", fs=SR, output="sos")
    return sosfilt(sos, x, axis=0)


def noise(n, ch=2):
    return rng.standard_normal((n, ch))


def frames_to_env(values, smooth_ms=4.0):
    """Per-frame values -> per-sample envelope with a tiny de-click ramp."""
    env = np.repeat(np.asarray(values, float), SR // T.FPS)[:N]
    env = np.pad(env, (0, N - len(env)), mode="edge")
    k = max(1, int(SR * smooth_ms / 1000))
    return np.convolve(env, np.ones(k) / k, mode="same")


def place(track, clip, at, gain=1.0):
    """Mix `clip` into `track` starting at frame `at` (fractional frames are fine)."""
    a = idx(at)
    b = min(N, a + len(clip))
    if a < N:
        track[a:b] += clip[: b - a] * gain


def decay(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))[:, None]


def tone(freq, dur, phase=0.0):
    t = np.arange(int(dur * SR)) / SR
    return np.sin(2 * np.pi * np.cumsum(np.broadcast_to(freq, t.shape)) / SR + phase)


# A small, ugly concrete corridor: two seconds of diffuse decay.
_ir_n = int(2.0 * SR)
IR = band(noise(_ir_n), 200, 6000) * decay(_ir_n, 0.45)
IR[:, 1] = np.roll(IR[:, 1], 211)
IR /= np.abs(IR).sum(axis=0).max() / 6.0


def reverb(x, wet=0.35):
    y = np.stack([fftconvolve(x[:, c], IR[:, c])[: len(x)] for c in range(2)], axis=1)
    return x * (1 - wet) + y * wet


def mono(x):
    return np.repeat(x[:, None], 2, axis=1) if x.ndim == 1 else x


# ------------------------------------------------------------------ elements
def hum():
    """60 Hz mains buzz through ten tired ballasts. Follows the lights."""
    t = np.arange(N) / SR
    wobble = 1 + 0.002 * np.sin(2 * np.pi * 0.31 * t)
    x = np.zeros(N)
    for h, a in ((2, 1.0), (4, 0.55), (6, 0.35), (3, 0.18), (8, 0.22), (10, 0.12), (12, 0.08), (16, 0.05)):
        x += a * np.sin(2 * np.pi * 60 * h * t * wobble + h)
    x = np.tanh(x * 1.6) * 0.5                           # transformer grit
    whine = 0.05 * np.sin(2 * np.pi * 9470 * t) * (1 + 0.3 * np.sin(2 * np.pi * 3.1 * t))
    level = frames_to_env([T.hum_level(f) for f in range(T.TOTAL)])
    jitter = 1 + 0.08 * band(rng.standard_normal(N), hi=12)
    return mono((x + whine) * level * jitter) * 0.16


def light_events():
    """Relay ticks and arcing when tubes sputter; a ballast ping when they strike."""
    out = np.zeros((N, 2))
    prev = [1.0] * T.N_LIGHTS
    for f in range(1, T.CUT):
        for i in range(T.N_LIGHTS):
            lvl = T.light_level(i, f)
            if lvl == prev[i]:
                continue
            near = 1.0 - i / (T.N_LIGHTS + 2)              # far tubes are quieter
            pan = np.array([0.6 + 0.4 * near, 0.6 + 0.4 * (1 - near)])
            n = int(0.035 * SR)
            tick = band(noise(n), 1800, 7000) * decay(n, 0.004)
            if lvl > prev[i]:                                # strike: ping + buzz burst
                m = int(0.12 * SR)
                ping = mono(tone(1340 + 90 * i, 0.12) * np.exp(-np.arange(m) / (0.03 * SR)))
                tick = np.pad(tick, ((0, m - n), (0, 0))) + ping * 0.25
            place(out, tick * pan, f, 0.35 * near)
            prev[i] = lvl
    return out


def breaker(strength=1.0):
    n = int(0.7 * SR)
    thud = mono(tone(np.linspace(70, 38, n), 0.7) * np.exp(-np.arange(n) / (0.09 * SR)))
    click = band(noise(n), 900, 5000) * decay(n, 0.006)
    return (thud * 0.9 + click * 0.6) * strength


def blackouts():
    out = np.zeros((N, 2))
    for a, _ in T.BLACKOUTS:
        place(out, breaker(0.8), a)
    for k, (light, f) in enumerate(sorted(T.CREEP_OFF.items(), key=lambda kv: kv[1])):
        place(out, breaker(0.35 + 0.08 * k), f)            # getting closer
    return reverb(out, 0.45)


def room_tone():
    x = band(noise(N), hi=180) * 0.05 + band(noise(N), 2500, 12000) * 0.006   # air handling + tape hiss
    env = np.ones(N)
    env[idx(T.CUT):] = 0.0                                                   # the tape just stops
    return x * env[:, None]


def drone():
    """Wrongness under the floor. Builds with each appearance, then gets out of the way."""
    t = np.arange(N) / SR
    x = np.zeros(N)
    for fq, a in ((41.2, 1.0), (55.0, 0.7), (58.3, 0.5), (110.4, 0.18), (116.9, 0.14)):
        x += a * np.sin(2 * np.pi * fq * t + rng.uniform(0, 6))
    x *= 0.6 + 0.4 * np.sin(2 * np.pi * 0.13 * t)
    wind = band(rng.standard_normal(N), 120, 420) * 0.5
    steps = np.zeros(T.TOTAL)
    for k, key in enumerate(["F1", "F2", "F3", "F4", "F5"]):
        a, _ = T.FIGURES[key]
        steps[a:] = 0.25 + 0.17 * k
    steps[T.FIGURES["F6"][0]:] = 0.0                       # it stops moving; so does the music
    steps[T.NV_START:T.CUT] = np.linspace(0.3, 1.0, T.CUT - T.NV_START)
    steps[T.TILT[1]:T.LUNGE[0]] = 0.1                       # face to face: just its breath
    env = frames_to_env(steps, smooth_ms=600)
    return mono((x * 0.5 + wind) * env) * 0.22


def tinnitus():
    a, b = T.FIGURES["F6"][0], T.BLACKOUTS[-1][0]
    t = np.arange(N) / SR
    f0 = 3900 + 140 * np.clip((t - sec(a)) / (sec(b) - sec(a)), 0, 1)
    x = np.sin(2 * np.pi * np.cumsum(f0) / SR)
    steps = np.zeros(T.TOTAL)
    steps[a:b] = np.linspace(0.0, 1.0, b - a) ** 1.5
    return mono(x * frames_to_env(steps, 30)) * 0.03


def crack():
    """A neck going over one notch. A cluster of tiny dry snaps and a knock."""
    n = int(0.35 * SR)
    out = np.zeros((n, 2))
    pos = 0
    for _ in range(rng.integers(4, 8)):
        m = int(rng.uniform(0.001, 0.004) * SR)
        snap = band(noise(m * 8), 1200, 9000)[: m * 8] * decay(m * 8, rng.uniform(0.0008, 0.002))
        out[pos:pos + len(snap)] += snap * rng.uniform(0.5, 1.0)
        pos += int(rng.uniform(0.004, 0.018) * SR)
    knock = mono(tone(np.linspace(140, 70, n), n / SR) * np.exp(-np.arange(n) / (0.025 * SR)))
    return out * 1.3 + knock * 0.6


def cracks():
    out = np.zeros((N, 2))
    for f, _ in T.ROLL_F6[1:]:
        place(out, crack(), f, 0.9)
    return reverb(out, 0.3)


def creak():
    """Skin stretching while it smiles. A slow, wet, uneven pulse train."""
    a, b = 372, 458
    n = idx(b) - idx(a)
    rate = 18 + 22 * np.abs(band(rng.standard_normal(n), hi=3) * 4)
    phase = np.cumsum(rate) / SR
    pulses = (np.diff(np.floor(phase), prepend=0) > 0).astype(float)
    x = band(np.repeat(pulses[:, None], 2, 1) + noise(n) * 0.02, 300, 1400, 2)
    env = np.sin(np.linspace(0, np.pi, n)) ** 0.5
    out = np.zeros((N, 2))
    out[idx(a):idx(a) + n] = x * env[:, None] * 0.9
    return out


def heartbeat():
    """The operator's. Speeding up."""
    out = np.zeros((N, 2))
    t, end = sec(T.FIGURES["F6"][0]) + 0.6, sec(T.BLACKOUTS[-1][0])
    while t < end:
        g = (t - sec(342)) / (end - sec(342))
        bpm = 70 + 60 * g
        for off, amp in ((0.0, 1.0), (0.17, 0.6)):
            n = int(0.18 * SR)
            beat = mono(tone(np.linspace(62, 40, n), n / SR) * np.exp(-np.arange(n) / (0.04 * SR)))
            s = int((t + off) * SR)
            out[s:s + n] += beat[: max(0, min(n, N - s))] * amp * (0.25 + 0.35 * g)
        t += 60 / bpm
    return out


def breathing():
    """Night-shot: the operator, trying to be quiet. Stops when they look up."""
    out = np.zeros((N, 2))
    t, end = sec(T.NV_START) + 0.4, sec(T.TILT[1])
    k = 0
    while t < end:
        dur = 0.9 if k % 2 == 0 else 1.1
        n = int(dur * SR)
        shape = np.sin(np.linspace(0, np.pi, n)) ** 2 * (1 + 0.3 * band(rng.standard_normal(n), hi=15) * 4)
        lo, hi = (500, 2600) if k % 2 == 0 else (350, 1800)
        b = band(noise(n), lo, hi, 2) * shape[:, None]
        s = int(t * SR)
        out[s:s + n] += b[: max(0, min(n, N - s))] * (0.18 if k % 2 == 0 else 0.13)
        t += dur + rng.uniform(0.05, 0.25)
        k += 1
    return out


def camcorder_beep():
    """Two square-wave beeps: NIGHTSHOT ON."""
    out = np.zeros((N, 2))
    n = int(0.06 * SR)
    b = mono(np.sign(tone(1800, 0.06)) * np.minimum(1, np.minimum(np.arange(n), n - np.arange(n)) / 200))
    for k in range(2):
        place(out, b, T.NV_START + k * 0.1 * T.FPS, 0.08)
    return out


def riser():
    a, b = T.TILT[0], T.LUNGE[0]
    n = idx(b) - idx(a)
    g = np.linspace(0, 1, n) ** 2.5
    x = band(noise(n), 1500, 9000) * g[:, None] * 0.12
    sub = mono(np.sin(2 * np.pi * np.cumsum(np.linspace(30, 52, n)) / SR) * g) * 0.25
    out = np.zeros((N, 2))
    out[idx(a):idx(a) + n] = x + sub
    s = idx(T.TILT[1])                     # breath held: a hard dip to almost nothing
    out[s:idx(b)] *= 0.12
    return out


def exhale():
    """Something breathing out, very close, just before it moves."""
    n = int(1.1 * SR)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 3
    x = band(noise(n), 180, 900, 2) * shape[:, None]
    x += band(noise(n), 2500, 5000, 2) * shape[:, None] * 0.3
    out = np.zeros((N, 2))
    place(out, x, 578, 0.45)
    return out


def sting():
    """The lunge. Everything at once, then nothing."""
    a, b = T.LUNGE[0], T.CUT
    n = idx(b) - idx(a)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for base in (311, 329.6, 466.2, 493.9, 698.5, 739.9):
        f = base * (1 + 0.6 * (t / t[-1]) ** 2)
        x += ((np.cumsum(f) / SR) % 1.0 - 0.5)                # detuned saws, pitching up
    scream = band(rng.standard_normal(n), 900, 4200) * 2.5
    impact = np.sin(2 * np.pi * 42 * t) * np.exp(-t / 0.25) * 3
    y = np.tanh((x * 0.5 + scream + impact) * 1.8)
    out = np.zeros((N, 2))
    out[idx(a):idx(a) + n] = mono(y) * 0.95
    out[idx(b):idx(T.TITLE[0])] = 0.0
    return out


def title_booms():
    out = np.zeros((N, 2))
    n = int(3.5 * SR)
    t = np.arange(n) / SR
    boom = mono(np.sin(2 * np.pi * np.cumsum(np.linspace(48, 28, n)) / SR) * np.exp(-t / 0.9))
    boom += band(noise(n), hi=300) * np.exp(-t / 0.5)[:, None] * 0.3
    for f, g in ((636, 0.55), (662, 0.75)):
        place(out, boom, f, g)
    return reverb(out, 0.5)


def mix():
    parts = [hum(), light_events(), blackouts(), room_tone(), drone(), tinnitus(), cracks(), creak(),
             heartbeat(), breathing(), camcorder_beep(), riser(), exhale(), sting(), title_booms()]
    out = sum(parts)
    out[idx(T.CUT):idx(T.TITLE[0])] = 0.0                  # dead air
    fade = idx(T.TOTAL - 18)
    out[fade:] *= np.linspace(1, 0, N - fade)[:, None]
    out /= np.abs(out).max() / 0.89
    return out


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "hallway.wav"
    wavfile.write(path, SR, (mix() * 32767).astype(np.int16))
    print("wrote", path)


if __name__ == "__main__":
    main()

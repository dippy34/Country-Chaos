"""Shared timeline for THE HALLWAY.

Picture (build_scene.py), sound (soundtrack.py) and post (post.py) all read
from here so every flicker, crack and clunk lands on the same frame.
All numbers are frames at 24 fps.
"""

FPS = 24
TOTAL = 720                      # 30 seconds

N_LIGHTS = 10
LIGHT_Y = [1.5 + 3.0 * i for i in range(N_LIGHTS)]   # ceiling panels down the hall

# Total darkness. The thing only moves when you can't see it.
BLACKOUTS = [(170, 178), (228, 234), (276, 280), (312, 315), (340, 342), (470, 482)]

NV_START = 482                   # camcorder flips to night-shot
TILT = (540, 575)                # ...and the operator looks up
LUNGE = (600, 606)
CUT = 606                        # tape cuts to black
TITLE = (630, TOTAL)

# Each appearance of the figure: (first frame, last frame exclusive)
FIGURES = {
    "F1": (106, 170),
    "F2": (178, 228),
    "F3": (234, 276),
    "F4": (280, 312),
    "F5": (315, 340),
    "F6": (342, 470),
    "F7": (NV_START, CUT),       # on the ceiling, the whole time
}

# F6: the head rolls over in sudden jerks (degrees). Every jerk is a crack.
ROLL_F6 = [(342, 18), (365, 31), (389, 44), (403, 57), (426, 71), (438, 86), (451, 99), (461, 112)]

# F6: once it stops moving, the lights die from the far end, one clunk at a time.
CREEP_OFF = {9: 360, 8: 372, 7: 384, 6: 396, 5: 408, 4: 420, 3: 432, 2: 444, 1: 456}

# Lights that sputter: (light, start, end, chance of being off on a frame)
STUTTER = [
    (9, 46, 60, 0.45),
    (9, 96, 104, 0.6), (8, 99, 104, 0.5),
    (9, 112, 118, 0.5), (8, 112, 116, 0.5),
    (9, 140, 146, 0.4),
    (6, 196, 204, 0.5),
    (5, 250, 258, 0.45), (4, 252, 256, 0.4),
    (3, 292, 298, 0.5),
    (1, 326, 332, 0.4),
]
FORCED_OFF = [(9, 104, 112), (8, 104, 112)]   # F1 steps out of this darkness


def _hash01(i, f, salt=0):
    x = (i * 7919 + f * 104729 + salt * 31337 + 1337) & 0xFFFFFFFF
    x = (((x >> 16) ^ x) * 0x45D9F3B) & 0xFFFFFFFF
    x = (((x >> 16) ^ x) * 0x45D9F3B) & 0xFFFFFFFF
    x = (x >> 16) ^ x
    return (x & 0xFFFF) / 65536.0


def smoothstep(a, b, x):
    t = min(1.0, max(0.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def light_level(i, f):
    """Brightness 0..1 of ceiling panel i on frame f."""
    if f >= BLACKOUTS[-1][0]:
        return 0.0
    for a, b in BLACKOUTS:
        if a <= f < b:
            return 0.0
        if b <= f < b + 2:                       # ballasts re-striking
            r = _hash01(i, f, 7)
            return 0.0 if r < 0.35 else (0.5 if r < 0.6 else 1.0)
    if f >= FIGURES["F6"][0] and f >= CREEP_OFF.get(i, 10**9):
        return 0.0
    for li, a, b in FORCED_OFF:
        if li == i and a <= f < b:
            return 0.0
    for li, a, b, p in STUTTER:
        if li == i and a <= f < b:
            r = _hash01(i, f)
            if r < p:
                return 0.0
            if r < p + 0.2:
                return 0.35
    return 1.0


def hum_level(f):
    """How much fluorescent buzz is in the air. It goes silent when F6 arrives."""
    if FIGURES["F6"][0] <= f:
        return 0.0
    return sum(light_level(i, f) for i in range(N_LIGHTS)) / N_LIGHTS


def roll_f6(f):
    deg = ROLL_F6[0][1]
    for fr, d in ROLL_F6:
        if f >= fr:
            deg = d
    return deg


def grin_f6(f):
    """It starts to smile..."""
    return smoothstep(372, 415, f)


def wide_f6(f):
    """...and doesn't stop where a smile should."""
    return smoothstep(420, 458, f)


def mode(f):
    if f >= TITLE[0]:
        return "title"
    if f >= CUT:
        return "black"
    if f >= NV_START:
        return "nv"
    return "cam"

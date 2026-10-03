"""Turns clean Cycles renders into a recovered camcorder tape, and muxes the sound.

    python3 uncanny/post.py FRAMES_DIR SOUNDTRACK.wav OUT.mp4 [--stills DIR]

Grade -> bloom -> lens vignette -> on-screen display burned into the signal
-> VHS (chroma bleed, line jitter, tracking tears, head-switching noise,
grain, scanlines). Night-shot frames go green. Then the title card.
"""
import argparse
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import timeline as T  # noqa: E402

W, H = 1280, 720
OSD_FONT = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"
TITLE_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
LUMA = np.array([0.299, 0.587, 0.114], np.float32)
rng = np.random.default_rng(317)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
_r = np.hypot((xx - W / 2) / (W / 2), (yy - H / 2) / (H / 2))
VIGNETTE = (1 - 0.38 * np.clip(_r - 0.35, 0, None) ** 1.6)[..., None]
NV_VIGNETTE = (1 - 0.85 * np.clip(_r - 0.25, 0, None) ** 1.4).clip(0, 1)[..., None]
SCANLINES = np.where(np.arange(H) % 2 == 0, 1.0, 0.93).astype(np.float32)[:, None, None]


def load(frames, f):
    p = os.path.join(frames, f"f_{f:04d}.png")
    if os.path.exists(p) and os.path.getsize(p) > 0:
        im = Image.open(p).convert("RGB").resize((W, H), Image.BILINEAR)
        return np.asarray(im, np.float32) / 255.0
    return np.zeros((H, W, 3), np.float32)


def blur(img, radius, scale=8):
    """Cheap wide blur: shrink, gaussian, grow."""
    small = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))
    small = small.resize((W // scale, H // scale), Image.BILINEAR).filter(ImageFilter.GaussianBlur(radius / scale))
    return np.asarray(small.resize((W, H), Image.BILINEAR), np.float32) / 255.0


def bloom(img, thresh=0.72, strength=0.45, radius=26):
    hi = np.clip(img - thresh, 0, None) / (1 - thresh)
    return img + blur(hi, radius) * strength


def grade(img):
    """Cheap camcorder CCD: lifted blacks, a green-yellow cast, tired colour."""
    lum = (img @ LUMA)[..., None]
    img = lum + (img - lum) * 0.78
    img = img * np.array([1.0, 1.03, 0.84], np.float32)
    img = 0.03 + 0.97 * np.clip(img, 0, 1) ** 1.08
    return img


class Exposure:
    """Night-shot auto-gain hunts a little, like the real thing."""

    def __init__(self):
        self.g = 8.0

    def __call__(self, lum):
        target = np.clip(0.2 / (lum.mean() + 1e-4), 1.0, 24.0)
        self.g += (target - self.g) * 0.12
        return self.g


def nightshot(img, f, exposure):
    lum = img @ LUMA
    g = exposure(lum)
    l = 1 - np.exp(-lum * g * 1.4)
    hot = np.clip((lum - 0.93) / 0.07, 0, 1)              # eyeshine: retroreflection under IR
    hot = hot * min(1.0, 0.004 / (hot.mean() + 1e-6))     # a face in the lens isn't all eyes
    glow = blur(np.repeat(hot[..., None], 3, 2), 12, 2)[..., :1] * 3.0
    k = f - T.NV_START
    if k < 6:                                         # sensor flares while it switches
        l = l * (k / 6) + (1 - k / 6)
    l = l + rng.normal(0, 0.075, l.shape).astype(np.float32)
    l = np.clip(l, 0, 1)[..., None]
    l = bloom(np.repeat(l, 3, 2), 0.6, 0.6, 20)[..., :1]
    out = l * np.array([0.40, 1.0, 0.46], np.float32) + np.array([0.0, 0.035, 0.0], np.float32)
    out = out * NV_VIGNETTE
    return out + (hot[..., None] + glow) * np.array([0.85, 1.0, 0.85], np.float32)


def osd(img, f, nv):
    """REC, battery, tape speed, date and time. Burned in, so it gets degraded too."""
    im = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))
    d = ImageDraw.Draw(im)
    font = ImageFont.truetype(OSD_FONT, 34)
    small = ImageFont.truetype(OSD_FONT, 26)

    def text(xy, s, fnt=font, fill=(235, 235, 235)):
        d.text((xy[0] + 3, xy[1] + 3), s, font=fnt, fill=(0, 0, 0))
        d.text(xy, s, font=fnt, fill=fill)

    if (f // 12) % 2 == 0:
        d.ellipse((70, 58, 98, 86), fill=(0, 0, 0))
        d.ellipse((67, 55, 95, 83), fill=(230, 30, 25))
    text((108, 50), "REC")
    if nv:
        text((70, 100), "NIGHTSHOT", small, (210, 255, 210))

    # battery: dying while it stares at you
    bars = 3 if f < T.FIGURES["F6"][0] else 1
    if not (f >= T.FIGURES["F6"][0] and (f // 6) % 2):
        x0, y0 = W - 170, 56
        d.rectangle((x0 + 3, y0 + 3, x0 + 93, y0 + 33), outline=(0, 0, 0), width=3)
        d.rectangle((x0, y0, x0 + 90, y0 + 30), outline=(235, 235, 235), width=3)
        d.rectangle((x0 + 90, y0 + 9, x0 + 98, y0 + 21), fill=(235, 235, 235))
        for b in range(bars):
            d.rectangle((x0 + 8 + b * 27, y0 + 7, x0 + 28 + b * 27, y0 + 23), fill=(235, 235, 235))

    text((70, H - 96), "SP")
    secs = 3 * 3600 + 17 * 60 + 42 + f // T.FPS
    hh, mm, ss = secs // 3600, secs // 60 % 60, secs % 60
    text((W - 330, H - 140), "OCT. 2 2026")
    text((W - 330, H - 96), f"{hh:2d}:{mm:02d}:{ss:02d} AM")
    return np.asarray(im, np.float32) / 255.0


def vhs(img, f, glitch=0.0):
    """Luma/chroma split with smeared chroma, wobbly lines, tears, grain, scanlines."""
    lum = (img @ LUMA)[..., None]
    chroma = img - lum
    k = 15
    c = np.cumsum(np.pad(chroma, ((0, 0), (k, 0), (0, 0))), axis=1)
    chroma = (c[:, k:] - c[:, :-k]) / k
    chroma = np.roll(chroma, 4, axis=1)
    img = lum + chroma * 1.15

    # per-line timing wobble, plus tracking tears
    shift = np.cumsum(rng.normal(0, 0.35, H)).astype(np.float32)
    shift = (shift - np.convolve(shift, np.ones(41) / 41, mode="same")) * 1.2
    if glitch > 0:
        for _ in range(int(1 + glitch * 6)):
            y0 = rng.integers(0, H - 20)
            h = rng.integers(6, int(20 + 120 * glitch))
            shift[y0:y0 + h] += rng.uniform(-60, 60) * glitch
            img[y0:y0 + h] += rng.uniform(0.05, 0.35) * glitch
    shift[H - 12:] += rng.uniform(14, 30)                    # head-switching noise
    cols = (np.arange(W)[None, :] - shift[:, None].round().astype(int)) % W
    img = img[np.arange(H)[:, None], cols]
    img[H - 12:] = img[H - 12:] * 0.6 + rng.uniform(0, 0.5, (12, W, 1))

    if glitch > 0.5:                                         # colour channels come apart
        s = int(18 * glitch)
        img[..., 0] = np.roll(img[..., 0], s, axis=1)
        img[..., 2] = np.roll(img[..., 2], -s, axis=1)

    grain = rng.normal(0, 0.032, (H, W, 1)).astype(np.float32)
    cn = rng.normal(0, 0.05, (H // 6, W // 6, 3)).astype(np.float32)
    cn = np.asarray(Image.fromarray(((cn + 0.5) * 255).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR),
                    np.float32) / 255.0 - 0.5
    img = img + grain + cn * 0.5 * np.clip(1 - lum * 1.5, 0.15, 1)
    return np.clip(img * SCANLINES, 0, 1)


def glitch_amount(f):
    g = 0.0
    for a, b in T.BLACKOUTS:
        for edge in (a, b):
            if 0 <= f - edge < 2:
                g = max(g, 0.35)
    if T.LUNGE[0] <= f < T.CUT:
        g = 0.3 + 0.7 * (f - T.LUNGE[0]) / (T.CUT - T.LUNGE[0] - 1)
    if T.NV_START <= f < T.NV_START + 3:
        g = max(g, 0.5)
    if rng.random() < 0.015:
        g = max(g, 0.2)
    return g


def title(f):
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    font = ImageFont.truetype(TITLE_FONT, 40)
    lines = [(636, "TAPE 1 OF 7 RECOVERED."), (662, "THE OTHER SIX ARE STILL RECORDING.")]
    for k, (start, s) in enumerate(lines):
        a = np.clip((f - start) / 8, 0, 1) * np.clip((714 - f) / 10, 0, 1)
        if a <= 0:
            continue
        tw = d.textlength(s, font=font)
        jitter = rng.integers(-1, 2)
        c = int(225 * a)
        d.text(((W - tw) / 2 + jitter, H / 2 - 50 + k * 70), s, font=font, fill=(c, c, int(c * 0.95)))
    img = np.asarray(im, np.float32) / 255.0
    out = vhs(img, f, 0.0) - 0.03
    return np.clip(out, 0, 1)


def render_frame(frames, f, exposure):
    m = T.mode(f)
    if m == "black":
        return np.zeros((H, W, 3), np.float32)
    if m == "title":
        return title(f)
    img = load(frames, f)
    nv = m == "nv"
    if nv:
        img = nightshot(img, f, exposure)
    else:
        img = bloom(grade(img)) * VIGNETTE
    img = osd(img, f, nv)
    return vhs(img, f, glitch_amount(f))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("frames")
    ap.add_argument("audio")
    ap.add_argument("out")
    ap.add_argument("--stills", help="also save a few frames here as JPEG")
    ap.add_argument("--only", nargs="*", type=int, help="just write these frames as PNGs to --stills")
    args = ap.parse_args()
    exposure = Exposure()
    keep = {150: "01_far_end", 330: "02_coming", 352: "03_it_stops", 466: "04_it_smiles", 590: "05_above_you"}

    if args.only:
        for f in args.only:
            for _ in range(40):                                  # let night-shot exposure settle
                exposure(load(args.frames, f) @ LUMA)
            img = render_frame(args.frames, f, exposure)
            Image.fromarray((img * 255).astype(np.uint8)).save(os.path.join(args.stills, f"post_{f:04d}.png"))
        return

    ff = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
         "-r", str(T.FPS), "-i", "-", "-i", args.audio, "-c:v", "libx264", "-preset", "slow", "-crf", "23",
         "-maxrate", "4500k", "-bufsize", "9000k",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", args.out],
        stdin=subprocess.PIPE)
    for f in range(T.TOTAL):
        img = (render_frame(args.frames, f, exposure) * 255).astype(np.uint8)
        ff.stdin.write(img.tobytes())
        if args.stills and f in keep:
            Image.fromarray(img).save(os.path.join(args.stills, f"{keep[f]}.jpg"), quality=88)
        if f % 60 == 0:
            print(f"post {f}/{T.TOTAL}", flush=True)
    ff.stdin.close()
    sys.exit(ff.wait())


if __name__ == "__main__":
    main()

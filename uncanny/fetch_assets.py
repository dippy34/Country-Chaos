"""Downloads the CC0 assets THE HALLWAY is built from into uncanny/assets/.

    python3 uncanny/fetch_assets.py

  * MPFB 2 (MakeHuman for Blender): the hm08 base mesh, morph targets, the
    default skeleton and its skin weights. The MakeHuman assets are CC0.
  * MakeHuman system assets (CC0): skin textures, eyes, teeth, tongue.
  * Kenney "Impact Sounds" and "RPG Audio" (CC0): footsteps, impacts, creaks.
  * OpenGameArt (all CC0): "Deep Bone Crack/Break SFX", "horror breathing",
    "Ghost breath", "Breathing Tired", "80 CC0 creature SFX",
    "8 wet squish, slurp impacts".

Sound files are decoded to 48 kHz stereo WAV in assets/sfx/wav/.
"""
import os
import subprocess
import urllib.request
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.environ.get("HALLWAY_ASSETS", os.path.join(HERE, "assets"))

MPFB = ("https://extensions.blender.org/download/sha256:4f0a879d64a39bf646fbf5f53601ac678855da329d650617dca5737548239a87/"
        "add-on-mpfb-v2.0.17.zip?repository=%2Fapi%2Fv1%2Fextensions%2F&blender_version_min=4.2.0")
SYSTEM = "https://files.makehumancommunity.org/asset_packs/makehuman_system_assets/makehuman_system_assets_cc0.zip"
KENNEY = {
    "impact": "https://kenney.nl/media/pages/assets/impact-sounds/87b4ddecda-1677589768/kenney_impact-sounds.zip",
    "rpg": "https://kenney.nl/media/pages/assets/rpg-audio/8e99002d76-1677590336/kenney_rpg-audio.zip",
}
OGA = "https://opengameart.org/sites/default/files/"
OGA_FILES = ["deep_breaks.zip", "horrorbreathing.zip", "ghostbreath.flac", "breathing tired.wav",
             "80-CC0-creature-SFX_0.zip", "im.mp3"]


def fetch(url, dest):
    if os.path.exists(dest):
        return dest
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    print("fetching", url)
    req = urllib.request.Request(url.replace(" ", "%20"), headers={"User-Agent": "the-hallway-build"})
    with urllib.request.urlopen(req, timeout=600) as r, open(dest + ".part", "wb") as fh:
        while chunk := r.read(1 << 20):
            fh.write(chunk)
    os.replace(dest + ".part", dest)
    return dest


def unzip(path, into):
    if not os.path.exists(into):
        with zipfile.ZipFile(path) as z:
            z.extractall(into)


def main():
    unzip(fetch(MPFB, os.path.join(ASSETS, "dl", "mpfb.zip")), os.path.join(ASSETS, "mpfb"))
    unzip(fetch(SYSTEM, os.path.join(ASSETS, "dl", "system.zip")), os.path.join(ASSETS, "sys"))
    sfx = os.path.join(ASSETS, "sfx")
    for name, url in KENNEY.items():
        unzip(fetch(url, os.path.join(ASSETS, "dl", name + ".zip")), os.path.join(sfx, name))
    for f in OGA_FILES:
        path = fetch(OGA + f, os.path.join(sfx, "oga", f))
        if f.endswith(".zip"):
            unzip(path, path[:-4])

    wav = os.path.join(sfx, "wav")
    os.makedirs(wav, exist_ok=True)
    for root, _, files in os.walk(sfx):
        if root.startswith(wav):
            continue
        for f in files:
            if not f.lower().endswith((".ogg", ".wav", ".mp3", ".flac")) or f == "Preview.ogg":
                continue
            if f.startswith("horrorbreathing.") and not f.endswith(".wav"):
                continue
            rel = os.path.relpath(os.path.join(root, f), sfx)
            out = os.path.join(wav, os.path.splitext(rel)[0].replace(os.sep, "__").replace(" ", "_") + ".wav")
            if not os.path.exists(out):
                subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", os.path.join(root, f),
                                "-ar", "48000", "-ac", "2", out], check=True)
    print("assets ready in", ASSETS)


if __name__ == "__main__":
    main()

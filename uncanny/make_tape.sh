#!/usr/bin/env bash
# Builds THE HALLWAY end to end: assets -> scene -> frames -> soundtrack -> VHS post -> mp4.
# About 2.5 hours on a 4-core CPU. Rendering is resumable: just run it again.
#
#   pip install bpy==5.0.1 numpy scipy pillow   (bpy wants Python 3.11; also needs ffmpeg with rubberband)
#   ./uncanny/make_tape.sh
set -euo pipefail
cd "$(dirname "$0")"
BUILD=${1:-build}
mkdir -p "$BUILD/frames" stills

python3 fetch_assets.py
# the close-ups (from where it stops moving) get more pixels than the long shots
python3 build_scene.py --blend "$BUILD/hallway.blend" --res 800 450 --render "$BUILD/frames" --frames 342 605
python3 build_scene.py --res 640 360 --render "$BUILD/frames" --frames 0 341
python3 soundtrack.py "$BUILD/hallway.wav"
python3 post.py "$BUILD/frames" "$BUILD/hallway.wav" the_hallway.mp4 --stills stills
echo "Done: uncanny/the_hallway.mp4  (watch it with the lights off)"

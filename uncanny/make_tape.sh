#!/usr/bin/env bash
# Builds THE HALLWAY end to end: scene -> frames -> soundtrack -> VHS post -> mp4.
# About 90 minutes on a 4-core CPU. Rendering is resumable: just run it again.
#
#   pip install bpy==5.0.1 numpy scipy pillow   (bpy needs Python 3.11)
#   ./uncanny/make_tape.sh
set -euo pipefail
cd "$(dirname "$0")"
BUILD=${1:-build}
mkdir -p "$BUILD/frames" stills

python3 build_scene.py --blend "$BUILD/hallway.blend" --render "$BUILD/frames"
python3 soundtrack.py "$BUILD/hallway.wav"
python3 post.py "$BUILD/frames" "$BUILD/hallway.wav" the_hallway.mp4 --stills stills
echo "Done: uncanny/the_hallway.mp4  (watch it with the lights off)"

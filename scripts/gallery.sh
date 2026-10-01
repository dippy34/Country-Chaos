#!/usr/bin/env bash
# Regenerates the README gallery with headless Chromium (SwiftShader). Needs `npm run dev` on :5173.
set -u
cd "$(dirname "$0")/.."
HIDE="eval:document.getElementById('panel').classList.add('hidden');document.getElementById('overlay').style.display='none'"
shot() { node scripts/shot-app.mjs "$1&meter=sync&sky=1024" "docs/images/$2.png" "${3:-25}" "$HIDE" "${@:4}" >/dev/null 2>&1 && echo "ok $2" || echo "FAIL $2"; }
shot "sys=sgra&quality=medium" sgra-arrival 25
shot "sys=sgra&quality=medium&r=6&th=1.35&orbit=0.6&probe=1" sgra-r6 20
shot "sys=sgra&quality=medium&view=external" sgra-external 25
shot "sys=jupiter&dist=3.5e8" jupiter-350k 25
shot "sys=jupiter&dist=8.2e7" jupiter-10k 25 "eval:window.lightcone.input.look.yaw=0.6"
shot "sys=betelgeuse" betelgeuse 25
shot "sys=m87&quality=medium" m87 20
shot "sys=ton618&quality=medium" ton618 20
shot "sys=sun" sun 25
for spec in "r=1.25&inc=60&look=out&disk=0&exp=2e2:inside-looking-out" "r=1.25&inc=60&exp=1e-9:inside-looking-in" "r=25&inc=60&disk=0&exp=2e2&fov=75:lensing-no-disk"; do
  q=${spec%%:*}; n=${spec##*:}
  node scripts/screenshot.mjs "http://localhost:5173/dev/tracer-test.html?size=384&sky=1024&steps=500&a=0.9&T=3500&$q" docs/images/$n.png 8000 >/dev/null 2>&1 && echo "ok $n"
done

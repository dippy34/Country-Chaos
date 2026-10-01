// Standalone harness: renders the Kerr tracer for a fixed camera, for headless screenshots.
import * as THREE from 'three';
import { generateSky } from '../src/render/skyGen';
import { makeBlackbodyLUT } from '../src/render/blackbody';
import { KerrTracer, diskTempTexture } from '../src/render/kerrTracer';
import { buildDiskProfile } from '../src/physics/disk';
import { horizonPlus, iscoRadius, ksPoint, lower } from '../src/physics/kerr';
import { bodyTetrad, zamo } from '../src/physics/frames';
import { lookQuat } from '../src/physics/observer';
import { M_SUN } from '../src/physics/constants';

const q = new URLSearchParams(location.search);
const spin = parseFloat(q.get('a') ?? '0.9');
const dist = parseFloat(q.get('r') ?? '30');
const incl = parseFloat(q.get('inc') ?? '80') * Math.PI / 180;
const size = parseInt(q.get('size') ?? '256');
const W = 960, H = 540;
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);
const k = { M: 1, a: spin };
const sky = generateSky(renderer, parseInt(q.get('sky') ?? '512'));
const bb = makeBlackbodyLUT();
const prof = buildDiskProfile(k, 4.3e6 * M_SUN, 0.1, 30, 128);
const tracer = new KerrTracer(size, {
  spin, rPlus: horizonPlus(k), diskOn: q.get('disk') !== '0', diskIn: iscoRadius(k), diskOut: 30,
  diskTmax: parseFloat(q.get('T') ?? String(prof.Tmax)), diskTemp: diskTempTexture(prof.T, prof.Tmax), sky: sky.texture, bb,
  skyRot: new THREE.Matrix3().set(0, 0, 1, 1, 0, 0, 0, 1, 0),
});
tracer.setQuality(parseInt(q.get('steps') ?? '500'), parseFloat(q.get('h') ?? '0.03'));
const pos: [number, number, number] = [dist * Math.sin(incl), 0, dist * Math.cos(incl)];
const z = zamo(k, ...pos)!;
const p = ksPoint(k, ...pos);
const qq = lookQuat([-pos[0], -pos[1], -pos[2]], [0, 0, 1]);
const t = bodyTetrad(k, pos, lower(p, z), qq);
tracer.setCamera({ e: t.e, pos, t: 0 }, parseFloat(q.get('exp') ?? '1e-9'));
tracer.renderCube(renderer);
// display: perspective view of the cube from inside
const mat = new THREE.ShaderMaterial({
  uniforms: { uCube: { value: tracer.cube.texture } },
  vertexShader: `out vec3 vDir; void main(){ vDir = (modelMatrix * vec4(position,0.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }`,
  fragmentShader: `precision highp float; in vec3 vDir; uniform samplerCube uCube; void main(){ vec3 c = texture(uCube, normalize(vDir)).rgb; gl_FragColor = vec4(c,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,
  side: THREE.BackSide, depthWrite: false,
});
const scene = new THREE.Scene();
scene.add(new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), mat));
const cam = new THREE.PerspectiveCamera(parseFloat(q.get('fov') ?? '70'), W / H, 0.1, 100);
renderer.toneMapping = THREE.AgXToneMapping;
renderer.render(scene, cam);
(window as any).__done = true;
console.log('Tmax', prof.Tmax, 'rIn', prof.rIn);

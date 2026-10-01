/**
 * Exterior model of the ship, used by the EXTERNAL OBSERVER telescope. Every
 * material is a blackbody-referenced emitter or reflector, so the received
 * colour and brightness follow from the frequency ratio g computed along the
 * actual null geodesic from ship to observer: T_obs = g·T_emit, surface
 * brightness ∝ g⁴ (exact for blackbody spectra).
 */
import * as THREE from 'three';
import { BB_GLSL } from './blackbody';

const VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vLocal;
void main() {
  vN = normalize(normal);
  vLocal = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uBB;
uniform float uExposure;
uniform float uG;          // received / emitted frequency
uniform int uKind;         // 0 hull, 1 engine plume, 2 beacon, 3 windows
uniform vec3 uKeyDir;      // model frame
uniform float uKeyT;
uniform float uKeyK;       // illuminance as a fraction of a blackbody's radiance × π
uniform float uAlbedo;
uniform float uEngine;     // 0..1
uniform float uTauEmit;    // ship proper time at emission (s)
varying vec3 vN;
varying vec3 vLocal;
${BB_GLSL}
void main() {
  vec3 n = normalize(vN);
  vec3 c = vec3(0.0);
  if (uKind == 0) {
    float l = max(dot(n, uKeyDir), 0.0) + 0.08;
    c = bbRadiance(uG * uKeyT) * uKeyK * uAlbedo * l;
    // hull panel lines
    float pl = step(0.96, fract(vLocal.z * 0.25)) * 0.5;
    c *= 1.0 - pl;
  } else if (uKind == 1) {
    float core = exp(-length(vLocal.xy) * 0.6);
    c = bbRadiance(uG * 25000.0) * 1e-3 * uEngine * core;
  } else if (uKind == 2) {
    // navigation strobe: 1 Hz in the ship's own proper time
    float ph = fract(uTauEmit);
    float on = step(ph, 0.08);
    c = bbRadiance(uG * 3200.0) * 2e-4 * on;
  } else {
    c = bbRadiance(uG * 3400.0) * 2e-6;
  }
  gl_FragColor = vec4(c * uExposure, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export class ShipModel {
  readonly group = new THREE.Group();
  readonly materials: THREE.ShaderMaterial[] = [];
  /** Overall length (m). */
  readonly length = 62;
  readonly shared = {
    uExposure: { value: 1 },
    uG: { value: 1 },
    uKeyDir: { value: new THREE.Vector3(0, 1, 0) },
    uKeyT: { value: 6000 },
    uKeyK: { value: 0.1 },
    uEngine: { value: 0 },
    uTauEmit: { value: 0 },
  };

  constructor(bb: THREE.Texture) {
    const mk = (kind: number, albedo = 0.5) => {
      const m = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { ...this.shared, uBB: { value: bb }, uKind: { value: kind }, uAlbedo: { value: albedo } },
        transparent: kind === 1,
        blending: kind === 1 ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: kind !== 1,
      });
      this.materials.push(m);
      return m;
    };
    const hull = mk(0, 0.55), plume = mk(1), beacon = mk(2), windows = mk(3);
    // fuselage along −Z (forward)
    const fus = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 4.2, 44, 24), hull);
    fus.rotation.x = Math.PI / 2;
    this.group.add(fus);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(3.2, 10, 24), hull);
    nose.rotation.x = -Math.PI / 2;
    nose.position.z = -27;
    this.group.add(nose);
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), windows);
    canopy.position.set(0, 2.6, -18);
    this.group.add(canopy);
    for (const s of [-1, 1]) {
      const rad = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 10), hull);
      rad.position.set(s * 11, 0, 6);
      rad.rotation.z = s * 0.15;
      this.group.add(rad);
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), beacon);
      b.position.set(s * 19, 1.2 * s, 6);
      this.group.add(b);
    }
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 4.6, 6, 24, 1, true), hull);
    bell.rotation.x = Math.PI / 2;
    bell.position.z = 25;
    this.group.add(bell);
    const jet = new THREE.Mesh(new THREE.ConeGeometry(4.2, 60, 24, 1, true), plume);
    jet.rotation.x = Math.PI / 2;
    jet.position.z = 58;
    this.group.add(jet);
  }
}

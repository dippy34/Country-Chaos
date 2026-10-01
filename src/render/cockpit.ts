/**
 * The pilot's cockpit: an open-canopy frame designed to keep the view of the
 * sky unobstructed in VR while giving near-field reference geometry (struts,
 * dashboard, seat) — the near reference is what makes the far objects feel
 * enormous. Lit by the actual light field: direct starlight, planet-shine and,
 * near black holes, the ray-traced environment (lensed disk light).
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPos = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const FRAG = /* glsl */ `
uniform samplerCube uEnv;
uniform int uEnvMode;
uniform float uEnvMip;
uniform vec3 uKeyDir;
uniform vec3 uKeyE;
uniform vec3 uFillDir;
uniform vec3 uFillE;
uniform vec3 uAlbedo;
uniform vec3 uEmissive;
uniform float uMetal;
uniform float uExposure;
uniform float uCabin;
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(cameraPosition - vPos);
  vec3 E = uKeyE * max(dot(n, uKeyDir), 0.0) + uFillE * max(dot(n, uFillDir) * 0.7 + 0.3, 0.0);
  vec3 env = vec3(0.0);
  if (uEnvMode == 1) env = textureLod(uEnv, n, uEnvMip).rgb / max(uExposure, 1e-30) * 3.14159;
  vec3 diffuse = uAlbedo / 3.14159 * (E + env + vec3(uCabin, uCabin * 0.85, uCabin * 0.8));
  vec3 h = normalize(uKeyDir + v);
  vec3 spec = uKeyE * pow(max(dot(n, h), 0.0), 60.0) * 0.25 * uMetal * step(0.0, dot(n, uKeyDir)) / 3.14159;
  vec3 refl = vec3(0.0);
  if (uEnvMode == 1) refl = textureLod(uEnv, reflect(-v, n), uEnvMip - 2.0).rgb / max(uExposure, 1e-30) * 0.08 * uMetal;
  vec3 col = (diffuse + spec + refl) * uExposure;
  // instrument glow keeps the cockpit faintly readable whatever the eye is adapted to
  col = max(col, uAlbedo * 0.03 * (0.6 + 0.4 * max(n.y, 0.0)));
  col = min(col + uEmissive, vec3(6e4));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const GLASS_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPos = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const GLASS_FRAG = /* glsl */ `
uniform samplerCube uEnv;
uniform int uEnvMode;
uniform float uExposure;
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec3 v = normalize(vPos - cameraPosition);
  vec3 n = -normalize(vN);
  float fres = pow(1.0 - abs(dot(n, -v)), 5.0);
  vec3 refl = uEnvMode == 1 ? textureLod(uEnv, reflect(v, n), 1.0).rgb : vec3(0.0);
  // faint edge sheen so the canopy reads as glass, plus the real reflected sky
  vec3 c = refl * (0.02 + 0.25 * fres) + vec3(0.03, 0.05, 0.06) * fres * 0.4;
  gl_FragColor = vec4(min(c, vec3(4.0)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export class Cockpit {
  readonly group = new THREE.Group();
  /** Inner group that receives the structural deformation. */
  readonly body = new THREE.Group();
  readonly materials: THREE.ShaderMaterial[] = [];
  readonly shared = {
    uEnv: { value: null as THREE.Texture | null },
    uEnvMode: { value: 0 },
    uEnvMip: { value: 6 },
    uKeyDir: { value: new THREE.Vector3(0, 1, 0) },
    uKeyE: { value: new THREE.Vector3() },
    uFillDir: { value: new THREE.Vector3(0, -1, 0) },
    uFillE: { value: new THREE.Vector3() },
    uExposure: { value: 1 },
    uCabin: { value: 0.02 },
  };
  readonly panelAnchors: Record<string, THREE.Object3D> = {};

  constructor() {
    this.group.add(this.body);
    const graphite = this.mat(0x2b3138, 0.55);
    const dark = this.mat(0x16191d, 0.35);
    const frame = this.mat(0x3a4048, 0.85);
    const seatMat = this.mat(0x1f2328, 0.15);
    const trim = this.mat(0x0d1013, 0.2, new THREE.Color(0.05, 0.42, 0.62));
    const warm = this.mat(0x0d1013, 0.2, new THREE.Color(0.75, 0.42, 0.08));
    const add = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      this.body.add(mesh);
      return mesh;
    };
    const rbox = (w: number, h: number, d: number, r = 0.02) => new RoundedBoxGeometry(w, h, d, 3, r);

    // ── dashboard: a sculpted console extruded across the cockpit, sloped toward the pilot
    const prof = new THREE.Shape();
    // (u = forward/back z, v = height y)
    prof.moveTo(-1.08, -1.0);
    prof.lineTo(-1.08, -0.36);
    prof.quadraticCurveTo(-1.07, -0.32, -1.0, -0.325);
    prof.lineTo(-0.62, -0.44);
    prof.quadraticCurveTo(-0.56, -0.455, -0.555, -0.5);
    prof.lineTo(-0.56, -1.0);
    prof.closePath();
    const dashW = 1.78;
    const dashGeo = new THREE.ExtrudeGeometry(prof, { depth: dashW, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.018, bevelSegments: 3, curveSegments: 12 });
    add(dashGeo, graphite, dashW / 2, 0, 0, 0, -Math.PI / 2);
    // glare shield over the displays
    const shield = new THREE.Shape();
    shield.moveTo(-1.07, -0.33);
    shield.quadraticCurveTo(-1.05, -0.24, -0.93, -0.225);
    shield.lineTo(-0.9, -0.23);
    shield.lineTo(-1.0, -0.33);
    shield.closePath();
    add(new THREE.ExtrudeGeometry(shield, { depth: 1.2, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }), dark, 0.6, 0, 0, 0, -Math.PI / 2);
    // cyan trim along the dash lip and a warm status strip
    add(rbox(1.7, 0.012, 0.012, 0.005), trim, 0, -0.505, -0.545);
    add(rbox(1.1, 0.008, 0.008, 0.003), warm, 0, -0.226, -0.905);

    // ── side consoles with button rows
    for (const sgn of [-1, 1]) {
      add(rbox(0.34, 0.16, 0.95, 0.04), graphite, 0.6 * sgn, -0.6, -0.12);
      add(rbox(0.3, 0.012, 0.9, 0.005), dark, 0.6 * sgn, -0.515, -0.12);
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 2; j++) {
          const lit = (i + j) % 3 === 0;
          add(rbox(0.035, 0.012, 0.035, 0.006), lit ? trim : dark, 0.6 * sgn + (j - 0.5) * 0.09, -0.505, -0.42 + i * 0.07);
        }
      // canopy sill rail
      add(rbox(0.07, 0.07, 1.9, 0.025), frame, 0.95 * sgn, -0.52, -0.1);
    }
    // throttle (left) and flight stick (right)
    add(new THREE.CylinderGeometry(0.012, 0.016, 0.2, 12), frame, -0.56, -0.43, -0.08, 0.35);
    add(rbox(0.07, 0.05, 0.11, 0.02), seatMat, -0.56, -0.33, -0.12, 0.35);
    add(new THREE.CylinderGeometry(0.014, 0.02, 0.22, 12), frame, 0.56, -0.42, -0.06, 0.12);
    add(new THREE.CapsuleGeometry(0.026, 0.07, 6, 12), seatMat, 0.56, -0.29, -0.075, 0.12);
    add(new THREE.SphereGeometry(0.008, 10, 8), warm, 0.56, -0.24, -0.08);

    // ── seat
    add(rbox(0.56, 0.12, 0.52, 0.05), seatMat, 0, -0.74, 0.2);
    add(rbox(0.58, 0.9, 0.13, 0.06), seatMat, 0, -0.27, 0.5, -0.13);
    add(rbox(0.32, 0.2, 0.1, 0.05), seatMat, 0, 0.24, 0.56, -0.13);
    for (const sgn of [-1, 1]) add(rbox(0.08, 0.7, 0.2, 0.04), seatMat, 0.29 * sgn, -0.33, 0.47, -0.13);

    // ── floor
    add(rbox(1.85, 0.05, 2.1, 0.02), dark, 0, -1.02, 0.05);
    for (let i = 0; i < 5; i++) add(rbox(1.5, 0.006, 0.01, 0.003), i % 2 ? dark : trim, 0, -0.993, -0.75 + i * 0.25);

    // ── canopy frame: beveled members (rounded-rectangle section swept along curves)
    const section = new THREE.Shape();
    const sw = 0.014, sh = 0.022, sr = 0.006;
    section.moveTo(-sw + sr, -sh);
    section.lineTo(sw - sr, -sh);
    section.quadraticCurveTo(sw, -sh, sw, -sh + sr);
    section.lineTo(sw, sh - sr);
    section.quadraticCurveTo(sw, sh, sw - sr, sh);
    section.lineTo(-sw + sr, sh);
    section.quadraticCurveTo(-sw, sh, -sw, sh - sr);
    section.lineTo(-sw, -sh + sr);
    section.quadraticCurveTo(-sw, -sh, -sw + sr, -sh);
    const sweep = (pts: THREE.Vector3[]) => {
      // smooth shading: weld the swept vertices so the members read as one continuous part
      let g: THREE.BufferGeometry = new THREE.ExtrudeGeometry(section, { steps: 96, bevelEnabled: false, extrudePath: new THREE.CatmullRomCurve3(pts) });
      g.deleteAttribute('uv');
      g.deleteAttribute('normal');
      g = mergeVertices(g, 1e-4);
      g.computeVertexNormals();
      return add(g, graphite, 0, 0, 0);
    };
    // windscreen bow (frames the forward view, high above the eye line)
    sweep([new THREE.Vector3(-0.93, -0.5, -0.96), new THREE.Vector3(-0.7, 0.18, -0.86), new THREE.Vector3(0, 0.5, -0.66), new THREE.Vector3(0.7, 0.18, -0.86), new THREE.Vector3(0.93, -0.5, -0.96)]);
    // rear hoop behind the head
    sweep([new THREE.Vector3(-0.95, -0.5, 0.62), new THREE.Vector3(-0.72, 0.32, 0.6), new THREE.Vector3(0, 0.62, 0.55), new THREE.Vector3(0.72, 0.32, 0.6), new THREE.Vector3(0.95, -0.5, 0.62)]);
    // spine joining them overhead
    sweep([new THREE.Vector3(0, 0.5, -0.66), new THREE.Vector3(0, 0.64, -0.05), new THREE.Vector3(0, 0.62, 0.55)]);

    // ── canopy glass: barely-there reflections that tell you a shell surrounds you
    const glass = new THREE.Mesh(
      new THREE.SphereGeometry(1.25, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
      new THREE.ShaderMaterial({
        vertexShader: GLASS_VERT,
        fragmentShader: GLASS_FRAG,
        uniforms: { uEnv: this.shared.uEnv, uEnvMode: this.shared.uEnvMode, uExposure: this.shared.uExposure },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    glass.position.set(0, -0.48, -0.15);
    glass.renderOrder = 20;
    this.body.add(glass);

    // panel anchors (instrument displays attach here)
    const anchor = (name: string, x: number, y: number, z: number, rx: number, ry: number) => {
      const o = new THREE.Object3D();
      o.position.set(x, y, z);
      o.rotation.set(rx, ry, 0, 'YXZ');
      this.body.add(o);
      this.panelAnchors[name] = o;
    };
    anchor('left', -0.52, -0.385, -0.78, -0.42, 0.32);
    anchor('center', 0, -0.37, -0.81, -0.42, 0);
    anchor('right', 0.52, -0.385, -0.78, -0.42, -0.32);
    anchor('status', 0, -0.17, -0.97, -0.12, 0);
    anchor('legend', 0.6, -0.49, -0.25, -1.2, -0.5);
    anchor('menu', -0.6, -0.495, -0.3, -1.25, 0.4);
  }

  private mat(hex: number, metal: number, emissive = new THREE.Color(0, 0, 0)) {
    const m = litMaterial(this.shared, hex, metal, emissive);
    this.materials.push(m);
    return m;
  }

  /** Apply structural deformation: symmetric stretch matrix (body frame). */
  setDeformation(m: THREE.Matrix4) {
    this.body.matrixAutoUpdate = false;
    this.body.matrix.copy(m);
    this.body.matrixWorldNeedsUpdate = true;
  }
}

export type LitShared = Cockpit['shared'];

/** Environment-lit material sharing light uniforms (cockpit, observer deck). */
export function litMaterial(shared: LitShared, hex: number, metal: number, emissive = new THREE.Color(0, 0, 0)) {
  const c = new THREE.Color(hex);
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      ...shared,
      uAlbedo: { value: new THREE.Vector3(c.r, c.g, c.b).multiplyScalar(1.6) },
      uEmissive: { value: new THREE.Vector3(emissive.r, emissive.g, emissive.b) },
      uMetal: { value: metal },
    },
    side: THREE.DoubleSide,
  });
}

/** A small observation platform for the EXTERNAL OBSERVER view. */
export function makeObserverDeck(shared: LitShared): THREE.Group {
  const g = new THREE.Group();
  const floor = litMaterial(shared, 0x1d2228, 0.4);
  const rail = litMaterial(shared, 0x4a5058, 0.8);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.06, 48), floor);
  ring.position.y = -1.25;
  g.add(ring);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.025, 8, 64), rail);
  torus.rotation.x = Math.PI / 2;
  torus.position.y = -0.25;
  g.add(torus);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 8), rail);
    post.position.set(Math.cos(a) * 1.5, -0.75, Math.sin(a) * 1.5);
    g.add(post);
  }
  return g;
}

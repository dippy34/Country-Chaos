/**
 * The pilot's cockpit: an open-canopy frame designed to keep the view of the
 * sky unobstructed in VR while giving near-field reference geometry (struts,
 * dashboard, seat) — the near reference is what makes the far objects feel
 * enormous. Lit by the actual light field: direct starlight, planet-shine and,
 * near black holes, the ray-traced environment (lensed disk light).
 */
import * as THREE from 'three';

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
  vec3 col = min((diffuse + spec + refl) * uExposure + uEmissive, vec3(6e4));
  gl_FragColor = vec4(col, 1.0);
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
    const hull = this.mat(0x2a2f36, 0.6);
    const dark = this.mat(0x15181c, 0.3);
    const strut = this.mat(0x3b4048, 0.8);
    const accent = this.mat(0x101418, 0.2, new THREE.Color(0.0, 0.25, 0.35));

    const box = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, 0);
      this.body.add(mesh);
      return mesh;
    };
    // floor, seat, consoles, dashboard
    box(1.8, 0.05, 2.2, dark, 0, -1.0, 0.1);
    box(0.58, 0.1, 0.55, hull, 0, -0.72, 0.18);
    box(0.6, 1.05, 0.12, hull, 0, -0.22, 0.5, -0.12);
    box(0.36, 0.13, 0.9, hull, -0.58, -0.58, -0.15);
    box(0.36, 0.13, 0.9, hull, 0.58, -0.58, -0.15);
    box(1.75, 0.07, 0.5, hull, 0, -0.5, -0.82, -0.42);
    box(1.9, 0.5, 0.08, dark, 0, -0.78, -1.04);
    // throttle & stick
    box(0.05, 0.22, 0.05, accent, -0.55, -0.43, -0.05, 0.3);
    box(0.05, 0.25, 0.05, accent, 0.55, -0.43, -0.05, 0.1);

    // canopy struts (thin, to keep the view open)
    const tube = (pts: THREE.Vector3[], r: number) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r, 8, false), strut);
      this.body.add(mesh);
    };
    // overhead hoop (behind the eye line, keeps the forward view clear)
    tube([new THREE.Vector3(-0.38, 0.5, 0.35), new THREE.Vector3(0, 0.62, 0.3), new THREE.Vector3(0.38, 0.5, 0.35)], 0.02);
    for (const s of [-1, 1]) {
      tube([new THREE.Vector3(0.9 * s, -0.55, -0.95), new THREE.Vector3(0.82 * s, 0.05, -0.7), new THREE.Vector3(0.5 * s, 0.5, -0.1), new THREE.Vector3(0.35 * s, 0.55, 0.5), new THREE.Vector3(0.3 * s, 0.1, 0.8)], 0.024);
      tube([new THREE.Vector3(0.95 * s, -0.6, 0.6), new THREE.Vector3(0.95 * s, -0.55, -0.3), new THREE.Vector3(0.9 * s, -0.52, -0.95)], 0.03);
    }
    tube([new THREE.Vector3(-0.92, -0.53, -1.0), new THREE.Vector3(-0.45, -0.46, -1.08), new THREE.Vector3(0.45, -0.46, -1.08), new THREE.Vector3(0.92, -0.53, -1.0)], 0.03);

    // panel anchors (instrument displays attach here)
    const anchor = (name: string, x: number, y: number, z: number, rx: number, ry: number) => {
      const o = new THREE.Object3D();
      o.position.set(x, y, z);
      o.rotation.set(rx, ry, 0, 'YXZ');
      this.body.add(o);
      this.panelAnchors[name] = o;
    };
    anchor('left', -0.52, -0.395, -0.76, -0.42, 0.32);
    anchor('center', 0, -0.37, -0.8, -0.42, 0);
    anchor('right', 0.52, -0.395, -0.76, -0.42, -0.32);
    anchor('status', 0, -0.255, -0.92, -0.25, 0);
    anchor('legend', 0.6, -0.5, -0.2, -1.2, -0.5);
    anchor('menu', -0.6, -0.5, -0.2, -1.2, 0.5);
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

/**
 * Background dome centred on the viewer.
 *  - mode 0: static sky at infinity with special-relativistic aberration and
 *    exact blackbody Doppler shift for the ship's velocity (Newtonian systems).
 *  - mode 1: the ray-traced Kerr radiance cube (already in the ship/observer
 *    body frame and pre-exposed).
 */
import * as THREE from 'three';
import { BB_GLSL } from './blackbody';

const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;

const FRAG = /* glsl */ `
uniform int uMode;
uniform samplerCube uSky;
uniform samplerCube uTraced;
uniform sampler2D uBB;
uniform mat3 uSkyRot;     // body frame → galactic sky frame
uniform vec3 uBeta;       // ship velocity in body frame (units of c)
uniform float uExposure;
varying vec3 vDir;
${BB_GLSL}
void main() {
  vec3 n = normalize(vDir);
  vec3 col;
  if (uMode == 1) {
    col = texture(uTraced, n).rgb;
  } else {
    float b2 = dot(uBeta, uBeta);
    vec3 src = n;
    float g = 1.0;
    if (b2 > 1e-12) {
      float b = sqrt(b2);
      vec3 bh = uBeta / b;
      float gam = inversesqrt(1.0 - b2);
      float bn = dot(uBeta, n);
      // direction to the source in the rest frame, and Doppler factor E_obs/E_emit
      src = normalize((n + bh * ((gam - 1.0) * dot(bh, n) - gam * b)) / (gam * (1.0 - bn)));
      g = 1.0 / (gam * (1.0 - bn));
    }
    vec4 s = texture(uSky, uSkyRot * src);
    float L = s.r * 1e-3;
    float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
    // surface brightness transforms as g^4 bolometrically; exact for blackbodies via T -> gT
    float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
    col = bbChroma(g * T) * L * ratio * uExposure;
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export class SkyDome {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.ShaderMaterial;

  constructor(sky: THREE.Texture, bb: THREE.Texture) {
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uMode: { value: 0 },
        uSky: { value: sky },
        uTraced: { value: null },
        uBB: { value: bb },
        uSkyRot: { value: new THREE.Matrix3() },
        uBeta: { value: new THREE.Vector3() },
        uExposure: { value: 1 },
      },
      side: THREE.BackSide,
      depthTest: false,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -1000;
  }

  useTraced(cube: THREE.Texture) {
    this.material.uniforms.uMode.value = 1;
    this.material.uniforms.uTraced.value = cube;
  }

  useStatic(skyRotBodyToGal: THREE.Matrix3, betaBody: THREE.Vector3, exposure: number) {
    const u = this.material.uniforms;
    u.uMode.value = 0;
    u.uSkyRot.value.copy(skyRotBodyToGal);
    u.uBeta.value.copy(betaBody);
    u.uExposure.value = exposure;
  }
}

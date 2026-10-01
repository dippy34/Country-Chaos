/**
 * Tidal tensor (electric part of the Riemann tensor) measured in an arbitrary
 * observer frame:  E_jk = R_{α β γ δ} e_j^α u^β e_k^γ u^δ.
 *
 * Geodesic deviation: the acceleration of a point at body-frame offset ξ relative
 * to the ship's centre of mass is a_j = −E_jk ξ^k (stretching where E has a
 * negative eigenvalue). Christoffel symbols are analytic; the Riemann tensor uses
 * a central difference of them, which is accurate to ~1e-8 relative in double.
 */
import { KerrParams, ksR, lower } from './kerr';
import { Tetrad } from './frames';

interface Grad {
  r: number;
  f: number;
  l: number[];
  df: number[];
  dl: number[][]; // dl[i][j] = ∂_i l_j
}

function ksGrad(k: KerrParams, x: number, y: number, z: number): Grad {
  const { M, a } = k;
  const a2 = a * a, z2 = z * z;
  const r = ksR(a, x, y, z);
  const r2 = r * r, r3 = r2 * r;
  const D = r2 * r2 + a2 * z2;
  const A = r2 + a2;
  const f = (2 * M * r3) / D;
  const l = [(r * x + a * y) / A, (r * y - a * x) / A, z / r];
  const dr = [(r3 * x) / D, (r3 * y) / D, (r * z * A) / D];
  const cf = (2 * M * r2 * (3 * a2 * z2 - r2 * r2)) / (D * D);
  const df = [cf * dr[0], cf * dr[1], cf * dr[2] - (4 * M * a2 * z * r3) / (D * D)];
  const dl: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const dx = i === 0 ? 1 : 0, dy = i === 1 ? 1 : 0, dz = i === 2 ? 1 : 0;
    dl.push([
      (x * dr[i] + r * dx + a * dy) / A - (l[0] * 2 * r * dr[i]) / A,
      (y * dr[i] + r * dy - a * dx) / A - (l[1] * 2 * r * dr[i]) / A,
      dz / r - (z * dr[i]) / r2,
    ]);
  }
  return { r, f, l, df, dl };
}

/** Christoffel symbols Γ^a_{bc} at a point, as a flat 64-array [a*16 + b*4 + c]. */
export function christoffel(k: KerrParams, x: number, y: number, z: number): Float64Array {
  const G = ksGrad(k, x, y, z);
  const L = [1, G.l[0], G.l[1], G.l[2]];
  const Lu = [-1, G.l[0], G.l[1], G.l[2]];
  const eta = [-1, 1, 1, 1];
  const ginv = (m: number, n: number) => (m === n ? eta[m] : 0) - G.f * Lu[m] * Lu[n];
  // dg[c][m][n] = ∂_c g_mn
  const dg = (c: number, m: number, n: number) => {
    if (c === 0) return 0;
    const i = c - 1;
    const dLm = m === 0 ? 0 : G.dl[i][m - 1];
    const dLn = n === 0 ? 0 : G.dl[i][n - 1];
    return G.df[i] * L[m] * L[n] + G.f * (dLm * L[n] + L[m] * dLn);
  };
  const lowerG = new Float64Array(64); // Γ_{d b c}
  for (let d = 0; d < 4; d++)
    for (let b = 0; b < 4; b++)
      for (let c = b; c < 4; c++) {
        const v = 0.5 * (dg(b, d, c) + dg(c, d, b) - dg(d, b, c));
        lowerG[d * 16 + b * 4 + c] = v;
        lowerG[d * 16 + c * 4 + b] = v;
      }
  const out = new Float64Array(64);
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 4; b++)
      for (let c = 0; c < 4; c++) {
        let s = 0;
        for (let d = 0; d < 4; d++) s += ginv(a, d) * lowerG[d * 16 + b * 4 + c];
        out[a * 16 + b * 4 + c] = s;
      }
  return out;
}

/** Riemann tensor R^a_{bcd} as flat 256-array [a*64 + b*16 + c*4 + d]. */
export function riemann(k: KerrParams, x: number, y: number, z: number): Float64Array {
  const r = ksR(k.a, x, y, z);
  const h = 1e-5 * Math.max(r, 0.05);
  const G0 = christoffel(k, x, y, z);
  const dG: Float64Array[] = [new Float64Array(64)];
  const pos = [x, y, z];
  for (let i = 0; i < 3; i++) {
    const pp = pos.slice(), pm = pos.slice();
    pp[i] += h;
    pm[i] -= h;
    const Gp = christoffel(k, pp[0], pp[1], pp[2]);
    const Gm = christoffel(k, pm[0], pm[1], pm[2]);
    const d = new Float64Array(64);
    for (let j = 0; j < 64; j++) d[j] = (Gp[j] - Gm[j]) / (2 * h);
    dG.push(d);
  }
  const R = new Float64Array(256);
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 4; b++)
      for (let c = 0; c < 4; c++)
        for (let d = 0; d < 4; d++) {
          let v = dG[c][a * 16 + d * 4 + b] - dG[d][a * 16 + c * 4 + b];
          for (let e = 0; e < 4; e++)
            v += G0[a * 16 + c * 4 + e] * G0[e * 16 + d * 4 + b] - G0[a * 16 + d * 4 + e] * G0[e * 16 + c * 4 + b];
          R[a * 64 + b * 16 + c * 4 + d] = v;
        }
  return R;
}

/** Tidal tensor E_jk (3x3, frame components) for the observer described by tetrad t at position pos. */
export function tidalTensor(k: KerrParams, pos: ArrayLike<number>, t: Tetrad): number[][] {
  const R = riemann(k, pos[0], pos[1], pos[2]);
  const u = t.e[0];
  // W^a_c = R^a_{b c d} u^b u^d
  const W = new Float64Array(16);
  for (let a = 0; a < 4; a++)
    for (let c = 0; c < 4; c++) {
      let s = 0;
      for (let b = 0; b < 4; b++)
        for (let d = 0; d < 4; d++) s += R[a * 64 + b * 16 + c * 4 + d] * u[b] * u[d];
      W[a * 4 + c] = s;
    }
  const E: number[][] = [];
  for (let j = 1; j < 4; j++) {
    const ej = lower(t.point, t.e[j], [0, 0, 0, 0]);
    const row: number[] = [];
    for (let kk = 1; kk < 4; kk++) {
      const ek = t.e[kk];
      let s = 0;
      for (let a = 0; a < 4; a++) for (let c = 0; c < 4; c++) s += ej[a] * W[a * 4 + c] * ek[c];
      row.push(s);
    }
    E.push(row);
  }
  // symmetrise away round-off
  for (let i = 0; i < 3; i++)
    for (let j = i + 1; j < 3; j++) {
      const m = 0.5 * (E[i][j] + E[j][i]);
      E[i][j] = m;
      E[j][i] = m;
    }
  return E;
}

/** Jacobi eigen-decomposition of a symmetric 3x3 matrix. Returns ascending eigenvalues with eigenvectors (columns). */
export function eigenSym3(Min: number[][]): { values: number[]; vectors: number[][] } {
  const A = Min.map((r) => r.slice());
  const V = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let sweep = 0; sweep < 50; sweep++) {
    const off = A[0][1] ** 2 + A[0][2] ** 2 + A[1][2] ** 2;
    if (off < 1e-30 * (A[0][0] ** 2 + A[1][1] ** 2 + A[2][2] ** 2 + 1e-300)) break;
    for (let p = 0; p < 2; p++)
      for (let q = p + 1; q < 3; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < 3; k++) {
          const akp = A[k][p], akq = A[k][q];
          A[k][p] = c * akp - s * akq;
          A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < 3; k++) {
          const apk = A[p][k], aqk = A[q][k];
          A[p][k] = c * apk - s * aqk;
          A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < 3; k++) {
          const vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
      }
  }
  const idx = [0, 1, 2].sort((i, j) => A[i][i] - A[j][j]);
  return {
    values: idx.map((i) => A[i][i]),
    vectors: idx.map((i) => [V[0][i], V[1][i], V[2][i]]),
  };
}

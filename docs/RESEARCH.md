# Research and reuse review

Your brief asked for existing scientifically grounded black-hole renderers, relativistic
ray-tracing techniques and astronomical rendering implementations to be investigated, for
legal and practical reuse, before writing anything from scratch. This is that review.
Licences were checked on the projects' repositories (October 2026).

## Black-hole rendering and GR ray tracing

| Project / source | What it does | Licence | Decision |
|---|---|---|---|
| **Eric Bruneton, *Real-time High-Quality Rendering of Non-Rotating Black Holes*** (arXiv:2010.08735), `ebruneton/black_hole_shader` | WebGL2. Schwarzschild beam tracing with precomputed deflection tables; very high quality star rendering, disk, Doppler. | BSD-3-Clause | **Studied, not adopted as the core.** Its precomputed tables rely on spherical symmetry, so they cannot represent Kerr spin (frame dragging, asymmetric shadow) or an observer inside the horizon, and both are hard requirements here. Its ideas informed the design: surface-brightness-conserving star filtering, and treating the sky as photometric data. It is licence-compatible for a future Schwarzschild "ultra" path or for its star-rendering technique. |
| **Odyssey** (Pu et al. 2016, `hungyipu/Odyssey`) | CUDA Kerr ray tracing + radiative transfer, adaptive RK, Boyer–Lindquist. | GPL-3.0 | **Not reused.** GPL would force the whole project to GPL. It is also CUDA (not WebGL), and Boyer–Lindquist coordinates are singular at the horizon. Used as a reference for validation targets. |
| **GYOTO**, **ipole**, **RAPTOR** | Research-grade GR ray tracers and polarised radiative transfer. | GPL-3.0 / GPL-family (as distributed) | Not real-time; licences incompatible with embedding. References only. |
| **"Rendering a black hole that spins"** (Kerr–Schild Hamiltonian tutorial) | Real-time Kerr in Cartesian Kerr–Schild coordinates, RK4, tetrad cameras, flips the full 4-momentum for backward tracing. | No licence stated | **Technique adopted** (the formulation is standard GR, not copyrightable); **no code copied**. Lightcone uses an *analytic* metric gradient instead of the tutorial's numerical one: about 6× fewer metric evaluations per step, checked against finite differences in `tests/kerr.test.ts`. |
| **NASA Goddard SVS 14585 / 14818**, J. Schnittman & B. Powell (2024), *"Plunge into a black hole"* | Supercomputer visualisation of falling into a 4.3×10⁶ M☉ hole: aberration compressing the sky forward, Doppler brightening ahead, photon ring at ~15.5 M mi, horizon at ~7.8 M mi; "spaghettification … around 79,500 miles from the singularity". | Public domain (NASA) visual reference | **Visual/physical reference.** Lightcone's Sgr A* scale and inside-horizon behaviour match: horizon radius 0.085 AU at a = 0; the ship reaches the inner horizon of an a = 0.9 hole intact, consistent with destruction only ~10⁵ km from the centre for a = 0. |
| **A. Hamilton (JILA), Black Hole Flight Simulator**; Hamilton & Polhemus (2010), *Stereoscopic visualization in curved spacetime: seeing deep inside a black hole*; Hamilton & Lisle (2008), *The river model of black holes* | What an infaller sees inside the horizon; the inner-horizon instability (mass inflation). | Papers / visual reference | **Conceptual reference** for the inside-horizon view and for drawing the line at the inner horizon. |
| **Luminet (1979); James, von Tunzelmann, Franklin & Thorne (2015)**, *Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar* | Thin-disk appearance; DNGR ray-bundle method. | Papers | Reference for disk appearance and the ray-differential (ray-bundle) idea behind the filtered sky lookup. |
| **Page & Thorne (1974); Novikov & Thorne (1973); Bardeen, Press & Teukolsky (1972)** | Disk flux, ISCO, circular orbits. | Papers | Implemented directly and validated (`tests/kerr.test.ts`). |
| **Chandrasekhar (1960)**, *Radiative Transfer* | Electron-scattering limb darkening. | — | Used for disk limb darkening. |

## Atmospheres, colour and photometry

| Source | Licence | Decision |
|---|---|---|
| **Bruneton, *Precomputed Atmospheric Scattering*** (`ebruneton/precomputed_atmospheric_scattering`) | BSD (WebGL demo available) | **Good candidate for a later quality tier** (multiple scattering for gas giants and Earth-like planets). Not used yet: its 4D precomputation is tuned for Earth-like atmospheres and adds significant setup cost. A lighter analytic single-scattering model is used now. |
| **Wyman, Sloan & Shirley (2013)**, *Simple Analytic Approximations to the CIE XYZ Color Matching Functions*, JCGT 2(2) | Paper | Implemented (`src/render/blackbody.ts`). |
| **CIE disability-glare (Stiles–Holladay) formula** | Standard | Used for glare around bright stars instead of artistic bloom. |
| **Minnaert (1941)** reflectance | Paper | Cloud-deck shading. |

## Data used

* Jupiter and Galilean moon radii, masses, periods, J₂, flattening: NASA/JPL fact sheets.
* Sun: IAU 2015 nominal values. Betelgeuse: ~764 R☉, ~3,600 K, ~18 M☉ (literature values
  vary widely, as noted in-game).
* Sgr A*: 4.3×10⁶ M☉. M87*: 6.5×10⁹ M☉ (EHT 2019). TON 618: ~6.6×10¹⁰ M☉ (uncertain).
* Equatorial → galactic rotation: the standard J2000 matrix.

## Summary

No external code was copied into this repository. Everything was written for this project
and released under MIT. Two BSD projects by Eric Bruneton are legally reusable and noted as
upgrade paths. GPL tracers were deliberately not used.

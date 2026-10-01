# Physics model

This document lists what Lightcone simulates, how, and how much to trust each piece. The
in-game **"What you are seeing"** panel shows the same three-tier classification live:

| Tier | Meaning |
|---|---|
| **Established** | Predicted by general relativity (or Newtonian gravity, where that is accurate). The code solves the actual equations. |
| **Approximated** | Real-time shortcuts. The physics is known, but we compute a simplified version. |
| **Speculative** | Regions where established physics does not tell us what an observer meets. Nothing there is shown as fact. |

---

## 1. Black holes (Kerr spacetime)

### 1.1 Coordinates and units — *established*
* Kerr metric in **Cartesian Kerr–Schild** form, `g = η + f l⊗l` (`src/physics/kerr.ts`).
  These coordinates are regular across the future event horizon. That is why the ship and
  the backward-traced light rays carry on through `r = r₊` instead of hitting a coordinate
  singularity, as they would in Boyer–Lindquist coordinates.
* Geometric units with `M = 1` internally. SI comes from `GM/c²` (length), `GM/c³` (time),
  and `(GM/c³)⁻²` (tidal tensor).
* Mass, spin `a/M ∈ [0, 0.998]`, spin-axis orientation, disk on/off and accretion rate can all
  be changed per hole (desktop panel).

### 1.2 Geodesics — *established* (integrator: *approximated*)
* Super-Hamiltonian `H = ½ g^{μν} p_μ p_ν` with an **analytic metric gradient**: no finite
  differences. The same equations run in TypeScript (double precision; ship, observer) and in
  GLSL (single precision; the ray tracer).
* Classical RK4 with step size proportional to `r`. Null rays are renormalised onto `H = 0`.
  Validated in `tests/kerr.test.ts` against:
  * the ISCO and photon-orbit radii;
  * circular-orbit angular velocity `Ω = 1/(r^{3/2} + a)`;
  * weak-field deflection `4M/b + 15πM²/4b²`;
  * radial light delay `Δt = Δr + 4M ln(...)`;
  * static redshift `√(1 − 2M/r)`;
  * `H` conservation along strongly bent Kerr rays.

### 1.3 The ship — *established*
* State: position `x^μ` and covariant 4-velocity `u_μ`, advanced in **proper time** with
  `du_μ/dτ = −∂_μH + a_μ`, where `a` is the engine 4-force built from the body tetrad.
  There is no scripted motion: gravity, frame dragging, the horizon and the pilot's thrust all
  act on this one state.
* Free fall from rest reproduces the textbook cycloid `τ(r)`. Hovering needs
  `a = M/(r²√(1−2M/r))`, which diverges at the horizon. The HUD shows this as **"Hover needs
  … g"** and switches to *impossible* inside the horizon (`tests/ship.test.ts`).
* Station-keeping uses the true ZAMO 4-acceleration `u^ν∇_ν u^μ` as feed-forward, limited to
  a 30 g engine. Near Sgr A* it saturates long before the horizon, which is itself a lesson.
* *Approximated:* the ship's attitude is referenced to the boosted Kerr–Schild "normal"
  observer frame, not Fermi–Walker transported. Gyroscope (geodetic and Lense–Thirring)
  precession is therefore not shown.

### 1.4 What the pilot sees — *established* (resolution and step limits: *approximated*)
GPU tracer, `src/render/kerrTracer.ts`:
1. For every texel of a cube map centred on the pilot, a photon is launched backward with
   `p' = −e₀ + n^i e_i` from the pilot's tetrad. **Aberration and the Doppler shift from the
   ship's own motion are therefore exact**, at any speed, inside or outside the horizon.
2. Rays are integrated through Kerr–Schild spacetime. Multiple images, Einstein rings, the
   photon ring and the shadow emerge on their own; none of them is drawn.
3. **Disk hits:** a thin Novikov–Thorne disk (below). The frequency ratio
   `g = 1/(p'_μ u^μ_disk)` combines gravitational redshift, Doppler beaming and frame
   dragging. Because `I_ν/ν³` is invariant, a blackbody at `T` is observed as a blackbody at
   `gT` **exactly**. The renderer looks that up in a CIE-integrated Planck table, so colour
   *and* brightness shifts are photometric, not tinted.
4. **Light-travel time across the disk:** the disk texture is evaluated at the coordinate time
   *of emission* (`t_cam + Δt_ray`), so the far side of the disk appears as it was earlier.
5. **Escaping rays** sample the sky at infinity with `g = 1/p'_t`. Stars ahead blueshift and
   brighten when you fall fast; deep in the well everything blueshifts.
6. Both eyes share the cube map. The interocular baseline is about 10⁻¹² of the scales
   involved, so this is not an approximation in practice, and it keeps head rotation
   latency-free.

*Approximations:*
* Cube-map resolution (192–768 px per face, adaptive to frame rate).
* RK4 step sizes.
* Beyond `r_far` (≥ 200 M), rays use the analytic weak-field deflection
  `(2M/b)(1 − cos ψ)` instead of integration.
* Ray-differential (`textureGrad`) filtering of the sky, which conserves surface brightness
  but blurs star images that are strongly sheared by lensing.

### 1.5 The accretion disk — *approximated*
* Page–Thorne flux with zero torque at the ISCO, computed numerically for the actual spin.
  Effective temperature `T = (F/σ)^¼` from `Ṁ = ṁ L_Edd / (η c²)`.
  Validated against the closed-form Schwarzschild result.
* Geometrically thin, optically thick, local blackbody, with a Chandrasekhar limb-darkening
  law. No colour correction, corona, jets, warps, or emission inside the ISCO.
* Turbulent structure is procedural. It co-rotates at the local Keplerian `Ω(r)` and is
  re-seeded every two orbits to bound shear.
* **Accretion rates are chosen for survivability.** The disk's light heats the hull through
  `F = L/(4πd²)`, and an actively accreting hole (even 1 % of Eddington at Sgr A*) would
  vaporise the ship many radii out. Default rates are therefore 10⁻¹³ to 10⁻⁴ Eddington,
  which gives ~3,000–5,500 K disks. Hotter disks are available on the slider, and they heat you.
* Bigger holes have cooler disks (`T ∝ M^{-¼}`), so the colour palette varies physically
  from hole to hole.
* Real Sgr A* and M87* host hot, radiatively inefficient flows rather than thin disks. Their
  disks are labelled illustrative in-game and can be switched off.

### 1.6 Tidal forces and damage — *established* loads, *approximated* materials
* `E_jk = R_{αβγδ} e_j^α u^β e_k^γ u^δ` in the ship's own frame. Christoffel symbols are
  analytic; the Riemann tensor is a central difference of them.
* Validated:
  * Schwarzschild `(−2, 1, 1) M/r³`, for static and radially boosted observers;
  * the Kerr on-axis `Re ψ₂` result;
  * tracelessness.
* Structure model (`src/physics/structure.ts`): for each principal axis with eigenvalue `λ`,
  peak stress is `σ ≈ ρ_eff |λ| ℓ²/2`. Material: a titanium-alloy-class truss, σ_y ≈ 0.9 GPa,
  ρ_eff = 400 kg/m³.
* **Response is progressive:** stress readout, instrument failures (probability rises past
  ~55 % of yield), plastic stretching along the tidal axis (the cockpit visibly deforms),
  loss of integrity, then catastrophic failure at the ultimate strength.
* The pilot's head-to-seat differential acceleration (1.8 m) drives the crew state
  *aware → strained → injured → incapacitated → killed*. The thresholds are rough
  physiological estimates.
* **The horizon is not a trigger.** Nothing in the code refers to `r₊` when computing damage:
  * a 10 M☉ hole kills the pilot near ~1,500 km and breaks the ship near ~850 km, both far
    outside its ~26 km horizon;
  * at Sgr A* the tides at the horizon are ~10⁻³ s⁻², and you cross intact;
  * `tests/structure.test.ts` checks both cases and the `1/M²` scaling.

### 1.7 Inside the horizon
* *Established:* the ship keeps following the Kerr geodesic equation across `r₊` in
  Kerr–Schild coordinates. The view is still ray-traced. Past-directed light reaches you from
  outside, so **the screen does not go black**: you see the external universe and the disk,
  increasingly distorted. dτ/dt, the redshift readouts and the tides all continue.
* *Speculative, shown as black and labelled:* some sky directions trace back toward the
  horizon branch that, in the idealised eternal Kerr solution, leads to a white hole or
  "other universe". No physical source exists there for a hole formed by collapse.
* *Speculative, not rendered:* the inner (Cauchy) horizon `r₋` of a spinning hole. Linear and
  nonlinear analyses (Poisson–Israel mass inflation) indicate it is unstable. What an observer
  would meet there is not known. **The simulation stops at `r₋`** and says why. For `a = 0`
  it stops near `r → 0`, where classical GR itself breaks down. In practice, tides destroy a
  real ship before then.

### 1.8 EXTERNAL (RELATIVISTIC) OBSERVER — *established* (Jacobian sizing: *approximated*)
`src/physics/observer.ts`, `src/render/kerrView.ts`:
* A **static observer** far out (outside the ergoregion). Its view is ray-traced from its own
  tetrad, so it is a different camera with a different past light cone, not the pilot's camera
  moved.
* The ship's worldline is recorded densely, logarithmically near `r₊`. For each event, a
  shooting solve finds the connecting null geodesic and gives:
  * the arrival time `t_emit + Δt`;
  * the lensed direction;
  * `g = E_obs/E_emit`, from the actual photon momentum at both ends;
  * an angular-diameter distance from the ray Jacobian;
  * the direction in the ship's frame from which the photon left (so you see the correct side).
* At observer time `T`, you see the event whose light arrives at `T`. Near the horizon the
  delay diverges logarithmically, so the image **slows, freezes, reddens and dims**:
  `ln g` falls with slope `−κ` (the horizon's surface gravity, `1/4M` for Schwarzschild),
  as `tests/ship.test.ts` checks.
* Colours use the same `T → gT` blackbody transform. A tracking **telescope** panel with an
  auto-gain sensor (capped at 10⁶) shows the ship. Once `g` drops far enough, the ship falls
  below the sensor's reach, so it fades from practical visibility instead of being switched off.
* At system arrival the ship's coasting orbit is integrated backward (`preroll`), so the
  observer sees a past rather than an empty sky for the first light-crossing time.
* *Approximated:* primary image only (no secondary or photon-ring images of the ship); ship
  illumination from a single key light estimated from the disk; image distortion limited to
  the Jacobian's area scale.
* "Now" for the observer is defined by the Kerr–Schild time slicing. That is a convention,
  but the **received image does not depend on it**.

---

## 2. Stars and planets (Newtonian + special relativity)

`src/world/newtonianWorld.ts`, `src/render/bodies.ts`

* Point-mass gravity of every body, plus Jupiter's J₂ (0.014736). Orbits are analytic and
  circular with real radii and periods (*approximated*: phases are illustrative).
* Ship kinematics are **special-relativistic**: `d(γv)/dt` from the engine's proper
  acceleration, with exact aberration and Doppler of the background sky. Proper time follows
  `dτ/dt = √(1 + 2Φ/c² − v²/c²)`, so even at Jupiter you can watch the 10⁻⁸-level
  gravitational time dilation in the HUD.
* **Atmosphere** (Jupiter): exponential density and pressure from the 1-bar level
  (H = 27 km), co-rotating with the planet, giving drag, Sutton–Graves-type stagnation
  heating, dynamic pressure, and hull crushing past 25 bar.
* **Stellar heating:** radiative equilibrium `T_hull = T_eff √(R/d)` for a sunward plate.
  The hull has a ~90 s thermal time constant (*approximated*).
* **Rendering at true scale:** bodies are analytic ray-cast spheres and spheroids (Jupiter's
  6.5 % oblateness included), placed in scaled space with exact angular size. Silhouettes stay
  exact from a sub-pixel dot to a limb that fills the view. Both eyes share the physical
  origin, so there is no false hyper-stereo that would shrink planets.
* **Lighting in physical units:** Planck × CIE photometry for every star; Minnaert scattering
  on cloud decks; single-scattering Rayleigh and haze in Jupiter's upper atmosphere, with a
  grazing Chapman column for twilight. Analytic soft eclipse shadows from moons (Io's shadow
  on Jupiter) and from Jupiter (moon eclipses). Planet-shine lights the cockpit.
* *Approximated:* cloud bands, the Great Red Spot, zonal winds, granulation, sunspots,
  supergiant convection cells and moon surfaces are procedural. They are statistically
  motivated, not mapped imagery.

## 3. Light, exposure and display — *approximated (physically motivated)*

* All shading is in **cd/m²**, from Planck spectra integrated against CIE 1931 matching
  functions (`src/render/blackbody.ts`; a 5772 K blackbody gives about 2×10⁹ cd/m², as the
  test checks).
* Eye adaptation (`src/render/exposure.ts`):
  * a wide center-weighted log-average, plus a 98th-percentile highlight term;
  * a 3° "foveal" meter, so whatever you look at drives adaptation;
  * faster adaptation to light than to dark;
  * a floor that keeps empty space black.
* Glare around bright stars uses the CIE (Stiles–Holladay) disability-glare law. It does not
  use arbitrary bloom.
* The background sky is procedural: about 200k stars with realistic magnitude counts and
  spectral mix, a dusty Milky Way, and faint galaxies. It is stored as luminance + colour
  temperature so relativistic shifts are exact for it too. *Approximated:* it is the same
  "sky at infinity" for every destination.

## 4. Known gaps (good next steps)

* Secondary and photon-ring images of the ship in the external view; ship self-occlusion.
* Volumetric or thick disks, coronae and jets; GRMHD-informed emissivity.
* Fermi–Walker transported attitude (precession made visible).
* Mapped textures (Juno/Cassini/Voyager mosaics) as an option for real planets.
* Multiple-scattering atmospheres (Bruneton's precomputed model is BSD-licensed; see
  [RESEARCH.md](RESEARCH.md)).
* A temporally reprojected tracer for standalone headsets: currently the cube map is
  re-traced every frame.

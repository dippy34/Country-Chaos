"""THE TENANT: the thing in the hallway.

A real human body (MakeHuman, see human.py) pushed just far enough past
human to be wrong. Very old, starved, too tall, a neck too long, arms that
hang past its knees, fingers too long. It smiles the way people smile in
photographs when someone off-camera is making them. The mouth is too wide
and the eyes take no part in it.
"""
import math
import os

import bpy
import numpy as np
from mathutils import Matrix, Vector
from PIL import Image

import human as HU

SKIN_TEX = os.path.join(HU.SYS, "skins", "old_caucasian_female", "old_lightskinned_female_diffuse.png")
EYE_TEX = os.path.join(HU.SYS, "eyes", "materials", "ice_eye.png")
TEETH_TEX = os.path.join(HU.SYS, "teeth", "teeth_base", "teeth.png")
MASKS = os.path.join(HU.MPFB, "textures")
CACHE = os.path.join(HU.ASSETS, "cache")

BODY = HU.macro_targets(gender=0.85, age=1.0, muscle=0.0, weight=0.0, height=1.0, proportions=0.0)

SHAPE = [
    # too tall in the wrong places
    ("neck/neck-scale-vert-incr", 1.6), ("neck/measure-neck-height-incr", 1.4),
    ("neck/neck-scale-horiz-decr", 0.7), ("neck/neck-scale-depth-decr", 0.5),
    ("arms/measure-upperarm-length-incr", 1.4), ("arms/measure-lowerarm-length-incr", 2.0),
    ("hands/l-hand-fingers-length-incr", 2.2), ("hands/r-hand-fingers-length-incr", 2.2),
    ("hands/l-hand-scale-incr", 0.6), ("hands/r-hand-scale-incr", 0.6),
    ("hands/l-hand-fingers-diameter-decr", 0.8), ("hands/r-hand-fingers-diameter-decr", 0.8),
    ("torso/torso-scale-horiz-decr", 0.25),
    ("stomach/stomach-tone-decr", 0.0),
    # a face that is nearly a face
    ("head/head-fat-decr", 1.0), ("head/head-age-incr", 1.0), ("head/head-scale-vert-incr", 0.35),
    ("head/head-oval", 0.6),
    ("cheek/l-cheek-volume-decr", 1.0), ("cheek/r-cheek-volume-decr", 1.0),
    ("cheek/l-cheek-bones-incr", 0.8), ("cheek/r-cheek-bones-incr", 0.8),
    ("eyes/l-eye-scale-incr", 0.7), ("eyes/r-eye-scale-incr", 0.7),
    ("eyes/l-eye-trans-out", 0.35), ("eyes/r-eye-trans-out", 0.35),
    ("eyes/l-eye-bag-incr", 0.9), ("eyes/r-eye-bag-incr", 0.9),
    ("eyes/l-eye-push1-in", 0.5), ("eyes/r-eye-push1-in", 0.5),
    ("mouth/mouth-scale-horiz-incr", 2.2), ("mouth/mouth-lowerlip-volume-decr", 0.6),
    ("mouth/mouth-upperlip-volume-decr", 0.6),
    ("nose/nose-scale-horiz-decr", 0.4), ("nose/nose-point-width-decr", 0.6),
    ("chin/chin-prominent-incr", 0.5), ("chin/chin-height-incr", 0.4),
    ("ears/l-ear-scale-decr", 0.3), ("ears/r-ear-scale-decr", 0.3),
]

UNITS = "expression/units/caucasian/"
# The smile. Teeth bared, corners hauled back, neck straining; eyes wide and uninvolved.
GRIN = [
    ("mouth-corner-puller", 1.2), ("mouth-upward-retraction", 1.2), ("mouth-depression-retraction", 1.2),
    ("neck-platysma", 1.0),
    ("eye-left-opened-up", 1.0), ("eye-right-opened-up", 1.0),
    ("nose-left-dilatation", 0.6), ("nose-right-dilatation", 0.6),
]
# ------------------------------------------------------------------ textures
def dead_eyes():
    """Drain the iris to a cataract grey and shrink the pupil to a pinprick,
    keeping the real iris fibres (radial remap of the photo)."""
    out = os.path.join(CACHE, "dead_eye.png")
    if os.path.exists(out):
        return out
    os.makedirs(CACHE, exist_ok=True)
    im = np.asarray(Image.open(EYE_TEX).convert("RGBA"), np.float32) / 255
    rgb, a = im[..., :3], im[..., 3:]
    h, w = rgb.shape[:2]
    mx, mn = rgb.max(-1), rgb.min(-1)
    sat = (mx - mn) / (mx + 1e-4)
    yy, xx = np.mgrid[0:h, 0:w]
    out_rgb = rgb.copy()
    iris_any = np.zeros((h, w), bool)
    for fx, fy in ((0.705, 0.293), (0.293, 0.705)):        # the two irises sit in opposite quadrants
        win = (np.abs(xx - fx * w) < 0.12 * w) & (np.abs(yy - fy * h) < 0.12 * h)
        dark = win & (mx < 0.15)
        cy, cx = yy[dark].mean(), xx[dark].mean()
        r_pup = np.sqrt(dark.sum() / np.pi) * 1.05
        radii = []                                         # walk out until the white of the eye
        for t in np.linspace(0, 2 * np.pi, 48, endpoint=False):
            for dd in range(int(r_pup) + 4, int(0.2 * w)):
                x, y = int(cx + dd * np.cos(t)), int(cy + dd * np.sin(t))
                if sat[y, x] < 0.12 and mx[y, x] > 0.45:
                    radii.append(dd)
                    break
        r_iris = float(np.median(radii))
        d = np.hypot(yy - cy, xx - cx)
        iris_any |= d < r_iris
        ang = np.arctan2(yy - cy, xx - cx)
        new_p = r_iris * 0.07
        inside = d < r_iris
        src_d = np.where(d < new_p, 0, r_pup + (d - new_p) * (r_iris - r_pup) / (r_iris - new_p))
        sx = np.clip(cx + src_d * np.cos(ang), 0, w - 1).astype(int)
        sy = np.clip(cy + src_d * np.sin(ang), 0, h - 1).astype(int)
        sample = rgb[sy, sx]
        lum = sample @ np.array([0.3, 0.59, 0.11])
        grey = np.stack([lum * 1.05 + 0.18, lum * 1.05 + 0.19, lum * 1.0 + 0.2], -1)
        grey = np.where((d < new_p)[..., None], 0.02, grey)
        ring = np.clip((d - r_iris * 0.86) / (r_iris * 0.14), 0, 1)[..., None]
        grey = grey * (1 - 0.65 * ring)
        out_rgb = np.where(inside[..., None], grey, out_rgb)
    # bloodshot, yellowed whites
    red = np.clip((rgb[..., 0] - rgb[..., 1]) * 4, 0, 1)[..., None]
    sclera = ~iris_any & (mx > 0.3)
    out_rgb = np.where(sclera[..., None], out_rgb * np.array([1.0, 0.93, 0.8]) - red * np.array([0, 0.25, 0.25]),
                       out_rgb)
    Image.fromarray((np.clip(np.concatenate([out_rgb, a], -1), 0, 1) * 255).astype(np.uint8)).save(out)
    return out


def image(path, colorspace="sRGB"):
    img = bpy.data.images.load(path, check_existing=True)
    img.colorspace_settings.name = colorspace
    return img


# ----------------------------------------------------------------- materials
def materials(Nodes, rgba):
    """Nodes/rgba come from build_scene so the shader helper is shared."""
    M = {}

    n = Nodes("TenantSkin")
    uv = n.node("ShaderNodeTexCoord").outputs["UV"]
    tex = n.node("ShaderNodeTexImage", {"Vector": uv}, image=image(SKIN_TEX))

    def mask(name):
        return n.node("ShaderNodeTexImage", {"Vector": uv},
                      image=image(os.path.join(MASKS, f"mpfb_{name}.jpg"), "Non-Color")).outputs["Color"]

    pale = n.node("ShaderNodeHueSaturation", {"Color": tex.outputs["Color"], "Saturation": 0.6, "Value": 0.78})
    pale = n.node("ShaderNodeGamma", {"Color": pale.outputs["Color"], "Gamma": 1.35})
    col = n.mix(1.0, pale.outputs["Color"], rgba(0.92, 0.94, 0.82), "MULTIPLY")      # jaundiced
    oc = n.coords("Object")
    oc = n.coords("Generated")                              # rest-pose space, so patterns stick to the skin
    livor = n.ramp(n.noise(oc, 6.0, 6, 0.62).outputs["Fac"], [(0.48, rgba(0, 0, 0)), (0.7, rgba(1, 1, 1))])
    col = n.mix(n.math("MULTIPLY", livor.outputs["Color"], 0.45), col, rgba(0.40, 0.28, 0.36))
    veins = n.ramp(n.noise(oc, 14.0, 12, 0.72).outputs["Fac"], [(0.485, rgba(0, 0, 0)), (0.5, rgba(1, 1, 1)), (0.515, rgba(0, 0, 0))])
    col = n.mix(n.math("MULTIPLY", veins.outputs["Color"], 0.45), col, rgba(0.22, 0.30, 0.46))
    necro = n.node("ShaderNodeAttribute", attribute_name="necrosis").outputs["Fac"]
    col = n.mix(n.math("MULTIPLY", necro, 0.85), col, rgba(0.22, 0.16, 0.20))
    raw = n.node("ShaderNodeAttribute", attribute_name="raw").outputs["Fac"]
    col = n.mix(n.math("MULTIPLY", raw, 0.5), col, rgba(0.45, 0.22, 0.22))
    col = n.mix(n.math("MULTIPLY", mask("eyelids"), 0.75), col, rgba(0.30, 0.17, 0.20))   # bruised, sunken
    col = n.mix(n.math("MULTIPLY", mask("lips"), 0.7), col, rgba(0.38, 0.30, 0.36))       # bloodless
    nails = n.math("ADD", mask("fingernails"), mask("toenails"))
    col = n.mix(n.math("MULTIPLY", nails, 0.9), col, rgba(0.32, 0.27, 0.18))
    col = n.mix(mask("inside-mouth"), col, rgba(0.16, 0.045, 0.05))
    ao = n.node("ShaderNodeAmbientOcclusion", {"Distance": 0.04}, samples=4, only_local=True)
    grime = n.math("POWER", ao.outputs["AO"], 1.25)
    col = n.mix(1.0, col, n.node("ShaderNodeCombineColor", {"Red": grime, "Green": grime, "Blue": grime}).outputs[0],
                "MULTIPLY")
    wet = n.math("MAXIMUM", mask("lips"), mask("inside-mouth"))
    rough = n.math("SUBTRACT", 0.52, n.math("MULTIPLY", wet, 0.35))
    lum = n.node("ShaderNodeRGBToBW", {"Color": tex.outputs["Color"]}).outputs[0]
    pores = n.noise(oc, 900.0, 2, 0.5).outputs["Fac"]
    height = n.math("ADD", n.math("MULTIPLY", lum, 1.0), n.math("MULTIPLY", pores, 0.25))
    n.p(base=col, rough=rough, sss=0.22, sss_radius=(1.0, 0.38, 0.22), sss_scale=0.005,
        coat=0.12, coat_rough=0.3, spec=0.45, normal=n.bump(height, 0.55, 0.003))
    n.bsdf.subsurface_method = "BURLEY"            # random-walk looks the same through a VHS tape, at 2x the cost
    M["skin"] = n.mat

    for name, glow in (("TenantEye", 0.0), ("TenantEyeShine", 6.0)):
        n = Nodes(name)
        uv = n.node("ShaderNodeTexCoord").outputs["UV"]
        tex = n.node("ShaderNodeTexImage", {"Vector": uv}, image=image(dead_eyes()))
        n.p(base=tex.outputs["Color"], rough=0.25, spec=0.6, coat=1.0, coat_rough=0.02)
        n.nt.links.new(tex.outputs["Alpha"], n.bsdf.inputs["Alpha"])
        if glow:
            iris = n.math("LESS_THAN", n.node("ShaderNodeRGBToBW", {"Color": tex.outputs["Color"]}).outputs[0], 0.45)
            n.p(emit=rgba(1, 1, 1), emit_strength=n.math("MULTIPLY", iris, glow))
        M[name] = n.mat

    n = Nodes("TenantTeeth")
    uv = n.node("ShaderNodeTexCoord").outputs["UV"]
    tex = n.node("ShaderNodeTexImage", {"Vector": uv}, image=image(TEETH_TEX))
    stained = n.mix(0.55, tex.outputs["Color"], rgba(0.62, 0.52, 0.30), "MULTIPLY")
    rgb = n.node("ShaderNodeSeparateColor", {"Color": tex.outputs["Color"]}).outputs
    gum = n.math("MULTIPLY", n.math("SUBTRACT", rgb[0], rgb[1]), 4.0, clamp=True)       # the pink bits
    stained = n.mix(gum, stained, rgba(0.17, 0.07, 0.08))                               # bloodless gums
    n.p(base=stained, rough=0.3, sss=0.2, sss_radius=(0.5, 0.4, 0.3), sss_scale=0.002, coat=0.5, coat_rough=0.08)
    M["teeth"] = n.mat
    return M


# ------------------------------------------------------------- the skeleton
def _g(d, s):
    return np.exp(-(d / s) ** 2)


def _seg_dist(p, a, b):
    ab = b - a
    t = np.clip(((p - a) @ ab) / (ab @ ab), 0, 1)
    return np.linalg.norm(p - (a + t[:, None] * ab), axis=1), t


def starve(h):
    """Carve a skeleton up under the skin: ribs with the gaps sucked in between
    them, collarbones and the hollows above them, a caved-in belly, hip bones,
    a row of vertebrae down the back."""
    co, no = h.rest()
    x, y, z = co.T
    B = h.bone_rest
    # (MakeHuman numbers the spine top-down: spine05 is the lumbar, spine01 the upper chest)
    z_chest_top = B("clavicle.L")[2] - 0.03
    z_rib_low = B("spine03", True)[2] - 0.04
    z_pelvis = B("spine05")[2]
    torso = (np.abs(x) < B("clavicle.L", True)[0] * 1.05) & (z > z_pelvis - 0.12) & (z < z_chest_top + 0.12)

    # torso centre line (front/back midpoint) as a function of height
    mid = np.abs(x) < 0.03
    bins = np.linspace(z_pelvis - 0.15, z_chest_top + 0.15, 40)
    yc_b = []
    for lo, hi in zip(bins[:-1], bins[1:]):
        sel = mid & (z >= lo) & (z < hi)
        yc_b.append((y[sel].min() + y[sel].max()) / 2 if sel.sum() > 2 else np.nan)
    yc_b = np.array(yc_b)
    ok = ~np.isnan(yc_b)
    zc = ((bins[:-1] + bins[1:]) / 2)[ok]
    yc = np.interp(z, zc, yc_b[ok])
    theta = np.arctan2(x, -(y - yc))                       # 0 = front, +-pi = back
    disp = np.zeros(len(co))

    # ribs: lines sloping down and out from the sternum, deepest at the sides
    band = np.clip((z - z_rib_low) / 0.05, 0, 1) * np.clip((z_chest_top - 0.03 - z) / 0.06, 0, 1)
    phase = (z + 0.05 * np.abs(theta)) / 0.034
    groove = ((np.cos(2 * np.pi * phase) + 1) / 2) ** 5
    side = np.clip((np.abs(theta) - 0.18) / 0.4, 0, 1) * np.clip((2.5 - np.abs(theta)) / 0.5, 0, 1)
    disp -= 0.0085 * groove * band * side * torso
    disp += 0.002 * _g(x, 0.012) * band * (theta.__abs__() < 0.5) * torso                 # sternum

    # collarbones, and the hollows they leave above
    notch = B("neck01") + np.array([0, -0.04, -0.02])
    for side_name in ("clavicle.L", "clavicle.R"):
        a, b = notch + np.array([np.sign(B(side_name, True)[0]) * 0.02, 0, 0]), B(side_name, True) + np.array([0, -0.03, 0.01])
        d, t = _seg_dist(co, a, b)
        front = no[:, 1] < 0.2
        disp += 0.007 * _g(d, 0.018) * front
        d2, _ = _seg_dist(co, a + np.array([0, 0.02, 0.035]), b + np.array([0, 0.02, 0.03]))
        disp -= 0.011 * _g(d2, 0.025) * front

    # belly sucked in under the ribs
    belly = _g(z - (z_rib_low - 0.08), 0.07) * _g(x, 0.11) * (no[:, 1] < -0.3)
    disp -= 0.022 * belly * torso

    # hip bones jutting
    for s in (-1, 1):
        hip = np.array([s * 0.11, np.interp(z_pelvis + 0.06, zc, yc_b[ok]) - 0.075, z_pelvis + 0.06])
        disp += 0.010 * _g(np.linalg.norm(co - hip, axis=1), 0.035)

    # vertebrae
    back = (no[:, 1] > 0.5) & (np.abs(x) < 0.03)
    vert_phase = ((np.cos(2 * np.pi * z / 0.032) + 1) / 2) ** 3
    spine_band = (z > z_pelvis) & (z < B("neck02")[2])
    disp += 0.004 * vert_phase * _g(x, 0.012) * back * spine_band

    h.set_rest(co + no * disp[:, None])

    # Where the blood has stopped: hands and feet darken toward the tips,
    # knees and elbows go raw. Stored as a vertex attribute for the skin shader.
    necro = np.zeros(len(co))
    for sd in "LR":
        w, f = B(f"wrist.{sd}"), B(f"finger3-3.{sd}", True)
        _, t = _seg_dist(co, w, f)
        near = np.linalg.norm(co - (w + f) / 2, axis=1) < np.linalg.norm(f - w) * 0.75
        necro = np.maximum(necro, near * t ** 1.3)
        a, toe = B(f"foot.{sd}"), B(f"toe3-1.{sd}", True)
        _, t = _seg_dist(co, a, toe)
        near = np.linalg.norm(co - (a + toe) / 2, axis=1) < np.linalg.norm(toe - a) * 0.8
        necro = np.maximum(necro, near * (0.3 + 0.7 * t))
    raw = np.zeros(len(co))
    for b in ("lowerleg01.L", "lowerleg01.R", "lowerarm01.L", "lowerarm01.R"):
        raw = np.maximum(raw, _g(np.linalg.norm(co - B(b), axis=1), 0.05))
    attr = h.body.data.attributes.new("necrosis", "FLOAT", "POINT")
    attr.data.foreach_set("value", necro)
    attr = h.body.data.attributes.new("raw", "FLOAT", "POINT")
    attr.data.foreach_set("value", raw)


# ------------------------------------------------------------------- posing
def _set(pb, m):
    pb.matrix = m
    bpy.context.view_layer.update()


def rotate(h, bone, axis, deg):
    """Rotate a pose bone about a world-space axis through its head."""
    pb = h.arm.pose.bones[bone]
    ax = h.arm.matrix_world.to_3x3().inverted() @ Vector(axis)
    m = pb.matrix.copy()
    head = m.translation.copy()
    _set(pb, Matrix.Translation(head) @ Matrix.Rotation(math.radians(deg), 4, ax) @ Matrix.Translation(-head) @ m)


def aim(h, bone, direction):
    """Swing a bone (shortest arc) so it points along a world-space direction."""
    pb = h.arm.pose.bones[bone]
    want = (h.arm.matrix_world.to_3x3().inverted() @ Vector(direction)).normalized()
    m = pb.matrix.copy()
    head = m.translation.copy()
    cur = (m.to_3x3() @ Vector((0, 1, 0))).normalized()
    q = cur.rotation_difference(want).to_matrix().to_4x4()
    _set(pb, Matrix.Translation(head) @ q @ Matrix.Translation(-head) @ m)


def twist(h, bone, deg):
    """Roll a bone about its own length (a head turning on its neck)."""
    pb = h.arm.pose.bones[bone]
    m = pb.matrix.copy()
    axis = m.to_3x3() @ Vector((0, 1, 0))
    head = m.translation.copy()
    _set(pb, Matrix.Translation(head) @ Matrix.Rotation(math.radians(deg), 4, axis) @ Matrix.Translation(-head) @ m)


def both(op, bone, *a):
    """The same op on .L and .R, mirroring x in any direction/axis given."""
    out = []
    for sd, sx in (("L", 1), ("R", -1)):
        args = [tuple(v * (sx if i == 0 else 1) for i, v in enumerate(x)) if isinstance(x, tuple) else
                (x * sx if op == "rot" and isinstance(x, (int, float)) and False else x) for x in a]
        out.append((op, f"{bone}.{sd}", *args))
    return out


ARMS_DOWN = both("aim", "upperarm01", (0.13, 0.03, -1)) + both("aim", "lowerarm01", (0.04, -0.06, -1)) + \
    both("aim", "wrist", (0.02, -0.1, -1))
TIPTOE = both("aim", "foot", (0, -0.45, -1)) + [("aim", f"toe{t}-1.{sd}", (0, -1, -0.05)) for t in range(1, 6) for sd in "LR"]
HEAD_UP = [("aim", "neck01", (0, -0.12, 1)), ("aim", "neck02", (0, -0.12, 1)), ("aim", "neck03", (0, -0.05, 1)),
           ("aim", "head", (0, 0.05, 1))]

POSES = {
    # Too straight, up on its toes like something is holding it up by the head.
    "marionette": ARMS_DOWN + TIPTOE + HEAD_UP,
    # Folded over at the hips, arms hanging to the floor, face craned up at you.
    "folded": [("aim", "spine05", (0, -0.9, 0.45)), ("aim", "spine04", (0, -1, 0.05)), ("aim", "spine03", (0, -1, 0.0)),
               ("aim", "spine02", (0, -1, -0.02)), ("aim", "spine01", (0, -1, 0.05))] +
              both("aim", "upperarm01", (0.1, -0.05, -1)) + both("aim", "lowerarm01", (0.03, 0, -1)) +
              [("aim", "neck01", (0, -0.8, 0.7)), ("aim", "neck02", (0, -0.4, 1)), ("aim", "head", (0, 0.1, 1))],
    # Reaching for the lens with those fingers.
    "reach": ARMS_DOWN + TIPTOE + HEAD_UP + [("aim", "upperarm01.R", (-0.15, -1, 0.15)), ("aim", "lowerarm01.R", (0.05, -1, 0.05)),
                                             ("aim", "wrist.R", (0, -1, 0)), ("rot", "spine03", (1, 0, 0), 6)],
    # On hands and knees, coming down the hall.
    "crawl": both("aim", "upperleg01", (0.08, 0.05, -1)) + both("aim", "lowerleg01", (0, 1, -0.05)) +
             both("aim", "foot", (0, 1, -0.3)) +
             [("aim", b, d) for b, d in (("spine05", (0, -1, 0.25)), ("spine04", (0, -1, 0.3)), ("spine03", (0, -1, 0.3)),
                                         ("spine02", (0, -1, 0.35)), ("spine01", (0, -1, 0.4)))] +
             both("aim", "upperarm01", (0.12, -0.25, -1)) + both("aim", "lowerarm01", (0.04, -0.1, -1)) +
             both("aim", "wrist", (0, -1, -0.15)) +
             [("aim", "neck01", (0, -1, 0.5)), ("aim", "neck02", (0, -0.6, 1)), ("aim", "head", (0, -0.1, 1))],
    # Belly up, bent backwards over its own arms and legs, head hanging upside down. Coming head first.
    "spider": [("body", (-90, 180))] +
              both("aim", "upperarm01", (0.35, 0.15, -1)) + both("aim", "lowerarm01", (0.12, -0.05, -1)) +
              both("aim", "wrist", (0.1, -1, -0.2)) +
              both("aim", "upperleg01", (0.3, 0.9, 0.05)) + both("aim", "lowerleg01", (0.06, 0.12, -1)) +
              both("aim", "foot", (0, 1, -0.25)) +
              [("aim", "neck01", (0, -0.55, -0.85)), ("aim", "neck02", (0, -0.25, -1)), ("aim", "neck03", (0, -0.1, -1)),
               ("aim", "head", (0, 0.1, -1))],
    # Flat on the ceiling, elbows and knees jutting down like a spider's, head hanging into your face.
    # (Posed belly-up against the floor, then ceiling() turns it over.)
    "ceiling": [("body", (-90, 180))] +
               both("aim", "upperarm01", (1, 0.15, 0.3)) + both("aim", "lowerarm01", (0.3, -0.15, -1)) +
               both("aim", "wrist", (0.3, -1, -0.1)) +
               both("aim", "upperleg01", (1, 0.4, 0.3)) + both("aim", "lowerleg01", (0.35, 0.25, -1)) +
               both("aim", "foot", (0.2, 1, -0.2)) +
               [("aim", "neck01", (0, -0.55, 0.85)), ("aim", "neck02", (0, -0.35, 1)), ("aim", "neck03", (0, -0.2, 1)),
                ("aim", "head", (0, 0.0, 1))],
    # Standing over you.
    "loom": ARMS_DOWN + [("rot", "spine03", (1, 0, 0), 10), ("rot", "spine02", (1, 0, 0), 6),
                         ("aim", "neck01", (0, -0.45, 1)), ("aim", "neck02", (0, -0.4, 1)), ("aim", "head", (0, -0.1, 1))],
    "stand": ARMS_DOWN,
}


def apply_pose(h, pose):
    for op in POSES[pose]:
        if op[0] == "body":
            rx, rz = op[1]
            h.arm.rotation_euler = (math.radians(rx), 0, math.radians(rz))
            bpy.context.view_layer.update()
        elif op[0] == "aim":
            aim(h, op[1], op[2])
        elif op[0] == "rot":
            rotate(h, op[1], op[2], op[3])
        elif op[0] == "twist":
            twist(h, op[1], op[2])


def plant(h):
    """Drop (or lift) the whole thing so its lowest point touches the floor."""
    bpy.context.view_layer.update()
    ev = h.body.evaluated_get(bpy.context.evaluated_depsgraph_get())
    mw = h.body.matrix_world
    low = min((mw @ v.co).z for v in ev.data.vertices)
    h.arm.location.z -= low


def curl_fingers(h, deg):
    for side in "LR":
        for f in range(2, 6):
            for seg in (1, 2, 3):
                b = f"finger{f}-{seg}.{side}"
                if b in h.arm.pose.bones:
                    pb = h.arm.pose.bones[b]
                    pb.rotation_mode = "XYZ"
                    pb.rotation_euler.x = math.radians(deg * (0.6 + 0.2 * seg))
    bpy.context.view_layer.update()


def split_eyes(h, eyes, name):
    """One proxy holds both eyeballs; split it so each can turn on its own."""
    me = eyes.data
    co = np.array([v.co[:] for v in me.vertices])
    uvl = me.uv_layers[0].data
    out = []
    for side, sel in (("L", co[:, 0] > 0), ("R", co[:, 0] <= 0)):
        idx = np.where(sel)[0]
        remap = {int(i): k for k, i in enumerate(idx)}
        polys = [p for p in me.polygons if all(i in remap for i in p.vertices)]
        c = (co[idx].min(0) + co[idx].max(0)) / 2
        m2 = bpy.data.meshes.new(f"{name}_Eye.{side}")
        m2.from_pydata((co[idx] - c).tolist(), [], [[remap[i] for i in p.vertices] for p in polys])
        uv = m2.uv_layers.new(name="UVMap")
        uv.data.foreach_set("uv", np.array([uvl[li].uv[:] for p in polys for li in p.loop_indices]).ravel())
        m2.polygons.foreach_set("use_smooth", [True] * len(m2.polygons))
        m2.materials.append(me.materials[0])
        ob = bpy.data.objects.new(m2.name, m2)
        h.col.objects.link(ob)
        ob.location = Vector(c)
        out.append(ob)
    bpy.data.objects.remove(eyes)
    bpy.data.meshes.remove(me)
    return out


def face_dir_local(h, bone="head"):
    return h.arm.data.bones[bone].matrix_local.to_3x3().inverted() @ Vector((0, -1, 0))


def look_at(h, target, roll=0.0, bone="head"):
    """Turn the head so the face points at `target` (world), then cock it by `roll` degrees."""
    pb = h.arm.pose.bones[bone]
    inv = h.arm.matrix_world.inverted()
    m = pb.matrix.copy()
    head = m.translation.copy()
    face = (m.to_3x3() @ face_dir_local(h, bone)).normalized()
    centre = m @ Vector((0, 0.09, 0))
    want = ((inv @ Vector(target)) - centre).normalized()
    q = face.rotation_difference(want).to_matrix().to_4x4()
    m = Matrix.Translation(head) @ q @ Matrix.Translation(-head) @ m
    m = Matrix.Translation(head) @ Matrix.Rotation(math.radians(roll), 4, want) @ Matrix.Translation(-head) @ m
    _set(pb, m)


def ceiling(h, height):
    """Turn the posed body over and press it up against the ceiling."""
    h.arm.matrix_world = Matrix.Rotation(math.pi, 4, "Y") @ h.arm.matrix_world
    bpy.context.view_layer.update()
    ev = h.body.evaluated_get(bpy.context.evaluated_depsgraph_get())
    mw = h.body.matrix_world
    top = max((mw @ v.co).z for v in ev.data.vertices)
    h.arm.location.z += height - top


EXPRESSIONS = {
    "blank": [("mouth-parling", 0.35), ("eye-left-opened-up", 1.0), ("eye-right-opened-up", 1.0)],
    "grin": GRIN,
    "wide": GRIN + [("mouth-corner-puller", 0.7), ("mouth-upward-retraction", 0.25), ("neck-platysma", 0.5)],
    "scream": [("mouth-open", 1.35), ("mouth-depression-retraction", 0.6), ("mouth-upward-retraction", 0.5),
               ("neck-platysma", 1.4), ("eye-left-opened-up", 1.0), ("eye-right-opened-up", 1.0),
               ("nose-left-dilatation", 1.0), ("nose-right-dilatation", 1.0)],
}
WIDER = [("mouth/mouth-scale-horiz-incr", 0.9)]       # past what a mouth can do


def expr_targets(name):
    extra = WIDER if name == "wide" else []
    return BODY + SHAPE + [(UNITS + n, w) for n, w in EXPRESSIONS[name]] + extra


def head_centre(h):
    return h.arm.matrix_world @ h.arm.pose.bones["head"].matrix @ Vector((0, 0.09, 0))


def build(name, col, M, pose="stand", face="blank", keys=(), cam=None, look=None, roll=0.0,
          eye_mat=None, location=(0, 0, 0), on_ceiling=None, head_at=None):
    """A posed Tenant. `face` is the expression it's built with; `keys` adds
    expressions as shape keys (0 by default) for animating."""
    h = HU.Human(name, expr_targets(face), col, {"skin": M["skin"]}, subdivide=1, sculpt=starve)
    if keys:
        h.body.shape_key_add(name="Basis")
        for k in keys:
            tmp = HU.Human(name + "_tmp", expr_targets(k), col, {"skin": M["skin"]}, subdivide=1, sculpt=starve)
            co, _ = tmp.rest()
            tmp.remove()
            kb = h.body.shape_key_add(name=k)
            kb.data.foreach_set("co", co.ravel())
            kb.value = 0.0
    grin_mh = HU.morph(expr_targets("wide"))
    eyes = h.fit_proxy(os.path.join(HU.SYS, "eyes", "high-poly", "high-poly.mhclo"), eye_mat or M["TenantEye"],
                       name=name + "_Eyes")
    teeth = h.fit_proxy(os.path.join(HU.SYS, "teeth", "teeth_base", "teeth_base.mhclo"), M["teeth"],
                        name=name + "_Teeth", mh=grin_mh)
    tongue = h.fit_proxy(os.path.join(HU.SYS, "tongue", "tongue01", "tongue01.mhclo"), M["skin"],
                         name=name + "_Tongue")
    tc = Vector(np.array([v.co[:] for v in teeth.data.vertices]).mean(0))
    for v in teeth.data.vertices:                      # wide enough to fill the grin
        v.co.x = tc.x + (v.co.x - tc.x) * 1.3
    eyes = split_eyes(h, eyes, name)
    for ob in eyes + [teeth, tongue]:
        h.parent_to_bone(ob, "head")
    if cam is not None:
        for e in eyes:
            tr = e.constraints.new("DAMPED_TRACK")
            tr.target, tr.track_axis = cam, "TRACK_NEGATIVE_Y"
    h.arm.location = location
    bpy.context.view_layer.update()
    apply_pose(h, pose)
    curl_fingers(h, 12)
    if on_ceiling is not None:
        ceiling(h, on_ceiling)
    else:
        plant(h)
    if head_at is not None:                            # slide it so its head is exactly here
        hc = head_centre(h)
        h.arm.location.x += head_at[0] - hc.x
        h.arm.location.y += head_at[1] - hc.y
        bpy.context.view_layer.update()
    if look is not None:
        look_at(h, look, roll)
    h.eyes, h.teeth, h.tongue = eyes, teeth, tongue
    return h

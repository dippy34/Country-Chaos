"""THE HALLWAY: a procedural found-footage horror short, built in Blender + Cycles.

Everything (the corridor, the fluorescent lights, the thing at the end of the
hall, its too-many teeth) is generated from code. No external assets.

    python3 uncanny/build_scene.py --blend hallway.blend          # build + save .blend
    python3 uncanny/build_scene.py --still 465 grin.png           # render one frame
    python3 uncanny/build_scene.py --render frames/               # render the tape (resumable)

Needs the `bpy` module (pip install bpy) or run through Blender 5.x:
    blender -b -P uncanny/build_scene.py -- --render frames/
"""
import argparse
import math
import os
import random
import sys

import bpy  # noqa: I001  (must come first: it puts addon_utils on the path)
import addon_utils
import bmesh
from mathutils import Euler, Matrix, Quaternion, Vector, noise
from mathutils.bvhtree import BVHTree

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import timeline as T  # noqa: E402

# ----------------------------------------------------------------- dimensions
HW, H = 1.2, 2.7             # corridor half-width, ceiling height
Y0, Y1 = -2.0, 30.0          # corridor extent
WALL_T = 0.1
DOOR_W, DOOR_H = 0.95, 2.1
DOORS = {-1: [8.2, 18.6], 1: [12.3, 24.0]}   # side -> doorway centres along Y

CAM_POS = Vector((0.28, 0.0, 1.55))
F6_POS = (0.06, 2.6)          # where it finally stops
LIGHT_W = 62.0               # area light watts per panel
PANEL_EMIT = 9.0             # what the camera sees of a panel
FLUO = (0.86, 1.0, 0.84, 1.0)

# head proportions (metres): human, a size too big, no ears
HEAD_SX, HEAD_SY, HEAD_SZ = 0.094, 0.118, 0.150
EYE_U, EYE_W = 0.35, 0.07    # socket centres in face coordinates
EYE_R = 0.0165
HEAD_SCALE = 1.15            # on top of the above: slightly too big for the body
MOUTH_W = -0.50
PHI_MAX = math.radians(106)  # how far round the face the grin can reach
MOUTH_Z = MOUTH_W * HEAD_SZ
MOUTH_LIFT = 0.046           # corners curl up towards the eyes
SMILE_KEYS = [T.SMILE["F5"], 0.49, 0.62, 0.75, 0.88, 1.0]


def lerp(a, b, t):
    return a + (b - a) * t


# ------------------------------------------------------------ scene plumbing
def reset(samples):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    addon_utils.enable("cycles", default_set=True, persistent=True)
    bpy.context.preferences.edit.keyframe_new_interpolation_type = "CONSTANT"

    sc = bpy.context.scene
    sc.name = "TheHallway"
    sc.render.engine = "CYCLES"
    cy = sc.cycles
    cy.device = "CPU"
    cy.samples = samples
    cy.use_adaptive_sampling = True
    cy.adaptive_threshold = 0.05
    cy.use_denoising = True
    cy.denoiser = "OPENIMAGEDENOISE"
    cy.denoising_prefilter = "FAST"
    cy.max_bounces = 3
    cy.diffuse_bounces = 2
    cy.glossy_bounces = 1
    cy.transmission_bounces = 2
    cy.volume_bounces = 0
    cy.transparent_max_bounces = 4
    cy.caustics_reflective = False
    cy.caustics_refractive = False
    cy.sample_clamp_indirect = 4.0
    cy.blur_glossy = 1.0

    r = sc.render
    r.resolution_x, r.resolution_y, r.resolution_percentage = 640, 360, 100   # camcorder-ish; post upscales
    r.fps = T.FPS
    r.use_persistent_data = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGB"
    r.image_settings.color_depth = "8"
    sc.frame_start, sc.frame_end = 0, T.CUT - 1

    sc.view_settings.view_transform = "AgX"
    sc.view_settings.look = "AgX - Medium High Contrast"
    sc.view_settings.exposure = -0.2

    world = bpy.data.worlds.new("Nothing")
    world.color = (0.0, 0.0, 0.0)
    sc.world = world
    return sc


def collection(name):
    col = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(col)
    return col


def link(ob, col):
    col.objects.link(ob)
    return ob


def new_object(name, data, col, parent=None):
    ob = bpy.data.objects.new(name, data)
    col.objects.link(ob)
    if parent is not None:
        ob.parent = parent
    return ob


def smooth(me):
    me.polygons.foreach_set("use_smooth", [True] * len(me.polygons))


# ---------------------------------------------------------- node-tree helper
class Nodes:
    """Tiny helper so the shader graphs below stay readable."""

    def __init__(self, name):
        self.mat = bpy.data.materials.new(name)
        self.mat.use_nodes = True
        self.nt = self.mat.node_tree
        self.bsdf = self.nt.nodes["Principled BSDF"]
        self.out = self.nt.nodes["Material Output"]

    def _set(self, sock, v):
        if isinstance(v, bpy.types.NodeSocket):
            self.nt.links.new(v, sock)
        else:
            sock.default_value = v

    def node(self, kind, inputs=None, **attrs):
        nd = self.nt.nodes.new(kind)
        for k, v in attrs.items():
            setattr(nd, k, v)
        for k, v in (inputs or {}).items():
            self._set(nd.inputs[k], v)
        return nd

    def math(self, op, a, b=None, c=None, clamp=False):
        nd = self.nt.nodes.new("ShaderNodeMath")
        nd.operation, nd.use_clamp = op, clamp
        for i, v in enumerate((a, b, c)):
            if v is not None:
                self._set(nd.inputs[i], v)
        return nd.outputs[0]

    def mix(self, fac, a, b):
        nd = self.nt.nodes.new("ShaderNodeMix")
        nd.data_type = "RGBA"
        nd.clamp_factor = True
        socks = [s for s in nd.inputs if s.type == "RGBA"]
        self._set(nd.inputs["Factor"], fac)
        self._set(socks[0], a)
        self._set(socks[1], b)
        return [s for s in nd.outputs if s.type == "RGBA"][0]

    def ramp(self, fac, stops):
        nd = self.node("ShaderNodeValToRGB", {"Fac": fac})
        els = nd.color_ramp.elements
        for i, (pos, col) in enumerate(stops):
            el = els[i] if i < len(els) else els.new(pos)
            el.position, el.color = pos, col
        return nd

    def coords(self, kind="Position"):
        if kind == "Position":
            return self.node("ShaderNodeNewGeometry").outputs["Position"]
        return self.node("ShaderNodeTexCoord").outputs[kind]

    def xyz(self, vec):
        return self.node("ShaderNodeSeparateXYZ", {"Vector": vec}).outputs

    def noise(self, vec, scale, detail=4.0, rough=0.5):
        return self.node("ShaderNodeTexNoise",
                         {"Vector": vec, "Scale": scale, "Detail": detail, "Roughness": rough})

    def bump(self, height, strength, distance=0.01):
        return self.node("ShaderNodeBump",
                         {"Height": height, "Strength": strength, "Distance": distance}).outputs["Normal"]

    def p(self, **kw):
        names = {"base": "Base Color", "rough": "Roughness", "sss": "Subsurface Weight",
                 "sss_radius": "Subsurface Radius", "sss_scale": "Subsurface Scale",
                 "coat": "Coat Weight", "coat_rough": "Coat Roughness", "spec": "Specular IOR Level",
                 "normal": "Normal", "emit": "Emission Color", "emit_strength": "Emission Strength",
                 "sheen": "Sheen Weight"}
        for k, v in kw.items():
            self._set(self.bsdf.inputs[names[k]], v)
        return self


def rgba(r, g, b):
    return (r, g, b, 1.0)


# ------------------------------------------------------------------ materials
def build_materials():
    M = {}

    # Yellowed wallpaper with faint stripes and water damage creeping up from the floor.
    n = Nodes("Wallpaper")
    x, y, z = n.xyz(n.coords())
    stripe = n.math("MULTIPLY_ADD", n.math("SINE", n.math("MULTIPLY", n.math("ADD", x, y), 2 * math.pi / 0.16)), 0.5, 0.5)
    base = n.mix(n.math("MULTIPLY", stripe, 0.55), rgba(0.52, 0.43, 0.20), rgba(0.44, 0.36, 0.16))
    blot = n.ramp(n.noise(n.coords(), 0.65, 6, 0.62).outputs["Fac"], [(0.5, rgba(0, 0, 0)), (0.66, rgba(1, 1, 1))])
    damp = n.node("ShaderNodeMapRange", {"Value": z, "From Min": 0.05, "From Max": 1.1, "To Min": 0.75, "To Max": 0.0})
    stain = n.math("MAXIMUM", n.math("MULTIPLY", blot.outputs["Color"], 0.8), damp.outputs[0])
    col = n.mix(stain, base, rgba(0.30, 0.22, 0.10))
    fine = n.noise(n.coords(), 90.0, 3, 0.5).outputs["Fac"]
    n.p(base=col, rough=0.82, spec=0.25, normal=n.bump(fine, 0.12, 0.002))
    M["wall"] = n.mat

    # Damp beige carpet.
    n = Nodes("Carpet")
    fibres = n.noise(n.coords(), 420.0, 2, 0.6).outputs["Fac"]
    blot = n.ramp(n.noise(n.coords(), 0.45, 5, 0.6).outputs["Fac"], [(0.48, rgba(0, 0, 0)), (0.68, rgba(1, 1, 1))])
    col = n.mix(blot.outputs["Color"], rgba(0.30, 0.25, 0.15), rgba(0.16, 0.12, 0.07))
    col = n.mix(n.math("MULTIPLY", fibres, 0.35), col, rgba(0.12, 0.10, 0.07))
    n.p(base=col, rough=1.0, spec=0.1, normal=n.bump(fibres, 0.35, 0.003))
    M["carpet"] = n.mat

    # Drop-ceiling tiles, a few with old leak stains.
    n = Nodes("CeilingTile")
    brick = n.node("ShaderNodeTexBrick", {"Vector": n.coords(), "Color1": rgba(0.74, 0.71, 0.62),
                                          "Color2": rgba(0.70, 0.67, 0.58), "Mortar": rgba(0.33, 0.31, 0.27),
                                          "Scale": 1.0, "Mortar Size": 0.012, "Brick Width": 0.6, "Row Height": 0.6},
                   offset=0.0, squash=1.0)
    leak = n.ramp(n.noise(n.coords(), 0.9, 6, 0.6).outputs["Fac"], [(0.62, rgba(0, 0, 0)), (0.72, rgba(1, 1, 1))])
    col = n.mix(leak.outputs["Color"], brick.outputs["Color"], rgba(0.42, 0.33, 0.18))
    pits = n.noise(n.coords(), 160.0, 2, 0.5).outputs["Fac"]
    n.p(base=col, rough=0.95, spec=0.2,
        normal=n.bump(n.math("ADD", brick.outputs["Fac"], n.math("MULTIPLY", pits, 0.2)), 0.4, 0.004))
    M["ceiling"] = n.mat

    for key, name, col, rough in (("trim", "Baseboard", (0.20, 0.15, 0.10), 0.6),
                                  ("door", "DoorPaint", (0.52, 0.49, 0.42), 0.55),
                                  ("fabric", "ChairFabric", (0.06, 0.06, 0.07), 0.9),
                                  ("plastic", "ExitHousing", (0.62, 0.62, 0.58), 0.4),
                                  ("void", "VoidRoom", (0.08, 0.07, 0.05), 0.9)):
        n = Nodes(name)
        n.p(base=rgba(*col), rough=rough)
        M[key] = n.mat

    n = Nodes("ExitGlow")
    n.p(base=rgba(0.2, 0.0, 0.0), emit=rgba(1.0, 0.04, 0.02), emit_strength=9.0)
    M["exit"] = n.mat

    # Pale, slightly translucent skin. Wet. Mottled blue where it's thin. Ribs.
    n = Nodes("Skin")
    oc = n.coords("Object")
    mott = n.noise(oc, 7.0, 6, 0.55).outputs["Fac"]
    col = n.mix(n.ramp(mott, [(0.3, rgba(0, 0, 0)), (0.75, rgba(1, 1, 1))]).outputs["Color"],
                rgba(0.60, 0.57, 0.52), rgba(0.42, 0.43, 0.47))
    blotch = n.ramp(n.noise(oc, 2.2, 4, 0.5).outputs["Fac"], [(0.55, rgba(0, 0, 0)), (0.75, rgba(1, 1, 1))])
    col = n.mix(n.math("MULTIPLY", blotch.outputs["Color"], 0.5), col, rgba(0.48, 0.38, 0.36))
    veins = n.ramp(n.noise(oc, 3.0, 12, 0.7).outputs["Fac"], [(0.49, rgba(0, 0, 0)), (0.5, rgba(1, 1, 1)), (0.51, rgba(0, 0, 0))])
    col = n.mix(n.math("MULTIPLY", veins.outputs["Color"], 0.4), col, rgba(0.30, 0.34, 0.45))
    ox, oy, oz = n.xyz(oc)
    rib_window = n.math("MULTIPLY",
                        n.node("ShaderNodeMapRange", {"Value": oz, "From Min": 1.42, "From Max": 1.52}).outputs[0],
                        n.node("ShaderNodeMapRange", {"Value": oz, "From Min": 1.84, "From Max": 1.74}).outputs[0])
    ribs = n.math("MULTIPLY", n.math("ABSOLUTE", n.math("SINE", n.math("MULTIPLY", oz, 2 * math.pi / 0.042))), rib_window)
    pores = n.noise(oc, 600.0, 2, 0.5).outputs["Fac"]
    height = n.math("ADD", n.math("MULTIPLY", ribs, 0.35), n.math("MULTIPLY", pores, 0.1))
    n.p(base=col, rough=0.5, sss=0.25, sss_radius=(0.9, 0.35, 0.22), sss_scale=0.015,
        coat=0.18, coat_rough=0.25, normal=n.bump(height, 0.35, 0.004))
    n.bsdf.subsurface_method = "BURLEY"
    M["skin"] = n.mat

    n = Nodes("Gums")
    n.p(base=rgba(0.13, 0.015, 0.02), rough=0.3, coat=0.6, coat_rough=0.1)
    M["gums"] = n.mat

    n = Nodes("Teeth")
    n.p(base=rgba(0.74, 0.68, 0.52), rough=0.25, sss=0.15, sss_radius=(0.5, 0.4, 0.3), sss_scale=0.004,
        coat=0.6, coat_rough=0.05)
    n.bsdf.subsurface_method = "BURLEY"
    M["teeth"] = n.mat

    M["eye"] = eye_material("Eye", glow=0.0)
    M["eye_glow"] = eye_material("EyeShine", glow=7.0)
    return M


def eye_material(name, glow):
    """Lidless, wet, pale iris, pinprick pupil. The iris sits on local -Y,
    which a Damped Track keeps pointed at the camera at all times."""
    n = Nodes(name)
    x, y, z = n.xyz(n.coords("Object"))
    r = n.math("SQRT", n.math("ADD", n.math("MULTIPLY", x, x), n.math("MULTIPLY", z, z)))
    front = n.math("LESS_THAN", y, 0.0)
    iris = n.math("MULTIPLY", n.math("LESS_THAN", r, 0.40), front)
    limbal = n.math("MULTIPLY", n.math("GREATER_THAN", r, 0.33), iris)
    pupil = n.math("MULTIPLY", n.math("LESS_THAN", r, 0.085), front)
    veins = n.ramp(n.noise(n.coords("Object"), 6.0, 10, 0.7).outputs["Fac"],
                   [(0.47, rgba(0, 0, 0)), (0.5, rgba(1, 1, 1)), (0.53, rgba(0, 0, 0))])
    sclera = n.mix(n.math("MULTIPLY", veins.outputs["Color"], 0.6), rgba(0.84, 0.80, 0.72), rgba(0.62, 0.12, 0.10))
    streak = n.noise(n.coords("Object"), 30.0, 3, 0.5).outputs["Fac"]
    iris_col = n.mix(streak, rgba(0.50, 0.56, 0.55), rgba(0.70, 0.74, 0.70))
    col = n.mix(iris, sclera, iris_col)
    col = n.mix(limbal, col, rgba(0.18, 0.2, 0.2))
    col = n.mix(pupil, col, rgba(0.0, 0.0, 0.0))
    n.p(base=col, rough=0.03, spec=0.9, coat=1.0, coat_rough=0.0)
    if glow:
        n.p(emit=rgba(1, 1, 1), emit_strength=n.math("MULTIPLY", iris, glow))
    return n.mat


def panel_material(i):
    """Fluorescent panel: seen by the camera, but the actual light comes from an
    area lamp just under it (cleaner, and lets every tube flicker on its own)."""
    n = Nodes(f"Tube{i}")
    nt = n.nt
    nt.nodes.remove(n.bsdf)
    emit = n.node("ShaderNodeEmission", {"Color": FLUO, "Strength": PANEL_EMIT})
    dark = n.node("ShaderNodeBsdfDiffuse", {"Color": rgba(0.6, 0.6, 0.6)})
    lit = n.node("ShaderNodeAddShader")
    nt.links.new(dark.outputs[0], lit.inputs[0])
    nt.links.new(emit.outputs[0], lit.inputs[1])
    lp = n.node("ShaderNodeLightPath")
    mix = n.node("ShaderNodeMixShader")
    nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs[0])
    nt.links.new(dark.outputs[0], mix.inputs[1])
    nt.links.new(lit.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], n.out.inputs["Surface"])
    return n.mat, emit.inputs["Strength"]


# ------------------------------------------------------------------- hallway
def box(name, lo, hi, mat, col):
    """Axis-aligned box from corner lo to corner hi."""
    lo, hi = Vector(lo), Vector(hi)
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((lerp(lo.x, hi.x, v.co.x + 0.5), lerp(lo.y, hi.y, v.co.y + 0.5), lerp(lo.z, hi.z, v.co.z + 0.5)))
    bm.to_mesh(me)
    bm.free()
    me.materials.append(mat)
    return new_object(name, me, col)


def side_room(name, side, yc, M, col):
    """A dark office behind a doorway. Open on the corridor side."""
    x0 = side * (HW + WALL_T)
    x1 = side * (HW + WALL_T + 3.2)
    ya, yb = yc - 1.8, yc + 1.8
    verts = [(x0, ya, 0), (x1, ya, 0), (x1, yb, 0), (x0, yb, 0),
             (x0, ya, H), (x1, ya, H), (x1, yb, H), (x0, yb, H)]
    faces = [(0, 1, 2, 3), (4, 7, 6, 5), (1, 5, 6, 2), (0, 4, 5, 1), (3, 2, 6, 7)]
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.materials.append(M["void"])
    return new_object(name, me, col)


def build_hallway(M):
    col = collection("Hallway")
    box("Floor", (-HW - 4.5, Y0, -0.05), (HW + 4.5, Y1 + 5, 0), M["carpet"], col)
    box("Ceiling", (-HW - 4.5, Y0, H), (HW + 4.5, Y1 + 5, H + 0.05), M["ceiling"], col)
    box("BackWall", (-HW, Y0 - WALL_T, 0), (HW, Y0, H), M["wall"], col)

    for side, doors in DOORS.items():
        xa, xb = sorted((side * HW, side * (HW + WALL_T)))
        y = Y0
        for k, yc in enumerate(doors + [None]):
            y_end = Y1 if yc is None else yc - DOOR_W / 2
            box(f"Wall{side:+d}_{k}", (xa, y, 0), (xb, y_end, H), M["wall"], col)
            bx = (xa - 0.012, xb) if side < 0 else (xa, xb + 0.012)
            trim_x = (xb, xb + 0.015) if side < 0 else (xa - 0.015, xa)
            box(f"Trim{side:+d}_{k}", (trim_x[0], y, 0), (trim_x[1], y_end, 0.11), M["trim"], col)
            if yc is None:
                break
            box(f"Header{side:+d}_{k}", (bx[0], yc - DOOR_W / 2, DOOR_H), (bx[1], yc + DOOR_W / 2, H), M["wall"], col)
            side_room(f"Office{side:+d}_{k}", side, yc, M, col)
            y = yc + DOOR_W / 2

    # The far wall, with a doorway into nothing and an EXIT sign above it.
    box("EndWallL", (-HW, Y1, 0), (-0.5, Y1 + WALL_T, H), M["wall"], col)
    box("EndWallR", (0.5, Y1, 0), (HW, Y1 + WALL_T, H), M["wall"], col)
    box("EndHeader", (-0.5, Y1, DOOR_H), (0.5, Y1 + WALL_T, H), M["wall"], col)
    for k, xs in enumerate(((-HW, -0.5), (0.5, HW))):
        box(f"EndTrim{k}", (xs[0], Y1 - 0.015, 0), (xs[1], Y1, 0.11), M["trim"], col)
    void = box("Beyond", (-2.5, Y1 + WALL_T, -0.01), (2.5, Y1 + 6, H), M["void"], col)
    # open the side facing the doorway
    bm = bmesh.new()
    bm.from_mesh(void.data)
    bm.faces.ensure_lookup_table()
    near = [f for f in bm.faces if abs(f.calc_center_median().y - (Y1 + WALL_T)) < 1e-4]
    bmesh.ops.delete(bm, geom=near, context="FACES")
    bm.to_mesh(void.data)
    bm.free()

    box("ExitHousing", (-0.22, Y1 - 0.06, 2.24), (0.22, Y1, 2.42), M["plastic"], col)
    cu = bpy.data.curves.new("ExitText", "FONT")
    cu.body, cu.align_x, cu.align_y = "EXIT", "CENTER", "CENTER"
    cu.size, cu.extrude = 0.12, 0.004
    cu.materials.append(M["exit"])
    txt = new_object("ExitText", cu, col)
    txt.location = (0, Y1 - 0.065, 2.33)
    txt.rotation_euler = (math.radians(90), 0, 0)
    red = bpy.data.lights.new("ExitSpill", "POINT")
    red.energy, red.color, red.shadow_soft_size = 3.5, (1.0, 0.05, 0.03), 0.08
    new_object("ExitSpill", red, col).location = (0, Y1 - 0.3, 2.3)

    # A door left hanging open.
    hinge = Vector((HW + WALL_T / 2, 12.3 - DOOR_W / 2 + 0.02, 0))
    door = box("Door", (-0.02, 0, 0.0), (0.02, DOOR_W - 0.05, 2.06), M["door"], col)
    door.location = hinge
    door.rotation_euler = (0, 0, math.radians(-62))

    # An office chair facing the wall. Nobody put it there.
    chair_parts = [((-0.22, -0.22, 0.44), (0.22, 0.22, 0.5)),       # seat
                   ((0.17, -0.22, 0.5), (0.22, 0.22, 0.98)),        # back
                   ((-0.025, -0.025, 0.08), (0.025, 0.025, 0.44)),  # post
                   ((-0.28, -0.025, 0.04), (0.28, 0.025, 0.08)),    # base
                   ((-0.025, -0.28, 0.04), (0.025, 0.28, 0.08))]
    chair = bpy.data.objects.new("Chair", None)
    col.objects.link(chair)
    chair.location = (-0.72, 16.2, 0)
    chair.rotation_euler = (0, 0, math.radians(14))
    for k, (lo, hi) in enumerate(chair_parts):
        box(f"Chair{k}", lo, hi, M["fabric"], col).parent = chair
    return col


def build_lights():
    col = collection("Fluorescents")
    rigs = []
    for i, y in enumerate(T.LIGHT_Y):
        mat, strength = panel_material(i)
        me = bpy.data.meshes.new(f"Panel{i}")
        bm = bmesh.new()
        bmesh.ops.create_cube(bm, size=1.0)
        bmesh.ops.scale(bm, vec=(0.62, 1.22, 0.012), verts=bm.verts)
        bm.to_mesh(me)
        bm.free()
        me.materials.append(mat)
        panel = new_object(f"Panel{i}", me, col)
        panel.location = (0, y, H - 0.006)
        lamp = bpy.data.lights.new(f"Tube{i}", "AREA")
        lamp.shape, lamp.size, lamp.size_y = "RECTANGLE", 0.56, 1.15
        lamp.color, lamp.energy = FLUO[:3], LIGHT_W
        lob = new_object(f"Tube{i}", lamp, col)
        lob.location = (0, y, H - 0.02)
        lob.visible_camera = False
        rigs.append((strength, lamp))
    return rigs


def animate_lights(rigs):
    for i, (strength, lamp) in enumerate(rigs):
        last = None
        for f in range(0, T.CUT + 1):
            lvl = T.light_level(i, f)
            if lvl != last:
                strength.default_value = PANEL_EMIT * lvl
                strength.keyframe_insert("default_value", frame=f)
                lamp.energy = LIGHT_W * lvl
                lamp.keyframe_insert("energy", frame=f)
                last = lvl


# -------------------------------------------------------------------- figure
def gauss(d, s):
    return math.exp(-((d / s) ** 2))


def build_head_bm():
    """Almost a person. Brow, sockets, a nose, cheekbones, a chin. No ears, no
    hair, no lids. The features are sculpted as bumps on a sphere, in "face
    coordinates" (u across, w up) on the side looking down local -Y."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=128, v_segments=96, radius=1.0)
    ss = T.smoothstep
    for v in bm.verts:
        n = v.co.normalized()
        u, w = n.x, n.z
        front = max(0.0, -n.y)
        side = max(0.0, 1 - abs(n.y) * 1.6)
        f2, f4 = front ** 2, front ** 4
        r = 1.0 - 0.10 * front ** 3                                   # flatter face plane
        r += 0.07 * gauss(w - 0.27, 0.07) * gauss(u, 0.44) * f2       # brow ridge
        r += 0.05 * gauss(w - 0.15, 0.10) * gauss(u, 0.07) * f4       # bridge between the eyes
        for s in (-1, 1):
            r -= 0.15 * gauss(math.hypot(u - s * EYE_U, (w - EYE_W) * 1.55), 0.15) * front  # almond sockets
            r -= 0.012 * gauss(math.hypot(u - s * EYE_U, (w - EYE_W - 0.14) * 3), 0.12) * front  # lid crease
            r += 0.055 * gauss(math.hypot(u - s * EYE_U, (w - EYE_W - 0.075) * 2.6), 0.12) * front  # upper lid
            r += 0.035 * gauss(math.hypot(u - s * EYE_U, (w - EYE_W + 0.08) * 2.8), 0.11) * front  # lower lid
            r += 0.07 * gauss(math.hypot(u - s * 0.54, w + 0.08), 0.15) * front ** 0.5   # cheekbones
            r -= 0.08 * gauss(math.hypot(u - s * 0.45, w + 0.40), 0.15) * front          # hollow cheeks
            r -= 0.05 * gauss(math.hypot(u - s * 0.075, w + 0.28), 0.032) * f4           # nostrils
            r -= 0.04 * gauss(math.hypot(u - s * 0.84, w - 0.22), 0.22)                  # temples
            r += 0.09 * gauss(math.hypot(u - s * 0.80, (w + 0.58) * 1.3), 0.22) * side   # jaw angle
        nose = 0.26 * ss(0.14, -0.22, w) * (1 - ss(-0.22, -0.31, w))
        r += nose * gauss(u, 0.045 + 0.08 * ss(-0.05, -0.25, w)) * f4
        r += 0.05 * gauss(w - MOUTH_W, 0.12) * gauss(u, 0.34) * f2    # muzzle
        r -= 0.015 * gauss(w - MOUTH_W, 0.03) * gauss(u, 0.3) * f2    # where the lips meet
        r += 0.08 * gauss(math.hypot(u, w + 0.80), 0.15) * front      # chin
        x, y, z = n * r
        if z < 0:
            x *= 1 - 0.16 * (-z) ** 2
            if y > 0:
                y *= 1 - 0.4 * (-z) ** 1.3
        if z > 0.35:
            z = 0.35 + (z - 0.35) * 0.8                                 # lower, rounder crown
        if z > 0:
            x *= 1 + 0.10 * z                                           # skull, not egg
        if y > 0 and z > -0.3:
            y *= 1 + 0.12 * (z + 0.3)
        v.co = Vector((x * HEAD_SX, y * HEAD_SY, z * HEAD_SZ))
    return bm


def mouth_z(phi):
    return MOUTH_Z + MOUTH_LIFT * (abs(phi) / PHI_MAX) ** 2.2


def surface(bvh, phi, z):
    d = Vector((math.sin(phi), -math.cos(phi), 0.0))
    hit = bvh.ray_cast(Vector((0.0, 0.0, z)), d)
    return hit[0], d


def cutter_coords(bvh, s, n=64, ring=10):
    """A thin curved tube that follows the face. Boolean'd out of the head it
    becomes the mouth; widening it unzips the grin round towards the ears."""
    span = lerp(math.radians(12), PHI_MAX, s)
    gape = lerp(0.0016, 0.0145, s)
    out = []
    for k in range(n):
        t = k / (n - 1)
        phi = (2 * t - 1) * span
        p, d = surface(bvh, phi, mouth_z(phi))
        h = gape * max(0.03, 1 - (2 * t - 1) ** 2) ** 0.7
        for j in range(ring):
            th = 2 * math.pi * j / ring
            rho = -0.007 + 0.021 * math.cos(th)
            out.append(p + d * rho + Vector((0, 0, h * math.sin(th))))
    return out


def cutter_mesh(name, bvh, smiles, n=64, ring=10):
    coords = cutter_coords(bvh, smiles[0], n, ring)
    faces = []
    for k in range(n - 1):
        for j in range(ring):
            a, b = k * ring + j, k * ring + (j + 1) % ring
            faces.append((a, b, b + ring, a + ring))
    faces.append(tuple(reversed(range(ring))))
    faces.append(tuple((n - 1) * ring + j for j in range(ring)))
    me = bpy.data.meshes.new(name)
    me.from_pydata(coords, [], faces)
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    return me


def teeth_mesh(bvh):
    """Two clenched rows that run the whole way round. 134 teeth."""
    rng = random.Random(1317)
    bm = bmesh.new()
    phi = -PHI_MAX * 0.985
    while phi < PHI_MAX * 0.985:
        p, d = surface(bvh, phi, mouth_z(phi))
        rad = Vector((p.x, p.y, 0)).length
        w = 0.0047 * rng.uniform(0.86, 1.12)
        tang = Vector((math.cos(phi), math.sin(phi), 0.0))
        for sign in (1, -1):
            h = (0.0098 if sign > 0 else 0.0086) * rng.uniform(0.9, 1.1)
            c = p - d * 0.0062 + Vector((0, 0, sign * (h * 0.5 + 0.0001)))
            basis = Matrix((tang * (w * 0.5), d * 0.0042, Vector((0, 0, h * 0.5)))).transposed()
            mtx = Matrix.Translation(c) @ basis.to_4x4()
            bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0, matrix=mtx)
        phi += w * 1.04 / rad
    return bm


def build_figure_assets(M):
    bm = build_head_bm()
    bvh = BVHTree.FromBMesh(bm)
    head_me = bpy.data.meshes.new("Head")
    bm.to_mesh(head_me)
    smooth(head_me)
    head_me.materials.append(M["skin"])

    tb = teeth_mesh(bvh)
    teeth_me = bpy.data.meshes.new("Teeth")
    tb.to_mesh(teeth_me)
    tb.free()
    smooth(teeth_me)
    teeth_me.materials.append(M["teeth"])

    eye_me = bpy.data.meshes.new("Eyeball")
    eb = bmesh.new()
    bmesh.ops.create_uvsphere(eb, u_segments=48, v_segments=32, radius=1.0)
    eb.to_mesh(eye_me)
    eb.free()
    smooth(eye_me)
    eye_me.materials.append(M["eye"])

    eyes = []
    for s in (-1, 1):
        fy = -math.sqrt(1 - EYE_U ** 2 - EYE_W ** 2)
        d = Vector((s * EYE_U * HEAD_SX, fy * HEAD_SY, EYE_W * HEAD_SZ)).normalized()
        hit = bvh.ray_cast(Vector((0, 0, 0)), d)[0]
        eyes.append(hit - d * 0.003)                # lids close over the top and bottom
    bm.free()
    return {"head": head_me, "teeth": teeth_me, "eye": eye_me, "eyes": eyes, "bvh": bvh}


def base_joints():
    J = {
        "pelvis": ((0, 0.0, 1.18), 0.125, 0.09),
        "waist": ((0, 0.015, 1.38), 0.08, 0.062),
        "chest": ((0, 0.02, 1.60), 0.125, 0.09),
        "upchest": ((0, 0.03, 1.80), 0.14, 0.085),
        "neck0": ((0, 0.03, 1.93), 0.047, 0.047),
        "neck1": ((0, 0.02, 2.06), 0.04, 0.04),
        "neck2": ((0, 0.012, 2.17), 0.037, 0.037),
    }
    for s, sd in ((1, "L"), (-1, "R")):
        J["shoulder" + sd] = ((s * 0.215, 0.04, 1.85), 0.053, 0.053)
        J["elbow" + sd] = ((s * 0.265, 0.07, 1.36), 0.034, 0.034)
        J["wrist" + sd] = ((s * 0.285, 0.02, 0.88), 0.024, 0.024)
        J["palm" + sd] = ((s * 0.295, 0.0, 0.79), 0.03, 0.016)
        for k, dx in enumerate((-0.022, -0.007, 0.008, 0.022)):
            J[f"f{k}a" + sd] = ((s * (0.295 + dx * 0.6), -0.005, 0.745), 0.011, 0.011)
            J[f"f{k}b" + sd] = ((s * (0.295 + dx), -0.012, 0.64), 0.0085, 0.0085)
            J[f"f{k}c" + sd] = ((s * (0.295 + dx * 1.1), -0.02, 0.53 - 0.012 * (k in (1, 2))), 0.006, 0.006)
        J["thumba" + sd] = ((s * 0.272, -0.03, 0.745), 0.011, 0.011)
        J["thumbb" + sd] = ((s * 0.262, -0.05, 0.672), 0.008, 0.008)
        J["hip" + sd] = ((s * 0.10, 0.0, 1.11), 0.075, 0.075)
        J["knee" + sd] = ((s * 0.11, -0.025, 0.62), 0.05, 0.05)
        J["ankle" + sd] = ((s * 0.11, 0.02, 0.09), 0.032, 0.032)
        J["toe" + sd] = ((s * 0.11, -0.13, 0.025), 0.028, 0.02)
    return {k: [Vector(p), rx, ry] for k, (p, rx, ry) in J.items()}


# (name, from, to, where along, radius x, radius y): muscle and bone between the joints
MIDS = [("clav", "upchest", "shoulder", 0.5, 0.042, 0.036),
        ("bicep", "shoulder", "elbow", 0.42, 0.044, 0.041),
        ("forearm", "elbow", "wrist", 0.28, 0.037, 0.033),
        ("thigh", "hip", "knee", 0.38, 0.08, 0.076),
        ("calf", "knee", "ankle", 0.28, 0.056, 0.052)]


def add_mids(J):
    for sd in "LR":
        for mid, a, b, t, rx, ry in MIDS:
            a = a if a == "upchest" else a + sd
            J[mid + sd] = [J[a][0].lerp(J[b + sd][0], t), rx, ry]


def body_edges():
    E = [("pelvis", "waist"), ("waist", "chest"), ("chest", "upchest"),
         ("upchest", "neck0"), ("neck0", "neck1"), ("neck1", "neck2")]
    for sd in "LR":
        chain = lambda *ks: [(ks[i] if ks[i] in ("upchest", "pelvis") else ks[i] + sd, ks[i + 1] + sd)  # noqa: E731
                             for i in range(len(ks) - 1)]
        E += chain("upchest", "clav", "shoulder", "bicep", "elbow", "forearm", "wrist", "palm")
        E += chain("palm", "thumba", "thumbb")
        E += chain("pelvis", "hip", "thigh", "knee", "calf", "ankle", "toe")
        for k in range(4):
            E += [("palm" + sd, f"f{k}a" + sd), (f"f{k}a" + sd, f"f{k}b" + sd), (f"f{k}b" + sd, f"f{k}c" + sd)]
    return E


ARM = ["elbow", "wrist", "palm", "thumba", "thumbb"] + [f"f{k}{c}" for k in range(4) for c in "abc"]


def bend_forward(J, deg, pivot_z=1.2):
    """Fold the torso forward at the hips; arms keep hanging straight down."""
    rot = Matrix.Rotation(math.radians(-deg), 3, "X")
    pivot = Vector((0, 0, pivot_z))
    upper = ["waist", "chest", "upchest", "neck0", "neck1", "neck2", "shoulderL", "shoulderR"]
    for sd in "LR":
        before = J["shoulder" + sd][0].copy()
        after = pivot + rot @ (before - pivot)
        for k in ARM:
            J[k + sd][0] += after - before
    for k in upper:
        J[k][0] = pivot + rot @ (J[k][0] - pivot)


def reach_arm(J, sd, target):
    """Raise one arm and stretch those long fingers toward `target`."""
    sh = J["shoulder" + sd][0]
    d = (target - sh).normalized()
    side = Vector((1 if sd == "L" else -1, 0, 0))
    elbow = sh + d * 0.48 + Vector((0, 0, -0.07)) + side * 0.03
    wrist = elbow + d * 0.47
    palm = wrist + d * 0.09
    J["elbow" + sd][0], J["wrist" + sd][0], J["palm" + sd][0] = elbow, wrist, palm
    across = d.cross(Vector((0, 0, 1))).normalized()
    for k, dx in enumerate((-0.022, -0.007, 0.008, 0.022)):
        spread = across * dx * (1 if sd == "L" else -1)
        J[f"f{k}a" + sd][0] = palm + d * 0.05 + spread * 0.6
        J[f"f{k}b" + sd][0] = palm + d * 0.15 + spread * 1.2 + Vector((0, 0, -0.01))
        J[f"f{k}c" + sd][0] = palm + d * 0.25 + spread * 1.6 + Vector((0, 0, -0.03))
    J["thumba" + sd][0] = palm + d * 0.03 + Vector((0, 0, 0.03))
    J["thumbb" + sd][0] = palm + d * 0.09 + Vector((0, 0, 0.045))


def ceiling_joints():
    """F7: flat against the ceiling above the operator, head hanging down."""
    cx = CAM_POS.x
    J = {
        "upchest": ((cx, 1.00, 2.585), 0.13, 0.075),
        "chest": ((cx, 1.20, 2.60), 0.115, 0.075),
        "waist": ((cx, 1.42, 2.61), 0.07, 0.055),
        "pelvis": ((cx, 1.62, 2.60), 0.11, 0.08),
        "neck0": ((cx, 0.86, 2.55), 0.046, 0.046),
        "neck1": ((cx, 0.77, 2.47), 0.04, 0.04),
    }
    for s, sd in ((1, "L"), (-1, "R")):
        J["shoulder" + sd] = ((cx + s * 0.21, 1.02, 2.60), 0.05, 0.05)
        J["elbow" + sd] = ((cx + s * 0.56, 0.86, 2.40), 0.037, 0.037)
        J["wrist" + sd] = ((cx + s * 0.76, 0.62, 2.63), 0.025, 0.025)
        J["palm" + sd] = ((cx + s * 0.79, 0.55, 2.665), 0.03, 0.016)
        for k, a in enumerate((-0.5, -0.17, 0.17, 0.5)):
            dirv = Vector((s * math.sin(a + 0.3), -math.cos(a + 0.3), 0))
            base = Vector((cx + s * 0.79, 0.55, 2.672))
            J[f"f{k}a" + sd] = (base + dirv * 0.05, 0.011, 0.011)
            J[f"f{k}b" + sd] = (base + dirv * 0.15, 0.0085, 0.0085)
            J[f"f{k}c" + sd] = (base + dirv * 0.25, 0.006, 0.006)
        J["thumba" + sd] = ((cx + s * 0.74, 0.52, 2.67), 0.011, 0.011)
        J["thumbb" + sd] = ((cx + s * 0.70, 0.47, 2.672), 0.008, 0.008)
        J["hip" + sd] = ((cx + s * 0.10, 1.68, 2.60), 0.07, 0.07)
        J["knee" + sd] = ((cx + s * 0.62, 1.86, 2.44), 0.047, 0.047)
        J["ankle" + sd] = ((cx + s * 0.78, 1.70, 2.66), 0.032, 0.032)
        J["toe" + sd] = ((cx + s * 0.86, 1.58, 2.685), 0.028, 0.02)
    return {k: [Vector(p), rx, ry] for k, (p, rx, ry) in J.items()}


def skin_body(name, J, col):
    add_mids(J)
    names = list(J.keys())
    idx = {k: i for i, k in enumerate(names)}
    edges = [(idx[a], idx[b]) for a, b in body_edges() if a in idx and b in idx]
    me = bpy.data.meshes.new(name)
    me.from_pydata([J[k][0] for k in names], edges, [])
    ob = new_object(name, me, col)
    sk = ob.modifiers.new("Skin", "SKIN")
    sk.use_smooth_shade = True
    sk.branch_smoothing = 0.35
    for i, k in enumerate(names):
        sv = me.skin_vertices[0].data[i]
        sv.radius = (J[k][1], J[k][2])
        sv.use_root = (k == "pelvis")
    sub = ob.modifiers.new("Subsurf", "SUBSURF")
    sub.levels = sub.render_levels = 2
    flesh = bpy.data.textures.get("Flesh") or bpy.data.textures.new("Flesh", "CLOUDS")
    flesh.noise_scale = 0.045
    disp = ob.modifiers.new("Lumps", "DISPLACE")
    disp.texture, disp.strength, disp.mid_level = flesh, 0.007, 0.5
    me.materials.append(bpy.data.materials["Skin"])
    return ob


def orient(forward, up=Vector((0, 0, 1))):
    """Rotation whose local -Y looks along `forward` with local +Z toward `up`."""
    y = -forward.normalized()
    z = (up - y * up.dot(y)).normalized()
    x = y.cross(z)
    return Matrix((x, y, z)).transposed().to_quaternion()


def build_figure(key, J, assets, M, col, neck_end, head_offset, base_q, smile, roll=0.0,
                 eye_mat=None, shape_keys=False):
    fcol = bpy.data.collections.new(key)
    col.children.link(fcol)
    body = skin_body(f"{key}_Body", J, fcol)

    pivot = new_object(f"{key}_Neck", None, fcol)
    pivot.location = neck_end
    pivot.rotation_mode = "QUATERNION"
    pivot.rotation_quaternion = base_q
    roller = new_object(f"{key}_Roll", None, fcol, parent=pivot)
    roller.rotation_euler = (0, math.radians(roll), 0)
    head = new_object(f"{key}_Head", assets["head"], fcol, parent=roller)
    head.location = head_offset
    head.scale = (HEAD_SCALE,) * 3

    teeth = new_object(f"{key}_Teeth", assets["teeth"], fcol, parent=head)

    cut_me = cutter_mesh(f"{key}_MouthCut", assets["bvh"], [smile])
    cut_me.materials.append(M["gums"])
    cutter = new_object(f"{key}_MouthCut", cut_me, fcol, parent=head)
    cutter.hide_render = True
    cutter.display_type = "WIRE"
    if shape_keys:
        cutter.shape_key_add(name="Basis")
        for s in SMILE_KEYS[1:]:
            kb = cutter.shape_key_add(name=f"grin_{s:.2f}")
            for v, co in zip(kb.data, cutter_coords(assets["bvh"], s)):
                v.co = co
    mod = head.modifiers.new("Mouth", "BOOLEAN")
    mod.operation, mod.object = "DIFFERENCE", cutter
    mod.solver = "MANIFOLD"     # EXACT silently drops this cut
    mod.material_mode = "TRANSFER"

    eyes = []
    cam = bpy.data.objects["Camcorder"]
    for k, pos in enumerate(assets["eyes"]):
        e = new_object(f"{key}_Eye{k}", assets["eye"], fcol, parent=head)
        e.location = pos
        e.scale = (EYE_R,) * 3
        tr = e.constraints.new("DAMPED_TRACK")
        tr.target, tr.track_axis = cam, "TRACK_NEGATIVE_Y"
        eyes.append(e)
    for e in eyes:               # shared eyeball mesh, per-object material (F7's eyes shine)
        e.material_slots[0].link = "OBJECT"
        e.material_slots[0].material = eye_mat or M["eye"]

    return {"objs": [body, head, teeth] + eyes, "pivot": pivot, "roller": roller, "cutter": cutter, "head": head}


def keep_visible(objs, start, end):
    for ob in objs:
        for f, hidden in ((0, True), (start, False), (end, True)):
            ob.hide_render = hidden
            ob.keyframe_insert("hide_render", frame=f)
    bpy.context.scene.frame_set(0)


def head_offset_upright():
    return Vector((0, 0.012, 0.128)) * HEAD_SCALE


def build_figures(M):
    col = collection("It")
    assets = build_figure_assets(M)
    rng = random.Random(9)

    # (key, position on the floor, roll, how it stands)
    upright = [("F1", (0.02, 27.3), 20, None),
               ("F2", (-0.28, 20.6), 33, None),
               ("F3", (0.22, 14.4), -21, None),
               ("F4", (-0.12, 9.6), 47, "reach"),
               ("F5", (0.16, 6.3), 61, "hunch"),
               ("F6", F6_POS, T.ROLL_F6[0][1], "tall")]
    figs = {}
    for key, (fx, fy), roll, how in upright:
        J = base_joints()
        if how == "reach":
            reach_arm(J, "R", Vector((CAM_POS.x - fx, -fy + 1.2, 1.5)))
        if how == "hunch":
            bend_forward(J, 28)
            for sd in "LR":
                for k in ARM:
                    J[k + sd][0].z -= 0.12
        scale = 1.05 if how == "tall" else 1.0 + rng.uniform(-0.02, 0.02)
        for k in J:
            J[k][0] = J[k][0] * scale + Vector((fx, fy, 0))
        neck = J["neck2"][0]
        head_c = neck + head_offset_upright()
        q = orient(CAM_POS - head_c)
        fig = build_figure(key, J, assets, M, col, neck, head_offset_upright(), q,
                           T.SMILE.get(key, T.SMILE["F5"]), roll, shape_keys=(key == "F6"))
        keep_visible(fig["objs"], *T.FIGURES[key])
        figs[key] = fig

    # F6: once it stops moving, it starts to smile, and the neck gives out in jerks.
    f6 = figs["F6"]
    for f, deg in T.ROLL_F6:
        f6["roller"].rotation_euler = (0, math.radians(deg), 0)
        f6["roller"].keyframe_insert("rotation_euler", index=1, frame=f)
    blocks = f6["cutter"].data.shape_keys.key_blocks
    a, b = T.FIGURES["F6"]
    for f in range(a, b + 1):
        s = T.smile_f6(f)
        k = max(i for i in range(len(SMILE_KEYS) - 1) if SMILE_KEYS[i] <= s + 1e-9) if s < 1 else len(SMILE_KEYS) - 2
        u = (s - SMILE_KEYS[k]) / (SMILE_KEYS[k + 1] - SMILE_KEYS[k])
        for j in range(1, len(SMILE_KEYS)):
            w = (1 - u) if j == k else (u if j == k + 1 else 0.0)
            blocks[j].value = w
            blocks[j].keyframe_insert("value", frame=f)

    # F7: on the ceiling, right above you, the whole time the camera is in night-shot.
    J = ceiling_joints()
    head_c = Vector((CAM_POS.x, 0.62, 2.27))
    face = (CAM_POS - head_c).normalized()
    cam_up = Vector((0, -face.z, face.y)) * -1          # "up" as the operator sees it, looking up at it
    q = orient(face, up=cam_up)
    back = head_c - face * 0.104 * HEAD_SCALE
    J["neck2"] = [back.copy(), 0.037, 0.037]
    q = (Quaternion(face, math.radians(-32)) @ q)
    offset = Vector((0, -0.104, 0.0)) * HEAD_SCALE
    f7 = build_figure("F7", J, assets, M, col, back, offset, q, 1.0, 0.0, eye_mat=M["eye_glow"])
    keep_visible(f7["objs"], *T.FIGURES["F7"])
    # the lunge
    target = CAM_POS + face * -0.22
    a, b = T.LUNGE
    for f in range(a - 1, b + 1):
        u = min(1.0, max(0.0, (f - a + 1) / (b - a))) ** 1.6
        f7["pivot"].location = back + (target - head_c) * u
        f7["pivot"].keyframe_insert("location", frame=f)
    return figs


# -------------------------------------------------------------------- camera
def cam_state(f):
    pitch, yaw, lens, shake = 89.0, 0.6, 24.0, 1.0
    if 120 <= f < 178:
        lens = 24 + 9 * T.smoothstep(120, 165, f)           # what is that?
    a6, b6 = T.FIGURES["F6"]
    if a6 <= f < T.NV_START:
        g = T.smoothstep(380, 465, min(f, 469))
        lens = 24 + 28 * g                                   # frozen, zooming in on its face
        pitch = 89 + 17.2 * g
        yaw = 0.6 + 1.5 * g
        shake = 1 + 1.8 * T.smoothstep(400, 468, f)
    if f >= T.NV_START:
        shake = 2.2
        if f < 500:
            yaw = lerp(0.6, 11.0, T.smoothstep(T.NV_START + 4, 500, f))
        elif f < 525:
            yaw = lerp(11.0, -9.0, T.smoothstep(500, 525, f))
        else:
            yaw = lerp(-9.0, 0.0, T.smoothstep(525, 540, f))
        pitch = lerp(88.0, 139.0, T.smoothstep(T.TILT[0], T.TILT[1], f))
        if f >= T.LUNGE[0]:
            shake = 7.0
    t = f / T.FPS
    n1 = noise.noise(Vector((t * 0.8, 1.7, 0.3))) * 0.7 + noise.noise(Vector((t * 3.3, 5.2, 1.1))) * 0.3
    n2 = noise.noise(Vector((t * 0.7, 9.1, 4.4))) * 0.7 + noise.noise(Vector((t * 2.9, 2.5, 7.7))) * 0.3
    n3 = noise.noise(Vector((t * 0.5, 3.3, 8.8)))
    pitch += n1 * 0.45 * shake
    yaw += n2 * 0.45 * shake
    roll = n3 * 0.7 * shake + 0.4
    loc = CAM_POS + Vector((n2 * 0.004, n3 * 0.004, n1 * 0.004 + math.sin(t * 2 * math.pi / 3.6) * 0.003)) * shake
    return loc, Euler((math.radians(pitch), math.radians(roll), math.radians(yaw))), lens


def build_camera():
    col = collection("Operator")
    cd = bpy.data.cameras.new("Camcorder")
    cd.clip_start, cd.clip_end = 0.03, 80.0
    cd.sensor_width = 36.0
    cam = new_object("Camcorder", cd, col)
    bpy.context.scene.camera = cam

    ir = bpy.data.lights.new("NightShotIR", "SPOT")
    ir.spot_size, ir.spot_blend = math.radians(110), 0.9
    ir.shadow_soft_size, ir.color = 0.03, (1.0, 1.0, 1.0)
    irob = new_object("NightShotIR", ir, col, parent=cam)
    irob.location = (0.05, -0.04, 0)
    for f, e in ((0, 0.0), (T.NV_START, 60.0), (T.CUT, 0.0)):
        ir.energy = e
        ir.keyframe_insert("energy", frame=f)
    return cam


def animate_camera(cam):
    for f in range(0, T.CUT + 1):
        loc, rot, lens = cam_state(f)
        cam.location, cam.rotation_euler, cam.data.lens = loc, rot, lens
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
        cam.data.keyframe_insert("lens", frame=f)


def snap_all_keys():
    """Fluorescents don't fade, they flicker. Every key in the film is a hard cut."""
    for act in bpy.data.actions:
        for layer in act.layers:
            for strip in layer.strips:
                for bag in strip.channelbags:
                    for fc in bag.fcurves:
                        for kp in fc.keyframe_points:
                            kp.interpolation = "CONSTANT"


# ----------------------------------------------------------------------- main
def build(samples=14):
    sc = reset(samples)
    M = build_materials()
    build_hallway(M)
    rigs = build_lights()
    animate_lights(rigs)
    cam = build_camera()
    animate_camera(cam)
    build_figures(M)
    snap_all_keys()
    sc.frame_set(0)
    return sc


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    ap = argparse.ArgumentParser()
    ap.add_argument("--blend")
    ap.add_argument("--still", nargs=2, action="append", metavar=("FRAME", "PNG"))
    ap.add_argument("--render", metavar="DIR")
    ap.add_argument("--frames", nargs=2, type=int, metavar=("START", "END"))
    ap.add_argument("--samples", type=int, default=14)
    ap.add_argument("--percent", type=int, default=100)
    args = ap.parse_args(argv)

    sc = build(args.samples)
    sc.render.resolution_percentage = args.percent
    if args.blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(args.blend), compress=True)
    for frame, png in args.still or []:
        sc.frame_set(int(frame))
        sc.render.filepath = os.path.abspath(png)
        bpy.ops.render.render(write_still=True)
    if args.render:
        out = os.path.abspath(args.render)
        os.makedirs(out, exist_ok=True)
        for name in os.listdir(out):            # half-written frames from a killed run
            p = os.path.join(out, name)
            if os.path.getsize(p) == 0:
                os.remove(p)
        start, end = args.frames or (0, T.CUT - 1)
        sc.frame_start, sc.frame_end = start, end
        sc.render.filepath = os.path.join(out, "f_####")
        sc.render.use_overwrite = False
        sc.render.use_placeholder = True
        bpy.ops.render.render(animation=True)


if __name__ == "__main__":
    main()

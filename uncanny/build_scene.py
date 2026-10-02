"""THE HALLWAY: a procedural found-footage horror short, built in Blender + Cycles.

The corridor, the fluorescent lights and the camera are generated from code.
The thing in the hallway is built by creature.py from MakeHuman's CC0 human
assets (fetched by fetch_assets.py), then made wrong.

    python3 uncanny/build_scene.py --blend hallway.blend          # build + save .blend
    python3 uncanny/build_scene.py --still 465 grin.png           # render one frame
    python3 uncanny/build_scene.py --render frames/               # render the tape (resumable)

Needs the `bpy` module (pip install bpy) or run through Blender 5.x:
    blender -b -P uncanny/build_scene.py -- --render frames/
"""
import argparse
import math
import os
import sys

import bpy  # noqa: I001  (must come first: it puts addon_utils on the path)
import addon_utils
import bmesh
from mathutils import Euler, Vector, noise

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import creature as C  # noqa: E402
import timeline as T  # noqa: E402

# ----------------------------------------------------------------- dimensions
HW, H = 1.2, 2.7             # corridor half-width, ceiling height
Y0, Y1 = -2.0, 30.0          # corridor extent
WALL_T = 0.1
DOOR_W, DOOR_H = 0.95, 2.1
DOORS = {-1: [8.2, 18.6], 1: [12.3, 24.0]}   # side -> doorway centres along Y

CAM_POS = Vector((0.28, 0.0, 1.55))
LIGHT_W = 62.0               # area light watts per panel
PANEL_EMIT = 9.0             # what the camera sees of a panel
FLUO = (0.86, 1.0, 0.84, 1.0)


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

    def mix(self, fac, a, b, blend="MIX"):
        nd = self.nt.nodes.new("ShaderNodeMix")
        nd.data_type = "RGBA"
        nd.blend_type = blend
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

    return M


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


# ---------------------------------------------------------------- the tenant
FOCUS = {}                   # where its face is, for the camera operator to find

# key, pose, expression, where its head is (x, y), how far its head is cocked
APPEARANCES = [
    ("F1", "marionette", "blank", (0.02, 27.2), 22),     # under the EXIT sign, up on its toes
    ("F2", "marionette", "blank", (-0.30, 20.5), -30),
    ("F3", "folded", "blank", (0.22, 14.2), 12),         # bent double, face up at you
    ("F4", "reach", "grin", (-0.12, 9.4), 8),            # reaching for the lens. first smile
    ("F5", "spider", "wide", (0.16, 5.6), 0),            # coming head first, upside down
]
F6_HEAD = (0.08, 2.4)        # where it finally stops
F7_HEAD = (0.28, 0.5)        # straight above the operator


def keep_visible(objs, start, end):
    for ob in objs:
        for f, hidden in ((0, True), (start, False), (end, True)):
            ob.hide_render = hidden
            ob.keyframe_insert("hide_render", frame=f)


def tenant_objects(h):
    return [h.body, h.teeth, h.tongue] + h.eyes


def build_figures(cam):
    col = collection("Tenant")
    TM = C.materials(Nodes, rgba)
    for key, pose, face, head, roll in APPEARANCES:
        h = C.build(key, col, TM, pose=pose, face=face, cam=cam, look=CAM_POS, roll=roll, head_at=head)
        keep_visible(tenant_objects(h), *T.FIGURES[key])

    # F6: stands over you and smiles, then keeps smiling past where a mouth stops,
    # while its head goes over one cracking notch at a time.
    f6 = C.build("F6", col, TM, pose="loom", face="blank", keys=("grin", "wide"), cam=cam, look=CAM_POS,
                 head_at=F6_HEAD)
    keep_visible(tenant_objects(f6), *T.FIGURES["F6"])
    FOCUS["F6"] = C.head_centre(f6)
    pb = f6.arm.pose.bones["head"]
    base = pb.matrix.copy()
    for f, deg in [(0, T.ROLL_F6[0][1])] + T.ROLL_F6:
        pb.matrix = base
        bpy.context.view_layer.update()
        C.look_at(f6, CAM_POS, deg)
        pb.keyframe_insert("rotation_quaternion", frame=f)
        pb.keyframe_insert("location", frame=f)
    FOCUS["F6_end"] = C.head_centre(f6)                # where its face ends up, over on its shoulder
    kb = f6.body.data.shape_keys.key_blocks
    a, b = T.FIGURES["F6"]
    for f in range(a, b + 1):
        g, w = T.grin_f6(f), T.wide_f6(f)
        kb["grin"].value, kb["wide"].value = g * (1 - w), w
        kb["grin"].keyframe_insert("value", frame=f)
        kb["wide"].keyframe_insert("value", frame=f)

    # F7: on the ceiling the whole time the camera's in night-shot.
    f7 = C.build("F7", col, TM, pose="ceiling", face="wide", keys=("scream",), cam=cam, look=CAM_POS, roll=15,
                 eye_mat=TM["TenantEyeShine"], on_ceiling=H - 0.01, head_at=F7_HEAD)
    keep_visible(tenant_objects(f7), *T.FIGURES["F7"])
    FOCUS["F7"] = C.head_centre(f7)
    start = f7.arm.location.copy()
    lunge = (CAM_POS - FOCUS["F7"]) * 0.75
    scream = f7.body.data.shape_keys.key_blocks["scream"]
    a, b = T.LUNGE
    for f in range(a - 1, b + 1):
        u = min(1.0, max(0.0, (f - a + 1) / (b - a))) ** 1.6
        f7.arm.location = start + lunge * u
        f7.arm.keyframe_insert("location", frame=f)
        scream.value = min(1.0, u * 1.6)
        scream.keyframe_insert("value", frame=f)


# -------------------------------------------------------------------- camera
def aim_angles(target):
    """Camera pitch/yaw (degrees) that put `target` in the middle of frame."""
    d = target - CAM_POS
    return 90 + math.degrees(math.atan2(d.z, math.hypot(d.x, d.y))), math.degrees(math.atan2(-d.x, d.y))


def cam_state(f):
    pitch, yaw, lens, shake = 89.0, 0.6, 24.0, 1.0
    if 120 <= f < 178:
        lens = 24 + 9 * T.smoothstep(120, 165, f)           # what is that?
    a6, b6 = T.FIGURES["F6"]
    if a6 <= f < T.NV_START:
        g = T.smoothstep(380, 465, min(f, 469))
        p6, y6 = aim_angles(FOCUS["F6"].lerp(FOCUS["F6_end"], T.smoothstep(390, 462, min(f, 469))))
        lens = 24 + 44 * g                                   # frozen, zooming in on its face
        pitch = lerp(89, p6, T.smoothstep(350, 420, min(f, 469)))
        yaw = lerp(0.6, y6, T.smoothstep(350, 420, min(f, 469)))
        shake = 1 + 1.8 * T.smoothstep(400, 468, f)
    if f >= T.NV_START:
        shake = 2.2
        if f < 500:
            yaw = lerp(0.6, 11.0, T.smoothstep(T.NV_START + 4, 500, f))
        elif f < 525:
            yaw = lerp(11.0, -9.0, T.smoothstep(500, 525, f))
        else:
            yaw = lerp(-9.0, 0.0, T.smoothstep(525, 540, f))
        p7, y7 = aim_angles(FOCUS["F7"])
        tilt = T.smoothstep(T.TILT[0], T.TILT[1], f)
        pitch = lerp(88.0, p7, tilt)
        yaw = lerp(yaw, y7, tilt)
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
    build_figures(cam)
    animate_camera(cam)
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
    ap.add_argument("--res", nargs=2, type=int, metavar=("W", "H"))
    args = ap.parse_args(argv)

    sc = build(args.samples)
    sc.render.resolution_percentage = args.percent
    if args.res:
        sc.render.resolution_x, sc.render.resolution_y = args.res
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

"""A real human, from MakeHuman's CC0 assets, ready to be made wrong.

Loads the hm08 base mesh, blends morph targets (macro age/weight/muscle plus
any local targets and facial expression units), rigs it with the default
163-bone skeleton and its skin weights, and fits proxy meshes (eyes, teeth,
tongue) with their .mhclo barycentric bindings.

The assets are not in the repo; fetch_assets.py downloads them.
"""
import gzip
import io
import json
import os

import bpy
import numpy as np
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.environ.get("HALLWAY_ASSETS", os.path.join(HERE, "assets"))
MPFB = os.path.join(ASSETS, "mpfb", "data")
SYS = os.path.join(ASSETS, "sys")


def mh_to_blender(a):
    """MakeHuman decimetres, Y up  ->  Blender metres, Z up."""
    a = np.asarray(a, np.float64)
    return np.stack([a[..., 0], -a[..., 2], a[..., 1]], axis=-1) * 0.1


# ------------------------------------------------------------------ obj files
def read_obj(path):
    v, vt, faces, group = [], [], {}, "default"
    with open(path) as fh:
        for line in fh:
            if line.startswith("v "):
                v.append([float(x) for x in line.split()[1:4]])
            elif line.startswith("vt "):
                vt.append([float(x) for x in line.split()[1:3]])
            elif line.startswith("g "):
                group = line.split(None, 1)[1].strip()
            elif line.startswith("f "):
                corners = [c.split("/") for c in line.split()[1:]]
                fv = tuple(int(c[0]) - 1 for c in corners)
                ft = tuple(int(c[1]) - 1 for c in corners) if len(corners[0]) > 1 and corners[0][1] else None
                faces.setdefault(group, []).append((fv, ft))
    return np.array(v), np.array(vt) if vt else None, faces


class Base:
    _inst = None

    @classmethod
    def get(cls):
        if cls._inst is None:
            cls._inst = cls()
        return cls._inst

    def __init__(self):
        self.v, self.vt, self.faces = read_obj(os.path.join(MPFB, "3dobjs", "base.obj"))
        self.groups = {g: np.unique([i for fv, _ in fs for i in fv]) for g, fs in self.faces.items()}


# -------------------------------------------------------------------- targets
_TARGETS = {}


def read_target(rel):
    """Sparse vertex offsets: (indices, deltas) in MakeHuman space."""
    if rel not in _TARGETS:
        path = os.path.join(MPFB, "targets", rel + ".target.gz")
        with gzip.open(path, "rt") as fh:
            text = "\n".join(ln for ln in fh.read().splitlines() if ln.strip() and ln[0] not in "#\"")
        if not text:
            _TARGETS[rel] = (np.zeros(0, int), np.zeros((0, 3)))
        else:
            arr = np.loadtxt(io.StringIO(text), ndmin=2)
            _TARGETS[rel] = (arr[:, 0].astype(int), arr[:, 1:4])
    return _TARGETS[rel]


def _macro_parts():
    with open(os.path.join(MPFB, "targets", "macrodetails", "macro.json")) as fh:
        return json.load(fh)["macrotargets"]


def _interp(parts, value):
    out = []
    for p in parts:
        if p["lowest"] < value < p["highest"]:
            t = (value - p["lowest"]) / (p["highest"] - p["lowest"])
            if p["low"]:
                out.append((p["low"], 1 - t))
            if p["high"]:
                out.append((p["high"], t))
    return out


def macro_targets(gender=0.5, age=0.5, muscle=0.5, weight=0.5, height=0.5, proportions=0.5, race=None):
    """The same blend MakeHuman/MPFB use for their macro sliders."""
    race = race or {"caucasian": 1.0}
    M = _macro_parts()
    c = {k: _interp(M[k]["parts"], v) for k, v in
         dict(gender=gender, age=age, muscle=muscle, weight=weight, height=height, proportions=proportions).items()}
    out = []
    for r, rw in race.items():
        for g, gw in c["gender"]:
            for a, aw in c["age"]:
                out.append((f"macrodetails/{r}-{g}-{a}", rw * gw * aw))
    for g, gw in c["gender"]:
        for a, aw in c["age"]:
            for m, mw in c["muscle"]:
                for w, ww in c["weight"]:
                    base = gw * aw * mw * ww
                    out.append((f"macrodetails/universal-{g}-{a}-{m}-{w}", base))
                    for h, hw in c["height"]:
                        out.append((f"macrodetails/height/{g}-{a}-{m}-{w}-{h}", base * hw))
                    for p, pw in c["proportions"]:
                        out.append((f"macrodetails/proportions/{g}-{a}-{m}-{w}-{p}", base * pw))
    return [(t, w) for t, w in out if w > 0.005]


def morph(targets):
    """Base mesh coordinates (all vertices, helpers included) with targets applied."""
    v = Base.get().v.copy()
    for rel, w in targets:
        if abs(w) < 1e-6:
            continue
        idx, d = read_target(rel)
        np.add.at(v, idx, d * w)
    return v


# ----------------------------------------------------------------- the human
class Human:
    """A morphed, rigged, skinned body plus fitted eyes/teeth/tongue."""

    def __init__(self, name, targets, col, materials, feet_at_zero=True, subdivide=0, sculpt=None):
        self.name = name
        base = Base.get()
        self.mh = morph(targets)
        v = mh_to_blender(self.mh)
        self.lift = -v[base.groups["body"]][:, 2].min() if feet_at_zero else 0.0
        v[:, 2] += self.lift
        self.v = v
        self.col = col
        self.body = self._build_body(materials["skin"])
        self.arm = self._build_armature()
        if subdivide:
            self._apply_subdivision(subdivide)
        if sculpt:
            sculpt(self)
        self.body.parent = self.arm
        mod = self.body.modifiers.new("Rig", "ARMATURE")
        mod.object = self.arm
        self.parts = {}

    # body ------------------------------------------------------------------
    def _build_body(self, skin):
        base = Base.get()
        faces = base.faces["body"]
        used = np.unique([i for fv, _ in faces for i in fv])
        remap = np.full(len(base.v), -1)
        remap[used] = np.arange(len(used))
        self.remap, self.used = remap, used
        me = bpy.data.meshes.new(self.name + "_Body")
        me.from_pydata(self.v[used].tolist(), [], [tuple(remap[i] for i in fv) for fv, _ in faces])
        uv = me.uv_layers.new(name="UVMap")
        coords = np.array([base.vt[t] for _, ft in faces for t in ft])
        uv.data.foreach_set("uv", coords.ravel())
        me.polygons.foreach_set("use_smooth", [True] * len(me.polygons))
        me.materials.append(skin)
        ob = bpy.data.objects.new(self.name + "_Body", me)
        self.col.objects.link(ob)
        return ob

    def _apply_subdivision(self, levels):
        """Bake a subdivision into the rest mesh (weights and UVs come along),
        so there is enough surface to sculpt ribs and tendons into."""
        mod = self.body.modifiers.new("Sub", "SUBSURF")
        mod.levels = mod.render_levels = levels
        mod.uv_smooth = "PRESERVE_BOUNDARIES"
        vl = bpy.context.view_layer
        vl.objects.active = self.body
        bpy.ops.object.modifier_apply(modifier="Sub")

    def rest(self):
        """(N,3) rest-pose vertex positions and normals of the body."""
        me = self.body.data
        co = np.empty(len(me.vertices) * 3)
        no = np.empty(len(me.vertices) * 3)
        me.vertices.foreach_get("co", co)
        me.vertices.foreach_get("normal", no)
        return co.reshape(-1, 3), no.reshape(-1, 3)

    def set_rest(self, co):
        self.body.data.vertices.foreach_set("co", co.ravel())
        self.body.data.update()

    def bone_rest(self, name, tail=False):
        b = self.arm.data.bones[name]
        return np.array(b.tail_local if tail else b.head_local)

    # skeleton --------------------------------------------------------------
    def joint(self, spec):
        base = Base.get()
        s = spec["strategy"]
        if s == "CUBE":
            return Vector(self.v[base.groups[spec["cube_name"]]].mean(0))
        if s == "VERTEX":
            return Vector(self.v[spec["vertex_index"]])
        return Vector(self.v[spec["vertex_indices"]].mean(0))

    def _build_armature(self):
        with open(os.path.join(MPFB, "rigs", "standard", "rig.default.json")) as fh:
            rig = json.load(fh)
        data = bpy.data.armatures.new(self.name + "_Rig")
        arm = bpy.data.objects.new(self.name + "_Rig", data)
        self.col.objects.link(arm)
        vl = bpy.context.view_layer
        for o in vl.objects:
            o.select_set(False)
        vl.objects.active = arm
        arm.select_set(True)
        bpy.ops.object.mode_set(mode="EDIT")
        eb = data.edit_bones
        for name, b in rig.items():
            bone = eb.new(name)
            bone.head, bone.tail = self.joint(b["head"]), self.joint(b["tail"])
            bone.roll = b["roll"]
        for name, b in rig.items():
            if b.get("parent"):
                eb[name].parent = eb[b["parent"]]
                eb[name].use_connect = b.get("use_connect", False)
        bpy.ops.object.mode_set(mode="OBJECT")
        arm.hide_render = True

        with open(os.path.join(MPFB, "rigs", "standard", "weights.default.json")) as fh:
            weights = json.load(fh)["weights"]
        for bone, pairs in weights.items():
            vg = self.body.vertex_groups.new(name=bone)
            by_w = {}
            for i, w in pairs:
                j = int(self.remap[i])
                if j >= 0:
                    by_w.setdefault(round(w, 4), []).append(j)
            for w, idx in by_w.items():
                vg.add(idx, w, "REPLACE")
        self.rig = rig
        return arm

    def pose(self, rotations):
        """{bone: (x, y, z) degrees, local Euler} applied to the pose."""
        import math
        for name, rot in rotations.items():
            pb = self.arm.pose.bones[name]
            pb.rotation_mode = "XYZ"
            pb.rotation_euler = [math.radians(a) for a in rot]

    # proxies ---------------------------------------------------------------
    def fit_proxy(self, mhclo, material, bone=None, name=None, mh=None):
        folder = os.path.dirname(mhclo)
        scales, verts, obj_file, in_verts = {}, [], None, False
        with open(mhclo) as fh:
            for line in fh:
                parts = line.split()
                if not parts or parts[0].startswith("#"):
                    in_verts = in_verts and bool(parts)
                    continue
                if in_verts:
                    if parts[0].isdigit() or parts[0].lstrip("-").replace(".", "", 1).isdigit():
                        verts.append(parts)
                        continue
                    in_verts = False
                if parts[0] == "obj_file":
                    obj_file = parts[1]
                elif parts[0] in ("x_scale", "y_scale", "z_scale"):
                    scales[parts[0][0]] = (int(parts[1]), int(parts[2]), float(parts[3]))
                elif parts[0] == "verts":
                    in_verts = True
        mh = self.mh if mh is None else mh
        s = np.array([abs(mh[a][k] - mh[b][k]) / d for k, (a, b, d) in
                      zip(range(3), (scales["x"], scales["y"], scales["z"]))])
        pos = []
        for p in verts:
            if len(p) == 1:
                pos.append(mh[int(p[0])])
            else:
                i = [int(x) for x in p[:3]]
                w = np.array([float(x) for x in p[3:6]])
                d = np.array([float(x) for x in p[6:9]])
                pos.append(w @ mh[i] + d * s)
        pv = mh_to_blender(np.array(pos))
        pv[:, 2] += self.lift
        _, vt, faces = read_obj(os.path.join(folder, obj_file))
        allf = [f for fs in faces.values() for f in fs]
        me = bpy.data.meshes.new(name or os.path.basename(mhclo))
        me.from_pydata(pv.tolist(), [], [fv for fv, _ in allf])
        if vt is not None and allf[0][1] is not None:
            uv = me.uv_layers.new(name="UVMap")
            uv.data.foreach_set("uv", np.array([vt[t] for _, ft in allf for t in ft]).ravel())
        me.polygons.foreach_set("use_smooth", [True] * len(me.polygons))
        me.materials.append(material)
        ob = bpy.data.objects.new(name or me.name, me)
        self.col.objects.link(ob)
        if bone:
            self.parent_to_bone(ob, bone)
        return ob

    def parent_to_bone(self, ob, bone):
        """Rigid-attach `ob` to a bone, keeping its current world placement."""
        bpy.context.view_layer.update()            # a just-created object's matrix_world is stale
        mw = ob.matrix_world.copy()
        ob.parent = self.arm
        ob.parent_type = "BONE"
        ob.parent_bone = bone
        bpy.context.view_layer.update()
        ob.matrix_world = mw

    def remove(self):
        """Delete this human's objects and data (used for throwaway expression builds)."""
        for ob in (self.body, self.arm):
            data = ob.data
            bpy.data.objects.remove(ob)
            if isinstance(data, bpy.types.Mesh):
                bpy.data.meshes.remove(data)
            else:
                bpy.data.armatures.remove(data)

    def bone_head(self, name):
        return self.arm.matrix_world @ self.arm.data.bones[name].head_local

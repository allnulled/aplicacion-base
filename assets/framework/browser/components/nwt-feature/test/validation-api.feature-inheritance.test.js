const out = await NwtResource.for("@control/for/class/point3d").load();
assertion("@control/for/class/point3d" in out.statics.traits, "Validation API error: Point3D class is not marking self traits");
assertion("@control/for/class/point" in out.statics.traits, "Validation API error: Point3D class is not inheriting traits from Point class");
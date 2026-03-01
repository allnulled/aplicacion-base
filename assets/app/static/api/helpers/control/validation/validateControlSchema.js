NwtStatic.api.set("control.validation.validateControlSchema", function (schema, schemaIndex = [], assertion = NwtAsserter.silently) {
  trace("NwtStatic.api.control.validation.validateControlSchema", [schema, schemaIndex]);
  const subschema = !schemaIndex.length ? schema : NwtAccessor.get(schema, schemaIndex, NwtAccessor.strategy.RETURN_ACCESS_ERROR);
  assertion(!(subschema instanceof NwtAccessor.Error), `Could not access schema index «${schemaIndex.join(".") || "[]"}» because «${subschema.message}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  assertion(typeof subschema === "object", `Property should be object on schema index «${schemaIndex.join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  assertion(typeof subschema.type === "string", `Missing property «type:string» on schema index «${schemaIndex.join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  if(subschema.hasCompiledSchema) {
    return schema;
  }
  assertion(NwtResource.isDefined(subschema.type), `Resource «${subschema.type}» is not defined globally on schema index «${schemaIndex.concat(["type"]).join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  const ControlResource = NwtResource.for(subschema.type);
  assertion(typeof ControlResource.id, `Missing property «id:string» on resource «${subschema.type}» on schema index «${schemaIndex.join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  assertion(typeof ControlResource.subtypeOf, `Missing property «subtypeOf:string» on resource «${subschema.type}» on schema index «${schemaIndex.join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlSchema»`);
  const archtype = ControlResource.subtypeOf;
  const mustProvideSchema = ["structure", "list", "option", "abstraction"].includes(archtype);
  // Aquí la herencia del schema, que puede ir o por statically o por settings:
  if (mustProvideSchema) {
    const hasOwnSchema = !!subschema.schema;
    const evaluableSubchema = hasOwnSchema ? subschema.schema : ControlResource.control?.schema;
    Compile_external_schema_on_subschema: {
      Object.assign(subschema, {schema: evaluableSubchema});
    }
    assertion(typeof evaluableSubchema === "object", `Missing property «schema:object» on schema index «${schemaIndex.join(".") || "[]"}» because it is subtype of «${archtype}» on «NwtStatic.api.control.validation.validateControlSchema»`);
    if (archtype === "structure") {
      assertion(typeof evaluableSubchema === "object", `Missing property «schema:object» on schema index «${schemaIndex.join(".") || "[]"}» because it is subtype of «structure» on «NwtStatic.api.control.validation.validateControlSchema»`);
      for (let prop in evaluableSubchema) {
        NwtStatic.api.control.validation.validateControlSchema(schema, schemaIndex.concat(["schema", prop]), assertion);
      }
    } else if (archtype === "list") {
      assertion(typeof evaluableSubchema === "object", `Missing property «schema:object» on schema index «${schemaIndex.join(".") || "[]"}» because it is subtype of «list» on «NwtStatic.api.control.validation.validateControlSchema»`);
      NwtStatic.api.control.validation.validateControlSchema(schema, schemaIndex.concat(["schema"]), assertion);
    } else if (archtype === "option") {
      assertion(Array.isArray(evaluableSubchema), `Missing property «schema:array» on schema index «${schemaIndex.join(".") || "[]"}» because it is subtype of «option» on «NwtStatic.api.control.validation.validateControlSchema»`);
      Iterating_options:
      for (let index = 0; index < evaluableSubchema.length; index++) {
        NwtStatic.api.control.validation.validateControlSchema(schema, schemaIndex.concat(["schema", index]), assertion);
      }
    }
  }
  if(schemaIndex.length === 0) {
    subschema.hasCompiledSchema = true;
  }
  return subschema;
});
NwtStatic.api.set("control.validation.compileSchema", NwtStatic.api.control.validation.validateControlSchema);
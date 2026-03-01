NwtStatic.api.set("control.validation.validateControlValue", function (...args) {
  trace("NwtStatic.api.control.validation.validateControlValue");
  const [value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], componentIndex = [], assertion = NwtAsserter.silently] = args;
  NwtStatic.api.control.validation.compileSchema(schema);
  const subvalue = valueIndex.length === 0 ? value : NwtAccessor.get(value, valueIndex);
  const subschema = schemaIndex.length === 0 ? schema : NwtAccessor.get(schema, schemaIndex);
  const subcomponent = componentIndex.length === 0 ? controlComponent : NwtAccessor.get(controlComponent, componentIndex);
  const resource = NwtResource.for(subschema.type);
  const archtype = resource.subtypeOf;
  try {
    NwtStatic.api.control.validation.validateControlValueByResource(subvalue, subschema, value, schema, controlComponent, valueIndex.concat([]), schemaIndex.concat([]), componentIndex.concat(["NOT YET FUNCTIONALITY"]), assertion);
    NwtStatic.api.control.validation.validateControlValueBySchema(subvalue, subschema, value, schema, controlComponent, valueIndex.concat([]), schemaIndex.concat([]), componentIndex.concat(["NOT YET FUNCTIONALITY"]), assertion);
    NwtStatic.api.control.validation.validateControlValueByComponent(subvalue, subschema, value, schema, controlComponent, valueIndex.concat([]), schemaIndex.concat([]), componentIndex.concat(["NOT YET FUNCTIONALITY"]), assertion);
    NwtStatic.api.control.validation.validateControlValueBySettings(subvalue, subschema, value, schema, controlComponent, valueIndex.concat([]), schemaIndex.concat([]), componentIndex.concat(["NOT YET FUNCTIONALITY"]), assertion);
    if (archtype === "list") {
      assertion(Array.isArray(subvalue), `Value at index «${valueIndex.join(".")}» must be array because it is subtype of «list» at schema index «${schemaIndex.join(".")}» on «NwtStatic.api.control.validation.validateControlValue»`);
      for (let index = 0; index < subvalue.length; index++) {
        NwtStatic.api.control.validation.validateControlValue(
          value,
          schema,
          controlComponent,
          valueIndex.concat([index]),
          schemaIndex.concat(["schema"]),
          componentIndex.concat(["NOT YET FUNCTIONALITY"]),
          assertion
        );
      }
      return true;
    } else if (archtype === "structure") {
      assertion(typeof subvalue === "object", `Value at index «${valueIndex.join(".")}» must be object because it is subtype of «structure» at schema index «${schemaIndex.join(".")}» on «NwtStatic.api.control.validation.validateControlValue»`);
      const errors = [];
      for (let prop in subschema.schema) {
        try {
          NwtStatic.api.control.validation.validateControlValue(
            value,
            schema,
            controlComponent,
            valueIndex.concat([prop]),
            schemaIndex.concat(["schema", prop]),
            componentIndex.concat(["NOT YET FUNCTIONALITY"]),
            assertion
          );
        } catch (error) {
          errors.push(error);
        }
      }
      if (errors.length) {
        throw NwtUnificatedError.from(errors);
      }
      return true;
    } else if (archtype === "text") {
      assertion(typeof subvalue === "string", `Value at index «${valueIndex.join(".") || "[]"}» must be string because it is subtype of «text» at schema index «${schemaIndex.join(".") || "[]"}» on «NwtStatic.api.control.validation.validateControlValue»`);
    } else if (archtype === "option") {
      const errors = [];
      for (let index = 0; index < subschema.length; index++) {
        try {
          NwtStatic.api.control.validation.validateControlValue(
            value,
            schema,
            controlComponent,
            valueIndex.concat([]),
            schemaIndex.concat(["schema", index]),
            componentIndex.concat(["NOT YET FUNCTIONALITY"]),
            assertion
          );
          return index;
        } catch (error) {
          errors.push(error);
        }
      }
      throw NwtUnificatedError.from(errors);
    } else {
      return true;
    }
  } catch (error) {
    subcomponent.setValidationError(error);
    throw error;
  }
});
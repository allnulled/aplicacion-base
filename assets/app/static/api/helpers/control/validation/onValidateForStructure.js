NwtStatic.api.set("control.validation.onValidateForStructure", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForStructure");
  const [assertion, subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = []] = args;
  // @TODO.
});
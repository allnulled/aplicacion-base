NwtStatic.api.set("control.validation.onValidateForStructure", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForStructure");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  // @TODO.
});
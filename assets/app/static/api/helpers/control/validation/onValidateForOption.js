NwtStatic.api.set("control.validation.onValidateForOption", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForOption");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  // @TODO.
});
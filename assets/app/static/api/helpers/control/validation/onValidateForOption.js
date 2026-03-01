NwtStatic.api.set("control.validation.onValidateForOption", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForOption");
  const [assertion, subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = []] = args;
  // @TODO.
});
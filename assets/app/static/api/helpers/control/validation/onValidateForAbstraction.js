NwtStatic.api.set("control.validation.onValidateForAbstraction", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForAbstraction");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  // @TODO.
});
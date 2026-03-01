NwtStatic.api.set("control.validation.onValidateForList", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForList");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  
});
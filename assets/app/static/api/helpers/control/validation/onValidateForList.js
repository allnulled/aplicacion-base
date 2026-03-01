NwtStatic.api.set("control.validation.onValidateForList", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForList");
  const [assertion = NwtAsserter.silently, subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = []] = args;
  
});
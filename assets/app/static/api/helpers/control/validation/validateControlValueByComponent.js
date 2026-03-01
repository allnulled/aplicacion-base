NwtStatic.api.set("control.validation.validateControlValueByComponent", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueByComponent");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  console.log("validating by something:", subvalue, subschema);
  if(!controlComponent.onValidate) return true;
  controlComponent.onValidate(assertion, ...args);
});
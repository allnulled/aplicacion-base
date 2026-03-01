NwtStatic.api.set("control.validation.validateControlValueBySettings", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueBySettings");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], componentIndex = [], assertion = NwtAsserter.silently] = args;
  console.log("validating by settings:", subvalue, subschema, controlComponent);
  if(!controlComponent) return true;
  if(!controlComponent.settings) return true;
  if(!controlComponent.settings.onValidate) return true;
  controlComponent.settings.onValidate(assertion, ...args);
});
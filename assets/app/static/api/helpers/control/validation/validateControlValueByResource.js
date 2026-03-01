NwtStatic.api.set("control.validation.validateControlValueByResource", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueByResource");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  const resource = NwtResource.for(subschema.type);
  console.log("validating by something:", subvalue, subschema);
  if(!resource.control?.onValidate) return true;
  resource.control.onValidate(assertion, ...args);
});
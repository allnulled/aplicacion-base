NwtStatic.api.set("control.validation.validateControlValueBySchema", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueBySchema");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], componentIndex = [], assertion = NwtAsserter.silently] = args;
  console.log("validating by schema:", subvalue, subschema);
  if(!subschema.onValidate) return true;
  subschema.onValidate(assertion, ...args);
});
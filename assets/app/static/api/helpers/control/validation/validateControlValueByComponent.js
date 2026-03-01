NwtStatic.api.set("control.validation.validateControlValueByComponent", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueByComponent");
  const [value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  if(!controlComponent.onValidate) return true;
  const subvalue = NwtAccessor.get(value, valueIndex);
  const subschema = NwtAccessor.get(schema, schemaIndex);
  controlComponent.onValidate(subvalue, subschema, value, schema, controlComponent, valueIndex, schemaIndex, assertion);
});
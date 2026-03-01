NwtStatic.api.set("control.validation.validateControlValueBySettings", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueBySettings");
  const [value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  if(!controlComponent) return true;
  if(!controlComponent.settings) return true;
  if(!controlComponent.settings.onValidate) return true;
  const subvalue = valueIndex.length === 0 ? value : NwtAccessor.get(value, valueIndex);
  const subschema = schemaIndex.length === 0 ? schema : NwtAccessor.get(schema, schemaIndex);
  controlComponent.settings.onValidate(subvalue, subschema, value, schema, controlComponent, valueIndex, schemaIndex, assertion);
});
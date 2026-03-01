NwtStatic.api.set("control.validation.validateControlValueByResource", function(...args) {
  trace("NwtStatic.api.control.validation.validateControlValueByResource");
  const [value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  const subvalue = valueIndex.length === 0 ? value : NwtAccessor.get(value, valueIndex);
  const subschema = schemaIndex.length === 0 ? schema : NwtAccessor.get(schema, schemaIndex);
  const resource = NwtResource.for(subschema.type);
  resource.control.onValidate(subvalue, subschema, ...args);
});
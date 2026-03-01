NwtResourceApi.set(["control","validation","validateValue"], function(value, schemaInput = false, component = false) {
  const schemaFromInputOrResource = schemaInput || this.api.control.schema.getControlSchema();
  return NwtStatic.api.control.validation.validateControlValue(value, schemaFromInputOrResource, component);
});
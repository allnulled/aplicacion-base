NwtResourceApi.set(["control","validation","safelyValidateValue"], function(value, schemaInput = false, component = false) {
  const schemaFromInputOrResource = schemaInput || this.api.control.schema.getControlSchema();
  return NwtStatic.api.control.validation.safelyValidateControlValue(value, schemaFromInputOrResource, component);
});
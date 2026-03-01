NwtStatic.api.set("control.validation.safelyValidateControlValue", function (...args) {
  trace("NwtStatic.api.control.validation.safelyValidateControlValue");
  const result = NwtStatic.api.control.validation.ValidationResult.create();
  try {
    const output = NwtStatic.api.control.validation.validateControlValue(...args);
    result.setSuccess(output);
  } catch (error) {
    result.setError(error);
  }
  return result;
});
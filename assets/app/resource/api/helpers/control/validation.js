NwtResourceApi.expand("control.validation", {
  validateValue: function (...args) {
    return NwtStatic.api.control.validation.interface.statically.validateValue(this, ...args);
  },
  validateControlSchema: function(...args) {
    return NwtStatic.api.control.validation.interface.statically.validateControlSchema(...args);
  },
  updateValidationErrors: function(...args) {
    return NwtStatic.api.control.validation.interface.statically.updateValidationErrors(...args);
  },
});
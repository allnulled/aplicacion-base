NwtResourceApi.expand("control.validation", {
  validateValue: function (...args) {
    return NwtStatic.api.control.validation.interface.statically.validateValue(this, ...args);
  },
});
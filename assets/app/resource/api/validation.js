NwtResourceApi.register({
  namespace: "validation",
  validateValueByControl(value) {
    return NwtStatic.api.control.validation.interface.statically.validateValueByControl(value, this.defaultSettings || {});
  }
});
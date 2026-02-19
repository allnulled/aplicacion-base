NwtStatic.api.expand("control.validation.interface", {
  statically: {
    validateValue: function(value, settings) {
      const validationResult = NwtStatic.api.control.validation.result.class.create();
      // @TODO: accomplish validation
      return validationResult;
    }
  },
  view: {
    methods: {
      validateValue: function(value) {
        return NwtStatic.api.control.validation.interface.statically.validateValue(value, this.settings);
      }
    }
  }
});
module.exports = {
  id: "control/trait/for/validate",
  apis: ["trait"],
  inherits: [],
  settingsSpec: {
    onValidate: {
      type: [LowCode.type.Function],
      default: LowCode.create("NwtUtils.noop"),
    },
  },
  view: {
    data: function () {
      trace("@compilable/control/trait/for/validate.data");
      return {
        validationError: false,
      };
    },
    methods: {
      validateSelfSchema: function() {
        trace("@compilable/control/trait/for/validate.methods.validateSelfSchema");
        return NwtStatic.api.control.validation.validateControlSchema(this.settings, []);
      },
      validateSelfValue: function () {
        trace("@compilable/control/trait/for/validate.methods.validateSelfValue");
        const value = this.getValueBySchema();
        this.validationError = false;
        try {
          return NwtStatic.api.control.validation.validateControlValue(value, this.settings, this);
        } catch (error) {
          this.setValidationError(error);
        }
      },
      setValidationError: function(error) {
        trace("@compilable/control/trait/for/validate.methods.setValidationError");
        this.validationError = error;
      },
      clearValidationError: function() {
        trace("@compilable/control/trait/for/validate.methods.clearValidationError");
        this.validationError = false;
      }
    },
  }
};
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
      validateControlSchema: function() {
        trace("@compilable/control/trait/for/validate.methods.validateControlSchema");
        return NwtStatic.api.control.validation.validateControlSchema(this.settings, []);
      },
      validateControlValue: function () {
        trace("@compilable/control/trait/for/validate.methods.validateControlValue");
        const value = this.getValueBySchema();
        this.validationError = false;
        return NwtStatic.api.control.validation.validateControlValue(value, this.settings, this);
      },
      setError: function(error) {
        trace("@compilable/control/trait/for/validate.methods.setError");
        this.validationError = error;
      }
    },
  }
};
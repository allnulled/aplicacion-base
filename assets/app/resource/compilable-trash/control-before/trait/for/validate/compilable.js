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
        validationErrors: [],
      };
    },
    methods: {
      validateControlSchema: function() {
        trace("@compilable/control/trait/for/validate.methods.validateControlSchema");
        return this.$options.statically.api.control.validation.validateControlSchema(this.settings, [], assertion);
      },
      validateValue: function () {
        trace("@compilable/control/trait/for/validate.methods.validateValue");
        const value = this.getValue();
        this.validationErrors = [];
        return this.$options.statically.api.control.validation.validateValue(value, this.settings, this, [], [], NwtAsserter.createAssertionFunction(() => {
          return true;
        }, error => {
          this.validationErrors.push(error);
          this.showControl();
          throw error;
        }));
      }
    },
  }
};
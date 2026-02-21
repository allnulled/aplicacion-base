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
      return {
        validationErrors: [],
      };
    },
    methods: {
      validateValue: function () {
        const value = this.getValue();
        return NwtStatic.api.control.validation.interface.statically.validateValue(this.$options.statically, value, this.settings, this, [], NwtAsserter.createAssertionFunction(() => {
          return true;
        }, error => {
          this.validationErrors.push(error);
          throw error;
        }));
      }
    },
  }
};
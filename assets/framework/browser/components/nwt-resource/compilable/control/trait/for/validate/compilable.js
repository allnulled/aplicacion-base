module.exports = {
  id: "control/trait/for/validate",
  apis: ["trait"],
  inherits: [],
  view: {
    data: function () {
      return {
        validationErrors: [],
      };
    },
    methods: {
      validateValue: function () {
        trace("@compilable/control/trait/for/validate.methods.validateValue");
        const val = this.getValue();
        this.$options.statically.api.validation.validateValue(val);
      }
    },
  }
};
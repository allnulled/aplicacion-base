return {
  statics: function () {
    return {
      // Identificador único:
      id: "@feature/for/control/trait/validate",
      // Contribución en propiedad settings:
      settings: {
        $once: {
          onValidate: [Function, NwtUtils.noop],
        }
      },
      // Métodos estáticos trascendentes:
      traits: {
        ["@feature/for/control/trait/validate"]: {
          strategy: "whatever",
          validate: (...args) => this.methods.validate(...args),
        }
      },
      // Propiedades y métodos a exportar a la api de statics:
      validate: (value) => {
        trace("feature/for/control/trait/validate.statics.validate");
        // @TODO:
        this.statics.settings.onValidate();
      },
    };
  },
  data() {
    return {
      isShowingValidator: true,
      validationErrors: NwtConstrainer.MultipleConstraintErrors.create(),
    };
  },
  methods: {
    async validate(externalValue = undefined) {
      trace("feature/for/control/trait/validate.methods.validate");
      // @REQUIRED-TRAIT: "feature/for/control/trait/getValue"
      const value = typeof externalValue !== "undefined" ? externalValue : await this.getValue();
      const constraintErrors = await this.$options.statics.validate(value);
      assertion(constraintErrors.errors.length === 0, constraintErrors.toString());
      await this.settings.onValidate(value);
      let errors = undefined;
      try {
        await this.$options.statics.validate(value);
      } catch (error) {
        errors = error;
      }
      if (errors) {
        throw errors;
      }
      return true;
    },
    clearValidationErrors() {
      trace("feature/for/control/trait/validate.methods.clearValidationErrors");
      this.isShowingValidator = false;
      this.validationErrors.errors = [];
      this.$nextTick(() => {
        this.isShowingValidator = true;
      });
    },
    addValidationError(message) {
      trace("feature/for/control/trait/validate.methods.addValidationError");
      this.isShowingValidator = false;
      this.validationErrors.add(message);
      this.$nextTick(() => {
        this.isShowingValidator = true;
      });
    }
  },
  watch: {

  }
};
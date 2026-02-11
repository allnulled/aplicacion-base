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
    };
  },
  data() {
    return {
      isShowingValidator: true,
      validationErrors: NwtConstrainer.MultipleConstraintErrors.create(),
    };
  },
  methods: {
    async validate() {
      trace("feature/for/control/trait/validate.methods.validate");
      // @REQUIRED-TRAIT: "feature/for/control/trait/getValue"
      const value = await this.getValue();
      const lastTrait = this.$options.statics.api.getCurrentTrait();
      return await this.$options.statics.api.safely.validate(value, lastTrait.controls || false, this);
    },
    clearValidationErrors() {
      trace("feature/for/control/trait/validate.methods.clearValidationErrors");
      this.isShowingValidator = false;
      this.validationErrors.errors = [];
      this.$nextTick(() => {
        this.isShowingValidator = true;
        this.$emit("validation-error", { error: false });
      });
    },
    addValidationError(message) {
      trace("feature/for/control/trait/validate.methods.addValidationError");
      this.isShowingValidator = false;
      this.validationErrors.add(message);
      this.$nextTick(() => {
        this.isShowingValidator = true;
        this.$emit("validation-error", { error: message });
      });
    }
  },
  watch: {

  },
  mounted() {
    trace("feature/for/control/trait/validate.mounted");
    
  }
};
return {
  statics: function () {
    return {
      id: "feature/for/trait/validate",
      validate: (value) => {
        trace("feature/for/trait/validate.statics.validate");
        // @TODO:
        this.statics.settings.onValidate();
      },
      settings: {
        $once: {
          onValidate: [Function, NwtUtils.noop],
        }
      },
    };
  },
  methods: {
    async validate() {
      trace("feature/for/trait/validate.methods.validate");
      // @REQUIRED-TRAIT: "feature/for/trait/getValue"
      const value = await this.getValue();
      let errors = undefined;
      try {
        await this.$options.statics.validate(value);
        await this.settings.onValidate(value);
      } catch (error) {
        errors = error;
      }
      if (errors) {
        throw errors;
      }
      return true;
    }
  },
  watch: {

  }
};
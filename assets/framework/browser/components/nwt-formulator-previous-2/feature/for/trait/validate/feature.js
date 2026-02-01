return {
  abstraction: {
    name: "feature/for/trait/validate",
    validate() {
      trace("feature/for/trait/validate.abstraction.validate");
      // @TODO:
    },
    onValidate() {
      trace("feature/for/trait/validate.abstraction.onValidate");
      // @EMPTY for overriding
    },
    settings: {
      onValidate: [Function, NwtUtils.noop],
    },
  },
  view: {
    data() {
      trace("feature/for/trait/validate.data");
      return {

      };
    },
    methods: {
      async validate() {
        trace("feature/for/trait/validate.methods.validate");
        // @REQUIRED-TRAIT: "feature/for/trait/getValue"
        const value = await this.getValue();
        let errors = undefined;
        try {
          await this.abstraction.validate(value);
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
  }
};
return {
  abstraction: {
    name: "feature/for/control/trait/validate",
    validate() {
      trace("feature/for/control/trait/validate.abstraction.validate");
      // @TODO:
    },
    onValidate() {
      trace("feature/for/control/trait/validate.abstraction.onValidate");
      // @EMPTY for overriding
    },
    settings: {
      onValidate: [Function, NwtUtils.noop],
    },
  },
  view: {
    data() {
      trace("feature/for/control/trait/validate.data");
      return {

      };
    },
    methods: {
      async validate() {
        trace("feature/for/control/trait/validate.methods.validate");
        // @REQUIRED-TRAIT: "feature/for/control/trait/getValue"
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
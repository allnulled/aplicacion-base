return {
  class: {
    name: "control/trait/validate",
    validate() {
      trace("control/trait/validate.class.validate");
      // @TODO:
    },
    onValidate() {
      trace("control/trait/validate.class.onValidate");
      // @EMPTY for overriding
    }
  },
  settings: {
    onValidate: [Function, NwtUtils.noop],
  },
  data() {
    trace("control/trait/validate.data");
    return {
      
    };
  },
  methods: {
    async validate() {
      trace("control/trait/validate.methods.validate");
      // @REQUIRED-TRAIT: "control/trait/getValue"
      const value = await this.getValue();
      let errors = undefined;
      try {
        await this.class.validate(value);
        await this.settings.onValidate(value);
      } catch (error) {
        errors = error;
      }
      if(errors) {
        throw errors;
      }
      return true;
    }
  },
  watch: {
    
  }
};
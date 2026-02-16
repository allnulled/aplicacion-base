module.exports = {
  id: "control/trait/for/validate",
  apis: ["trait"],
  inherits: ["control/trait/for/validate/sub1"],
  traits: {
    validateValue: function() {

    }
  },
  view: {
    data: function () {
      return {
        validationErrors: [],
      };
    },
    methods: {
      validateValue: function () {
        trace("@compilable/control/trait/for/validate.methods.validateValue");
      }
    },
    watch: {
      value: function () {
        trace("@compilable/control/trait/for/validate.watch.value");
      }
    },
    mounted: function () {
      trace("@compilable/control/trait/for/validate.mounted");
    },
    computed: {
      overriden1: function(newVal, oldVal) {
        trace("@compilable/control/trait/for/validate.computed.overriden1");
      }
    },
  }
};
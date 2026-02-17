module.exports = {
  id: "control/for/option",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [
    "control/trait/for/getValue",
    "control/trait/for/settings",
    "control/trait/for/validate",
  ],
  settingsSpec: {
    schema: {
      type: [LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForOption",
    template: $template,
    data: function () {
      return {
        isType: "option",
      };
    },
    methods: {
      validateOption: function () {
        trace("@compilable/control/for/option.methods.validateOption");
      }
    },
    mounted: async function () {
      trace("@compilable/control/for/option.mounted");
    },
    computed: {
      overriden1: function(newVal, oldVal) {
        trace("@compilable/control/for/option.computed.overriden1");
      }
    },
  }
};
module.exports = {
  id: "control/for/text",
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
  settingsDefinition: {
    schema: [[LowCode.type.Array, LowCode.type.Object], LowCode.type.Null],
    initialValue: [LowCode.type.AnyExcept("Null","Undefined"), LowCode.type.Null],
  },
  view: {
    name: "NwtControlForText",
    template: $template,
    data: async function () {
      return {
        isType: "text",
      };
    },
    methods: {
      validateStructure: function () {
        trace("@compilable/control/for/text.methods.validateStructure");
      }
    },
    mounted: async function () {
      trace("@compilable/control/for/text.mounted");
    },
    computed: {
      overriden1: function(newVal, oldVal) {
        trace("@compilable/control/for/text.computed.overriden1");
      }
    },
  }
};
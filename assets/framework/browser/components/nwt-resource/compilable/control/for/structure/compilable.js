module.exports = {
  id: "control/for/structure",
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
  settingsProps: {
    control: {
      type: [LowCode.type.Array, LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForStructure",
    template: $template,
    data: async function () {
      return {
        isType: "structure",
      };
    },
    methods: {
      validateStructure: function () {
        trace("@compilable/control/for/structure.methods.validateStructure");
      }
    },
    mounted: async function () {
      trace("@compilable/control/for/structure.mounted");
    },
    computed: {
      overriden1: function(newVal, oldVal) {
        trace("@compilable/control/for/structure.computed.overriden1");
      }
    },
  }
};
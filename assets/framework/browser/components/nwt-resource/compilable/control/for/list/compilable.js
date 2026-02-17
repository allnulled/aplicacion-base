module.exports = {
  id: "control/for/list",
  compile: true,
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
    name: "NwtControlForList",
    template: $template,
    data: async function () {
      return {
        isType: "list",
      };
    },
    methods: {
      validateList: function () {
        trace("@compilable/control/for/list.methods.validateList");
      }
    },
    mounted: async function () {
      trace("@compilable/control/for/list.mounted");
    },
    computed: {
      overriden1: function(newVal, oldVal) {
        trace("@compilable/control/for/list.computed.overriden1");
      }
    },
  }
};
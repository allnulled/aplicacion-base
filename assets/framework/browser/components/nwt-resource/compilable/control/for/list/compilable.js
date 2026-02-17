module.exports = {
  id: "control/for/list",
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
    name: "NwtControlForList",
    template: $template,
    data: function () {
      return {
        isType: "list",
      };
    },
    methods: {
      validateList: function () {
        trace("@compilable/control/for/list.methods.validateList");
      }
    },
  }
};
module.exports = {
  id: "control/for/structure",
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
    name: "NwtControlForStructure",
    template: $template,
    data: function () {
      return {
        isType: "structure",
      };
    },
    methods: {
      validateStructure: function () {
        trace("@compilable/control/for/structure.methods.validateStructure");
      }
    },
  }
};
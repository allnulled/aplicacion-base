module.exports = {
  id: "control/for/text",
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
  traits: {
    validateValueByControlForText: LowCode.create("NwtStatic.api.control.validation.interface.validateValueByControlForText"),
  },
  view: {
    name: "NwtControlForText",
    template: $template,
    data: function () {
      return {
        isType: "text",
      };
    },
  }
};
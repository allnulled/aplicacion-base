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
  settingsSpec: {
    
  },
  view: {
    name: "NwtControlForText",
    template: $template,
    data: function () {
      return {
        isType: "text",
      };
    },
    methods: {
      validateText: function () {
        trace("@compilable/control/for/text.methods.validateText");
      }
    },
  }
};
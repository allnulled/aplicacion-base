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
    "control/trait/for/valueBySelector",
    "control/trait/for/settings",
  ],
  settingsSpec: {},
  view: {
    name: "NwtControlForText",
    template: $template,
    data: function() {
      trace("NwtControlForText.data");
      return {
      
      };
    },
    mounted: function() {
      trace("NwtControlForText.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      window.tx = this;
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      
    }
  },
};
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
  settingsSpec: {},
  view: {
    name: "NwtControlForText",
    template: $template,
  },
  control: {
    primitiveType: "text",
    // Validate by statically (1st):
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "string", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/text').control.onValidate»`);
    }
  },
};
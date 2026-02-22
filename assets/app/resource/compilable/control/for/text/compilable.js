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
    "control/trait/for/showable",
  ],
  settingsSpec: {},
  view: {
    name: "NwtControlForText",
    template: $template,
    data: function() {
      return {
        isWellFormed: undefined,
      };
    },
    mounted: function() {
      trace("NwtControlForText.mounted");
      this.$options.statically.api.control.validation.validateControlSchema(this.settings);
      this.$options.statically.api.control.validation.validateValue(this.getValue());
      this.isWellFormed = true;
    }
  },
  control: {
    primitiveType: "text",
    // Validate by statically (1st):
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "string", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/text').control.onValidate»`);
    }
  },
};
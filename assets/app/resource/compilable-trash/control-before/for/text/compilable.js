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
  settingsSpec: {
    onValidate: {
      type: Function,
      default: function() {
        trace("@compilable/control/for/text.settingsSpec.onValidate");
      },
    }
  },
  view: {
    name: "NwtControlForText",
    template: $template,
    data: function() {
      trace("NwtControlForText.data");
      return {
        isWellFormed: undefined,
      };
    },
    mounted: function() {
      trace("NwtControlForText.mounted");
      this.$options.statically.api.control.validation.validateControlSchema(this.settings);
      this.$options.statically.api.control.validation.validateValue(this.getValue(), this.settings);
      this.isWellFormed = true;
    }
  },
  control: {
    primitiveType: "text",
    // Validate by statically (1st):
    onValidate: function(subvalue, subschema, value, schema, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/text.control.onValidate");
    }
  },
};
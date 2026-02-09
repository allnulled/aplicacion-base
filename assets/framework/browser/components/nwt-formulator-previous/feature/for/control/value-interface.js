return {};

(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorFeatureForValue'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorFeatureForValue'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormulatorFeatureForValue = class {

    static $inherits = [
      NwtFormulator.feature.for("Feature «value» API"),
      NwtFormulator.feature.for("Feature «value:onChange» API"),
      NwtFormulator.feature.for("Feature «value:onValidate» API"),
    ]

    props = {
      settings: {
        type: Object,
        required: true,
      },
    }

    data() {
      return {
        value: this.settings.hasInitialValue,
      };
    }

    methods = {
      getSettingsSpec() {
        trace("NwtFormulatorFeatureForValue.methods.getSettingsSpec");
        return {
          // validation feature
          hasInitialValue: [String, ""],
          onGetValue: [Function, NwtUtils.noopSelf],
          onFormat: [Function, NwtUtils.noopSelf],
          onChange: [Function, NwtUtils.noop],
          // basic common text control features
          hasPlaceholder: [String, ""],
          hasDescription: [String, ""],
          // Validation feature:
          hasValidationErrors: [Array, []],
          onValidate: [Function, NwtUtils.noop],
          onValidationSuccess: [Function, NwtUtils.noop],
          onValidationError: [Function, NwtUtils.noop],
        };
      },
      async getValue() {
        trace("NwtFormulatorFeatureForValue.methods.getValue");
        const val0 = await this.settings.onGetValue(this.value);
        const val1 = await this.settings.onFormat(val0);
        return val1;
      },
      async validateValue() {
        trace("NwtFormulatorFeatureForValue.methods.validateValue");
        const value = await this.getValue();
        try {
          await this.settings.onValidate(value);
          await this.settings.onValidationSuccess(value);
        } catch (error) {
          await this.settings.onValidationError(value);
        }
      }
    }

    watch = {
      value(newValue, oldValue) {
        trace("NwtFormulatorFeatureForValue.watch.value");
        this.settings.onChange(newValue, oldValue, this);
      }
    }

    created() {
      trace("NwtFormulatorFeatureForValue.created");
      this.settings = NwtPrototyper.initializePropertiesOf(settings, this.getSettingsSpec());
    }

  };

  return NwtFormulatorFeatureForValue;

});
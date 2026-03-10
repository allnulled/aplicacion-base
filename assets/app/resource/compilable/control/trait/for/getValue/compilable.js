module.exports = {
  id: "control/trait/for/getValue",
  apis: ["trait"],
  traits: {},
  settingsSpec: {
    initialValue: {
      type: LowCode.type.Any,
    },
    hasFixedValue: {
      type: LowCode.type.Any,
      default: undefined,
    }
  },
  view: {
    data: function() {
      trace("@compilable/control/trait/for/getValue.data");
      return {
        value: undefined,
      };
    },
    methods: {
      getValue: function () {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
        const value = NwtStatic.api.control.getValueBySchema(this.settings.value, this.settings.valueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(value);
        return formattedValue;
      }
    },
    watch: {
      value: function (newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.value");
        const propagator = this.settings.onChange || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      },
      valueOption: function (newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
        const propagator = this.settings.onChangeOption || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      }
    },
    mounted: function () {
      trace("@compilable/control/trait/for/getValue.mounted");
      this.value = this.settings.hasFixedValue || this.settings.initialValue;
    },
  }
};
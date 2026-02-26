module.exports = {
  id: "control/trait/for/remoteValue",
  apis: ["trait"],
  traits: {},
  inherits: ["control/trait/for/toolkit"],
  settingsSpec: {
    rootValueIndex: {
      type: LowCode.type.Array,
      required: true,
    }
  },
  view: {
    methods: {
      getComponentNameBySettings: function(...args) {
        return this.$toolkit.getComponentNameBySettings(...args);
      },
      getIndexForValue: function(...args) {
        return this.$toolkit.getIndexForValue(...args);
      },
      getValueByIndex: function () {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueByIndex");
        if(this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const originalValue = this.$toolkit.getRoot().$store.get(this.settings.rootValueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      setValueByIndex: function (value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueByIndex");
        this.$toolkit.getRoot().$store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
        });
      }
    },
  }
};
module.exports = {
  id: "control/trait/for/valueBySelector",
  apis: ["trait"],
  traits: {},
  settingsSpec: {
    rootValue: {
      type: LowCode.type.Any,
      required: true,
    },
    rootValueIndex: {
      type: LowCode.type.Array,
      required: true,
    }
  },
  view: {
    methods: {
      getValueByIndex: function () {
        trace("@compilable/control/trait/for/valueBySelector.methods.getValueByIndex");
        const originalValue = this.$toolkit.getRootComponent().$toolkit.store.get(this.settings.rootValueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      setValueByIndex: function (value) {
        trace("@compilable/control/trait/for/valueBySelector.methods.setValueByIndex");
        this.$toolkit.getRootComponent().$toolkit.store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRootComponent().$toolkit.store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
        });
      }
    },
    created() {
      trace("@compilable/control/trait/for/valueBySelector.created");
      NwtVue2.Toolkit.installToolkit(this);
    },
  }
};
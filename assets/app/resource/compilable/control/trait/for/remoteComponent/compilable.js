module.exports = {
  id: "control/trait/for/remoteComponent",
  apis: ["trait"],
  traits: {},
  inherits: ["control/trait/for/toolkit"],
  settingsSpec: {
    rootComponentIndex: {
      type: LowCode.type.Array,
      required: true,
    }
  },
  view: {
    methods: {
      getIndexForComponent: function(...args) {
        return this.$toolkit.getIndexForComponent(...args);
      },
      getComponentByIndex: function () {
        trace("@compilable/control/trait/for/remoteComponent.methods.getComponentByIndex");
        return NwtAccessor.get(this.$toolkit.getRoot(), this.settings.rootComponentIndex);
      },
      setComponentByIndex: function (value) {
        trace("@compilable/control/trait/for/remoteComponent.methods.setComponentByIndex");
        throw new Error("Tu para que quieres setComponentear")
        this.$toolkit.getRoot().$store.set(this.settings.rootComponentIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootComponentIndex,
          value: value,
        });
      }
    },
  }
};
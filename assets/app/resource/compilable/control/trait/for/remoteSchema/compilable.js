module.exports = {
  id: "control/trait/for/remoteSchema",
  apis: ["trait"],
  traits: {},
  inherits: ["control/trait/for/toolkit"],
  settingsSpec: {
    rootSchemaIndex: {
      type: [LowCode.type.Array, LowCode.type.Undefined],
      required: true,
    }
  },
  view: {
    methods: {
      getComponentNameBySettings: function(...args) {
        return this.$toolkit.getComponentNameBySettings(...args);
      },
      getIndexForSchema: function(...args) {
        return this.$toolkit.getIndexForSchema(...args);
      },
      getSchemaByIndex: function () {
        trace("@compilable/control/trait/for/remoteSchema.methods.getSchemaByIndex");
        if(this.settings.hasFixedSchema) return this.settings.hasFixedSchema;
        const rootComponent = this.$toolkit.getRoot();
        // @MAYBE:
        const originalSchema = rootComponent.$schema.get(this.settings.rootSchemaIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedSchema = formatterBySettings(originalSchema);
        return formattedSchema;
      },
      setSchemaByIndex: function (value) {
        trace("@compilable/control/trait/for/remoteSchema.methods.setSchemaByIndex");
        throw new Error("Tu para que quieres setSchemear")
        this.$toolkit.getRoot().$store.set(this.settings.rootSchemaIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootSchemaIndex,
          value: value,
        });
      }
    },
  }
};
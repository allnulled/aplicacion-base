module.exports = {
  id: "control/trait/for/remoteValue",
  apis: ["trait"],
  traits: {},
  inherits: ["control/trait/for/toolkit"],
  settingsSpec: {
    rootValueIndex: {
      type: [LowCode.type.Array, LowCode.type.Undefined],
      required: true,
    }
  },
  view: {
    methods: {
      getComponentNameBySettings: function (...args) {
        return this.$toolkit.getComponentNameBySettings(...args);
      },
      getIndexForValue: function (...args) {
        return this.$toolkit.getIndexForValue(...args);
      },
      getFallbackValue: function () {
        trace("@compilable/control/trait/for/remoteValue.methods.getFallbackValue");
        const fullControlName = `control/for/${this.$options.statically.subtypeOf === "text"}`;
        return this.getFallbackValueBySchema({ ...this.settings, subtypeOf: fullControlName });
      },
      getFallbackValueBySchema: function (settings) {
        trace("@compilable/control/trait/for/remoteValue.methods.getFallbackValueBySchema");
        if (settings.hasFallbackValue) {
          return settings.hasFallbackValue;
        }
        if (settings.type === "control/for/text") {
          return "";
        } else if (settings.type === "control/for/list") {
          return [];
        } else if (settings.type === "control/for/option") {
          return this.getFallbackValueBySchema(settings.schema);
        } else if (settings.type === "control/for/structure") {
          const structureSchema = settings.schema;
          const output = {};
          for (let key in structureSchema) {
            output[key] = this.getFallbackValueBySchema(this.settings.schema[key]);
          }
          return output;
        }
      },
      getValueBySchema: function () {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueBySchema");
        if (this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const indexes = this.getIndexForValue();
        const fallbackFactory = this.getFallbackValue.bind(this);
        const rootComponent = this.$toolkit.getRoot();
        if(!rootComponent) {
          // Los componentes no compatibles con formulario devolverán el valor inicial (probablemente no esté) o undefined
          return this.settings.initialValue || undefined;
        }
        const originalValue = rootComponent.$store.get(indexes, fallbackFactory);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      setValueBySchema: function (value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueBySchema");
        const indexes = this.$toolkit.getIndexForValue();
        const rootComponent = this.$toolkit.getRoot();
        if(!rootComponent) {
          // Los componentes no compatibles con formulario devolverán el valor inicial (probablemente no esté) o undefined
          return this.settings.initialValue || undefined;
        }
        rootComponent.$store.set(indexes, value);
        rootComponent.$store.dispatch("@SetValue", indexes, { index: indexes, value: value });
      },
      rootListenerCallback: function () {
        this.$forceUpdate(true);
      }
    },
    mounted: function () {
      // @DONE: Self-synchronized
      trace("@compilable/control/trait/for/remoteValue.mounted");
      Add_listener: {
        if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
          break Add_listener;
        }
        if (!this.$local.rootListenerCallback) {
          this.$local.rootListenerCallback = this.rootListenerCallback.bind(this);
        }
        const rootComponent = this.$toolkit.getRoot();
        if(rootComponent) {
          // Los componentes no compatibles con formulario no se registrarán en el store del root
          rootComponent.$store.on("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
        }
      }
    },
    beforeDestroy: function () {
      // @DONE: Self-unsynchronized
      trace("@compilable/control/trait/for/remoteValue.beforeDestroy");
      setTimeout(() => {
        Remove_listener: {
          if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
            break Remove_listener;
          }
          const rootComponent = this.$toolkit.getRoot();
          if(rootComponent) {
            // Los componentes no compatibles con formulario no se desregistrarán del store del root
            rootComponent.$store.off("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
          }
        }
      }, 0);
    }
  }
};
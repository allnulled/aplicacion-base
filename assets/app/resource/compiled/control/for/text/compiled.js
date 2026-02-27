NwtResource.define({
  id: "control/for/text",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/remoteSchema", "control/trait/for/settings"],
  traits: {},
  settingsSpec: {
    "isShowingControl": {
      "type": Boolean,
      "default": true
    },
    "rootValueIndex": {
      "type": Array,
      "required": true
    },
    "rootSchemaIndex": {
      "type": Array,
      "required": true
    }
  },
  subtypeOf: "text",
  compileView: true,
  control: {
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {}
  },
  view: {
    name: "NwtControlForText",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_text">
          <!--Nwt control for text {{ $nwt.Reflection.keys(settings) }}-->
          <nwt-control-partial-for-statement :control="this">
              <template v-slot:hideable>
                  <slot name="hideable"></slot>
              </template>
              <slot></slot>
          </nwt-control-partial-for-statement>
          <div v-if="isShowingControl">
              <input
                  class="width_100"
                  type="text"
                  :ref="component => { if(component === null) { delete $local.control; } else { $local.control = component; } }"
                  :disabled="settings.hasFixedValue"
                  :value="getValueByIndex()"
              />
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/showable
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/showable.data");
        return {
          isShowingControl: this.settings.isShowingControl,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "showControl": function() {
        trace("@compilable/control/trait/for/showable.methods.showControl");
        this.isShowingControl = true;
      },
      "hideControl": function() {
        trace("@compilable/control/trait/for/showable.methods.hideControl");
        this.isShowingControl = false;
      },
      "toggleControl": function() {
        trace("@compilable/control/trait/for/showable.methods.toggleControl");
        this.isShowingControl = !this.isShowingControl;
      },
      "getComponentNameBySettings": function(...args) {
        return this.$toolkit.getComponentNameBySettings(...args);
      },
      "getIndexForValue": function(...args) {
        return this.$toolkit.getIndexForValue(...args);
      },
      "getFallbackValue": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getFallbackValue");
        const fullControlName = `control/for/${this.$options.statically.subtypeOf === "text"}`;
        return this.getFallbackValueBySchema({
          ...this.settings,
          subtypeOf: fullControlName
        });
      },
      "getFallbackValueBySchema": function(settings) {
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
      "getValueByIndex": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueByIndex");
        if (this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const indexes = this.getIndexForValue();
        const fallbackFactory = this.getFallbackValue.bind(this);
        const originalValue = this.$toolkit.getRoot().$store.get(indexes, fallbackFactory);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      "setValueByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueByIndex");
        assertion(Array.isArray(this.settings.rootValueIndex), "Configuration «settings.rootValueIndex» must be array on «@compilable/control/trait/for/remoteValue.methods.setValueByIndex»");
        this.$toolkit.getRoot().$store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
        });
      },
      "rootListenerCallback": function() {
        this.$forceUpdate(true);
      },
      "getIndexForSchema": function(...args) {
        return this.$toolkit.getIndexForSchema(...args);
      },
      "getSchemaByIndex": function() {
        trace("@compilable/control/trait/for/remoteSchema.methods.getSchemaByIndex");
        if (this.settings.hasFixedSchema) return this.settings.hasFixedSchema;
        const originalSchema = this.$toolkit.getRoot().$schema.get(this.settings.rootSchemaIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedSchema = formatterBySettings(originalSchema);
        return formattedSchema;
      },
      "setSchemaByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteSchema.methods.setSchemaByIndex");
        throw new Error("Tu para que quieres setSchemear")
        this.$toolkit.getRoot().$store.set(this.settings.rootSchemaIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootSchemaIndex,
          value: value,
        });
      },
      "getValueByState": function() {
        trace("NwtControlForText.methods.getValueByState");
        if (!this.$local.control) {
          return this.getValueByIndex();
        }
        return this.$local.control.value;
      },
      "setValueByState": function(value) {
        trace("NwtControlForText.methods.setValueByState");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      "reloadValue": function() {
        return this.loadValue();
      },
      "saveValue": function() {
        trace("NwtControlForText.methods.saveValue");
        const value = this.getValueByState();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      "loadValue": function() {
        trace("NwtControlForText.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueByIndex();
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/remoteValue
      // @DONE: Self-synchronized
      trace("@compilable/control/trait/for/remoteValue.mounted");
      Add_listener: {
        if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
          break Add_listener;
        }
        if (!this.$local.rootListenerCallback) {
          this.$local.rootListenerCallback = this.rootListenerCallback.bind(this);
        }
        this.$toolkit.getRoot().$store.on("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
      }
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: control/for/text
      trace("NwtControlForText.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      window.tx = this;
      this.reloadValue();
      Payload_while_development: {
        const index = this.getIndexForValue();
        const isOk1 = index.length === 2 && index[0] === "tipo1" && index[1] === "subtipo1";
        const isOk2 = index.length === 1 && index[0] === "tipo1";
        const isOk = isOk1 || isOk2;
        if (isOk) {
          window.txx = this;
        }
      }
    },
    beforeDestroy: function() {
      // @COMPILED-BY: control/trait/for/remoteValue
      // @DONE: Self-unsynchronized
      trace("@compilable/control/trait/for/remoteValue.beforeDestroy");
      setTimeout(() => {
        Remove_listener: {
          if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
            break Remove_listener;
          }
          this.$toolkit.getRoot().$store.off("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
        }
      }, 0);
    },
  }
});
NwtResource.define({
  id: "control/for/abstraction",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/remoteSchema", "control/trait/for/remoteComponent", "control/trait/for/settings", "control/trait/for/validate"],
  traits: {},
  settingsSpec: {
    "isShowingControl": {
      "type": Boolean,
      "default": true
    },
    "rootValueIndex": {
      "type": [
        Array,
        undefined
      ],
      "required": true
    },
    "rootSchemaIndex": {
      "type": [
        Array,
        undefined
      ],
      "required": true
    },
    "rootComponentIndex": {
      "type": [
        Array,
        undefined
      ],
      "required": true
    },
    "onValidate": {
      "type": [
        Function
      ],
      "default": NwtUtils.noop
    }
  },
  subtypeOf: "abstraction",
  compileView: true,
  control: {
    "onValidate": function(...args) {
      trace("@compilable/control/for/abstraction.control.onValidate");
      return NwtStatic.api.control.validation.onValidateForAbstraction(...args);
    }
  },
  view: {
    name: "NwtControlForAbstraction",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_abstraction">
          <!--Nwt control for abstraction {{ $nwt.Reflection.keys(settings) }}-->
          <nwt-control-partial-for-statement :control="this">
              <template v-slot:hideable>
                  <slot name="hideable"></slot>
              </template>
              <slot></slot>
          </nwt-control-partial-for-statement>
          <div v-if="isShowingControl">
              <textarea
                  class="width_100"
                  type="text"
                  :ref="component => { if(component === null) { delete $local.control; } else { $local.control = component; } }"
                  :disabled="settings.hasFixedValue"
                  :value="getValueBySchema()"></textarea>
              <nwt-control-error-handler :control="this" />
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
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/validate.data");
        return {
          validationError: false,
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
      "getValueBySchema": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueBySchema");
        if (this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const indexes = this.getIndexForValue();
        const fallbackFactory = this.getFallbackValue.bind(this);
        const rootComponent = this.$toolkit.getRoot();
        if (!rootComponent) {
          // Los componentes no compatibles con formulario devolverán el valor inicial (probablemente no esté) o undefined
          return this.settings.initialValue || undefined;
        }
        const originalValue = rootComponent.$store.get(indexes, fallbackFactory);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      "setValueBySchema": function(value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueBySchema");
        const indexes = this.$toolkit.getIndexForValue();
        const rootComponent = this.$toolkit.getRoot();
        if (!rootComponent) {
          // Los componentes no compatibles con formulario devolverán el valor inicial (probablemente no esté) o undefined
          return this.settings.initialValue || undefined;
        }
        rootComponent.$store.set(indexes, value);
        rootComponent.$store.dispatch("@SetValue", indexes, {
          index: indexes,
          value: value
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
        const rootComponent = this.$toolkit.getRoot();
        // @MAYBE:
        const originalSchema = rootComponent.$schema.get(this.settings.rootSchemaIndex);
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
      "getIndexForComponent": function(...args) {
        return this.$toolkit.getIndexForComponent(...args);
      },
      "getComponentByIndex": function() {
        trace("@compilable/control/trait/for/remoteComponent.methods.getComponentByIndex");
        const rootComponent = this.$toolkit.getRoot();
        return NwtAccessor.get(rootComponent, this.settings.rootComponentIndex);
      },
      "setComponentByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteComponent.methods.setComponentByIndex");
        throw new Error("Tu para que quieres setComponentear")
        this.$toolkit.getRoot().$store.set(this.settings.rootComponentIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootComponentIndex,
          value: value,
        });
      },
      "validateSelfSchema": function() {
        trace("@compilable/control/trait/for/validate.methods.validateSelfSchema");
        return NwtStatic.api.control.validation.validateControlSchema(this.settings, []);
      },
      "validateSelfValue": function() {
        trace("@compilable/control/trait/for/validate.methods.validateSelfValue");
        const value = this.getValueBySchema();
        this.validationError = false;
        try {
          return NwtStatic.api.control.validation.validateControlValue(value, this.settings, this);
        } catch (error) {
          this.setValidationError(error);
        }
      },
      "setValidationError": function(error) {
        trace("@compilable/control/trait/for/validate.methods.setValidationError");
        this.validationError = error;
      },
      "clearValidationError": function() {
        trace("@compilable/control/trait/for/validate.methods.clearValidationError");
        this.validationError = false;
      },
      "getValueByDom": function() {
        trace("NwtControlForAbstraction.methods.getValueByDom");
        if (!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      "setValueByDom": function(value) {
        trace("NwtControlForAbstraction.methods.setValueByDom");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      "reloadValue": function() {
        return this.loadValue();
      },
      "saveValue": function() {
        trace("NwtControlForAbstraction.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      "loadValue": function() {
        trace("NwtControlForAbstraction.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      "onValidate": function() {
        trace("NwtControlForAbstraction.methods.onValidate");
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
        const rootComponent = this.$toolkit.getRoot();
        if (rootComponent) {
          // Los componentes no compatibles con formulario no se registrarán en el store del root
          rootComponent.$store.on("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
        }
      }
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: control/for/abstraction
      trace("NwtControlForAbstraction.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.reloadValue();
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
          const rootComponent = this.$toolkit.getRoot();
          if (rootComponent) {
            // Los componentes no compatibles con formulario no se desregistrarán del store del root
            rootComponent.$store.off("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
          }
        }
      }, 0);
    },
  }
});
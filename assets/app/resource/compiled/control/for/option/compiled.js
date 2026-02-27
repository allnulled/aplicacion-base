NwtResource.define({
  id: "control/for/option",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/remoteSchema", "control/trait/for/settings"],
  traits: {},
  settingsSpec: {
    "isShowingControl": {
      "type": Boolean,
      "default": false
    },
    "rootValueIndex": {
      "type": Array,
      "required": true
    },
    "rootSchemaIndex": {
      "type": Array,
      "required": true
    },
    "schema": {
      "type": [
        Object
      ],
      "default": null
    }
  },
  subtypeOf: "option",
  compileView: true,
  control: {
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {}
  },
  view: {
    name: "NwtControlForOption",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_option">
          <!--Nwt control for option {{ $nwt.Reflection.keys(settings) }}-->
          <template v-if="!isLoading">
              <component :is="$toolkit.getComponentNameBySettings(settings.schema[$local.selectedOption])"
                  v-bind:key="'component_for_option_' + $local.selectedOption"
                  :ref="component => { if(component === null) { delete $local.control; } else { $local.control = component; } }"
                  :settings="{
                      ...$nwt.ObjectUtils.onlyKeys(settings, ['hasStatement', 'hasDescription']),
                      ...settings.schema[$local.selectedOption],
                      ...Object.assign({}, $local.isNotFirstTime ? {isShowingControl: true} : {}),
                      rootValueIndex: $toolkit.getIndexForValue().concat([]),
                      rootSchemaIndex: $toolkit.getIndexForSchema().concat([$local.selectedOption]),
                  }">
                  <template v-slot:hideable>
                      <div class="">
                          <select class="fluid" v-on:input="selectOption" :value="$local.selectedOption">
                              <template v-for="option, optionIndex in settings.schema">
                                  <option v-bind:key="'option-' + optionIndex"
                                      :value="optionIndex">Tipo {{ optionIndex + 1 }}: {{ option.hasFixedValue || $toolkit.adaptTypeNameToUser(option.type) }}</option>
                              </template>
                          </select>
                      </div>
                  </template>
              </component>
          </template>
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
      // @COMPILED-BY: control/for/option
      Object.assign(finalData, (function() {
        return {
          isLoading: true
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
      "selectOption": function(event) {
        trace("NwtControlForOption.methods.selectOption");
        setTimeout(() => {
          this.isLoading = true;
          this.$nextTick(() => {
            const index = event.target.value;
            this.$local.selectedOption = parseInt(index);
            this.$local.isNotFirstTime = true;
            this.isLoading = false;
          });
        }, 0);
      },
      "getValueByState": function() {
        trace("NwtControlForOption.methods.getValueByState");
        // @TODO: tomar el valor de los controles interiores para devolver el propio
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      },
      "adaptTypeNameToUser": function(txt) {
        trace("NwtControlForOption.methods.adaptTypeNameToUser");
        return txt.replace("control/for/", "");
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: control/for/option
      trace("NwtControlForOption.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local = {
        control: null,
        isNotFirstTime: false,
        selectedOption: typeof this.settings.selectedOption !== "undefined" ? this.settings.selectedOption : 0,
      };
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
      // @COMPILED-BY: control/for/option
      trace("NwtControlForOption.mounted");
      this.isLoading = false;
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
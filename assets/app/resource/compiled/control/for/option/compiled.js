NwtResource.define({
  id: "control/for/option",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/toolkit", "control/trait/for/remoteSchema", "control/trait/for/settings"],
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
    },
    "schema": {
      "type": [
        Object
      ],
      "default": null
    }
  },
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
          <template v-if="(!isLoading) && (selectedOption in settings.schema)">
              <component :is="$toolkit.getComponentNameBySettings(settings.schema[selectedOption])"
                  v-bind:key="'component_for_option_' + selectedOption"
                  :settings="{
                      ...$nwt.ObjectUtils.onlyKeys(settings, ['hasStatement', 'hasDescription']),
                      ...settings.schema[selectedOption],
                      isShowingControl: true,
                      rootValueIndex: $toolkit.getIndexForValue().concat([]),
                      rootSchemaIndex: $toolkit.getIndexForSchema().concat([selectedOption]),
                  }">
                  <div class="">
                      <select class="fluid"
                          v-model="selectedOption">
                          <template v-for="option, optionIndex in settings.schema">
                              <option v-bind:key="'option-' + optionIndex"
                                  :value="optionIndex">Tipo {{ optionIndex + 1 }}: {{ $toolkit.adaptTypeNameToUser(option.type) }}</option>
                          </template>
                      </select>
                  </div>
              </component>
          </template>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/showable
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/showable.data");
        return {
          isShowingControl: this.settings.isShowingControl || true,
        };
      }).call(this));
      // @COMPILED-BY: control/for/option
      Object.assign(finalData, (function() {
        return {
          isLoading: false,
          selectedOption: 0,
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
      "getValueByIndex": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueByIndex");
        if (this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const originalValue = this.$toolkit.getRoot().$store.get(this.settings.rootValueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      "setValueByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueByIndex");
        this.$toolkit.getRoot().$store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
        });
      },
      "getIndexForSchema": function(...args) {
        return this.$toolkit.getIndexForSchema(...args);
      },
      "getSchemaByIndex": function() {
        trace("@compilable/control/trait/for/remoteSchema.methods.getSchemaByIndex");
        if (this.settings.hasFixedSchema) return this.settings.hasFixedSchema;
        const originalSchema = this.$toolkit.getRoot().$store.get(this.settings.rootSchemaIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedSchema = formatterBySettings(originalSchema);
        return formattedSchema;
      },
      "setSchemaByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteSchema.methods.setSchemaByIndex");
        this.$toolkit.getRoot().$store.set(this.settings.rootSchemaIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootSchemaIndex,
          value: value,
        });
      },
      "getValueByState": function() {
        trace("NwtControlForOption.methods.getValueByState");
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      },
      "adaptTypeNameToUser": function(txt) {
        return txt.replace("control/for/", "");
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: control/for/option
      trace("NwtControlForOption.created");
      this.$local = {
        selectedOptionTimer: 0
      };
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: control/for/option
      trace("NwtControlForOption.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    },
  }
});
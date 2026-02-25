NwtResource.define({
  id: "control/for/option",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/valueBySelector", "control/trait/for/settings"],
  traits: {},
  settingsSpec: {
    "rootValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null],
      "required": true
    },
    "rootValueIndex": {
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
          Nwt control for option {{ $nwt.Reflection.keys(settings) }}
          <div>
              <select v-model="selectedOption">
                  <template v-for="option, optionIndex in settings.schema">
                      <option v-bind:key="'option-' + optionIndex" :value="optionIndex">Tipo {{ optionIndex + 1 }}: {{ option.type }}</option>
                  </template>
              </select>
              <template v-if="selectedOption in settings.schema">
                  <component :is="$toolkit.getComponentNameBySettings(settings.schema[selectedOption])"
                      :settings="{
                          ...settings.schema[selectedOption],
                          rootValueIndex: $toolkit.getRootValueIndex().concat([]),
                      }" />
              </template>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/for/option
      Object.assign(finalData, (function() {
        return {
          selectedOption: 0,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValueByIndex": function() {
        trace("@compilable/control/trait/for/valueBySelector.methods.getValueByIndex");
        const originalValue = this.$toolkit.getRootComponent().$toolkit.store.get(this.settings.rootValueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      "setValueByIndex": function(value) {
        trace("@compilable/control/trait/for/valueBySelector.methods.setValueByIndex");
        this.$toolkit.getRootComponent().$toolkit.store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRootComponent().$toolkit.store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
        });
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/trait/for/valueBySelector
      trace("@compilable/control/trait/for/valueBySelector.created");
      NwtVue2.Toolkit.installToolkit(this);
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
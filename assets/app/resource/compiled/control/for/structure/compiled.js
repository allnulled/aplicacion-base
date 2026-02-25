NwtResource.define({
  id: "control/for/structure",
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
  control: {},
  view: {
    name: "NwtControlForStructure",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_structure">
          Nwt control for structure {{ $nwt.Reflection.keys(settings) }}
          <div v-for="column, columnName in settings.schema"
              v-bind:key="'column-' + columnName"
              style="border-top: 1px solid black;">
              <component :is="$toolkit.getComponentNameBySettings(column)" :settings="{
                  ...column,
                  rootValueIndex: $toolkit.getRootValueIndex().concat([columnName]),
              }" />
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/for/structure
      Object.assign(finalData, (function() {
        return {};
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
      // @COMPILED-BY: control/for/structure
      trace("NwtControlForStructure.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    },
  }
});
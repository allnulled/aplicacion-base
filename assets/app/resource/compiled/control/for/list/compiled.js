NwtResource.define({
  id: "control/for/list",
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
    name: "NwtControlForList",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_list">
          Nwt control for list {{ $nwt.Reflection.keys(settings) }}
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/for/list
      Object.assign(finalData, (function() {
        return {
          currentPage: 0,
          maximumItems: 10,
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
      },
      "digestSearch": function() {}
    },
    computed: {
      "totalItems": function() {
        return this.$local?.list?.length || 0;
      }
    },
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
      // @COMPILED-BY: control/for/list
      trace("NwtControlForList.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      this.digestSearch();
    },
  }
});
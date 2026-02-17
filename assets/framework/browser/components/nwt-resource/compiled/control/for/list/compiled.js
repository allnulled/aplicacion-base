NwtResource.define({
  id: "control/for/list",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/getValue", "control/trait/for/settings",
    "control/trait/for/validate"
  ],
  traits: {},
  settingsSpec: {
    "initialValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined,
        null
      ]
    },
    "schema": {
      "type": [
        Object
      ],
      "default": null
    }
  },
  compileView: true,
  compiled: true,
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
          <pre>List = {{ $nwt.Utils.filterObjectProperties(settings, (k,v) => !["schema","type","pointer"].includes(k)) }}</pre>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/getValue
      Object.assign(finalData, (function() {
        return {
          value: null,
        }
      }).call(this));
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        return {
          validationErrors: [],
        };
      }).call(this));
      // @COMPILED-BY: control/for/list
      Object.assign(finalData, (function() {
        return {
          isType: "list",
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
      },
      "validateValue": function() {
        trace(
          "@compilable/control/trait/for/validate.methods.validateValue"
          );
        const val = this.getValue();
        this.$options.statically.api.validation.validateValue(val);
      },
      "validateList": function() {
        trace("@compilable/control/for/list.methods.validateList");
      }
    },
    computed: {},
    watch: {
      "value": [
        function() {
          trace("@compilable/control/trait/for/getValue.watch.value");
        },
        function() {
          trace("@compilable/control/trait/for/settings.watch.value");
        }
      ],
      "valueOption": function() {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
      }
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/getValue
      (function() {
        trace("@compilable/control/trait/for/getValue.mounted");
        this.value = this.settings?.initialValue;
      }).call(this);
      // @COMPILED-BY: control/trait/for/settings
      (function() {
        trace("@compilable/control/trait/for/settings.mounted");
        console.log(this.$options.statically.settingsSpec, this
          .settings);
        NwtPrototyper.initializePropertiesOf(this.settings, this
          .$options.statically.settingsSpec || {},
          `from component «${this.$options.name}»`, false);
      }).call(this);
    },
  }
});
NwtResource.define({
  id: "control/for/text",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/getValue", "control/trait/for/settings",
    "control/trait/for/validate/sub1/sub1",
    "control/trait/for/validate/sub1", "control/trait/for/validate"
  ],
  traits: {
    "control/trait/for/getValue": {
      "applyOnGetValue": function() {},
      "applyOnFormatValue": function() {},
      "applyOnValidateValue": function() {}
    },
    "control/trait/for/settings": {
      "validateSettings": function() {}
    },
    "control/trait/for/validate/sub1/sub1": {
      "getSub1Sub1": function() {}
    },
    "control/trait/for/validate/sub1": {
      "getSub1": function() {}
    },
    "control/trait/for/validate": {
      "validateValue": function() {}
    }
  },
  settingsDefinition: {
    "schema": [
      [
        Array,
        Object
      ],
      null
    ],
    "initialValue": [
      [String, Boolean, Number, Object, Array, Function, Vue],
      null
    ]
  },
  view: {
    name: "NwtControlForText",
    props: {
      "initialValue": {
        "type": [
          String,
          Object
        ],
        "default": function() {
          return ""
        }
      }
    },
    data: async function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/getValue
      Object.assign(finalData, await (async function() {
        return {
          value: this.settings.initialValue,
        }
      }).call(this));
      // @COMPILED-BY: control/trait/for/settings
      Object.assign(finalData, await (async function() {
        return {}
      }).call(this));
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        return {
          validationErrors: [],
        };
      }).call(this));
      // @COMPILED-BY: control/for/text
      Object.assign(finalData, await (async function() {
        return {
          isType: "text",
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
      },
      "getSettings": function() {
        trace(
          "@compilable/control/trait/for/settings.methods.getSettings");
      },
      "validateValue": function() {
        trace(
          "@compilable/control/trait/for/validate.methods.validateValue"
          );
      },
      "validateStructure": function() {
        trace("@compilable/control/for/text.methods.validateStructure");
      }
    },
    computed: {
      "overriden1": function(newVal, oldVal) {
        trace("@compilable/control/for/text.computed.overriden1");
      }
    },
    watch: {
      "value": [
        function() {
          trace("@compilable/control/trait/for/getValue.watch.value");
        },
        function() {
          trace("@compilable/control/trait/for/settings.watch.value");
        },
        function() {
          trace("@compilable/control/trait/for/validate.watch.value");
        }
      ],
      "valueOption": [
        function() {
          trace(
            "@compilable/control/trait/for/getValue.watch.valueOption");
        },
        function() {
          trace(
            "@compilable/control/trait/for/settings.watch.valueOption");
        }
      ]
    },
    mounted: async function() {
      // @COMPILED-BY: control/trait/for/getValue
      (function() {
        trace("@compilable/control/trait/for/getValue.mounted");
      }).call(this);
      // @COMPILED-BY: control/trait/for/settings
      (function() {
        trace("@compilable/control/trait/for/settings.mounted");
      }).call(this);
      // @COMPILED-BY: control/trait/for/validate
      (function() {
        trace("@compilable/control/trait/for/validate.mounted");
      }).call(this);
      // @COMPILED-BY: control/for/text
      await (async function() {
        trace("@compilable/control/for/text.mounted");
      }).call(this);
    },
  }
});
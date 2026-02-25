module.exports = {
  id: "control/for/option",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [
    "control/trait/for/valueBySelector",
    "control/trait/for/settings",
  ],
  settingsSpec: {
    schema: {
      type: [LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForOption",
    template: $template,
    data: function () {
      return {
        selectedOption: 0,
      };
    },
    mounted: function () {
      trace("NwtControlForOption.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    },
    watch: {
      
    },
    methods: {
      
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      
    } 
  },
};
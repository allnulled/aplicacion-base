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
    "control/trait/for/showable",
    "control/trait/for/remoteValue",
    "control/trait/for/remoteSchema",
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
        isLoading: false,
        selectedOption: 0,
      };
    },
    created: function() {
      trace("NwtControlForOption.created");
      this.$local = { selectedOptionTimer: 0 };
    },
    mounted: function () {
      trace("NwtControlForOption.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    },
    watch: {
      
    },
    methods: {
      getValueByState: function() {
        trace("NwtControlForOption.methods.getValueByState");
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      },
      adaptTypeNameToUser: function(txt) {
        return txt.replace("control/for/", "");
      }
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      
    } 
  },
};
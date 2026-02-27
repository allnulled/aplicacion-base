module.exports = {
  id: "control/for/option",
  subtypeOf: "option",
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
        isLoading: true
      };
    },
    created: function () {
      trace("NwtControlForOption.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local = {
        control: null,
        isNotFirstTime: false,
        selectedOption: typeof this.settings.selectedOption !== "undefined" ? this.settings.selectedOption : 0,
      };
    },
    mounted: function () {
      trace("NwtControlForOption.mounted");
      this.isLoading = false;
    },
    watch: {

    },
    methods: {
      selectOption: function (event) {
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
      getValueByState: function () {
        trace("NwtControlForOption.methods.getValueByState");
        // @TODO: tomar el valor de los controles interiores para devolver el propio
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      },
      adaptTypeNameToUser: function (txt) {
        trace("NwtControlForOption.methods.adaptTypeNameToUser");
        return txt.replace("control/for/", "");
      }
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {

    }
  },
};
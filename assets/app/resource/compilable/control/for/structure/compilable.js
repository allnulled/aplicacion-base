module.exports = {
  id: "control/for/structure",
  subtypeOf: "structure",
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
    "control/trait/for/remoteComponent",
    "control/trait/for/settings",
    "control/trait/for/validate",
  ],
  settingsSpec: {
    schema: {
      type: [LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForStructure",
    template: $template,
    created: function () {
      trace("NwtControlForStructure.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function () {
      trace("NwtControlForStructure.mounted");
    },
    methods: {
      getValueByDom: function () {
        trace("NwtControlForStructure.methods.getValueByDom");
        const currentControls = this.$local.controls;
        const state = {};
        for (let prop in currentControls) {
          const control = currentControls[prop];
          const value = control.getValueByDom()
          state[prop] = value;
        }
        return state;
      },
      setValueByDom: function () {
        trace("NwtControlForStructure.methods.setValueByDom");
        // @NOTHING
      },
      onValidate: function () {
        trace("NwtControlForStructure.methods.onValidate");
        console.log("Validation at component-level on control/for/structure");
      },
    },
  },
  control: {
    onValidate: function(...args) {
      trace("@compilable/control/for/text.control.onValidate");
      return NwtStatic.api.control.validation.onValidateForStructure(...args);
    },
  },
};
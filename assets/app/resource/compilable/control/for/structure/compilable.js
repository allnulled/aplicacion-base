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
    "control/trait/for/settings",
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
    methods: {
      getValueByState: function() {
        trace("NwtControlForStructure.methods.getValueByState");
        const currentControls = this.$local.controls;
        const state = {};
        for(let prop in currentControls) {
          const control = currentControls[prop];
          const value = control.getValueByState()
          state[prop] = value;
        }
        return state;
      },
      setValueByState: function() {
        trace("NwtControlForStructure.methods.setValueByState");
        // @NOTHING
      }
    },
    created: function() {
      trace("NwtControlForStructure.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function() {
      trace("NwtControlForStructure.mounted");
    }
  },
  control: {
    
  },
};
module.exports = {
  id: "control/for/structure",
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
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      }
    },
    mounted: function() {
      trace("NwtControlForStructure.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    }
  },
  control: {
    
  },
};
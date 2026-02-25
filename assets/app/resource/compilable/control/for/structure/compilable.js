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
    name: "NwtControlForStructure",
    template: $template,
    data: function() {
      return {
      
      };
    },
    mounted: function() {
      trace("NwtControlForStructure.mounted");
      NwtVue2.Toolkit.installToolkit(this);
    }
  },
  control: {
    
  },
};
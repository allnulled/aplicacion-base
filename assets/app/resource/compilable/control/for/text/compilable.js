module.exports = {
  id: "control/for/text",
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
  settingsSpec: {},
  view: {
    name: "NwtControlForText",
    template: $template,
    methods: {
      getValueByState: function() {
        return this.$refs.textbox.value;
      },
      setValueByState: function(value) {
        this.$refs.textbox.value = value;
        this.$forceUpdate(true);
      },
      reloadValue: function() {
        this.$refs.textbox.value = this.$toolkit.getValueByIndex();
      }
    },
    mounted: function() {
      trace("NwtControlForText.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      window.tx = this;
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      
    }
  },
};
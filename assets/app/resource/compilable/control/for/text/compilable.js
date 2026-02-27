module.exports = {
  id: "control/for/text",
  subtypeOf: "text",
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
    isShowingControl: {
      type: LowCode.type.Boolean,
      default: true,
    }
  },
  view: {
    name: "NwtControlForText",
    template: $template,
    methods: {
      getValueByState: function() {
        trace("NwtControlForText.methods.getValueByState");
        if(!this.$local.control) {
          return this.getValueByIndex();
        }
        return this.$local.control.value;
      },
      setValueByState: function(value) {
        trace("NwtControlForText.methods.setValueByState");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForText.methods.saveValue");
        const value = this.getValueByState();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlForText.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueByIndex();
      },
    },
    mounted: function() {
      trace("NwtControlForText.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      window.tx = this;
      this.reloadValue();
      Payload_while_development: {
        const index = this.getIndexForValue();
        const isOk1 = index.length === 2 && index[0] === "tipo1" && index[1] === "subtipo1";
        const isOk2 = index.length === 1 && index[0] === "tipo1";
        const isOk = isOk1 || isOk2;
        if(isOk) {
          window.txx = this;
        }
      }
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      
    }
  },
};
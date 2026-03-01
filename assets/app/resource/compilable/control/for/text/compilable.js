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
    "control/trait/for/remoteComponent",
    "control/trait/for/settings",
    "control/trait/for/validate",
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
      getValueByDom: function() {
        trace("NwtControlForText.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function(value) {
        trace("NwtControlForText.methods.setValueByDom");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
        this.unmarkAsChanged();

      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForText.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
        this.unmarkAsChanged();
      },
      loadValue: function() {
        trace("NwtControlForText.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
        this.unmarkAsChanged();
      },
      onValidate: function () {
        trace("NwtControlForText.methods.onValidate");
        console.log("Validation at component-level on control/for/text");
      },
      markAsChanged: function() {
        trace("NwtControlForText.methods.markAsChanged");
        this.$local.control.classList.add("was_changed");
      },
      unmarkAsChanged: function() {
        trace("NwtControlForText.methods.unmarkAsChanged");
        this.$local.control.classList.remove("was_changed");
      }
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
    onValidate: function(...args) {
      trace("@compilable/control/for/text.control.onValidate");
      return NwtStatic.api.control.validation.onValidateForText(...args);
    },
  },
};
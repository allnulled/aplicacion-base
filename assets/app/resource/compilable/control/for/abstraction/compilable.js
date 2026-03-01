module.exports = {
  id: "control/for/abstraction",
  subtypeOf: "abstraction",
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
    name: "NwtControlForAbstraction",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtControlForAbstraction.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function(value) {
        trace("NwtControlForAbstraction.methods.setValueByDom");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForAbstraction.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlForAbstraction.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtControlForAbstraction.methods.onValidate");
      },
    },
    mounted: function() {
      trace("NwtControlForAbstraction.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.reloadValue();
    }
  },
  control: {
    onValidate: function(...args) {
      trace("@compilable/control/for/abstraction.control.onValidate");
      return NwtStatic.api.control.validation.onValidateForAbstraction(...args);
    },
  },
};
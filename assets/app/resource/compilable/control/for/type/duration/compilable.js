module.exports = {
  id: "control/for/type/duration",
  subtypeOf: "duration",
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
    name: "NwtControlForDuration",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtControlForDuration.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function(value) {
        trace("NwtControlForDuration.methods.setValueByDom");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForDuration.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlForDuration.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtControlForDuration.methods.onValidate");
        console.log("Validation at component-level on control/for/type/duration");
      },
    },
    mounted: function() {
      trace("NwtControlForDuration.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.reloadValue();
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/duration.control.onValidate");
      console.log("Validation at resource-level on control/for/type/duration");
    },
  },
};
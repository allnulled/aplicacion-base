module.exports = {
  id: "control/for/type/date",
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
  ],
  settingsSpec: {
    isShowingControl: {
      type: LowCode.type.Boolean,
      default: true,
    }
  },
  view: {
    name: "NwtControlForDate",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtControlForDate.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function(value) {
        trace("NwtControlForDate.methods.setValueByDom");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForDate.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlForDate.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtControlForDate.methods.onValidate");
        console.log("Validation at component-level on control/for/type/date");
      },
    },
    mounted: function() {
      trace("NwtControlForDate.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.reloadValue();
    }
  },
  control: {
    schema: {
      year: {
        type: "control/for/text"
      },
      month: {
        type: "control/for/text"
      },
      day: {
        type: "control/for/text"
      },
      hour: {
        type: "control/for/text"
      },
      minute: {
        type: "control/for/text"
      },
      second: {
        type: "control/for/text"
      },
    },
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/date.control.onValidate");
      console.log("Validation at resource-level on control/for/type/date");
    },
  },
};
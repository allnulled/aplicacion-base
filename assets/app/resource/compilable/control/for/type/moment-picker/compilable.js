module.exports = {
  id: "control/for/type/moment-picker",
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
    "control/trait/for/getValue",
    "control/trait/for/remoteValue",
    "control/trait/for/remoteSchema",
    "control/trait/for/remoteComponent",
    "control/trait/for/settings",
  ],
  settingsSpec: {
    isShowingControl: {
      type: LowCode.type.Boolean,
      default: true,
    },
    initialValue: {
      type: LowCode.type.Any,
      default: function() {
        return new Date();
      },
    },
  },
  view: {
    name: "NwtControlForTypeMomentPicker",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtControlForTypeMomentPicker.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.getValueByDom();
      },
      setValueByDom: function(value) {
        trace("NwtControlForTypeMomentPicker.methods.setValueByDom");
        if(!this.$local.control) {
          return -1;
        }
        this.$local.control.setValueByDom(value);
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForTypeMomentPicker.methods.saveValue");
        const value = this.getValueByDom();
        if(!value) {
          return -1;
        }
        this.setValueBySchema(value);
      },
      loadValue: function() {
        trace("NwtControlForTypeMomentPicker.methods.loadValue");
        if(!this.$local.control) {
          return -1;
        }
        const value = this.getValueBySchema();
        if(!value) {
          return -2;
        }
        this.setValueByDom(value);
      },
      onValidate: function () {
        trace("NwtControlForTypeMomentPicker.methods.onValidate");
        console.log("Validation at component-level on control/for/type/moment-picker");
      },
    },
    created: function() {
      trace("NwtControlForTypeMomentPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function() {
      trace("NwtControlForTypeMomentPicker.mounted");
      this.reloadValue();
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/moment-picker.control.onValidate");
      console.log("Validation at resource-level on control/for/type/moment-picker");
    },
  },
};
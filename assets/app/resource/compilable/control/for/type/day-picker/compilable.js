module.exports = {
  id: "control/for/type/day-picker",
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
      default: function () {
        return new Date();
      },
    },
  },
  view: {
    name: "NwtControlForTypeDayPicker",
    template: $template,
    methods: {
      getValueByDom: function () {
        trace("NwtControlForTypeDayPicker.methods.getValueByDom");
        if (!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.getValueByDom();
      },
      setValueByDom: function (value) {
        trace("NwtControlForTypeDayPicker.methods.setValueByDom");
        if (!this.$local.control) {
          return -1;
        }
        return this.$local.control.setValueByDom(value);
      },
      saveValue: function () {
        trace("NwtControlForTypeDayPicker.methods.saveValue");
        const value = this.getValueByDom();
        return this.setValueBySchema(value);
      },
      reloadValue: function () {
        return this.loadValue();
      },
      loadValue: function () {
        trace("NwtControlForTypeDayPicker.methods.loadValue");
        const value = this.getValueBySchema();
        if(!value) {
          return -1;
        }
        this.setValueByDom(value);
      },
      onValidate: function () {
        trace("NwtControlForTypeDayPicker.methods.onValidate");
        console.log("Validation at component-level on control/for/type/day-picker");
      },
      /////////////////////////////////////
    },
    created: function () {
      trace("NwtControlForTypeDayPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function () {
      trace("NwtControlForTypeDayPicker.mounted");
      this.reloadValue();
    },
    ///////////////////////////////////
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/day-picker.control.onValidate");
      console.log("Validation at resource-level on control/for/type/day-picker");
    },
  },
};
module.exports = {
  id: "view/for/type/moment-picker",
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
      factory: function() {
        return new Date();
      },
    },
    onChange: {
      type: LowCode.type.Function,
      default: function () { },
    },
  },
  view: {
    name: "NwtViewForTypeMomentPicker",
    template: $template,
    methods: {
      getValueByDom: function () {
        trace("NwtViewForTypeMomentPicker.methods.getValueByDom");
        const day = this.$local.controls.day.getValueByDom();
        const hour = this.$local.controls.hour.getValueByDom();
        return `${day} ${hour}`;
      },
      setValueByDom: function (value) {
        trace("NwtViewForTypeMomentPicker.methods.setValueByDom");
        this.$local.controls.day.setValueByDom(value);
        this.$local.controls.hour.setValueByDom(value);
      },
      reloadValue: function () {
        return this.loadValue();
      },
      loadValue: function () {
        trace("NwtViewForTypeMomentPicker.methods.loadValue");
        const value = this.getValueBySchema();
        if(!value) {
          return -1;
        }
        this.$local.controls.day.setValueByDom(value);
        this.$local.controls.hour.setValueByDom(value);
      },
      onValidate: function () {
        trace("NwtViewForTypeMomentPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/moment-picker");
      },
      ///////////////////////////////
      getSelectedMomentFormatted: function () {
        trace("NwtViewForTypeMomentPicker.methods.getSelectedMomentFormatted");
        const day = this.$local.controls.day.getSelectedDayFormatted();
        const hour = this.$local.controls.hour.getSelectedHourFormatted();
        return `${day} ${hour}`;
      },
      onChangeWrapper: function () {
        trace("NwtViewForTypeMomentPicker.methods.onChangeWrapper");
        const that = this;
        return function (subvalue, subevent, subcomponent) {
          const value = that.getSelectedMomentFormatted();
          Update_ui: {
            that.$local.controls.moment.value = value;
          }
          that.settings.onChange(value, event, that, subcomponent);
        };
      }
      ///////////////////////////////
    },
    created: function () {
      trace("NwtViewForTypeMomentPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {
        day: undefined,
        hour: undefined,
        moment: undefined,
      };
    },
    mounted: function () {
      trace("NwtViewForTypeMomentPicker.mounted");
      this.reloadValue();
      window.mmt = this;
      this.$local.controls.moment.value = this.getSelectedMomentFormatted();
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/view/for/type/moment-picker.control.onValidate");
      console.log("Validation at resource-level on view/for/type/moment-picker");
    },
  },
};
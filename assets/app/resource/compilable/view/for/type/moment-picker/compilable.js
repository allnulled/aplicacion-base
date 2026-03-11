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
      default: LowCode.create("new Date()"),
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
        if (!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function (value) {
        trace("NwtViewForTypeMomentPicker.methods.setValueByDom");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function () {
        return this.loadValue();
      },
      saveValue: function () {
        trace("NwtViewForTypeMomentPicker.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function () {
        trace("NwtViewForTypeMomentPicker.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtViewForTypeMomentPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/moment-picker");
      },
      ///////////////////////////////
      getSelectedMomentFormatted: function () {
        trace("NwtViewForTypeMomentPicker.methods.getSelectedMomentFormatted");
        let out = "";
        const dayCell = this.$local.controls.day.selectedCell;
        const year = dayCell.year;
        const month = dayCell.month;
        const day = dayCell.day;
        out = `${year}/${NwtUtils.padStart(month, 2, '0')}/${NwtUtils.padStart(day, 2, '0')}`;
        out += " ";
        const hour = this.$local.controls.hour.selectedHour;
        const minute = this.$local.controls.hour.selectedMinute;
        out += `${NwtUtils.padStart(hour, 2, '0')}:${NwtUtils.padStart(minute, 2, '0')}:00`;
        return out;
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
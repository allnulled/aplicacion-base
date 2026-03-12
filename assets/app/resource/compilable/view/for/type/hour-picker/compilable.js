module.exports = {
  id: "view/for/type/hour-picker",
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
      default: function() {},
    },
  },
  view: {
    name: "NwtViewForTypeHourPicker",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtViewForTypeHourPicker.methods.getValueByDom");
        return this.getSelectedHourFormatted();
      },
      setValueByDom: function(hourInput) {
        trace("NwtViewForTypeHourPicker.methods.setValueByDom");
        const hourMinute = this.fromDateToHour(hourInput);
        const [hour, minute] = hourMinute.split(":");
        this.selectedHour = parseInt(hour);
        this.selectedMinute = parseInt(minute);
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtViewForTypeHourPicker.methods.saveValue");
        const value = this.getValueByDom();
        return this.setValueBySchema(value);
      },
      loadValue: function() {
        trace("NwtViewForTypeHourPicker.methods.loadValue");
        const value = this.getValueBySchema();
        if(typeof value === "undefined") {
          return -1;
        }
        return this.setValueByDom(value);
      },
      onValidate: function () {
        trace("NwtViewForTypeHourPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/hour-picker");
      },
      ////////////////////////////////////
      fromDateToHour: function(dateInput) {
        let date = dateInput;
        if(typeof date === "string") {
          date = NwtTimer.fromStringToDate(date);
        }
        if(!(date instanceof Date)) {
          return date;
        }
        return `${NwtUtils.padStart(date.getHours(), 2, '0')}:${NwtUtils.padStart(date.getMinutes(), 2, '0')}:00.000`;
      },
      selectHour: function(event) {
        trace("NwtViewForTypeHourPicker.methods.selectHour");
        this.selectedHour = parseInt(event.target.textContent);
      },
      selectMinute: function(event) {
        trace("NwtViewForTypeHourPicker.methods.selectMinute");
        this.selectedMinute = parseInt(event.target.textContent);
      },
      selectAm: function() {
        trace("NwtViewForTypeHourPicker.methods.selectAm");
        this.selectedHourRange = "am";
      },
      selectPm: function() {
        trace("NwtViewForTypeHourPicker.methods.selectPm");
        this.selectedHourRange = "pm";
      },
      increaseMinute: function() {
        trace("NwtViewForTypeHourPicker.methods.increaseMinute");
        this.selectedMinute++;
      },
      decreaseMinute: function() {
        trace("NwtViewForTypeHourPicker.methods.decreaseMinute");
        this.selectedMinute--;
      },
      getSelectedHourFormatted: function() {
        trace("NwtViewForTypeHourPicker.methods.getSelectedHourFormatted");
        let out = "";
        if(typeof this.selectedHour === "number") {
          out += NwtUtils.padStart(this.selectedHour, 2, '0');
        } else {
          out += NwtUtils.padStart(0, 2, '0');
        }
        out += ":";
        if(typeof this.selectedMinute === "number") {
          out += NwtUtils.padStart(this.selectedMinute, 2, '0');
        } else {
          out += NwtUtils.padStart(0, 2, '0');
        }
        return out;
      },
      onChangeWrapper: function(newValue, oldValue) {
        trace("NwtViewForTypeHourPicker.methods.onChangeWrapper");
        const value = this.getSelectedHourFormatted();
        this.settings.onChange(value, this);
      }
      ////////////////////////////////////
    },
    watch: {
      selectedHour: ["onChangeWrapper"],
      selectedMinute: ["onChangeWrapper"],
      selectedHourRange: ["onChangeWrapper"],
    },
    created: function() {
      trace("NwtViewForTypeHourPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function() {
      trace("NwtViewForTypeHourPicker.mounted");
      this.reloadValue();
    },
    data: function() {
      return {
        selectedHour: 0,
        selectedMinute: 0,
        selectedHourRange: "am",
      };
    },
    props: {
      isAttached: {
        type: LowCode.type.Boolean,
        default: false
      }
    }
  },
  control: {
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/view/for/type/hour-picker.control.onValidate");
      console.log("Validation at resource-level on view/for/type/hour-picker");
    },
  },
};
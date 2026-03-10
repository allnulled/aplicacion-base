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
        return this.$local.control.value;
      },
      setValueByDom: function (value) {
        trace("NwtControlForTypeDayPicker.methods.setValueByDom");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function () {
        return this.loadValue();
      },
      saveValue: function () {
        trace("NwtControlForTypeDayPicker.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function () {
        trace("NwtControlForTypeDayPicker.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtControlForTypeDayPicker.methods.onValidate");
        console.log("Validation at component-level on control/for/type/day-picker");
      },
      /////////////////////////////////////
      goToPreviousMonth: function () {
        trace("NwtControlForTypeDayPicker.methods.goToPreviousMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() - 1));
      },
      goToNextMonth: function () {
        trace("NwtControlForTypeDayPicker.methods.goToNextMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() + 1));
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
    data: function () {
      return {
        dateForMonth: new Date(),
        selectedDate: undefined,
      };
    },
    computed: {
      cellsForMonth: function () {
        const currentMonth = this.dateForMonth;
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstOfMonth = new Date(year, month, 1);
        const lastOfMonth = new Date(year, month + 1, 0);
        const cells = [];
        // JS: domingo=0 ... sábado=6 y queremos lunes=0
        const day = (firstOfMonth.getDay() + 6) % 7;
        const startDate = new Date(firstOfMonth);
        startDate.setDate(firstOfMonth.getDate() - day);
        const cursor = new Date(startDate);
        while (true) {
          const week = [];
          for (let i = 0; i < 7; i++) {
            week.push({
              month: cursor.getMonth(),
              day: cursor.getDate()
            });
            cursor.setDate(cursor.getDate() + 1);
          }
          cells.push(week);
          if (cursor > lastOfMonth && cursor.getDay() === 1) {
            break;
          }
        }
        return cells;
      }
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/day-picker.control.onValidate");
      console.log("Validation at resource-level on control/for/type/day-picker");
    },
  },
};
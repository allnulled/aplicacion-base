module.exports = {
  id: "view/for/type/day-picker",
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
      default: LowCode.create("new Date()")
    },
    onChange: {
      type: LowCode.type.Function,
      default: function() {},
    },
  },
  view: {
    name: "NwtViewForTypeDayPicker",
    template: $template,
    methods: {
      getValueByDom: function () {
        trace("NwtViewForTypeDayPicker.methods.getValueByDom");
        return this.getSelectedDayFormatted();
      },
      setValueByDom: function (date) {
        trace("NwtViewForTypeDayPicker.methods.setValueByDom");
        this.selectedCell = this.fromDateToCell(date);
      },
      reloadValue: function () {
        return this.loadValue();
      },
      saveValue: function () {
        trace("NwtViewForTypeDayPicker.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function () {
        trace("NwtViewForTypeDayPicker.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        const value = this.getValueBySchema();
        if(value) {
          this.selectedCell = this.fromDateToCell(value);
        }
      },
      onValidate: function () {
        trace("NwtViewForTypeDayPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/day-picker");
      },
      /////////////////////////////////////
      goToPreviousMonth: function () {
        trace("NwtViewForTypeDayPicker.methods.goToPreviousMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() - 1));
      },
      goToNextMonth: function () {
        trace("NwtViewForTypeDayPicker.methods.goToNextMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() + 1));
      },
      goToPreviousYear: function () {
        trace("NwtViewForTypeDayPicker.methods.goToPreviousYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() - 1));
      },
      goToNextYear: function () {
        trace("NwtViewForTypeDayPicker.methods.goToNextYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() + 1));
      },
      selectCell: function(cell) {
        trace("NwtViewForTypeDayPicker.methods.selectCell");
        if(this.areSameCell(cell, this.selectedCell)) {
          this.selectedCell = undefined;
        } else {
          this.selectedCell = cell;
        }
      },
      fromDateToCell: function(date) {
        trace("NwtViewForTypeDayPicker.methods.fromDateToCell");
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        };
      },
      areSameCell: function(cell1, cell2) {
        trace("NwtViewForTypeDayPicker.methods.areSameCell");
        return cell1.year === cell2.year && cell1.month === cell2.month && cell1.day === cell2.day;
      },
      getSelectedDayFormatted: function() {
        trace("NwtViewForTypeDayPicker.methods.getSelectedDayFormatted");
        let out = "none";
        if(this.selectedCell) {
          const year = this.selectedCell.year;
          const month = this.selectedCell.month;
          const day = this.selectedCell.day;
          out = `${year}/${NwtUtils.padStart(month,2,'0')}/${NwtUtils.padStart(day,2,'0')}`;
        }
        return out;
      },
      onChangeWrapper: function(newValue, oldValue) {
        trace("NwtViewForTypeDayPicker.methods.onChangeWrapper");
        const value = this.getSelectedDayFormatted();
        this.settings.onChange(value, this);
      }
      /////////////////////////////////////
    },
    watch: {
      selectedCell: ["onChangeWrapper"]
    },
    created: function () {
      trace("NwtViewForTypeDayPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function () {
      trace("NwtViewForTypeDayPicker.mounted");
      this.reloadValue();
      this.selectedCell = this.settings.initialValue ? this.fromDateToCell(this.settings.initialValue) : this.fromDateToCell(new Date());
    },
    ///////////////////////////////////
    data: function () {
      return {
        dateForMonth: new Date(),
        selectedCell: undefined,
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
            const cell = {
              year: cursor.getFullYear(),
              month: cursor.getMonth(),
              notSameMonth: cursor.getMonth() !== month,
              day: cursor.getDate()
            };
            week.push(cell);
            cursor.setDate(cursor.getDate() + 1);
          }
          cells.push(week);
          if (cursor > lastOfMonth && cursor.getDay() === 1) {
            break;
          }
        }
        return cells;
      }
    },
    props: {
      isAttached: {
        type: LowCode.type.Boolean,
        default: false
      }
    }
  },
  control: {
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/view/for/type/day-picker.control.onValidate");
      console.log("Validation at resource-level on view/for/type/day-picker");
    },
  },
};
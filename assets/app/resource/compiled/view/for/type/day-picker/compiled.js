NwtResource.define({
  id: "view/for/type/day-picker",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/getValue", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/remoteSchema", "control/trait/for/remoteComponent", "control/trait/for/settings"],
  traits: {},
  settingsSpec: {
    "isShowingControl": {
      "type": Boolean,
      "default": true
    },
    "initialValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null],
      "default": new Date()
    },
    "hasFixedValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null]
    },
    "rootValueIndex": {
      "type": Array,
      "required": true
    },
    "rootSchemaIndex": {
      "type": Array,
      "required": true
    },
    "rootComponentIndex": {
      "type": Array,
      "required": true
    },
    "onChange": {
      "type": Function,
      "default": function() {}
    }
  },
  subtypeOf: "text",
  compileView: true,
  control: {
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/view/for/type/day-picker.control.onValidate");
      console.log("Validation at resource-level on view/for/type/day-picker");
    }
  },
  view: {
    name: "NwtViewForTypeDayPicker",
    props: {
      "settings": {
        "type": Object,
        "required": true
      },
      "isAttached": {
        "type": Boolean,
        "default": false
      }
    },
    template: `
      <div class="nwt_view_for_type_day_picker">
          <div class="calendar_container" v-if="settings.isShowingControl">
              <div class="flex_row centered" v-if="!isAttached">
                  <div class="flex_1 no_wrap">
                      📌 Día: 
                  </div>
                  <div class="flex_100">
                      <input type="text" class="width_100" :disabled="true" :ref="$nwt.Vue2.generateRefCallback(['$local','control'])" :value="getSelectedDayFormatted()" />
                  </div>
              </div>
              <div class="flex_row centered">
                  <div class="flex_1">
                      <button class="mini fluid width_100" v-on:click="goToPreviousYear">◀️</button>
                  </div>
                  <div class="flex_100 text_align_center">
                      {{ dateForMonth.getFullYear() }}
                  </div>
                  <div class="flex_1">
                      <button class="mini fluid width_100" v-on:click="goToNextYear">▶️</button>
                  </div>
      
                  <div class="flex_1">
                      <button class="mini fluid width_100" v-on:click="goToPreviousMonth">◀️</button>
                  </div>
                  <div class="flex_100 text_align_center">
                      {{ $nwt.Utils.capitalize(dateForMonth.toLocaleDateString(undefined, { month: "long"} )) }}
                  </div>
                  <div class="flex_1">
                      <button class="mini fluid width_100" v-on:click="goToNextMonth">▶️</button>
                  </div>
              </div>
              <div class="no_table calendar">
                  <div class="thead">
                      <div class="row">
                          <div class="cell">mon</div>
                          <div class="cell">tue</div>
                          <div class="cell">wed</div>
                          <div class="cell">thu</div>
                          <div class="cell">fri</div>
                          <div class="cell">sat</div>
                          <div class="cell">sun</div>
                      </div>
                  </div>
                  <div class="tbody">
                      <div class="row" v-for="week, weekIndex in cellsForMonth" v-bind:key="'week_' + weekIndex">
                          <div class="cell"
                              :class="{
                                  inactive: cell.notSameMonth,
                                  active: (!cell.notSameMonth) && (selectedCell) && (selectedCell.day === cell.day) && (selectedCell.month === cell.month) && (selectedCell.year === cell.year),
                              }"
                              v-for="cell, cellIndex in week"
                              v-bind:key="'week_' + weekIndex + '_cell_' + cellIndex"
                              v-on:click="() => cell.notSameMonth ? 0 : selectCell(cell)">
                              {{ cell.day }}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <nwt-control-error-handler :control="this" />
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/showable
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/showable.data");
        return {
          isShowingControl: this.settings.isShowingControl,
        };
      }).call(this));
      // @COMPILED-BY: control/trait/for/getValue
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/getValue.data");
        return {
          value: undefined,
        };
      }).call(this));
      // @COMPILED-BY: view/for/type/day-picker
      Object.assign(finalData, (function() {
        return {
          dateForMonth: new Date(),
          selectedCell: undefined,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "showControl": function() {
        trace("@compilable/control/trait/for/showable.methods.showControl");
        this.isShowingControl = true;
      },
      "hideControl": function() {
        trace("@compilable/control/trait/for/showable.methods.hideControl");
        this.isShowingControl = false;
      },
      "toggleControl": function() {
        trace("@compilable/control/trait/for/showable.methods.toggleControl");
        this.isShowingControl = !this.isShowingControl;
      },
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
        const value = NwtStatic.api.control.getValueBySchema(this.settings.value, this.settings.valueIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(value);
        return formattedValue;
      },
      "getComponentNameBySettings": function(...args) {
        return this.$toolkit.getComponentNameBySettings(...args);
      },
      "getIndexForValue": function(...args) {
        return this.$toolkit.getIndexForValue(...args);
      },
      "getFallbackValue": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getFallbackValue");
        const fullControlName = `control/for/${this.$options.statically.subtypeOf === "text"}`;
        return this.getFallbackValueBySchema({
          ...this.settings,
          subtypeOf: fullControlName
        });
      },
      "getFallbackValueBySchema": function(settings) {
        trace("@compilable/control/trait/for/remoteValue.methods.getFallbackValueBySchema");
        if (settings.hasFallbackValue) {
          return settings.hasFallbackValue;
        }
        if (settings.type === "control/for/text") {
          return "";
        } else if (settings.type === "control/for/list") {
          return [];
        } else if (settings.type === "control/for/option") {
          return this.getFallbackValueBySchema(settings.schema);
        } else if (settings.type === "control/for/structure") {
          const structureSchema = settings.schema;
          const output = {};
          for (let key in structureSchema) {
            output[key] = this.getFallbackValueBySchema(this.settings.schema[key]);
          }
          return output;
        }
      },
      "getValueBySchema": function() {
        trace("@compilable/control/trait/for/remoteValue.methods.getValueBySchema");
        if (this.settings.hasFixedValue) return this.settings.hasFixedValue;
        const indexes = this.getIndexForValue();
        const fallbackFactory = this.getFallbackValue.bind(this);
        const originalValue = this.$toolkit.getRoot().$store.get(indexes, fallbackFactory);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(originalValue);
        return formattedValue;
      },
      "setValueBySchema": function(value) {
        trace("@compilable/control/trait/for/remoteValue.methods.setValueBySchema");
        const indexes = this.$toolkit.getIndexForValue();
        this.$toolkit.getRoot().$store.set(indexes, value);
        this.$toolkit.getRoot().$store.dispatch("@SetValue", indexes, {
          index: indexes,
          value: value
        });
      },
      "rootListenerCallback": function() {
        this.$forceUpdate(true);
      },
      "getIndexForSchema": function(...args) {
        return this.$toolkit.getIndexForSchema(...args);
      },
      "getSchemaByIndex": function() {
        trace("@compilable/control/trait/for/remoteSchema.methods.getSchemaByIndex");
        if (this.settings.hasFixedSchema) return this.settings.hasFixedSchema;
        const originalSchema = this.$toolkit.getRoot().$schema.get(this.settings.rootSchemaIndex);
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedSchema = formatterBySettings(originalSchema);
        return formattedSchema;
      },
      "setSchemaByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteSchema.methods.setSchemaByIndex");
        throw new Error("Tu para que quieres setSchemear")
        this.$toolkit.getRoot().$store.set(this.settings.rootSchemaIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootSchemaIndex,
          value: value,
        });
      },
      "getIndexForComponent": function(...args) {
        return this.$toolkit.getIndexForComponent(...args);
      },
      "getComponentByIndex": function() {
        trace("@compilable/control/trait/for/remoteComponent.methods.getComponentByIndex");
        return NwtAccessor.get(this.$toolkit.getRoot(), this.settings.rootComponentIndex);
      },
      "setComponentByIndex": function(value) {
        trace("@compilable/control/trait/for/remoteComponent.methods.setComponentByIndex");
        throw new Error("Tu para que quieres setComponentear")
        this.$toolkit.getRoot().$store.set(this.settings.rootComponentIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootComponentIndex,
          value: value,
        });
      },
      "getValueByDom": function() {
        trace("NwtViewForTypeDayPicker.methods.getValueByDom");
        return this.getSelectedDayFormatted();
      },
      "setValueByDom": function(date) {
        trace("NwtViewForTypeDayPicker.methods.setValueByDom");
        this.selectedCell = this.fromDateToCell(date);
      },
      "reloadValue": function() {
        return this.loadValue();
      },
      "saveValue": function() {
        trace("NwtViewForTypeDayPicker.methods.saveValue");
        const value = this.getValueByDom();
        this.setValueBySchema(value);
      },
      "loadValue": function() {
        trace("NwtViewForTypeDayPicker.methods.loadValue");
        const value = this.getValueBySchema();
        this.selectedCell = value ? this.fromDateToCell(value) : this.settings.initialValue ? this.fromDateToCell(this.settings.initialValue) : this.fromDateToCell(new Date());
      },
      "onValidate": function() {
        trace("NwtViewForTypeDayPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/day-picker");
      },
      "goToPreviousMonth": function() {
        trace("NwtViewForTypeDayPicker.methods.goToPreviousMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() - 1));
      },
      "goToNextMonth": function() {
        trace("NwtViewForTypeDayPicker.methods.goToNextMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() + 1));
      },
      "goToPreviousYear": function() {
        trace("NwtViewForTypeDayPicker.methods.goToPreviousYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() - 1));
      },
      "goToNextYear": function() {
        trace("NwtViewForTypeDayPicker.methods.goToNextYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() + 1));
      },
      "selectCell": function(cell) {
        trace("NwtViewForTypeDayPicker.methods.selectCell");
        if (this.areSameCell(cell, this.selectedCell)) {
          this.selectedCell = undefined;
        } else {
          this.selectedCell = cell;
        }
      },
      "fromDateToCell": function(dateInput) {
        trace("NwtViewForTypeDayPicker.methods.fromDateToCell");
        let date = dateInput;
        if (typeof date === "string") {
          date = NwtTimer.fromStringToDate(date);
        }
        if (!(date instanceof Date)) {
          return date;
        }
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        };
      },
      "areSameCell": function(cell1, cell2) {
        trace("NwtViewForTypeDayPicker.methods.areSameCell");
        try {
          return cell1.year === cell2.year && cell1.month === cell2.month && cell1.day === cell2.day;
        } catch (error) {
          console.error("Error comparing cells:", error);
          return false;
        }
      },
      "getSelectedDayFormatted": function(forHumans = false) {
        trace("NwtViewForTypeDayPicker.methods.getSelectedDayFormatted");
        let out = "none";
        let cell = undefined;
        if (this.selectedCell) {
          cell = this.selectedCell;
        } else {
          cell = this.fromDateToCell(new Date());
        }
        const year = cell.year;
        const month = parseInt(cell.month) + (forHumans ? 1 : 0);
        const day = cell.day;
        out = `${year}/${NwtUtils.padStart(month,2,'0')}/${NwtUtils.padStart(day,2,'0')}`;
        return out;
      },
      "onChangeWrapper": function(newValue, oldValue) {
        trace("NwtViewForTypeDayPicker.methods.onChangeWrapper");
        const value = this.getSelectedDayFormatted();
        this.settings.onChange(value, this);
      }
    },
    computed: {
      "cellsForMonth": function() {
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
    watch: {
      "value": function(newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.value");
        const propagator = this.settings.onChange || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      },
      "valueOption": function(newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
        const propagator = this.settings.onChangeOption || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      },
      "selectedCell": ["onChangeWrapper"]
    },
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: view/for/type/day-picker
      trace("NwtViewForTypeDayPicker.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/getValue
      trace("@compilable/control/trait/for/getValue.mounted");
      this.value = this.settings.hasFixedValue || this.settings.initialValue;
      // @COMPILED-BY: control/trait/for/remoteValue
      // @DONE: Self-synchronized
      trace("@compilable/control/trait/for/remoteValue.mounted");
      Add_listener: {
        if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
          break Add_listener;
        }
        if (!this.$local.rootListenerCallback) {
          this.$local.rootListenerCallback = this.rootListenerCallback.bind(this);
        }
        this.$toolkit.getRoot().$store.on("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
      }
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: view/for/type/day-picker
      trace("NwtViewForTypeDayPicker.mounted");
      this.reloadValue();
    },
    beforeDestroy: function() {
      // @COMPILED-BY: control/trait/for/remoteValue
      // @DONE: Self-unsynchronized
      trace("@compilable/control/trait/for/remoteValue.beforeDestroy");
      setTimeout(() => {
        Remove_listener: {
          if (["list", "structure", "option"].includes(this.$options.statically.subtypeOf)) {
            break Remove_listener;
          }
          this.$toolkit.getRoot().$store.off("@SetValue", this.settings.rootValueIndex, this.$local.rootListenerCallback);
        }
      }, 0);
    },
  }
});
NwtResource.define({
  id: "control/for/type/day-picker",
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
      "default": function() {
        return new Date();
      }
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
    }
  },
  subtypeOf: "text",
  compileView: true,
  control: {
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/day-picker.control.onValidate");
      console.log("Validation at resource-level on control/for/type/day-picker");
    }
  },
  view: {
    name: "NwtControlForTypeDayPicker",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_type_day_picker">
          <!--Nwt control for date {{ $nwt.Reflection.keys(settings) }}-->
          <nwt-control-partial-for-statement :control="this">
              <template v-slot:hideable>
                  <slot name="hideable"></slot>
              </template>
              <slot></slot>
          </nwt-control-partial-for-statement>
          <div class="calendar_container" v-if="isShowingControl">
              <input type="text" class="width_100" disabled="true" :value="getSelectedDayFormatted()" />
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
                                  active: (!cell.notSameMonth) && (selectedCell) && (selectedCell.day === cell.day) && (selectedCell.month === cell.month),
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
      // @COMPILED-BY: control/for/type/day-picker
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
        assertion(Array.isArray(this.settings.rootValueIndex), "Configuration «settings.rootValueIndex» must be array on «@compilable/control/trait/for/remoteValue.methods.getValueBySchema»");
        this.$toolkit.getRoot().$store.set(this.settings.rootValueIndex, value);
        this.$toolkit.getRoot().$store.dispatch("set-value", {
          index: this.settings.rootValueIndex,
          value: value,
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
        trace("NwtControlForTypeDayPicker.methods.getValueByDom");
        if (!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      "setValueByDom": function(value) {
        trace("NwtControlForTypeDayPicker.methods.setValueByDom");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      "reloadValue": function() {
        return this.loadValue();
      },
      "saveValue": function() {
        trace("NwtControlForTypeDayPicker.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      "loadValue": function() {
        trace("NwtControlForTypeDayPicker.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      "onValidate": function() {
        trace("NwtControlForTypeDayPicker.methods.onValidate");
        console.log("Validation at component-level on control/for/type/day-picker");
      },
      "goToPreviousMonth": function() {
        trace("NwtControlForTypeDayPicker.methods.goToPreviousMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() - 1));
      },
      "goToNextMonth": function() {
        trace("NwtControlForTypeDayPicker.methods.goToNextMonth");
        this.dateForMonth = new Date(this.dateForMonth.setMonth(this.dateForMonth.getMonth() + 1));
      },
      "goToPreviousYear": function() {
        trace("NwtControlForTypeDayPicker.methods.goToPreviousYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() - 1));
      },
      "goToNextYear": function() {
        trace("NwtControlForTypeDayPicker.methods.goToNextYear");
        this.dateForMonth = new Date(this.dateForMonth.setFullYear(this.dateForMonth.getFullYear() + 1));
      },
      "selectCell": function(cell) {
        trace("NwtControlForTypeDayPicker.methods.selectCell");
        if (cell === this.selectedCell) {
          this.selectedCell = undefined;
        } else {
          this.selectedCell = cell;
        }
      },
      "getSelectedDayFormatted": function() {
        trace("NwtControlForTypeDayPicker.methods.getSelectedDayFormatted");
        let out = "none";
        if (this.selectedCell) {
          const year = this.selectedCell.year;
          const month = this.selectedCell.month;
          const day = this.selectedCell.day;
          out = `${year}/${NwtUtils.padStart(month,2,'0')}/${NwtUtils.padStart(day,2,'0')}`;
        }
        return out;
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
            week.push({
              year: cursor.getFullYear(),
              month: cursor.getMonth(),
              notSameMonth: cursor.getMonth() !== month,
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
      }
    },
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: control/for/type/day-picker
      trace("NwtControlForTypeDayPicker.created");
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
      // @COMPILED-BY: control/for/type/day-picker
      trace("NwtControlForTypeDayPicker.mounted");
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
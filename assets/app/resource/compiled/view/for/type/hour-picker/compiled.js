NwtResource.define({
  id: "view/for/type/hour-picker",
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
      trace("@compilable/view/for/type/hour-picker.control.onValidate");
      console.log("Validation at resource-level on view/for/type/hour-picker");
    }
  },
  view: {
    name: "NwtViewForTypeHourPicker",
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
      <div class="nwt_control_for_type_hour_picker">
          <!--Nwt control for date {{ $nwt.Reflection.keys(settings) }}-->
          <div class="hour_picker_container" v-if="settings.isShowingControl">
              <div class="flex_row centered" v-if="!isAttached">
                  <div class="flex_1 no_wrap">
                      📌 Hora: 
                  </div>
                  <div class="flex_100">
                      <input type="text" class="width_100" :disabled="true" :ref="$nwt.Vue2.generateRefCallback(['$local','controls','moment'])" :value="getSelectedHourFormatted()" />
                  </div>
              </div>
              <div class="flex_row centered" style="padding-top: 8px;padding-bottom: 8px;">
                  <div class="flex_1">
                      <div class="clock for_hours">
                          <template v-if="selectedHourRange === 'am'">
                              <span :class="{active:selectedHour === 1}" v-on:click="selectHour" style="--i:1">1</span>
                              <span :class="{active:selectedHour === 2}" v-on:click="selectHour" style="--i:2">2</span>
                              <span :class="{active:selectedHour === 3}" v-on:click="selectHour" style="--i:3">3</span>
                              <span :class="{active:selectedHour === 4}" v-on:click="selectHour" style="--i:4">4</span>
                              <span :class="{active:selectedHour === 5}" v-on:click="selectHour" style="--i:5">5</span>
                              <span :class="{active:selectedHour === 6}" v-on:click="selectHour" style="--i:6">6</span>
                              <span :class="{active:selectedHour === 7}" v-on:click="selectHour" style="--i:7">7</span>
                              <span :class="{active:selectedHour === 8}" v-on:click="selectHour" style="--i:8">8</span>
                              <span :class="{active:selectedHour === 9}" v-on:click="selectHour" style="--i:9">9</span>
                              <span :class="{active:selectedHour === 10}" v-on:click="selectHour" style="--i:10">10</span>
                              <span :class="{active:selectedHour === 11}" v-on:click="selectHour" style="--i:11">11</span>
                              <span :class="{active:selectedHour === 0}" v-on:click="selectHour" style="--i:12">0</span>
                          </template>
                          <template v-else-if="selectedHourRange === 'pm'">
                              <span :class="{active:selectedHour === 13}" v-on:click="selectHour" style="--i:1">13</span>
                              <span :class="{active:selectedHour === 14}" v-on:click="selectHour" style="--i:2">14</span>
                              <span :class="{active:selectedHour === 15}" v-on:click="selectHour" style="--i:3">15</span>
                              <span :class="{active:selectedHour === 16}" v-on:click="selectHour" style="--i:4">16</span>
                              <span :class="{active:selectedHour === 17}" v-on:click="selectHour" style="--i:5">17</span>
                              <span :class="{active:selectedHour === 18}" v-on:click="selectHour" style="--i:6">18</span>
                              <span :class="{active:selectedHour === 19}" v-on:click="selectHour" style="--i:7">19</span>
                              <span :class="{active:selectedHour === 20}" v-on:click="selectHour" style="--i:8">20</span>
                              <span :class="{active:selectedHour === 21}" v-on:click="selectHour" style="--i:9">21</span>
                              <span :class="{active:selectedHour === 22}" v-on:click="selectHour" style="--i:10">22</span>
                              <span :class="{active:selectedHour === 23}" v-on:click="selectHour" style="--i:11">23</span>
                              <span :class="{active:selectedHour === 12}" v-on:click="selectHour" style="--i:12">12</span>
                          </template>
                          <div class="center">
                              <button :class="{active:selectedHourRange === 'am'}" v-on:click="selectAm" class="mini">AM</button>
                              <span style="min-width:4px;"></span>
                              <button :class="{active:selectedHourRange === 'pm'}" v-on:click="selectPm" class="mini">PM</button>
                          </div>
                      </div>
                  </div>
                  <div class="flex_1" style="min-width:20px;"></div>
                  <div class="flex_1">
                      <div class="clock for_minutes">
                          <span :class="{active:selectedMinute === 5}" v-on:click="selectMinute" style="--i:1">5</span>
                          <span :class="{active:selectedMinute === 10}" v-on:click="selectMinute" style="--i:2">10</span>
                          <span :class="{active:selectedMinute === 15}" v-on:click="selectMinute" style="--i:3">15</span>
                          <span :class="{active:selectedMinute === 20}" v-on:click="selectMinute" style="--i:4">20</span>
                          <span :class="{active:selectedMinute === 25}" v-on:click="selectMinute" style="--i:5">25</span>
                          <span :class="{active:selectedMinute === 30}" v-on:click="selectMinute" style="--i:6">30</span>
                          <span :class="{active:selectedMinute === 35}" v-on:click="selectMinute" style="--i:7">35</span>
                          <span :class="{active:selectedMinute === 40}" v-on:click="selectMinute" style="--i:8">40</span>
                          <span :class="{active:selectedMinute === 45}" v-on:click="selectMinute" style="--i:9">45</span>
                          <span :class="{active:selectedMinute === 50}" v-on:click="selectMinute" style="--i:10">50</span>
                          <span :class="{active:selectedMinute === 55}" v-on:click="selectMinute" style="--i:11">55</span>
                          <span :class="{active:selectedMinute === 0}" v-on:click="selectMinute" style="--i:12">0</span>
                          <div class="center">
                              <button v-on:click="decreaseMinute" class="mini">🔽</button>
                              <span style="min-width:4px;"></span>
                              <button v-on:click="increaseMinute" class="mini">🔼</button>
                          </div>
                      </div>
                  </div>
                  <div class="flex_100"></div>
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
      // @COMPILED-BY: view/for/type/hour-picker
      Object.assign(finalData, (function() {
        return {
          selectedHour: 0,
          selectedMinute: 0,
          selectedHourRange: "am",
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
        trace("NwtViewForTypeHourPicker.methods.getValueByDom");
        if (!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      "setValueByDom": function(value) {
        trace("NwtViewForTypeHourPicker.methods.setValueByDom");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      "reloadValue": function() {
        return this.loadValue();
      },
      "saveValue": function() {
        trace("NwtViewForTypeHourPicker.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      "loadValue": function() {
        trace("NwtViewForTypeHourPicker.methods.loadValue");
        if (!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      "onValidate": function() {
        trace("NwtViewForTypeHourPicker.methods.onValidate");
        console.log("Validation at component-level on view/for/type/hour-picker");
      },
      "selectHour": function(event) {
        trace("NwtViewForTypeHourPicker.methods.selectHour");
        this.selectedHour = parseInt(event.target.textContent);
      },
      "selectMinute": function(event) {
        trace("NwtViewForTypeHourPicker.methods.selectMinute");
        this.selectedMinute = parseInt(event.target.textContent);
      },
      "selectAm": function() {
        trace("NwtViewForTypeHourPicker.methods.selectAm");
        this.selectedHourRange = "am";
      },
      "selectPm": function() {
        trace("NwtViewForTypeHourPicker.methods.selectPm");
        this.selectedHourRange = "pm";
      },
      "increaseMinute": function() {
        trace("NwtViewForTypeHourPicker.methods.increaseMinute");
        this.selectedMinute++;
      },
      "decreaseMinute": function() {
        trace("NwtViewForTypeHourPicker.methods.decreaseMinute");
        this.selectedMinute--;
      },
      "getSelectedHourFormatted": function() {
        trace("NwtViewForTypeHourPicker.methods.getSelectedHourFormatted");
        let out = "";
        if (typeof this.selectedHour === "number") {
          out += NwtUtils.padStart(this.selectedHour, 2, '0');
        } else {
          out += NwtUtils.padStart(0, 2, '0');
        }
        out += ":";
        if (typeof this.selectedMinute === "number") {
          out += NwtUtils.padStart(this.selectedMinute, 2, '0');
        } else {
          out += NwtUtils.padStart(0, 2, '0');
        }
        return out;
      },
      "onChangeWrapper": function(newValue, oldValue) {
        trace("NwtViewForTypeHourPicker.methods.onChangeWrapper");
        const value = this.getSelectedHourFormatted();
        this.settings.onChange(value, this);
      }
    },
    computed: {},
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
      "selectedHour": ["onChangeWrapper"],
      "selectedMinute": ["onChangeWrapper"],
      "selectedHourRange": ["onChangeWrapper"]
    },
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: view/for/type/hour-picker
      trace("NwtViewForTypeHourPicker.created");
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
      // @COMPILED-BY: view/for/type/hour-picker
      trace("NwtViewForTypeHourPicker.mounted");
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
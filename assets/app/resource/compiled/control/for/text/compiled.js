NwtResource.define({
  id: "control/for/text",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/getValue", "control/trait/for/settings", "control/trait/for/validate", "control/trait/for/showable"],
  traits: {},
  settingsSpec: {
    "initialValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null]
    },
    "hasFixedValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null],
      "default": "default"
    },
    "onValidate": {
      "type": [
        Function
      ],
      "default": NwtUtils.noop
    },
    "isShowingControl": {
      "type": Boolean,
      "default": false
    }
  },
  compileView: true,
  control: {
    "primitiveType": "text",
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "string", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/text').control.onValidate»`);
    }
  },
  view: {
    name: "NwtControlForText",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_text">
          <div class="flex_row">
              <div class="flex_100">
                  <nwt-control-partial-for-statement :control="this" />
              </div>
          </div>
          <div class="pad_top_1" v-show="isShowingControl || true">
              <div class="flex_row centered">
                  <div class="flex_100">
                      <input type="text"
                          class="width_100"
                          v-model="value"
                          :placeholder="settings.hasPlaceholder || settings.hasStructurekey || ''"
                          :disabled="!!settings.hasFixedValue"
                      />
                  </div>
                  <div class="flex_1 pad_left_1">
                      <button class="mini"
                          :class="{active:validationErrors.length}"
                          v-on:click="validateValue"
                          :data-rabbit="settings.hasStatement === 'Nombre:' ? 1 : 0">💡</button>
                  </div>
              </div>
              <nwt-control-partial-for-error-handler :control="this" />
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/getValue
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/getValue.data");
        return {
          value: undefined,
        };
      }).call(this));
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/validate.data");
        return {
          validationErrors: [],
        };
      }).call(this));
      // @COMPILED-BY: control/trait/for/showable
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/showable.data");
        return {
          isShowingControl: this.settings.isShowingControl,
        };
      }).call(this));
      // @COMPILED-BY: control/for/text
      Object.assign(finalData, (function() {
        trace("NwtControlForText.data");
        return {
          isWellFormed: undefined,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
        const formatterBySettings = this.settings.onFormat || NwtUtils.noopSelf;
        let formattedValue = formatterBySettings(this.value);
        return formattedValue;
      },
      "validateControlSchema": function() {
        trace("@compilable/control/trait/for/validate.methods.validateControlSchema");
        return this.$options.statically.api.control.validation.validateControlSchema(this.settings, [], assertion);
      },
      "validateValue": function() {
        trace("@compilable/control/trait/for/validate.methods.validateValue");
        const value = this.getValue();
        this.validationErrors = [];
        return this.$options.statically.api.control.validation.validateValue(value, this.settings, this, [], NwtAsserter.createAssertionFunction(() => {
          return true;
        }, error => {
          this.validationErrors.push(error);
          this.showControl();
          throw error;
        }));
      },
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
      }
    },
    computed: {},
    watch: {
      "value": [
        function(newValue, oldValue) {
          trace("@compilable/control/trait/for/getValue.watch.value");
          const propagator = this.settings.onChange || NwtUtils.noop;
          propagator(newValue, oldValue, this);
        },
        function() {
          trace("@compilable/control/trait/for/settings.watch.value");
        }
      ],
      "valueOption": function(newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
        const propagator = this.settings.onChangeOption || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      }
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/getValue
      (function() {
        trace("@compilable/control/trait/for/getValue.mounted");
        this.value = this.settings.hasFixedValue || this.settings.initialValue;
      }).call(this);
      // @COMPILED-BY: control/trait/for/settings
      (function() {
        trace("@compilable/control/trait/for/settings.mounted");
        NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      }).call(this);
      // @COMPILED-BY: control/for/text
      (function() {
        trace("NwtControlForText.mounted");
        this.$options.statically.api.control.validation.validateControlSchema(this.settings);
        this.$options.statically.api.control.validation.validateValue(this.getValue());
        this.isWellFormed = true;
      }).call(this);
    },
  }
});
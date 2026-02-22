NwtResource.define({
  id: "control/for/option",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/getValue", "control/trait/for/settings", "control/trait/for/validate", "control/trait/for/showable"],
  traits: {},
  settingsSpec: {
    "initialValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null]
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
    },
    "schema": {
      "type": [
        Object
      ],
      "default": null
    }
  },
  compileView: true,
  control: {
    "primitiveType": "option",
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      // assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(Array.isArray(settings.schema), `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be array not only object on «NwtResource.for('control/for/option').control.onValidate»`);
      Checking_schema_types: for (let index = 0; index < settings.schema.length; index++) {
        const optionSchema = settings.schema[index];
        assertion(typeof optionSchema === "object", `Parameter «settings.schema[${index}]»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object but «${typeof optionSchema}» found on «NwtResource.for('control/for/option').control.onValidate»`);
        assertion(typeof optionSchema.type === "string", `Parameter «settings.schema[${index}].type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string but «${typeof optionSchema.type}» found on «NwtResource.for('control/for/option').control.onValidate»`);
        assertion(NwtResource.isDefined(optionSchema.type), `Parameter «settings.schema[${index}].type» which is «${settings.schema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/option').control.onValidate»`);
      }
      const errors = [];
      let discriminators = false;
      Checking_value_type: for (let index = 0; index < settings.schema.length; index++) {
        const resource = NwtResource.for(settings.schema[index].type);
        const subschema = settings.schema[index];
        console.log("Pasandole schema de validacion a sub de option:", resource.id, value, subschema);
        const validation = resource.api.control.validation.validateValue(value, subschema, component, indexes, assertion);
        if (validation.error === true) {
          errors.push(validation.data);
        } else if (validation.success) {
          discriminators = index + 1;
          break Checking_value_type;
        }
      }
      if (errors.length && (discriminators === false)) {
        throw NwtErrorUtils.unifyErrors(errors);
      } else if (discriminators === false) {
        throw new Error(`Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} does not match any schema option on «NwtResource.for('control/for/option').control.onValidate»`);
      }
      return discriminators;
    }
  },
  view: {
    name: "NwtControlForOption",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_option">
          <nwt-control-partial-for-statement :control="this" />
          <div v-show="isShowingControl">
              <template v-if="isWellFormed">
                  <component v-if="settings.valueOption in settings.schema"
                      :is="$nwt.Resource.fromResourceIdToVueComponentId(settings.schema[settings.valueOption].type)"
                      :settings="{
                      ...settings.schema[settings.valueOption],
                      initialValue: value,
                  }" />
              </template>
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
      // @COMPILED-BY: control/for/option
      Object.assign(finalData, (function() {
        return {
          isWellFormed: undefined,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
        const formatterBySettings = this.settings?.onFormat || NwtUtils.noopSelf;
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
          const propagator = this.settings?.onChange || NwtUtils.noop;
          propagator(newValue, oldValue, this);
        },
        function() {
          trace("@compilable/control/trait/for/settings.watch.value");
        }
      ],
      "valueOption": function(newValue, oldValue) {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
        const propagator = this.settings?.onChangeOption || NwtUtils.noop;
        propagator(newValue, oldValue, this);
      }
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/getValue
      (function() {
        trace("@compilable/control/trait/for/getValue.mounted");
        this.value = this.settings?.initialValue;
      }).call(this);
      // @COMPILED-BY: control/trait/for/settings
      (function() {
        trace("@compilable/control/trait/for/settings.mounted");
        NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      }).call(this);
      // @COMPILED-BY: control/for/option
      (function() {
        trace("NwtControlForList.mounted");
        this.$options.statically.api.control.validation.validateControlSchema(this.settings);
        // @DIFFERENTLY: set value option
        const validation = this.$options.statically.api.control.validation.validateValue(this.getValue(), this.settings, this);
        this.settings.valueOption = validation.data;
        this.isWellFormed = true;
      }).call(this);
    },
  }
});
NwtResource.define({
  id: "control/for/option",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/getValue", "control/trait/for/settings", "control/trait/for/validate"],
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
          <pre>Option = {{ $nwt.Utils.filterObjectProperties(settings, (k,v) => !["schema","type","pointer"].includes(k)) }}</pre>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/trait/for/getValue
      Object.assign(finalData, (function() {
        return {
          value: null,
        }
      }).call(this));
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        return {
          validationErrors: [],
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function() {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
      },
      "validateValue": function() {
        const value = this.getValue();
        return NwtStatic.api.control.validation.interface.statically.validateValue(this.$options.statically, value, this.settings, this, [], NwtAsserter.createAssertionFunction(() => {
          return true;
        }, error => {
          this.validationErrors.push(error);
          throw error;
        }));
      }
    },
    computed: {},
    watch: {
      "value": [
        function() {
          trace("@compilable/control/trait/for/getValue.watch.value");
        },
        function() {
          trace("@compilable/control/trait/for/settings.watch.value");
        }
      ],
      "valueOption": function() {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");
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
    },
  }
});
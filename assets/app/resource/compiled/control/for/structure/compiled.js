NwtResource.define({
  id: "control/for/structure",
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
    "primitiveType": "structure",
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings.schema.type === "undefined", `Parameter «settings.schema.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} can lead to misunderstanding because this object is not aimed to define a type but a map of types on «NwtResource.for('control/for/structure').control.onValidate»`);
      const schema = settings.schema;
      const props = Object.keys(schema);
      const errors = [];
      const discriminators = {};
      const isRoot = indexes.length === 0;
      for (let indexId = 0; indexId < props.length; indexId++) {
        const propId = props[indexId];
        const propValue = value[propId];
        assertion(propId in schema, `Property «${propId}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} is not declared on «settings.schema» on «NwtResource.for('control/for/structure').control.onValidate»`);
        const propSchema = schema[propId];
        assertion(typeof propSchema === "object", `Parameter «settings.schema[${propId}]»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
        assertion(typeof propSchema.type === "string", `Parameter «settings.schema[${propId}].type» which is type of «typeof ${propId}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/structure').control.onValidate»`);
        assertion(NwtResource.isDefined(propSchema.type), `Parameter «settings.schema[${propId}].type» which is «${propSchema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/structure').control.onValidate»`);
        const propValidation = NwtResource.for(propSchema.type).api.control.validation.validateValue(propValue, propSchema, component, indexes.concat([propId]), assertion);
        if (propValidation.error) {
          errors.push(propValidation.data);
        } else if (isRoot && typeof propValidation.discriminator === "number") {
          // Si (es válido y) es root y tiene discriminador adjunto:
          discriminators[propId] = propValidation.discriminator;
        }
      }
      if (errors.length) {
        throw NwtErrorUtils.unifyErrors(errors);
      }
      return isRoot ? discriminators : true;
    }
  },
  view: {
    name: "NwtControlForStructure",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_structure">
          <pre>Structure = {{ $nwt.Utils.filterObjectProperties(settings, (k,v) => !["schema","type","pointer"].includes(k)) }}</pre>
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
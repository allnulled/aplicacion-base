NwtResource.define({
  id: "control/for/structure",
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
        } else if (isRoot && typeof propValidation.data === "number") {
          // Si (es válido y) es root y tiene discriminador adjunto:
          discriminators[propId] = propValidation.data;
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
          <div>
              <nwt-control-partial-for-statement :control="this">
                  <div class="flex_1 pad_left_1">
                      <button class="mini"
                          :class="{active:isShowingControl}"
                          v-on:click="toggleControl"
                          data-rabbit="2">🔶</button>
                  </div>
              </nwt-control-partial-for-statement>
          </div>
          <div class="pad_top_1"
              v-show="isShowingControl">
              <div class="structure_box"
                  v-if="isWellFormed">
                  <div class=""
                      v-for="subschema, subschemaId, subschemaCounter in settings.schema"
                      v-bind:key="'property_' + subschemaId">
                      <div class="items_separator"
                          v-if="subschemaCounter !== 0"
                          style="padding-top:2px;"></div>
                      <component :is="$nwt.Resource.fromResourceIdToVueComponentId(subschema.type)"
                          :settings="{
                              ...settings.schema[subschemaId],
                              initialValue: value[subschemaId],
                              hasStructurekey: subschemaId
                          }" />
                  </div>
              </div>
          </div>
          <nwt-control-partial-for-error-handler :control="this" />
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
      // @COMPILED-BY: control/for/structure
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
      // @COMPILED-BY: control/for/structure
      (function() {
        trace("NwtControlForList.mounted");
        this.$options.statically.api.control.validation.validateControlSchema(this.settings);
        this.$options.statically.api.control.validation.validateValue(this.getValue(), this.settings, this);
        this.isWellFormed = true;
      }).call(this);
    },
  }
});
NwtResource.define({
  id: "control/for/list",
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
    "primitiveType": "list",
    "onValidate": function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(Array.isArray(value), `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be array not only object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings.schema.type === "string", `Parameter «settings.schema.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(NwtResource.isDefined(settings.schema.type), `Parameter «settings.schema.type» which is «${settings.schema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/list').control.onValidate»`);
      const resource = NwtResource.for(settings.schema.type);
      const errors = [];
      const isRoot = indexes.length === 0;
      const discriminators = [];
      for (let index = 0; index < value.length; index++) {
        const subvalue = value[index];
        const validation = resource.api.control.validation.validateValue(subvalue, settings.schema, component, indexes.concat([index]), assertion);
        if (validation.error === true) {
          errors.push(validation.data);
        } else if (isRoot && validation.discriminator) {
          discriminators[propId] = discriminator;
        }
      }
      if (errors.length) {
        throw NwtErrorUtils.unifyErrors(errors);
      }
      return isRoot ? discriminators : true;
    }
  },
  view: {
    name: "NwtControlForList",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_for_list">
          <div class="flex_row">
              <div class="flex_100">
                  <nwt-control-partial-for-statement :control="this">
                      <template>
                          <!--div class="flex_1 pad_left_1">
                              <button class="mini height_100"
                                  :class="{}">🟣 Iba a poner algo aquí pero no recuerdo</button>
                          </div-->
                          <div class="flex_1 pad_left_1">
                              <button class="mini height_100"
                                  :class="{active:isShowingControl}"
                                  v-on:click="toggleControl"
                                  data-rabbit="1">🔶</button>
                          </div>
                      </template>
                  </nwt-control-partial-for-statement>
              </div>
              <div class="flex_1 pad_left_1">
                  <nwt-control-partial-for-list-panel :control="this" />
              </div>
          </div>
          <div v-show="isShowingControl">
              <div class="pad_bottom_1">
                  <nwt-control-partial-for-error-handler :control="this" />
              </div>
              <div class="list">
                  <template v-if="isWellFormed">
                      <div class="padj_top_1"
                          v-for="item, itemIndex in value"
                          v-bind:key="'list_item_' + (item?.uuid || itemIndex)">
                          <div class="flex_row">
                              <div class="flex_1 hpill_start pad_horizontal_1 index_cell">
                                  <div class="flex_row centered height_100">
                                      <div class="flex_100">
                                          {{ itemIndex }}
                                      </div>
                                  </div>
                              </div>
                              <div class="flex_100 hpill_center">
                                  <component :is="$nwt.Resource.fromResourceIdToVueComponentId(settings.schema.type)"
                                      :settings="{
                                      ...settings.schema,
                                      initialValue: value[itemIndex]
                                  }" />
                              </div>
                              <div class="flex_1">
                                  <button class="mini height_100 hpill_end"
                                      v-on:click="() => removeItem(itemIndex)">❌</button>
                              </div>
                          </div>
                      </div>
                  </template>
              </div>
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
      // @COMPILED-BY: control/for/list
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
      },
      "createItem": function() {
        trace("NwtControlForList.methods.createItem");
        const item = this.settings.onCreateItem ? this.settings.onCreateItem(this) : {
          uuid: NwtRandomizer.fromAlphabet(20)
        };
        this.value.push(item);
      },
      "removeItem": function(pos) {
        trace("NwtControlForList.methods.removeIndex");
        this.value.splice(pos, 1);
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
      // @COMPILED-BY: control/for/list
      (function() {
        trace("NwtControlForList.mounted");
        this.$options.statically.api.control.validation.validateControlSchema(this.settings);
        this.$options.statically.api.control.validation.validateValue(this.getValue(), this.settings, this);
        this.isWellFormed = true;
        window.ll = this;
      }).call(this);
    },
  }
});
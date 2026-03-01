NwtResource.define({
  id: "control/for/list",
  apis: ["control", "view", "validation"],
  inherits: ["control/trait/for/showable", "control/trait/for/toolkit", "control/trait/for/remoteValue", "control/trait/for/remoteSchema", "control/trait/for/settings", "control/trait/for/validate"],
  traits: {},
  settingsSpec: {
    "isShowingControl": {
      "type": Boolean,
      "default": false
    },
    "rootValueIndex": {
      "type": Array,
      "required": true
    },
    "rootSchemaIndex": {
      "type": Array,
      "required": true
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
  subtypeOf: "list",
  compileView: true,
  control: {
    "onValidate": function(...args) {
      trace("@compilable/control/for/text.control.onValidate");
      return NwtStatic.api.control.validation.onValidateForList(...args);
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
          <!--Nwt control for list {{ $nwt.Reflection.keys(settings) }}-->
          <nwt-control-partial-for-statement :control="this">
              <template v-slot:hideable>
                  <slot name="hideable"></slot>
                  <nwt-control-partial-for-list-panel :control="$local.self" />
              </template>
              <slot></slot>
          </nwt-control-partial-for-statement>
          <div v-if="isShowingControl">
              <nwt-control-partial-for-pagination-panel :control="this" />
              <div class="pagination_result_container pad_left_1">
                  <div class="pagination_result">
                      <div v-if="$local.paginatedList && $local.paginatedList.length">
                          <div class="item"
                              v-for="row, rowIndex in $local.paginatedList"
                              v-bind:key="'paginated_row_' + (settings.hasStatementForItemByProperty && row.item[settings.hasStatementForItemByProperty] ? row.item[settings.hasStatementForItemByProperty] : row.index ? row.index : rowIndex)">
                              <component :is="$toolkit.getComponentNameBySettings(settings.schema)"
                                  :ref="component => { if(component === null) { delete $local.controls[rowIndex]; } else { $local.controls[rowIndex] = component; } }"
                                  :settings="{
                                      ...settings.schema,
                                      // isShowingControl: false,
                                      hasStatement: settings.hasStatementForItemByProperty ? row.item[settings.hasStatementForItemByProperty] : 'Ítem ' + (row.index + 1),
                                      rootValueIndex: $toolkit.getIndexForValue().concat([row.index]),
                                      rootSchemaIndex: $toolkit.getIndexForSchema().concat(['schema']),
                                  }">
                                  <template v-slot:onright>
                                      <div class="flex_1">
                                          <button class="mini fluid" v-on:click="() => removeItem(rowIndex)">❌</button>
                                      </div>
                                  </template>
                              </component>
                          </div>
                      </div>
                      <div v-else class="pad_1">
                          <span>No se encontraron resultados</span><span v-if="totalPages !== 0"> para página {{ currentPage + 1 }} de {{
                              totalPages }}</span>.
                      </div>
                  </div>
              </div>
              <nwt-control-partial-for-pagination-panel :control="this" />
          </div>
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
      // @COMPILED-BY: control/trait/for/validate
      Object.assign(finalData, (function() {
        trace("@compilable/control/trait/for/validate.data");
        return {
          validationError: false,
        };
      }).call(this));
      // @COMPILED-BY: control/for/list
      Object.assign(finalData, (function() {
        return {
          currentPage: 0,
          maximumItems: 10,
          totalPages: 0,
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
      "validateControlSchema": function() {
        trace("@compilable/control/trait/for/validate.methods.validateControlSchema");
        return NwtStatic.api.control.validation.validateControlSchema(this.settings, []);
      },
      "validateControlValue": function() {
        trace("@compilable/control/trait/for/validate.methods.validateControlValue");
        const value = this.getValueBySchema();
        this.validationError = false;
        return NwtStatic.api.control.validation.validateControlValue(value, this.settings, this);
      },
      "setError": function(error) {
        trace("@compilable/control/trait/for/validate.methods.setError");
        this.validationError = error;
      },
      "getValueByDom": function() {
        trace("NwtControlForList.methods.getValueByDom");
        // @TODO: tomar el valor de los controles interiores para devolver el propio
        trace("NwtControlForList.methods.getValueByDom");
        const currentControls = this.$local.controls;
        const state = {};
        for (let prop in currentControls) {
          const control = currentControls[prop];
          const value = control.getValueByDom();
          state[prop] = value;
        }
        return state;
      },
      "goToFirst": function() {
        trace("NwtControlForList.methods.goToFirst");
        this.currentPage = 0;
        this.digestSearch();
      },
      "goToPrevious": function() {
        trace("NwtControlForList.methods.goToPrevious");
        if (this.currentPage <= 0) return;
        this.currentPage--;
        this.digestSearch();
      },
      "goToNext": function() {
        trace("NwtControlForList.methods.goToNext");
        this.updateTotalPages();
        if (this.currentPage >= this.totalPages) return;
        this.currentPage++;
        this.digestSearch();
      },
      "goToLast": function() {
        trace("NwtControlForList.methods.goToLast");
        this.updateTotalPages();
        this.currentPage = (this.totalPages || 1) - 1;
        this.digestSearch();
      },
      "updateTotalPages": function() {
        trace("NwtControlForList.methods.updateTotalPages");
        this.totalPages = Math.ceil(this.getValueBySchema().length / this.maximumItems);
      },
      "generateDefaultItem": function() {
        trace("NwtControlForList.methods.generateDefaultItem");
        if (typeof this.settings.hasItemConstructor !== "undefined") {
          if (typeof this.settings.hasItemConstructor === "function") {
            return this.settings.hasItemConstructor.call(this, this);
          } else if (typeof this.settings.hasItemConstructor === "object") {
            return Object.assign({}, this.settings.hasItemConstructor);
          } else {
            return this.settings.hasItemConstructor;
          }
        }
        return {};
      },
      "appendItem": function() {
        trace("NwtControlForList.methods.appendItem");
        const valueIndex = this.getIndexForValue();
        const insertedItem = this.generateDefaultItem();
        this.$toolkit.getRoot().$store.push(valueIndex, insertedItem);
        this.goToLast();
      },
      "removeItem": function(positionInPage) {
        trace("NwtControlForList.methods.removeItem");
        const valueIndex = this.getIndexForValue();
        const positionOfFirstInPage = this.maximumItems * this.currentPage;
        this.$toolkit.getRoot().$store.splice(valueIndex, positionOfFirstInPage + positionInPage);
        this.digestSearch();
      },
      "digestSearch": function() {
        trace("NwtControlForList.methods.digestSearch");
        const listBrute = this.getValueBySchema();
        const list = Array.isArray(listBrute) ? listBrute : [];
        this.totalPages = Math.ceil(list.length / this.maximumItems);
        const currentItem = this.maximumItems * this.currentPage;
        const paginatedList = [];
        for (let index = currentItem; index < (currentItem + this.maximumItems); index++) {
          const item = list[index];
          if (!item) continue;
          paginatedList.push({
            index,
            item
          });
        }
        this.$local.paginatedList = paginatedList;
        this.$forceUpdate(true);
      },
      "onValidate": function() {
        trace("NwtControlForList.methods.onValidate");
        console.log("Validate at component-level on control/for/list");
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/trait/for/toolkit
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
      // @COMPILED-BY: control/for/list
      trace("NwtControlForList.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
      this.$local.self = this;
      this.$local.paginatedList = [];
    },
    mounted: function() {
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
      // @COMPILED-BY: control/for/list
      trace("NwtControlForList.mounted");
      window.ll = this;
      this.digestSearch();
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
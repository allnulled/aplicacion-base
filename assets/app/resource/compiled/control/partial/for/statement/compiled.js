NwtResource.define({
  id: "control/partial/for/statement",
  apis: ["control", "view", "validation"],
  inherits: [],
  traits: {},
  compileView: true,
  view: {
    name: "NwtControlPartialForStatement",
    props: {
      "control": {
        "type": Vue,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_partial_for_statement">
          <div class="statement_box pad_top_1 pad_bottom_1"
              v-if="$local && $local.statement">
              <div class="flex_row">
                  <div class="flex_100 align_self_center">
                      <span class="statement_text"> 🔸 {{ $local.statement }}</span>
                      <span class="type_text">
                          <span class="control_type_badge">{{ control.$toolkit.adaptTypeNameToUser() }}</span>
                      </span>
                      <span class="description_text"
                          v-if="control.isShowingControl && isShowingDescription">
                          <span class="description_icon"> ℹ️ </span>
                          <span>{{ $local.description }}</span>
                      </span>
                  </div>
                  <slot></slot>
                  <template v-if="control.isShowingControl">
                      <div class="flex_1 pad_left_1"
                          v-if="$local.description">
                          <button class="mini fluid description_icon"
                              :class="{ active: isShowingDescription }"
                              v-on:click="toggleDescription">ℹ️</button>
                      </div>
                      <div class="flex_1 pad_left_1">
                          <button class="mini fluid"
                              v-on:click="loadValue">♻️</button>
                      </div>
                      <div class="flex_1 pad_left_1">
                          <button class="mini fluid"
                              v-on:click="saveValue">💾</button>
                      </div>
                      <div class="flex_1 pad_left_1">
                          <button class="mini fluid"
                              v-on:click="validateValue">💡</button>
                      </div>
                  </template>
                  <div class="flex_1 pad_left_1">
                      <button class="mini fluid"
                          :class="{active:!control.isShowingControl}"
                          v-on:click="toggleControl">🔶</button>
                  </div>
              </div>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/partial/for/statement
      Object.assign(finalData, (function() {
        return {
          isShowingDescription: false,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "toggleDescription": function() {
        trace("NwtControlPartialForStatement.methods.toggleDescription");
        this.isShowingDescription = !this.isShowingDescription;
      },
      "saveValue": function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        const control = this.control;
        const value = control.getValueByState();
        const indexes = control.getIndexForValue();
        control.$toolkit.getRoot().$store.set(indexes, value);
      },
      "loadValue": function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        const control = this.control;
        const value = control.getValueByIndex();
        control.setValueByState(value);
      },
      "validateValue": function() {
        trace("NwtControlPartialForStatement.methods.validateValue");
        // @TODO: validar el valor sin saber de qué tipo es
      },
      "toggleControl": function() {
        trace("NwtControlPartialForStatement.methods.toggleControl");
        this.control.toggleControl();
        this.control.$forceUpdate(true);
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: control/partial/for/statement
      this.$local = {};
    },
    mounted: function() {
      // @COMPILED-BY: control/partial/for/statement
      this.$local.statement = this.control.settings.hasStatement || this.control.settings.rootValueIndex?.concat([]).pop()
      this.$local.description = this.control.settings.hasDescription;
      this.$forceUpdate(true);
    },
  }
});
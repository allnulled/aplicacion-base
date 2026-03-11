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
          <div class="statement_box"
              v-if="$local && $local.statement">
              <div class="flex_row selectable_row"
                  :class="{active:control.isShowingControl}">
                  <div class="selectable_row_statement mini fluid text_align_left flex_100 cursor_pointer" v-on:click="toggleControl">
                      <span class="statement_text">
                          <span class="mini fluid">
                              {{ control.isShowingControl ? '🔶' : '🔸' }}
                          </span>
                          <span v-if="!control.isShowingControl">{{ $local.statement }}</span>
                          <span v-else
                              class="text_decoration_underline">{{ $local.statement }}</span>
                          <span class="type_text">
                              <span class="control_type_badge">{{ minimizeType(control.$options.statically.id) }}</span>
                          </span>
                      </span>
                      <span class="description_text"
                          v-if="control.isShowingControl && isShowingDescription">
                          <span class="description_icon"> ℹ️ </span>
                          <span>{{ $local.description }}</span>
                      </span>
                  </div>
                  <div class="flex_1"
                      v-on:click.stop="$nwt.Utils.noop">
                      <div class="flex_row centered">
                          <slot></slot>
                          <template v-if="control.isShowingControl">
                              <slot name="hideable"></slot>
                              <div class="flex_1"
                                  v-if="$local.description">
                                  <button class="mini fluid description_icon"
                                      :class="{ active: isShowingDescription }"
                                      v-on:click="toggleDescription">ℹ️</button>
                              </div>
                              <template v-if="!['list','option','structure'].includes(control.$options.statically.subtypeOf)">
                                  <div class="flex_1">
                                      <button class="mini fluid cursor_pointer"
                                          v-on:click="loadValue"
                                          data-btn1="🟢↩️">♻️</button>
                                  </div>
                                  <div class="flex_1">
                                      <button class="mini fluid cursor_pointer"
                                          v-on:click="saveValue"
                                          data-btn2="🔵🆗">💾</button>
                                  </div>
                              </template>
                              <div class="flex_1">
                                  <button class="mini fluid cursor_pointer"
                                      v-on:click="validateValue"
                                      data-btn3="🟡✅">💡</button>
                              </div>
                          </template>
                          <slot name="onright"></slot>
                      </div>
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
        return this.control.saveValue();
      },
      "loadValue": function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        return this.control.loadValue();
      },
      "validateValue": function() {
        trace("NwtControlPartialForStatement.methods.validateValue");
        return this.control.validateSelfValue();
      },
      "toggleControl": function() {
        trace("NwtControlPartialForStatement.methods.toggleControl");
        this.control.toggleControl();
        this.control.$forceUpdate(true);
      },
      "minimizeType": function(typeText) {
        trace("NwtControlPartialForStatement.methods.minimizeType");
        return typeText.replace("control/for/type/", "").replace("control/for/", "");
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
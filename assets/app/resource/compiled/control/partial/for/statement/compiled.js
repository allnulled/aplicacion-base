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
          <div class="pad_bottom_1" v-if="control.settings.hasHeader">
              <nwt-source-viewer :source="control.settings.hasHeader" />
          </div>
          <div class="statement_box" v-if="control.settings.hasStatement || control.settings.hasDescription">
              <div class="flex_row">
                  <div class="flex_100 align_self_center">
                      <span class="statement_text"> 🔸 {{ control.settings.hasStatement }}</span>
                      <span class="description_text" v-if="isShowingDescription">
                          <span class="description_icon"> ℹ️ </span>
                          <span>{{ control.settings.hasDescription }}</span>
                      </span>
                  </div>
                  <slot></slot>
                  <div class="flex_1 pad_left_1" v-if="control.settings.hasDescription">
                      <button class="mini description_icon"
                          :class="{ active: isShowingDescription }"
                          v-on:click="toggleDescription">ℹ️</button>
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
      }
    },
    computed: {},
    watch: {},
  }
});
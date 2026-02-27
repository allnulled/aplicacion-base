NwtResource.define({
  id: "control/partial/for/pagination-panel",
  apis: ["control", "view", "validation"],
  inherits: [],
  traits: {},
  compileView: true,
  view: {
    name: "NwtControlPartialForPaginationPanel",
    props: {
      "control": {
        "type": Vue,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_partial_for_pagination_panel flex_row">
          <div class="flex_1">
              <button class="mini fluid pagination_button" v-on:click="control.goToFirst" :disabled="(!control.totalPages) || control.currentPage === 0"> ⏪</button>
          </div>
          <div class="flex_1">
              <button class="mini fluid pagination_button" v-on:click="control.goToPrevious" :disabled="(!control.totalPages) || control.currentPage === 0"> ◀️</button>
          </div>
          <div class="flex_100 text_align_center font_size_small">
              <template v-if="control.totalPages">
                  <span>Página {{ control.currentPage + 1 }}/{{ control.totalPages }}</span>
                  <button v-if="!isSelectingPage" class="mini fluid" v-on:click="activateSelectingPage">📍</button>
                  <input v-else type="text" class="mini fluid page_selector_box" v-on:keypress.enter="selectPage" ref="manuallySelectedPageBox" :value="control.currentPage+1" v-on:blur="deactivateSelectingPage" v-focus="selectAllTextFromBox" />
              </template>
          </div>
          <div class="flex_1">
              <button class="mini fluid pagination_button" v-on:click="control.goToNext" :disabled="(!control.totalPages) || control.currentPage === (control.totalPages-1)"> ▶️ </button>
          </div>
          <div class="flex_1">
              <button class="mini fluid pagination_button" v-on:click="control.goToLast" :disabled="(!control.totalPages) || control.currentPage === (control.totalPages-1)"> ⏩ </button>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/partial/for/pagination-panel
      Object.assign(finalData, (function() {
        trace("NwtControlPartialForPaginationPanel.data");
        return {
          isSelectingPage: false,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "selectPage": function() {
        trace("NwtControlPartialForPaginationPanel.methods.selectPage");
        Make_search: {
          const selectedPage = parseInt(this.$refs.manuallySelectedPageBox.value);
          if (Number.isNaN(selectedPage)) {
            break Make_search;
          }
          this.control.currentPage = selectedPage - 1;
          this.control.digestSearch();
        }
        this.isSelectingPage = false;
      },
      "activateSelectingPage": function() {
        trace("NwtControlPartialForPaginationPanel.methods.activateSelectingPage");
        this.isSelectingPage = true;
      },
      "deactivateSelectingPage": function() {
        trace("NwtControlPartialForPaginationPanel.methods.deactivateSelectingPage");
        this.isSelectingPage = false;
      },
      "selectAllTextFromBox": function(el) {
        trace("NwtControlPartialForPaginationPanel.methods.selectAllTextFromBox");
        el.selectionStart = 0;
        el.selectionEnd = el.value.length;
      }
    },
    computed: {},
    watch: {},
  }
});
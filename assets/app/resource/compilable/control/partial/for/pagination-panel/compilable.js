module.exports = {
  id: "control/partial/for/pagination-panel",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [],
  settingsSpec: {},
  view: {
    name: "NwtControlPartialForPaginationPanel",
    template: $template,
    props: {
      control: {
        type: LowCode.create("Vue"),
        required: true,
      }
    },
    data: function () {
      trace("NwtControlPartialForPaginationPanel.data");
      return {
        isSelectingPage: false,
        isSelectingItemsPerPage: false,
      };
    },
    methods: {
      selectPage: function () {
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
      selectItemsPerPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.selectItemsPerPage");
        Make_search: {
          const selectedItemsPerPage = parseInt(this.$refs.manuallySelectedItemsPerPageBox.value);
          if (Number.isNaN(selectedItemsPerPage)) {
            break Make_search;
          }
          this.control.currentItemsPerPage = selectedItemsPerPage;
          this.control.digestSearch();
        }
        this.isSelectingItemsPerPage = false;
      },
      activateSelectingPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.activateSelectingPage");
        this.isSelectingPage = true;
      },
      deactivateSelectingPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.deactivateSelectingPage");
        this.isSelectingPage = false;
      },
      activateSelectingItemsPerPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.activateSelectingItemsPerPage");
        this.isSelectingItemsPerPage = true;
      },
      deactivateSelectingItemsPerPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.deactivateSelectingItemsPerPage");
        this.isSelectingItemsPerPage = false;
      },
      selectAllTextFromBox: function (el) {
        trace("NwtControlPartialForPaginationPanel.methods.selectAllTextFromBox");
        el.selectionStart = 0;
        el.selectionEnd = el.value.length;
      },
    },
    mounted: function() {
      trace("NwtControlPartialForPaginationPanel.mounted");
      this.control.currentItemsPerPage = this.control.settings.hasPredefinedItemsPerPage || this.control.$options.statically.control?.hasPredefinedItemsPerPage || 10;
    }
  },
};
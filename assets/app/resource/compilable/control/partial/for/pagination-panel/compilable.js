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
      activateSelectingPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.activateSelectingPage");
        this.isSelectingPage = true;
      },
      deactivateSelectingPage: function () {
        trace("NwtControlPartialForPaginationPanel.methods.deactivateSelectingPage");
        this.isSelectingPage = false;
      },
      selectAllTextFromBox: function (el) {
        trace("NwtControlPartialForPaginationPanel.methods.selectAllTextFromBox");
        el.selectionStart = 0;
        el.selectionEnd = el.value.length;
      }
    },
  },
};
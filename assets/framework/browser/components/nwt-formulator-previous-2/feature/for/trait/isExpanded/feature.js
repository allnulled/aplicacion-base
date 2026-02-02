return {
  abstraction: {
    name: "feature/for/control/trait/isExpanded",
    inherits: [],
    settings: {},
  },
  view: {
    data() {
      trace("trait/isExpanded.data");
      return {
        isExpanded: false,
      };
    },
    methods: {
      toggleExpansion() {
        trace("trait/isExpanded.methods.toggleExpansion");
        this.isExpanded = !this.isExpanded;
      },
      showExpansion() {
        trace("trait/isExpanded.methods.showExpansion");
        this.isExpanded = true;
      },
      hideExpansion() {
        trace("trait/isExpanded.methods.hideExpansion");
        this.isExpanded = false;
      }
    }
  }
};
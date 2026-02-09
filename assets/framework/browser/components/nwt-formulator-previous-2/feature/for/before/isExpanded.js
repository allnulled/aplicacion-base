return {
  class: {
    name: "control/trait/isExpanded",
    definition: {}
  },
  inherits: [],
  settings: {},
  data() {
    trace("control/trait/isExpanded.data");
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpansion() {
      trace("control/trait/isExpanded.methods.toggleExpansion");
      this.isExpanded = !this.isExpanded;
    },
    showExpansion() {
      trace("control/trait/isExpanded.methods.showExpansion");
      this.isExpanded = true;
    },
    hideExpansion() {
      trace("control/trait/isExpanded.methods.hideExpansion");
      this.isExpanded = false;
    }
  }
};
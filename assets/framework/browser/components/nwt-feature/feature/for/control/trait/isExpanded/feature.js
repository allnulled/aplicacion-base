return {
  statics: {
    id: "feature/for/control/trait/isExpanded",
    inherits: [],
    settings: {
      $once: {
        isExpanded: [Boolean, true],
      }
    },
  },
  data() {
    trace("trait/isExpanded.data");
    return {
      isExpanded: this.settings.isExpanded,
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
};
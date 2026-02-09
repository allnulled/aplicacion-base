return {
  statics: {
    id: "feature/for/control/trait/hasPlaceholder",
    settings: {
      $once: {
        hasPlaceholder: [String, ""],
      }
    },
  },
  data() {
    trace("feature/for/control/trait/hasPlaceholder.data");
    return {
      hasPlaceholder: this.settings.hasPlaceholder,
    };
  }
};
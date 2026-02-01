return {
  statics: {
    id: "feature/for/trait/hasPlaceholder",
    settings: {
      $once: {
        hasPlaceholder: [String, ""],
      }
    },
  },
  data() {
    trace("feature/for/trait/hasPlaceholder.data");
    return {
      hasPlaceholder: this.settings.hasPlaceholder,
    };
  }
};
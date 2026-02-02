return {
  statics: {
    id: "feature/for/control/trait/hasStatement",
    settings: {
      $once: {
        hasStatement: [String, ""],
      }
    },
  },
  data() {
    trace("trait/hasStatement.data");
    return {
      hasStatement: this.settings.hasStatement,
    };
  },
};
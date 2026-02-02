return {
  abstraction: {
    name: "feature/for/control/trait/hasStatement",
    settings: {
      hasStatement: [String, ""],
    },
  },
  view: {
    data() {
      trace("trait/hasStatement.data");
      return {
        hasStatement: this.settings.hasStatement,
      };
    },
  },
};
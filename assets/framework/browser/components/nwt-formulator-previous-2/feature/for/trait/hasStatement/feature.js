return {
  abstraction: {
    name: "feature/for/trait/hasStatement",
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
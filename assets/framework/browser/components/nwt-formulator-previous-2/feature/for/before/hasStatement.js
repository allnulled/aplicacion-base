return {
  class: {
    name: "control/trait/hasStatement",
  },
  settings: {
    hasStatement: [String, ""],
  },
  data() {
    trace("control/trait/hasStatement.data");
    return {
      hasStatement: this.settings.hasStatement,
    };
  },
};
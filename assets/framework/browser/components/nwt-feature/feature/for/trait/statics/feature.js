return {
  statics: {
    id: "feature/for/trait/statics",
    inherits: [],
  },
  created() {
    trace("feature/for/trait/statics.created");
    NwtFeatureStatics;
  }
};
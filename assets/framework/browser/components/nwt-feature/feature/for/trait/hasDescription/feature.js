return {
  statics: {
    id: "feature/for/trait/hasDescription",
    settings: {
      $once: {
        hasDescription: [String, ""],
      }
    },
  },
  data() {
    trace("feature/for/trait/hasDescription.data");
    return {
      hasDescription: this.settings.hasDescription,
      isShowingDescription: this.settings.isShowingDescription || false,
    };
  },
  methods: {
    toggleDescription() {
      trace("feature/for/trait/hasDescription.methods.toggleDescription");
      this.isShowingDescription = !this.isShowingDescription;
    },
    showDescription() {
      trace("feature/for/trait/hasDescription.methods.showDescription");
      this.isShowingDescription = true;
    },
    hideDescription() {
      trace("feature/for/trait/hasDescription.methods.hideDescription");
      this.isShowingDescription = false;
    }
  },
  watch: {

  }
};
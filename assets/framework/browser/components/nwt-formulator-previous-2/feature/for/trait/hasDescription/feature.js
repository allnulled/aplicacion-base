return {
  abstraction: {
    name: "feature/for/control/trait/hasDescription",
    settings: {
      hasDescription: [String, ""],
    },
  },
  view: {
    data() {
      trace("feature/for/control/trait/hasDescription.data");
      return {
        hasDescription: this.settings.hasDescription,
        isShowingDescription: this.settings.isShowingDescription || false,
      };
    },
    methods: {
      toggleDescription() {
        trace("feature/for/control/trait/hasDescription.methods.toggleDescription");
        this.isShowingDescription = !this.isShowingDescription;
      },
      showDescription() {
        trace("feature/for/control/trait/hasDescription.methods.showDescription");
        this.isShowingDescription = true;
      },
      hideDescription() {
        trace("feature/for/control/trait/hasDescription.methods.hideDescription");
        this.isShowingDescription = false;
      }
    },
    watch: {

    }
  }
};
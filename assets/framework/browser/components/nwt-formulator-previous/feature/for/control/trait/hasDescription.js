return {
  class: {
    name: "control/trait/hasDescription",
  },
  settings: {
    hasDescription: [String, ""],
  },
  data() {
    trace("control/trait/hasDescription.data");
    return {
      hasDescription: this.settings.hasDescription,
      isShowingDescription: this.settings.isShowingDescription || false,
    };
  },
  methods: {
    toggleDescription() {
      this.isShowingDescription = !this.isShowingDescription;
    },
    showDescription() {
      this.isShowingDescription = true;
    },
    hideDescription() {
      this.isShowingDescription = false;
    }
  },
  watch: {
    
  }
};
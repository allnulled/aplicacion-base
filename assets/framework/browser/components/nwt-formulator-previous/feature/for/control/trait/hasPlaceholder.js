return {
  class: {
    name: "control/trait/hasPlaceholder",
  },
  settings: {
    hasPlaceholder: [String, ""],
  },
  data() {
    trace("control/trait/hasPlaceholder.data");
    return {
      hasPlaceholder: this.settings.hasPlaceholder,
    };
  },
  methods: {
    
  },
  watch: {
    
  }
};
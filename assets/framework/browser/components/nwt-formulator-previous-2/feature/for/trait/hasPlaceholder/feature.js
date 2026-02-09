return {
  abstraction: {
    name: "control/trait/hasPlaceholder",
    settings: {
      hasPlaceholder: [String, ""],
    },
  },
  view: {
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
  }
};
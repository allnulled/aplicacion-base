return {
  statics: {
    id: "feature/for/control/trait/isShown",
    inherits: [],
    settings: {
      $once: {
        isShown: [Boolean, true],
      }
    },
  },
  data() {
    trace("trait/isShown.data");
    return {
      isShown: false,
    };
  },
  methods: {
    reloadShown() {
      trace("trait/isShown.methods.reloadShown");
      this.isShown = false;
      this.$nextTick(() => {
        this.isShown = true;
      });
    },
    toggleShown() {
      trace("trait/isShown.methods.toggleShown");
      this.isShown = !this.isShown;
    },
    activateShown() {
      trace("trait/isShown.methods.activateShown");
      this.isShown = true;
    },
    deactivateShown() {
      trace("trait/isShown.methods.deactivateShown");
      this.isShown = false;
    }
  },
  mounted() {
    trace("trait/isShown.mounted");
    this.isShown = this.settings.isShown;
  }
};
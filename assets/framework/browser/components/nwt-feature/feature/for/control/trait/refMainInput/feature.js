return {
  statics: {
    id: "feature/for/control/trait/refMainInput",
    inherits: [],
  },
  methods: {
    focusMainInputDelayed() {
      trace("feature/for/control/trait/refMainInput.methods.focusMainInputDelayed");
      this.$nextTick(() => {
        this.$refs.mainInput?.focus();
      });
    }
  },
};
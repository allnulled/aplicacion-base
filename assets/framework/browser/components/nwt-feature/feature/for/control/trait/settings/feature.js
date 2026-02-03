return {
  statics: {
    id: "feature/for/control/trait/settings",
    settings: {},
  },
  props: {
    settings: {
      type: Object,
      required: true,
    }
  },
  created() {
    NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statics.settings || {});
  },
};
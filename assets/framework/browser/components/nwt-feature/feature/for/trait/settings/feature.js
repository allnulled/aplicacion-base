return {
  statics: {
    id: "feature/for/trait/settings",
    settings: {},
  },
  props: {
    settings: {
      type: Object,
      required: true,
    }
  },
  created() {
    NwtUtils.initializePropertiesOf(this.settings, this.$options.statics.settings || {});
  },
};
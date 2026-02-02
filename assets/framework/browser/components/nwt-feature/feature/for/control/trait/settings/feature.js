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
    NwtUtils.initializePropertiesOf(this.settings, this.$options.statics.settings || {});
  },
};
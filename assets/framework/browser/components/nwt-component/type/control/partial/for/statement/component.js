return await NwtFeatureMixer.component({
  name: "NwtControlPartialForStatement",
  statics: {
    id: "@control/partial/for/statement",
    inherits: [],
    traits: {},
  },
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    }
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    reloadShown() {
      trace("NwtControlPartialForStatement.methods.reloadShown");
      this.isShown = false;
      this.$nextTick(() => {
        this.isShown = true;
      });
    }
  },
  created() {},
  mounted() {
    trace("NwtControlPartialForStatement.mounted");
    this.isShown = true;
    this.control.$on("validation-error", this.reloadShown);
  },
  beforeDestroy() {
    trace("NwtControlPartialForStatement.beforeDestroy");
    this.control.$off("validation-error", this.reloadShown);
  }
});
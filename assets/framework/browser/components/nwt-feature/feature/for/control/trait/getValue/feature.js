return {
  statics: {
    id: "feature/for/control/trait/getValue",
    settings: {
      $once: {
        initialValue: [[String, Number, Boolean, Object, Array, Function, undefined, null], ""],
        onFormat: [Function, NwtUtils.noopSelf],
        onChange: [Function, NwtUtils.noop],
      }
    },
  },
  data() {
    trace("feature/for/control/trait/getValue.data");
    return {
      value: this.settings.initialValue,
    };
  },
  methods: {
    getValue() {
      trace("feature/for/control/trait/getValue.methods.getValue");
      const obtained = this.value;
      const formatted = NwtUtils.opinionify(() => this.settings.onFormat(obtained, this), obtained);
      return formatted;
    },
    setValue(value) {
      trace("feature/for/control/trait/getValue.methods.setValue");
      this.value = value;
      return this.value;
    }
  },
  watch: {
    value(newValue, oldValue) {
      trace("feature/for/control/trait/getValue.watch.value");
      NwtUtils.trify(() => this.settings.onChange(newValue, oldValue, this));
    }
  },
  mounted() {
    trace("feature/for/control/trait/getValue.mounted");
    this.value = this.settings.initialValue;
  }
};
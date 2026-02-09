return {
  statics: {
    id: "feature/for/control/trait/getValue",
    settings: {
      $once: {
        initialValue: [[String, Number, Boolean, Object, Array, Function, undefined, null], ""],
        onFormat: [Function, NwtUtils.noop],
        onChange: [Function, NwtUtils.noop],
      }
    },
  },
  data() {
    trace("feature/for/control/trait/getValue.data");
    return {
      value: this.settings.initialValue,
      valueType: "control/text",
    };
  },
  methods: {
    getValue() {
      trace("feature/for/control/trait/getValue.methods.getValue");
      const formatted = this.settings.onFormat(this.value, this);
      return formatted;
    }
  },
  watch: {
    value(newValue, oldValue) {
      trace("feature/for/control/trait/getValue.watch.value");
      this.settings.onChange(newValue, oldValue, this);
    }
  }
};
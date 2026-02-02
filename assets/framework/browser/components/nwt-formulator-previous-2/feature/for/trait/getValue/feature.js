return {
  abstraction: {
    name: "feature/for/control/trait/getValue",
    settings: {
      initialValue: [[String,Number,Boolean,Object,Array,Function,undefined,null], ""],
      onFormat: [Function, NwtUtils.noop],
      onChange: [Function, NwtUtils.noop],
    },
  },
  view: {
    data() {
      return {
        value: this.settings.initialValue,
        valueType: "control/text",
      };
    },
    methods: {
      getValue() {
        const formatted = this.settings.onFormat(this.value, this);
        return formatted;
      }
    },
    watch: {
      value(newValue, oldValue) {
        this.settings.onChange(newValue, oldValue, this);
      }
    }
  }
};
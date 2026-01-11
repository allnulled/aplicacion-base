Vue.component("NwtFormControlPrototype", {
  name: "NwtFormControlPrototype",
  props: {
    initialValue: {
      type: [Boolean,Number,String,Array,Object,Function,undefined],
      default: () => "",
    },
    statement: {
      type: String,
      default: () => "",
    },
    extraInfo: {
      type: String,
      default: () => "",
    },
    isRequired: {
      type: Boolean,
      default: () => false,
    },
    onChange: {
      type: Function,
      default: function(event) {
        trace("NwtFormControlPrototype.props.onChange");
        return this.$emit("input", event);
      },
    },
    onFormat: {
      type: Function,
      default: value => value,
    },
    onValidate: {
      type: Function,
      default: () => NwtUtils.noop()
    },
  },
  data() {
    return {
      isControl: "prototype",
      isShowingExtraInfo: false,
      value: this.initialValue,
      validationErrors: [],
    };
  },
  methods: {
    toggleExtraInfo() {
      trace("NwtFormControlPrototype.methods.toggleExtraInfo");
      this.isShowingExtraInfo = !this.isShowingExtraInfo;
    },
    getValue() {
      trace("NwtFormControlPrototype.methods.getValue");
      const formattedValue = this.onFormat(this.value);
      return formattedValue;
    },
  }
});
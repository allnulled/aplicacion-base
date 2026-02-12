return {
  statics: {
    id: "feature/for/control/trait/getRootForm",
    settings: {
      $once: {
        parentControl: [[Vue, undefined], undefined],
        parentKey: [[String, Number, undefined], undefined],
        respectiveValue: [NwtPrototyper.type.AnyExcept([]), undefined],
      }
    },
  },
  data() {
    trace("feature/for/control/trait/getRootForm.data");
    return {
      self: this,
    };
  },
  methods: {
    getRootForm() {
      trace("feature/for/control/trait/getRootForm.methods.getRootForm");
      let parentControl = this;
      while(parentControl?.settings?.parentControl !== undefined) {
        parentControl = parentControl.settings.parentControl;
      }
      return parentControl;
    },
  },
  watch: {
    
  },
  mounted() {
    trace("feature/for/control/trait/getRootForm.mounted");
    if(typeof this.settings.respectiveValue !== "undefined") {
      this.value = this.settings.respectiveValue;
    }
  }
};
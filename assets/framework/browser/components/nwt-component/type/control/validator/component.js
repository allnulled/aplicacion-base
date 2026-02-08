Vue.component("NwtControlValidator", {
  name: "NwtControlValidator",
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    },
  },
  mixins: [],
  data() {
    return {
      isShowingValidationErrorDetailsOf: [],
    };
  },
  methods: {
    toggleValidationErrorDetailsOf(errorIndex) {
      trace("NwtControlValidator.methods.toggleDetails");
      const pos = this.isShowingValidationErrorDetailsOf.indexOf(errorIndex);
      if(pos === -1) {
        this.isShowingValidationErrorDetailsOf.push(errorIndex);
      } else {
        this.isShowingValidationErrorDetailsOf.splice(pos, 1);
      }
    }
  },
  created() {},
  mounted() {},
});
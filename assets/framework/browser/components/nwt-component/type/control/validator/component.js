return await NwtFeatureMixer.component({
  name: "NwtControlValidator",
  statics: {
    id: "@control/validator",
    inherits: [
      "@feature/for/control/trait/isShown",
    ]
  },
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
  created() {
    trace("NwtControlValidator.created");
    this.isShown = true;
    this.control.$on("validation-error", this.reloadShown);
  },
  mounted() {
    trace("NwtControlValidator.mounted");
    this.control.$off("validation-error", this.reloadShown);
  },
});
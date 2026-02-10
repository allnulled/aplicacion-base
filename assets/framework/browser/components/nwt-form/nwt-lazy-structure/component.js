Vue.component("NwtLazyStructure", {
  name: "NwtLazyStructure",
  template: $template,
  props: {
    controls: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      structure: false,
      loadingErrors: false,
    };
  },
  methods: {
    validateControls() {
      trace("NwtLazyStructure.methods.validateControls");
      assertion(typeof this.controls === "object", "Property «controls» must be object on «NwtLazyStructure.methods.validateControls»");
      assertion(typeof this.controls.type === "string", "Property «controls.type» must be string on «NwtLazyStructure.methods.validateControls»");
    },
  },
  created() {
    trace("NwtLazyStructure.created");
    return this.validateControls();
  },
  mounted() {
    trace("NwtLazyStructure.mounted");
    
  },
});
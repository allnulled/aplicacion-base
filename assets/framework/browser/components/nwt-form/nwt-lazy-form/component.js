Vue.component("NwtLazyForm", {
  name: "NwtLazyForm",
  template: $template,
  props: {
    controls: {
      type: Object,
      required: true,
    }
  },
  mixins: [Vue.options.components.NwtLazyStructure],
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {
    trace("NwtLazyForm.created");
    assertion(typeof this.controls === "object", "Property «controls» must be object on «NwtLazyForm.created»");
    assertion(typeof this.controls.type === "string", "Property «controls.type» must be string on «NwtLazyForm.created»");
  },
  mounted() {
    trace("NwtLazyForm.mounted");
    
  },
});
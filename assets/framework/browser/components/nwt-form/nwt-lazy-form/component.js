Vue.component("NwtLazyForm", {
  name: "NwtLazyForm",
  template: $template,
  props: {
    definition: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

    };
  },
  methods: {
    toggleAllSubcontrols() {
      trace("NwtLazyForm.methods.toggleAllSubcontrols");
    },
    validateForm() {
      trace("NwtLazyForm.methods.validateForm");
    },
    submitForm() {
      trace("NwtLazyForm.methods.submitForm");
    }
  },
  computed: {

  },
  created() {
    trace("NwtLazyForm.created");
    assertion(typeof this.definition === "object", "Property «definition» must be object on «NwtLazyForm.created»");
    assertion(typeof this.definition.type === "string", "Property «definition.type» must be string on «NwtLazyForm.created»");
    assertion(["@control/for/structure", "@control/for/list"].indexOf(this.definition.type) !== -1, "Property «definition.type» must be either «@control/for/structure» or «@control/for/list» on «NwtLazyForm.created»");
  },
  mounted() {
    trace("NwtLazyForm.mounted");
  },
});
Vue.component("NwtFormControlForTextEmail", {
  name: "NwtFormControlForTextEmail",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  data() {
    trace("NwtFormControlForTextEmail.data");
    return {
      isControl: "text/email",
    };
  },
  methods: {},
  created() {},
  mounted() {},
});
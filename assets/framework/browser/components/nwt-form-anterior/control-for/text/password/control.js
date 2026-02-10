Vue.component("NwtFormControlForTextPassword", {
  name: "NwtFormControlForTextPassword",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  data() {
    trace("NwtFormControlForTextPassword.data");
    return {
      isControl: "text/password"
    };
  },
  methods: {},
  created() {},
  mounted() {},
});
Vue.component("NwtFormControlStatement", {
  name: "NwtFormControlStatement",
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    }
  },
  mixins: [],
  data() {
    trace("NWtFormControlStatement.data");
    return {};
  },
  methods: {
    validateControl() {
      trace("NwtFormControlStatement.methods.validateControl");
      if(this.control.vformsControl) {
        return this.control.vformsControl.validate(false, false);
      } else {
        return this.control.validate();
      }
    }
  },
  created() {},
  mounted() {},
});
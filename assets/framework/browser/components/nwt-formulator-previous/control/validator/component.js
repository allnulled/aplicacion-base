Vue.component("NwtControlValidator", {
  name: "NwtControlValidator",
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    }
  },
  data: function () {
    trace("NwtControlValidator.data");
    return {
      errors: [],
    };
  },
  created() {
    this.control.control.validators.push(this);
  },
  methods: {
    addErrors(errors) {
      this.errors = this.errors.concat(errors);
    },
    clearErrors(errors) {
      this.errors = [];
    }
  },
});
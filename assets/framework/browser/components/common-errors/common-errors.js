Vue.component("CommonErrors", {
  name: "CommonErrors",
  template: $template,
  props: {},
  data() {
    trace("CommonErrors.data");
    return {
      manager: false,
    };
  },
  methods: {
    showError(...args) {
      trace("CommonErrors.methods.showError");
      return this.manager.showError(...args);
    },
    reload(...args) {
      trace("CommonErrors.methods.reload");
      return this.manager.reload(...args);
    },
    clearErrors(...args) {
      trace("CommonErrors.methods.clearErrors");
      return this.manager.clearErrors(...args);
    },
    clearError(...args) {
      trace("CommonErrors.methods.clearError");
      return this.manager.clearError(...args);
    }
  },
  created() {},
  async mounted() {
    trace("CommonErrors.mounted");
    this.manager = await NwtErrorsManager.create(this).initialize();
    
  },
});
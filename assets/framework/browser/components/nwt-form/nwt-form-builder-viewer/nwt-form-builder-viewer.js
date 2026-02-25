Vue.component("NwtFormBuilderViewer", {
  name: "NwtFormBuilderViewer",
  template: $template,
  props: {
    settings: {
      type: Object,
      required: true,
    }
  },
  mixins: [],
  methods: {
    getValue() {
      trace("NwtFormBuilderViewer.methods.getValue");
      return this.$refs.control.getValue();
    },
    accept() {
      trace("NwtFormBuilderViewer.methods.accept");
      if(typeof this.settings.onAccept === "function") {
        return this.settings.onAccept(this.getValue());
      }
      if(typeof this.settings.getDialog === "function") {
        return this.settings.getDialog().accept(this.getValue());
      }
    },
    cancel() {
      trace("NwtFormBuilderViewer.methods.cancel");
      if(typeof this.settings.onCancel === "function") {
        return this.settings.onCancel();
      }
      if(typeof this.settings.getDialog === "function") {
        return this.settings.getDialog().cancel();
      }
    },
    validate() {
      trace("NwtFormBuilderViewer.methods.validate");
      const value = this.getValue();
    }
  },
  created() {},
  mounted() {},
});
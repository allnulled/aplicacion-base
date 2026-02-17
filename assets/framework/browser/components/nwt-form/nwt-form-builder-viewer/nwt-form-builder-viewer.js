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
  data() {
    return {
      value: this.settings.initialValue || null,
    };
  },
  methods: {
    getValue() {
      return this.value;
    },
    accept() {
      if(typeof this.settings.onAccept === "function") {
        return this.settings.onAccept(this.value);
      }
      if(typeof this.settings.getDialog === "function") {
        return this.settings.getDialog().accept(this.value);
      }
    },
    cancel() {
      if(typeof this.settings.onCancel === "function") {
        return this.settings.onCancel();
      }
      if(typeof this.settings.getDialog === "function") {
        return this.settings.getDialog().cancel();
      }
    }
  },
  created() {},
  mounted() {},
});
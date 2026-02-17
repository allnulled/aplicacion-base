Vue.component("NwtFormControlViewer", {
  name: "NwtFormControlViewer",
  template: $template,
  props: {
    settings: {
      type: Object,
      required: true,
    }
  },
  mixins: [],
  data() {
    return {};
  },
  methods: {},
  created() {
    NwtFormBuilder.validateSchema(this.settings);
  },
  mounted() {},
});
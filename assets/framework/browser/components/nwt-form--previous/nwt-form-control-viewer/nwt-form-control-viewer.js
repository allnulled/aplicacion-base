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
  methods: {
    getValue() {
      return this.$refs.specificControl.getValue();
    },
    getSpecificControl() {
      return this.$refs.specificControl;
    }
  },
  created() {
    NwtStatic.api.control.validation.interface.statically.validateControlSchema(this.settings);
  },
  mounted() {},
});
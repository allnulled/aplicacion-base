Vue.component("ProcedurePrototipoParaTesterYProgressBarForm", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
    initialValue: {
      type: Object,
      default: () => {
        return {
          title: "Título inicial"
        };
      }
    }
  },
  data() {
    trace("ProcedurePrototipoParaTesterYProgressBarForm.data");
    return {
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    
  },
  async mounted() {
    trace("ProcedurePrototipoParaTesterYProgressBarForm.mounted");
  }
});
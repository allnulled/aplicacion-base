Vue.component("ProcedureConvertirDePdfAPngPorImagemagickForm", {
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
          files: [],
          output: false,
        };
      }
    }
  },
  data() {
    trace("ProcedureConvertirDePdfAPngPorImagemagickForm.data");
    return {
      isLoadingCode: false,
      isDragging: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    onDrop(event) {
      trace("ProcedureConvertirDePdfAPngPorImagemagickForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },
    reloadCode() {
      trace("ProcedureConvertirDePdfAPngPorImagemagickForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    async selectPdfs() {
      trace("ProcedureConvertirDePdfAPngPorImagemagickForm.methods.selectPdfs");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: ".pdf",
        multiple: true
      });
      if (!selection) return;
      this.value.files = selection || [];
      this.reloadCode();
    },
    async selectOutputDirectory() {
      trace("ProcedureConvertirDePdfAPngPorImagemagickForm.methods.selectOutputDirectory");
      const selection = await NwtFileChooser.pickDirectory({
        openedBy: NwtPaths.global.projectRoot,
      });
      if (!selection) return;
      this.value.output = selection || false;
      this.$forceUpdate(true);
      this.reloadCode();
    }
  },
  async mounted() {
    trace("ProcedureConvertirDePdfAPngPorImagemagickForm.mounted");
    this.isLoadingCode = false;
  }
});
Vue.component("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm", {
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
          file: false,
          output: false,
          rows: 10,
        };
      }
    }
  },
  data() {
    trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.data");
    return {
      isLoadingCode: false,
      isDragging: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    onDrop(event) {
      trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      assertion(files.length === 1, "Dropped files can only be 1 per form on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.onDrop»");
      const file = files[0];
      assertion(file.endsWith(".csv"), `File «${file}» must end with «.csv» on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.onDrop»`);
      this.value.file = file;
      this.reloadCode();
    },
    reloadCode() {
      trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    async selectFile() {
      trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.selectFiles");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: ".csv",
        multiple: false
      });
      if (!selection) return;
      this.value.file = selection || false;
      this.reloadCode();
    },
    async selectOutputDirectory() {
      trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.methods.selectOutputDirectory");
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
    trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsForm.mounted");
    this.isLoadingCode = false;
  }
});
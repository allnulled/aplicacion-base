Vue.component("ProcedureConcatenarFicherosPorNodejsForm", {
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
          separator: "\n\n--------\n\n"
        };
      }
    }
  },
  data() {
    trace("ProcedureConcatenarFicherosPorNodejsForm.data");
    return {
      isLoadingCode: false,
      isDragging: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    onDrop(event) {
      trace("ProcedureConcatenarFicherosPorNodejsForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },
    reloadCode() {
      trace("ProcedureConcatenarFicherosPorNodejsForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    async selectFiles() {
      trace("ProcedureConcatenarFicherosPorNodejsForm.methods.selectFiles");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: "*",
        multiple: true
      });
      if (!selection) return;
      this.value.files = selection || [];
      this.reloadCode();
    },
    async selectOutputFile() {
      trace("ProcedureConcatenarFicherosPorNodejsForm.methods.selectOutputFile");
      const selection = await NwtFileChooser.pickFileToSave({
        openedBy: NwtPaths.global.projectRoot,
      });
      if (!selection) return;
      this.value.output = selection || false;
      this.$forceUpdate(true);
      this.reloadCode();
    }
  },
  async mounted() {
    trace("ProcedureConcatenarFicherosPorNodejsForm.mounted");
    this.isLoadingCode = false;
  }
});
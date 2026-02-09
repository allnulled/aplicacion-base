Vue.component("ProcedureConcatenarFicherosCsvPorNodejsForm", {
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
    trace("ProcedureConcatenarFicherosCsvPorNodejsForm.data");
    return {
      isLoadingCode: false,
      isDragging: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    onDrop(event) {
      trace("ProcedureConcatenarFicherosCsvPorNodejsForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      for(let index=0; index<files.length; index++) {
        const file = files[index];
        assertion(file.endsWith(".csv"), `File ${index} «${file}» must end with «.csv» on «ProcedureConcatenarFicherosCsvPorNodejsForm.methods.onDrop»`);
      }
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },
    reloadCode() {
      trace("ProcedureConcatenarFicherosCsvPorNodejsForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    async selectFiles() {
      trace("ProcedureConcatenarFicherosCsvPorNodejsForm.methods.selectFiles");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: ".csv",
        multiple: true
      });
      if (!selection) return;
      this.value.files = selection || [];
      this.reloadCode();
    },
    async selectOutputFile() {
      trace("ProcedureConcatenarFicherosCsvPorNodejsForm.methods.selectOutputFile");
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
    trace("ProcedureConcatenarFicherosCsvPorNodejsForm.mounted");
    this.isLoadingCode = false;
  }
});
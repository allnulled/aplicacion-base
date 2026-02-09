Vue.component("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm", {
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
    trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.data");
    return {
      isLoadingCode: false,
      isDragging: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    onDrop(event) {
      trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },
    reloadCode() {
      trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    async selectPngs() {
      trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.methods.selectPngs");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: ".png",
        multiple: true
      });
      if (!selection) return;
      this.value.files = selection || [];
      this.reloadCode();
    },
    async selectOutputDirectory() {
      trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.methods.selectOutputDirectory");
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
    trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickForm.mounted");
    this.isLoadingCode = false;
  }
});
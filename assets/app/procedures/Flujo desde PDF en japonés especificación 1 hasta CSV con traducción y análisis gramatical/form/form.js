Vue.component("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm", {
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
          files: false,
          output: false,
        };
      }
    }
  },
  data() {
    trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.data");
    return {
      isDragging: false,
      isLoadingCode: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    
    onDrop(event) {
      trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },

    async selectFiles() {
      trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.methods.selectFiles");
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
      trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.methods.selectOutputDirectory");
      const selection = await NwtFileChooser.pickDirectory({
        openedBy: NwtPaths.global.projectRoot,
      });
      if (!selection) return;
      this.value.output = selection || false;
      this.$forceUpdate(true);
      this.reloadCode();
    },

    reloadCode() {
      trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },

  },
  async mounted() {
    trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalForm.mounted");
  }
});
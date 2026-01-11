Vue.component("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm", {
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
    trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.data");
    return {
      isDragging: false,
      isLoadingCode: false,
      value: Object.assign({}, this.initialValue),
    };
  },
  methods: {
    
    onDrop(event) {
      trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.methods.onDrop");
      this.isDragging = false;
      const filesBrute = Array.from(event.dataTransfer.files);
      const files = filesBrute.map(file => file.path);
      this.value.files = this.value.files.concat(files);
      this.reloadCode();
    },

    async selectFiles() {
      trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.methods.selectFiles");
      const selection = await NwtFileChooser.pickFile({
        openedBy: NwtPaths.global.projectRoot,
        acceptExtensions: ".txt,.md",
        multiple: true
      });
      if (!selection) return;
      this.value.files = selection || false;
      this.reloadCode();
    },
    
    async selectOutputDirectory() {
      trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.methods.selectOutputDirectory");
      const selection = await NwtFileChooser.pickDirectory({
        openedBy: NwtPaths.global.projectRoot,
      });
      if (!selection) return;
      this.value.output = selection || false;
      this.$forceUpdate(true);
      this.reloadCode();
    },

    reloadCode() {
      trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.methods.reloadCode");
      this.isLoadingCode = true;
      setTimeout(() => {
        this.isLoadingCode = false;
      }, 100);
    },
    
  },
  async mounted() {
    trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptForm.mounted");
  }
});
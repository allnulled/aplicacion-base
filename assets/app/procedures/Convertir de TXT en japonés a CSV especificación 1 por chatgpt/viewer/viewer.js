Vue.component("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer.data");
    return {
      tester: false,
    };
  },
  created() {
    trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» as array parameter on «ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» as string parameter on «ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    this.tester = NwtTester.create("Progreso de convertir de TXT en japonés a CSV especificación 1 por chatgpt", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      assertion(true, "Recuperando texto de prompt");
      const promptContent = await NwtStrings.fromAssets("Prompt para obtener CSV a partir de TXT en japonés especificación 1.txt");
      const filesInput = this.dialog.context.parameters.files;
      tester.progressBar.total = filesInput.length;
      for (let indexInput = 0; indexInput < filesInput.length; indexInput++) {
        const fileInput = filesInput[indexInput];
        assertion(true, `Iniciando conversión de fichero «${fileInput}»`);
        tester.progressBar.advance(1);
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: call to action de ChatGPT va aquí
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        // @TODO: 
        console.log(promptContent);
        assertion(true, `Terminada conversión de fichero «${fileInput}»`);
        await NwtTimer.timeout(500);
      }
      assertion(true, "Procedimiento finalizado");
      await NwtTimer.timeout(500);
    });
  },
  methods: {

  },
  async mounted() {
    trace("ProcedureConvertirDeTxtEnJaponesACsvEspecificacion1PorChatgptViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
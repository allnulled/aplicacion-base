Vue.component("ProcedureConvertirDeCsvACsvExpandidoEspecificacion1PorChatgptViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDeCsvACsvExpandidoEspecificacion1PorChatgptViewer.data");
    const tester = NwtTester.create("Progreso de convertir CSV a CSV expandido especificación 1 por ChatGPT", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      assertion(true, "Recuperando texto de prompt");
      const promptContent = await NwtStrings.fromAssets("Prompt para expandir CSV con traducción y análisis gramatical especificación 1.txt");
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
    return {
      tester,
    };
  },
  methods: {

  },
  async mounted() {
    trace("ProcedureConvertirDeCsvACsvExpandidoEspecificacion1PorChatgptViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
Vue.component("ProcedureConcatenarFicherosPorNodejsViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConcatenarFicherosPorNodejsViewer.data");
    return {
      tester: false,
    };
  },
  methods: {},
  async created() {
    trace("ProcedureConcatenarFicherosPorNodejsViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConcatenarFicherosPorNodejsViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConcatenarFicherosPorNodejsViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const originalFiles = this.dialog.context.parameters.files;
    const outputFile = this.dialog.context.parameters.output;
    const separator = this.dialog.context.parameters.separator || "\n\n--------\n\n";
    this.tester = NwtTester.create("Convertir de PNG a TXT en japonés por yomitoku", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = originalFiles.length + 1;
      let allContent = "";
      for (let indexFile = 0; indexFile < originalFiles.length; indexFile++) {
        const originalFile = originalFiles[indexFile];
        assertion(true, `Leyendo fichero «${originalFile}»`);
        const content = await NwtFilesystem.readFile(originalFile);
        allContent += content;
        allContent += separator;
        tester.progressBar.advance(1);
      }
      assertion(true, `Escribiendo fichero de salida en «${outputFile}»`);
      await NwtFilesystem.writeFile(outputFile, allContent);
      await NwtTimer.timeout(1000);
      assertion(true, "Procedimiento finalizado");
      tester.progressBar.advance(1);
    });
  },
  async mounted() {
    trace("ProcedureConcatenarFicherosPorNodejsViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
Vue.component("ProcedureConvertirDePdfAPngPorImagemagickViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDePdfAPngPorImagemagickViewer.data");
    return {
      tester: false,
    };
  },
  methods: {
    async convertPdfToPng(pdfPath, outputDir) {
      trace("ProcedureConvertirDePdfAPngPorImagemagickViewer.methods.convertPdfToPng");
      const path = require("path");
      const imagemagickBinary = await NwtSettings.global.get("nwt.binary.imagemagick");
      const outputFile = path.resolve(outputDir, path.basename(pdfPath).replace(/\.pdf$/g, ".png"));
      const command = `${JSON.stringify(imagemagickBinary)} -density 300 ${JSON.stringify(pdfPath)} -background white -alpha remove -quality 2000 ${JSON.stringify(outputFile)}`;
      return await NwtShell.create().exec(command);
    }
  },
  async created() {
    trace("ProcedureConvertirDePdfAPngPorImagemagickViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConvertirDePdfAPngPorImagemagickViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConvertirDePdfAPngPorImagemagickViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const originalFiles = this.dialog.context.parameters.files;
    const outputDirectory = this.dialog.context.parameters.output;
    this.tester = NwtTester.create("Convertir de PDF a PNG por imagemagick", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = originalFiles.length;
      for(let indexFile=0; indexFile<originalFiles.length; indexFile++) {
        const originalFile = originalFiles[indexFile];
        assertion(true, `Iniciando conversión para «${originalFile}»`);
        await this.convertPdfToPng(originalFile, outputDirectory);
        tester.progressBar.advance(1);
      }
      assertion(true, "Procedimiento finalizado");
      await NwtTimer.timeout(1000);
    });
  },
  async mounted() {
    trace("ProcedureConvertirDePdfAPngPorImagemagickViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
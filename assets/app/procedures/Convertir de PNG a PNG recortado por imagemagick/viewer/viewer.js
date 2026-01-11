Vue.component("ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.data");
    return {
      tester: false,
    };
  },
  methods: {
    async cropPng(pngPath, outputDir) {
      trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.methods.cropPng");
      const path = require("path");
      const imagemagickBinary = await NwtSettings.global.get("nwt.binary.imagemagick");
      const outputFile1 = path.resolve(outputDir, path.basename(pngPath).replace(/\.png$/g, ".part-001.png"));
      const outputFile2 = path.resolve(outputDir, path.basename(pngPath).replace(/\.png$/g, ".part-002.png"));
      const settings = {
        cropping: {
          north: "100%x50%+0-200",
          south: "100%x60%",
        }
      };
      const shell = NwtShell.create();
      const command1 = `${JSON.stringify(imagemagickBinary)} ${JSON.stringify(pngPath)} -gravity north -crop ${settings.cropping.north} ${JSON.stringify(outputFile1)}`;
      const command2 = `${JSON.stringify(imagemagickBinary)} ${JSON.stringify(pngPath)} -gravity south -crop ${settings.cropping.south} ${JSON.stringify(outputFile2)}`;
      const ok3 = await shell.exec(command1);
      const ok4 = await shell.exec(command2);
    }
  },
  async created() {
    trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const originalFiles = this.dialog.context.parameters.files;
    const outputDirectory = this.dialog.context.parameters.output;
    this.tester = NwtTester.create("Convertir de PNG a PNG recortado por imagemagick", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = originalFiles.length + 1;
      for (let indexFile = 0; indexFile < originalFiles.length; indexFile++) {
        const originalFile = originalFiles[indexFile];
        assertion(true, `Iniciando recorte para «${originalFile}»`);
        await this.cropPng(originalFile, outputDirectory);
        tester.progressBar.advance(1);
      }
      await NwtTimer.timeout(1000);
      assertion(true, "Procedimiento finalizado");
      tester.progressBar.advance(1);
    });
  },
  async mounted() {
    trace("ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
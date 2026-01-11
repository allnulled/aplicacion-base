Vue.component("ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.data");
    return {
      tester: false,
    };
  },
  methods: {
    async transcribePng(pngPath, outputDir) {
      trace("ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.methods.transcribePng");
      const path = require("path");
      const yomitokuBinary = await NwtSettings.global.get("nwt.binary.yomitoku");
      const shell = NwtShell.create();
      const command = `${JSON.stringify(yomitokuBinary)} --ignore_meta --ignore_line_break -f md --combine -o ${JSON.stringify(outputDir)} ${JSON.stringify(pngPath)}`;
      const ok3 = await shell.exec(command);
    }
  },
  async created() {
    trace("ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const originalFiles = this.dialog.context.parameters.files;
    const outputDirectory = this.dialog.context.parameters.output;
    this.tester = NwtTester.create("Convertir de PNG a TXT en japonés por yomitoku", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = originalFiles.length + 1;
      for (let indexFile = 0; indexFile < originalFiles.length; indexFile++) {
        const originalFile = originalFiles[indexFile];
        assertion(true, `Iniciando transcripción para «${originalFile}»`);
        await this.transcribePng(originalFile, outputDirectory);
        tester.progressBar.advance(1);
      }
      await NwtTimer.timeout(1000);
      assertion(true, "Procedimiento finalizado");
      tester.progressBar.advance(1);
    });
  },
  async mounted() {
    trace("ProcedureConvertirDePngATxtEnJaponesPorYomitokuViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
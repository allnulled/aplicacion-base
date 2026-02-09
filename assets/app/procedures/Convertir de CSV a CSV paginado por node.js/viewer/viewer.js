Vue.component("ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.data");
    return {
      tester: false,
    };
  },
  methods: {
    async exportToCsv(fileRows, outputFile) {
      trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.methods.exportToCsv");
      const fs = require("fs");
      const outputContent = await NwtCsv.fromJsonToCsv(fileRows);
      await fs.promises.writeFile(outputFile, outputContent, "utf8");
    }
  },
  async created() {
    trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.file === "string", "Cannot run procedure without passing «file» as string parameter on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» as string parameter on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.created»");
      assertion(typeof this.dialog.context.parameters?.rows !== "undefined", "Cannot run procedure without passing «rows» as number parameter on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const path = require("path");
    const originalFile = this.dialog.context.parameters.file;
    const outputDirectory = this.dialog.context.parameters.output;
    const rows = parseInt(this.dialog.context.parameters.rows);
    assertion(!isNaN(rows), "Cannot run procedure without passing «rows» as valid number parameter on «ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.created»");
    const filename = path.basename(originalFile);
    this.tester = NwtTester.create("Concatenar ficheros CSV por node.js", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      assertion(true, `Leyendo fichero «${originalFile}»`);
      const { data: allRows } = await NwtCsv.fromCsvFileToJson(originalFile);
      tester.progressBar.total = allRows.length + 1;
      let currentFileRows = [];
      let fileCounter = 1;
      for(let index=0; index<allRows.length; index++) {
        const currentRow = allRows[index];
        tester.progressBar.advance(1);
        if((index !== 0) && ((index % rows) === 0)) {
          const outputFileId = `-${(fileCounter+"").padStart(4, '0')}.csv`;
          const outputFile = path.resolve(outputDirectory, filename.replace(/\.csv/g, outputFileId));
          assertion(true, `Exportando CSV ${fileCounter}: ${outputFile}`);
          await this.exportToCsv(currentFileRows, outputFile);
          currentFileRows = [currentRow];
          fileCounter++;
        } else {
          currentFileRows.push(currentRow);
        }
        // await NwtTimer.timeout(100);
      }
      if(currentFileRows.length) {
        const outputFileId = `-${(fileCounter+"").padStart(4, '0')}.csv`;
        const outputFile = path.resolve(outputDirectory, filename.replace(/\.csv/g, outputFileId));
        assertion(true, `Exportando CSV ${fileCounter}: ${outputFile}`);
        await this.exportToCsv(currentFileRows, outputFile);
      }
      tester.progressBar.advance(1);
      assertion(true, "Procedimiento finalizado");
      await NwtTimer.timeout(1000);
    });
  },
  async mounted() {
    trace("ProcedureConvertirDeCsvACsvPaginadoPorNodejsViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
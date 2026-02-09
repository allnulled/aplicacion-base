Vue.component("ProcedureConcatenarFicherosCsvPorNodejsViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureConcatenarFicherosCsvPorNodejsViewer.data");
    return {
      tester: false,
    };
  },
  methods: {},
  async created2() {
    const files = this.dialog.context.parameters.files;
    const output = this.dialog.context.parameters.output;
    this.tester = NwtTester.create("Concatenar blabla", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      await NwtIterableProcedure.run({
        // Datos:
        collection: files,
        // Inyecciones:
        dialog: this.dialog,
        process: this.dialog.process,
        component: this,
        tester: this.tester,
        progressBar: tester.progressBar,
        // Hooks:
        onFunctionStart: async function() {
          this.progressBar.total = this.collection.length;
        },
        onIteration: async function () {
          assertion(true, `Iterating for ${this.index} time`);
          const { data: csvRows } = await NwtCsv.fromCsvFileToJson(this.item);
          console.log(csvRows);
        },
        onFunctionEnd: async function() {

        }
      });
      assertion(true, "Procedimiento finalizado");
    });
  },
  async created() {
    trace("ProcedureConcatenarFicherosCsvPorNodejsViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConcatenarFicherosCsvPorNodejsViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConcatenarFicherosCsvPorNodejsViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    const originalFiles = this.dialog.context.parameters.files;
    const outputFile = this.dialog.context.parameters.output;
    this.tester = NwtTester.create("Concatenar ficheros CSV por node.js", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = originalFiles.length + 1;
      let allObjects = [];
      for (let indexFile = 0; indexFile < originalFiles.length; indexFile++) {
        const originalFile = originalFiles[indexFile];
        assertion(true, `Leyendo fichero «${originalFile}»`);
        const { data: csvRows } = await NwtCsv.fromCsvFileToJson(originalFile);
        allObjects = allObjects.concat(csvRows);
        tester.progressBar.advance(1);
      }
      assertion(true, `Escribiendo fichero de salida en «${outputFile}»`);
      const finalCsv = NwtCsv.fromJsonToCsv(allObjects);
      await NwtFilesystem.writeFile(outputFile, finalCsv);
      await NwtTimer.timeout(1000);
      assertion(true, "Procedimiento finalizado");
      tester.progressBar.advance(1);
    });
  },
  async mounted() {
    trace("ProcedureConcatenarFicherosCsvPorNodejsViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
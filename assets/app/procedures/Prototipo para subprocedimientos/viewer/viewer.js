(function () {

  Vue.component("ProcedurePrototipoParaSubprocedimientosViewer", {
    template: $template,
    props: {
      dialog: {
        type: Object,
        required: true,
      },
    },
    data() {
      trace("ProcedurePrototipoParaSubprocedimientosViewer.data");
      // Así se tendría que picar un procedimiento que usa subprocedimientos:
      const tester = NwtTester.create(this.dialog.context?.parameters?.title || "Pasos de prototipo para subprocedimientos", async (tester, assertion) => {
        assertion(true, "Procedimiento iniciado");
        tester.progressBar.total = 4;
        assertion(true, "Aserción 1");
        await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
          fromDialog: this.dialog
        });
        this.debuggingForDemonstration(this.dialog.process.$closedAt);
        if(this.dialog.process.$closedAt) return;
        await NwtTimer.timeout(500 + 40);
        tester.progressBar.advance(1);
        assertion(true, "Aserción 2");
        await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
          fromDialog: this.dialog
        });
        this.debuggingForDemonstration(this.dialog.process.$closedAt);
        if(this.dialog.process.$closedAt) return;
        await NwtTimer.timeout(500);
        tester.progressBar.advance(1);
        assertion(true, "Aserción 3");
        await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
          fromDialog: this.dialog
        });
        this.debuggingForDemonstration(this.dialog.process.$closedAt);
        if(this.dialog.process.$closedAt) return;
        await NwtTimer.timeout(500);
        tester.progressBar.advance(1);
        assertion(true, "Aserción 4");
        await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
          fromDialog: this.dialog
        });
        this.debuggingForDemonstration(this.dialog.process.$closedAt);
        if(this.dialog.process.$closedAt) return;
        await NwtTimer.timeout(500);
        tester.progressBar.advance(1);
        assertion(true, "Procedimiento finalizado");
        await NwtTimer.timeout(500);
      });
      return {
        tester,
      };
    },
    methods: {
      debuggingForDemonstration(...args) {
        console.log(...args);
      }
    },
    async mounted() {
      trace("ProcedurePrototipoParaSubprocedimientosViewer.mounted");
      (async () => {
        await this.tester.start();
        await this.$nwt.Timer.timeout(1000);
        this.dialog.cancel();
      })();
    }
  });
})();
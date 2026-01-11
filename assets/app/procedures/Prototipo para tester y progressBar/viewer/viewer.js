Vue.component("ProcedurePrototipoParaTesterYProgressBarViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedurePrototipoParaTesterYProgressBarViewer.data");
    const tester = NwtTester.create(this.dialog.context?.parameters?.title || "Pasos de prototipo para tester y progressBar", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = 4;
      assertion(true, "Aserción 1");
      await NwtTimer.timeout(500);
      tester.progressBar.advance(1);
      assertion(true, "Aserción 2");
      await NwtTimer.timeout(500);
      tester.progressBar.advance(1);
      assertion(true, "Aserción 3");
      await NwtTimer.timeout(500);
      tester.progressBar.advance(1);
      assertion(true, "Aserción 4");
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

  },
  async mounted() {
    trace("ProcedurePrototipoParaTesterYProgressBarViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});
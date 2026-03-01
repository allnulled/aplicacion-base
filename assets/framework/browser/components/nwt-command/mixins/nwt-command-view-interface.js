(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommandViewInterface'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommandViewInterface'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCommandViewInterface = {
    name: "NwtCommandViewInterface",
    extends: NwtCommandContextInterface,
    props: {
      dialog: {
        type: Object,
        required: true,
      },
      command: {
        type: Object,
        required: true,
      },
    },
    data() {
      trace("NwtCommandViewInterface.data");
      return {
        tester: undefined,
        cacher: undefined,
      };
    },
    methods: {
      async prepareTester() {
        trace("NwtCommandViewInterface.methods.prepareTester");
        this.tester = NwtTester.create(`Ejecutando comando «${this.command.getCommandName()}»`, async (tester, assertion) => {
          // @EXACTO: aquí empieza la acción: pero va sola.
          // Las variables pasadas al objecto se inyectarán en el scope con `NwtImporter.asyncSource`
          await this.command.start.function({ component: this, tester, assertion });
        });
      },
      async prepareCacher() {
        trace("NwtCommandViewInterface.methods.prepareCacher");
        const commandPath = `assets/framework/nwt-command/registry/${this.command.getCommandName()}`
        await NwtFilesystem.ensureDirectory(`${commandPath}/cache`);
        this.cacher = NwtCacheDirectory.create(`assets/framework/nwt-command/registry/${this.command.getCommandName()}`);
      }
    },
    async created() {
      trace("NwtCommandViewInterface.created");
      await this.prepareTester();
      await this.prepareCacher();
    },
    async mounted() {
      trace("NwtCommandViewInterface.mounted");
      // @ASYNC: asíncronamente, para que no bloquee:
      this.tester.start();
    },
  };

  return NwtCommandViewInterface;

});
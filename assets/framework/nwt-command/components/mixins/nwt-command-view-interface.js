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
    props: {},
    data() {
      trace("NwtCommandViewInterface.data");
      return {
        tester: undefined
      };
    },
    methods: {
      prepareTester() {
        trace("NwtCommandViewInterface.methods.prepareTester");
        this.tester = NwtTester.create(`Ejecutando comando «${this.command.getCommandName()}»`, async (tester, assertion) => {
          await this.command.start.function({ component: this, tester, assertion });
        });
      }
    },
    created() {
      trace("NwtCommandViewInterface.created");
      this.prepareTester();
    },
    mounted() {
      trace("NwtCommandViewInterface.mounted");
      this.tester.start();
    },
  };

  return NwtCommandViewInterface;

});
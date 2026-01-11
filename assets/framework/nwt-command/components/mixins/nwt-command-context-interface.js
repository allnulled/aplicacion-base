(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommandContextInterface'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommandContextInterface'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCommandContextInterface = {
    name: "NwtCommandContextInterface",
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
      trace("NwtCommandContextInterface.data");
      return {
        enunciado: "Esto es un enunciado general",
        tester: false,
      };
    },
    methods: {
      close() {
        trace("NwtCommandContextInterface.methods.close");
        return this.dialog.close();
      }
    },
    created() {
      trace("NwtCommandContextInterface.created");
    },
    mounted() {
      trace("NwtCommandContextInterface.mounted");
    },
  };
  return NwtCommandContextInterface;

});
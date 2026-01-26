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
  };
  return NwtCommandContextInterface;

});
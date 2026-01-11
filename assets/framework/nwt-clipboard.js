(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtClipboard'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtClipboard'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtClipboard = class {

    static copyText(text) {
      trace("NwtClipboard.copyText");
      assertion(typeof text === "string", "Parameter «text» must be a string on «NwtClipboard.copyText»");
      window.navigator.clipboard.writeText(text);
      NwtToasts.show({
        title: "Texto copiado correctamente",
        text: `El texto de ${text.length} caracteres fue copiado correctamente.`
      });
    }

  };

  return NwtClipboard;

});
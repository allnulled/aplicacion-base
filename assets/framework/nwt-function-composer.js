(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFunctionComposer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFunctionComposer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFunctionComposer = class {

    static noop = function() {
      trace("NwtFunctionComposer.noop");
    }

    static fromFunctions(fns, ...args) {
      trace("NwtFunctionComposer.fromFunctions");
      return NwtCodeComposer.composeFunctionByFunctions(fns, ...args);
    }

  };

  return NwtFunctionComposer;

});

(async function () {

  /*
  const callback = await NwtFunctionComposer.fromFunctions([
    async () => { const { message } = arguments[0]; },
    async () => { console.log(message) },
    async () => { console.log("Hola!") },
    async () => { await console.log("Hola!") },
    async () => { console.log("Hola!") },
    async () => { console.log("Hola!") },
    async () => { console.log("Hola!") },
  ], {
    onStart: async () => { },
    onInterlude: async () => { console.log("Interludio!") },
    onSuccess: async () => { },
    onFail: async () => { },
    onEnd: async () => { },
  });
  callback({ message: "GO!" });
  //*/

})();
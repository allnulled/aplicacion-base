(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeSelector'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeSelector'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeSelector = class {

    static async parse(url, args, shortener = false) {
      const ast = NwtFiletreeSelectorParser.parse(url);
      const info = await NwtFiletreeSelectorInterpreter.interpret(ast, args, shortener);
      return info;
    }

  };

  return NwtFiletreeSelector;

});
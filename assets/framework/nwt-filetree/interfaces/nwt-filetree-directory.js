(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeDirectory'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeDirectory'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeDirectory = class extends NwtFiletreeNode {

    constructor(...args) {
      super(...args);
      // Property this.filetree is already set here.
    }

    static async read(fullpath, parameters, shortener) {
      trace("NwtFiletreeDirectory.read");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath, parameters, shortener);
      console.log(info);
      console.log(info);
      console.log(info);
      // @TODO
      return info;
    }

  };

  return NwtFiletreeDirectory;

});
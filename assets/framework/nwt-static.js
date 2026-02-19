(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtStatic'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtStatic'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtStatic = class {

    static api = {};

  };

  NwtDecorableTree.install(NwtStatic.api);

  return NwtStatic;

});
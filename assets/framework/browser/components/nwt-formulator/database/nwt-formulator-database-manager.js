(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorDatabaseManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorDatabaseManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorDatabaseManager = class {

    static create(...args) {
      return new this(...args);
    }

  };

  return NwtFormulatorDatabaseManager;

});
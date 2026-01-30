(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyFeature = class {

    static create(...args) {
      trace("NwtFormulatorLazyFeature.create");
      return new this(...args);
    }

    constructor(id) {
      trace("NwtFormulatorLazyFeature.constructor");
      this.id = id;
    }

    async load() {
      trace("NwtFormulatorLazyFeature.prototype.load");
    }

  };

  return NwtFormulatorLazyFeature;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtAbort'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtAbort'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtAbort = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(value) {
      this.value = value;
    }

  };

  return NwtAbort;

});
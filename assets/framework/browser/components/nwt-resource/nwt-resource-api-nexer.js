(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtResourceApiNexer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtResourceApiNexer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtResourceApiNexer = class {
    static create(...args) {
      return new this(...args);
    }
    constructor(...args) {
      Object.assign(this, ...args);
    }
  };

  return NwtResourceApiNexer;

});
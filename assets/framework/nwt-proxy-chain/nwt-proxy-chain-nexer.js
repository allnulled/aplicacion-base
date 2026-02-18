(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProxyChainNexer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProxyChainNexer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtProxyChainNexer = class {
    static create(...args) {
      return new this(...args);
    }
    constructor(scope) {
      Object.assign(this, scope);
    }
  };

  return NwtProxyChainNexer;

});
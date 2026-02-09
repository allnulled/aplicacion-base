(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFramework'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFramework'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFramework = class {

    static default = this;

  };

  return NwtFramework;

});
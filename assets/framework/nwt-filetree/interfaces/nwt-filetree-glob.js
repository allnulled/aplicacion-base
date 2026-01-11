(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeGlob'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeGlob'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeGlob = class extends NwtFiletreeNode {

    constructor(...args) {
      super(...args);
      // Property this.filtree is already set here.
    }

  };

  return NwtFiletreeGlob;

});
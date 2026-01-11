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
      // Property this.filtree is already set here.
    }

  };

  return NwtFiletreeDirectory;

});
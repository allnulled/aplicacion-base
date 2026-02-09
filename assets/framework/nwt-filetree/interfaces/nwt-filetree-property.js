(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeProperty'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeProperty'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeProperty = class extends NwtFiletreeNode {

    constructor(...args) {
      super(...args);
      // Property this.filetree is already set here.
    }

  };

  return NwtFiletreeProperty;

});
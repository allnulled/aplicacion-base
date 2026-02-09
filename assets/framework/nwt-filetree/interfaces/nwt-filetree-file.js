(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeFile'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeFile'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeFile = class extends NwtFiletreeNode {

    constructor(...args) {
      super(...args);
      // Property this.filetree is already set here.
    }

  };

  return NwtFiletreeFile;

});
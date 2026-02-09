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
      // Property this.filetree is already set here.
    }

    static find(fullpath, ...args) {
      trace("NwtFiletreeGlob.find");
      console.log(fullpath);
    }

    find(subpaths = [], ...args) {
      trace("NwtFiletreeGlob.prototype.find");
      const fullpath = this.filetree.resolve(...subpaths);
      return this.constructor.find(fullpath, ...args);
    }

  };

  return NwtFiletreeGlob;

});
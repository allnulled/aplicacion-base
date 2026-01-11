(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtRelativePath'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtRelativePath'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtRelativePath = class {

    static create(...args) {
      return new this(...args);
    }

    static join(...subpaths) {
      trace("NwtRelativePath.join");
      for(let indexSubpah=0; indexSubpah<subpaths.length; indexSubpah++) {
        const arg = subpaths[indexSubpah];
        assertion(typeof arg === "string", `Parameter «arguments[${indexSubpah}]» must be a string too on «NwtRelativePath.constructor»`);
      }
      if(NwtEnvironment.isNode) {
        return require("path").resolve(subpaths);
      } else {
        return subpaths.join("/").replace(/\/+/g, "/");
      }
    }

    constructor(...args) {
      trace("NwtRelativePath.constructor");
      this.$basedir = this.constructor.join(...args);
    }

    resolve(...subpaths) {
      trace("NwtRelativePath.constructor");
      return this.constructor.join(this.$basedir, ...subpaths);
    }

  };

  return NwtRelativePath;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtSubpathable'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtSubpathable'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtSubpathable = class {

    static create(...args) {
      return new this(...args);
    }

    static join(...subpaths) {
      trace("NwtSubpathable.join");
      for(let indexSubpah=0; indexSubpah<subpaths.length; indexSubpah++) {
        const arg = subpaths[indexSubpah];
        assertion(typeof arg === "string", `Parameter «arguments[${indexSubpah}]» must be a string too on «NwtSubpathable.constructor»`);
      }
      if(NwtEnvironment.isNode) {
        return require("path").resolve(subpaths);
      } else {
        return subpaths.join("/").replace(/\/+/g, "/");
      }
    }

    constructor(...args) {
      trace("NwtSubpathable.constructor");
      this.$basedir = this.constructor.join(...args);
    }

    resolve(...subpaths) {
      trace("NwtSubpathable.constructor");
      return this.constructor.join(this.$basedir, ...subpaths);
    }

  };

  return NwtSubpathable;

});
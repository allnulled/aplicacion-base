(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtServiceManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtServiceManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtServiceManager = class extends NwtStringShortener {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir) {
      const path = require("path");
      const idsPath = path.resolve(basedir + "/ids.json");
      super(idsPath);
      trace("NwtServiceManager.constructor");
      this.basedir = path.resolve(basedir);
    }

    resolve(...subpaths) {
      return require("path").resolve(this.basedir, ...subpaths);
    }

  };

  NwtServiceManager.global = NwtServiceManager.create(`assets/framework/nwt-service/services`);

  return NwtServiceManager;

});
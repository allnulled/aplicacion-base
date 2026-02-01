(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorFeatureManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorFeatureManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorFeatureManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/feature/for")) {
      assertion(typeof basedir === "string", "Parameter «basedir» must be string on «NwtFormulatorFeatureManager.constructor»");
      this.basedir = basedir;
    }

    resolve(...subpaths) {
      return require("path").resolve(this.basedir, ...subpaths);
    }

    for(featureId) {
      assertion(typeof featureId === "string", "Parameter «featureId» must be string on «NwtFormulatorFeatureManager.prototype.for»");
      const featurePath = `${this.basedir}/${featureId}.js`;
      return NwtFormulatorLazyFeature.create(featurePath, this);
    }

  };
  
  NwtFormulatorFeatureManager.global = NwtFormulatorFeatureManager.create();

  return NwtFormulatorFeatureManager;

});
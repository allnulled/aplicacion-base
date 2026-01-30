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

    constructor(formulator, basedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/feature/for")) {
      this.formulator = formulator;
      this.basedir = basedir;
    }

    for(featureId) {
      assertion(typeof featureId === "string", "Parameter «featureId» must be string on «NwtFormulatorFeatureManager.prototype.for»");
      const featurePath = `${this.basedir}/${featureId}.js`;
      return NwtFormulatorLazyFeature.create(featurePath);
    }

  };

  return NwtFormulatorFeatureManager;

});
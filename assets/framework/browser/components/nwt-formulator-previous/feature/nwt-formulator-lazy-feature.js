(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyFeature = class {

    static create(...args) {
      trace("NwtFormulatorLazyFeature.create");
      return new this(...args);
    }

    constructor(id, manager = NwtFormulatorFeatureManager.global) {
      trace("NwtFormulatorLazyFeature.constructor");
      assertion(typeof id === "string", `Parameter «id» must be string not «${typeof id}» on «NwtFormulatorLazyFeature.constructor»`);
      assertion(typeof manager === "object", `Parameter «manager» must be object not «${typeof manager}» on «NwtFormulatorLazyFeature.constructor»`);
      assertion(manager instanceof NwtFormulatorFeatureManager, `Parameter «manager» must be instance of «NwtFormulatorFeatureManager» on «NwtFormulatorLazyFeature.constructor»`);
      this.id = id;
      this.manager = manager;
    }

    async load(injections = {}) {
      trace("NwtFormulatorLazyFeature.prototype.load");
      assertion(typeof injections === "object", "Required parameter «injections» to be object on «NwtFormulatorFeatureManager.prototype.load»");
      const featurePath = this.manager.resolve(`${this.id}.js`);
      const feature = {};
      const featureInjections = { ...injections, scope: feature };
      assertion(await NwtFilesystem.existsAsFile(featurePath), `Parameter «featurePath» now «${featurePath}» does not exist as file on «»`);
      const featureDefinition = await NwtImporter.asyncSource(featurePath, featureInjections);
      Object.assign(feature, featureDefinition);
      assertion(typeof feature === "object", `Required «feature» source on «${this.id}» to return object on «NwtFormulatorLazyFeature.load»`);
      assertion(typeof feature.class === "object", `Required «feature.class» on «${this.id}» to be object on «NwtFormulatorLazyFeature.load»`);
      assertion(typeof feature.class.name === "string", `Required «feature.class.name» on «${this.id}» to be string on «NwtFormulatorLazyFeature.load»`);
      return feature;
    }

  };

  return NwtFormulatorLazyFeature;

});
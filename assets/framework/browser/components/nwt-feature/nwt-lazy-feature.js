(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyFeature'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyFeature'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtLazyFeature = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(id, basedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-feature")) {
      trace("NwtLazyFeature.constructor");
      assertion(typeof id === "string", "NwtLazyFeature.constructor:1");
      assertion(typeof basedir === "string", "NwtLazyFeature.constructor:2");
      this.id = id;
      this.basedir = basedir;
      this.loaded = false;
    }

    async load(injection = {}) {
     trace("NwtLazyFeature.prototype.load");
     const target = `${this.basedir}/${this.id}/feature.js`;
      assertion(await NwtFilesystem.existsAsFile(target), `Feature «js» file not found at «${target}» on «NwtLazyFeature.prototype.load»`);
      this.loaded = await NwtImporter.asyncSource(target, injection);
      await this.validateLazyFeature(this.loaded, target);
      return this.loaded;
    }

    async validateLazyFeature(value, target) {
      trace("NwtLazyFeature.prototype.validateLazyFeature");
      assertion(typeof value === "object", `Required feature «${target}» to return object on «NwtLazyFeature.prototype.validateLazyFeature»`);
      if(typeof value.statics === "function") return -1;
      assertion(typeof value.statics === "object", `Required feature «${target}» to return object at property «statics» on «NwtLazyFeature.prototype.validateLazyFeature»`);
      assertion(typeof value.statics.id === "string", `Required feature «${target}» to return string at property «statics.id» on «NwtLazyFeature.prototype.validateLazyFeature»`);
      return -2;
    }

  };

  return NwtLazyFeature;

});
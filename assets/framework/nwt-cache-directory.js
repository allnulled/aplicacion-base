(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCacheDirectory'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCacheDirectory'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCacheDirectory = class extends NwtFiletree {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir) {
      super(basedir);
    }

    async saveStep(keys, result = {done:true}) {
      trace("NwtCacheDirectory.prototype.saveStep");
      // @TODO:
    }

    async loadStep(keys, initializer = {done:false}) {
      trace("NwtCacheDirectory.prototype.loadStep");
      // @TODO:
    }

  };

  
  NwtCacheDirectory.local = NwtCacheDirectory.create(NwtPaths.global.relativeToAppData("cache/global"));
  
  NwtCacheDirectory.installation = NwtCacheDirectory.create(NwtPaths.global.relative("assets/app/cache/global"));

  return NwtCacheDirectory;

});
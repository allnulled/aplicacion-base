(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFeatureStatics'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFeatureStatics'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFeatureStatics = class {

    static validateStaticsObject (statics) {
      trace("NwtFeatureStatics.validateStaticsObject");
      assertion(typeof statics === "object", "Required parameter «statics» to be object on «NwtFeatureStatics.validateStaticsObject»");
    }

  };

  return NwtFeatureStatics;

});
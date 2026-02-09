(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtValidator'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtValidator'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtValidator = class {

    static validate(value, schema = false, component = {}) {
      trace("NwtValidator.validate");
      return NwtFeatureStatics.create().api.validate(value, schema, component);
    }

  };

  return NwtValidator;

});
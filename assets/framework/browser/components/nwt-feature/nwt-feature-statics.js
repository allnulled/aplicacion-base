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

    static create (...args) {
      return new this(...args);
    }

    constructor(scope = {}) {
      trace("NwtFeatureStatics.constructor");
      Object.assign(this, scope);
    }

    api = {
      validate: async (context) => {
        trace("NwtFeatureStatics.prototype.api.validate");
        const validationContext = NwtValidationContext.create({
          value: null,
          componentId: this.id,
          component: null,
          ...context,
        });
        try {
          await this.onValidate(validationContext);
        } catch (error) {
          validationContext.errors.add(error);
        }
        if(validationContext.errors.length) {
          throw validationContext.errors;
        }
        return true;
      }
    }

  };

  return NwtFeatureStatics;

});
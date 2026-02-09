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
      getDefaultSchema: () => {
        return {
          type: this.id,
          controls: false
        };
      },
      validateRecursively: async (value, schema, component = {}) => {
        trace("NwtFeatureStatics.prototype.api.validateRecursively");
        assertion(typeof schema === "object", "Parameter «schema» must be object on «NwtFeatureStatics.api.validateRecursively»");
        assertion(typeof component === "object", "Parameter «component» must be object on «NwtFeatureStatics.api.validateRecursively»");
        assertion(typeof schema.type === "string", "Parameter «schema.type» must be string on «NwtFeatureStatics.api.validateRecursively»");
        const resource = await NwtResource.for(schema.type).load();
        const resourceId = resource.statics.id;
        assertion(typeof resource.statics === "object", "Parameter «resource.statics» should be object on «NwtFeatureStatics.api.validateRecursively»");
        assertion(typeof resource.statics.traits === "object", "Parameter «resource.statics.traits» should be object on «NwtFeatureStatics.api.validateRecursively»");
        const resourceTraits = resource.statics.traits[resourceId];
        assertion(typeof resource.statics.traits[resourceId] === "object", `Parameter «resource.statics.traits[${resourceId}]» should be object on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof resource.statics.traits[resourceId].onValidate === "function", `Parameter «resource.statics.traits[${resourceId}].onValidate» should be function on «NwtFeatureStatics.api.validateRecursively»`);
        const resourceOnValidate = resourceTraits.onValidate;
        const customAssertion = NwtAsserter.createAssertionFunction(() => true, error => {throw error});
        // @THROWABLE aquí:
        const validation = await resourceOnValidate.call(this, value, schema, component, customAssertion);
        return true;
      },
      validate: (value, schema = this.api.getDefaultSchema(), component = {}) => {
        trace("NwtFeatureStatics.prototype.api.validate");
        return this.api.validateRecursively(value, schema, component);
      }
    }

  };

  return NwtFeatureStatics;

});
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

    static create(...args) {
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
      validateRecursively: async (value, schema, component = {}, indexes = []) => {
        trace("NwtFeatureStatics.prototype.api.validateRecursively");
        assertion(typeof schema === "object", `Parameter «schema» must be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof component === "object", `Parameter «component» must be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof schema.type === "string", `Parameter «schema.type» must be string on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        const resource = await NwtResource.for(schema.type).load();
        const resourceId = resource.statics.id;
        assertion(typeof resource.statics === "object", `Parameter «resource.statics» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof resource.statics.traits === "object", `Parameter «resource.statics.traits» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        Validate_by_subtype: {
          const supertypeId = resource.statics.subtypeOf || false;
          if (supertypeId === false) {
            break Validate_by_subtype;
          }
          const supertype = await NwtResource.for(supertypeId).load();
          assertion(typeof supertype.statics === "object", `Parameter «supertype.statics» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(supertypeId === supertype.statics.id, `Parameter «supertype.statics.id» and «supertypeId» should match on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof supertype.statics.traits === "object", `Parameter «supertype.statics.traits» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const supertypeTraits = supertype.statics.traits[supertypeId];
          assertion(typeof supertype.statics.traits[supertypeId] === "object", `Parameter «supertype.statics.traits[${supertypeId}]» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof supertype.statics.traits[supertypeId].onValidate === "function", `Parameter «supertype.statics.traits[${resourceId}].onValidate» should be function on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const resourceOnValidate = supertypeTraits.onValidate;
          const customAssertion = NwtAsserter.createAssertionFunction(() => true, error => { throw error });
          // @THROWABLE aquí:
          // console.log("VALIDANDO:", supertypeId, "\nID:", resource.statics.id, "\nSTATICS:",resource.statics, "\nSCHEMA:", resource.statics.controls);
          const validation = await resourceOnValidate.call(resource.statics, value, {
            type: supertypeId,
            controls: resource.statics.controls
          }, component, customAssertion, indexes);
        }
        Validate_by_last_trait: {
          const resourceTraits = resource.statics.traits[resourceId];
          assertion(typeof resource.statics.traits[resourceId] === "object", `Parameter «resource.statics.traits[${resourceId}]» should be object on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof resource.statics.traits[resourceId].onValidate === "function", `Parameter «resource.statics.traits[${resourceId}].onValidate» should be function on index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const resourceOnValidate = resourceTraits.onValidate;
          const customAssertion = NwtAsserter.createAssertionFunction(() => true, error => { throw error });
          // @THROWABLE aquí:
          const validation = await resourceOnValidate.call(this, value, schema, component, customAssertion, indexes);
        }
        return true;
      },
      validate: (value, schema = this.api.getDefaultSchema(), component = {}, indexes = []) => {
        trace("NwtFeatureStatics.prototype.api.validate");
        return this.api.validateRecursively(value, schema, component, indexes);
      }
    }

  };

  return NwtFeatureStatics;

});
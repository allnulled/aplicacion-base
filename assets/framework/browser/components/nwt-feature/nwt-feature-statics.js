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
        trace("NwtFeatureStatics.prototype.api.getDefaultSchema");
        return {
          type: this.id,
          controls: false
        };
      },
      getControlsById: (defaultValue = undefined, statics = this) => {
        trace("NwtFeatureStatics.prototype.api.getControlsById");
        const output = NwtUtils.opinionify(() => statics.traits[statics.id].controls, defaultValue);
        return output;
      },
      validateRecursively: async (value, schema, component = {}, indexes = []) => {
        trace("NwtFeatureStatics.prototype.api.validateRecursively");
        assertion(typeof schema === "object", `Parameter «schema» must be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof component === "object", `Parameter «component» must be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof schema.type === "string", `Parameter «schema.type» must be string @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        const resource = await NwtResource.for(schema.type).load();
        const resourceId = resource.statics.id;
        assertion(typeof resource.statics === "object", `Parameter «resource.statics» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        assertion(typeof resource.statics.traits === "object", `Parameter «resource.statics.traits» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
        Validate_by_subtype: {
          let staticControls = resource.statics.api.getControlsById(false, resource.statics);
          if (typeof staticControls === "function") {
            staticControls = staticControls.call(resource.statics);
          }
          if (staticControls === false) {
            break Validate_by_subtype;
          }
          assertion(typeof staticControls === "object", `Parameter «staticControls» must be function, undefined or object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof staticControls.type === "string", `Parameter «staticControls.type» must be string @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const supertype = await NwtResource.for(staticControls.type).load();
          assertion(typeof supertype.statics === "object", `Parameter «supertype.statics» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(staticControls.type === supertype.statics.id, `Parameter «supertype.statics.id» and «staticControls.type» should match @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof supertype.statics.traits === "object", `Parameter «supertype.statics.traits» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const supertypeTraits = supertype.statics.traits[staticControls.type];
          assertion(typeof supertype.statics.traits[staticControls.type] === "object", `Parameter «supertype.statics.traits[${staticControls.type}]» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof supertype.statics.traits[staticControls.type].onValidate === "function", `Parameter «supertype.statics.traits[${resourceId}].onValidate» should be function @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          const resourceOnValidate = supertypeTraits.onValidate;
          const customAssertion = NwtAsserter.createAssertionFunction(() => true, error => { throw error });
          // @THROWABLE aquí:
          const validation = await resourceOnValidate.call(resource.statics, value, staticControls, component, customAssertion, indexes);
        }
        Validate_by_last_trait: {
          const resourceTraits = resource.statics.traits[resourceId];
          assertion(typeof resource.statics.traits[resourceId] === "object", `Parameter «resource.statics.traits[${resourceId}]» should be object @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
          assertion(typeof resource.statics.traits[resourceId].onValidate === "function", `Parameter «resource.statics.traits[${resourceId}].onValidate» should be function @index «${indexes.join(".")}» on «NwtFeatureStatics.api.validateRecursively»`);
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
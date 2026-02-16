(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtResource'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtResource'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtResource = class {

    static definitions = {};

    static validateDefinition(definition, isRedefining = false) {
      trace("NwtResource.validateDefinition");
      assertion(typeof definition === "object", "Parameter «definition» must be object on «NwtResource.validateDefinition»");
      Check_id: {
        assertion(typeof definition.id === "string", "Parameter «definition.id» must be string on «NwtResource.validateDefinition»");
        if (!isRedefining) {
          assertion(!(definition.id in this.definitions), `Parameter «definition.id» in this case «${definition.id}» cannot be registered twice on «NwtResource.validateDefinition»`);
        }
      }
      Check_type: {
        if (definition.types) {
          assertion(Array.isArray(definition.types), "Parameter «definition.types» must be array on «NwtResource.validateDefinition»");
          for (let index = 0; index < definition.types.length; index++) {
            assertion(typeof definition.types[index] === "string", `Parameter «definition.types[${index}]» must be string on «NwtResource.validateDefinition»`);
            // assertion(definition.types[index] in this.definitions, `Parameter «definition.types[${index}]» which is «${definition.types[index]}» must be registered in «definitions» on «NwtResource.validateDefinition»`);
          }
        }
      }
      Check_inherits: {
        if (definition.inherits) {
          assertion(Array.isArray(definition.inherits), "Parameter «definition.inherits» must be array on «NwtResource.validateDefinition»");
          for (let index = 0; index < definition.inherits.length; index++) {
            assertion(typeof definition.inherits[index] === "string", `Parameter «definition.inherits[${index}]» must be string on «NwtResource.validateDefinition»`);
            // assertion(definition.inherits[index] in this.definitions, `Parameter «definition.inherits[${index}]» which is «${definition.inherits[index]}» must be registered in «definitions» on «NwtResource.validateDefinition»`);
          }
        }
      }
      Add_view_statically_if_so: {
        if (definition.view) {
          definition.view.statically = definition;
        }
      }
      Add_definition: {
        this.definitions[definition.id] = definition;
      }
      Pass_to_instance: {
        NwtResourceApi.install(definition);
      }
      return definition;
    }

    static define(definition) {
      trace("NwtResource.define");
      return this.validateDefinition(definition, false);
    }

    static override(definition) {
      trace("NwtResource.override");
      return this.validateDefinition(definition, true);
    }

    static for(id) {
      trace("NwtResource.for");
      assertion(id in this.definitions, `Parameter «id» which is «${id}» must be registered in «definitions» on «NwtResource.for»`);
      return this.definitions[id];
    }

    static remove(id) {
      trace("NwtResource.remove");
      delete this.definitions[id];
    }

  };

  return NwtResource;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormBuilder'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormBuilder'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormBuilder = class {

    static cachedValidSchemaTypes = false;

    static reloadValidSchemaTypes() {
      this.cachedValidSchemaTypes = Object.keys(NwtResource.definitions).filter(it => it.startsWith("control/for/")).map(it => it.replace("control/for/",""));
    }

    static get validSchemaTypes() {
      if(!this.cachedValidSchemaTypes) {
        this.reloadValidSchemaTypes();
      }
      return this.cachedValidSchemaTypes;
    }

    static localAssertion = NwtAsserter.createAssertionFunction(() => {
      return true;
    }, error => {
      throw error;
    });

    static validateSchema(schema, pointer = [], assertion = this.localAssertion) {
      assertion(typeof schema === "object", `Parameter «schema» at «${pointer.join(".") || "/"}» must be object but «${typeof schema}» was found on «NwtFormBuilder.validateSchema»`);
      const isArray = Array.isArray(schema);
      if(isArray) {
        for(let index=0; index<schema.length; index++) {
          const item = schema[index];
          assertion(typeof item === "object", `Parameter «schema[${index}]» at «${pointer.join(".") || "/"}» must be object but «${typeof item}» was found on «NwtFormBuilder.validateSchema»`);
          assertion(!Array.isArray(item), `Parameter «schema[${index}]» at «${pointer.join(".") || "/"}» must be object but not array on «NwtFormBuilder.validateSchema»`);
          this.validateSchema(item, pointer.concat([index]), assertion);
        }
      } else if(schema === null) {
        // @OK
      } else {
        assertion(typeof schema.type === "string", `Parameter «schema.type» at «${pointer.join(".") || "/"}» must be string but «${typeof schema.type}» was found on «NwtFormBuilder.validateSchema»`);
        Checker_de_que_el_type_se_conoce: {
          assertion(this.validSchemaTypes.includes(schema.type), `Parameter «schema.type» at «${pointer.join(".") || "/"}» which is «${schema.type}» must be a known type of resource on «NwtFormBuilder.validateSchema»`);
        }
        Si_tiene_schema:
        if(typeof schema.schema !== "undefined") {
          const asStructure = (schema.type === "structure") || (NwtResource.for(`control/for/${schema.type}`).asStructure === true);
          Si_es_structure: {
            if(!asStructure) break Si_es_structure;
            const structureKeys = Object.keys(schema.schema);
            assertion(!("type" in schema.schema), `Parameter «schema.schema» at «${pointer.join(".")}» cannot accept key «type» in order to avoid confusion as it is a property of «type=structure» and not a «type» definition on «NwtFormBuilder.validateSchema»`);
            for(let prop in structureKeys) {
              const structureKey = structureKeys[prop];
              const substructure = schema.schema[structureKey];
              this.validateSchema(substructure, pointer.concat(["schema", structureKey]), assertion);
            }
            break Si_tiene_schema;
          }
          Si_no_es_structure: {
            this.validateSchema(schema.schema, pointer.concat(["schema"]), assertion);
          }
        }
        return true;
      }
    }

    static ask(settings) {
      assertion(typeof settings === "object", `Parameter «settings» must be object but «${typeof settings}» was found on «NwtFormBuilder.ask»`);
      return this.validateSchema(settings);
    }

  };

  return NwtFormBuilder;

});
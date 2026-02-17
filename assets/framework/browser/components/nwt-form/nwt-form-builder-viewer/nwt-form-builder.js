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

    static validateSchema(schema, pointer = [], assertion = this.localAssertion, asStructure = false) {
      trace("NwtFormBuilder.validateSchema");
      const pointerIndex = pointer.join(".");
      assertion(typeof schema === "object", `Schema fails at «${pointerIndex}» because «it» should be object on «NwtFormBuilder.validateSchema»`);
      assertion(!Array.isArray(schema), `Schema fails at «${pointerIndex}» because «it» should be object but not array on «NwtFormBuilder.validateSchema»`);
      if(asStructure) {
        for(let prop in schema) {
          const val = schema[prop];
          assertion(typeof val === "object", `Schema fails at «${pointerIndex}» because «it[${prop}]» should be object on «NwtFormBuilder.validateSchema»`);
          assertion(typeof val.type === "string", `Schema fails at «${pointerIndex}» because «it[${prop}].type» should be string on «NwtFormBuilder.validateSchema»`);
          this.validateSchema(val, pointer.concat([ prop ]), assertion, false);
        }
        return true;
      }
      assertion(typeof schema.type === "string", `Schema fails at «${pointerIndex}» because «it.type» should be string on «NwtFormBuilder.validateSchema»`);
      const paysSchema = ["structure", "list", "option"].indexOf(schema.type) !== -1;
      const hasSchema = schema.schema;
      if(paysSchema) {
        assertion(typeof schema.schema === "object", `Schema fails at «${pointerIndex}» because «it.schema» should be object on «NwtFormBuilder.validateSchema»`);
      }
      Force_known_types_only: {
        assertion(this.validSchemaTypes.includes(schema.type), `Schema fails at «${pointerIndex}» because «it.type» should be a valid type but «${schema.type}» was found on «NwtFormBuilder.validateSchema»`);
      }
      if(hasSchema) {
        return this.validateSchema(schema.schema, pointer.concat([ "schema" ]), assertion, schema.type === "structure");
      }
      return true;
    }

    static ask(settings) {
      assertion(typeof settings === "object", `Parameter «settings» must be object but «${typeof settings}» was found on «NwtFormBuilder.ask»`);
      this.validateSchema(settings);
      return NwtDialogs.open({
        title: settings.title || "Formulario",
        template: `<nwt-form-builder-viewer :settings="settings" />`,
        factory: {
          data() {
            settings.getDialog = () => this;
            return {
              settings,
            };
          },
          computed: {
            value() {
              return this.$refs.form.getValue();
            }
          },
          methods: {
            onSubmit(value) {
              return this.accept(value);
            }
          },
        }
      })
    }

  };

  return NwtFormBuilder;

});
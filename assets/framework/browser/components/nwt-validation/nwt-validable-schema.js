(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtValidableSchema'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtValidableSchema'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtValidableSchema = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(schema) {
      this.schema = schema;
      this.validateSchema();
    }

    validateSchema(schema = this.schema, accPointer = []) {
      trace("NwtValidableSchema.prototype.validateSchema");
      assertion(typeof schema === "object", `Parameter at «${accPointer.join("/")}» must be object on «NwtValidableSchema.prototype.validateSchema»`);
      assertion(typeof schema.type === "string", `Parameter «type» at «${accPointer.join("/")}» must be string on «NwtValidableSchema.prototype.validateSchema»`);
      if(typeof schema.controls !== "undefined") {
        assertion(typeof schema.controls === "object", `Parameter «controls» at «${accPointer.join("/")}» must be object or undefined on «NwtValidableSchema.prototype.validateSchema»`);
        for(let controlId in schema.controls) {
          const control = schema.controls[controlId];
          this.validateSchema(control, accPointer.concat(["controls", controlId]));
        }
      }
    }

  };

  return NwtValidableSchema;

});
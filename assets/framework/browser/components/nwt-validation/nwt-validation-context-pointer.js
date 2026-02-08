(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtValidationContextPointer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtValidationContextPointer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtValidationContextPointer = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(...args) {
      trace("NwtValidationContextPointer.constructor");
      this.indexes = args;
    }

    add(...indexes) {
      trace("NwtValidationContextPointer.prototype.add");
      for(let index=0; index<indexes.length; index++) {
        const item = indexes[index];
        this.indexes.push(item);
      }
      return this;
    }

    clone() {
      trace("NwtValidationContextPointer.prototype.clone");
      return this.constructor.create(...this.indexes);
    }

  }
  
  return NwtValidationContextPointer;

});
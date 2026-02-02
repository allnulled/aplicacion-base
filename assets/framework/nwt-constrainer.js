(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtConstrainer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtConstrainer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtConstrainer = class {

    static ErrorInterface = class extends Error {

      static create(...args) {
        return new this(...args);
      }

      constructor(message) {
        super(message);
      }

    }

    static AssertionError = class extends this.ErrorInterface {

      constructor(message) {
        super(message);
        this.name = "AssertionError";
        this.message = message;
      }

    }

    static ContraintError = class extends this.ErrorInterface {

      constructor(message) {
        super(message);
        this.name = "ConstraintError";
        this.message = message;
      }
    
    }

    static MultipleConstraintErrors = class extends this.ErrorInterface {

      constructor(...messages) {
        super(undefined);
        this.name = "MultipleConstraintError";
        this.errors = messages;
        this.throwOnFail = false;
      }

      get message() {
        return JSON.stringify(this.errors, null, 2);
      }

      assertion(condition, constraintMessage, throwOnFail = this.throwOnFail) {
        if(condition) {
          return true;
        }
        this.errors.push(new this.constructor.constructor.ConstraintError(constraintMessage));
        if(throwOnFail) {
          throw this;
        }
      }

      absorve(multipleConstraintErrors) {
        assertion(multipleConstraintErrors instanceof this.constructor, "Parameter «multipleConstraintErrors» must be instance of «MultipleConstraintErrors» on «MultipleConstraintErrors.prototype.absorve»");
        this.errors = this.errors.concat(multipleConstraintErrors.errors);
        return this;
      }

    }

  };

  return NwtConstrainer;

});
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

    static ConstraintError = class extends this.ErrorInterface {

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
        this.throwOnFail = true;
      }

      get message() {
        return JSON.stringify(this.errors.map(e => ({name: e.name, message: e.message, stack: e.stack})), null, 2);
      }

      assertion(condition, constraintMessage, throwOnFail = this.throwOnFail) {
        if(condition) {
          return true;
        }
        this.errors.push(NwtConstrainer.ConstraintError.create(constraintMessage));
        if(throwOnFail) {
          throw this;
        }
      }

      add(constraintMessage) {
        if(constraintMessage instanceof NwtConstrainer.ConstraintError) {
          this.errors.push(constraintMessage);
        } else if(typeof constraintMessage === "string") {
          this.errors.push(NwtConstrainer.ConstraintError.create(constraintMessage));
        } else if(constraintMessage instanceof NwtConstrainer.MultipleConstraintErrors) {
          this.errors = this.errors.concat(constraintMessage.errors);
        } else {
          this.errors.push(constraintMessage);
        }
        return this;
      }

      toJSON() {
        return this.messages;
      }

    }

  };

  return NwtConstrainer;

});
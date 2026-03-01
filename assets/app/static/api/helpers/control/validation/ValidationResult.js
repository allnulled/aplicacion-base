NwtStatic.api.set("control.validation.ValidationResult", class {
  static create(...args) {
    return new this(...args);
  }
  constructor() {
    trace("NwtStatic.api.control.validation.ValidationResult.constructor");
    this.success = false;
    this.error = false;
    this.decision = false;
  }
  setSuccess(decision = null) {
    trace("NwtStatic.api.control.validation.ValidationResult.prototype.setSuccess");
    this.error = false;
    this.success = true;
    this.decision = decision;
    this.failure = null;
    return this;
  }
  setError(error) {
    trace("NwtStatic.api.control.validation.ValidationResult.prototype.setError");
    this.error = true;
    this.success = false;
    this.decision = null;
    this.failure = error;
    return this;
  }
});
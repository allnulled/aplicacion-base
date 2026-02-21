NwtStatic.api.set("control.validation.result.class", class {
  static create(...args) {
    return new this(...args);
  }
  constructor(base = {}) {
    Object.assign(this, base);
  }
  setSuccess(data) {
    this.success = true;
    this.error = false;
    this.data = data;
  }
  setError(error) {
    this.success = false;
    this.error = true;
    this.data = error;
  }
});
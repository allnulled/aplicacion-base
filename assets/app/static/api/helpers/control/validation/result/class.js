NwtStatic.api.set("control.validation.result.class", class {
  static create(...args) {
    return new this(...args);
  }
  constructor(base = {}) {
    Object.assign(this, base);
  }
});
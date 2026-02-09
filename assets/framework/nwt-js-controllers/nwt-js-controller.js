(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsController'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsController'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsController = class {

    static create(...args) {
      trace("NwtJsController.create");
      return new this(...args);
    }

    constructor(value) {
      this.value = value;
    }

    toCode() {
      throw new Error("Controller must implement toCode");
    }

    toCodeAsString() {
      throw new Error("Controller must implement toCodeAsString");
    }

  };

  return NwtJsController;

});
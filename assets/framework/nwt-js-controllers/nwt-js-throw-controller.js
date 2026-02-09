(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsThrowController'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsThrowController'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsThrowController = class extends NwtJsController {

    static create(...args) {
      trace("NwtJsThrowController.create");
      return new this(...args);
    }

    init() {
      trace("NwtJsThrowController.prototype.init");
    }

    constructor(error) {
      super(error);
      trace("NwtJsThrowController.contructor");
    }

    toCode() {
      throw new Error(__CONTROLLER_ERROR__);
    }

    toCodeAsString() {
      let code = "";
      code += NwtCodeComposer.getBlankFunctionBodyByFunctionOrString(this.toCode);
      code.replace(/__CONTROLLER_ERROR__/g, typeof this.value === "string" ? this.value : JSON.stringify(this.value));
      console.log(code);
      return code;
    }

  };

  return NwtJsThrowController;

});
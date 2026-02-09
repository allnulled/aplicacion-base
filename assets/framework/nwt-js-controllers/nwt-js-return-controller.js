(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsReturnController'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsReturnController'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsReturnController = class extends NwtJsController {

    static create(...args) {
      trace("NwtJsReturnController.create");
      return new this(...args);
    }

    constructor(value) {
      super(value);
      trace("NwtJsReturnController.contructor");
    }

    init() {
      trace("NwtJsReturnController.prototype.init");
    }

    toCode() {
      return __CONTROLLER_OUTPUT__;
    }

    toCodeAsString() {
      let code = "";
      code += NwtCodeComposer.getBlankFunctionBodyByFunctionOrString(this.toCode);
      code += code.replace(/__CONTROLLER_OUTPUT__/g, typeof this.value === "string" ? this.value : JSON.stringify(this.value));
      console.log(code);
      return code;
    }

  };

  return NwtJsReturnController;

});
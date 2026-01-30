(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyControl = class {

    constructor(options) {
      trace("NwtFormulatorLazyControl.constructor");
      assertion(typeof options === "object", "Parameter «options» must be object on «NwtFormulatorLazyControl.constructor»");
      assertion(typeof options.html === "string", "Parameter «options.html» must be string on «NwtFormulatorLazyControl.constructor»");
      assertion(typeof options.css === "string", "Parameter «options.css» must be string on «NwtFormulatorLazyControl.constructor»");
      assertion(typeof options.js === "string", "Parameter «options.js» must be string on «NwtFormulatorLazyControl.constructor»");
      assertion(typeof options.component === "string", "Parameter «options.component» must be string on «NwtFormulatorLazyControl.constructor»");
      this.options = options;
    }

    async getComponent() {
      trace("NwtFormulatorLazyControl.prototype.getComponent");
    }

  };

  return NwtFormulatorLazyControl;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyDialog'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyDialog'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyDialog = class {

    constructor(options) {
      trace("NwtFormulatorLazyDialog.constructor");
      assertion(typeof options === "object", "Parameter «options» must be object on «NwtFormulatorLazyDialog.constructor»");
      assertion(typeof options.html === "string", "Parameter «options.html» must be string on «NwtFormulatorLazyDialog.constructor»");
      assertion(typeof options.css === "string", "Parameter «options.css» must be string on «NwtFormulatorLazyDialog.constructor»");
      assertion(typeof options.js === "string", "Parameter «options.js» must be string on «NwtFormulatorLazyDialog.constructor»");
      this.options = options;
    }

    async open(parameters = {}) {
      trace("NwtFormulatorLazyDialog.prototype.open");
      assertion(typeof parameters === "object", "Parameter «parameters» must be object on «NwtFormulatorLazyDialog.prototype.open»");
      // @TODO: abrir un diálogo con el componente indicado
    }

  };

  return NwtFormulatorLazyDialog;

});
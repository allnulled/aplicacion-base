(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorUtils = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(formulator) {
      this.formulator = formulator;
    }

    static notifyValidationSuccessByControlComponent() {
      trace("NwtFormulatorUtils.notifyValidationSuccessByControlComponent");
      // @TODO: hacer la validación: pensar estrategia buena.
    }

    static notifyValidationErrorByControlComponent() {
      trace("NwtFormulatorUtils.notifyValidationErrorByControlComponent");
      // @TODO: hacer la validación: pensar estrategia buena.
    }

  };

  return NwtFormulatorUtils;

});
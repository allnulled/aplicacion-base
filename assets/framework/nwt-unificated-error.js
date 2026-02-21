/**
 * 
 * # NwtUnificatedError
 * 
 * API para utilidades relacionadas con errores.
 * 
 * RECOMENDACIÓN: no usar para nada, de momento no tiene una estabilidad.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtUnificatedError
 * NwtFramework.ErrorUtils
 * Vue.prototype.$nwt.ErrorUtils
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtUnificatedError'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtUnificatedError'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtUnificatedError = class extends Error {

    static from(...args) {
      return new this(...args);
    }

    constructor(errorsList) {
      super("Unificated error started");
      this.name = "UnifiedError";
      this.message = errorsList.map(e => `${e.name}: ${e.message} [${e.stack}]`).join("\n+\n");
    }

  };

  return NwtUnificatedError;

});
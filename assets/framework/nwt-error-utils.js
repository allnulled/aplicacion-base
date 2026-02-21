/**
 * 
 * # NwtErrorUtils
 * 
 * API para utilidades relacionadas con errores.
 * 
 * RECOMENDACIÓN: no usar para nada, de momento no tiene una estabilidad.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtErrorUtils
 * NwtFramework.ErrorUtils
 * Vue.prototype.$nwt.ErrorUtils
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtErrorUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtErrorUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtErrorUtils = class {

    static unifyMessages(errors) {
      trace("NwtErrorUtils.unifyMessages");
      if(errors instanceof Error) {
        return errors;
      }
      assertion(Array.isArray(errors), "Parameter «errors» must be instance of Error or array on «NwtErrorUtils.unifyMessages»");
      assertion(errors.length !== 0, "Parameter «errors» cannot be an empty array on «NwtErrorUtils.unifyMessages»");
      if(errors.length === 1) {
        return errors[0];
      }
      return errors.map((error, index) => `Error ${index}: [${error.name}] ${error.message}`).join(" + ");
    }

    static unifyErrors(errors) {
      trace("NwtErrorUtils.unifyErrors");
      assertion(Array.isArray(errors), "Parameter «errors» must be array on «NwtErrorUtils.unifyErrors»");
      assertion(errors.length !== 0, "Parameter «errors» cannot be empty array on «NwtErrorUtils.unifyErrors»");
      if(errors.length === 1) {
        return errors[0];
      }
      return NwtUnificatedError.from(errors);
    }


  };

  return NwtErrorUtils;

});
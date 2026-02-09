/**
 * 
 * # Nwt Globalizer API
 * 
 * API para globalizar variables en todos los entornos.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtGlobalizer
 * NwtFramework.Globalizer
 * Vue.prototype.$nwt.Globalizer
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite algunas cosas como:
 * 
 * ```js
 * NwtGlobalizer.exportTo("NombreDeGlobal", {});
 * ```
 * 
 */

(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtGlobalizer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtGlobalizer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtGlobalizer = class {

    static exportTo(id, value) {
      trace("NwtGlobalizer.exportTo");
      if(typeof window !== "undefined") {
        // assertion(typeof window[id] === "undefined", `Global «window[${id}]» must be undefined on «NwtGlobalizer.exportTo»`);
        window[id] = value;
      }
      if(typeof global !== "undefined") {
        // assertion(typeof global[id] === "undefined", `Global «global[${id}]» must be undefined on «NwtGlobalizer.exportTo»`);
        global[id] = value;
      }
    }

  };

  return NwtGlobalizer;

});
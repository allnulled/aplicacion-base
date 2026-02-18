const { lutimesSync } = require("fs-extra");

/**
 * 
 * # NwtObjectUtils
 * 
 * API para utilidades con Object.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtObjectUtils
 * NwtFramework.ObjectUtils
 * Vue.prototype.$nwt.ObjectUtils
 * ```
 * 
 * ## Ventajas
 * 
 * ```
 * NwtObjectUtils.cleanMapByPairs(object, cleaner);
 * // El «cleaner» recibirá (key, value, index) por cada entrada de «object»
 * // Si el «cleaner» devuelve «undefined», esa entrada no se devolverá
 * // Si el «cleaner» devuelve Array<Clave,Valor>, esa entrada será substituida por lo especificado
 * // Si el «cleaner» devuelve otra cosa, lanzará error
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtObjectUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtObjectUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtObjectUtils = class {

    static noop() {}

    static cleanMapByPairs(obj, cleaner = this.noop) {
      trace("NwtObjectUtils.cleanMapByPairs");
      const keys = Object.keys(obj);
      const output = {};
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const val = obj[key];
        const result = cleaner(key, val, index);
        if(typeof result !== "undefined") {
          if(!Array.isArray(result)) {
            throw new Error(`Parameter «obj[${JSON.stringify(key)}]» must be an array on «NwtObjectUtils.cleaMapByPairs»`);
          }
          if(result.length !== 2) {
            throw new Error(`Parameter «obj[${JSON.stringify(key)}]» must be an array of 2 elements on «NwtObjectUtils.cleaMapByPairs»`);
          }
          output[result[0]] = result[1];
        }
      }
      return output;
    }

    static overrideOnce(data = {}, payload = {}, base = false) {
      if(!base) base = data;
      const keys = Object.keys(payload);
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const val = payload[key];
        const hasKey = key in base;
        assertion(!hasKey, `Parameter «payload[${key}]» cannot override a previous property on «NwtObjectUtils.overrideOnce»`);
      }
      return Object.assign(base, payload);
    }

    static overrideSoft(data = {}, payload = {}, base = false) {
      if(!base) base = data;
      const keys = Object.keys(payload);
      const overrider = {};
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const val = payload[key];
        const hasKey = key in data;
        if(!hasKey) {
          overrider[key] = val;
        }
      }
      return Object.assign(base, overrider);
    }

    static overrideHard(data = {}, payload = {}, base = false) {
      if(!base) base = data;
      return Object.assign(base, payload);
    }

  };

  return NwtObjectUtils;

});
/**
 * 
 * # NwtArrayUtils
 * 
 * API para utilidades relacionadas con la clase Array.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtArrayUtils
 * NwtFramework.ArrayUtils
 * Vue.prototype.$nwt.ArrayUtils
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtArrayUtils.repeatBy(3, true); // returns: [true, true, true]
 * // Este método elimina el valor si lo encuentra, o lo añade si no lo encuentra:
 * NwtArrayUtils.toggleByValue(lista:Array, value:any);
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtArrayUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtArrayUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtArrayUtils = class {

    static async toggleByValue(list, val) {
      trace("NwtArrayUtils.toggleByValue");
      const pos = list.indexOf(val);
      if(pos === -1) list.push(val);
      else list.splice(pos, 1);
      return list;
    }

    static repeatBy(reps = 1, val = undefined) {
      trace("NwtArrayUtils.repeatBy");
      const output = [];
      for(let index=0; index<reps; index++) {
        output.push(val);
      }
      return output;
    }

    static pushEachInto(added, destination) {
      trace("NwtArrayUtils.pushInto");
      assertion(Array.isArray(destination), "Parameter «destination» must be array");
      assertion(Array.isArray(added), "Parameter «added» must be array");
      for(let index=0; index<added.length; index++) {
        const item = added[index];
        destination.push(item);
      }
    }

  };

  return NwtArrayUtils;

});
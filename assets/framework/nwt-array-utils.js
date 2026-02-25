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
      if (pos === -1) list.push(val);
      else list.splice(pos, 1);
      return list;
    }

    static repeatBy(reps = 1, val = undefined) {
      trace("NwtArrayUtils.repeatBy");
      const output = [];
      for (let index = 0; index < reps; index++) {
        output.push(val);
      }
      return output;
    }

    static pushEachInto(added, destination) {
      trace("NwtArrayUtils.pushInto");
      assertion(Array.isArray(destination), "Parameter «destination» must be array");
      assertion(Array.isArray(added), "Parameter «added» must be array");
      for (let index = 0; index < added.length; index++) {
        const item = added[index];
        destination.push(item);
      }
    }

    static includesAny(list1, list2) {
      return list1.some(x => list2.includes(x));
    }

    static getFirstIncluded(list1, list2) {
      const [small, big] = list1.length < list2.length ? [list1, list2] : [list2, list1];
      const set = new Set(big);
      return small.find(x => set.has(x));
    }

    static fromLoop([begin, end], callback) {
      const output = [];
      for(let index=begin; index<end; index++) {
        const result = callback();
        if(typeof result !== "undefined") {
          output.push(result);
        }
      }
      return output;
    }

  };

  return NwtArrayUtils;

});
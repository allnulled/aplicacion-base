/**
 * 
 * # NwtDebug
 * 
 * API para utilidades de debugging.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtDebug
 * NwtFramework.Debug
 * Vue.prototype.$nwt.Debug
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtDebug.d(...args); // solo console.log
 * NwtDebug.j(...args); // NwtUtils.stringify + console.log
 * NwtDebug.k(...args); // Object.keys + NwtUtils.stringify + console.log
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDebug'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDebug'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtDebug = class {

    static d(...args) {
      console.log(...args);
    }

    static j(...args) {
      const output = [];
      for(let index=0; index<args.length; index++) {
        const arg = args[index];
        try {
          const data = typeof arg === "string" ? arg : NwtUtils.jsonify(arg, 2);
          console.log(`[debug][global] Parameter ${index+1}/${args.length} of type ${typeof data}: ${data}`);
          output.push(data);
        } catch (error) {
          output.push(error);
          console.log(`[debug][global] Parameter ${index+1}/${args.length} could not be converted to JSON on «NwtDebug.j»`);
        }
      }
      return output;
    }

    static k(...args) {
      const output = [];
      for(let index=0; index<args.length; index++) {
        const arg = args[index];
        try {
          const keys = Object.keys(arg);
          const data = NwtUtils.jsonify(keys, 2);
          console.log(`[debug][global] Parameter ${index+1}/${args.length} of type ${typeof data}: ${data}`);
          output.push(data);
        } catch (error) {
          output.push(error);
          console.log(`[debug][global] Parameter ${index+1}/${args.length} could not infere keys on «NwtDebug.k»`);
        }
      }
      return output;
    }

  };

  return NwtDebug;

});
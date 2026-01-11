/**
 * 
 * # Nwt Utils API
 * 
 * API global de utilidades residuales.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtUtils
 * NwtFramework.Utils
 * Vue.prototype.$nwt.Utils
 * ```
 * 
 * ## Ventajas
 * 
 * Permite hacer algunas cosas como:
 * 
 * ```js
 * NwtUtils.jsonify({circular JSON is accepted too});
 * // >> "{...}"
 * 
 * NwtUtils.noop();
 * // >> undefined
 * 
 * NwtUtils.sortObjectByKeys({b:0,a:1});
 * // >> {a:1,b:0}
 * 
 * NwtUtils.filterObjectProperties({a:0,b:1,c:2}, (key, value) => ["a","b"].indexOf(key) !== -1);
 * // >> {a:0,b:1}
 * 
 * NwtUtils.extractPathsFromFiles([{path:"whatever"}]);
 * // >> ["whatever"]
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtUtils = class {

    static noop() { }

    static trify(callback, onFail) {
      try {
        return callback();
      } catch (error) {
        return onFail;
      }
    }

    static copify(data) {
      return JSON.parse(JSON.stringify(data));
    }

    static jsonify(obj, space = 2) {
      // trace("NwtUtils.jsonify");
      const seen = new WeakSet();
      return JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return undefined; // "[Circular]";
          }
          seen.add(value);
        } else if(typeof value === "function") {
          return {$type:"function",source:value.toString()};
        }
        return value;
      }, space);
    }

    static sortObjectByKeys(obj) {
      trace("NwtUtils.sortObjectByKeys");
      const sorted = {};
      const keys = Object.keys(obj).sort(); // orden alfabético estándar
      for (const key of keys) {
        sorted[key] = obj[key];
      }
      return sorted;
    }

    static filterObjectProperties(obj, filter) {
      trace("NwtUtils.filterObjectProperties");
      const keys = Object.keys(obj);
      const output = {};
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const value = obj[key];
        try {
          const result = filter(key, value);
          if(result) {
            output[key] = value;
          }
        } catch (error) {
          console.error(error);
        }
      }
      return output;
    }

    static extractPathsFromFiles(files) {
      trace("NwtUtils.extractPathsFromFiles");
      const paths = [];
      for(let index=0; index<files.length; index++) {
        const file = files[index];
        paths.push(file.path);
      }
      return paths;
    }

    static copyToClipboard(text) {
      trace("NwtUtils.copyToClipboard");
      window.navigator.clipboard.writeText(text);
      Vue.prototype.$toasts.show({
        title: "Texto copiado",
        text: "El texto fue copiado con éxito"
      });
    }

  };

  return NwtUtils;

});
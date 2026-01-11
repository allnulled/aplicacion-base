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
      trace("NwtUtils.trify");
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
        } else if (typeof value === "function") {
          return { $type: "function", source: value.toString() };
        }
        return value;
      }, space);
    }

    static getSignatureOfArray(array) {
      trace("NwtPersister.low.getSignatureOfArray");
      const signature = [];
      for(let index=0; index<array.length; index++) {
        const item = array[index];
        signature.push(typeof item);
      }
      return signature.join(",");
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
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = obj[key];
        try {
          const result = filter(key, value);
          if (result) {
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
      for (let index = 0; index < files.length; index++) {
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

    static getSurroundingLines(content, line, column, linesBefore = 3, linesAfter = 3) {
      trace("NwtUtils.getSurroundingLines");
      try {
        const lines = content.split(/\r?\n/);
        const start = Math.max(0, line - 1 - linesBefore);
        const end = Math.min(lines.length, line + linesAfter);
        const result = [];
        for (let i = start; i < end; i++) {
          const lineNumber = i + 1;
          let text = lines[i];
          if (lineNumber === line) {
            result.push(`!${column}:${lineNumber.toString().padStart(8 - (column+"").length)} | ${text}`);
          } else {
            result.push(`${lineNumber.toString().padStart(10)} | ${text}`);
          }
        }
        return result;
      } catch (err) {
        return [`Error leyendo archivo: ${err.message}`];
      }
    }

  };

  return NwtUtils;

});
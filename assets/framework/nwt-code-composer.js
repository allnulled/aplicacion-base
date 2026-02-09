/**
 * 
 * # Nwt Code Composer
 * 
 * API para componer fragmentos de JavaScript para plantillas y código.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtCodeComposer
 * NwtFramework.CodeComposer
 * Vue.prototype.CodeComposer
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtCodeComposer.getBlankFunctionBody(fn)
 * NwtCodeComposer.getBlankFunctionBodies([fn,fn,fn])
 * NwtCodeComposer.createAsyncFunction(js, argnames = [])
 * NwtCodeComposer.createSyncFunction(js, argnames = [])
 * NwtCodeComposer.createFunctionByBodies([fn,fn,fn])
 * ```
 * 
 */

(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCodeComposer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCodeComposer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCodeComposer = class {

    static ctrl = {
      Return: class extends NwtJsReturnController { },
      Throw: class extends NwtJsController { },
    };

    static loadBeautifyJs() {
      return NwtLazyLoader.loadJsBeautify();
    }

    static defaultBeautifyJsOptions = {
      indent_size: 1,
      preserve_newlines: false,
    };

    static beautifyJs(code, userOptions = {}) {
      trace("NwtCodeComposer.beautifyJs");
      if ((typeof window === "undefined") || (typeof window.beautifier === "undefined")) {
        return code;
      }
      const options = Object.assign({}, this.defaultBeautifyJsOptions, userOptions);
      return window.beautifier.js(code, options);
    }

    static RX_ARROW_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*\([ \t\r\n]*(\.\.\.[A-Za-z_$][\w$]+)?[ \t\r\n]*\)[ \t\r\n]*=>[ \t\r\n]*/;

    static RX_FUNCTION_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*function[ \t\r\n]*(anonymous[ \t\r\n]*)?\([ \t\r\n]*((\.\.\.[A-Za-z_$][\w$]+)?)[ \t\r\n]*\)[ \t\r\n]*/;

    static RX_METHOD_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*[A-Za-z_$][\w$]+[ \t\r\n]*\([ \t\r\n]*((\.\.\.[A-Za-z_$][\w$]+)?)[ \t\r\n]*\)[ \t\r\n]*/;

    static RX_TRAILING_BRACE = /[ \t\r\n]*\}[ \t\r\n]*$/;

    static injectLinesToString(txt) {
      trace("NwtCodeComposer.injectLinesToString");
      assertion(typeof txt === "string", "Parameter «txt» must be a strong on «NwtCodeComposer.injectLinesToString»");
      const lines = txt.split(/\n/g);
      let output = "";
      for(let index=0; index<lines.length; index++) {
        const line = lines[index];
        if(index !== 0) {
          output += "\n";
        }
        output += ("" + index).padStart(4,"0");
        output += " | ";
        output += line;
      }
      return output;
    }

    static createAsyncFunction(js, argnames = []) {
      trace("NwtCodeComposer.createAsyncFunction");
      assertion(typeof js === "string", "Parameter «js» must be a string on «NwtCodeComposer.createAsyncFunction»");
      assertion(Array.isArray(argnames), "Parameter «argnames» must be an array on «NwtCodeComposer.createAsyncFunction»");
      const AsyncFunction = (async function () { }).constructor;
      try {
        console.log(`[nwt-code-composer][compiled][async]\n\nfunction: ${argnames.join(", ")}\n\n${ js }\n\n`);
        const jsBeautified = this.beautifyJs(js);
        console.log(`[nwt-code-composer][compiled][async]\n\nbeauty function: ${argnames.join(", ")}\n\n${ jsBeautified }\n\n`);
        const asyncFunction = new AsyncFunction(...argnames, jsBeautified);
        return asyncFunction;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    static createSyncFunction(js, argnames = []) {
      trace("NwtCodeComposer.createSyncFunction");
      assertion(typeof js === "string", "Parameter «js» must be a string on «NwtCodeComposer.createSyncFunction»");
      assertion(Array.isArray(argnames), "Parameter «argnames» must be an array on «NwtCodeComposer.createSyncFunction»");
      try {
        console.log(`[nwt-code-composer][compiled][sync]\n\nfunction: ${argnames.join(", ")}\n\n${ js }\n\n`);
        const jsBeautified = this.beautifyJs(js);
        console.log(`[nwt-code-composer][compiled][sync]\n\nbeauty function: ${argnames.join(", ")}\n\n${ jsBeautified }\n\n`);
        const syncFunction = new Function(...argnames, js);
        return syncFunction;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    static getBlankFunctionBodies(allFns) {
      trace("NwtCodeComposer.getBlankFunctionBodies");
      let output = "";
      for (let index = 0; index < allFns.length; index++) {
        const fnOrString = allFns[index];
        const result = this.getBlankFunctionBody(fnOrString);
        output += result;
        output += "\n";
      }
      return output;
    }

    static getBlankFunctionBody(fnUser) {
      trace("NwtCodeComposer.getBlankFunctionBody");
      if (fnUser === false) {
        return "";
      } else if (typeof fnUser === "function") {
        // @OK, handled later.
      } else if (typeof fnUser === "string") {
        // @OK, handled later.
      } else if (typeof fnUser === "object") {
        throw new Error("Not supported object type on «NwtCodeComposer.getBlankFunctionBody»");
      } else {
        throw new Error(`Not supported «${typeof fnUser}» type on «NwtCodeComposer.getBlankFunctionBody»`);
      }
      let s = typeof fnUser === "function" ? fnUser.toString().trim() : fnUser.trim();
      // 1. quitar wrapper arrow o function
      let isArrowPrefix = false;
      let isMethodPrefix = false;
      s = s.replace(this.RX_FUNCTION_PREFIX, "");
      s = s.replace(this.RX_ARROW_PREFIX, () => {
        isArrowPrefix = true;
        return "";
      });
      s = s.replace(this.RX_METHOD_PREFIX, () => {
        isMethodPrefix = true;
        return "";
      });
      // 2. si empieza con "{", quitarlo
      let hasOpeningBrace = isMethodPrefix;
      if (s.startsWith("{")) {
        hasOpeningBrace = true;
        s = s.slice(1).trimStart();
      } else if (isArrowPrefix) {
        s = "return " + s;
      }
      // 3. solo si había "{", quitar "}" final
      if (hasOpeningBrace) {
        s = s.replace(this.RX_TRAILING_BRACE, "");
      }
      s = this.beautifyJs(s);
      return s;
    }

    static createFunctionByBodies(fns, argnames = [], isAsync = true) {
      trace("NwtCodeComposer.createFunctionByBodies");
      const source = this.getBlankFunctionBodies(fns);
      return isAsync ? this.createAsyncFunction(source, argnames) : this.createSyncFunction(source, argnames);
    }


  };

  return NwtCodeComposer;

});
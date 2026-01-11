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

    static beautifyJs(code, options = {}) {
      trace("NwtCodeComposer.beautifyJs");
      if ((typeof window === "undefined") || (typeof window.beautifier === "undefined")) {
        return code;
      }
      return window.beautifier.js(code, options);
    }

    static RX_ARROW_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*\([ \t\r\n]*(\.\.\.[A-Za-z_$][\w$]+)?[ \t\r\n]*\)[ \t\r\n]*=>[ \t\r\n]*/;

    static RX_FUNCTION_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*function[ \t\r\n]*(anonymous[ \t\r\n]*)?\([ \t\r\n]*((\.\.\.[A-Za-z_$][\w$]+)?)[ \t\r\n]*\)[ \t\r\n]*/;

    static RX_METHOD_PREFIX = /^[ \t\r\n]*(async)?[ \t\r\n]*[A-Za-z_$][\w$]+[ \t\r\n]*\([ \t\r\n]*((\.\.\.[A-Za-z_$][\w$]+)?)[ \t\r\n]*\)[ \t\r\n]*/;

    static RX_TRAILING_BRACE = /[ \t\r\n]*\}[ \t\r\n]*$/;

    static createAsyncFunction(js) {
      const AsyncFunction = (async function () { }).constructor;
      try {
        const asyncFunction = new AsyncFunction(js);
        return asyncFunction;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    static defaultInterlude = async function () {

    }

    static blankFunction = {
      getBodyOnly: (fnUser) => {
        if (fnUser === false) return "";
        else if (typeof fnUser === "function") { }
        else if (typeof fnUser === "string") { }
        else if (typeof fnUser === "object") {
          if (!Array.isArray(fnUser)) {
            return this.blankFunction.getBodyOnly(this.composeFunctionByFunctions(fnUser.composition, fnUser.parameters || undefined, fnUser.settings || {}));
          }
          return this.blankFunction.getBodyOnly(this.composeFunctionByFunctions(fnUser));
        }
        else {
          throw new Error("Not supported type on «blankFunction.getBodyOnly»");
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
      },
      toInjection: (list) => {
        if(!list.length) return "";
        let output = "";
        for (let index = 0; index < list.length; index++) {
          const item = list[index];
          const [key, value] = item;
          output += `let `;
          output += `${key}`;
          output += ` = `;
          if(typeof value === "string") {
            output += `${value};`;
          } else {
            output += `${JSON.stringify(value)};`;
          }
          output += "\n";
        }
        return output;
      },
      toTryCatch: (options = {}) => {
        const { injection = [], onStart = false, onTry = false, onSuccess = false, onFinally = false, onError = false, onInterlude = false } = options;
        let output = "";
        if (options.injection) {
          output += this.blankFunction.toInjection(injection);
        }
        output += `${this.blankFunction.getBodyOnly(onStart)}\n`;
        output += `try {\n`;
        output += `  ${this.blankFunction.getBodyOnly(onTry)}\n`;
        output += `  ${this.blankFunction.getBodyOnly(onSuccess)}\n`;
        output += `} catch(error) {\n`;
        output += `  ${this.blankFunction.getBodyOnly(onError) || "throw error;\n"}`;
        output += `} finally {\n`;
        output += `  ${this.blankFunction.getBodyOnly(onFinally)}`;
        output += `}`;
        return output;
      },
      toEach: (options = {}) => {
        const { injection = [], onStart = false, onCondition = false, onIteration = false, onProgression = false, onLineProgression = false, onSuccess = false, onFinally = false, onError = false, onInterlude = false } = options;
        let output = "";
        output += `Scope_of_while_${NwtRandomizer.fromAlphabet(10)}: {\n`;
        if (options.injection) {
          output += this.blankFunction.toInjection(injection);
        }
        output += `  try {\n`;
        output += `    const dimensionLine = dimensionMatrix[dimensionIndex];\n`;
        output += `    let lineIndex = 0;\n`;
        output += `    while(${this.blankFunction.getBodyOnly(onCondition)}) {\n`;
        output += `      while(lineIndex < dimensionLine.length) {\n`;
        output += `        ${this.blankFunction.getBodyOnly(onStart)}\n`;
        output += `        Inner_scope_of_while_${NwtRandomizer.fromAlphabet(10)}: {\n`;
        output += `          ${this.blankFunction.getBodyOnly(onIteration)}\n`;
        output += `          ${this.blankFunction.getBodyOnly(onInterlude)}\n`;
        output += `          ${this.blankFunction.getBodyOnly(onLineProgression || "lineIndex++;")}\n`;
        output += `        }\n`;
        output += `      }\n`;
        output += `      ${this.blankFunction.getBodyOnly(onProgression) || "dimensionIndex++;"}\n`;
        output += `    }`;
        output += `    ${this.blankFunction.getBodyOnly(onSuccess)}\n`;
        output += `  } catch(error) {\n`;
        output += `    ${this.blankFunction.getBodyOnly(onError) || "throw error;\n"}`;
        output += `  } finally {\n`;
        output += `    ${this.blankFunction.getBodyOnly(onFinally)}\n`;
        output += `  }\n`;
        output += `}`;
        return output;
      }
    }

    static composeFunctionByFunctions(fns, ...args) {
      trace("NwtCodeComposer.composeFunctionByFunctions");
      const argf = Array.from(args);
      const lastItem = argf[args.length-1];
      const options = typeof lastItem === "object" && (!(Array.isArray(lastItem))) ? argf.pop() : {};
      const parameters = argf.concat([]);
      let script = "";
      for (let indexFunction = 0; indexFunction < fns.length; indexFunction++) {
        const fnOrString = fns[indexFunction];
        const fnBody = this.blankFunction.getBodyOnly(fnOrString);
        script += fnBody + "\n";
        if (options.onInterlude) {
          script += this.blankFunction.getBodyOnly(options.onInterlude);
        }
      }
      let output = "";
      Wrap_output: {
        if (!parameters.length) {
          output = this.blankFunction.toTryCatch({
            onStart: options.onStart,
            onTry: script,
            onSuccess: options.onSuccess,
            onError: options.onError,
            onFinally: options.onFinally,
            onInterlude: options.onInterlude,
          });
        } else {
          output = this.blankFunction.toEach({
            onStart: () => { },
            onCondition: () => { dimensionIndex < dimensionMatrix.length },
            onIteration: script,
            onProgression: () => { dimensionIndex++; },
            onLineProgression: () => { lineIndex++; },
            onSuccess: options.onSuccess,
            onError: options.onError,
            onFinally: options.onFinally,
            onInterlude: options.onInterlude,
            injection: [
              ["dimensionIndex", 0],
              ["dimensionMatrix", parameters],
            ],
          });
        }
      }
      output = this.beautifyJs(output);
      console.log(output);
      return this.createAsyncFunction(output, parameters);
    }


  };

  return NwtCodeComposer;

});
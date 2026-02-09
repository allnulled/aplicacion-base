/**
 * 
 * # NwtErrorsManager
 * 
 * API para gestión GLOBAL de errores.
 * 
 * CUIDADO: Solo instanciar 1 vez en toda la aplicación. Actualmente se instancia por `<common-errors />`
 * 
 * ## Exposición
 * 
 * ```js
 * NwtErrorsManager
 * NwtFramework.ErrorsManager
 * Vue.prototype.$nwt.ErrorsManager
 * ```
 * 
 * ## Ventajas
 * 
 * Tiene varias utilidades internas. Pero la utilidad pública principal es:
 * 
 * ```js
 * NwtErrorsManager.global.showError(new Error("Whatever"));
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtErrorsManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtErrorsManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtErrorsManager = class {

    static create(...args) {
      trace("NwtErrorsManager.create");
      return new this(...args);
    }

    constructor(htmlElement = false) {
      trace("NwtErrorsManager.constructor");
      this.isDebugging = false;
      this.htmlElement = htmlElement;
      this.errors = [];
      this.loopbroker = undefined;
      this.state = "stopped";
    }

    debug(...args) {
      if(this.isDebugging) {
        console.log("[debug][errors-manager]", ...args);
      }
    }

    inspect(...args) {
      for(let index=0; index<args.length; index++) {
        const arg = args[index];
        console.log(`Tipo ${typeof arg}:`, arg);
      }
    }

    async initialize() {
      trace("NwtErrorsManager.prototype.initialize");
      this.debug("step1");
      if(!NwtEnvironment.hasWindow) {
        this.debug("step2");
        return -1; // @EXIT -1 === it is node
      }
      this.debug("step3");
      assertion(this.htmlElement instanceof HTMLElement, "Parameter «htmlElement» must be instance of HTMLElement on «NwtErrorsManager.initialize»");
      this.debug("step4");
      Export_first_instance_to_global: {
        if(NwtErrorsManager.global && (NwtErrorsManager.global.state !== "stopped")) {
          this.debug("step5");
          return -2; // @EXIT -2 === it is singleton and is initializing
        }
        this.debug("step6");
        NwtGlobalizer.exportTo("CommonErrors", this);
        NwtGlobalizer.exportTo("NwtErrors", this);
        NwtErrorsManager.global = this;
        this.debug("step7");
      }
      Vue.prototype.$errors = this;
      Bind_error_handlers: {
        // For assertions globally:
        assertion.setErrorCallback(error => this.showError(error));
        // For vue errors globally:
        //*
        this.debug("step8");
        const globalErrorVueHandler = (...args) => {
          this.debug(1);
          const [errorOrWarn, component, stack, ...others] = args;
          this.debug(2, errorOrWarn);
          let error = undefined;
          if (errorOrWarn instanceof Error) {
            this.debug(3);
            error = errorOrWarn;
            if(stack) {
              error.injectedStack = stack;
            }
          } else {
            this.debug(4);
            error = new Error(`On component «${component?.$options?._componentTag}»: ${errorOrWarn}`);
            if (typeof stack === "string") {
              this.debug(5);
              error.injectedStack = stack;
            } else {
              this.debug(6);
            }
          }
          if(this.isErrorDuplicated(error)) return false;
          this.debug(7);
          this.inspect(error instanceof Error);
          this.inspect(error, component);
          NwtErrorsManager.expandError(error, {
            byComponent: component?.$options?._componentTag || component,
          });
          this.debug(8);
          this.showError(error);
        };
        this.debug("step9");
        Vue.config.errorHandler = globalErrorVueHandler;
        this.debug("step10");
        Vue.config.warnHandler = globalErrorVueHandler;
        this.debug("step11");
        window.addEventListener("error", (event) => {
          const error = new Error(event.message);
          this.showError(event.error || error);
          console.error(error);
        });
        window.addEventListener("unhandledrejection", (event) => {
          const error = new Error(event.reason);
          // @DECIDED: mejor sí lanzar error gráfico cada vez que se escapa una promise rota
          this.showError(error);
          console.error(error);
        });
        Load_dist_source_once: {
          await NwtStrings.getDistJsSource();
          this.debug("step13");
        }
      }
      this.state = "initialized";
      return this;
    }

    isErrorDuplicated(error) {
      trace("NwtErrorsManager.prototype.isErrorDuplicated");
      const repeated = this.errors.filter(actualError => {
        return (error.name === actualError.name) && (error.message === actualError.message);
      });
      if (repeated.length) {
        console.error(`Repeating error: [${error.name}] ${error.message}`);
        return true;
      }
      return false;
    }

    showError(error) {
      trace("NwtErrorsManager.prototype.showError");
      Securers: {
        if (this.isErrorDuplicated(error)) return false;
        console.error("showError:", error);
        if (this.errors.length >= 50) return false;
      }
      this.errors.push(error);
      this.reload();
    }

    clearErrors() {
      trace("NwtErrorsManager.prototype.clearErrors");
      this.errors = [];
      this.reload();
    }

    clearError(pos) {
      trace("NwtErrorsManager.prototype.clearError");
      this.errors.splice(pos, 1);
      this.reload();
    }

    async reload() {
      trace("NwtErrorsManager.prototype.reload");
      const { html, js } = await this.utils.formatErrorsToHtmlAndJs();
      this.htmlElement.innerHTML = html;
      await js(this.errors, this);
    }

    utils = {
      formatErrorsToHtmlAndJs: async () => {
        trace("NwtErrorsManager.prototype.utils.formatErrorsToHtmlAndJs");
        const html = await NwtTemplates.global.render.ejs.file("nwt/nwt-errors-manager/viewer/template.html", this);
        const jsSource = await NwtFilesystem.readFile(NwtTemplates.global.resolve("nwt/nwt-errors-manager/viewer/template.js"));
        const js = NwtImporter.asyncFactory(jsSource, ["errors", "manager"]);
        return { html, js };
      },
      formatErrorsToText: () => {
        trace("NwtErrorsManager.prototype.utils.formatErrorsToText");
        let text = "";
        for (let index = 0; index < this.errors.length; index++) {
          const error = this.errors[index];
          if (error instanceof Error) {
            this.constructor.expandError(error);
            text += `Error ${index}:\n`;
            text += error.name + "\n";
            text += error.message + "\n";
            if (error.expandedStack) {
              text += NwtUtils.jsonify(error.expandedStack, 2) + "\n";
            } else {
              text += error.stack + "\n";
            }
          } else {
            text += `Error ${index}:\n`;
            text += error;
          }
        }
        return text;
      }
    };

    static expandError(errorInput, overriders = false) {
      trace("NwtUtils.expandError");
      console.error("expandError", errorInput);
      Securers: {
        // Por si aún no está cargado:
        if (!this.errors) return false;
        // Por si está overfloodeado:
        if (this.errors.length >= 50) return false;
      }
      if (overriders) {
        assertion(typeof overriders === "object", "Required parameter «overriders» to be object on «NwtErrorsManager.expandError»");
      }
      if (errorInput.stack) {
        errorInput.expandedStack = this.parseStackTrace(errorInput.stack);
      }
      if (overriders) {
        Object.assign(errorInput, overriders);
      }
      return errorInput;
    }

    static parseStackTrace(stack) {
      trace("NwtUtils.parseStackTrace");
      return stack.split("\n").map(line => {
        const m = line.match(/at\s+(.*?)\s+\((.*):(\d+):(\d+)\)/);
        let missing = false;
        if (!m) missing = "*";
        else if (!m[1]) missing = 1;
        else if (!m[2]) missing = 2;
        else if (!m[3]) missing = 3;
        else if (!m[4]) missing = 4;
        if (missing !== false) {
          console.log(`Missing factor ${missing}`);
          return line;
        }
        const info = {
          function: m[1],
          file: m[2],
          line: Number(m[3]),
          column: Number(m[4]),
        };
        if (info.file.trim().endsWith("/assets/dist.js")) {
          info.fragment = NwtStrings.getSurroundingLinesFromDistJs(info);
        }
        return info;
        return `on ${info.function}@${info.file}:${info.line}:${info.column} [${info.fragment}]`;
      });
    }

  };

  if(NwtEnvironment.hasWindow) {
    window.addEventListener("load", function() {
      const errormanagerElement = document.querySelector("#errorsmanager");
      NwtErrorsManager.global = NwtErrorsManager.create(errormanagerElement);
      NwtErrorsManager.global.initialize().then(() => {
        trace("NwtErrorsManager.global.onInitialized");
      });
    });
  }

  return NwtErrorsManager;

});
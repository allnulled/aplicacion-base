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

    constructor(vueComponent = false) {
      trace("NwtErrorsManager.constructor");
      assertion(vueComponent instanceof Vue, "Parameter «vueComponent» must be instance of Vue on «NwtErrorsManager.constructor»");
      this.vueComponent = vueComponent;
      this.htmlElement = vueComponent.$el;
      this.errors = [];
      this.loopbroker = undefined;
    }

    triggerLoopbroker() {
      trace("NwtErrorsManager.prototype.triggerLoopbroker");
      clearTimeout(this.loopbroker);
      this.loopbroker = setTimeout(() => {

      }, 1000);
    }

    async initialize() {
      trace("NwtErrorsManager.prototype.initialize");
      assertion(this.htmlElement instanceof HTMLElement, "Parameter «htmlElement» must be instance of HTMLElement on «NwtErrorsManager.initialize»");
      NwtGlobalizer.exportTo("CommonErrors", this);
      NwtGlobalizer.exportTo("NwtErrors", this);
      Vue.prototype.$errors = this;
      Bind_error_handlers: {
        // For assertions globally:
        assertion.setErrorCallback(error => this.showError(error));
        // For vue errors globally:
        //*
        const globalErrorHandler = (...args) => {
          const [errorOrWarn, component, stack, ...others] = args;
          let error = undefined;
          if (errorOrWarn instanceof Error) {
            error = errorOrWarn;
          } else {
            error = new Error(`On component «${component?.$options?._componentTag}»: ${errorOrWarn}`);
            if (typeof stack === "string") {
              error.injectedStack = stack;
            }
          }
          if(this.isErrorDuplicated(error)) return false;
          NwtErrorsManager.expandError(error, {
            byComponent: component?.$options?._componentTag || component,
          });
          this.showError(error);
        };
        Vue.config.errorHandler = globalErrorHandler;
        Vue.config.warnHandler = globalErrorHandler;
        window.addEventListener("error", (event) => {
          const error = new Error(event.message);
          this.showError(event.error || error);
          console.error(error);
        });
        window.addEventListener("unhandledrejection", (event) => {
          const error = new Error(event.reason);
          this.showError(error);
          console.error(error);
        });
        Load_dist_source_once: {
          await NwtStrings.getDistJsSource();
        }
      }
      return this;
    }

    isErrorDuplicated(error) {
      trace("NwtErrorsManager.prototype.isErrorDuplicated");
      const repeated = NwtErrors.errors.filter(actualError => error.name === actualError.name && error.message === actualError.message);
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
        if (NwtErrors.errors.length >= 50) return false;
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
        if (NwtErrors.errors.length >= 50) return false;
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
          info.fragment = NwtStrings.printSurroundingLinesFromDistJs(info);
        }
        return info;
        return `on ${info.function}@${info.file}:${info.line}:${info.column} [${info.fragment}]`;
      });
    }

  };

  return NwtErrorsManager;

});
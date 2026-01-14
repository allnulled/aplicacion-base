/**
 * 
 * # NwtFilePersister
 * 
 * API para persistencia de ficheros.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFilePersister
 * NwtFramework.FilePersister
 * Vue.prototype.$nwt.FilePersister
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * await NwtFilePersister.has(file:String)
 * await NwtFilePersister.init(file:String, content:String);
 * await NwtFilePersister.get(file:String);
 * await NwtFilePersister.set(file:String, content:String);
 * await NwtFilePersister.delete(file:String);
 * ```
 * 
 * Esta API solo atacará a ficheros, no a directorios, ni a JSONs. Por eso, `content` debe ser un String siempre.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFilePersister'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFilePersister'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFilePersister = class {

    static noop = () => {};

    static get assertion() {
      return typeof assertion === "function" ? assertion : (condition, errorMessage) => {
        if (!condition) {
          throw new Error(errorMessage);
        }
      };
    }

    static get trace() {
      return typeof trace === "function" ? trace : (traceMessage) => {
        console.log("[trace][local] " + traceMessage);
      };
    }

    static low = {
      availableOperations: ["get", "set", "has", "init", "delete"],
      default: {
        settings: {
          file: undefined,
          hooks: {},
          value: undefined,
        },
        hooks: {
          onFileError: this.noop,
          onError: (e) => { throw e },
        },
      },
      extractSettingsFromArgsAndOperation: (args, operation) => {
        const settings = { operation };
        let argsDone = 0;
        this.assertion(typeof args[argsDone] === "string", `Argument «${argsDone}» must be string on «NwtFilePersister.${operation}»`);
        settings.file = args[argsDone++];
        if (operation === "get" && typeof args[argsDone] !== "undefined") {
          settings.defaultReturn = args[argsDone++];
        }
        if (["set", "init"].includes(operation)) {
          this.assertion(typeof args[argsDone] === "string", `Argument «${argsDone}» must be string on «NwtFilePersister.${operation}»`);
          settings.value = args[argsDone++];
        }
        this.assertion(argsDone === args.length, `Argument «${argsDone + 1}» is not accepted on «NwtFilePersister.${operation}»`);
        return settings;
      }
    };

    static async iterate(settings = {}) {
      const fs = require("fs");
      const { operation, file, hooks, value, defaultReturn } = Object.assign({}, this.low.default.settings, settings);
      const { onFileError, onError } = Object.assign({}, this.low.default.hooks, hooks);
      try {
        if (operation === "get") {
          try {
            return await fs.promises.readFile(file, "utf8");
          } catch (error) {
            if (typeof defaultReturn !== "undefined") return defaultReturn;
            throw error;
          }
        }
        if (operation === "has") {
          try {
            const lstat = await fs.promises.lstat(file);
            return lstat.isFile();
          } catch {
            return false;
          }
        }
        if (operation === "set") {
          await fs.promises.writeFile(file, value, "utf8");
          return true;
        }
        if (operation === "init") {
          try {
            const content = await fs.promises.readFile(file, "utf8");
            return content;
          } catch {
            await fs.promises.writeFile(file, value ?? "", "utf8");
            return value ?? "";
          }
        }
        if (operation === "delete") {
          try {
            await fs.promises.unlink(file);
            return true;
          } catch {
            return false;
          }
        }
        throw new Error(`Unknown operation «${operation}» on «NwtFilePersister.iterate»`);
      } catch (error) {
        await onFileError(error);
        await onError(error);
      }
      throw new Error("At this point, the operation should have returned already on «NwtFilePersister.iterate»");
    }

    static has(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "has"));
    }
    static init(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "init"));
    }
    static get(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "get"));
    }
    static set(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "set"));
    }
    static delete(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "delete"));
    }

  };

  return NwtFilePersister;
});

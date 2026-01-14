/**
 * 
 * # NwtDirectoryPersister
 * 
 * API para persistencia de directorios.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtDirectoryPersister
 * NwtFramework.DirectoryPersister
 * Vue.prototype.$nwt.DirectoryPersister
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Métodos principales:
 * await NwtDirectoryPersister.has(directory:String); // returns Boolean
 * await NwtDirectoryPersister.init(directory:String); // mkdir si no existe ya
 * await NwtDirectoryPersister.get(directory:String); // devuelve los nombres de los nodos (fichero o directorio) de dentro
 * await NwtDirectoryPersister.set(directory:String); // mkdir
 * await NwtDirectoryPersister.delete(directory:String); // rmdir (no recursivo)
 * // Métodos drásticos:
 * await NwtDirectoryPersister.ensure(directory:String); // ensureDirectory, crea todos los nodos necesarios y el directorio final
 * await NwtDirectoryPersister.destroy(directory:String); // rmdir (recursivamente)
 * ```
 * 
 * Como mucho, esta API creará o destruirá un directorio, por lo cual no hay más argumentos que la ruta al directorio.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDirectoryPersister'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDirectoryPersister'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtDirectoryPersister = class {

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
          directory: undefined,
          hooks: {},
        },
        hooks: {
          onDirectoryError: this.noop,
          onError: (e) => { throw e },
        },
      },
      extractSettingsFromArgsAndOperation: (args, operation) => {
        const settings = { operation };
        let argsDone = 0;
        this.assertion(typeof args[argsDone] === "string", `Operation «${operation}» requires «directory» as first argument on «NwtDirectoryPersister»`);
        settings.directory = args[argsDone++];
        this.assertion(argsDone === args.length, `Operation «${operation}» does not admit more parameters on «NwtDirectoryPersister»`);
        return settings;
      }

    };

    static async iterate(settings = {}) {
      const fs = require("fs");
      const path = require("path");
      const { operation, directory, hooks } = Object.assign({}, this.low.default.settings, settings);
      const { onDirectoryError, onError } = Object.assign({}, this.low.default.hooks, hooks);
      try {
        if (operation === "get") {
          return await fs.promises.readdir(directory);
        }
        if (operation === "has") {
          try {
            const stat = await fs.promises.stat(directory);
            return stat.isDirectory();
          } catch {
            return false;
          }
        }
        if (operation === "set") {
          await fs.promises.mkdir(directory);
          return true;
        }
        if (operation === "init") {
          let stat = undefined;
          try {
            stat = await fs.promises.stat(directory);
          } catch {}
          if(typeof stat === "undefined") {
            await fs.promises.mkdir(directory);
            return true;
          } else if(stat.isDirectory()) {
            return false;
          } else {
            throw new Error(`Path «${directory}» exists but it is a file already on «NwtDirectoryPersister.${operation}»`);
          }
        }
        if (operation === "ensure") {
          let stat = undefined;
          try {
            stat = await fs.promises.stat(directory);
          } catch {}
          if(typeof stat === "undefined") {
            await fs.promises.mkdir(directory, { recursive: true });
            return true;
          } else if(stat.isDirectory()) {
            return false;
          } else {
            throw new Error(`Path «${directory}» exists but it is a file already on «NwtDirectoryPersister.${operation}»`);
          }
        }
        if (operation === "delete") {
          try {
            await fs.promises.rm(directory);
            return true;
          } catch {
            return false;
          }
        }
        if (operation === "destroy") {
          try {
            await fs.promises.rm(directory, { recursive: true, force: true });
            return true;
          } catch {
            return false;
          }
        }
        throw new Error(`Unknown operation «${operation}» on «NwtDirectoryPersister.${operation}»`);
      } catch (error) {
        await onDirectoryError(error);
        await onError(error);
      }
      throw new Error(`At this point, the operation should have returned already on «NwtDirectoryPersister.${operation}»`);
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

    static ensure(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "ensure"));
    }

    static destroy(...args) {
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "destroy"));
    }

  };

  return NwtDirectoryPersister;

});
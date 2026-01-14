/**
 * 
 * # NwtJsonPersister
 * 
 * API para la persistencia de ficheros JSON.
 * 
 * ## Exposición
 * 
 * ```js
 * await NwtJsonPersister.has(base:String|Object|Function, propertyPath:Array);
 * await NwtJsonPersister.init(base:String|Object|Function, propertyPath:Array, value:any);
 * await NwtJsonPersister.get(base:String|Object|Function, propertyPath:Array);
 * await NwtJsonPersister.set(base:String|Object|Function, propertyPath:Array, value:any);
 * await NwtJsonPersister.delete(base:String|Object|Function, propertyPath:Array)
 * ```
 * 
 * En cuanto a `base`:
 * 
 * - Cuando `base` es un String, se considera como ruta del fichero.
 * - Cuando `base` es Object o Function, se considera ese como los datos de base.
 * 
 * En cuanto a `propertyPath`:
 * 
 * - Se espera un `Array<String>` con el índice de los nombres de las propiedades del JSON.
 *    - Si das `["items", "0", "subitems"]` apuntas a `jsonData.items["0"].subitems`
 * - Si omites `propertyPath`, estás apuntando al fichero entero.
 * 
 * En cuanto a `value`, se espera el valor a establecer en los casos de `set` e `init`.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsonPersister'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsonPersister'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsonPersister = class {

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
      availableOperations: [
        "get",
        "set",
        "has",
        "init",
        "delete",
      ],
      noop: () => { },
      default: {
        settings: {
          file: undefined,
          prop: undefined,
          hooks: {},
          dataset: undefined,
        },
        hooks: {
          onFileError: this.noop,
          onJsonError: this.noop,
          onPropertyError: this.noop,
          onError: (error, ctx) => { throw error },
        },
      },
      persistJson: async (file, data, softly = false) => {
        this.trace("NwtJsonPersister.persistJson");
        const fs = require("fs");
        if(softly) {
          const lstat = await fs.promises.lstat(file);
          if(lstat.isFile()) {
            return false;
          }
        }
        await fs.promises.writeFile(file, JSON.stringify(data, null, 2), "utf8");
        return true;
      },
      async deleteFileOrDirectory(file) {
        this.trace("NwtJsonPersister.deleteFileOrDirectory");
        const fs = require("fs");
        const fileStat = await fs.promises.lstat(file);
        const isFile = fileStat.isFile();
        const isDirectory = fileStat.isDirectory();
        if (isFile) {
          return fs.promises.unlink(file);
        } else if (isDirectory) {
          return fs.promises.rmdir(file);
        } else {
          throw new Error(`File at «${file}» is not a file nor a directory on «NwtJsonPersister.deleteFileOrDirectory»`);
        }
      },
      extractSettingsFromArgsAndOperation: (args, operation) => {
        this.trace("NwtJsonPersister.extractSettingsFromArgsAndOperation");
        const settings = { operation };
        this.assertion(args.length > 0, `Operation «${operation}» needs more than 0 arguments on «NwtJsonPersister.${operation}»`);
        let argsDone = 0;
        File_and_prop: {
          if (typeof args[0] === "string") {
            settings.file = args[0];
            settings.dataset = undefined;
            settings.prop = undefined;
            argsDone++;
          } else if ((typeof args[0] === "object") || (typeof args[0] === "function")) {
            settings.file = undefined;
            settings.dataset = args[0];
            settings.prop = undefined;
            argsDone++;
          }
          const nextPos = 0 + argsDone;
          if(Array.isArray(args[nextPos])) {
            settings.prop = args[nextPos];
            argsDone++;
          }
          this.assertion(typeof settings.file !== "undefined" || typeof settings.dataset !== "undefined", `Parameter «settings.file» or «settings.dataset» must be defined on «NwtJsonPersister.${operation}»`);
        }
        Specific_operation_checks: {
          const hasEnoughInputs = typeof settings.prop !== "undefined" || typeof settings.file !== "undefined" || typeof settings.dataset !== "undefined";
          if (["has"].indexOf(operation) !== -1) {
            this.assertion(args.length >= argsDone, `Operation «${operation}» does not admit more parameters on «NwtJsonPersister.${operation}»`);
            this.assertion(hasEnoughInputs, `Operation «${operation}» requires «settings.prop» or «settings.file» or «settings.dataset» to be defined on «NwtJsonPersister.${operation}»`);
          }
          if (["get"].indexOf(operation) !== -1) {
            if (typeof args[argsDone] !== "undefined") {
              settings.defaultReturn = args[argsDone];
              argsDone++;
            }
            this.assertion(hasEnoughInputs, `Operation «${operation}» requires «settings.prop» or «settings.file» or «settings.dataset» to be defined on «NwtJsonPersister.${operation}»`);
          }
          if (["set", "init"].indexOf(operation) !== -1) {
            this.assertion(typeof args[argsDone] !== "undefined", `Operation «${operation}» requires «arguments[${argsDone}]» to be defined on «NwtJsonPersister.${operation}»`);
            settings.value = args[argsDone];
            argsDone++;
            this.assertion(hasEnoughInputs, `Operation «${operation}» requires «settings.prop» or «settings.file» or «settings.dataset» to be defined on «NwtJsonPersister.${operation}»`);
          }
        }
        return settings;
      }
    }

    static async iterate(settings = {}) {
      this.trace("NwtJsonPersister.iterate");
      const { operation, file, prop, hooks, dataset, value } = Object.assign({}, this.low.default.settings, settings);
      const hasProp = Array.isArray(prop);
      const hasFile = typeof file === "string";
      const hasData = typeof dataset === "function" || typeof dataset === "object";
      this.assertion(typeof operation === "string", "Parameter «operation» must be string on «NwtJsonPersister.iterate»");
      this.assertion(this.low.availableOperations.indexOf(operation) !== -1, "Parameter «operation» must match any of the available operations on «NwtJsonPersister.iterate»");
      this.assertion(hasFile || hasData || hasProp, "Parameter «settings.prop» must be array or «settings.file» string or «settings.dataset» function or object on «NwtJsonPersister.iterate»");
      this.assertion(typeof hooks === "object", "Parameter «settings.hooks» must be object on «NwtJsonPersister.iterate»");
      const { onFileError, onPropertyError, onJsonError, onError } = Object.assign({}, this.low.default.hooks, hooks);
      this.assertion(typeof onFileError === "function", "Parameter «settings.hooks.onFileError» must be function on «NwtJsonPersister.iterate»");
      this.assertion(typeof onJsonError === "function", "Parameter «settings.hooks.onJsonError» must be function on «NwtJsonPersister.iterate»");
      this.assertion(typeof onPropertyError === "function", "Parameter «settings.hooks.onPropertyError» must be function on «NwtJsonPersister.iterate»");
      this.assertion(typeof onError === "function", "Parameter «settings.hooks.onError» must be function on «NwtJsonPersister.iterate»");
      this.assertion(hasFile || hasData, "Parameter «settings.file» can only be replaced with parameter «settings.dataset» on «NwtJsonPersister.iterate»");
      const memo = { dataset };
      Proceso_de_lectura_de_fichero:
      if (hasFile) {
        try {
          memo.fileContent = await require("fs").promises.readFile(file, "utf8");
        } catch (error) {
          console.error(`Error leyendo fichero «${file}»:`, error);
          await onFileError(error);
          await onError(error, "FileError");
        }
        this.assertion(typeof memo.fileContent === "string", "Parameter «settings.file» could not be read on «NwtJsonPersister.iterate»");
        try {
          memo.fileJson = JSON.parse(memo.fileContent);
        } catch (error) {
          console.error(`Error parseando fichero a JSON «${file}»:`, error);
          await onJsonError(error);
          await onError(error, "JsonError");
        }
        this.assertion(typeof memo.fileJson !== "undefined", "Parameter «settings.file» could not be parsed as JSON on «NwtJsonPersister.iterate»");
        memo.dataset = memo.fileJson;
      }
      // console.log("Leido fichero:", memo.dataset);
      Proceso_de_lectura_de_propiedad:
      if (!hasProp) {
        if (operation === "get") {
          return memo.dataset;
        } else {
          throw new Error(`Operation «${operation}» is missing «settings.prop» on «NwtJsonPersister.iterate»`);
        }
      } else {
        for (let index = 0; index < prop.length; index++) {
          const key = prop[index];
          this.assertion(["string", "number"].indexOf(typeof key) !== -1, `Parameter «settings.prop[${index}]» must be string or number on «NwtJsonPersister.iterate»`);
        }
        this.assertion(typeof memo.dataset !== "undefined", "Parameter «memo.dataset» should be defined at this point on «NwtJsonPersister.iterate»");
        let pivoter = memo.dataset;
        if (prop.length === 0) {
          El_paso_previo_a_la_iteracion_cuando_hay_0_props: {
            if (operation === "get") {
              // GET sin props devuelve todo el dataset:
              return memo.dataset;
            } else if (operation === "set") {
              // SET sin props...
              if(file) {
                // ...si hay fichero: persiste todo el dataset
                await this.low.persistJson(file, value);
                return true;
              } else {
                // ...si no hay fichero: está pidiendo que le cambie el mismo dataset que entra entero por otro valor, y eso no tiene sentido, so, error:
                throw new Error("Operation «set» without parameters «settings.prop» or «settings.file» has no sense. I hope you know what you are doing on «NwtJsonPersister.iterate»");
              }
            } else if (operation === "has") {
              // HAS sin props devuelve si dataset es un JSONable:
              return typeof memo.dataset !== "undefined";
            } else if (operation === "init") {
              // INIT sin props inicializaría el fichero...
              if (typeof memo.dataset === "undefined") {
                // SOOOOLAMENTE, si no existe antes:
                await this.low.persistJson(file, {});
              }
              return memo.dataset;
            } else if (operation === "delete") {
              return await this.low.persistJson(file, {});
            } else {
              throw new Error(`Operation «${operation}» is not recognized (at first iteration step) on «NwtJsonPersister.iterate»`);
            }
          }
        }
        const currentIndex = [];
        const lastPropertyIndex = prop.length - 1;
        for (let indexProp = 0; indexProp < prop.length; indexProp++) {
          const key = prop[indexProp];
          try {
            currentIndex.push(key);
            if (lastPropertyIndex !== indexProp) {
              pivoter = pivoter[key];
            } else {
              El_paso_ultimo_de_la_iteracion_en_cada_operacion: {
                if (operation === "get") {
                  return pivoter[key];
                } else if (operation === "set") {
                  pivoter[key] = value;
                  if(file) {
                    await this.low.persistJson(file, memo.dataset);
                  }
                  return memo.dataset;
                } else if (operation === "init") {
                  if (!(key in pivoter)) {
                    pivoter[key] = value;
                  }
                  if(file) {
                    await this.low.persistJson(file, memo.dataset);
                  }
                  return pivoter[key];
                } else if (operation === "has") {
                  return key in pivoter;
                } else if (operation === "delete") {
                  this.assertion(typeof pivoter === "object", `Operation «delete» can only work with objects but «prop» is pointing to a «${typeof pivoter}» on «NwtJsonPersister.iterate»`);
                  const isArray = Array.isArray(pivoter);
                  if (!(key in pivoter)) {
                    return false;
                  }
                  if (isArray) {
                    pivoter.splice(key, 1);
                  } else {
                    delete pivoter[key];
                  }
                  if(file) {
                    await this.low.persistJson(file, memo.dataset);
                  }
                  return true;
                } else {
                  throw new Error(`Operation «${operation}» is not recognized (at last iteration step) on «NwtJsonPersister.iterate»`);
                }
              }
            }
          } catch (error) {
            console.error(`Error accediendo a propiedad JSON «${currentIndex.join("/")}» en fichero «${file}»:`, error);
            await onPropertyError(error, currentIndex);
            await onError(error, "PropertyError");
          }
        }
        throw new Error("At this point, the operation should have returned already on «NwtJsonPersister.iterate»");
      }
    }

    static get(...args) {
      this.trace("NwtJsonPersister.get");
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "get"));
    }

    static set(...args) {
      this.trace("NwtJsonPersister.set");
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "set"));
    }

    static has(...args) {
      this.trace("NwtJsonPersister.has");
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "has"));
    }

    static init(...args) {
      this.trace("NwtJsonPersister.init");
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "init"));
    }

    static delete(...args) {
      this.trace("NwtJsonPersister.delete");
      return this.iterate(this.low.extractSettingsFromArgsAndOperation(args, "delete"));
    }

  };

  return NwtJsonPersister;

});
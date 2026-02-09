/**
 * 
 * # NwtArgumentes
 * 
 * API para la normalización de argumentos.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtArgumenter
 * NwtFramework.Argumenter
 * Vue.prototype.$nwt.Argumenter
 * ```
 * 
 * ## Ventajas
 * 
 * No es una API estable hasta que no produzca código legible.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtArgumenter'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtArgumenter'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtArgumenter = class {

    static formatters = {
      check: {
        arguments: {
          can: (...args) => this.formatters.checkArgumentsCan(...args),
        },
        argument: {
          is: {
            type: (...args) => this.formatters.checkArgumentIsType(...args),
          }
        }
      },
      ensure: {
        arguments: {
          can: (...args) => this.formatters.ensureArgumentsCan(...args),
        },
        argument: {
          is: {
            type: (...args) => this.formatters.ensureArgumentIsType(...args),
          }
        }
      },
      export: {
        properties: {
          from: {
            indexes: (...args) => this.formatters.exportPropertiesFromIndexes(...args),
          }
        },
        indexes: {
          to: {
            names: (...args) => this.formatters.exportIndexesToNames(...args),
          }
        },
        input: {
          to: {
            property: (...args) => this.formatters.exportInputToProperty(...args),
          },
        }
      },
      remove: {
        output: {
          properties: {
            where: (...args) => this.formatters.removeOutputPropertiesWhere(...args),
          }
        }
      },
      checkArgumentIsType: (index, typeId) => {
        trace("NwtArgumenter.formatters.checkArgumentIsType");
        return $ => {
          trace("NwtArgumenter.formatters.checkArgumentIsType#callback");
          if(!(index in $)) {
            return typeId === "undefined";
          }
          if(typeId === "array") {
            return Array.isArray($[index]);
          } else if(typeId === "promise") {
            return $[index] instanceof Promise;
          }
          return typeof $[index] === typeId;
        };
      },
      ensureArgumentIsType: (index, typeId, context = false) => {
        trace("NwtArgumenter.formatters.ensureArgumentIsType");
        return $ => {
          trace("NwtArgumenter.formatters.ensureArgumentIsType#callback");
          if(typeId === "array") {
            assertion(Array.isArray($[index]), `Argument «${index}» must be type «${typeId}» but it is type «${typeof $[index]}»${context ? " on «" + context + "»" : ""}`);
          } else if(typeId === "promise") {
            assertion($[index] instanceof Promise, `Argument «${index}» must be type «${typeId}» but it is type «${typeof $[index]}»${context ? " on «" + context + "»" : ""}`);
          } else {
            assertion(typeof $[index] === typeId, `Argument «${index}» must be type «${typeId}» but it is type «${typeof $[index]}»${context ? " on «" + context + "»" : ""}`);
          }
        };
      },
      exportPropertiesFromIndexes: (map) => {
        trace("NwtArgumenter.exportPropertiesFromIndexes");
        return $ => {
          trace("NwtArgumenter.exportPropertiesFromIndexes#callback");
          const destinationProps = Object.keys(map);
          const originalArgs = Object.values(map);
          const output = {};
          for (let index = 0; index < destinationProps.length; index++) {
            const prop = destinationProps[index];
            const arg = originalArgs[index];
            output[prop] = $[arg];
          }
          return output;
        }
      },
      exportInputToProperty: (name) => {
        trace("NwtArgumenter.formatters.exportInputToProperty");
        assertion(typeof name === "string", "Parameter «name» must be string on «NwtArgumenter.formatters.exportInputToProperty»");
        return $ => {
          trace("NwtArgumenter.formatters.exportInputToProperty#callback");
          return {
            [name]: $
          };
        };
      },
      exportIndexesToNames: (...names) => {
        trace("NwtArgumenter.formatters.exportIndexesToNames");
        return $ => {
          trace("NwtArgumenter.formatters.exportIndexesToNames#callback");
          const output = {};
          for (let index = 0; index < names.length; index++) {
            const name = names[index];
            assertion(typeof name === "string", `Parameter «names[${index}]» must be string on «NwtArgumenter.formatters.exportIndexesToNames»`);
            output[name] = $[index];
          }
          return output;
        }
      },
      removeOutputPropertiesWhere: condition => {
        trace("NwtArgumenter.formatters.removeOutputPropertiesWhere");
        assertion(typeof condition === "function", `Parameter «condition» must be function on «NwtArgumenter.formatters.removeOutputPropertiesWhere»`);
        return ($, index, output) => {
          trace("NwtArgumenter.formatters.removeOutputPropertiesWhere#callback");
          for (const key in output) {
            const val = output[key];
            const result = condition(val, key, index, output, $);
            if (result === true) {
              delete output[key];
            }
          }
          return undefined;
        };
      },
      checkArgumentsCan: (callback) => {
        trace("NwtArgumenter.formatters.checkArgumentsCan");
        assertion(typeof callback === "function", `Parameter «callback» must be function on «NwtArgumenter.formatters.checkArgumentsCan»`);
        return ($, index, output) => {
          trace("NwtArgumenter.formatters.checkArgumentsCan#callback");
          return callback($, index, output);
        };
      },
      ensureArgumentsCan: (callback, action = 'do unspecified action', context = false) => {
        trace("NwtArgumenter.formatters.checkArgumentsCan");
        assertion(typeof callback === "function", `Parameter «callback» must be function on «NwtArgumenter.formatters.checkArgumentsCan»`);
        return ($, index, output) => {
          trace("NwtArgumenter.formatters.checkArgumentsCan#callback");
          assertion(true === callback($, index, output), `Arguments could not «${action}»${ context ? " on «" + context + "»" : "" }`);
        };
      }
    };

    static format(args, formatters = [], argv = false) {
      trace("NwtArgumenter.format");
      assertion(Array.isArray(args) || (Object.prototype.toString.call(args) === "[object Arguments]"), "Parameter «args» must to be instance of «Arguments» on «NwtArgumenter.format»");
      if (typeof formatters === "function") {
        formatters = formatters(this.formatters);
      }
      assertion(Array.isArray(formatters), "Parameter «formatters» must be array on «NwtArgumenter.format»");
      if (!argv) {
        argv = {};
      }
      Iterate_formatters:
      for (let index = 0; index < formatters.length; index++) {
        const formatter = formatters[index];
        if (typeof formatter === "function") {
          Si_formatter_es_funcion: {
            const overrider = formatter(args, index, argv);
            if (typeof overrider === "undefined") {
              // @OK: no hacer nada
            } else if (typeof overrider === "object") {
              Object.assign(argv, overrider);
            } else {
              throw new Error(`Operation «formatters[${index}] returns type ${typeof overrider} but not object or undefined» not valid on «NwtArgumenter.format»`);
            }
          }
        } else if (Array.isArray(formatter)) {
          Si_formatter_es_array: {
            if (formatter.length === 0) {
              Si_formatter_es_array_de_0: {
                throw new Error(`Operation «formatters[${index}] type empty array» not valid on «NwtArgumenter.format»`);
              }
            } else if (formatter.length === 1) {
              Si_formatter_es_array_de_1: {
                const formatterRule = formatter[0];
                if (typeof formatterRule === "function") {
                  const overrider = formatterRule(args, index, argv);
                  if (typeof overrider === "undefined") {
                    // @OK: no hacer nada
                  } else if (typeof overrider === "object") {
                    Object.assign(argv, overrider);
                  } else {
                    throw new Error(`Operation «formatters[${index}][0] returns type ${typeof overrider} but not object or undefined» not valid on «NwtArgumenter.format»`);
                  }
                } else {
                  throw new Error(`Operation «formatters[${index}][0] type ${typeof formatterRule} but not function» not valid on «NwtArgumenter.format»`);
                }
              }
            } else if (formatter.length === 2) {
              Si_formatter_es_array_de_2: {
                const formatterRule1 = formatter[0];
                const formatterRule2 = formatter[1];
                if (typeof formatterRule1 === "function") {
                  Si_formatter_0_es_funcion: {
                    const condition = formatterRule1(args, index, argv);
                    if (typeof condition !== "boolean") {
                      throw new Error(`Operation «formatters[${index}][0] returns type ${typeof overrider} but not boolean» not valid on «NwtArgumenter.format»`);
                    }
                  }
                } else {
                  throw new Error(`Operation «formatters[${index}][0] type ${typeof formatterRule1} but not function» not valid on «NwtArgumenter.format»`);
                }
                if (typeof formatterRule2 === "function") {
                  Si_formatter_1_es_funcion: {
                    const overrider = formatterRule2(args, index, argv);
                    if (typeof overrider === "undefined") {
                      // @OK: no hacer nada
                    } else if (typeof overrider === "object") {
                      Object.assign(argv, overrider);
                    } else {
                      throw new Error(`Operation «formatters[${index}][1] returns type ${typeof overrider} but not object or undefined» not valid on «NwtArgumenter.format»`);
                    }
                  }
                } else if (Array.isArray(formatterRule2)) {
                  NwtArgumenter.format(args, formatterRule2, argv);
                  // throw new Error(`Operation «formatters[${index}][1] type ${typeof formatterRule2} but not function» not supported yet on «NwtArgumenter.format»`);
                } else if (typeof formatterRule2 === "object") {
                  Si_formatter_1_es_objeto_pero_no_array: {
                    Object.assign(argv, formatterRule2);
                  }
                } else {
                  throw new Error(`Operation «formatters[${index}][1] type ${typeof formatterRule2} but not function, array or object» not valid on «NwtArgumenter.format»`);
                }
              }
            } else if (formatter.length > 2) {
              NwtArgumenter.format(args, formatter, argv);
            }
          }
        } else if (typeof formatter === "object") {
          Object.assign(argv, formatter);
        } else if (typeof formatter === "string") {
          throw new Error(`Operation «formatters[${index}] type string but not array or function» not supported yet on «NwtArgumenter.format»`);
        } else {
          throw new Error(`Operation «formatters[${index}] type ${typeof formatter} but not function or array» not valid on «NwtArgumenter.format»`);
        }
      }
      if (Object.keys(argv).length === 0) {
        argv._ = args;
      }
      return argv;
    }

  };

  return NwtArgumenter;

  // Ejemplo de uso:

  let o = NwtArgumenter.format(["path/to/template", { p1: 1 }, { async: true }], [
    (out, i, inp) => assertion(typeof inp[0] === "string", "param 1 must be string"),
    (out, i, inp) => assertion(typeof inp[1] === "object", "param 2 must be object"),
    (out, i, inp) => assertion(typeof inp[2] === "object", "param 3 must be object"),
    (out, i, inp) => ({ template: inp[0], parameters: inp[1], settings: inp[2] })
  ]);

  // Otro caso de uso:


  c = NwtTimer.Cronometer.create();
  o = NwtArgumenter.format(["path/to/property", "value"], [
    NwtArgumenter.formatters.export.input.by.names("$arg1", "$arg2", "$arg3"),
    NwtArgumenter.formatters.ensure.argument.is.type(0, "string", "Function.prototype.method"),
    NwtArgumenter.formatters.ensure.argument.is.type(1, "string", "Function.prototype.method"),
    NwtArgumenter.formatters.ensure.argument.is.type(2, "undefined", "Function.prototype.method"),
    NwtArgumenter.formatters.export.input.to.properties.by.index({ path: 0, value: 1, another: 1 }),
    NwtArgumenter.formatters.export.input.to.property("$argOriginal"),
    NwtArgumenter.formatters.remove.output.properties.where((val, key) => key.startsWith("$arg")),
  ]);
  c.stop();

  // Otro caso más explosivo de uso:


  c = NwtTimer.Cronometer.create();
  o = NwtArgumenter.format(["path/to/property", "value"], _ => [
    _.export.indexes.to.names("$arg1", "$arg2", "$arg3"),
    _.ensure.argument.is.type(0, "string", "Function.prototype.method"),
    _.ensure.argument.is.type(1, "string", "Function.prototype.method"),
    _.ensure.argument.is.type(2, "undefined", "Function.prototype.method"),
    _.export.indexes.to.properties({ path: 0, value: 1, another: 1 }),
    _.export.input.to.property("$argOriginal"),
    _.remove.output.properties.where((val, key) => key.startsWith("$arg")),
  ]);

});
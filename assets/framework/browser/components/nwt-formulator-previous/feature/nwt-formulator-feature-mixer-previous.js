(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorFeatureMixer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorFeatureMixer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormulatorFeatureMixer = class {

    static assignWithoutOverriding(base = {}, extra = {}) {
      assertion(typeof base === "object", "Required parameter «base» to be object on «NwtFormulatorFeatureMixer.assignWithoutOverriding»");
      assertion(typeof extra === "object", "Required parameter «extra» to be object on «NwtFormulatorFeatureMixer.assignWithoutOverriding»");
      for (const prop in extra) {
        assertion(!(prop in base), `Setting specification «${prop}» is duplicated on «NwtFormulatorFeatureMixer.assignWithoutOverriding»`);
        base[prop] = extra[prop];
      }
    }

    static hookables = [
      "beforeCreate",
      "created",
      "beforeMount",
      "mounted",
      "beforeUpdate",
      "updated",
      "beforeDestroy",
      "destroyed"
    ];

    static isHook(k) {
      trace("NwtFormulatorFeatureMixer.isHook");
      return this.hookables.includes(k);
    }

    static async visit(interfaze, out, visited, stack) {
      assertion(typeof interfaze === "object", `Parameter «interfaze» must be object but «${typeof interfaze}» found at «${JSON.stringify([...visited.values()])}» of «${JSON.stringify(out)}» on «NwtFormulatorFeatureMixer.visit»`);
      assertion(Array.isArray(out), `Parameter «interfaze» must be array but «${typeof out}» found at «${JSON.stringify([...visited.values()])}» of «${JSON.stringify(out)}» on «NwtFormulatorFeatureMixer.visit»`);
      assertion(visited instanceof Set, `Parameter «interfaze» must be instance of «Set» but «${typeof visited}» found at «${JSON.stringify([...visited.values()])}» of «${JSON.stringify(out)}» on «NwtFormulatorFeatureMixer.visit»`);
      assertion(stack instanceof Set, `Parameter «interfaze» must be instance of «Set» but «${typeof stack}» found at «${JSON.stringify([...visited.values()])}» of «${JSON.stringify(out)}» on «NwtFormulatorFeatureMixer.visit»`);
      if (visited.has(interfaze)) return;
      if (stack.has(interfaze)) {
        throw new Error("Circular inherits detected");
      }
      stack.add(interfaze);
      if (Array.isArray(interfaze.inherits)) {
        const parents = await this.normalizeInterfaces(interfaze.inherits);
        for (const parent of parents) {
          await this.visit(parent, out, visited, stack);
        }
      } else if (interfaze.inherits !== undefined) {
        assertion(false, "Property «inherits» must be array or undefined");
      }
      stack.delete(interfaze);
      visited.add(interfaze);
      out.push(interfaze);
    }

    static async resolveInterfaces(interfazes) {
      assertion(Array.isArray(interfazes), "Parameter «interfazes» must be array on «NwtFormulatorFeatureMixer.resolveInterfaces»");
      const out = [];
      const visited = new Set();
      const stack = new Set();
      for (const interfaze of interfazes) {
        // await this.visit(interfaze, out, visited, stack);
        await this.resolveInterface(interfaze, out, visited, stack);
      }
      return out;
    }

    static async resolveInterface(interfazeInput, out, visited, stack) {
      trace("NwtFormulatorFeatureMixer.resolveInterface");
      let interfaze = interfazeInput;
      const isString = typeof interfazeInput === "string";
      const isObject = typeof interfazeInput === "object";
      const isLazyFeature = interfazeInput instanceof NwtFormulatorLazyFeature;
      if(isString) {
        interfaze = await NwtFormulatorLazyFeature.create(interfaze).load();
      } else if(isLazyFeature) {
        interfaze = await interfaze.load();
      } else {
        assertion(false, `Type «${typeof interfaze}» of mixable interface is not accepted on «NwtFormulatorFeatureMixer.resolveInterface»`);
      }
      assertion(!visited.has(interfaze.class.name), `Type «${interfaze.class.name}» is being overriden on «NwtFormulatorFeatureMixer.resolveInterface»`);
      out.push(interfaze);
      visited.add(interfaze.class.name);
    }

    static async normalizeInterfaces(interfazes) {
      trace("NwtFormulatorFeatureMixer.normalizeInterfaces");
      assertion(Array.isArray(interfazes), "Parameter «interfazes» must be array on «NwtFormulatorFeatureMixer.normalizeInterfaces»");
      const out = [];
      for (const interfazeId in interfazes) {
        const interfaze = interfazes[interfazeId];
        if (typeof interfaze === "string") {
          const lazy = NwtFormulatorLazyFeature.create(interfaze);
          const loaded = await lazy.load();
          assertion(typeof loaded === "object", `Lazy feature at «${lazy.id}» does not return object on «NwtFormulatorFeatureMixer.normalizeInterfaces»`)
          out.push(loaded);
        } else if (interfaze instanceof NwtFormulatorLazyFeature) {
          const loaded = await interfaze.load();
          assertion(typeof loaded === "object", `Lazy feature at «${interfaze.id}» does not return object on «NwtFormulatorFeatureMixer.normalizeInterfaces»`)
          out.push(loaded);
        } else if(typeof interfaze === "object") {
          out.push(interfaze);
        } else {
          throw new Error(`Interface format «${typeof interfaze}» is not accepted yet on «NwtFormulatorFeatureMixer.normalizeInterfaces»`);
        }
      }
      return out;
    }
    
    static async mix(interfazes) {
      trace("NwtFormulatorFeatureMixer.mix");
      // datos iniciales:
      const out = {
        // NWT API:
        inherits: null,
        class: null,
        classSeeds: null,
        settings: null,
        settingsOverrider: null,
        settingsSpecification: {},
        // Vue2 API:
        props: {},
        data: null,
        methods: {},
        computed: {},
        watch: {}
      };
      const dataFunctions = [];
      const hooks = {};
      Iterate_interfaces:
      for (const interfaze of interfazes) {
        // class
        let className = undefined;
        Plugin_for_class_specification: {
          if (interfaze.class) {
            if(!out.class) {
              out.class = {};
            }
            if(typeof out.class.name !== "undefined") {
              if(!out.classSeeds) {
                out.classSeeds = [];
              }
              out.classSeeds.push(out.class.name);
              className = out.class.name;
            }
            for (let prop in interfaze.class) {
              const val = interfaze.class[prop];
              if (prop === "definition") {
                if (typeof out.class.definition !== "object") {
                  out.class.definition = {};
                }
                Object.assign(out.class.definition, val);
              } else {
                // The others override by themselves:
                Object.assign(out.class, { [prop]: val });
              }
            }
          }
        }
        // settings
        Plugin_for_settings_specification: {
          if (interfaze.settings) {
            this.assignWithoutOverriding(out.settingsSpecification, interfaze.settings);
          }
          if(interfaze.settingsOverrider) {
            Object.assign(out.settingsSpecification, interfaze.settingsOverrider);
          }
        }
        // data
        Push_data_callback:
        if (interfaze.data) {
          dataFunctions.push(interfaze.data);
        }
        // methods / computed / props → NO se suman
        On_method_collections:
        for (const collection of ["methods", "computed", "props"]) {
          if (!(collection in interfaze)) {
            continue;
          }
          For_each_id:
          for (const name in interfaze[collection]) {
            Avoid_collisions:
            if (out[collection][name]) {
              throw new Error(`Collision on «${collection}.${name}» on class «${className}» at class sequence «${out.classSeeds.join(",")}» on «NwtFormulatorFeatureMixer.mix»`);
            }
            out[collection][name] = interfaze[collection][name];
          }
        }
        // watch → merge por clave
        On_watch:
        if (interfaze.watch) {
          for (const watchIndex in interfaze.watch) {
            const watchObject = out.watch[watchIndex];
            out.watch[watchIndex] = watchObject
              ? [].concat(watchObject, interfaze.watch[watchIndex])
              : interfaze.watch[watchIndex];
          }
        }
        // hooks → se encadenan
        On_callbacks:
        for (const propertyId in interfaze) {
          if (typeof interfaze[propertyId] === "function" && this.isHook(propertyId)) {
            if (!(propertyId in hooks)) {
              hooks[propertyId] = [];
            }
            hooks[propertyId].push(interfaze[propertyId]);
          }
        }
      }
      // data final
      On_data: {
        // settings specification plugin:
        Plugin_for_settings_specification: {
          const settingsSpecification = NwtUtils.copify(out.settingsSpecification);
          dataFunctions.unshift(function () {
            return {
              settingsSpecification,
            };
          });
        }
        // inherits plugin:
        Plugin_for_settings_specification: {
          out.inherits = interfazes;
          dataFunctions.unshift(function () {
            return {
              inheritsFrom: interfazes,
            };
          });
        }
        out.data = function () {
          let result = {}
          for (const callback of dataFunctions) {
            Object.assign(result, callback.call(this));
          }
          return result;
        };
      }
      // hooks finales
      On_hooks:
      for (const key in hooks) {
        out[key] = function () {
          for (const callback of hooks[key]) {
            callback.call(this);
          }
        };
      }
      return out;
    }

  };


  return NwtFormulatorFeatureMixer;

});
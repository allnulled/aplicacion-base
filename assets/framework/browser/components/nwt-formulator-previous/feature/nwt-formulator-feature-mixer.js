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
        assertion(!(prop in base), `Assignation to «${prop}» is duplicated on «NwtFormulatorFeatureMixer.assignWithoutOverriding»`);
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

    static async extractFeaturesInheritance(features, loaded = []) {
      trace("NwtFormulatorFeatureMixer.extractFeaturesInheritance");
      assertion(Array.isArray(features), "Parameter «features» must be array on «NwtFormulatorFeatureMixer.extractFeaturesInheritance»");
      Validating_features:
      for(let index=0; index<features.length; index++) {
        let feature = features[index];
        if(typeof feature === "string") {
          feature = await NwtFormulatorLazyFeature.create(feature).load();
        }
        assertion(typeof feature === "object", `Parameter «features[${index}]» must be object on «NwtFormulatorFeatureMixer.extractFeaturesInheritance»`);
        assertion(typeof feature.class === "object", `Parameter «features[${index}].class» must be object on «NwtFormulatorFeatureMixer.extractFeaturesInheritance»`);
        assertion(typeof feature.class.name === "string", `Parameter «features[${index}].class.name» must be string on «NwtFormulatorFeatureMixer.extractFeaturesInheritance»`);
        if(feature.inherits) {
          assertion(typeof feature.inherits === "object", `Parameter «features[${index}].inherits» must be object on «NwtFormulatorFeatureMixer.extractFeaturesInheritance»`);
          const inheritedFeatures = await this.extractFeaturesInheritance(feature.inherits);
          NwtArrayUtils.pushEachInto(inheritedFeatures, loaded);
        }
        loaded.push(feature);
      }
      return loaded;
    }
    
    static async mix(features) {
      trace("NwtFormulatorFeatureMixer.mix");
      // datos iniciales:
      const interfazes = await this.extractFeaturesInheritance(features);
      // NWT API:
      const out = {
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
          if (typeof interfaze[propertyId] === "function" && this.hookables.includes(propertyId)) {
            if (!(propertyId in hooks)) {
              hooks[propertyId] = [];
            }
            hooks[propertyId].push(interfaze[propertyId]);
          }
        }
      }
      // data final
      On_data: {
        // inherits plugin:
        Plugin_for_settings_specification: {
          out.inherits = interfazes;
        }
        out.data = function () {
          let result = {
            featureSpecification: out,
          };
          for (const callback of dataFunctions) {
            const partialResult = callback.call(this, result);
            assertion(typeof partialResult === "object", "Required callback «data» to return object on «FeatureMix.data»");
            Object.assign(result, partialResult);
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
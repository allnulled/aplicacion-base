(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFeatureMixer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFeatureMixer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFeatureMixer = class {

    static async component(baseComponent) {
      trace("NwtFeatureMixer.component");
      const vueComponent = await this.mix(baseComponent);
      if (typeof vueComponent.name === "string") {
        Vue.component(vueComponent.name, vueComponent);
      }
      return vueComponent;
    }

    static assignWithoutOverriding(base = {}, extra = {}, interfazeId = undefined) {
      assertion(typeof base === "object", `Required parameter «base» on interface «${interfazeId}» to be object on «NwtFeatureMixer.assignWithoutOverriding»`);
      assertion(typeof extra === "object", `Required parameter «extra» on interface «${interfazeId}» to be object on «NwtFeatureMixer.assignWithoutOverriding»`);
      for (const prop in extra) {
        assertion(!(prop in base), `Assignation to «${prop}» is duplicated on interface «${interfazeId}» on «NwtFeatureMixer.assignWithoutOverriding»`);
        base[prop] = extra[prop];
      }
    }

    static assignSoftly(base = {}, extra = {}) {
      assertion(typeof base === "object", "Required parameter «base» to be object on «NwtFeatureMixer.assignSoftly»");
      assertion(typeof extra === "object", "Required parameter «extra» to be object on «NwtFeatureMixer.assignSoftly»");
      Iterating_props:
      for (const prop in extra) {
        if (prop in base) continue Iterating_props;
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
      trace("NwtFeatureMixer.extractFeaturesInheritance");
      assertion(Array.isArray(features), "Parameter «features» must be array on «NwtFeatureMixer.extractFeaturesInheritance»");
      Validating_features:
      for (let index = 0; index < features.length; index++) {
        let featureId = features[index];
        const isObject = typeof featureId === "object";
        let feature = undefined;
        if (isObject) {
          feature = featureId;
          assertion(typeof feature.statics === "object", `Parameter «features[${index}].statics» must be object on «NwtFeatureMixer.extractFeaturesInheritance»`);
          assertion(typeof feature.statics.id === "string", `Parameter «features[${index}].statics.id» must be string on «NwtFeatureMixer.extractFeaturesInheritance»`);
          featureId = feature.statics.id;
        } else {
          assertion(typeof featureId === "string", `Parameter «features[${index}]» must be string on «NwtFeatureMixer.extractFeaturesInheritance»`);
          feature = await NwtResource.for(featureId).load();
          assertion(typeof feature === "object", `Parameter «features[${featureId}]» must be object on «NwtFeatureMixer.extractFeaturesInheritance»`);
        }
        if (typeof feature.statics === "function") {
          loaded.push(feature);
          continue Validating_features;
        }
        assertion(typeof feature.statics === "object", `Parameter «features[${featureId}].statics» must be object on «NwtFeatureMixer.extractFeaturesInheritance»`);
        assertion(typeof feature.statics.id === "string", `Parameter «features[${featureId}].statics.id» must be string on «NwtFeatureMixer.extractFeaturesInheritance»`);
        Adding_inheritance:
        if (feature.statics.inherits) {
          assertion(Array.isArray(feature.statics.inherits), `Parameter «features[${featureId}].statics.inherits» must be array or none on «NwtFeatureMixer.extractFeaturesInheritance»`);
          if (feature.statics.inherits.length === 0) {
            break Adding_inheritance;
          }
          const inheritedFeatures = await this.extractFeaturesInheritance(feature.statics.inherits);
          NwtArrayUtils.pushEachInto(inheritedFeatures, loaded);
        }
        loaded.push(feature);
      }
      return loaded;
    }

    static async mix(component) {
      trace("NwtFeatureMixer.mix");
      assertion(typeof component === "object", "Required parameter «component» to be object on «NwtFeatureMixer.mix»");
      assertion(!Array.isArray(component), "Required parameter «component» to not be array, only object on «NwtFeatureMixer.mix»");
      assertion(typeof component.statics === "object", "Required parameter «component.statics» to be object on «NwtFeatureMixer.mix»");
      assertion(Array.isArray(component.statics.inherits), "Required parameter «component.statics.inherits» to be array on «NwtFeatureMixer.mix»");
      // datos iniciales:
      const inheritsList = await this.extractFeaturesInheritance(component.statics.inherits);
      inheritsList.push(component);
      const out = {
        // NWT API:
        statics: {
          settings: {},
        },
        // Vue2 API:
        props: {},
        data: null,
        methods: {},
        computed: {},
        watch: {}
      };
      const dataFunctions = [];
      const hooks = {};
      let counter = 0;
      Iterate_interfaces:
      for (const interfaze of inheritsList) {
        counter++;
        // class
        let className = undefined;
        Plugin_for_class_specification:
        if (typeof interfaze.statics !== "undefined") {
          if (typeof interfaze.statics === "function") {
            interfaze.statics = await interfaze.statics.call(out);
          }
          assertion(typeof interfaze.statics === "object", `Required parameter «features['${counter - 1}'].statics» to be object on «NwtFeatureMixer.mix»`);
          assertion(typeof interfaze.statics.id === "string", `Required parameter «features['${counter - 1}'].statics.id» to be string on «NwtFeatureMixer.mmix»`);
          if (!out.statics.seeds) {
            out.statics.seeds = [];
          }
          out.statics.seeds.push(interfaze.statics.id);
          className = interfaze.statics.id;
          Propagating_statics:
          for (let prop in interfaze.statics) {
            const val = interfaze.statics[prop];
            if (!["settings"].includes(prop)) {
              Object.assign(out.statics, { [prop]: val });
            }
          }
          // settings
          Plugin_for_settings_specification:
          if (typeof interfaze.statics.settings === "object") {
            if (interfaze.statics.settings.$once) {
              this.assignWithoutOverriding(out.statics.settings, interfaze.statics.settings.$once, interfaze.statics.id);
            }
            if (interfaze.statics.settings.$soft) {
              this.assignSoftly(out.statics.settings, interfaze.statics.settings.$soft);
            }
            if (interfaze.statics.settings.$hard) {
              Object.assign(out.statics.settings, interfaze.statics.settings.$hard);
            }
            Object.assign(out.statics.settings, interfaze.statics.settings);
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
              throw new Error(`Collision on «${collection}.${name}» on class «${className}» at class sequence «${out.statics.seeds.join(",")}» on «NwtFeatureMixer.mix»`);
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
        // traits abstract inheritance → con Object.assign pero dentro de cada trait
        On_traits_abstract_inheritance: {
          const hasTraits = interfaze.statics && interfaze.statics.traits;
          if(!hasTraits) {
            break On_traits_abstract_inheritance;
          }
          if(!out.statics.traits) {
            out.statics.traits = {};
          }
          for(const traitId in interfaze.statics.traits) {
            if(!out.statics.traits[traitId]) {
              out.statics.traits[traitId] = {};
            }
            const traitMap = interfaze.statics.traits[traitId];
            assertion(typeof traitMap === "object", `Trait «${traitId}» on interface «${interfaze.statics.id}» must be object on «NwtFeatureMixer.mix»`);
            for(const traitProperty in traitMap) {
              const traitValue = traitMap[traitProperty];
              Object.assign(out.statics.traits[traitId], { [traitProperty]: traitValue });
            }
          }
        }
        // name:
        On_name_by_the_way: {
          if(interfaze.name) {
            out.name = interfaze.name;
          }
        }
        // template:
        On_template_by_the_way: {
          if(interfaze.template) {
            out.template = interfaze.template;
          }
        }
      }
      // data final
      On_data_but_after_loops: {
        // inherits plugin:
        Plugin_for_settings_specification: {
          // mejor dejar el componente ligero, solo con seeds:
          delete out.statics.inherits;
          break Plugin_for_settings_specification;
          out.statics.inherits = inheritsList;
        }
        out.data = function () {
          let result = {};
          for (const callback of dataFunctions) {
            const partialResult = callback.call(this, result);
            assertion(typeof partialResult === "object", "Required callback «data» to return object on «FeatureMix.data»");
            Object.assign(result, partialResult);
          }
          return result;
        };
      }
      On_statics_settings_after_loop: {
        delete out.statics.settings.$once;
        delete out.statics.settings.$soft;
        delete out.statics.settings.$hard;
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
      // Acceso al objeto de definición desde statics:
      out.statics.definition = out;
      out.statics = NwtFeatureStatics.create(out.statics);
      return out;
    }

  };

  return NwtFeatureMixer;

});
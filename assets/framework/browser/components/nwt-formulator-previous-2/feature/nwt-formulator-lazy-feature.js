(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyFeature'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyFeature = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultBasedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/");

    constructor(id, basedir = this.constructor.defaultBasedir) {
      trace("NwtFormulatorLazyFeature.constructor");
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtFormulatorLazyFeature.constructor»");
      assertion(typeof basedir === "string", "Parameter «basedir» must be string on «NwtFormulatorLazyFeature.constructor»");
      this.id = id;
      this.basedir = basedir;
      this.loaded = false;
    }

    async load(injection = {}) {
      trace("NwtFormulatorLazyFeature.prototype.load");
      const target = `${this.basedir}/${this.id}/feature.js`;
      assertion(await NwtFilesystem.existsAsFile(target), `Feature «js» file not found at «${target}» on «NwtFormulatorLazyFeature.prototype.load»`);
      this.loaded = await NwtImporter.asyncSource(target, injection);
      this.validate();
      return this.loaded;
    }

    validate(value = this.loaded) {
      trace("NwtFormulatorLazyFeature.prototype.validate");
      assertion(typeof value === "object", `Required lazy feature «${this.id}» to return object on «NwtFormulatorLazyFeature.prototype.validate»`);
      assertion(typeof value.abstraction === "object", `Required lazy feature «${this.id}» to return object at property «abstraction» on «NwtFormulatorLazyFeature.prototype.validate»`);
      assertion(typeof value.abstraction.name === "string", `Required lazy feature «${this.id}» to return string at property «abstraction.name» on «NwtFormulatorLazyFeature.prototype.validate»`);
      assertion(typeof value.specification === "object", `Required lazy feature «${this.id}» to return object at property «specification» on «NwtFormulatorLazyFeature.prototype.validate»`);
      if(value.specification.settings) {
        assertion(typeof value.specification.settings === "object", `Required lazy feature «${this.id}» to return object at property «view» on «NwtFormulatorLazyFeature.prototype.validate»`);
      }
      assertion(typeof value.view === "object", `Required lazy feature «${this.id}» to return object at property «view» on «NwtFormulatorLazyFeature.prototype.validate»`);
      
      const functionIds = ["data","beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed"];
      Iterating_functions:
      for(let index=0; index<functionIds.length; index++) {
        const functionId = functionIds[index];
        if(!value.view[functionId]) {
          continue Iterating_functions;
        }
        assertion(typeof value.view[functionId] === "function", `Required lazy feature «${this.id}» to return function at property «view.${functionId}» on «NwtFormulatorLazyFeature.prototype.validate»`);
      }
      
      const objectOfFunctionsIds = ["methods","watch","computed"];
      Iterating_objects:
      for(let indexObject=0; indexObject<objectOfFunctionsIds.length; indexObject++) {
        const objectId = objectOfFunctionsIds[indexObject];
        const viewProperty = value.view[objectId];
        if(!viewProperty) {
          continue Iterating_objects;
        }
        assertion(typeof viewProperty === "object", `Required lazy feature «${this.id}» to return object at property «view.${objectId}» on «NwtFormulatorLazyFeature.prototype.validate»`);
        const viewMethods = Object.keys(viewProperty);
        for(let indexMethod=0; indexMethod<viewMethods.length; indexMethod++) {
          const viewMethodId = viewMethods[indexMethod];
          const viewMethodCallback = viewProperty[viewMethodId];
          assertion(typeof viewMethodCallback === "function", `Required lazy feature «${this.id}» to return function at property «view.${objectId}.${viewMethodId}» on «NwtFormulatorLazyFeature.prototype.validate»`);
        }
      }
      
    }

  };

  return NwtFormulatorLazyFeature;

});
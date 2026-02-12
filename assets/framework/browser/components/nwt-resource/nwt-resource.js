(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtResource'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtResource'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtResource = class {

    static cache = new NwtComponentsCache();

    static for(resourceIdBrute) {
      trace("NwtResource.for");
      const isFeature = resourceIdBrute.startsWith("@feature/for/");
      const isControl = resourceIdBrute.startsWith("@control/for/");
      const isComponent = resourceIdBrute.startsWith("@");
      const resourceId = resourceIdBrute.replace(/^\@/g, "");
      const componentId = NwtVue2.fromTagToIdNotation(resourceId);
      if(this.cache.has(componentId)) return {
        load: () => {
          return this.cache.get(componentId).options;
        },
      };
      if (isFeature) {
        return NwtLazyFeature.create(resourceId);
      } else if (isControl) {
        return NwtLazyControl.create(resourceId);
      } else if (isComponent) {
        return NwtLazyComponent.create(resourceId);
      } else {
        assertion(resourceId in Vue.options.component, `Required parameter «resourceId» now «${resourceId}» to exist as component or start with «@control/for» or «@feature/for» on «NwtFeatureMixer.extractFeaturesInheritance»`);
        return {
          load: () => Vue.options.components[resourceId].options
        };
      }
    }

    static load(resourceId) {
      return this.for(resourceId).load();
    }

    static list = {
      load: (resourceList) => {
        return this.list.for(resourceList).load();
      },
      for: (resourceList) => {
        const input = [];
        for(let index=0; index<resourceList.length; index++) {
          const resourceId = resourceList[index];
          const resource = this.for(resourceId);
          input.push(resource);
        }
        return {
          async load() {
            const output = [];
            for(let index=0; index<input.length; index++) {
              const resource = input[index];
              const loaded = await resource.load();
              output.push(loaded);
            }
            return output;
          }
        }
      }
    }

  };

  return NwtResource;

});
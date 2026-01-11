/**
 * 
 * # Nwt Vue2 API
 * 
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtVue2'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtVue2'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtVue2 = class {

    static fromTagToIdNotation(tag) {
      trace("NwtVue2.fromTagToIdNotation");
      let finalId = tag.replace(/(\.|\/|\\)./g, match => match.substr(1).toUpperCase());
      finalId = finalId.substr(0, 1).toUpperCase() + finalId.substr(1).replace(/\-[a-z]/g, match => match.substr(1).toUpperCase());
      return finalId;
    }

    static fromIdToTagNotation(id) {
      trace("NwtVue2.fromIdToTagNotation");
      let finalTag = id.replace(/(\.|\/|\\)./g, match => match.substr(1).toUpperCase());
      finalTag = finalTag.substr(0, 1).toLowerCase() + finalTag.substr(1).replace(/[A-Z]/g, match => "-" + match.toLowerCase());
      return finalTag;
    }

    static defined = {
      components: {},
      directives: {},
    };

    static define = {
      component: (id, definition) => {
        trace("Vue.component");
        this.defined.components[id] = definition;
        if (NwtEnvironment.hasWindow) {
          Vue.component(id, definition);
        }
      },
      directive: (id, definition) => {
        trace("Vue.directive");
        this.defined.directives[id] = definition;
        if (NwtEnvironment.hasWindow) {
          Vue.directive(id, definition);
        }
      },
    };

    static cross = {
      expose: {
        by: {
          element: (...args) => this.exposeByElement(...args),
          component: (...args) => this.exposeByComponent(...args),
        }
      }
    }

    static exposeByComponent(component, ...args) {
      trace("NwtVue2.exposeByComponent");
      return this.exposeByElement(component.$el, ...args);
    }

    static exposeByElement(element, properties, name = "$api", exposition = []) {
      trace("NwtVue2.exposeByElement");
      assertion(element instanceof HTMLElement, "Parameter «element» must be instance of «HTMLElement» on «NwtVue2.exposeByElement»");
      assertion(typeof properties === "object", "Parameter «properties» must be object on «NwtVue2.exposeByElement»");
      assertion(Array.isArray(exposition), "Parameter «exposition» must be array on «NwtVue2.exposeByElement»");
      const [toElement = true, toDataset = true, toVue2 = true] = exposition;
      if (toElement) {
        Object.defineProperty(element, name, {
          value: properties,
          configurable: true
        });
      }
      if (toDataset) {
        const adaptedAttribute = NwtCommand.fromCommandIdToComponentId(name, {asTag:true});
        element.setAttribute("data-" + adaptedAttribute, properties);
      }
      if (toVue2) {
        const vm = element.__vue__;
        if (vm) {
          Object.defineProperty(vm, name, {
            value: properties,
            configurable: true
          });
        }
      }
    }

  };

  return NwtVue2;

});
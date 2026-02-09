/**
 * 
 * # Nwt Vue2 API
 * 
 * API de utilidades relacionadas con Vue2.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtVue2
 * NwtFramework.Vue2
 * Vue.prototype.$nwt.Vue2
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```js
 * // Métodos para notaciones:
 * NwtVue2.fromTagToIdNotation("tag-nomenclature"); // returns: "TagNomenclature"
 * NwtVue2.fromIdToTagNotation("TagNomenclature"); // returns: "tag-nomenclature"
 * // Definiciones paralelas de componentes y directivas (innecesario si usas Vue.options.components y Vue.options.directives):
 * NwtVue2.defined.components; // {}
 * NwtVue2.defined.directives; // {}
 * NwtVue2.define.component("component-name", {...});
 * NwtVue2.define.directive("directive-name", {...});
 * // Métodos para persistir propiedades en HTMLElement, HTMLElementDataset y Vue2Component:
 * NwtVue2.cross.expose.by.element(...); // equals: NwtVue2.exposeByElement(...)
 * NwtVue2.cross.expose.by.component(...); // equals: NwtVue2.exposeByComponent(...)
 * NwtVue2.exposeByElement(htmlElement, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
 * NwtVue2.exposeByComponent(vue2Component, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
 * ```
 * 
 * Es una API de poco uso. Los métodos estrictamente necesarios son los de notaciones. Pero los otros pueden ser útiles también en algunos casos.
 * 
 * Los métodos de definiciones paralelas habría que eliminarlos, sin romper nada que ya esté funcionando.
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
        if (NwtEnvironment.hasWindow) {
          Vue.component(id, definition);
        }
        this.defined.components[id] = definition;
      },
      directive: (id, definition) => {
        trace("Vue.directive");
        if (NwtEnvironment.hasWindow) {
          Vue.directive(id, definition);
        }
        this.defined.directives[id] = definition;
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
      const [toElement = true, toDataset = true, toComponent = true] = exposition;
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
      if (toComponent) {
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
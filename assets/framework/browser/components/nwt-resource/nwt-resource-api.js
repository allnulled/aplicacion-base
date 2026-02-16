(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtResourceApi'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtResourceApi'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtResourceApi = class {

    static apis = {};

    static Nexer = NwtResourceApiNexer;

    static register(api) {
      assertion(typeof api === "object", `Static API must be object on «NwtResourceApi.register»`);
      assertion(typeof api.namespace === "string", `Static API must provide an «id» on «NwtResourceApi.register»`);
      assertion(!(api.namespace in this.apis), `Static API «${api.namespace}» is already registered on «NwtResourceApi.register»`);
      this.apis[api.namespace] = api;
    }

    static unregister(apiId) {
      delete this.apis[apiId];
    }

    static proxify(definition, obj) {
      return new Proxy(obj, {
        get: (apiTarget, prop) => {
          const value = apiTarget[prop];
          if (value instanceof NwtResourceApi.Nexer) {
            return this.proxify(definition, value);
          }
          if (typeof value !== "function") {
            return value;
          }
          return value.bind(definition);
        }
      });
    }

    static install(definition) {
      if (!definition.apis) return {};
      if (!definition.apis.length) return {};
      definition.api = new Proxy(this.apis, {
        get: (target, namespaceId) => {
          const api = target[namespaceId];
          if(!api) return undefined;
          if(!definition.apis.includes(namespaceId)) return undefined;
          return this.proxify(definition, api);
        }
      });
      return definition;
    }

  }

  return NwtResourceApi;

});
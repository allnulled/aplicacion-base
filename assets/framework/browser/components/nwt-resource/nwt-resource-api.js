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

  const NwtResourceApiNexer = class {
    static create(...args) {
      return new this(...args);
    }
    constructor(...args) {
      Object.assign(this, ...args);
    }
  };

  const NwtResourceApi = class {

    static apis = {};

    static Nexer = NwtResourceApiNexer;

    static register(api) {
      trace("NwtResourceApi.register");
      assertion(typeof api === "object", `Static API must be object on «NwtResourceApi.register»`);
      assertion(typeof api.namespace === "string", `Static API must provide an «id» on «NwtResourceApi.register»`);
      assertion(!(api.namespace in this.apis), `Static API «${api.namespace}» is already registered on «NwtResourceApi.register»`);
      this.apis[api.namespace] = api;
    }

    static fromStringToSelector(txt, splitter = ".") {
      if(typeof txt !== "string") return txt;
      return txt.split(splitter);
    }

    static unregister(apiId) {
      trace("NwtResourceApi.unregister");
      delete this.apis[apiId];
    }

    static expand(selector, value) {
      selector = this.fromStringToSelector(selector);
      assertion(Array.isArray(selector), "Parameter «selector» must be array on «NwtResourceApi.expand»");
      assertion(selector.length > 1, "Parameter «selector.length» must be greater than 1 on «NwtResourceApi.expand»");
      assertion(typeof value === "object", "Parameter «value» must be object on «NwtResourceApi.expand»");
      const apiId = selector.shift();
      assertion(apiId in this.apis, `Parameter «selector[0]» must match a known api but «${apiId}» does not on «NwtResourceApi.expand»`);
      let target = this.apis[apiId];
      for(let index=0; index<selector.length; index++) {
        const prop = selector[index];
        const isLast = (selector.length - 1) === index;
        if(isLast) {
          const child = target[prop];
          if(child instanceof this.Nexer) {
            NwtObjectUtils.overrideOnce(child, value);
          } else if(typeof child === "undefined") {
            target[prop] = this.Nexer.create(value);
          } else {
            throw new Error(`Parameter «selector» which is «${selector.join(".")}» is trying to override a previous property on «NwtResourceApi.expand»`);
          }
        } else {
          const hasProp = prop in target;
          if(!hasProp) {
            target[prop] = NwtResourceApi.Nexer.create({});
          }
          target = target[prop];
        }
      }
    }

    static set(selector, value, force = false) {
      selector = this.fromStringToSelector(selector);
      assertion(Array.isArray(selector), "Parameter «selector» must be array on «NwtResourceApi.set»");
      assertion(selector.length > 1, "Parameter «selector.length» must be greater than 1 on «NwtResourceApi.set»");
      const apiId = selector.shift();
      assertion(apiId in this.apis, `Parameter «selector[0]» must match a known api but «${apiId}» does not on «NwtResourceApi.set»`);
      let target = this.apis[apiId];
      for(let index=0; index<selector.length; index++) {
        const prop = selector[index];
        const isLast = (selector.length - 1) === index;
        if(isLast) {
          if(!force) {
            assertion(!(prop in target), `Parameter «selector» which is «${selector.join(".")}» is trying to override property «${selector.join(".")}» on «NwtResourceApi.set»`);
          }
          target[prop] = value;
        } else {
          const hasProp = prop in target;
          if(!hasProp) {
            target[prop] = NwtResourceApi.Nexer.create({});
          }
          target = target[prop];
        }
      }
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
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtComponentsCache'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtComponentsCache'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtComponentsCache = class {

    has(id) {
      return id in Vue.options.components;
    }

    get(id) {
      return Vue.options.components[id];
    }

    set(id, value) {
      Vue.options.components[id] = value;
    }

  };

  NwtComponentsCache.global = new NwtComponentsCache();

  return NwtComponentsCache;

});
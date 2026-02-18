(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProxyChain'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProxyChain'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtProxyChain = class {

    static Nexer = NwtProxyChainNexer;

    static $proxify(root, iterable, binder = false) {
      return new Proxy(iterable, {
        get: (target, namespaceId) => {
          const value = target[namespaceId];
          if (value instanceof this.Nexer) {
            return this.$proxify(root, value, binder);
          }
          if (typeof value !== "function") {
            return value;
          }
          if(binder) {
            return binder(value, namespaceId, root, iterable);
          }
          return value.bind(root);
        }
      });
    }

    static from(root, options = {}) {
      assertion(typeof root === "object", "Parameter «root» must be object on «NwtProxyChain.from»");
      assertion(typeof options === "object", "Parameter «options» must be object on «NwtProxyChain.from»");
      assertion(typeof options.input === "object", "Parameter «options.input» must be object on «NwtProxyChain.from»");
      if(options.binder) assertion(typeof options.binder === "function", "Parameter «options.binder» must be function or undefined on «NwtProxyChain.from»");
      return this.$proxify(root, options.input, options.binder);
    }

  };

  return NwtProxyChain;

});
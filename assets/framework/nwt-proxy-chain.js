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

  const NwtProxyChainFactory = (builder = p => p) => {
    const proxyChainable = {
      find(path) {
        trace("NwtProxyChainFactory.prototype.find");
        return builder(path);
      },
      $: new Proxy({}, {
        get(target, prop) {
          trace("NwtProxyChainFactory.prototype.$:get");
          if (prop === Symbol.toPrimitive) return undefined;
          const path = [];
          const handler = {
            get(_, key) {
              if (key === '$') {
                return proxyChainable.find(path);
              }
              path.push(key);
              return new Proxy({}, handler);
            }
          };
          path.push(prop);
          return new Proxy({}, handler);
        }
      }),
    };
    return proxyChainable;
  };

  const NwtProxyChain = class {

    static fromFactory(builder = undefined) {
      return NwtProxyChainFactory(builder);
    }

  };

  return NwtProxyChain;

});
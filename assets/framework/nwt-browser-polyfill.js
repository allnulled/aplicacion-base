(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtBrowserPolyfill'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtBrowserPolyfill'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtBrowserPolyfill = class {

    static require = NwtEnvironment.isNode ? require : this.requireByBrowser;

    static requireByBrowser(mod) {
      return this.requireModules[mod] || undefined;
    }

    static requireModules = {
      path: {
        resolve(...subpaths) {
          return subpaths.join("/").replace(/\/+/g, "/");
        }
      },
      fs: {
        promises: {
          readFile() {
            return "ok";
          }
        }
      }
    };

  };

  return NwtBrowserPolyfill;

});
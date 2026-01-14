/**
 * 
 * # Nwt Lazy Loader API
 * 
 * API para carga cacheable de recursos JS y CSS.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtLazyLoader
 * NwtFramework.LazyLoader
 * Vue.prototype.$nwt.LazyLoader
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite algunas cosas como:
 * 
 * ```js
 * await NwtLazyLoader.lazyLoad({
 *   id: "jquery",
 *   type: "scriptSrc",
 *   url: "https://cdn.js/jquery.js",
 *   checker: typeof jQuery !== "undefined",
 * });
 * await NwtLazyLoader.lazyLoad({
 *   id: "styles",
 *   type: "linkStylesheet",
 *   url: "https://cdn.js/styles.css",
 * });
 * await NwtLazyLoader.loadHighlightJs(); // carga highlight.js
 * await NwtLazyLoader.loadJsBeautify(); // carga js-beautify
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyLoader'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyLoader'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLazyLoader = class {

    static validateLazyLoadable(lazyLoadable) {
      trace("NwtLazyLoader.validateLazyLoadable");
      assertion(typeof lazyLoadable === "object", "Parameter «lazyLoadable» must be an object on «NwtLazyLoader»");
      assertion(typeof lazyLoadable.id === "string", "Parameter «lazyLoadable.id» must be an string on «NwtLazyLoader»");
      assertion(typeof lazyLoadable.url === "string", "Parameter «lazyLoadable.url» must be an string on «NwtLazyLoader»");
      assertion(typeof lazyLoadable.type === "string", "Parameter «lazyLoadable.type» must be an string on «NwtLazyLoader»");
      assertion(["scriptSrc", "linkStylesheet"].indexOf(lazyLoadable.type) !== -1, "Parameter «lazyLoadable.type» must be a known type on «NwtLazyLoader»");
      assertion(typeof lazyLoadable.checker === "function", "Parameter «lazyLoadable.checker» must be an function on «NwtLazyLoader»");
    }

    static lazyLoad(lazyLoadable) {
      trace("NwtLazyLoader.lazyLoad");
      this.validateLazyLoadable(lazyLoadable);
      const isLoaded = lazyLoadable.checker();
      if (isLoaded) {
        return false;
      }
      if (lazyLoadable.type === "scriptSrc") {
        return NwtImporter.scriptSrc(lazyLoadable.url);
      }
      if (lazyLoadable.type === "linkStylesheet") {
        return NwtImporter.linkStylesheet(lazyLoadable.url);
      }
    }

    static loadHighlightJs() {
      trace("NwtLazyLoader.loadHighlightJs");
      return Promise.all([
        this.lazyLoad({
          id: "highlight.js",
          url: "assets/external/highlight.js/highlight.min.js",
          type: "scriptSrc",
          checker: () => typeof hljs !== "undefined",
        }),
        this.lazyLoad({
          id: "highlight.js::styles/default",
          url: "assets/external/highlight.js/styles/default.min.css",
          type: "linkStylesheet",
          checker: () => false,
        }),
      ]);
    }

    static loadJsBeautify() {
      trace("NwtLazyLoader.loadJsBeautify");
      return this.lazyLoad({
        id: "js-beautify.js",
        url: "assets/external/js-beautify/js-beautify.min.js",
        type: "scriptSrc",
        checker: () => typeof window.beautifier !== "undefined",
      });
    }

  };

  return NwtLazyLoader;

});
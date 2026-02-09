/**
 * 
 * # NwtLiveInjector
 * 
 * API para inyectar código en runtime. API para debugging.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtLiveInjector
 * NwtFramework.LiveInjector
 * Vue.prototype.$nwt.LiveInjector
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtLiveInjector.start();
 * // El fichero que está en el root del proyecto: `injector.js`
 * // se queda a la escucha de cambios
 * // y cuando guardas, inyecta el código que en él haya
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLiveInjector'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLiveInjector'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLiveInjector = class {

    static currentInjector = false;

    static lastInjection = new Date();
    
    static lastInjectionMinDiff = 1000;

    static async start(force = false) {
      trace("NwtLiveInjector.start");
      if (this.currentInjector && !force) {
        return this.currentInjector;
      }
      const fs = require("fs");
      const injectorPath = NwtPaths.global.relative("injector.js");
      this.currentInjector = fs.watch(injectorPath, {}, async (event, filename, filepath) => {
        try {
          Skip_if_diff_is_less_than_minimum: {
            const diff = (new Date()) - this.lastInjection;
            if(diff < this.lastInjectionMinDiff) return;
            this.lastInjection = new Date();
          }
          const evaluable = await NwtFilesystem.readFile(injectorPath);
          const beautified = NwtCodeComposer.beautifyJs(evaluable);
          // console.log("[nwt-live-injector][question]\n", beautified);
          const callback = NwtCodeComposer.createAsyncFunction(beautified);
          const output = await callback();
          if(typeof output !== "undefined") {
            console.log("[nwt-live-injector][answer]\n", output);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }

  };

  return NwtLiveInjector;

});
/**
 * 
 * # Nwt Tracer API
 * 
 * API para trazar la ejecución del programa.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * // La clase global
 * NwtTracer
 * NwtFramework.Tracer
 * Vue.prototype.$nwt.Tracer
 * 
 * // La instancia global
 * NwtTracer.global // instancia
 * Vue.prototype.$tracer === NwtTracer.global // instancia
 * 
 * // La función global
 * trace // Función de traceo global
 * Vue.prototype.$trace === trace // Función de traceo
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite algunas cosas como:
 * 
 * ```js
 * NwtTracer.global.activate();
 * NwtTracer.global.deactivate();
 * NwtTracer.global.trace();
 * const traceFunction = NwtTracer.global.createTrace();
 * traceFunction("method", [1,2,3]);
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtTracer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtTracer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtTracer = class {

    static default = this;

    constructor(id, isActivated = false) {
      this.id = id;
      this.isActivated = isActivated;
    }

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }

    trace(message, args = []) {
      if(this.isActivated) {
        console.log(`[trace][${this.id}] ${message}`, args);
      }
    }

    createTrace() {
      return this.trace.bind(this);
    }

    exportToGlobal() {
      if(typeof window !== "undefined") {
        window.trace = this.createTrace();
      }
      if(typeof global !== "undefined") {
        global.trace = this.createTrace();
      }
    }

  };

  NwtTracer.global = new NwtTracer("global", true);

  NwtTracer.global.exportToGlobal();

  return NwtTracer;

});
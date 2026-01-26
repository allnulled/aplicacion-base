/**
 * 
 * # NwtIterableCommandClass
 * 
 * API para el iterable de un comando. Object-oriented approach.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtIterableCommandClass
 * NwtFramework.IterableCommandClass
 * Vue.prototype.$nwt.IterableCommandClass
 * ```
 * 
 * ## Ventajas
 * 
 * Extiende NwtIterableClass para dar una implementación concreta aplicable a la API de comandos.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtIterableCommandClass'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtIterableCommandClass'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtIterableCommandClass = class extends NwtIterableClass {

    constructor(injections = {}) {
      super(injections);
      trace("NwtIterableCommandClass.constructor");
      Flag_related: {
        this.wasStarted = false;
      }
      Collection_related: {
        this.collection = undefined;
        this.collectionInitialized = undefined;
        this.collectionIndex = undefined;
        this.collectionPair = undefined;
        this.collectionKey = undefined;
        this.collectionValue = undefined;
      }
      Output_related: {
        this.output = undefined;
      }
      Object.assign(this, injections);
    }

    async onRun() {
      trace("NwtIterableCommandClass.prototype.onRun");
      try {
        if (await this.onInitializeCollection()) return this.onReturn();
        if (await this.onPrepareNextIteration()) return this.onReturn();
        this.wasStarted = true;
        if (await this.onStep("onStart")) return this.onReturn();
        if (await this.onStep("onInitialized")) return this.onReturn();
        if (await this.onStep("onCondition")) return this.onReturn();
        while (this.onEvaluateCondition()) {
          try {
            if (await this.onStep("onIterationStart", [this.collectionValue, this.collectionKey, this.collectionIndex])) return this.onReturn();
            if (await this.onStep("onIteration", [this.collectionValue, this.collectionKey, this.collectionIndex])) return this.onReturn();
            if (await this.onStep("onIterationSuccess", [this.collectionValue, this.collectionKey, this.collectionIndex])) return this.onReturn();
            if (await this.onStep("onIterationEnd", [this.collectionValue, this.collectionKey, this.collectionIndex])) return this.onReturn();
            if (await this.onStep("onProgression", [this.collectionValue, this.collectionKey, this.collectionIndex])) return this.onReturn();
            if (await this.onPrepareNextIteration()) return this.onReturn();
          } catch (error) {
            if (await this.onStep("onIterationError", [error])) return this.onReturn();
          } finally {
            if (await this.onStep("onIterationFinally")) return this.onReturn();
          }
        }
        if (await this.onStep("onEnd")) return this.onReturn();
      } catch (error) {
        if (await this.onStep("onError", [error])) return this.onReturn();
      } finally {
        if (await this.onStep("onFinally")) return this.onReturn();
      }
      return this.output;
    }

    onIterationStart() {

    }
    
    onProgression() {

    }

  };

  return NwtIterableCommandClass;

});
/**
 * 
 * # NwtIterableClass
 * 
 * API para crear iterables. Object-oriented approach (no templated-code approach).
 * 
 * ## Exposición
 * 
 * ```js
 * NwtIterableClass
 * NwtFramework.IterableClass
 * Vue.prototype.$nwt.IterableClass
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * await NwtIterableClass.create({
 *   // Inyecciones: por documentar
 * }).run();
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtIterableClass'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtIterableClass'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtIterableClass = class {

    static create(...args) {
      trace("NwtIterableClass.create");
      return new this(...args);
    }

    static run(injections = {}) {
      trace("NwtIterableClass.run");
      return (new this(injections)).run();
    }

    constructor(injections = {}) {
      trace("NwtIterableClass.constructor");
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

    onEvaluateCondition() {
      trace("NwtIterableClass.prototype.onEvaluateCondition");
      const hasIndex = typeof this.collectionIndex === "number";
      const hasKey = typeof this.collectionKey !== "undefined";
      if (hasIndex && hasKey) {
        return true;
      }
      return false;
    }

    onInitializeCollection() {
      trace("NwtIterableClass.prototype.onInitializeCollection");
      this.collectionInitialized = [];
      const allKeys = Object.keys(this.collection || {});
      for (let index = 0; index < allKeys.length; index++) {
        const key = allKeys[index];
        const val = this.collection[key];
        this.collectionInitialized[index] = [key, val];
      }
    }

    onPrepareNextIteration() {
      trace("NwtIterableClass.prototype.onPrepareNextIteration");
      Inicializar_o_skipear: {
        const setIndex = (index) => {
          this.collectionIndex = index;
          this.collectionPair = (this.collectionInitialized && (this.collectionIndex in this.collectionInitialized)) ? this.collectionInitialized[this.collectionIndex] : undefined;
          this.collectionKey = this.collectionPair ? this.collectionPair[0] : undefined;
          this.collectionValue = this.collectionPair ? this.collectionPair[1] : undefined;
        };
        const hasCollection = (typeof this.collectionInitialized !== "undefined") && this.collectionInitialized.length;
        if(!hasCollection) {
          return setIndex(undefined);
        }
        const hasIndex = typeof this.collectionIndex !== "undefined";
        if(!hasIndex) {
          return setIndex(0);
        }
        const hasPair = typeof this.collectionPair !== "undefined";
        if(!hasPair) {
          return;
        }
        setIndex(this.collectionIndex + 1);
      }
    }

    noop() { }

    async onStep(method, args = []) {
      trace(`NwtIterableClass.prototype.onStep:${method}`);
      const methodFunction = this[method] || this.noop;
      const result = await methodFunction.call(this.scope || this, ...args);
      return typeof this.output !== "undefined";
    }

    abort(output) {
      trace("NwtIterableClass.prototy.abort");
      this.output = output;
    }

    onReturn() {
      trace("NwtIterableClass.prototype.onReturn");
      return this.output;
    }

    async onRun() {
      trace("NwtIterableClass.prototype.onRun");
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

    run() {
      trace("NwtIterableClass.prototype.run");
      return this.onRun();
    }

  };

  return NwtIterableClass;

});
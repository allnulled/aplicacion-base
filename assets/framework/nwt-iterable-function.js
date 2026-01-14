/**
 * 
 * # NwtIterableFunction
 * 
 * API para crear funciones iterables. Templated-code approach.
 * 
 * Esta API usa por debajo:
 * 
 * ```js
 * await NwtTemplates.global.compile.tjs.file.to.async(
 *   "nwt/nwt-iterable-function/template.js", // Que está aquí: assets/framework/nwt-templates/templates/nwt/nwt-iterable-function/template.js
 *   { ...this.iterable.onCompiledArguments, iterable: this.iterable },
 *   Object.keys({ ...this.iterable.onCompiledArguments, iterable: this.iterable }),
 * );
 * ```
 * 
 * ## Exposición
 * 
 * ```js
 * NwtIterableFunction
 * NwtFramework.IterableFunction
 * Vue.prototype.$nwt.IterableFunction
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtIterableFunction.utils.fromFunctionToBodyString(callback:Function):String; // usa por debajo NwtCodeComposer.getBlankFunctionBody(...)
 * NwtIterableFunction.utils.fromCollectionToArray(collection:Array|Object):Array; // homogeneiza arrays y objetos
 * await NwtIterableFunction.run({
 *   onWasStarted: ...,
 *   onIndex: ...,
 *   onItem: ...,
 *   onKey: ...,
 *   onValue: ...,
 *   onIdentifier: ...,
 *   onCollection: ...,
 *   onCompiledArguments: ...,
 *   onNextIteration: ...,
 *   onInterlapse: ...,
 *   onCompileCollection: ...,
 *   onCompileCode: ...,
 *   onCondition: ...,
 *   onProgression: ...,
 *   onIteration: ...,
 *   onRun: ...,
 *   onFunctionStart: ...,
 *   onFunctionSuccess: ...,
 *   onFunctionError: ...,
 *   onFunctionFinally: ...,
 *   onFunctionEnd: ...,
 *   onIterationStart: ...,
 *   onIterationSuccess: ...,
 *   onIterationError: ...,
 *   onIterationFinally: ...,
 *   onIterationEnd: ...,
 *   onAbortion: ...,
 * });
 * ```
 * 
 */

(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtIterableFunction'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtIterableFunction'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtIterableFunction = class {

    static run(it) {
      trace("NwtIterableFunction.run");
      const obj = new this(it);
      return obj.run();
    }

    static utils = {
      fromFunctionToBodyString: callback => {
        trace("NwtIterableFunction.utils.fromFunctionToBodyString");
        assertion(typeof callback === "function", "Parameter «callback» must be an function on «NwtIterableFunction.utils.fromFunctionToBodyString»");
        return NwtCodeComposer.getBlankFunctionBody(callback);
      },
      fromCollectionToArray: (collection) => {
        trace("NwtIterableFunction.utils.fromCollectionToArray");
        assertion(typeof collection === "object", "Parameter «collection» must be an object on «NwtIterableFunction.utils.fromCollectionToArray»");
        return Object.keys(collection).map(key => {
          const val = collection[key];
          return [key, val];
        });
      }
    }

    static defaultIterable = {
      onWasStarted: false,
      onIndex: undefined,
      onItem: undefined,
      onKey: undefined,
      onValue: undefined,
      onIdentifier: "Nwt_iterable_function_loop",
      onCollection: [],
      onCompiledArguments: {},
      onNextIteration: async function () {
        trace("NwtIterableFunction.defaultIterable.onNextIteration");
        this.iterable.onIndex = typeof this.iterable.onIndex === "number" ? this.iterable.onIndex + 1 : 0;
        if((!Array.isArray(this.iterable.onCollection)) || (this.iterable.onIndex >= this.iterable.onCollection.length)) {
          this.iterable.onItem = [undefined, undefined];
          this.iterable.onKey = undefined;
          this.iterable.onValue = undefined;
      } else if(this.iterable.onIndex < this.iterable.onCollection.length) {
          this.iterable.onItem = this.iterable.onCollection[this.iterable.onIndex];
          this.iterable.onKey = this.iterable.onItem[0];
          this.iterable.onValue = this.iterable.onItem[1];
        }
      },
      onInterlapse() {
        trace("NwtIterableFunction.defaultIterable.onInterlapse");
      },
      onCompileCollection: async function() {
        trace("NwtIterableFunction.defaultIterable.onCompileCollection");
        this.iterable.onCollection = this.constructor.utils.fromCollectionToArray(this.iterable.onCollection);
      },
      onCompileCode: async function() {
        trace("NwtIterableFunction.defaultIterable.onCompileCode");
        this.iterable.onRun = await NwtTemplates.global.compile.tjs.file.to.async(
          "nwt/nwt-iterable-function/template.js",
          { ...this.iterable.onCompiledArguments, iterable: this.iterable },
          Object.keys({ ...this.iterable.onCompiledArguments, iterable: this.iterable }),
        );
      },
      onCondition: async function () {
        trace("NwtIterableFunction.defaultIterable.onCondition");
        if(typeof this.iterable.onKey !== "undefined") {
          return true;
        }
      },
      onProgression: async function () {
        trace("NwtIterableFunction.defaultIterable.onProgression");
        // Además de this.iterable.onItem
        // Además de this.iterable.onIndex
        // Además de this.iterable.onKey
        // Además de this.iterable.onValue
        // Aquí puedes poner más cosas.
      },
      onIteration: async function() {
        trace("NwtIterableFunction.defaultIterable.onIteration");
        console.log(this.iterable.onIndex);   // Prints index!
        console.log(this.iterable.onItem);    // Prints key and value!
        console.log(this.iterable.onKey);     // Prints key!
        console.log(this.iterable.onValue);   // Prints value!
      },
      onRun() {
        throw new Error("Lifecycle is not compiled yet");
      },
      onFunctionStart: async function () {
        trace("NwtIterableFunction.defaultIterable.onFunctionStart");
      },
      onFunctionSuccess: async function () {
        trace("NwtIterableFunction.defaultIterable.onFunctionSuccess");
      },
      onFunctionError: async function () {
        trace("NwtIterableFunction.defaultIterable.onFunctionError");
        Vue.prototype.$toasts.showError(error);
      },
      onFunctionFinally: async function () {
        trace("NwtIterableFunction.defaultIterable.onFunctionFinally");
      },
      onFunctionEnd: async function () {
        trace("NwtIterableFunction.defaultIterable.onFunctionEnd");
      },
      onIterationStart: async function () {
        trace("NwtIterableFunction.defaultIterable.onIterationStart");
      },
      onIterationSuccess: async function () {
        trace("NwtIterableFunction.defaultIterable.onIterationSuccess");
      },
      onIterationError: async function () {
        trace("NwtIterableFunction.defaultIterable.onIterationError");
        Vue.prototype.$toasts.showError(error);
      },
      onIterationFinally: async function () {
        trace("NwtIterableFunction.defaultIterable.onIterationFinally");
      },
      onIterationEnd: async function () {
        trace("NwtIterableFunction.defaultIterable.onIterationEnd");
      },
      onAbortion: async function() {
        trace("NwtIterableFunction.defaultIterable.onAbortion");
      }
    };

    constructor(iterable = {}) {
      trace("NwtIterableFunction.constructor");
      this.iterable = {};
      Object.assign(this.iterable, this.constructor.defaultIterable, iterable);
    }

    async run() {
      trace("NwtIterableFunction.prototype.run");
      assertion(!this.iterable.onWasStarted, "Cannot run iterable-function process more than once on «NwtIterableFunction.prototype.run»");
      this.iterable.onWasStarted = true;
      await this.iterable.onCompileCollection.call(this);
      await this.iterable.onCompileCode.call(this);
      NwtToasts.show({
        title: "Evaluando ciclo de vida en JS",
        code: this.iterable.onRun.toString(),
        timeout: 5000 * 5,
      });
      return await this.iterable.onRun.call(this, ...Object.values({ ...this.iterable.onCompiledArguments, iterable: this.iterable }));
    }

    async abort(output = undefined) {
      trace("NwtIterableFunction.prototype.abort");
      this.iterable.NWT_LIFECYCLE_CONDITION_FLAG = false;
      if(typeof output !== "undefined") {
        this.iterable.NWT_LIFECYCLE_CONDITION_OUTPUT = output;
      }
      await this.iterable.onAbortion(output);
      return this.iterable.NWT_LIFECYCLE_CONDITION_OUTPUT;
    }

  }

  return NwtIterableFunction;

});
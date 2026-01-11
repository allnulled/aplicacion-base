(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtAstTreeClass'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtAstTreeClass'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtAstTreeClass = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultInjections = {
      onFunctionStart: () => {
        trace("NwtAstTreeClass.defaultInjections.onFunctionStart");
      },
      onInitializeCollection: () => {
        trace("NwtAstTreeClass.defaultInjections.onInitializeCollection");
      },
      onCollection: [],
      onInitializeDimensions: () => {
        trace("NwtAstTreeClass.defaultInjections.onInitializeDimensions");
      },
      onDimensions: [],
      onNextIteration: () => {
        trace("NwtAstTreeClass.defaultInjections.onNextIteration");
      },
      onCondition: () => {
        trace("NwtAstTreeClass.defaultInjections.onCondition");
      },
      onIterationStart: () => {
        trace("NwtAstTreeClass.defaultInjections.onIterationStart");
      },
      onIteration: () => {
        trace("NwtAstTreeClass.defaultInjections.onIteration");
      },
      onIterationSuccess: () => {
        trace("NwtAstTreeClass.defaultInjections.onIterationSuccess");
      },
      onIterationError: () => {
        trace("NwtAstTreeClass.defaultInjections.onIterationError");
      },
      onIterationFinally: () => {
        trace("NwtAstTreeClass.defaultInjections.onIterationFinally");
      },
      onIterationEnd: () => {
        trace("NwtAstTreeClass.defaultInjections.onIterationEnd");
      },
      onInterlapse: () => {
        trace("NwtAstTreeClass.defaultInjections.onInterlapse");
      },
      onProgression: () => {
        trace("NwtAstTreeClass.defaultInjections.onProgression");
      },
      onFunctionSuccess: () => {
        trace("NwtAstTreeClass.defaultInjections.onFunctionSuccess");
      },
      onFunctionError: () => {
        trace("NwtAstTreeClass.defaultInjections.onFunctionError");
      },
      onFunctionFinally: () => {
        trace("NwtAstTreeClass.defaultInjections.onFunctionFinally");
      },
      onFunctionEnd: () => {
        trace("NwtAstTreeClass.defaultInjections.onFunctionEnd");
      },
    }

    constructor(injections = {}, argumentNames = []) {
      trace("NwtAstTreeClass.constructor");
      this.injections = {};
      this.argumentNames = argumentNames;
      Object.assign(this.injections, this.constructor.defaultInjections, injections);
    }

    static compile = {
      to: {
        async: (...args) => this.create(...args).compile.to.async(),
        sync: (...args) => this.create(...args).compile.to.sync(),
      }
    }

    compile = {
      to: {
        async: () => {
          trace("NwtAstTreeClass.prototype.compile.to.async");
          return NwtTemplates.global.compile.tjs.source.to.async(NwtAstTreeTemplateSource, this.injections, this.argumentNames)
        },
        sync: () => {
          trace("NwtAstTreeClass.prototype.compile.to.sync");
          return NwtTemplates.global.compile.tjs.source.to.sync(NwtAstTreeTemplateSource, this.injections, this.argumentNames)
        }
      }
    };

  };

  return NwtAstTreeClass;

});
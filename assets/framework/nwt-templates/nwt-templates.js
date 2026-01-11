(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtTemplates'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtTemplates'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtTemplates = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir = false) {
      this.basedir = basedir || NwtPaths.relative("assets/framework/nwt-templates/templates");
    }

    static compileByTjs(tjsSource, parameterNames = [], settings = {}) {
      trace("NwtTemplates.compileByTjs");
      const jsSource = TjsParser.parse(tjsSource);
      if(settings.async) {
        const AsyncFunction = (async () => {}).constructor;
        return new AsyncFunction(...parameterNames, jsSource);
      } else {
        return new Function(...parameterNames, jsSource);
      }
    }

    static renderByTjs(source, injectedParameters = {}, settings = {}) {
      trace("NwtTemplates.renderByTjs");
      const parameterNames = Object.keys(injectedParameters);
      const parameterValues = Object.values(injectedParameters);
      const callback = this.compileByTjs(source, parameterNames, settings);
      return callback(...parameterValues);
    }

    async compileByTjsFile(tjsSubpath, parameterNames = [], settings = {}) {
      trace("NwtTemplates.prototype.compileByTjsFile");
      const path = require("path");
      const subpath = path.resolve(this.basedir, tjsSubpath);
      const tjsSource = await NwtFilesystem.readFile(subpath);
      const callback = this.constructor.compileByTjs(tjsSource, parameterNames, settings);
      return callback;
    }

    async renderByTjsFile(tjsSubpath, injectedParameters = {}, settings = {}) {
      trace("NwtTemplates.prototype.renderByTjsFile");
      const parameterNames = Object.keys(injectedParameters);
      const parameterValues = Object.values(injectedParameters);
      const callback = await this.compileByTjsFile(tjsSubpath, parameterNames, settings);
      return callback(...parameterValues);
    }

    async evaluateByTjsFile(tjsSubpath, injectedParameters = [], settings = {}) {
      trace("NwtTemplates.prototype.evaluateByTjsFile");
      const callbackSource = await this.renderByTjsFile(tjsSubpath, injectedParameters, settings);
      let callback = false;
      if(settings.async) {
        const AsyncFunction = (async () => {}).constructor;
        callback = new AsyncFunction(callbackSource);
      } else {
        callback = new Function(callbackSource);
      }
      return callback();
    }

  };

  NwtTemplates.global = NwtTemplates.create("assets/framework/nwt-templates/templates");

  return NwtTemplates;

});
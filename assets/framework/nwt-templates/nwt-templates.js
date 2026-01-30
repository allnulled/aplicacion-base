/**
 * 
 * # NwtTemplates
 * 
 * API para la gestión de plantillas.
 * 
 */
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
      trace("NwtTemplates.create");
      return new this(...args);
    }

    constructor(basedir = false) {
      trace("NwtTemplates.constructor");
      this.basedir = basedir || NwtPaths.global.relative("assets/framework/nwt-templates/templates");
    }

    resolve(...subpaths) {
      trace("NwtTemplates.prototype.resolve");
      return require("path").resolve(this.basedir, ...subpaths);
    }

    static defaultCompileSettings = {
      async: false,
    };

    static compileByTjsSource(tjsSource, parameterNames = [], settings = this.defaultCompileSettings) {
      trace("NwtTemplates.compileByTjsSource");
      assertion(typeof tjsSource === "string", "Parameter «tjsSource» must be a string on «NwtTemplates.compileByTjsSource»");
      assertion(typeof parameterNames === "object", "Parameter «parameterNames» must be an object on «NwtTemplates.compileByTjsSource»");
      assertion(Array.isArray(parameterNames), "Parameter «parameterNames» must be an array on «NwtTemplates.compileByTjsSource»");
      assertion(typeof settings === "object", "Parameter «settings» must be an object on «NwtTemplates.compileByTjsSource»");
      assertion(!Array.isArray(settings), "Parameter «settings» must be an object and not an array on «NwtTemplates.compileByTjsSource»");
      assertion(typeof settings.async === "boolean", "Parameter «settings.async» must be a boolean on «NwtTemplates.compileByTjsSource»");
      const jsSource = TjsParser.parse(tjsSource);
      if (settings.async) {
        return NwtCodeComposer.createAsyncFunction(jsSource, parameterNames);
      } else {
        return NwtCodeComposer.createSyncFunction(jsSource, parameterNames);
      }
    }

    static renderByTjsSource(source, injectedParameters = {}, settings = this.defaultCompileSettings) {
      trace("NwtTemplates.renderByTjsSource");
      assertion(typeof source === "string", "Parameter «source» must be a string on «NwtTemplates.renderByTjsSource»");
      assertion(typeof injectedParameters === "object", "Parameter «injectedParameters» must be an object on «NwtTemplates.renderByTjsSource»");
      assertion(!Array.isArray(injectedParameters), "Parameter «injectedParameters» must be an object and not an array on «NwtTemplates.renderByTjsSource»");
      assertion(typeof settings === "object", "Parameter «settings» must be an object on «NwtTemplates.renderByTjsSource»");
      assertion(!Array.isArray(settings), "Parameter «settings» must be an object and not an array on «NwtTemplates.renderByTjsSource»");
      assertion(typeof settings.async === "boolean", "Parameter «settings.async» must be a boolean on «NwtTemplates.renderByTjsSource»");
      const parameterNames = Object.keys(injectedParameters);
      const parameterValues = Object.values(injectedParameters);
      const callback = this.compileByTjsSource(source, parameterNames, settings);
      return callback(...parameterValues);
    }

    render = {
      ejs: {
        source: (...args) => ejs.render(...args),
        file: async (subpath, ...args) => {
          const content = await NwtFilesystem.readFile(this.resolve(subpath));
          return ejs.render(content, ...args);
        }
      },
      tjs: {
        source: (...args) => {
          trace("NwtTemplates.prototype.render.tjs.source");
          this.constructor.renderByTjsSource(...args);
        },
        file: (...args) => {
          trace("NwtTemplates.prototype.render.tjs.file");
          this.renderByTjsFile(...args);
        },
      }
    };

    compile = {
      ejs: {
        source: (...args) => ejs.compile(...args),
        file: async (subpath, ...args) => {
          const content = await NwtFilesystem.readFile(this.resolve(subpath));
          return ejs.compile(content, ...args);
        }
      },
      tjs: {
        function: {
          to: {
            string: (callback, templateInjectedParameters = {}, settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.function.to.string");
              const templateSource = NwtCodeComposer.getBlankFunctionBody(callback);
              return this.compile.tjs.source.to.string(templateSource, templateInjectedParameters, settings);
            },
            renderer: (callback, argnames = [], settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.function.to.renderer");
              const templateSource = NwtCodeComposer.getBlankFunctionBody(callback);
              return this.compile.tjs.source.to.renderer(templateSource, argnames, settings);
            },
            async: (callback, templateInjectedParameters, argnames = [], settings) => {
              trace("NwtTemplates.prototype.compile.tjs.function.to.async");
              const templateSource = NwtCodeComposer.getBlankFunctionBody(callback);
              return this.compile.tjs.source.to.async(templateSource, templateInjectedParameters, argnames, settings);
            },
            sync: (callback, templateInjectedParameters = {}, argnames = [], settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.function.to.sync");
              const templateSource = NwtCodeComposer.getBlankFunctionBody(callback);
              return this.compile.tjs.source.to.sync(templateSource, templateInjectedParameters, argnames, settings);
            },
          }
        },
        source: {
          to: {
            string: (source, templateInjectedParameters = {}, settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.source.to.string");
              return this.constructor.renderByTjsSource(source, templateInjectedParameters, settings);
            },
            renderer: (source, argnames = [], settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.source.to.renderer");
              return this.constructor.compileByTjsSource(source, argnames, settings);
            },
            async: (source, templateInjectedParameters = {}, argnames = [], settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.source.to.async");
              const functionSource = this.constructor.renderByTjsSource(source, templateInjectedParameters, settings);
              if (!settings.async) {
                return NwtCodeComposer.createAsyncFunction(functionSource, argnames);
              }
              return functionSource.then(src => NwtCodeComposer.createAsyncFunction(src, argnames));
            },
            sync: (source, templateInjectedParameters = {}, argnames = [], settings = this.constructor.defaultCompileSettings) => {
              trace("NwtTemplates.prototype.compile.tjs.source.to.sync");
              const functionSource = this.constructor.renderByTjsSource(source, templateInjectedParameters, settings);
              if (!settings.async) {
                return NwtCodeComposer.createAsyncFunction(functionSource, argnames);
              }
              return functionSource.then(src => NwtCodeComposer.createSyncFunction(src, argnames));
            },
          }
        },
        file: {
          to: {
            string: async (subpath, ...args) => {
              trace("NwtTemplates.prototype.compile.tjs.file.to.string");
              const templateSource = await NwtFilesystem.readFile(this.resolve(subpath));
              return this.compile.tjs.source.to.string(templateSource, ...args);
            },
            renderer: async (subpath, ...args) => {
              trace("NwtTemplates.prototype.compile.tjs.file.to.renderer");
              const templateSource = await NwtFilesystem.readFile(this.resolve(subpath));
              return this.compile.tjs.source.to.renderer(templateSource, ...args);
            },
            async: async (subpath, ...args) => {
              trace("NwtTemplates.prototype.compile.tjs.file.to.async");
              const templateSource = await NwtFilesystem.readFile(this.resolve(subpath));
              return this.compile.tjs.source.to.async(templateSource, ...args);
            },
            sync: async (subpath, ...args) => {
              trace("NwtTemplates.prototype.compile.tjs.file.to.sync");
              const templateSource = await NwtFilesystem.readFile(this.resolve(subpath));
              return this.compile.tjs.source.to.sync(templateSource, ...args);
            },
          }
        }
      }
    }

    async renderByTjsFile(tjsSubpath, injectedParameters = {}, settings = this.constructor.defaultCompileSettings) {
      trace("NwtTemplates.prototype.renderByTjsFile");
      assertion(typeof tjsSubpath === "string", "Parameter «tjsSubpath» must be a string on «NwtTemplates.prototype.renderByTjsFile»");
      assertion(typeof injectedParameters === "object", "Parameter «injectedParameters» must be an object on «NwtTemplates.prototype.renderByTjsFile»");
      assertion(!Array.isArray(injectedParameters), "Parameter «injectedParameters» must be an object and not an array on «NwtTemplates.prototype.renderByTjsFile»");
      assertion(typeof settings === "object", "Parameter «settings» must be an object on «NwtTemplates.prototype.renderByTjsFile»");
      assertion(!Array.isArray(settings), "Parameter «settings» must be an object and not an array on «NwtTemplates.prototype.renderByTjsFile»");
      assertion(typeof settings.async === "boolean", "Parameter «settings.async» must be a boolean on «NwtTemplates.prototype.renderByTjsFile»");
      const parameterNames = Object.keys(injectedParameters);
      const parameterValues = Object.values(injectedParameters);
      const callback = await this.compileByTjsFile(tjsSubpath, parameterNames, settings);
      return callback(...parameterValues);
    }

    async compileByTjsFile(tjsSubpath, parameterNames = [], settings = this.constructor.defaultCompileSettings) {
      trace("NwtTemplates.prototype.compileByTjsFile");
      assertion(typeof tjsSubpath === "string", "Parameter «tjsSubpath» must be a string on «NwtTemplates.prototype.compileByTjsFile»");
      assertion(Array.isArray(parameterNames), "Parameter «parameterNames» must be an array on «NwtTemplates.prototype.compileByTjsFile»");
      assertion(typeof settings === "object", "Parameter «settings» must be an object on «NwtTemplates.prototype.compileByTjsFile»");
      assertion(!Array.isArray(settings), "Parameter «settings» must be an object and not an array on «NwtTemplates.prototype.compileByTjsFile»");
      assertion(typeof settings.async === "boolean", "Parameter «settings.async» must be a boolean on «NwtTemplates.prototype.compileByTjsFile»");
      const path = require("path");
      const subpath = path.resolve(this.basedir, tjsSubpath);
      const tjsSource = await NwtFilesystem.readFile(subpath);
      const callback = this.constructor.compileByTjsSource(tjsSource, parameterNames, settings);
      return callback;
    }

    async evaluateByTjsFile(tjsSubpath, injectedParameters = [], settings = this.constructor.defaultCompileSettings) {
      trace("NwtTemplates.prototype.evaluateByTjsFile");
      assertion(typeof tjsSubpath === "string", "Parameter «tjsSubpath» must be a string on «NwtTemplates.prototype.evaluateByTjsFile»");
      assertion(typeof injectedParameters === "object", "Parameter «injectedParameters» must be an object on «NwtTemplates.prototype.evaluateByTjsFile»");
      assertion(!Array.isArray(injectedParameters), "Parameter «injectedParameters» must be an object and not an array on «NwtTemplates.prototype.evaluateByTjsFile»");
      assertion(typeof settings === "object", "Parameter «settings» must be an object on «NwtTemplates.prototype.evaluateByTjsFile»");
      assertion(!Array.isArray(settings), "Parameter «settings» must be an object and not an array on «NwtTemplates.prototype.evaluateByTjsFile»");
      assertion(typeof settings.async === "boolean", "Parameter «settings.async» must be a boolean on «NwtTemplates.prototype.evaluateByTjsFile»");
      const callbackSource = await this.renderByTjsFile(tjsSubpath, injectedParameters, settings);
      let callback = false;
      if (settings.async) {
        const AsyncFunction = (async () => { }).constructor;
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
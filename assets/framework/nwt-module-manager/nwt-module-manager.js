(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtModuleManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtModuleManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtModuleManager = class {

    static create(...args) {
      trace("NwtModuleManager.create");
      return new this(...args);
    }

    constructor(basedir) {
      trace("NwtModuleManager.constructor");
      this.basedir = basedir;
      this.defined = {};
    }

    resolve(...subpaths) {
      trace("NwtModuleManager.prototype.resolve");
      return require("path").resolve(this.basedir, ...subpaths);
    }

    define(id, dependencies = [], callback = NwtUtils.noop, context = {}) {
      trace("NwtModuleManager.prototype.define");
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtModuleManager.prototype.define»");
      assertion(Array.isArray(dependencies), "Parameter «dependencies» must be array on «NwtModuleManager.prototype.define»");
      assertion(typeof callback === "function", "Parameter «callback» must be function on «NwtModuleManager.prototype.define»");
      assertion(typeof context === "object", "Parameter «context» must be object on «NwtModuleManager.prototype.define»");
      this.defined[id] = { id, dependencies, callback, context };
    }

    import(id, injections = {}, ...others) {
      trace("NwtModuleManager.prototype.import");
      const isDefinition = (typeof id === "string")
        && (typeof injections === "object")
        && (others.length >= 2)
        && Array.isArray(others[0])
        && (typeof others[1] === "function");
      if(isDefinition) {
        const [ dependencies, callback, context ] = others;
        return this.importDefining(id, injections, dependencies, callback, context);
      }
      const isList = Array.isArray(id) && (others.length === 0);
      if(isList) {
        return this.importByArray(id, injections);
      }
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtModuleManager.prototype.import»");
      const definition = id in this.defined ? this.defined[id] : null;
      if (definition) {
        return this.importByDefinition(definition);
      }
      return this.importByFile(id, injections);
    }

    importDefining(id, injections, dependencies, callback, context) {
      trace("NwtModuleManager.prototype.importDefining");
      this.define(id, dependencies, callback, context);
      return this.import(id, injections);
    }

    async importByArray(idsArray, injections = {}) {
      trace("NwtModuleManager.prototype.importByArray");
      assertion(Array.isArray(idsArray), "Parameter «idsArray» must be array on «NwtModuleManager.prototype.importByArray»");
      const imported = [];
      for(let index=0; index<idsArray.length; index++) {
        const id = idsArray[index];
        const isList = Array.isArray(id);
        const isString = typeof id === "string";
        let result = undefined;
        if(isString) {
          result = await this.import(id, injections);
        } else if(isList) {
          assertion(typeof id[0] === "string", `Parameter «idsArray[${index}][0]» must be string on «NwtModuleManager.prototype.importByArray»`);
          assertion(typeof id[1] === "object", `Parameter «idsArray[${index}][1]» must be object on «NwtModuleManager.prototype.importByArray»`);
          result = await this.import(id[0], Object.assign({}, injections, id[1]));
        } else {
          assertion(false, `Parameter «idsArray» on index «${index}» must be string or array on «NwtModuleManager.prototype.importByArray»`);
        }
        imported.push(result);
      }
      return imported;
    }

    importByFile(subpath, injections = {}) {
      trace("NwtModuleManager.prototype.importByFile", subpath);
      assertion(typeof subpath === "string", "Parameter «subpath» must be string on «NwtModuleManager.prototype.importByFile»");
      assertion(typeof injections === "object", "Parameter «injections» must be object on «NwtModuleManager.prototype.importByFile»");
      const path = this.resolve(subpath);
      return NwtImporter.asyncSource(path, injections);
    }

    async importByDefinition(definition) {
      assertion(typeof definition === "object", "Parameter «definition» must be object on «NwtModuleManager.prototype.importByDefinition»");
      const { id, dependencies, callback, context = {} } = definition;
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtModuleManager.prototype.importByDefinition»");
      assertion(Array.isArray(dependencies), "Parameter «dependencies» must be array on «NwtModuleManager.prototype.importByDefinition»");
      assertion(typeof callback === "function", "Parameter «callback» must be function on «NwtModuleManager.prototype.importByDefinition»");
      assertion(typeof context === "object", "Parameter «context» must be object on «NwtModuleManager.prototype.importByDefinition»");
      const importedDependencies = [];
      for (let index = 0; index < dependencies.length; index++) {
        const dependency = dependencies[index];
        const isParameters = Array.isArray(dependency) ? true : typeof dependency === "string" ? false : null;
        assertion(typeof isParameters === "boolean", `Parameter «dependency» on index «${index}» must be array or string on «NwtModuleManager.prototype.importByDefinition»`);
        if(isParameters) {
          assertion(typeof dependency[0] === "string", `Parameter «dependencies[${index}][0]» must be string on «NwtModuleManager.prototype.importByDefinition»`);
          assertion(typeof dependency[1] === "object", `Parameter «dependencies[${index}][1]» must be object on «NwtModuleManager.prototype.importByDefinition»`);
        }
        const imported = await (isParameters ? this.import(...dependency) : this.import(dependency));
        importedDependencies.push(imported);
      }
      return await callback(context, importedDependencies);
    }

  };

  const globalModulesPath = NwtPaths.global.relative("assets/framework/nwt-module-manager/global");

  NwtModuleManager.global = NwtModuleManager.create(globalModulesPath);

  return NwtModuleManager;

});
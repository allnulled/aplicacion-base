/**
 * 
 * # App Paths API
 * 
 * Sirve como ejemplo de API de aplicación.
 * 
 * Funcionalmente, solo deja acceso a:
 * 
 * - `NwtPaths.projectRoot`.
 * - `NwtPaths.registeredProcedures`.
 * 
 * Pero puede usarse para añadir las rutas interesantes de la aplicación.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtPaths'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtPaths'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtPaths = class {

    static create(...args) {
      trace("NwtPaths.create");
      return new this(...args);
    }

    static resolve(...subpaths) {
      trace("NwtPaths.resolve");
      return require("path").resolve(...subpaths);
    }

    constructor() {
      trace("NwtPaths.constructor");
      if (NwtEnvironment.isNode) {
        const path = require("path");
        this.projectRoot = path.resolve(typeof __dirname === "string" ? __dirname : nw.__dirname);
        this.appData = false;
        if (NwtEnvironment.isLinux) {
          this.appData = require("path").join(
            require("os").homedir(),
            ".config",
            "NwtFramework",
          );
        } else if (NwtEnvironment.isWindows) {
          this.appData = require("path").join(
            require("os").homedir(),
            "AppData",
            "Roaming",
            "NwtFramework",
          );
        }
        this.registeredProcedures = path.resolve(this.projectRoot, "assets/app/procedures");
        this.registeredPrompts = path.resolve(this.appData, "prompts");
      }
    }

    relative(...subpaths) {
      trace("NwtPaths.prototype.relative");
      const path = require("path");
      console.log(this.projectRoot);
      return path.resolve(this.projectRoot, ...subpaths);
    }

    relativeToAppData(...subpaths) {
      trace("NwtPaths.prototype.relativeToAppData");
      const path = require("path");
      return path.resolve(this.appData, ...subpaths);
    }

  };

  NwtPaths.global = NwtPaths.create();

  return NwtPaths;

});
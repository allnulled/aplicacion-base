(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProceduresManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProceduresManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtProceduresManager = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultOptions = {
      
    };

    constructor(options = {}) {
      trace("NwtProceduresManager.constructor");
      this.$options = Object.assign({}, this.constructor.defaultOptions, options);
      this.$procedures = false;
    }

    async load() {
      trace("NwtProceduresManager.prototype.load");
      if(NwtEnvironment.isNWJS) {
        const fs = require("fs");
        const path = require("path");
        const fastGlob = require("fast-glob");
        const basedir = NwtPaths.global.registeredProcedures;
        const proceduresGlob = path.resolve(basedir, "**/PROCEDURE.md");
        const proceduresFull = await fastGlob(proceduresGlob);
        this.$procedures = proceduresFull.sort().map(fullpath => NwtProcedureSeed.create(fullpath, this));
      }
    }

    findById(procedureId) {
      trace("NwtProceduresManager.prototype.findById");
      const matched = this.$procedures.filter(procedureSeed => {
        return procedureSeed.id === procedureId;
      });
      assertion(matched.length !== 0, "Parameter «procedureId» did not match any procedure seed's «id» on «NwtProceduresManager.prototype.findById»");
      assertion(matched.length === 1, "Parameter «procedureId» matched multiple procedure seed's «id» on «NwtProceduresManager.prototype.findById»");
      return matched[0];
    }

  };

  NwtProceduresManager.global = NwtProceduresManager.create();

  return NwtProceduresManager;

});
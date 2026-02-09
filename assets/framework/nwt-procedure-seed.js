(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProcedureSeed'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProcedureSeed'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtProcedureSeed = class {

    static create(...args) {
      trace("NwtProcedureSeed.create");
      return new this(...args);
    }

    constructor(markdownPath, procedureManager) {
      trace("NwtProcedureSeed.constructor");
      if (NwtEnvironment.isNWJS) {
        const path = require("path");
        const basedir = path.dirname(path.dirname(markdownPath));
        const id = path.dirname(markdownPath.replace(basedir + "/", ""));
        this.markdownPath = markdownPath;
        this.manager = procedureManager;
        this.id = id;
        this.definition = false;
      }
    }

    async loadDefinition() {
      trace("NwtProcedureSeed.prototype.loadDefinition");
      this.definition = NwtProcedureDefinition.create(this.markdownPath);
      await this.definition.initialize();
    }

    async startForm(...args) {
      trace("NwtProcedureSeed.prototype.startForm");
      await this.loadDefinition();
      return await this.definition.startForm(...args);
    }

    async startViewer(...args) {
      trace("NwtProcedureSeed.prototype.startViewer");
      await this.loadDefinition();
      return await this.definition.startViewer(...args);
    }

  };

  return NwtProcedureSeed;

});
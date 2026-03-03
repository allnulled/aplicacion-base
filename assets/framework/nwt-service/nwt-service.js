(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtService'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtService'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtService = class {

    static for(id) {
      trace("NwtService.for");
      return new this(id);
    }

    static defaultOptions = {
      supportIndependent: false,
    };

    constructor(id, options = {}, manager = NwtServiceManager.global) {
      trace("NwtService.constructor");
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtService.constructor»");
      assertion(typeof options === "object", "Parameter «options» must be object on «NwtService.constructor»");
      assertion(typeof manager === "object", "Parameter «manager» must be object on «NwtService.constructor»");
      assertion(manager instanceof NwtServiceManager, "Parameter «manager» must be instance of NwtServiceManager on «NwtService.constructor»");
      this.id = id;
      this.manager = manager;
      this.options = Object.assign({}, this.constructor.defaultOptions, options);
      this.directory = this.manager.resolve(this.id);
      // Seguramente esto no:
      this.events = NwtEventsManager.create();
    }

    getStatePath() {
      return this.manager.resolve(this.id, "state.json");
    }

    exists() {
      trace("NwtService.prototype.exists");
      const mdPath = this.manager.resolve(this.directory, "SERVICE.md");
      return NwtFilesystem.exists(mdPath);
    }

    async isStarted() {
      trace("NwtService.prototype.isStarted");
      const state = await this.getState(true);
      return state.isStarted;
    }

    async getState(refreshReport = false) {
      trace("NwtService.prototype.getState");
      try {
        if(refreshReport) {
          await this.report();
        }
        return await NwtFilesystem.readJson(this.getStatePath());
      } catch (error) {
        return undefined;
      }
    }

    async setState(data) {
      trace("NwtService.prototype.setState");
      try {
        return await NwtFilesystem.writeJson(this.getStatePath(), data);
      } catch (error) {
        return undefined;
      }
    }

    async overrideState(data) {
      trace("NwtService.prototype.overrideState");
      try {
        const currentData = await NwtFilesystem.readJson(this.getStatePath(), data);
        Object.assign(currentData, data);
        return await NwtFilesystem.writeJson(this.getStatePath(), currentData);
      } catch (error) {
        return undefined;
      }
    }

    async deleteState() {
      trace("NwtService.prototype.deleteState");
      try {
        await NwtFilesystem.deleteJson(this.getStatePath());
        return true;
      } catch (error) {
        return false;
      }
    }

    report(...args) {
      trace("NwtService.prototype.report");
      return this.onReport(...args);
    }

    async start(...args) {
      trace("NwtService.prototype.start");
      const isStarted = await this.isStarted();
      if(isStarted) {
        return await this.report();
      }
      return await this.onStart(...args);
    }

    stop(...args) {
      trace("NwtService.prototype.stop");
      return this.onStop(...args);
    }

    onReport() {
      throw new Error("Method «onReport» should be overriden");
    }

    onStart() {
      throw new Error("Method «onStart» should be overriden");
    }

    onStop() {
      throw new Error("Method «onStop» should be overriden");
    }

  };

  return NwtService;

});
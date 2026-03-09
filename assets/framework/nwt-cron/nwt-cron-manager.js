(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCronPersistibleJob = class {

    static create(...args) {
      trace("NwtCronPersistibleJob.create");
      return new this(...args);
    }

    constructor(pattern, options, callback) {
      trace("NwtCronPersistibleJob.constructor");
      assertion(typeof pattern === "string", `Parameter «pattern» must be «string» on «NwtCronPersistibleJob.constructor»`);
      assertion(typeof options === "object", `Parameter «options» must be «object» on «NwtCronPersistibleJob.constructor»`);
      assertion(typeof callback === "function", `Parameter «callback» must be «function» on «NwtCronPersistibleJob.constructor»`);
      Object.assign(this, { pattern, options, callback });
      this.cronObject = new Cron(this.pattern, Object.assign({}, this.options), this.callback);
    }

    toJSON() {
      trace("NwtCronPersistibleJob.prototype.toJSON");
      return {
        pattern: this.pattern,
        options: this.options,
        callback: this.callback.toString(),
      };
    }
    
  };
  
  const NwtCronManager = class {

    static PersistibleJob = NwtCronPersistibleJob;

    static create(...args) {
      trace("NwtCronManager.create");
      return new this(...args);
    }

    constructor(basefile = "assets/framework/nwt-cron/global.json") {
      trace("NwtCronManager.constructor");
      this.basefile = basefile;
      this.jobs = [];
    }

    async start() {
      trace("NwtCronManager.prototype.start");
      await this.load();
      return await this.resume();
    }

    restart(...args) {
      trace("NwtCronManager.prototype.restart");
      return this.start(...args);
    }

    async pause() {
      trace("NwtCronManager.prototype.pause");
      for(let index=0; index<this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.pause();
      }
    }

    async resume() {
      trace("NwtCronManager.prototype.resume");
      for(let index=0; index<this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.resume();
      }
    }

    async stop() {
      trace("NwtCronManager.prototype.stop");
      for(let index=0; index<this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.stop();
      }
    }

    async load() {
      trace("NwtCronManager.prototype.load");
      this.removeAllJobs();
      const persistedJobs = await NwtFilesystem.readJson(this.basefile);
      for(let index=0; index<persistedJobs.length; index++) {
        const persistedJob = persistedJobs[index];
        const callback = NwtCodeComposer.hydrateFunction(persistedJob.callback);
        this.addJob(persistedJob.pattern, persistedJob.options, callback);
      }
    }

    async save() {
      trace("NwtCronManager.prototype.save");
      await NwtFilesystem.writeJson(this.basefile, this.jobs);
    }

    async addJob(pattern, options, callback) {
      trace("NwtCronManager.prototype.addJob");
      const job = NwtCronPersistibleJob.create(pattern, options, callback);
      this.jobs.push(job);
      await this.save();
    }

    async removeJob(index) {
      this.jobs[index].cronObject.stop();
      this.jobs.splice(index, 1);
      await this.save();
      await this.restart();
    }

    async removeAllJobs() {
      for(let index=this.jobs.length-1; index>=0; index--) {
        const job = this.jobs[index];
        this.jobs[index].cronObject.stop();
        this.jobs.splice(index, 1);
      }
    }

  };

  NwtCronManager.global = NwtCronManager.create();

  return NwtCronManager;

});
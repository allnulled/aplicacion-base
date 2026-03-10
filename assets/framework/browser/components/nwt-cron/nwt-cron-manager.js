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

  const NwtCronManager = class {

    static PersistibleJob = NwtCronPersistibleJob;

    static create(...args) {
      trace("NwtCronManager.create");
      return new this(...args);
    }

    constructor(basefile = "assets/framework/browser/components/nwt-cron/global.json") {
      trace("NwtCronManager.constructor");
      this.basefile = basefile;
      this.jobs = [];
    }

    isRunning() {
      return true;
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
      for (let index = 0; index < this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.pause();
      }
    }

    async resume() {
      trace("NwtCronManager.prototype.resume");
      for (let index = 0; index < this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.resume();
      }
    }

    async stop() {
      trace("NwtCronManager.prototype.stop");
      for (let index = 0; index < this.jobs.length; index++) {
        const job = this.jobs[index];
        job.cronObject.stop();
      }
    }

    async load() {
      trace("NwtCronManager.prototype.load");
      this.removeAllJobs(false);
      const persistedJobs = await NwtFilesystem.readJson(this.basefile);
      for (let index = 0; index < persistedJobs.length; index++) {
        const persistedJob = persistedJobs[index];
        const callback = NwtCodeComposer.hydrateFunction(persistedJob.callback);
        const base = NwtObjectUtils.exceptKeys(persistedJob, NwtCronPersistibleJob.notPersistibleProps);
        const jobParameters = Object.assign(base, {
          callback: callback
        });
        this.addJob(jobParameters);
      }
    }

    reload() {
      return this.load();
    }

    async save() {
      trace("NwtCronManager.prototype.save");
      await NwtFilesystem.writeJson(this.basefile, this.jobs);
    }

    async addJob(jobParameters) {
      trace("NwtCronManager.prototype.addJob");
      const job = NwtCronPersistibleJob.create(jobParameters, this);
      this.jobs.push(job);
      await this.save();
      return job;
    }

    async removeJobByReference(job) {
      return this.removeJobByIndex(this.jobs.indexOf(job));
    }

    async removeJobByIndex(index) {
      this.jobs[index].cronObject.stop();
      this.jobs.splice(index, 1);
      await this.save();
    }

    async removeAllJobs(persist = true) {
      for (let index = this.jobs.length - 1; index >= 0; index--) {
        const job = this.jobs[index];
        this.jobs[index].cronObject.stop();
        this.jobs.splice(index, 1);
      }
      if (persist) {
        await this.save();
      }
    }

  };

  NwtCronManager.global = NwtCronManager.create();

  // @CONTINUES: esto sigue en el evento "app-mounted" de nwt vía window
  if (NwtEnvironment.hasWindow) {
    window.addEventListener("app-mounted", async function (event) {
      trace("AppPayload.inject@app-mounted :: start cron jobs");
      NwtCronManager.global.start();
    });
  }

  return NwtCronManager;

});
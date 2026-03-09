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

    static create(...args) {
      trace("NwtCronManager.create");
      return new this(...args);
    }

    constructor(basedir) {
      trace("NwtCronManager.constructor");
      this.basedir = basedir;
      this.jobs = {};
    }

    saveStatus(job) {
      trace("NwtCronManager.prototype.saveStatus");
      const jobStatusFile = this.resolve(`jobs/${job.getSerializedId()}/status.json`);
      const jobStatusData = job.dehydrate();
      return NwtFilesystem.writeJson(jobStatusFile, jobStatusData);
    }

    loadStatus(job) {
      trace("NwtCronManager.prototype.loadStatus");
      const jobStatusFile = this.resolve(`jobs/${job.getSerializedId()}/status.json`);
      const jobStatusData = job.dehydrate();
      return NwtFilesystem.writeJson(jobStatusFile, jobStatusData);
    }

    async register(id, metadata = {}) {
      trace("NwtCronManager.prototype.register");
      assertion(!(id in this.jobs), `Parameter «id» must not exist as job on «NwtCronManager.prototype.register»`);
      const job = NwtCronJob.create(metadata);
      await this.saveStatus(job);
      this.jobs[id] = job;
      job.start();
      return job;
    }

    async unregister(id) {
      trace("NwtCronManager.prototype.unregister");
      assertion(id in this.jobs, `Parameter «id» must exist as job on «NwtCronManager.prototype.unregister»`);
      await this.jobs[id].stop();
    }

  };

  return NwtCronManager;

});
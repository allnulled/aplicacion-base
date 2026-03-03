(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronJob'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronJob'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCronJob = class {

    static create(...args) {
      trace("NwtCronJob.create");
      return new this(...args);
    }

    constructor(uid, callback = NwtUtils.noop, manager = NwtCronManager.global) {
      trace("NwtCronJob.constructor");
      assertion(typeof uid === "string", "Parameter «uid» must be string on «NwtCronJob.constructor»");
      assertion(typeof callback === "function", "Parameter «callback» must be function on «NwtCronJob.constructor»");
      assertion(manager instanceof NwtCronManager, "Parameter «manager» must be instance of «NwrCronManager» on «NwtCronJob.constructor»");
      this.manager = manager;
      this.uid = uid;
      this.callback = callback;
      this.timeout = undefined;
    }

    getSerializedId() {
      trace("NwtCronJob.prototype.getSerializedId");
      return `${this.uid}`;
    }

    dehydrate() {
      trace("NwtCronJob.prototype.dehydrate");
      return NwtUtils.jsonify(this.getStatus());
    }

    getStatus() {
      trace("NwtCronJob.prototype.getStatus");
      return {
        uid: this.uid,
        suid: this.getSerializedId(),
      };
    }

    start() {
      trace("NwtCronJob.prototype.start");
    }

    next() {
      trace("NwtCronJob.prototype.next");
    }

    destroy() {
      trace("NwtCronJob.prototype.destroy");
    }

  };

  return NwtCronJob;

});
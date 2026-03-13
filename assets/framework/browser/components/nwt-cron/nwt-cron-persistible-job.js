(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronPersistibleJob'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronPersistibleJob'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCronPersistibleJob = class {

    static notPersistibleProps = [
      "callback",
      "cronObject",
      "manager",
    ];

    static create(...args) {
      trace("NwtCronPersistibleJob.create");
      return new this(...args);
    }

    constructor(parameters, manager) {
      trace("NwtCronPersistibleJob.constructor");
      const { title, pattern, options, callback } = parameters;
      assertion(typeof title === "string", `Parameter «title» must be «string» on «NwtCronPersistibleJob.constructor»`);
      assertion(typeof pattern === "string", `Parameter «pattern» must be «string» on «NwtCronPersistibleJob.constructor»`);
      assertion(typeof options === "object", `Parameter «options» must be «object» on «NwtCronPersistibleJob.constructor»`);
      assertion(typeof callback === "function", `Parameter «callback» must be «function» on «NwtCronPersistibleJob.constructor»`);
      assertion(manager instanceof NwtCronManager, `Parameter «manager» must be instance of «NwtCronManager» on «NwtCronPersistibleJob.constructor»`);
      this.manager = manager;
      Object.assign(this, parameters);
      this.cronObject = new Cron(this.pattern, Object.assign({}, this.options), this.callback);
    }

    toCronExpression() {
      trace("NwtCronPersistibleJob.prototype.toCronExpression");
      return NwtCronExpression.fromString(this.pattern);
    }

    toJSON() {
      trace("NwtCronPersistibleJob.prototype.toJSON");
      const persistible = NwtObjectUtils.exceptKeys(this, this.constructor.notPersistibleProps);
      return Object.assign(persistible, {
        callback: this.callback.toString(),
      });
    }
    
  };

  return NwtCronPersistibleJob;

});
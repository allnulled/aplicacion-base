(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtEventsManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtEventsManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtEventsManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor() {
      trace("NwtEventsManager.constructor");
      this.listeners = {};
      this.configurations = {};
    }

    configure(eventType, configurations) {
      trace("NwtEventsManager.prototype.configure");
      assertion(typeof eventType  === "string", "Parameter «eventType» must be string on «NwtEventsManager.prototype.configure»");
      assertion(typeof configurations  === "object", "Parameter «configurations» must be object on «NwtEventsManager.prototype.configure»");
      if(!(eventType in this.configurations)) {
        this.configurations[eventType] = {};
      }
      Object.assign(this.configurations[eventType], configurations);
      return this;
    }

    dispatchIfWasTriggered(eventType, callback) {
      trace("NwtEventsManager.prototype.dispatchIfWasTriggered");
      const hasConfigurations = eventType in this.configurations;
      const isOnlyOnce = hasConfigurations && this.configurations[eventType].onlyOnce === true;
      const wasTriggered = hasConfigurations && this.configurations[eventType].wasTriggered === true;
      if(hasConfigurations && isOnlyOnce && wasTriggered) {
        callback({
          type: eventType,
          detail: this.configurations[eventType].detail,
          target: this
        });
        return true;
      }
      return false;
    }

    on(eventType, callback) {
      trace("NwtEventsManager.prototype.on");
      assertion(typeof eventType  === "string", "Parameter «eventType» must be string on «NwtEventsManager.prototype.on»");
      assertion(typeof callback  === "function", "Parameter «callback» must be function on «NwtEventsManager.prototype.on»");
      if(this.dispatchIfWasTriggered(eventType, callback)) {
        return 1;
      }
      if(!(eventType in this.listeners)) {
        this.listeners[eventType] = new Set();
      }
      this.listeners[eventType].add(callback);
      return this;
    }

    once(eventType, callback) {
      trace("NwtEventsManager.prototype.once");
      assertion(typeof eventType  === "string", "Parameter «eventType» must be string on «NwtEventsManager.prototype.once»");
      assertion(typeof callback  === "function", "Parameter «callback» must be function on «NwtEventsManager.prototype.once»");
      if(this.dispatchIfWasTriggered(eventType, callback)) {
        return 1;
      }
      const wrap = (...args) => {
        this.off(eventType, wrap);
        callback(...args);
      };
      this.on(eventType, wrap);
      return this;
    }

    off(eventType, callback) {
      trace("NwtEventsManager.prototype.off");
      assertion(typeof eventType  === "string", "Parameter «eventType» must be string on «NwtEventsManager.prototype.off»");
      assertion(typeof callback  === "function", "Parameter «callback» must be function on «NwtEventsManager.prototype.off»");
      this.listeners[eventType].delete(callback);
      if (this.listeners[eventType].size === 0) {
        delete this.listeners[eventType];
      }
      return this;
    }

    dispatch(eventType, detail) {
      trace("NwtEventsManager.prototype.dispatch");
      assertion(typeof eventType === "string", "Parameter «eventType» must be string on «NwtEventsManager.prototype.dispatch»");
      assertion(typeof detail  === "object", "Parameter «detail» must be object on «NwtEventsManager.prototype.dispatch»");
      if (!this.listeners[eventType]) return;
      const output = [];
      for (const callback of [...this.listeners[eventType]]) {
        const result = callback({
          type: eventType,
          detail,
          target: this
        });
        if(!(eventType in this.configurations)) {
          this.configurations[eventType] = {};
        }
        this.configurations[eventType].wasTriggered = true;
        output.push(result);
      }
      return output;
    }

  };

  return NwtEventsManager;

});
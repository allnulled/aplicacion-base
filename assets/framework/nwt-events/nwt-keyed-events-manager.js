(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtKeyedEventsManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtKeyedEventsManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtKeyedEventsManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor() {
      trace("NwtKeyedEventsManager.constructor");
      this.listeners = {};
      this.configurations = {};
    }

    static isPrefix(prefix, full) {
      if (prefix.length > full.length) return false;
      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] !== full[i]) return false;
      }
      return true;
    }

    configure(eventType, configurations) {
      trace("NwtKeyedEventsManager.prototype.configure");
      assertion(typeof eventType === "string", "Parameter «eventType» must be string on «NwtKeyedEventsManager.prototype.configure»");
      assertion(typeof configurations === "object", "Parameter «configurations» must be object on «NwtKeyedEventsManager.prototype.configure»");
      if (!(eventType in this.configurations)) {
        this.configurations[eventType] = {};
      }
      Object.assign(this.configurations[eventType], configurations);
      return this;
    }

    on(eventType, keys, callback) {
      trace("NwtKeyedEventsManager.prototype.on");
      assertion(typeof eventType === "string", "«eventType» must be string");
      assertion(Array.isArray(keys), "«keys» must be array");
      assertion(typeof callback === "function", "«callback» must be function");
      if (!(eventType in this.listeners)) {
        this.listeners[eventType] = new Set();
      }
      this.listeners[eventType].add({
        keys,
        callback
      });
      return this;
    }

    once(eventType, keys, callback) {
      trace("NwtKeyedEventsManager.prototype.once");
      const wrap = (event) => {
        this.off(eventType, keys, wrap);
        callback(event);
      };
      this.on(eventType, keys, wrap);
      return this;
    }

    off(eventType, keys, callback) {
      trace("NwtKeyedEventsManager.prototype.off");
      if (!(eventType in this.listeners)) return this;
      for (const entry of [...this.listeners[eventType]]) {
        if (
          entry.callback === callback &&
          JSON.stringify(entry.keys) === JSON.stringify(keys)
        ) {
          this.listeners[eventType].delete(entry);
        }
      }
      if (this.listeners[eventType].size === 0) {
        delete this.listeners[eventType];
      }
      return this;
    }

    dispatch(eventType, triggerKeys, detail) {
      trace("NwtKeyedEventsManager.prototype.dispatch");
      assertion(typeof eventType === "string", "«eventType» must be string");
      assertion(Array.isArray(triggerKeys), "«triggerKeys» must be array");
      assertion(typeof detail === "object", "«detail» must be object");
      const output = [];
      this.configure(eventType, { wasTriggered: true });
      if (!(eventType in this.listeners)) return this;
      for (const entry of [...this.listeners[eventType]]) {
        if (NwtKeyedEventsManager.isPrefix(triggerKeys, entry.keys)) {
          const result = entry.callback({
            type: eventType,
            keys: triggerKeys,
            listenerKeys: entry.keys,
            detail,
            target: this
          });
          output.push(result);
        }
      }
      return output;
    }
    
  };
  return NwtKeyedEventsManager;
});
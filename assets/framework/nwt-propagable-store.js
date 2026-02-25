(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtPropagableStore'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtPropagableStore'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtPropagableStore = NwtPrototyper.combine({
    $constructors: [function () {
      this.listeners = {};
      this.configurations = {};
      this.storage = {};
    }],
    $statics: [{
      create: function (...args) {
        return new this(...args);
      },
    }],
    $dynamics: [{
      configure: NwtKeyedEventsManager.prototype.configure,
      on: NwtKeyedEventsManager.prototype.on,
      once: NwtKeyedEventsManager.prototype.once,
      off: NwtKeyedEventsManager.prototype.off,
      dispatch: NwtKeyedEventsManager.prototype.dispatch,
      has: function(selector, ...args) {
        return NwtDecorableTree.staticTree.has.call(this, ["storage"].concat(selector), ...args);
      },
      get: function(selector, ...args) {
        return NwtDecorableTree.staticTree.get.call(this, ["storage"].concat(selector), ...args);
      },
      set: function (selector, value) {
        const [parent, key] = NwtDecorableTree.$walk(this, ["storage"].concat(selector), true);
        parent[key] = value;
        this.dispatch("@SetValue", selector, { selection: selector, value: value });
      },
    }]
  });

  return NwtPropagableStore;

});
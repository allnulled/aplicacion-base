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
    $constructors: [function (value = undefined) {
      trace("NwtPropagableStore.constructor");
      this.listeners = {};
      this.configurations = {};
      this.storage = typeof value !== "undefined" ? value : {};
    }],
    $statics: [{
      create: function (...args) {
        trace("NwtPropagableStore.create");
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
        trace("NwtPropagableStore.prototype.has");
        return NwtDecorableTree.staticTree.has.call(this, ["storage"].concat(selector), ...args);
      },
      get: function(selector, ...args) {
        trace("NwtPropagableStore.prototype.get");
        return NwtDecorableTree.staticTree.get.call(this, ["storage"].concat(selector), ...args);
      },
      set: function (selector, value) {
        trace("NwtPropagableStore.prototype.set");
        const [parent, key] = NwtDecorableTree.$walk(this, ["storage"].concat(selector), true);
        parent[key] = value;
        this.dispatch("@SetValue", selector, { selection: selector, value: value });
      },
      push: function (selector, value) {
        trace("NwtPropagableStore.prototype.push");
        const [parent, key] = NwtDecorableTree.$walk(this, ["storage"].concat(selector), true);
        const hasKey = key in parent;
        const isArray = Array.isArray(parent[key]);
        if(!hasKey || !isArray) {
          parent[key] = [];
        }
        parent[key].push(value);
        this.dispatch("@SetValue", selector, { selection: selector, value: value, operation: "push" });
      },
      splice: function (selector, pos) {
        trace("NwtPropagableStore.prototype.splice");
        const [parent, key] = NwtDecorableTree.$walk(this, ["storage"].concat(selector), true);
        const hasKey = key in parent;
        const isArray = Array.isArray(parent[key]);
        if(!hasKey || !isArray) {
          return false;
        }
        if(pos === -1) {
          return false;
        }
        const value = parent[key].splice(pos, 1);
        console.log("Removed:", pos, value);
        this.dispatch("@SetValue", selector, { selection: selector, position: pos, value: value, operation: "splice" });
      }
    }]
  });

  return NwtPropagableStore;

});
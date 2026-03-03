(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtIndexer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtIndexer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtIndexer = class {

    static VALUE = Symbol.for("NwtIndexer.VALUE");

    static create(...args) {
      return new this(...args);
    }

    constructor() {
      this.$data = {};
    }

    get size() {
      return Object.keys(this.$data).length;
    }

    $normalize(keys) {
      if (keys === undefined || keys === null) return [];
      if (Array.isArray(keys)) return keys;
      return [keys];
    }

    $traverse(keys, createIfMissing = false) {
      keys = this.$normalize(keys);
      let current = this.$data;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!(key in current)) {
          if (!createIfMissing) return null;
          current[key] = {};
        }
        current = current[key];
      }
      return current;
    }

    has(keys) {
      const node = this.$traverse(keys, false);
      if (!node) return false;
      return this.constructor.VALUE in node;
    }

    init(keys, value) {
      const node = this.$traverse(keys, true);
      if (!(this.constructor.VALUE in node)) {
        node[this.constructor.VALUE] = value;
      }
      return node[this.constructor.VALUE];
    }

    get(keys, defaultValue = undefined) {
      const node = this.$traverse(keys, false);
      if (!node) return defaultValue;
      return this.constructor.VALUE in node ? node[this.constructor.VALUE] : defaultValue;
    }

    set(keys, value = undefined) {
      const node = this.$traverse(keys, true);
      node[this.constructor.VALUE] = value;
      return value;
    }

    delete(keys) {
      const node = this.$traverse(keys, true);
      const value = node[this.constructor.VALUE];
      delete node[this.constructor.VALUE];
      return value;
    }

  };

  return NwtIndexer;

});
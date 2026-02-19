(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDecorableTree'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDecorableTree'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtDecorableTree = class {

    static install(target) {
      Object.assign(target, this.staticTree);
    }

    static $normalize(selector) {
      if (Array.isArray(selector)) return selector;
      if (typeof selector === "string") return selector.split(".");
      assertion(false, "Parameter «selector» must be array or string on «NwtDecorableTree.$normalize»");
    }

    static $walk(root, selector, create = false) {
      assertion(typeof root === "object", "Parameter «root» must be object on «NwtDecorableTree.$walk»");
      const parts = this.$normalize(selector);
      let obj = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        assertion(typeof key === "string", `Select «${selector}» at index «${i}=${key}» must be string on «NwtDecorableTree.$walk»`);
        if (!(key in obj)) {
          if (!create) return [undefined, undefined];
          obj[key] = {};
        }
        obj = obj[key];
        if (obj == null) return [undefined, undefined];
      }
      return [obj, parts[parts.length - 1]];
    }

    static staticTree = {
      has: function (selector) {
        const parts = NwtDecorableTree.$normalize(selector);
        let obj = this;
        for (let i = 0; i < parts.length; i++) {
          const key = parts[i];
          if (obj == null || !(key in obj)) return false;
          obj = obj[key];
        }
        return true;
      },
      get: function (selector, errorValue = undefined) {
        const parts = NwtDecorableTree.$normalize(selector);
        let obj = this;
        for (let i = 0; i < parts.length; i++) {
          const key = parts[i];
          if(typeof errorValue === "undefined") {
            assertion(obj !== null, `Selector «${selector}» at index «${i}=${key}» cannot access property of null on «NwtDecorableTree.get»`);
            assertion(key in obj, `Selector «${selector}» at index «${i}=${key}» cannot access unknown property on «NwtDecorableTree.get»`);
          } else {
            return errorValue;
          }
          obj = obj[key];
        }
        return obj;
      },
      set: function (selector, value) {
        const [parent, key] = NwtDecorableTree.$walk(this, selector, true);
        parent[key] = value;
      },
      expand: function (selector, properties = {}) {
        assertion(typeof properties === "object", `Parameter «properties» must be object but «${typeof properties}» was found on «NwtDecorableTree.expand»`);
        let target = this.get(selector, false);
        if(target === false) {
          this.set(selector, {});
          target = this.get(selector);
        }
        assertion(typeof target === "object", `Parameter «selector» must point to object but «${typeof target}» was found at «${selector}» on «NwtDecorableTree.expand»`);
        Object.assign(target, properties);
      },
      run: function(selector, parameters = [], scope = this) {
        const target = this.get(selector);
        assertion(typeof target === "function", `Parameter «selector» must point to function but «${typeof target}» was found at «${selector}» on «NwtDecorableTree.run»`);
        return target.call(scope, ...parameters);
      }
    }

  };

  return NwtDecorableTree;
});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDomQueryCollection'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDomQueryCollection'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtDomQueryCollection = class extends NwtDomQueryFunctions {

    static create(...args) {
      return new this(...args);
    }

    constructor(selector) {
      super("collection");
      this.collection = null;
      if(selector instanceof HTMLElement) {
        this.collection = [selector];
      } else if(selector instanceof NodeList) {
        this.collection = [...selector];
      } else if(selector instanceof Vue) {
      } else if(typeof selector === "string") {
        this.collection = [...document.querySelectorAll(selector)];
      } else {
        throw new Error(`Type «${typeof selector}» for «selector» parameter is not supported on «NwtDomQueryCollection.constructor»`);
      }
    }

  };

  HTMLElement.prototype.toDomQueryCollection = function() {
    return NwtDomQueryCollection.create(this);
  };

  NodeList.prototype.toDomQueryCollection = function() {
    return NwtDomQueryCollection.create(this);
  };

  return NwtDomQueryCollection;

});
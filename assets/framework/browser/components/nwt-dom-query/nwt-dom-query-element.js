(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDomQueryElement'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDomQueryElement'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtDomQueryElement = class extends NwtDomQueryFunctions {

    static create(...args) {
      return new this(...args);
    }

    constructor(selector) {
      super("element", e => [e]);
      this.element = null;
      if (selector instanceof HTMLElement) {
        this.element = selector;
      } else if (selector instanceof Vue) {
        this.element = selector.$el;
      } else if (selector instanceof NwtDomQueryElement) {
        this.element = selector.element;
      } else if(typeof selector === "string") {
        this.element = document.querySelector(selector);
      } else if (selector === null) {
        this.element = null;
      } else {
        throw new Error(`Type «${typeof selector}» for «selector» parameter is not supported on «NwtDomQueryElement.constructor»`);
      }
    }

    isNull() {
      return this.element === null;
    }

    hasVue() {
      return this.element.__vue__;
    }

    hasLength() {
      return this.isList() && this.element.length;
    }

    extract(i) {
      return typeof i === "undefined" ? this.element : this.element[i];
    }

    extractParent() {
      const el = this.element;
      return el ? el.parentElement : null;
    }

    extractChild(i) {
      const el = this.element;
      return el && el.children[i] ? el.children[i] : null;
    }

    extractChildren() {
      const el = this.element;
      return el ? Array.from(el.children) : [];
    }

    extractFirstParentWhere(filter = false) {
      let el = this.element;
      if (!el || !filter) return null;
      el = el.parentElement;
      while (el) {
        if (filter(el)) return el;
        el = el.parentElement;
      }
      return null;
    }

    extractLastParentWhere(filter = false) {
      let el = this.element;
      let last = null;
      if (!el || !filter) return null;
      el = el.parentElement;
      while (el) {
        if (filter(el)) last = el;
        el = el.parentElement;
      }
      return last;
    }

    extractAllParentsWhere(filter = false) {
      let el = this.element;
      const out = [];
      if (!el || !filter) return out;
      el = el.parentElement;
      while (el) {
        if (filter(el)) out.push(el);
        el = el.parentElement;
      }
      return out;
    }

    extractFirstPreviousElementWhere(filter = false) {
      let el = this.element;
      if (!el || !filter) return null;
      el = el.previousElementSibling;
      while (el) {
        if (filter(el)) return el;
        el = el.previousElementSibling;
      }
      return null;
    }

    extractFirstNextElementWhere(filter = false) {
      let el = this.element;
      if (!el || !filter) return null;
      el = el.nextElementSibling;
      while (el) {
        if (filter(el)) return el;
        el = el.nextElementSibling;
      }
      return null;
    }

    extractLastPreviousElementWhere(filter = false) {
      let el = this.element;
      let last = null;
      if (!el || !filter) return null;
      el = el.previousElementSibling;
      while (el) {
        if (filter(el)) last = el;
        el = el.previousElementSibling;
      }
      return last;
    }

    extractLastNextElementWhere(filter = false) {
      let el = this.element;
      let last = null;
      if (!el || !filter) return null;
      el = el.nextElementSibling;
      while (el) {
        if (filter(el)) last = el;
        el = el.nextElementSibling;
      }
      return last;
    }

    extractAllPreviousElementsWhere(filter = false) {
      let el = this.element;
      const out = [];
      if (!el || !filter) return out;
      el = el.previousElementSibling;
      while (el) {
        if (filter(el)) out.push(el);
        el = el.previousElementSibling;
      }
      return out;
    }

    extractAllNextElementsWhere(filter = false) {
      let el = this.element;
      const out = [];
      if (!el || !filter) return out;
      el = el.nextElementSibling;
      while (el) {
        if (filter(el)) out.push(el);
        el = el.nextElementSibling;
      }
      return out;
    }

    extractLastChildWhere(filter = false) {
      const el = this.element;
      if (!el || !filter) return null;
      const children = Array.from(el.children);
      for (let i = children.length - 1; i >= 0; i--) {
        if (filter(children[i])) return children[i];
      }
      return null;
    }

    extractRangeOfChildrenWhere(filter = false) {
      const el = this.element;
      const out = [];
      if (!el || !filter) return out;
      for (const child of el.children) {
        if (filter(child)) out.push(child);
      }
      return out;
    }

    extractAllDescendantsWhere(filter = false) {
      const el = this.element;
      const out = [];
      if (!el || !filter) return out;
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_ELEMENT,
        null,
        false
      );
      let node = walker.currentNode;
      while (node) {
        if (node !== el && filter(node)) {
          out.push(node);
        }
        node = walker.nextNode();
      }
      return out;
    }

    queryParent(...args) {
      return NwtDomQueryCollection.create(this.extractParent(...args));
    }
    queryChild(...args) {
      return NwtDomQueryCollection.create(this.extractChild(...args));
    }
    queryChildren(...args) {
      return NwtDomQueryCollection.create(this.extractChildren(...args));
    }
    queryFirstParentWhere(...args) {
      return NwtDomQueryCollection.create(this.extractFirstParentWhere(...args));
    }
    queryLastParentWhere(...args) {
      return NwtDomQueryCollection.create(this.extractLastParentWhere(...args));
    }
    queryAllParentsWhere(...args) {
      return NwtDomQueryCollection.create(this.extractAllParentsWhere(...args));
    }
    queryFirstPreviousElementWhere(...args) {
      return NwtDomQueryCollection.create(this.extractFirstPreviousElementWhere(...args));
    }
    queryFirstNextElementWhere(...args) {
      return NwtDomQueryCollection.create(this.extractFirstNextElementWhere(...args));
    }
    queryLastPreviousElementWhere(...args) {
      return NwtDomQueryCollection.create(this.extractLastPreviousElementWhere(...args));
    }
    queryLastNextElementWhere(...args) {
      return NwtDomQueryCollection.create(this.extractLastNextElementWhere(...args));
    }
    queryAllPreviousElementsWhere(...args) {
      return NwtDomQueryCollection.create(this.extractAllPreviousElementsWhere(...args));
    }
    queryAllNextElementsWhere(...args) {
      return NwtDomQueryCollection.create(this.extractAllNextElementsWhere(...args));
    }
    queryLastChildWhere(...args) {
      return NwtDomQueryCollection.create(this.extractLastChildWhere(...args));
    }
    queryRangeOfChildrenWhere(...args) {
      return NwtDomQueryCollection.create(this.extractRangeOfChildrenWhere(...args));
    }
    queryAllDescendantsWhere(...args) {
      return NwtDomQueryCollection.create(this.extractAllDescendantsWhere(...args));
    }

    addClass(...clazzes) {
      this.element.classList.add(...clazzes);
      return this;
    }

    removeClass(...clazzes) {
      this.element.classList.remove(...clazzes);
      return this;
    }

    getAttribute(id) {
      return this.element.getAttribute(id);
    }

    setAttribute(id, value) {
      this.element.setAttribute(id, value);
      return this;
    }

    changeStyle(props = {}) {
      Object.assign(this.element.style, props);
      return this;
    }

    addEventListener(event, callback) {
      this.element.addEventListener(event, callback);
      return this;
    }

    addEventListenerOnce(event, callback) {
      const intermediateCallback = function(...args) {
        this.element.removeEventListener(event, intermediateCallback);
        return callback(...args);
      };
      this.element.addEventListener(event, intermediateCallback);
      return this;
    }

    removeEventListener(event, callback) {
      this.element.removeEventListener(event, callback);
      return this;      
    }

  };

  HTMLElement.prototype.toDomQueryElement = function() {
    return NwtDomQueryElement.create(this);
  };

  return NwtDomQueryElement;

});
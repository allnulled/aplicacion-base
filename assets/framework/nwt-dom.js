/**
 * 
 * # NwtDom
 * 
 * API para utilidades relacionadas con el DOM.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtDom
 * NwtFramework.Dom
 * Vue.prototype.$nwt.Dom
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Métodos de selección:
 * // (donde String permite css selector, y Function permite js filter)
 * NwtDom.findFirstChildWhere(element [, String], Function);
 * NwtDom.findFirstChildrenWhere(element [, String], Function);
 * NwtDom.findClosestParentWhere(element [, String], Function);
 * NwtDom.removeTextContentSpaces(text);
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDom'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDom'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtDom = class {

    static utils = {
      iterateParentUntil: (element, filter) => {
        trace("NwtDom.utils.iterateParentUntil");
        assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.iterateParentUntil»");
        assertion(typeof filter === "function", "Parameter «filter» must be function on «NwtDom.iterateParentUntil»");
        if(!element.parentElement) {
          return null;
        }
        const isValid = filter(element.parentElement);
        if(isValid) {
          return element.parentElement;
        }
        return this.utils.iterateParentUntil(element.parentElement, filter);
      },
      iterateChildrenUntil: (element, filter) => {
        trace("NwtDom.utils.iterateChildrenUntil");
        assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.iterateChildrenUntil»");
        assertion(typeof filter === "function", "Parameter «filter» must be function on «NwtDom.iterateChildrenUntil»");
        if(!element.children) {
          return null;
        }
        for(let index=0; index<element.children.length; index++) {
          const child = element.children[index];
          const isValid = filter(child);
          if(isValid) {
            return child;
          }
          const subchild = this.utils.iterateChildrenUntil(element.children[index], filter);
          if(subchild) {
            return subchild;
          }
        }
        return null;
      },
      collectFirstChildrenWhere: (element, filter, output = []) => {
        trace("NwtDom.utils.collectFirstChildrenWhere");
        assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.collectFirstChildrenWhere»");
        assertion(typeof filter === "function", "Parameter «filter» must be function on «NwtDom.collectFirstChildrenWhere»");
        assertion(Array.isArray(output), "Parameter «output» must be array on «NwtDom.collectFirstChildrenWhere»");
        if(!element.children) {
          return null;
        }
        Iterating_level:
        for(let index=0; index<element.children.length; index++) {
          const child = element.children[index];
          const isValid = filter(child);
          if(isValid) {
            output.push(child);
            continue Iterating_level;
          }
          this.utils.collectFirstChildrenWhere(element.children[index], filter, output);
        }
        return output;
      },
    };

    static findFirstChildWhere(element, ...args) {
      trace("NwtDom.findFirstChildWhere");
      assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.findFirstChildWhere»");
      let selector = "*";
      let filter = () => true;
      if(typeof args[0] === "string") {
        selector = args[0];
        if(typeof args[1] === "function") {
          args[1](element)
        }
      } else if(typeof args[0] === "function") {
        filter = args[0];
      } else {
        throw new Error("Parameter «args[0]» must be string or function on «NwtDom.findFirstChildWhere»");
      }
      return this.utils.iterateChildrenUntil(element, el => {
        const matchesSelector = el.matches(selector);
        const matchesFilter = filter(el);
        return matchesSelector && matchesFilter;
      });
    }

    static findFirstChildrenWhere(element, ...args) {
      trace("NwtDom.findFirstChildrenWhere");
      assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.findFirstChildrenWhere»");
      let selector = "*";
      let filter = () => true;
      if(typeof args[0] === "string") {
        selector = args[0];
        if(typeof args[1] === "function") {
          args[1](element)
        }
      } else if(typeof args[0] === "function") {
        filter = args[0];
      } else {
        throw new Error("Parameter «args[0]» must be string or function on «NwtDom.findFirstChildrenWhere»");
      }
      return this.utils.collectFirstChildrenWhere(element, el => {
        const matchesSelector = el.matches(selector);
        const matchesFilter = filter(el);
        return matchesSelector && matchesFilter;
      });
    }

    static findClosestParentWhere(element, ...args) {
      trace("NwtDom.findClosestParentWhere");
      assertion(element instanceof HTMLElement, "Parameter «element» must be instance of HTMLElement on «NwtDom.findClosestParentWhere»");
      let selector = "*";
      let filter = () => true;
      if(typeof args[0] === "string") {
        selector = args[0];
        if(typeof args[1] === "function") {
          args[1](element)
        }
      } else if(typeof args[0] === "function") {
        filter = args[0];
      } else {
        throw new Error("Parameter «args[0]» must be string or function on «NwtDom.findClosestParentWhere»");
      }
      return this.utils.iterateParentUntil(element, el => {
        const matchesSelector = el.matches(selector);
        const matchesFilter = filter(el);
        return matchesSelector && matchesFilter;
      });
    }

    static removeTextContentSpaces(text) {
      trace("NwtDom.removeTextContentSpaces");
      return text.replace(/[\r\n]+[ \t]+[\r\n]+/g, NwtStrings.EOL).replace(/[ ]*[\r\n]+/g, NwtStrings.EOL).replace(/[ ]*[\r\n]+/g, NwtStrings.EOL);
    }

    static find = {
      closest: {
        parent: {
          where: (...args) => this.findClosestParentWhere(...args),
        }
      },
      first: {
        children: {
          where: (...args) => this.findFirstChildrenWhere(...args),
        },
        child: {
          where: (...args) => this.findFirstChildWhere(...args),
        }
      }
    }

  };

  return NwtDom;

});
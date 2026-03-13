(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtAccessor'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtAccessor'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtAccessor = class {

    static strategy = {
      RETURN_ACCESS_ERROR: {},
      RETURN_ORIGINAL_ERROR: {},
      THROW_ACCESS_ERROR: {},
      THROW_ORIGINAL_ERROR: {},
      SIMPLE_GETTER: {},
      SIMPLE_SETTER: {},
      SIMPLE_MODIFIER: {},
      SIMPLE_DELETER: {},
    };

    static Error = class extends Error {
      static create(...args) {
        trace("NwtAccessor.ErrorHandler.create");
        return new this(...args);
      }
      constructor(message) {
        super(message);
        trace("NwtAccessor.Error.constructor");
        this.name = "AccessError";
      }
    };

    static ErrorHandler = class {
      static create(...args) {
        trace("NwtAccessor.ErrorHandler.create");
        return new this(...args);
      }
      constructor(handle) {
        trace("NwtAccessor.ErrorHandler.constructor");
        this.handle = handle;
      }
    };

    static visit(data, selector = [], successHandler = NwtAccessor.strategy.SIMPLE_GETTER, errorHandler = NwtAccessor.strategy.THROW_ORIGINAL_ERROR, extra = {}, assertion = NwtAsserter.silently) {
      trace("NwtAccessor.visit");
      // trace("NwtAccessor.visit", [data, selector]);
      let pivot = data;
      // assertion(["string", "function", "object"].indexOf(typeof data) !== -1, `Parameter «data» must be string, object or function on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
      assertion(Array.isArray(selector), `Parameter «selector» must be array but type «${typeof selector}» was found on «NwtAccessor.visit»`);
      if(selector.length === 0) return data;
      try {
        const currentIndex = [];
        const lastSelectorIndex = selector.length - 1;
        const lastIterationData = [];
        for (let index = 0; index < selector.length; index++) {
          const selectorId = selector[index];
          currentIndex.push(selectorId);
          if (index !== lastSelectorIndex) {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Intermediate property «${currentIndex.concat([]).splice(-1)}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
            assertion(["string", "number"].includes(typeof selectorId), `Provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
            assertion(selectorId in pivot, `Missing intermediate property «${selectorId}» at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.get»`);
            pivot = pivot[selectorId];
          } else {
            lastIterationData.push(selectorId, pivot, index);
          }
        }
        Last_iteration: {
          const [selectorId, pivot, index] = lastIterationData;
          if (successHandler === NwtAccessor.strategy.SIMPLE_GETTER) {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Penultimate property «${currentIndex.concat([]).splice(-2)[0]}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.get»`);
            assertion(["string", "number"].includes(typeof selectorId), `Last provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.get»`);
            assertion(selectorId in pivot, `Missing last property «${selectorId}» at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.get»`);
            return pivot[selectorId];
          } else if (successHandler === NwtAccessor.strategy.SIMPLE_SETTER) {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Penultimate property «${currentIndex.concat([]).splice(-2)}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.set»`);
            assertion(["string", "number"].includes(typeof selectorId), `Last provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.set»`);
            pivot[selectorId] = extra.payload;
            return pivot[selectorId];
          } else if (successHandler === NwtAccessor.strategy.SIMPLE_DELETER) {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Penultimate property «${currentIndex.concat([]).splice(-2)}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.delete»`);
            assertion(["string", "number"].includes(typeof selectorId), `Last provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.delete»`);
            delete pivot[selectorId];
            return true;
          } else if (successHandler === NwtAccessor.strategy.SIMPLE_MODIFIER) {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Penultimate property «${currentIndex.concat([]).splice(-2)}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.modify»`);
            assertion(["string", "number"].includes(typeof selectorId), `Last provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.modify»`);
            assertion(typeof extra.payload === "function", `Parameter «extra.payload» must be function but «${typeof extra.payload}» was found on selector «${selector.join(".")}» on «NwtAccessor.modify»`);
            return extra.payload(selectorId, pivot, currentIndex, index);
          } else if (typeof successHandler === "function") {
            assertion(!["undefined", "boolean", "number", "string"].includes(typeof pivot), `Penultimate property «${currentIndex.concat([]).splice(-2)}» at index «${currentIndex.join(".") || "[]"}» must have accessible properties but it is type «${typeof pivot}» on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
            assertion(["string", "number"].includes(typeof selectorId), `Last provided selector at index «${index}» must be string or number but «${typeof selectorId}» was found at index «${currentIndex.join(".") || "[]"}» on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
            return successHandler(selectorId, pivot, currentIndex, index);
          } else {
            throw new Error(`Parameter «successHandler» can only be function or valid accessor strategy but «${typeof successHandler}» was found on selector «${selector.join(".")}» on «NwtAccessor.visit»`);
          }
        }
      } catch (error) {
        if (errorHandler instanceof NwtAccessor.ErrorHandler) {
          return errorHandler.handle(error);
        } else if (errorHandler === NwtAccessor.strategy.RETURN_ACCESS_ERROR) {
          return NwtAccessor.Error.create(error.message);
        } else if (errorHandler === NwtAccessor.strategy.RETURN_ORIGINAL_ERROR) {
          return error;
        } else if (errorHandler === NwtAccessor.strategy.THROW_ACCESS_ERROR) {
          throw NwtAccessor.Error.create(error.message);
        } else if (errorHandler === NwtAccessor.strategy.THROW_ORIGINAL_ERROR) {
          throw error;
        } else {
          return errorHandler;
        }
      }
    }

    static get(data, selector, errorHandler = NwtAccessor.strategy.THROW_ORIGINAL_ERROR) {
      trace("NwtAccessor.get");
      return this.visit(data, selector, NwtAccessor.strategy.SIMPLE_GETTER, errorHandler, {});
    }

    static set(data, selector, payload, errorHandler = NwtAccessor.strategy.THROW_ORIGINAL_ERROR) {
      trace("NwtAccessor.set");
      return this.visit(data, selector, NwtAccessor.strategy.SIMPLE_SETTER, errorHandler, { payload });
    }

    static delete(data, selector, payload, errorHandler = NwtAccessor.strategy.THROW_ORIGINAL_ERROR) {
      trace("NwtAccessor.delete");
      return this.visit(data, selector, NwtAccessor.strategy.SIMPLE_DELETER, errorHandler, { payload });
    }

    static has(data, selector) {
      trace("NwtAccessor.has");
      return !(this.get(data, selector, NwtAccessor.strategy.RETURN_ACCESS_ERROR) instanceof NwtAccessor.Error);
    }

    static modify(data, selector, payload, errorHandler = NwtAccessor.strategy.THROW_ORIGINAL_ERROR) {
      trace("NwtAccessor.modify");
      assertion(typeof payload === "function", `Parameter «payload» must be function on selector «${selector.join(".")}» on «NwtAccessor.modify»`);
      return this.visit(data, selector, NwtAccessor.strategy.SIMPLE_MODIFIER, errorHandler, { payload });
    }

    static push(data, selector, payload = []) {
      assertion(Array.isArray(payload), `Parameter «payload» must be array on selector «${selector.join(".")}» on «NwtAccessor.push»`);
      return this.modify(data, selector, (k,v) => {
        if(!(k in v)) {
          v[k] = [];
        }
        v[k].push(...payload);
      });
    }

    static pull(data, selector) {
      return this.modify(data, selector, (k,v) => {
        if(!(k in v)) {
          v[k] = [];
        }
        return v[k].pull();
      });
    }

    static shift(data, selector) {
      return this.modify(data, selector, (k,v) => {
        if(!(k in v)) {
          v[k] = [];
        }
        return v[k].shift();
      });
    }

    static unshift(data, selector, payload) {
      assertion(Array.isArray(payload), `Parameter «payload» must be array on selector «${selector.join(".")}» on «NwtAccessor.unshift»`);
      return this.modify(data, selector, (k,v) => {
        if(!(k in v)) {
          v[k] = [];
        }
        v[k].unshift(...payload);
      });
    }

    static splice(data, selector, payload) {
      assertion(Array.isArray(payload), `Parameter «payload» must be array on selector «${selector.join(".")}» on «NwtAccessor.splice»`);
      return this.modify(data, selector, (k,v) => {
        if(!(k in v)) {
          v[k] = [];
        }
        v[k].splice(...payload);
      });
    }

  };

  return NwtAccessor;

});
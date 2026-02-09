(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtInterruption'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtInterruption'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtInterruption = class {

    static create(...args) {
      return new this(...args);
    }

    static return(value, idOrLevels, payload) {
      return new this(idOrLevels, value, payload);
    }

    static levels(level, value, payload) {
      assertion(typeof level === "number", "Parameter «level» must be number on «NwtInterruption.levels»");
      return new this(level, value, payload);
    }

    static id(id, value, payload) {
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtInterruption.id»");
      return new this(id, value, payload);
    }

    constructor(idOrLevels = undefined, returnValue = undefined, payload = NwtUtils.noop) {
      trace("NwtInterruption.constructor");
      this.id = undefined;
      this.levels = undefined;
      this.simple = false;
      this.payload = payload;
      this.return = returnValue;
      if (typeof idOrLevels === "string") {
        this.id = idOrLevels;
      } else if (typeof idOrLevels === "number") {
        this.levels = idOrLevels;
      } else if (typeof idOrLevels === "undefined") {
        this.simple = true;
      } else {
        throw new Error(`Parameter «idOrLevels» must be string or number on «NwtInterruption.constructor»`);
      }
      assertion(typeof this.payload === "function", "Parameter «payload» must be a function on «NwtInterruption.constructor»");
    }

  };

  return NwtInterruption;

});
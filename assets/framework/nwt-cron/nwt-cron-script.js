(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronScript'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronScript'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCronScript = class {

    static create(...args) {
      trace("NwtCronScript.create");
      return new this(...args);
    }

    constructor(code) {
      trace("NwtCronScript.constructor");
      this.code = code;
      this.ast = null;
    }

    parse(code = false) {
      trace("NwtCronScript.prototype.parse");
      if(code) this.code = code;
      this.ast = NwtCronParser.parse(this.code);
      return this;
    }

  };

  return NwtCronScript;

});
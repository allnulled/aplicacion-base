(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronReport'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronReport'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCronReport = class {
    static create(...args) {
      return new this(...args);
    }
    constructor() {
      this.items = [];
    }
  }

  return NwtCronReport;

});
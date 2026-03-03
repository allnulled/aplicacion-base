(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtServiceState'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtServiceState'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtServiceState = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(service) {
      this.service = service;
    }

    

  };

  return NwtServiceState;

});
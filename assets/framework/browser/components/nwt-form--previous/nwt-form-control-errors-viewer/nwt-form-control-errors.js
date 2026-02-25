(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormControlErrors'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormControlErrors'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormControlErrors = class {

  };

  return NwtFormControlErrors;

});
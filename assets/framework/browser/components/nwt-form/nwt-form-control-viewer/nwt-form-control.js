(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormControl = class {
    
    static errors = NwtFormControlErrors;

    static statement = NwtFormControlStatement;

  };

  return NwtFormControl;

});
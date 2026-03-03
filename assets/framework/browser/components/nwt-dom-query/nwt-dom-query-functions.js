(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDomQueryFunctions'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDomQueryFunctions'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtDomQueryFunctions = class {
    
    constructor(targetProperty, onFormatTarget = NwtUtils.noopSelf) {
      this.targetProperty = targetProperty;
      this.onFormatTarget = onFormatTarget;
    }
    
    getTarget() {
      return this.onFormatTarget(this[this.targetProperty]);
    }

  };

  return NwtDomQueryFunctions;

});
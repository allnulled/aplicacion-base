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

    static safely = {

      get(data, selector, defaultValue = undefined) {
        let output = data;
        assertion(["string", "function", "object"].indexOf(typeof data) !== -1, "Parameter «data» must be string, object or function on «NwtAccessor.safely.get»");
        assertion(Array.isArray(selector), "Parameter «selector» must be array on «NwtAccessor.safely.get»");
        try {
          for(let index=0; index<selector.length; index++) {
            const selectorId = selector[index];
            output = output[selectorId];
          }
        } catch (error) {
          return defaultValue;
        }
        return output;
      }

    };

  };

  return NwtAccessor;

});
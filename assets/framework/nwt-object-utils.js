(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtObjectUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtObjectUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtObjectUtils = class {

    static noop() {}

    static cleanMapByPairs(data, cleaner = this.noop) {
      trace("NwtObjectUtils.cleanMapByPairs");
      const keys = Object.keys(data);
      const output = {};
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const val = data[key];
        const result = cleaner(key, val, index);
        if(typeof result !== "undefined") {
          if(!Array.isArray(result)) {
            throw new Error(`Parameter «data[${JSON.stringify(key)}]» must be an array on «NwtObjectUtils.cleaMapByPairs»`);
          }
          if(result.length !== 2) {
            throw new Error(`Parameter «data[${JSON.stringify(key)}]» must be an array of 2 elements on «NwtObjectUtils.cleaMapByPairs»`);
          }
          output[result[0]] = result[1];
        }
      }
      return output;
    }

  };

  return NwtObjectUtils;

});
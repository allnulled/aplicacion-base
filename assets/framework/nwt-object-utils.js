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

    static cleanMapByPairs(obj, cleaner = this.noop) {
      trace("NwtObjectUtils.cleanMapByPairs");
      const keys = Object.keys(obj);
      const output = {};
      for(let index=0; index<keys.length; index++) {
        const key = keys[index];
        const val = obj[key];
        const result = cleaner(key, val, index);
        if(typeof result !== "undefined") {
          if(!Array.isArray(result)) {
            throw new Error(`Parameter «obj[${JSON.stringify(key)}]» must be an array on «NwtObjectUtils.cleaMapByPairs»`);
          }
          if(result.length !== 2) {
            throw new Error(`Parameter «obj[${JSON.stringify(key)}]» must be an array of 2 elements on «NwtObjectUtils.cleaMapByPairs»`);
          }
          output[result[0]] = result[1];
        }
      }
      return output;
    }

    static toggleByKeyAndSetter(obj, key, setter) {
      trace("NwtObjectUtils.toggleByKeyAndSetter");
      const hasKey = key in obj;
      if(!hasKey) {
        return setter(key, obj[key], obj).then(output => {
          obj[key] = output;
          return output;
        });
      } else {
        delete obj[key];
      }
    }

  };

  return NwtObjectUtils;

});
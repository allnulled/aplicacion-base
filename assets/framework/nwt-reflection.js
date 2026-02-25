(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtReflection'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtReflection'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtReflection = class {

    static isDescriptible(obj) {
      if(obj === null) return false;
      if(!["object","function"].includes(typeof(obj))) return false;
      return true;
    }

    static keys(obj) {
      if(!this.isDescriptible(obj)) return [];
      return Object.getOwnPropertyNames(obj);
    }

    static values(obj) {
      if(!this.isDescriptible(obj)) return {};
      let descriptors = { $initialized: true };
      try {
        descriptors = Object.getOwnPropertyDescriptors(obj);
      } catch (error) {
        descriptors = { $error: error };
      }
      return NwtObjectUtils.cleanMapByPairs(descriptors, function(key, val) {
        return [key, val.value];
      });
    }

    static typology(obj, levels = 3) {
      if(!this.isDescriptible(obj)) return {"&type":typeof(obj), "&value":obj};
      let descriptors = { $initialized: true };
      try {
        descriptors = Object.getOwnPropertyDescriptors(obj);
      } catch (error) {
        descriptors = { $error: error };
      }
      return {
        "*type": typeof(obj),
        ...NwtObjectUtils.cleanMapByPairs(descriptors, (key, val) => {
          if(typeof val.value === "number") return [key, val.value];
          if(typeof val.value === "boolean") return [key, val.value];
          if(typeof val.value === "string") {
            if(val.value.length < 100) {
              return [key, `string = ${val.value}`];
            }
            return [key, `string : ${val.value.length}`];
          }
          if(typeof val.value === "function") {
            
          }
          return [key, levels > 0 ? this.typology(val.value, levels - 1) : `${typeof val.value}`];
        }),
      };
    }

  };

  return NwtReflection;

});
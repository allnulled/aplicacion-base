(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCollectionUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCollectionUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCollectionUtils = class {

    static normalizeCollection(listOrObject) {
      trace("NwtCollectionUtils.normalizeCollection");
      if(Array.isArray(listOrObject)) {
        return listOrObject.map((value, index) => [index, value]);
      } else if(typeof listOrObject === "object") {
        return Object.keys(listOrObject).map(key => [key, listOrObject[key]]);
      }
      throw new Error("Parameter «listOrObject» must be an array or an object on «NwtCollectionUtils.normalizeCollection»");
    }

    static toggleByFinderAndSetter(listOrObject, options = {}) {
      trace("NwtCollectionUtils.toggleByFinderAndSetter");
      assertion(typeof listOrObject === "object", "Parameter «listOrObject» must be an array or an object on «NwtCollectionUtils.toggleByFinderAndSetter»");
      assertion(typeof options.finder === "function", "Parameter «options.finder» must be a function on «NwtCollectionUtils.toggleByFinderAndSetter»");
      assertion(typeof options.setter === "function", "Parameter «options.setter» must be a function on «NwtCollectionUtils.toggleByFinderAndSetter»");
      const data = this.normalizeCollection(listOrObject);
      const { finder, setter } = options;
      data.filter(finder).each(([key, val]) => {
        const output = setter(key, val);
        listOrObject[key] = output;
      });
    }

    static getPositionOfFirstWhere(list, whereCallback) {
      for(let index=0; index<list.length; index++) {
        const item = list[index];
        const result = whereCallback(item);
        if(result) {
          return index;
        }
      }
      return -1;
    }

    static async toggleByFirstOrValue(list, val) {
      trace("NwtCollectionUtils.toggleByValue");
      for(let index=list.length-1; index>0; index--) {
        const item = list[index];
        if((Array.isArray(item) ? item[0] : item) === val) {
          list.splice(index, 1);
        } else {
          list.push(false);
        }
      }
      return list;
    }

  };

  return NwtCollectionUtils;

});
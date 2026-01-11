(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtArrayUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtArrayUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtArrayUtils = class {

    static async toggleByValue(list, val) {
      trace("NwtArrayUtils.toggleByValue");
      const pos = list.indexOf(val);
      if(pos === -1) list.push(val);
      else list.splice(pos, 1);
      return list;
    }

    static async toggleByFirstOrValue(list, val) {
      trace("NwtArrayUtils.toggleByValue");
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

    static repeatBy(reps = 1, val = undefined) {
      trace("NwtArrayUtils.repeatBy");
      const output = [];
      for(let index=0; index<reps; index++) {
        output.push(val);
      }
      return output;
    }

  };

  return NwtArrayUtils;

});
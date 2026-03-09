(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronIndex'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronIndex'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCronIndex = class {
    static create(...args) {
      return new this(...args);
    }
    constructor(pointer = []) {
      this.pointer = pointer;
    }
    clone() {
      return NwtCronIndex.create(this.pointer);
    }
    extend(...args) {
      const copy = this.clone();
      copy.pointer.concat(...args);
      return copy;
    }
  };

  return NwtCronIndex;

});
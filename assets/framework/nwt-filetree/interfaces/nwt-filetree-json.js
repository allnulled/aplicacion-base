(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeJson'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeJson'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeJson = class extends NwtFiletreeNode {

    constructor(...args) {
      super(...args);
      // Property this.filetree is already set here.
    }

  };

  return NwtFiletreeJson;

});
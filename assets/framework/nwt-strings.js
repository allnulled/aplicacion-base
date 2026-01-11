(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtStrings'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtStrings'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtStrings = class {

    static async fromAssets(stringId) {
      trace("NwtStrings.fromAssets");
      const stringPath = NwtPaths.global.relative("assets/app/strings", stringId);
      const stringContent = await NwtFilesystem.readFile(stringPath);
      return stringContent;
    }

  };

  return NwtStrings;

});
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

    static EOL = NwtEnvironment.isNode ? require("os").EOL : "\n";

    static async fromAssets(stringId) {
      trace("NwtStrings.fromAssets");
      const stringPath = NwtPaths.global.relative("assets/app/strings", stringId);
      const stringContent = await NwtFilesystem.readFile(stringPath);
      return stringContent;
    }

    static getDistJsSource() {
      trace("NwtStrings.getDistJsSource");
      if(this.distSource) {
        return this.distSource;
      }
      return require("fs").promises.readFile(NwtPaths.global.relative("assets/dist.js"), "utf8").then(output => {
        this.distSource = output;
        return output;
      });
    }

    static printSurroundingLinesFromDistJs(info, linesBefore = 5, linesAfter = 5) {
      trace("NwtStrings.printSurroundingLinesFromDistJs");
      if(this.distSource) {
        return NwtUtils.getSurroundingLines(this.distSource, info.line, info.column, linesBefore, linesAfter);
      }
      return (async() => {
        const content = await this.getDistJsSource();
        return NwtUtils.getSurroundingLines(content, info.line, info.column, linesBefore, linesAfter);
      })();
    }

  };

  return NwtStrings;

});
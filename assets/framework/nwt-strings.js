/**
 * 
 * # NwtStrings
 * 
 * API de utilidades relacionadas con **obtener** algunos strings específicos.
 * 
 * Se distingue de la API de `NwtStringUtils` (puede que todavía no exista) en que esta segunda serían métodos y utilidades relacionadas con cualquier string. `NwtStringUtils` sería para métodos de extensión de `String.prototype`.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtStrings
 * NwtFramework.Strings
 * Vue.prototype.$nwt.Strings
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtStrings.EOL; // fin de línea en el sistema operativo actual (usa node.js)
 * await NwtStrings.fromAssets(filename); // returns el contenido de `assets/app/strings/${filename}`
 * await NwtStrings.getDistJsSource(); // returns el contenido de `assets/dist.js` (que se cachea y luego puede obtenerse en sync)
 * await NwtStrings.getSurroundingLinesFromDistJs({line:Integer,column:Integer}, linesBefore=5, linesAfter=5); // returns as String el contenido especificado dentro de `assets/dist.js`
 * ```
 * 
 */

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

    static getSurroundingLinesFromDistJs(info, linesBefore = 5, linesAfter = 5) {
      trace("NwtStrings.getSurroundingLinesFromDistJs");
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
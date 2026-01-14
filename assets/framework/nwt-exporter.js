/**
 * 
 * # NwtExporter
 * 
 * API para exportar APIs exportables.
 * 
 * Se trata de concentrar y reducir los nombres de las funciones que están esparcidas por toda la API.
 * 
 * Aunque principalmente se centra en la API de NwtFilesystem.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtExporter
 * NwtFramework.Exporter
 * Vue.prototype.$nwt.Exporter
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Uso pensado es:
 * const $ = NwtExporter.export.api();
 * await $.read.file(...);
 * await $.read.directory(...);
 * await $.read.tree(...);
 * await $.read.json(...);
 * await $.read.property(...);
 * await $.write.file(...);
 * await $.write.directory(...);
 * await $.write.tree(...);
 * await $.write.json(...);
 * await $.write.property(...);
 * await $.ensure.file(...);
 * await $.ensure.directory(...);
 * await $.ensure.tree(...);
 * await $.ensure.json(...);
 * await $.ensure.property(...);
 * ```
 * 
 * De momento, es preferible la API de Persister.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtExporter'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtExporter'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtExporter = class {

    static exportable = {
      api: {
        read: {
          file: (...args) => NwtFilesystem.readFile(...args),
          directory: (...args) => NwtFilesystem.readDirectory(...args),
          tree: (...args) => NwtFilesystem.readTree(...args),
          json: (...args) => NwtFilesystem.readJson(...args),
          property: (...args) => NwtFilesystem.readProperty(...args),
        },
        write: {
          file: (...args) => NwtFilesystem.writeFile(...args),
          directory: (...args) => NwtFilesystem.mkdir(...args),
          tree: (...args) => NwtFilesystem.writeTree(...args),
          json: (...args) => NwtFilesystem.writeJson(...args),
          property: (...args) => NwtFilesystem.writeProperty(...args),
        },
        ensure: {
          file: (...args) => NwtFilesystem.ensureFile(...args),
          directory: (...args) => NwtFilesystem.mkdir(...args),
          tree: (...args) => NwtFilesystem.ensureTree(...args),
          json: (...args) => NwtFilesystem.ensureJson(...args),
          property: (...args) => NwtFilesystem.ensureProperty(...args),
        }
      }
    }

    static export = {
      api: () => this.exportable.api
    };

  };

  return NwtExporter;

});
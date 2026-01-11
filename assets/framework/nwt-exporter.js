/**
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
/**
 * 
 * # NwtFileChooser
 * 
 * API para seleccionar ficheros y carpetas.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFileChooser
 * NwtFramework.FileChooser
 * Vue.prototype.$nwt.FileChooser
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * await NwtFileChooser.pickFile({ ... });
 * await NwtFileChooser.pickDirectory({ ... });
 * await NwtFileChooser.pickFileToSave({ ... });
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFileChooser'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFileChooser'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFileChooser = class {

    static pickFile(options = {}) {
      trace("NwtFileChooser.pickFile");
      return CommonDialogs.open({
        title: "Seleccionar ficheros",
        template: `
          <nwt-file-explorer
            chooser-of="file"
            :multiple="options.multiple || false"
            :accept-extensions="options.acceptExtensions || '*'"
            :on-accept="(v) => accept(v)"
            :on-cancel="() => cancel()"
          />
        `,
        factory: {
          data: {
            options,
          }
        }
      });
    }

    static pickDirectory(options = {}) {
      trace("NwtFileChooser.pickDirectory");
      return CommonDialogs.open({
        title: "Seleccionar directorio",
        template: `
          <nwt-file-explorer
            chooser-of="directory"
            :on-accept="(v) => accept(v)"
            :on-cancel="() => cancel()"
          />
        `,
        factory: {
          data: {
            options,
          }
        }
      });
    }

    static pickFileToSave(options = {}) {
      trace("NwtFileChooser.pickFileToSave");
      return CommonDialogs.open({
        title: "Seleccionar fichero para guardar",
        template: `
          <nwt-file-explorer
            chooser-of="file"
            :save-file="true"
            :multiple="false"
            :on-accept="(v) => accept(v)"
            :on-cancel="() => cancel()"
          />
        `,
        factory: {
          data: {
            options,
          }
        }
      });
    }

  };

  return NwtFileChooser;

});
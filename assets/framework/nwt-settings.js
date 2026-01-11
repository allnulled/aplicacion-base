/**
 * 
 * # Nwt Settings API
 * 
 * API para gestionar configuraciones globalmente.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtSettings
 * NwtFramework.Settings
 * Vue.prototype.$nwt.Settings
 * NwtSettings.global // instancia
 * ```
 * 
 * ## Ventajas
 * 
 * - Guarda en el fichero indicado la caché del programa dependiendo del sistema operativo.
 * - Carga las configuraciones desde el fichero dependiendo del sistema operativo.
 * - Si está en navegador, usa localStorage
 * 
 * ```js
 * NwtSettings.global // instancia
 * // PROPIEDADES:
 * NwtSettings.global.$file
 * NwtSettings.global.$storageId
 * // PERSISTENCIA:
 * NwtSettings.global.save()
 * NwtSettings.global.load()
 * // CRUD:
 * NwtSettings.global.initialize(key, value)
 * NwtSettings.global.get(key, defaultValue)
 * NwtSettings.global.set(key, value)
 * NwtSettings.global.delete(key)
 * ```
 * 
 */

(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtSettings'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtSettings'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtSettings = class extends NwtJsonStorer {

    // @OK: Settings está OK con la API heredada ya.

  };

  const options = {};

  if (NwtEnvironment.isDesktop) {

    if (NwtEnvironment.isLinux) {
      // Ruta XDG típica para config de usuario
      // ~/.config/NwtFramework/settings.json
      options.file = require("path").join(
        require("os").homedir(),
        ".config",
        "NwtFramework",
        "settings.json"
      );

      require("fs-extra").ensureFileSync(options.file);

    } else if (NwtEnvironment.isWindows) {
      // Ruta típica de configuración en Windows:
      // C:\Users\<User>\AppData\Roaming\NwtFramework\settings.json
      const homedir = require("os").homedir();
      options.file = require("path").join(
        homedir,
        "AppData",
        "Roaming",
        "NwtFramework",
        "settings.json"
      );

      require("fs-extra").ensureFileSync(options.file);

    } else {
      throw new Error("Plataforma no soportada: solo Windows y Linux");
    }

  } else if (NwtEnvironment.isBrowser) {

    options.storageId = "NWT_SETTINGS_GLOBAL_STORAGE";

  } else if (NwtEnvironment.isCordova) {

    // Ruta estándar interna para aplicaciones Cordova
    // Normalmente: /data/data/<app>/files/settings.json
    // No se usa process.env
    options.file = "settings.json";
    options.storageId = "NWT_SETTINGS_GLOBAL_STORAGE";

  }

  NwtSettings.global = NwtSettings.create(options);
  
  (async () => {
    await NwtSettings.global.initialize("nwt.binary.cordova", "cordova");
    await NwtSettings.global.initialize("nwt.binary.nw", "nw");
    await NwtSettings.global.initialize("nwt.binary.node", "node");
    await NwtSettings.global.initialize("nwt.binary.npm", "npm");
    await NwtSettings.global.initialize("nwt.binary.git", "git");
    await NwtSettings.global.initialize("nwt.binary.imagemagick", "convert");
    await NwtSettings.global.initialize("nwt.binary.yomitoku", "yomitoku");
    if(NwtEnvironment.isLinux) {
      await NwtSettings.global.initialize("nwt.binary.file-explorer", "nemo");
    } else if(NwtEnvironment.isWindows) {
      await NwtSettings.global.initialize("nwt.binary.file-explorer", "explorer");
    }
    await NwtSettings.global.initialize("nwt.api.chatgpt-plus.key", "none");
  })();

  return NwtSettings;

});
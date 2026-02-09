/**
 * 
 * # NwtCacheDirectory
 * 
 * API para gestionar un directorio de cacheo.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtCacheDirectory
 * NwtFramework.CacheDirectory
 * Vue.prototype.$nwt.CacheDirectory
 * // Instancias:
 * NwtCacheDirectory.local // Cache de AppData, que vive más allá de los git clones
 * NwtCacheDirectory.installation // Cache que no vive más allá de los git clones
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Esta API está en desarrollo
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCacheDirectory'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCacheDirectory'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCacheDirectory = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir) {
      assertion(typeof basedir === "string", "Parameter «basedir» must be string on «NwtCacheDirectory.constructor»");
      assertion(basedir.length !== 0, "Parameter «basedir.length» cannot be 0 on «NwtCacheDirectory.constructor»");
      this.basedir = basedir;
      this.stringShortener = NwtStringShortener.create(`${this.basedir}/cache/ids.json`);
    }

    resolve(...subpaths) {
      trace("NwtCacheDirectory.prototype.resolve");
      return require("path").resolve(this.basedir, ...subpaths);
    }

    async saveStep(keys, result = {done:true}) {
      trace("NwtCacheDirectory.prototype.saveStep");
      assertion(Array.isArray(keys), "Parameter «keys» must be array on «NwtCacheDirectory.prototype.saveStep»");
      assertion(keys.length !== 0, "Parameter «keys.length» cannot be 0 on «NwtCacheDirectory.prototype.saveStep»");
      for(let index=0; index<keys.length; index++) {
        const item = keys[index];
        assertion(typeof item === "string", `Parameter «keys[${index}]» must be string on «NwtCacheDirectory.prototype.saveStep»`);
      }
      assertion(typeof result === "object", "Parameter «result» must be object on «NwtCacheDirectory.prototype.saveStep»");
      const shortableId = keys.join("/");
      Aseguramos_directorio_de_cache_general: {
        await NwtFilesystem.ensureDirectory(this.resolve("cache"));
      }
      const shortenedId = await this.stringShortener.init(shortableId);
      const cachedPath = this.resolve(`cache/${shortenedId}`);
      const cachedFile = this.resolve(`${cachedPath}/cached.json`);
      Aseguramos_directorio_de_cache_concreto: {
        await require("fs").promises.mkdir(cachedPath, { recursive: true });
      }
      Aseguramos_fichero_de_cache_concreto: {
       await NwtFilesystem.ensureJson(cachedFile, result);
      }
      Sobreescribimos_json: {
       await NwtFilesystem.writeJson(cachedFile, result); 
      }
    }

    async loadStep(keys, initializer = {done:false}) {
      trace("NwtCacheDirectory.prototype.loadStep");
      assertion(Array.isArray(keys), "Parameter «keys» must be array on «NwtCacheDirectory.prototype.loadStep»");
      assertion(typeof initializer === "object", "Parameter «initializer» must be object on «NwtCacheDirectory.prototype.loadStep»");
      const shortableId = keys.join("/");
      const shortenedId = await this.stringShortener.init(shortableId);
      const cachedPath = this.resolve(`cache/${shortenedId}`);
      const cachedFile = this.resolve(`${cachedPath}/cached.json`);
      Aseguramos_directorio_de_cache_general: {
        await NwtFilesystem.ensureDirectory(this.resolve("cache"));
      }
      Aseguramos_directorio_de_cache_concreto: {
        await require("fs").promises.mkdir(cachedPath, { recursive: true });
      }
      Aseguramos_fichero_de_cache_concreto: {
       await NwtFilesystem.ensureJson(cachedFile, initializer);
      }
      Devolvemos_cache: {
        return await NwtFilesystem.readJson(cachedFile, initializer);
      }
    }

  };

  
  NwtCacheDirectory.local = NwtCacheDirectory.create(NwtPaths.global.relativeToAppData("cache/global"));
  
  NwtCacheDirectory.installation = NwtCacheDirectory.create(NwtPaths.global.relative("assets/app/cache/global"));

  return NwtCacheDirectory;

});
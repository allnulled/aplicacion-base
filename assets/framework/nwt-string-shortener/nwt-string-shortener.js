/**
 * 
 * # NwtStringShortener
 * 
 * API para gestionar strings acortados.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtStringShortener
 * NwtFramework.StringShortener
 * Vue.prototype.$nwt.StringShortener
 * // Instancia:
 * NwtStringShortener.global // instancia creada en: "assets/framework/nwt-string-shortener/global.json"
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```js
 * // Estáticos:
 * NwtStringShortener.create(jsonFilepath:String);
 * NwtStringShortener.createUid(len=10); // returns String con un nuevo ID (PERO NO LO PERSISTE)
 * // De instancia:
 * await NwtStringShortener.global.init(id, initialValue = undefined); // Inicializa un ID si no existe ya + retorna su shorteneado
 * await NwtStringShortener.global.get(id, defaultValue = undefined); // Devuelve el ID shorteneado de un ID, o en su defecto `defaultValue`
 * await NwtStringShortener.global.deleteById(id); // Elimina el ID no shorteneado proporcionado
 * await NwtStringShortener.global.deleteAllExceptValues(values=[]); // Elimina todos los IDs **shorteneados** que NO aparezcan en el `values=[...]`. Se usa para eliminar directorios-caché obsoletos.
 * await NwtStringShortener.global.add(id, value = false, silently = false); // añade el ID como nuevo shortener + si value no es false lo usa como ID shorteneado + si silently no es false no lanza error de existir ya + retorna el ID shorteneado correspondiente
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtStringShortener'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtStringShortener'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtStringShortener = class {

    static create(...args) {
      return new this(...args);
    }

    static createUid(len = 10) {
      return NwtRandomizer.fromAlphabet(len);
    }

    constructor(filepath) {
      trace("NwtStringShortener.constructor");
      this.filepath = filepath;
    }

    async add(id, value = false, silently = false) {
      trace("NwtStringShortener.add");
      await NwtFilesystem.ensureJson(this.filepath, {});
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(id in ids) {
        if(!silently) {
          return ids[id];
        }
        throw new Error("Parameter «id» cannot match a previous id on «NwtStringShortener.prototype.add»");
      }
      ids[id] = (value === false) ? this.constructor.createUid() : value;
      await NwtFilesystem.writeJson(this.filepath, ids);
      return ids[id];
    }

    async deleteById(id) {
      trace("NwtStringShortener.delete");
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(!(id in ids)) {
        return false;
      }
      delete ids[id];
      await NwtFilesystem.writeJson(this.filepath, ids);
      return true;
    }

    async deleteAllExceptValues(values) {
      trace("NwtStringShortener.delete");
      const idsObject = await NwtFilesystem.readJson(this.filepath);
      const currentKeys = Object.keys(idsObject);
      let hadDeletes = 0;
      for(let index=0; index<currentKeys.length; index++) {
        const key = currentKeys[index];
        const value = idsObject[key];
        const isException = values.indexOf(value) !== -1;
        if(!isException) {
          delete idsObject[key];
          hadDeletes++;
        }
      }
      await NwtFilesystem.writeJson(this.filepath, idsObject);
      return hadDeletes;
    }

    async get(id, defaultValue = undefined) {
      trace("NwtStringShortener.get");
      await NwtFilesystem.ensureJson(this.filepath, {});
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(!(id in ids)) {
        return defaultValue;
      }
      return ids[id];
    }

    async init(id, initialValue = undefined) {
      trace("NwtStringShortener.init");
      await NwtFilesystem.ensureJson(this.filepath, {});
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(id in ids) {
        return ids[id];
      }
      return await this.add(id, initialValue);
    }

    async list() {
      trace("NwtStringShortener.list");
      const ids = await NwtFilesystem.readJson(this.filepath);
      return ids;
    }

  };
  
  NwtStringShortener.global = NwtStringShortener.create(NwtPaths.global.relative("assets/framework/nwt-string-shortener/global.json"));

  return NwtStringShortener;

});
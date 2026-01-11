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

    constructor(filepath) {
      trace("NwtStringShortener.constructor");
      this.filepath = filepath;
    }

    createUid(len = 10) {
      return NwtRandomizer.fromAlphabet(len);
    }

    async initializeStore() {
      trace("NwtStringShortener.initialize");
      return await NwtFilesystem.ensureJson(this.filepath, {});
    }

    async add(id, value = false, silently = undefined) {
      trace("NwtStringShortener.add");
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(id in ids) {
        if(typeof silently !== "undefined") {
          return silently;
        }
        throw new Error("Parameter «id» cannot match a previous id on «NwtStringShortener.prototype.add»");
      }
      ids[id] = (value === false) ? this.createUid() : value;
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
      const ids = await NwtFilesystem.readJson(this.filepath);
      if(!(id in ids)) {
        return defaultValue;
      }
      return ids[id];
    }

    async init(id, initialValue = undefined) {
      trace("NwtStringShortener.init");
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
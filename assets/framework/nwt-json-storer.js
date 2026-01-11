/**
 * 
 * # Nwt Json Storer API
 * 
 * La `Nwt Json Storer API` consiste en la gestión de 1 JSON para PC con **filesystem** y para navegador con **localStorage**.
 * 
 * ## Exposición
 * 
 * La API se expone en forma de clase con:
 * 
 * ```js
 * NwtJsonStorer
 * NwtFramework.JsonStorer
 * Vue.prototype.$nwt.JsonStorer
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtJsonStorer.isNode // Boolean
 * NwtJsonStorer.fs // Object | null
 * const storer = NwtJsonStorer.create({
 *   file: "/path/to/your/file.json",
 *   storageId: "JSON_STORER_FOR_YOUR_APP_IN_LS",
 * });
 * await storer.load();
 * await storer.save();
 * await storer.initialize(key, value);
 * await storer.get(key, defaultValue);
 * await storer.set(key, value);
 * await storer.delete(key);
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsonStorer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsonStorer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsonStorer = class {

    static isNode = NwtEnvironment.isNode;

    static fs = NwtEnvironment.isNode ? require("fs") : null;

    static create(...args) {
      trace("NwtJsonStorer.create");
      return new this(...args);
    }

    constructor(options = {}) {
      trace("NwtJsonStorer.constructor");
      this.$options = Object.assign({}, options);
      this.$file = this.$options.file || null;
      this.$storageId = this.$options.storageId || null;
      this.$data = {};
    }

    async saveByFilesystem() {
      trace("NwtJsonStorer.prototype.saveByFilesystem");
      if (!this.$file) throw new Error("Parameter «this.$file» must exist on «NwtJsonStorer.prototype.saveByFilesystem»");
      const txt = JSON.stringify(this.$data, null, 2);
      await this.constructor.fs.promises.writeFile(this.$file, txt, "utf8");
      return true;
    }

    async loadByFilesystem() {
      trace("NwtJsonStorer.prototype.loadByFilesystem");
      if (!this.$file) throw new Error("Parameter «this.$file» must exist on «NwtJsonStorer.prototype.loadByFilesystem»");
      try {
        const txt = await this.constructor.fs.promises.readFile(this.$file, "utf8");
        this.$data = JSON.parse(txt);
        return true;
      } catch (err) {
        this.$data = {};
        return false;
      }
    }

    async saveByLocalStorage() {
      trace("NwtJsonStorer.prototype.saveByLocalStorage");
      if (!this.$storageId) throw new Error("Parameter «this.$storageId» must exist on «NwtJsonStorer.prototype.saveByLocalStorage»");
      localStorage.setItem(this.$storageId, JSON.stringify(this.$data));
      return true;
    }

    async loadByLocalStorage() {
      trace("NwtJsonStorer.prototype.loadByLocalStorage");
      if (!this.$storageId) throw new Error("Parameter «this.$storageId» must exist on «NwtJsonStorer.prototype.loadByLocalStorage»");
      const txt = localStorage.getItem(this.$storageId);
      if (!txt) {
        this.$data = {};
        return false;
      }
      try {
        this.$data = JSON.parse(txt);
        return true;
      } catch (err) {
        this.$data = {};
        return false;
      }
    }

    async initialize(key, value = undefined) {
      trace("NwtJsonStorer.prototype.initialize");
      await this.load();
      if (!(key in this.$data)) {
        if (value !== undefined) {
          this.$data[key] = value;
          await this.save();
        }
      }
      return this.$data[key];
    }

    async save() {
      trace("NwtJsonStorer.prototype.save");
      if (this.constructor.isNode) return this.saveByFilesystem();
      if (!this.constructor.isNode) return this.saveByLocalStorage();
      return false;
    }

    async load() {
      trace("NwtJsonStorer.prototype.load");
      if (this.constructor.isNode) return this.loadByFilesystem();
      if (!this.constructor.isNode) return this.loadByLocalStorage();
      this.$data = {};
      return false;
    }

    async get(key, defaultValue = undefined) {
      trace("NwtJsonStorer.prototype.get");
      await this.load();
      if (key in this.$data) return this.$data[key];
      return defaultValue;
    }

    async set(key, value = undefined) {
      trace("NwtJsonStorer.prototype.set");
      await this.load();
      this.$data[key] = value;
      await this.save();
      return value;
    }

    async delete(key) {
      trace("NwtJsonStorer.prototype.delete");
      await this.load();
      delete this.$data[key];
      await this.save();
    }

  };

  return NwtJsonStorer;

});
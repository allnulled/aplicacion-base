(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletree'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletree'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFiletree = class {

    static Selector = NwtFiletreeSelector;

    static Interpreter = NwtFiletreeSelectorInterpreter;

    static create(...args) {
      return new this(...args);
    }

    static async parse(fullpath, interpretationParams = {}, shortener = false) {
      const urldata = await this.Selector.parse(fullpath);
      console.log(urldata);
      const url = await this.Interpreter.interpret(urldata, interpretationParams, shortener);
      return url;
    }

    static glob = {
      find: async (fullpath, interpretationParams = {}, globParams = {}, shortener = false) => {
        trace("NwtFiletree.glob.find");
        const url = await this.parse(fullpath, interpretationParams, shortener);
        const fastGlob = require("fast-glob");
        return await fastGlob(url.hasInterpretedEndpoint, globParams);
      }
    }

    static io = {
      dir: NwtFiletreeDirectory,
      file: NwtFiletreeFile,
      json: NwtFiletreeJson,
      prop: NwtFiletreeProperty,
    };

    io = {
      dir: new NwtFiletreeDirectory(this),
      file: new NwtFiletreeFile(this),
      json: new NwtFiletreeJson(this),
      prop: new NwtFiletreeProperty(this),
    };

    glob = new NwtFiletreeGlob(this);

    constructor(basedir) {
      const path = NwtBrowserPolyfill.require("path");
      this.basedir = path.resolve(basedir);
      this.shortener = NwtStringShortener.create(this.basedir);
    }

    resolve(...subpaths) {
      const finaldir = require("path").resolve(this.basedir, ...subpaths);
      const isBoundariesIn = (finaldir === this.basedir) || finaldir.startsWith(this.basedir + "/");
      if(!isBoundariesIn) {
        throw new Error(`Parameter «subpaths» must be built inside «this.basedir» scope on «NwtFiletree.prototype.resolve»`);
      }
      return finaldir;
    }

    parse(subpaths = [], interpretationParams = {}, shortener = false) {
      const fullpath = this.resolve(...typeof subpaths === "string" ? [subpaths] : subpaths);
      return this.constructor.parse(fullpath, interpretationParams, shortener);
    }

  }

  NwtFiletree.global = NwtFiletree.create(NwtPaths.global.projectRoot);

  return NwtFiletree;

});
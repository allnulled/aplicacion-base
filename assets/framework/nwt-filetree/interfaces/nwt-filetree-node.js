(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeNode'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeNode'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeNode = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(...args) {
      const [filetree] = args;
      this.filetree = filetree;
    }

    static async list(fullpath, arg1) {
      trace("NwtFiletreeNode.list");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath);
      console.log(info);
      // @TODO
    }

    static async init(fullpath, arg1) {
      trace("NwtFiletreeNode.init");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath);
      console.log(info);
      // @TODO
    }

    static async save(fullpath, arg1) {
      trace("NwtFiletreeNode.save");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath);
      console.log(info);
      // @TODO
    }

    static async read(fullpath, arg1) {
      trace("NwtFiletreeNode.read");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath);
      console.log(info);
      // @TODO
    }

    static async delete(fullpath, arg1) {
      trace("NwtFiletreeNode.delete");
      const info = await NwtFiletreeSelectorInterpreter.interpret(fullpath);
      console.log(info);
      // @TODO
    }

    list(subpath, arg1) {
      trace("NwtFiletreeNode.prototype.init");
      const fullpath = this.filetree.resolve(subpath);
      return this.constructor.list(fullpath);
    }

    init(subpath, arg1) {
      trace("NwtFiletreeNode.prototype.init");
      const fullpath = this.filetree.resolve(subpath);
      return this.constructor.init(fullpath);
    }

    save(subpath, arg1) {
      trace("NwtFiletreeNode.prototype.save");
      const fullpath = this.filetree.resolve(subpath);
      return this.constructor.save(fullpath);
    }

    read(subpath, arg1) {
      trace("NwtFiletreeNode.prototype.read");
      const fullpath = this.filetree.resolve(subpath);
      return this.constructor.read(fullpath);
    }

    delete(subpath, arg1) {
      trace("NwtFiletreeNode.prototype.delete");
      const fullpath = this.filetree.resolve(subpath);
      return this.constructor.delete(fullpath);
    }

  };

  return NwtFiletreeNode;

});
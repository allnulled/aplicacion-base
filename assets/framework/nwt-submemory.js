(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtSubmemory'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtSubmemory'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  /*

  const NwtSubmemoryEntity = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(submemory, subpath) {
      trace("NwtSubmemoryEntity.constructor");
      this.submemory = submemory;
      this.subpath = subpath;
    }

    normalizeSubpath(subpath = []) {
      trace("NwtSubmemoryEntity.prototype.normalizeSubpath");
      const isArray = Array.isArray(subpath);
      const subpathAsString = isArray ? subpath.length === 0 ? "" : subpath.join("/") : subpath;
      const fullpath = require("path").resolve(this.submemory.basedir, this.subpath || "", subpathAsString);
      return fullpath;
    }

    read() {
      trace("NwtSubmemoryEntity.prototype.read");
      throw new Error("SubmemoryEntity must implement «read» method for this");
    }

    exists() {
      trace("NwtSubmemoryEntity.prototype.exists");
      throw new Error("SubmemoryEntity must implement «exists» method for this");
    }

    equals() {
      trace("NwtSubmemoryEntity.prototype.equals");
      throw new Error("SubmemoryEntity must implement «equals» method for this");
    }

    fill() {
      trace("NwtSubmemoryEntity.prototype.fill");
      throw new Error("SubmemoryEntity must implement «fill» method for this");
    }

    save() {
      trace("NwtSubmemoryEntity.prototype.save");
      throw new Error("SubmemoryEntity must implement «save» method for this");
    }

    reset() {
      trace("NwtSubmemoryEntity.prototype.reset");
      throw new Error("SubmemoryEntity must implement «reset» method for this");
    }

    delete() {
      trace("NwtSubmemoryEntity.prototype.delete");
      throw new Error("SubmemoryEntity must implement «delete» method for this");
    }

    static readDirectory(dirpath) {
      trace("NwtSubmemoryEntity.readDirectory");
      return NwtFilesystem.readTree(dirpath);
    }
    
    static existsDirectory(dirpath) {
      trace("NwtSubmemoryEntity.existsDirectory");
      return NwtFilesystem.existsAsDirectory(dirpath);
    }
    
    static fillDirectory(dirpath) {
      trace("NwtSubmemoryEntity.fillDirectory");
      return false;
      throw new Error("Static method «NwtSubmemoryEntity.fillDirectory» is not implemented in this current API");
    }
    
    static saveDirectory(dirpath) {
      trace("NwtSubmemoryEntity.saveDirectory");
      throw new Error("Static method «NwtSubmemoryEntity.saveDirectory» is not implemented in this current API");
    }
    
    static async ensureDirectory(dirpath) {
      trace("NwtSubmemoryEntity.async");
      await this.deleteDirectory(dirpath);
      await this.saveDirectory(dirpath, directoryStructure);
    }

    static async deleteDirectory(dirpath) {
      trace("NwtSubmemoryEntity.async");
      await require("fs-extra").promises.rmdir(dirpath, {
        recursive: true
      });
    }

    static readFile(filepath) {
      trace("NwtSubmemoryEntity.readFile");
      return NwtFilesystem.readFile(filepath);
    }
    
    static existsFile(filepath) {
      trace("NwtSubmemoryEntity.existsFile");
      return NwtFilesystem.existsAsFile(filepath);
    }
    
    static async fillFile(filepath, content) {
      trace("NwtSubmemoryEntity.async");
      return await NwtFilesystem.ensureFile(filepath, content);
    }
    
    static async saveFile(filepath, content) {
      trace("NwtSubmemoryEntity.saveFile");
      await NwtFilesystem.ensureFile(filepath, content);
      await NwtFilesystem.writeFile(filepath, content);
    }
    
    static ensureFile(filepath, content) {
      trace("NwtSubmemoryEntity.ensureFile");
      return NwtFilesystem.ensureFile(filepath, content);
    }

    static async deleteFile(filepath) {
      trace("NwtSubmemoryEntity.async");
      await NwtFilesystem.deleteFile(filepath);
    }

    static readJson(filepath) {
      trace("NwtSubmemoryEntity.readJson");
      return NwtFilesystem.readJson(filepath);
    }
    
    static existsJson(filepath) {
      trace("NwtSubmemoryEntity.existsJson");
      return NwtFilesystem.existsAsJson(filepath);
    }
    
    static async fillJson(filepath, content) {
      trace("NwtSubmemoryEntity.async");
      const exists = await this.existsJson(filepath);
      if(!exists) {
        return await NwtFilesystem.ensureJson(filepath, content);
      }
    }
    
    static saveJson(filepath, content) {
      trace("NwtSubmemoryEntity.saveJson");
      return NwtFilesystem.writeJson(filepath, content);
    }
    
    static ensureJson(filepath, content) {
      trace("NwtSubmemoryEntity.ensureJson");
      return NwtFilesystem.ensureJson(filepath, content);
    }

    static async deleteJson(filepath) {
      trace("NwtSubmemoryEntity.async");
      await NwtFilesystem.deleteJson(filepath);
    }

    static readProperty(filepath, propertypath) {
      trace("NwtSubmemoryEntity.readProperty");
      return NwtFilesystem.readProperty(filepath, propertypath);
    }
    
    static existsProperty(filepath, propertypath) {
      trace("NwtSubmemoryEntity.existsProperty");
      return NwtFilesystem.existsAsProperty(filepath, propertypath);
    }
    
    static async fillProperty(filepath, propertypath, content) {
      trace("NwtSubmemoryEntity.async");
      const exists = await this.existsProperty(filepath, propertypath);
      if(!exists) {
        return await NwtFilesystem.ensureProperty(filepath, propertypath, content);
      }
    }
    
    static saveProperty(filepath, propertypath, content) {
      trace("NwtSubmemoryEntity.saveProperty");
      return NwtFilesystem.ensureProperty(filepath, propertypath, content);
    }
    
    static ensureProperty(filepath, propertypath, content) {
      trace("NwtSubmemoryEntity.ensureProperty");
      return NwtFilesystem.ensureProperty(filepath, propertypath, content);
    }

    static async deleteProperty(filepath, propertypath) {
      trace("NwtSubmemoryEntity.async");
      return NwtFilesystem.deleteProperty(filepath, propertypath);
    }

  };

  const NwtSubmemoryTree = class extends NwtSubmemoryEntity {

    constructor(basedir, ...args) {
      super(basedir, ...args);
      trace("NwtSubmemoryTree.constructor");
    }

    read() {
      trace("NwtSubmemoryTree.prototype.read");
      return this.constructor.readDirectory(this.basedir);
    }

    exists() {
      trace("NwtSubmemoryTree.prototype.exists");
      return this.constructor.existsDirectory(this.basedir);
    }

    equals() {
      trace("NwtSubmemoryTree.prototype.equals");
      throw new Error("NwtSubmemoryTree does not implement «equals»");
    }

    fill(directoryStructure) {
      trace("NwtSubmemoryTree.prototype.fill");
      return this.constructor.fillDirectory(this.basedir, directoryStructure);
    }

    save(directoryStructure) {
      trace("NwtSubmemoryTree.prototype.save");
      return this.constructor.saveDirectory(this.basedir, directoryStructure);
    }

    async reset(directoryStructure) {
      trace("NwtSubmemoryTree.prototype.reset");
      return this.constructor.resetDirectory(this.basedir, directoryStructure);
    }

    delete() {
      trace("NwtSubmemoryTree.prototype.delete");
      return this.constructor.deleteDirectory(this.basedir);
    }
    
  };

  const NwtSubmemoryBranch = class extends NwtSubmemoryEntity {

    constructor(...args) {
      super(...args);
      trace("NwtSubmemoryBranch.constructor");
    }

    read(subpath = []) {
      trace("NwtSubmemoryBranch.prototype.read");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.readTree(fullpath);
    }

    exists(subpath = []) {
      trace("NwtSubmemoryBranch.prototype.exists");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.existsAsDirectory(fullpath);
    }

    equals(comparer) {
      trace("NwtSubmemoryBranch.prototype.equals");
      const fullpath = this.normalizeSubpath(subpath);
      return this.constructor.equalsDirectory(fullpath, comparer);
    }

    async fill(subpath, directoryStructure = {}) {
      trace("NwtSubmemoryBranch.prototype.fill");
      const fullpath = this.normalizeSubpath(subpath);
      await this.constructor.fillDirectory(fullpath, directoryStructure);
    }

    save(subpath, directoryStructure = {}) {
      trace("NwtSubmemoryBranch.prototype.save");
      const fullpath = this.normalizeSubpath(subpath);
      return this.constructor.saveDirectory(fullpath, directoryStructure);
    }

    async reset(subpath, directoryStructure = {}) {
      trace("NwtSubmemoryBranch.prototype.reset");
      const fullpath = this.normalizeSubpath(subpath);
      return this.constructor.resetDirectory(fullpath, directoryStructure);
    }

    delete(subpath) {
      const fullpath = this.normalizeSubpath(subpath);
      return this.constructor.deleteDirectory(fullpath);
    }

  };

  const NwtSubmemoryFile = class extends NwtSubmemoryEntity {

    constructor(...args) {
      super(...args);
      trace("NwtSubmemoryFile.constructor");
    }

    read(subpath) {
      trace("NwtSubmemoryFile.prototype.read");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.readFile(fullpath);
    }

    exists(subpath) {
      trace("NwtSubmemoryFile.prototype.exists");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.existsAsFile(fullpath);
    }

    async equals(subpath, text) {
      trace("NwtSubmemoryFile.prototype.equals");
      const fullpath = this.normalizeSubpath(subpath);
      try {
        const content = await NwtFilesystem.readFile(fullpath);
        return content === text;
      } catch (error) {
        return false;
      }
    }

    async fill(subpath, text) {
      trace("NwtSubmemoryFile.prototype.fill");
      const fullpath = this.normalizeSubpath(subpath);
      const exists = await NwtFilesystem.existsAsFile(fullpath);
      if(!exists) {
        await NwtFilesystem.writeFile(fullpath, text);
      }
    }

    async save(subpath, text) {
      trace("NwtSubmemoryFile.prototype.save");
      const fullpath = this.normalizeSubpath(subpath);
      await NwtFilesystem.ensureFile(fullpath, text);
      await NwtFilesystem.writeFile(fullpath, text);
    }

    async reset(subpath, text) {
      trace("NwtSubmemoryFile.prototype.reset");
      const fullpath = this.normalizeSubpath(subpath);
      await NwtFilesystem.deleteFile(fullpath);
      await NwtFilesystem.ensureFile(fullpath, text);
    }

    async delete(subpath) {
      trace("NwtSubmemoryFile.prototype.delete");
      const fullpath = this.normalizeSubpath(this.basedir, subpath);
      await NwtFilesystem.rmdir(fullpath);
    }

  };

  const NwtSubmemoryJson = class extends NwtSubmemoryEntity {

    constructor(...args) {
      super(...args);
      trace("NwtSubmemoryJson.constructor");
    }

    read(subpath) {
      trace("NwtSubmemoryFile.prototype.read");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.readJson(fullpath);
    }

    exists(subpath) {
      trace("NwtSubmemoryFile.prototype.exists");
      const fullpath = this.normalizeSubpath(subpath);
      return NwtFilesystem.existsAsFile(fullpath);
    }

    async equals(subpath, value) {
      trace("NwtSubmemoryFile.prototype.equals");
      const fullpath = this.normalizeSubpath(subpath);
      try {
        const content = await NwtFilesystem.readJson(fullpath);
        return content === value;
      } catch (error) {
        return false;
      }
    }

    async fill(subpath, value) {
      trace("NwtSubmemoryFile.prototype.fill");
      const fullpath = this.normalizeSubpath(subpath);
      const exists = await NwtFilesystem.existsAsFile(fullpath);
      if(!exists) {
        await NwtFilesystem.writeJson(fullpath, value);
      }
    }

    async save(subpath, value) {
      trace("NwtSubmemoryFile.prototype.save");
      const fullpath = this.normalizeSubpath(subpath);
      await NwtFilesystem.ensureJson(fullpath, value);
      await NwtFilesystem.writeJson(fullpath, value);
    }

    async reset(subpath, text) {
      trace("NwtSubmemoryFile.prototype.reset");
      const fullpath = this.normalizeSubpath(subpath);
      await NwtFilesystem.deleteJson(fullpath);
      await NwtFilesystem.ensureJson(fullpath, text);
    }

    async delete(subpath) {
      trace("NwtSubmemoryFile.prototype.delete");
      const fullpath = this.normalizeSubpath(this.basedir, subpath);
      await NwtFilesystem.deleteJson(fullpath);
    }

  };

  const NwtSubmemoryProperty = class extends NwtSubmemoryEntity {

    constructor(...args) {
      super(...args);
      trace("NwtSubmemoryProperty.constructor");
    }

    read(subpath, propertypath, defaultValue = undefined) {
      
    }

    exists(subpath, propertypath) {
      
    }

    equals(subpath, propertypath, value) {
      
    }

    fill(subpath, propertypath, propertymap) {
      
    }

    save(subpath, propertypath, propertymap) {
      
    }

    async reset(subpath, propertypath, value) {
      
    }

    async delete(subpath, propertypath) {
      
    }

  };

  const NwtSubmemoryUid = class extends NwtSubmemoryEntity {

    constructor(...args) {
      super(...args);
      trace("NwtSubmemoryUid.constructor");
      const [basedir, resourceId] = args;
      this.resourceId = resourceId;
    }

    listUids() {
      trace("NwtSubmemoryUid.prototype.listUids");
      // @ESTO AHORA NO
    }

    removeUid(resourceId) {
      trace("NwtSubmemoryUid.prototype.removeUid");
      // @ESTO AHORA NO
    }

    getUid(resourceId) {
      trace("NwtSubmemoryUid.prototype.getUid");
      // @ESTO AHORA NO
    }

    addUid(resourceId) {
      trace("NwtSubmemoryUid.prototype.addUid");
      // @ESTO AHORA NO
    }

  };

  const NwtSubmemory_StaticUtilities = class {

    static create(...args) {
      return new this(...args);
    }

    static Tree = NwtSubmemoryTree;

    static Branch = NwtSubmemoryBranch;

    static File = NwtSubmemoryFile;

    static Json = NwtSubmemoryJson;
    
    static Property = NwtSubmemoryProperty;

    static Uid = NwtSubmemoryUid;

  };

  const NwtSubmemory_DynamicUtilities = class extends NwtSubmemory_StaticUtilities {

    resolve(...args) {
      const path = require("path");
      return path.resolve(this.basedir, ...args);
    }

    tree = this.constructor.Tree.create(this);

    branch = this.constructor.Branch.create(this);

    file = this.constructor.File.create(this);

    json = this.constructor.Json.create(this);

    property = this.constructor.Property.create(this);

  };

  const NwtSubmemory = class extends NwtSubmemory_DynamicUtilities {

    constructor(basedir) {
      super(basedir);
      trace("NwtSubmemory.constructor");
      this.basedir = basedir;
    }

    createUidFor(resourceId) {
      trace("NwtSubmemory.prototype.createUidFor");
      return this.constructor.Uid.create(this, resourceId);
    }

  };

  NwtSubmemory.local = {
    cache: NwtSubmemory.create("assets/app/procedures/cache")
  };

  //*/

  return NwtUtils.trify(() => NwtSubmemory, null);

});

Test_de_ejemplo: {

  break Test_de_ejemplo;

  (async function () {


    const memo = NwtSubmemory.create("assets/app/cache/for-procedures");
    await memo.tree.fill();
    await memo.branch.fill("manager/0", {
      // Esto es un directorio porque usamos "branch":
      "state.json": JSON.stringify({
        status: 200,
        demo: "branch",
      }),
    });
    await memo.file.fill("manager/0/state.json", JSON.stringify({
      // Esto es un JSON (u otro String) porque usamos "file":
      status: 200,
      demo: "file",
    }));
    await memo.json.fill("manager/0/state.json/#/property-one/property-two/property-three", {
      // Esto es un objeto JSONable (u otro JSONable) porque usamos "json":
      status: 200,
      demo: "file",
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: false,
        "some/hardcoded/subpath": {
          message: "no problem."
        }
      },
    });
    const currentTree = await memo.tree.find();
    const branch1 = await memo.branch.find("storage");
    const branch2 = await memo.branch.find("storage/0");
    const branch3 = await memo.branch.find("storage/1");
    const branch4 = await memo.branch.find("storage/2");
    const file1 = await memo.file.find("storage/0/state.json");
    const file2 = await memo.file.find("storage/1/state.json");
    const file3 = await memo.file.find("storage/2/state.json");
    const json1 = await memo.json.find("storage/0/state.json/#/");
    const json2 = await memo.json.find("storage/1/state.json/#/");
    const json3 = await memo.json.find("storage/2/state.json/#/");
    const property1 = await memo.property.find("storage/0/state.property/#/status");
    const property2 = await memo.property.find("storage/1/state.property/#/status/metadata/createdAt");
    const property3 = await memo.property.find("storage/2/state.property/#/status/metadata/some\\/hardcoded\\/subpath/message");

  })();

}
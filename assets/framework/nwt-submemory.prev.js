/**
 * 
 * # Nwt Submemory API
 * 
 * API de submemoria basada en ficheros o localStorage.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtSubmemory
 * NwtFramework.Submemory
 * Vue.prototype.$nwt.Submemory
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas así:
 * 
 * ```js
 * nwtSubmemory = NwtSubmemory.create(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, value:Object);
 * await nwtSubmemory.initializeCache();
 * await nwtSubmemory.listCache();
 * await nwtSubmemory.clearUnusedCache();
 * await nwtSubmemory.resetCache();
 * await nwtSubmemory.getResourceRealId(ids:Array<String>);
 * await nwtSubmemory.accessFrom(data:any, property:Array<String>, force:Boolean, value:any);
 * await nwtSubmemory.setFrom(data:any, property:Array<String>, force:Boolean, value:any);
 * await nwtSubmemory.find(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>);
 * await nwtSubmemory.find(ids:Array<String>, branch:Array<String>, state:Array<String>);
 * await nwtSubmemory.find(ids:Array<String>, branch:Array<String>);
 * await nwtSubmemory.find(ids:Array<String>);
 * await nwtSubmemory.initialize(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, value:any);
 * await nwtSubmemory.initialize(ids:Array<String>, branch:Array<String>, state:Array<String>);
 * await nwtSubmemory.initialize(ids:Array<String>, branch:Array<String>);
 * await nwtSubmemory.initialize(ids:Array<String>);
 * await nwtSubmemory.reset(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, value:any);
 * await nwtSubmemory.reset(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>);
 * await nwtSubmemory.reset(ids:Array<String>, branch:Array<String>, state:Array<String>);
 * await nwtSubmemory.reset(ids:Array<String>, branch:Array<String>);
 * await nwtSubmemory.reset(ids:Array<String>);
 * await nwtSubmemory.delete(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>);
 * await nwtSubmemory.delete(ids:Array<String>, branch:Array<String>, state:Array<String>);
 * await nwtSubmemory.delete(ids:Array<String>, branch:Array<String>);
 * await nwtSubmemory.delete(ids:Array<String>);
 * await nwtSubmemory.modify(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, modifier:Function);
 * await nwtSubmemory.fill(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, value:Object);
 * await nwtSubmemory.override(ids:Array<String>, branch:Array<String>, state:Array<String>, property:Array<String>, value:Object);
 * ```
 * 
 * 
 */
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

  const NwtSubmemory = class {

    static create(...args) {
      return new this(...args);
    }

    static async initializeCache(basedir) {
      trace("NwtSubmemory.initializeCache");
      const path = require("path");
      const subpath = path.resolve(basedir, "submemory-ids.json");
      await NwtFilesystem.initializeFile(subpath, "[]");
    }

    static async listCache(basedir) {
      trace("NwtSubmemory.listCache");
      const path = require("path");
      try {
        const filepath = await path.resolve(basedir, "submemory-ids.json");
        const filelist = await NwtFilesystem.readJson(filepath);
        return filelist.map(it => it.ids);
      } catch (error) {
        return [];
      }
    }

    static async resetCache(basedir) {
      trace("NwtSubmemory.resetCache");
      const path = require("path");
      try {
        const filepath = path.resolve(basedir, "submemory-ids.json");
        const idsData = await NwtFilesystem.readJson(filepath);
        const realIds = idsData.map(it => it.reference);
        for(let index=0; index<realIds.length; index++) {
          const realId = realIds[index];
          const realPath = path.resolve(basedir, realId);
          await NwtFilesystem.rmdir(realPath, { recursive: true, force: true });
        }
        return await NwtFilesystem.writeJson(filepath, []);
      } catch (error) {
        return [];
      }
    }

    static async clearUnusedCache(basedir) {
      trace("NwtSubmemory.clearUnusedCache");
      const path = require("path");
      await this.initializeCache(basedir);
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.clearUnusedCache»");
      const idsPath = path.resolve(basedir, "submemory-ids.json");
      const idsData = await NwtFilesystem.readJson(idsPath);
      const filelist = await NwtFilesystem.readdir(basedir);
      const realDirs = new Set(filelist.map(p => path.basename(p)));
      const filtered = idsData.filter(row => realDirs.has(row.reference));
      if (filtered.length !== idsData.length) {
        await NwtFilesystem.writeJson(idsPath, filtered, true);
      }
      return idsData.length - filtered.length;
    }

    static async getResourceRealId(basedir, ids) {
      trace("NwtSubmemory.getResourceRealId");
      const path = require("path");
      await this.initializeCache(basedir);
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.getResourceRealId»");
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.getResourceRealId»");
      const idsPath = path.resolve(basedir, "submemory-ids.json");
      const idsData = await NwtFilesystem.readJson(idsPath);
      let hasMatch = false;
      Iterating_rows:
      for (let indexRow = 0; indexRow < idsData.length; indexRow++) {
        const row = idsData[indexRow];
        const matchesRow = ids.length === row.ids.length;
        if (!matchesRow) {
          continue Iterating_rows;
        }
        Checking_ids: {
          for (let indexIds = 0; indexIds < ids.length; indexIds++) {
            const idInSelector = ids[indexIds];
            const idInRow = row.ids[indexIds];
            const matchesId = idInSelector === idInRow;
            if (!matchesId) {
              break Checking_ids;
            }
          }
          hasMatch = row.reference;
        }
      }
      if (hasMatch) {
        return hasMatch;
      }
      const reference = NwtRandomizer.fromAlphabet(10);
      idsData.push({
        ids: ids,
        reference: reference,
      });
      await NwtFilesystem.writeJson(idsPath, idsData, true);
      return reference;
    }

    static THROW_ERROR_FLAG = {};

    static accessFrom(data, propertyPath = [], force = false, value = undefined, errorValue = this.THROW_ERROR_FLAG) {
      let output = data;
      const lastIndex = propertyPath.length - 1;
      for (let index = 0; index < propertyPath.length; index++) {
        const propertyId = propertyPath[index];
        const isLast = index === lastIndex;
        const hasProperty = propertyId in output;
        if (!hasProperty) {
          if (force) {
            output[propertyId] = {};
          } else if (errorValue !== this.THROW_ERROR_FLAG) {
            return errorValue;
          } else {
            throw new Error(`Cannot access «${propertyPath.splice(0, index).join(".")}» because it has no «${propertyId}» on «NwtSubmemory.accessFrom»`);
          }
        }
        if (isLast) {
          if (typeof output[propertyId] === "undefined") {
            if (typeof value !== "undefined") {
              output[propertyId] = value;
            }
          }
        }
        output = output[propertyId];
      }
      return output;
    }

    static setFrom(data, propertyPath = [], value = undefined, force = true) {
      assertion(typeof data === "object" && data !== null, "Parameter «data» must be an object on «NwtSubmemory.setFrom»");
      assertion(Array.isArray(propertyPath), "Parameter «propertyPath» must be an array on «NwtSubmemory.setFrom»");
      assertion(typeof force === "boolean", "Parameter «force» must be a boolean on «NwtSubmemory.setFrom»");
      let target = data;
      for (let index = 0; index < propertyPath.length; index++) {
        const propertyId = propertyPath[index];
        const isLast = index === propertyPath.length - 1;
        const hasProperty = propertyId in target;
        if (isLast) {
          target[propertyId] = value;
          return;
        }
        if (!hasProperty) {
          if (force) {
            target[propertyId] = {};
          } else {
            throw new Error(`Cannot set «${propertyPath.slice(0, index + 1).join(".")}» on «NwtSubmemory.setFrom»`);
          }
        }
        target = target[propertyId];
        if (typeof target !== "object" || target === null) {
          if (force) {
            target = target[propertyId] = {};
          } else {
            throw new Error(`Cannot traverse non-object «${propertyPath.slice(0, index + 1).join(".")}» on «NwtSubmemory.setFrom»`);
          }
        }
      }
    }

    static async find(basedir, ids = false, branchPath = false, statePath = false, structurePath = false) {
      trace("NwtSubmemory.find");
      const path = require("path");
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.find»");
      if (ids === false) {
        return await NwtFilesystem.readTree(basedir);
      }
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.find»");
      if (branchPath === false) {
        return await NwtFilesystem.readTree(basedir);
      }
      assertion(Array.isArray(branchPath), "Parameter «branchPath» must be an array on «NwtSubmemory.find»");
      if (statePath === false) {
        const realId = await this.getResourceRealId(basedir, ids);
        const subdirpath = path.resolve(basedir, realId, branchPath.join("/"));
        return await NwtFilesystem.readTree(subdirpath);
      }
      assertion(Array.isArray(statePath), "Parameter «statePath» must be an array on «NwtSubmemory.find»");
      if (structurePath === false) {
        const realId = await this.getResourceRealId(basedir, ids);
        const filepath = path.resolve(basedir, realId, branchPath.join("/"), statePath.join("/"));
        return await NwtFilesystem.readFile(filepath);
      }
      assertion(Array.isArray(structurePath), "Parameter «structurePath» must be an array on «NwtSubmemory.find»");
      const realId = await this.getResourceRealId(basedir, ids);
      const filepath = path.resolve(basedir, realId, branchPath.join("/"), statePath.join("/"));
      const data = await NwtFilesystem.readJson(filepath);
      return this.accessFrom(data, structurePath, false);
    }

    static async initialize(basedir, ids = false, branchPath = false, statePath = false, structurePath = false, value = undefined) {
      trace("NwtSubmemory.initialize");
      const path = require("path");
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.initialize»");
      // 1. basedir
      let wasCreatedTree = false;
      if (!(await NwtFilesystem.existsAsDirectory(basedir))) {
        await NwtFilesystem.ensureDirectory(basedir);
        wasCreatedTree = true;
      }
      if (ids === false) {
        return wasCreatedTree;
      }
      // 2. ids → realId (subdirectorio)
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.initialize»");
      const realId = await this.getResourceRealId(basedir, ids);
      const resourceDir = path.resolve(basedir, realId);
      let wasCreatedId = false;
      if (!(await NwtFilesystem.existsAsDirectory(resourceDir))) {
        await NwtFilesystem.ensureDirectory(resourceDir);
        wasCreatedId = true;
      }
      if (branchPath === false) {
        return wasCreatedId;
      }
      // 3. branchPath → subdirectorios
      assertion(Array.isArray(branchPath), "Parameter «branchPath» must be an array on «NwtSubmemory.initialize»");
      let currentDir = resourceDir;
      let wasCreatedBranch = false;
      for (let i = 0; i < branchPath.length; i++) {
        currentDir = path.resolve(currentDir, branchPath[i]);
        if (!(await NwtFilesystem.existsAsDirectory(currentDir))) {
          wasCreatedBranch = true;
          await NwtFilesystem.ensureDirectory(currentDir);
        }
      }
      if (statePath === false) {
        return wasCreatedBranch;
      }
      // 4. statePath → fichero
      assertion(Array.isArray(statePath), "Parameter «statePath» must be an array on «NwtSubmemory.initialize»");
      const stateFile = path.resolve(currentDir, ...statePath);
      await NwtFilesystem.ensureFile(stateFile, "{}");
      if (structurePath === false) {
        return stateFile;
      }
      // 5. structurePath → propiedad JSON
      assertion(Array.isArray(structurePath), "Parameter «structurePath» must be an array on «NwtSubmemory.initialize»");
      const data = await NwtFilesystem.readJson(stateFile);
      const uuid = NwtRandomizer.fromAlphabet(10);
      const currentValue = this.accessFrom(data, structurePath, false, undefined, uuid);
      let finalValue = currentValue;
      if (currentValue === uuid) {
        finalValue = this.accessFrom(data, structurePath, true, value, undefined);
        await NwtFilesystem.writeJson(stateFile, data, true);
      }
      return finalValue;
    }

    static async reset(basedir, ids = false, branchPath = false, statePath = false, structurePath = false, value = undefined) {
      trace("NwtSubmemory.reset");
      const fs = require("fs");
      const path = require("path");
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.reset»");
      // 1. basedir completo
      if (ids === false) {
        await fs.promises.rm(basedir, { recursive: true, force: true });
        await fs.promises.mkdir(basedir, { recursive: true });
        await this.clearUnusedCache(basedir);
        return true;
      }
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.reset»");
      const realId = await this.getResourceRealId(basedir, ids);
      const resourceDir = path.resolve(basedir, realId);
      // 2. ids → subdirectorio
      if (branchPath === false) {
        await fs.promises.rm(resourceDir, { recursive: true, force: true });
        await fs.promises.mkdir(resourceDir, { recursive: true });
        await this.clearUnusedCache(basedir);
        return true;
      }
      assertion(Array.isArray(branchPath), "Parameter «branchPath» must be an array on «NwtSubmemory.reset»");
      const branchDir = path.resolve(resourceDir, ...branchPath);
      // 3. branchPath → rama de directorios
      if (statePath === false) {
        await fs.promises.rm(branchDir, { recursive: true, force: true });
        await fs.promises.mkdir(branchDir, { recursive: true });
        await this.clearUnusedCache(basedir);
        return true;
      }
      assertion(Array.isArray(statePath), "Parameter «statePath» must be an array on «NwtSubmemory.reset»");
      const stateFile = path.resolve(branchDir, ...statePath);
      // 4. statePath → fichero
      if (structurePath === false) {
        await fs.promises.rm(stateFile, { force: true });
        await fs.promises.mkdir(path.dirname(stateFile), { recursive: true });
        await fs.promises.writeFile(stateFile, "{}", "utf8");
        return true;
      }
      assertion(Array.isArray(structurePath), "Parameter «structurePath» must be an array on «NwtSubmemory.reset»");
      // 5. structurePath → propiedad JSON
      let data = {};
      try {
        data = await NwtFilesystem.readJson(stateFile);
      } catch (e) {
        data = {};
      }
      this.setFrom(data, structurePath, value, true);
      await NwtFilesystem.writeJson(stateFile, data, true);
      return true;
    }

    static async delete(basedir, ids = false, branchPath = false, statePath = false, structurePath = false) {
      trace("NwtSubmemory.delete");
      const fs = require("fs");
      const path = require("path");
      assertion(typeof basedir === "string", "Parameter «basedir» must be a string on «NwtSubmemory.delete»");
      // 1. basedir completo
      if (ids === true) {
        await fs.promises.rm(basedir, { recursive: true, force: true });
        return true;
      } else if (ids === false) {
        throw new Error("Parameter «ids» must be set to «true» in order to delete the whole submemory on «NwtSubmemory.delete»");
      }
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.delete»");
      const realId = await this.getResourceRealId(basedir, ids);
      const resourceDir = path.resolve(basedir, realId);
      // 2. ids → subdirectorio
      if (branchPath === false) {
        await fs.promises.rm(resourceDir, { recursive: true, force: true });
        await this.clearUnusedCache(basedir);
        return true;
      }
      assertion(Array.isArray(branchPath), "Parameter «branchPath» must be an array on «NwtSubmemory.delete»");
      const branchDir = path.resolve(resourceDir, ...branchPath);
      // 3. branchPath → rama de directorios
      if (statePath === false) {
        await fs.promises.rm(branchDir, { recursive: true, force: true });
        await this.clearUnusedCache(basedir);
        return true;
      }
      assertion(Array.isArray(statePath), "Parameter «statePath» must be an array on «NwtSubmemory.delete»");
      const stateFile = path.resolve(branchDir, ...statePath);
      // 4. statePath → fichero
      if (structurePath === false) {
        await fs.promises.unlink(stateFile).catch(() => { });
        return true;
      }
      assertion(Array.isArray(structurePath), "Parameter «structurePath» must be an array on «NwtSubmemory.delete»");
      // 5. structurePath → propiedad JSON
      let data;
      try {
        data = await NwtFilesystem.readJson(stateFile);
      } catch (e) {
        return true;
      }
      const lastKey = structurePath[structurePath.length - 1];
      const parentPath = structurePath.slice(0, -1);
      const parent = this.accessFrom(data, parentPath, false, undefined, undefined);
      if (parent && typeof parent === "object") {
        delete parent[lastKey];
        await NwtFilesystem.writeJson(stateFile, data, true);
      }
      return true;
    }

    static async modify(basedir, ids, branchPath, statePath, structurePath, modifier) {
      trace("NwtSubmemory.modify");
      const currentValue = await this.find(basedir, ids, branchPath, statePath, structurePath);
      const output = modifier(currentValue);
      return await this.reset(basedir, ids, branchPath, statePath, structurePath, output);
    }

    static async fill(basedir, ids, branchPath, statePath, structurePath, properties) {
      trace("NwtSubmemory.fill");
      assertion(typeof properties === "object" && properties !== null, "Parameter «properties» must be an object on «NwtSubmemory.fill»");
      await this.initialize(basedir, ids, branchPath, statePath, structurePath);
      return await this.modify(
        basedir,
        ids,
        branchPath,
        statePath,
        structurePath,
        (currentValue) => {
          let output;
          if (typeof currentValue === "object" && currentValue !== null) {
            output = { ...currentValue };
          } else {
            output = {};
          }
          for (const key of Object.keys(properties)) {
            if (typeof output[key] === "undefined") {
              output[key] = properties[key];
            }
          }
          return output;
        }
      );
    }

    static async override(basedir, ids, branchPath, statePath, structurePath, properties) {
      trace("NwtSubmemory.override");
      assertion(typeof basedir === "string", "Parameter «basedir» must be an array on «NwtSubmemory.override»");
      assertion(Array.isArray(ids), "Parameter «ids» must be an array on «NwtSubmemory.override»");
      assertion(Array.isArray(branchPath), "Parameter «branchPath» must be an array on «NwtSubmemory.override»");
      assertion(Array.isArray(statePath), "Parameter «statePath» must be an array on «NwtSubmemory.override»");
      assertion(typeof properties === "object", "Parameter «properties» must be an object on «NwtSubmemory.override»");
      await this.initialize(basedir, ids, branchPath, statePath, structurePath);
      return await this.modify(
        basedir,
        ids,
        branchPath,
        statePath,
        structurePath,
        (currentValue) => {
          let output;
          if (typeof currentValue === "object" && currentValue !== null) {
            output = { ...currentValue };
          } else {
            output = {};
          }
          for (const key of Object.keys(properties)) {
            output[key] = properties[key];
          }
          return output;
        }
      );
    }

    constructor(basedir) {
      this.basedir = basedir;
    }

    initializeCache() {
      return this.constructor.initializeCache(this.basedir);
    }

    listCache() {
      return this.constructor.listCache(this.basedir);
    }

    clearUnusedCache() {
      return this.constructor.clearUnusedCache(this.basedir);
    }

    resetCache() {
      return this.constructor.resetCache(this.basedir);
    }

    find(...args) {
      return this.constructor.find(this.basedir, ...args);
    }

    initialize(...args) {
      return this.constructor.initialize(this.basedir, ...args);
    }

    reset(...args) {
      return this.constructor.reset(this.basedir, ...args);
    }

    delete(...args) {
      return this.constructor.delete(this.basedir, ...args);
    }

    modify(...args) {
      return this.constructor.modify(this.basedir, ...args);
    }

    fill(...args) {
      return this.constructor.fill(this.basedir, ...args);
    }

    override(...args) {
      return this.constructor.override(this.basedir, ...args);
    }

  };

  NwtSubmemory.global = NwtSubmemory.create(`${NwtPaths.global.projectRoot}/assets/framework/nwt-submemory/global`);

  return NwtSubmemory;

});
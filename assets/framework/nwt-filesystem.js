/**
 * 
 * # NwtFilesystem
 * 
 * API para ficheros.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFilesystem
 * NwtFramework.Filesystem
 * Vue.prototype.$nwt.Filesystem
 * ```
 * 
 * ## Ventajas
 * 
 * A continuación se exponen todos los métodos y propiedades:
 * 
 * ```js
 * NwtFilesystem.fs = NwtEnvironment.isNode ? require("fs") : null;
 * NwtFilesystem.readFile(filepath, encoding = "utf8");
 * NwtFilesystem.writeFile(filepath, content, encoding = "utf8");
 * NwtFilesystem.appendFile(filepath, content, encoding = "utf8");
 * NwtFilesystem.lstat(filepath);
 * await NwtFilesystem.exists(filepath);
 * await NwtFilesystem.existsAsFile(filepath);
 * await NwtFilesystem.existsAsDirectory(dirpath);
 * await NwtFilesystem.ensureDirectory(dirpath);
 * await NwtFilesystem.readdir(dirpath, options = {});
 * await NwtFilesystem.readdirStats(dirpath, sortByType = false);
 * NwtFilesystem.rmdir(dirpath);
 * NwtFilesystem.mkdir(dirpath);
 * NwtFilesystem.unlink(filepath);
 * await NwtFilesystem.ensureFile(filepath, contents);
 * await NwtFilesystem.ensureJson(filepath, data);
 * await NwtFilesystem.existsProperty(filepath, propertypath, defaultValue = undefined);
 * await NwtFilesystem.ensureProperty(filepath, propertypath, value = undefined);
 * await NwtFilesystem.readProperty(filepath, propertypath, defaultValue = undefined);
 * await NwtFilesystem.writeProperty(filepath, propertypath, value = undefined);
 * NwtFilesystem.formatBytes(bytes);
 * NwtFilesystem.clearFileSeparatorOnExtremes(filepath);
 * await NwtFilesystem.createTemporaryDirectory(name = false);
 * await NwtFilesystem.clearTemporaryDirectories();
 * NwtFilesystem.selectByGlob(globPatterns, options = {});
 * await NwtFilesystem.initializeFile(filepath, content = "");
 * await NwtFilesystem.readJson(filepath);
 * await NwtFilesystem.writeJson(filepath, data, beautify = false);
 * await NwtFilesystem.readTree(dirPath, options = {});
 * NwtFilesystem.THROW_ERROR_FLAG = {};
 * NwtFilesystem.accessFrom(data, propertyPath = [], force = false, value = undefined, errorValue = this.THROW_ERROR_FLAG);
 * NwtFilesystem.setFrom(data, propertyPath = [], value = undefined, force = true);
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFilesystem'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFilesystem'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFilesystem = class {

    static fs = NwtBrowserPolyfill.require("fs");

    static readFile(filepath, encoding = "utf8") {
      trace("NwtFilesystem.readFile");
      return this.fs.promises.readFile(filepath, encoding);
    }

    static writeFile(filepath, content, encoding = "utf8") {
      trace("NwtFilesystem.writeFile");
      return this.fs.promises.writeFile(filepath, content, encoding);
    }

    static appendFile(filepath, content, encoding = "utf8") {
      trace("NwtFilesystem.appendFile");
      return this.fs.promises.appendFile(filepath, content, encoding);
    }

    static lstat(filepath) {
      trace("NwtFilesystem.lstat");
      return this.fs.promises.lstat(filepath);
    }

    static async exists(filepath) {
      trace("NwtFilesystem.exists");
      try {
        await this.fs.promises.access(filepath);
        return true;
      } catch {
        return false;
      }
    }

    static async existsAsFile(filepath) {
      trace("NwtFilesystem.existsAsFile");
      try {
        const stat = await this.fs.promises.lstat(filepath);
        return stat.isFile();
      } catch {
        return false;
      }
    }

    static async existsAsDirectory(dirpath) {
      trace("NwtFilesystem.existsAsDirectory");
      try {
        const stat = await this.fs.promises.lstat(dirpath);
        return stat.isDirectory();
      } catch {
        return false;
      }
    }

    static async ensureDirectory(dirpath) {
      trace("NwtFilesystem.ensureDirectory");
      await this.fs.promises.mkdir(dirpath, { recursive: true });
      return dirpath;
    }

    static async readdir(dirpath, options = {}) {
      trace("NwtFilesystem.readdir");
      const names = await this.fs.promises.readdir(dirpath);
      if (options.onlyName) {
        return names;
      }
      return names.map(name => {
        return require("path").resolve(dirpath, name);
      });
    }

    static async readdirStats(dirpath, sortByType = false) {
      trace("NwtFilesystem.readdirStats");
      const path = require("path");
      const nodes = await this.readdir(dirpath);
      const nodeStats = [];
      for (let indexNode = 0; indexNode < nodes.length; indexNode++) {
        const node = nodes[indexNode];
        const nodeStat = await this.lstat(node);
        nodeStats.push({
          name: path.basename(node),
          path: node,
          isSymbolicLink: nodeStat.isSymbolicLink(),
          isFile: nodeStat.isFile(),
          isDirectory: nodeStat.isDirectory(),
          size: nodeStat.size,
        });
      }
      if (sortByType) {
        nodeStats.sort((a, b) => {
          if (a.isDirectory && b.isDirectory) {
            if (a.path < b.path) {
              return -1;
            }
            if (a.path > b.path) {
              return 1;
            }
          }
          if (a.isDirectory) {
            return -1;
          }
          if (b.isDirectory) {
            return 1;
          }
          if (a.path < b.path) {
            return -1;
          }
          if (a.path > b.path) {
            return 1;
          }
          return 0;
        });
      }
      return nodeStats;
    }

    static rmdir(dirpath) {
      trace("NwtFilesystem.rmdir");
      return this.fs.promises.rm(dirpath, { recursive: true, force: true });
    }

    static mkdir(dirpath) {
      trace("NwtFilesystem.mkdir");
      return this.fs.promises.mkdir(dirpath);
    }

    static unlink(filepath) {
      trace("NwtFilesystem.unlink");
      return this.fs.promises.unlink(filepath);
    }

    static async ensureFile(filepath, contents) {
      trace("NwtFilesystem.ensureFile");
      const fs = require("fs-extra");
      const existed = await this.existsAsFile(filepath);
      if(existed) {
        return false;
      }
      await fs.ensureFile(filepath);
      await fs.writeFile(filepath, contents);
      return true;
    }

    static async ensureJson(filepath, data) {
      trace("NwtFilesystem.ensureJson");
      const fs = require("fs-extra");
      const existed = await this.existsAsFile(filepath);
      if(existed) {
        return false;
      }
      await fs.ensureFile(filepath);
      await this.writeJson(filepath, data);
      return true;
    }

    static async existsProperty(filepath, propertypath, defaultValue = undefined) {
      trace("NwtFilesystem.existsProperty");
      const existed = await this.existsAsFile(filepath);
      if(!existed) {
        return false;
      }
      const data = await this.readJson(filepath);
      const uidReference = {};
      const result = this.accessFrom(data, propertypath, uidReference);
      if(result === uidReference) {
        return false;
      }
      return true;
    }

    static async ensureProperty(filepath, propertypath, value = undefined) {
      trace("NwtFilesystem.existsProperty");
      const existed = await this.existsAsFile(filepath);
      if(!existed) {
        await this.ensureFile(filepath, "{}");
      }
      const data = await this.readJson(filepath);
      this.setFrom(data, propertypath, value);
      this.writeJson(filepath, data);
      return true;
    }

    static async readProperty(filepath, propertypath, defaultValue = undefined) {
      trace("NwtFilesystem.readProperty");
      const existed = await this.existsAsFile(filepath);
      if(!existed) {
        return defaultValue;
      }
      const data = await this.readJson(filepath);
      const result = this.accessFrom(data, propertypath, defaultValue);
      return result;
    }

    static async writeProperty(filepath, propertypath, value = undefined) {
      trace("NwtFilesystem.readProperty");
      const existed = await this.existsAsFile(filepath);
      if(!existed) {
        await this.ensureFile(filepath, "{}");
      }
      const data = await this.readJson(filepath);
      this.setFrom(data, propertypath, defaultValue);
      await this.writeJson(filepath, data);
      return result;
    }

    static formatBytes(bytes) {
      trace("NwtFilesystem.formatBytes");
      if (!Number.isFinite(bytes)) return "0 B";
      const units = ["B", "KB", "MB", "GB", "TB", "PB"];
      let i = 0;
      while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
      }
      return bytes.toFixed(bytes < 10 && i > 0 ? 2 : bytes < 100 ? 1 : 0) + " " + units[i];
    }

    static clearFileSeparatorOnExtremes(filepath) {
      trace("NwtFilesystem.clearFileSeparatorOnExtremes");
      let regex = false;
      if (NwtEnvironment.isLinux) {
        regex = /^\/|\/$/g;
      } else if (NwtEnvironment.isWindows) {
        regex = /^\\|\\$/g;
      }
      return filepath.replace(regex, "");
    }

    static async createTemporaryDirectory(name = false) {
      trace("NwtFilesystem.createTemporaryDirectory");
      const randomId = name || NwtRandomizer.fromAlphabet(10);
      const temporaryDirectoryPath = NwtPaths.global.relative(`assets/app/temporary/directory/${randomId}`);
      await this.ensureDirectory(temporaryDirectoryPath);
      return temporaryDirectoryPath;
    }

    static async clearTemporaryDirectories() {
      trace("NwtFilesystem.clearTemporaryDirectories");
      const temporaryDirectoryPath = NwtPaths.global.relative(`assets/app/temporary/directory/`);
      await this.rmdir(temporaryDirectoryPath);
    }

    static selectByGlob(globPatterns, options = {}) {
      trace("NwtFilesystem.selectByGlob");
      const fastGlob = require("fast-glob");
      return fastGlob(globPatterns, options);
    }

    static async initializeFile(filepath, content = "") {
      trace("NwtFilesystem.initializeFile");
      const exists = await this.existsAsFile(filepath);
      if (exists) {
        return false;
      }
      await this.ensureFile(filepath, content);
      return true;
    }

    static async readJson(filepath) {
      trace("NwtFilesystem.readJson");
      const content = await this.readFile(filepath);
      const json = JSON.parse(content);
      return json;
    }

    static async writeJson(filepath, data, beautify = false) {
      trace("NwtFilesystem.readJson");
      await this.writeFile(filepath, JSON.stringify(data, ...beautify ? [null, 2] : []));
    }

    static async readTree(dirPath, options = {}) {
      const fs = require("fs").promises;
      const path = require("path");
      const {
        encoding = "utf8",
        followSymlinks = false,
      } = options;
      const statFn = followSymlinks ? fs.stat : fs.lstat;
      const result = {};
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          result[entry.name] = await this.readTree(fullPath, options);
        }
        else if (entry.isFile()) {
          result[entry.name] = await fs.readFile(fullPath, encoding);
        }
        else if (entry.isSymbolicLink()) {
          const stats = await statFn(fullPath);
          if (stats.isDirectory()) {
            result[entry.name] = await this.readTree(fullPath, options);
          } else if (stats.isFile()) {
            result[entry.name] = await fs.readFile(fullPath, encoding);
          }
        }
      }
      return result;
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
            throw new Error(`Cannot access «${propertyPath.splice(0, index).join(".")}» because it has no «${propertyId}» on «NwtFilesystem.accessFrom»`);
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
      assertion(typeof data === "object" && data !== null, "Parameter «data» must be an object on «NwtFilesystem.setFrom»");
      assertion(Array.isArray(propertyPath), "Parameter «propertyPath» must be an array on «NwtFilesystem.setFrom»");
      assertion(typeof force === "boolean", "Parameter «force» must be a boolean on «NwtFilesystem.setFrom»");
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
            throw new Error(`Cannot set «${propertyPath.slice(0, index + 1).join(".")}» on «NwtFilesystem.setFrom»`);
          }
        }
        target = target[propertyId];
        if (typeof target !== "object" || target === null) {
          if (force) {
            target = target[propertyId] = {};
          } else {
            throw new Error(`Cannot traverse non-object «${propertyPath.slice(0, index + 1).join(".")}» on «NwtFilesystem.setFrom»`);
          }
        }
      }
    }

  };

  return NwtFilesystem;

});
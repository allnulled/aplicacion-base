/**
 * 
 * # NwtJsonlPersister
 * 
 * API para la persistencia de ficheros JSONL.
 * 
 * ## Exposición
 * 
 * ```js
 * await NwtJsonlPersister.select(file:String, filter:Function);
 * await NwtJsonlPersister.insert(file:String, value:Object);
 * await NwtJsonlPersister.update(file:String, filter:Function, value:Object);
 * await NwtJsonlPersister.delete(file:String, filter:Function);
 * ```
 * 
 * Dado que los ficheros JSONL son prácticamente una tabla (en términos SQL), los métodos son los de una tabla también.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtJsonlPersister'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtJsonlPersister'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtJsonlPersister = class {

    static noop = () => { };

    static get assertion() {
      return typeof assertion === "function" ? assertion : (condition, errorMessage) => {
        if (!condition) {
          throw new Error(errorMessage);
        }
      };
    }

    static get trace() {
      return typeof trace === "function" ? trace : (traceMessage) => {
        console.log("[trace][local] " + traceMessage);
      };
    }

    static uidAlphabet = "abcdefghijklmnopqrstuvwxyz";

    static generateUid() {
      this.trace("NwtJsonlPersister.generateUid");
      let uid = "";
      for (let i = 0; i < 10; i++) {
        uid += this.uidAlphabet[Math.floor(Math.random() * this.uidAlphabet.length)];
      }
      return uid;
    }

    static init = {
      file: (file) => {
        this.trace("NwtJsonlPersister.init.file");
        return NwtFilePersister.init(file, "");
      }
    };

    static async select(file, filter = () => true) {
      this.trace("NwtJsonlPersister.select");
      const fs = require("fs");
      const readline = require("readline");
      const dataset = [];
      const rl = readline.createInterface({
        input: fs.createReadStream(file, { encoding: "utf8" }),
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        if (!line.trim()) continue;
        const obj = JSON.parse(line);
        if (filter(obj)) {
          dataset.push(obj);
        }
      }
      return dataset;
    }

    static async insert(file, value) {
      this.trace("NwtJsonlPersister.insert");
      const fs = require("fs");
      this.assertion(typeof value === "object" && value !== null, "Inserted value must be an object");
      const uid = this.generateUid();
      const record = Object.assign({}, value, { uid });
      const line = JSON.stringify(record) + "\n";
      await fs.promises.appendFile(file, line, "utf8");
      return uid;
    }

    static async update(file, filter, value) {
      this.trace("NwtJsonlPersister.update");
      const fs = require("fs");
      const readline = require("readline");
      const path = require("path");
      this.assertion(typeof filter === "function", "Update requires a filter function");
      this.assertion(typeof value === "object" && value !== null, "Update value must be an object");
      const tmpFile = file + ".tmp";
      const updatedUids = [];
      const readStream = fs.createReadStream(file, { encoding: "utf8" });
      const writeStream = fs.createWriteStream(tmpFile, { encoding: "utf8" });
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        if (!line.trim()) continue;
        const obj = JSON.parse(line);
        if (filter(obj)) {
          const updated = Object.assign({}, obj, value);
          updatedUids.push(updated.uid);
          writeStream.write(JSON.stringify(updated) + "\n");
        } else {
          writeStream.write(line + "\n");
        }
      }
      await new Promise(resolve => writeStream.end(resolve));
      await fs.promises.rename(tmpFile, file);
      return updatedUids;
    }

    static async delete(file, filter) {
      this.trace("NwtJsonlPersister.delete");
      const fs = require("fs");
      const readline = require("readline");
      this.assertion(typeof filter === "function", "Argument «filter» must be a function on «NwtJsonlPersister.delete»");
      const tmpFile = file + ".tmp";
      const deletedUids = [];
      const readStream = fs.createReadStream(file, { encoding: "utf8" });
      const writeStream = fs.createWriteStream(tmpFile, { encoding: "utf8" });
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        if (!line.trim()) continue;
        const obj = JSON.parse(line);
        if (filter(obj)) {
          if (obj.uid) deletedUids.push(obj.uid);
          continue;
        }
        writeStream.write(line + "\n");
      }
      await new Promise(resolve => writeStream.end(resolve));
      await fs.promises.rename(tmpFile, file);
      return deletedUids;
    }

  };

  return NwtJsonlPersister;

});
/**
 * 
 * # Nwt Shell API
 * 
 * API para instanciar una consola contextualizada.
 * 
 * ## Exposición
 * 
 * La API está expuesta a través de:
 * 
 * ```js
 * NwtShell
 * NwtFramework.Shell
 * Vue.prototype.$nwt.Shell
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```js
 * const shell = NwtShell.create("/path/to/directory");
 * await shell.exec("explorer ."); // Ejecutar comandos asíncronamente
 * await shell.ls();               // Listar directorios
 * shell.cd("..");                 // Cambiar de directorio
 * shell.subprocess("comando", argumentos=["--flag"], opciones={cwd:...}); // returns una Promise (por si se quiere usar con await directamente) de la que cuelga una propiedad extra: «subprocess»
 * shell.terminate(); // envía signal de terminado a todos los procesos hijo (de this._children)
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtShell'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtShell'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtShell = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultExecOptions = {
      stdio: "inherit",
      shell: true,
    };

    static defaultSpawnOptions = {
      stdio: "inherit",
      shell: true,
    };

    constructor(dirpath = false) {
      this.cwd = require("path").resolve(dirpath || process.cwd());
      this._children = new Set();
    }

    async exec(command, userOptions = {}) {
      const { exec } = require("child_process");
      const { promisify } = require("util");
      const execAsync = promisify(exec);
      const options = Object.assign({}, this.constructor.defaultExecOptions, {
        cwd: this.cwd || process.cwd()
      }, userOptions);
      NwtToasts.show({
        title: "Ejecutando comando de consola",
        text: command,
        timeout: 5000,
      });
      const subprocess = await execAsync(command, options);
      return subprocess;
    }

    cd(...subpaths) {
      const path = require("path");
      this.cwd = path.resolve(this.cwd, ...subpaths);
      return this;
    }

    async ls() {
      const fs = require("fs");
      const path = require("path");
      const files = await fs.promises.readdir(this.cwd);
      return files.map(file => path.resolve(this.cwd, file));
    }

    subprocess(command, args = [], userOptions = {}) {
      const options = Object.assign({}, {
        cwd: this.cwd || process.cwd(),
        shell: true,
        stdio: ["ignore", "pipe", "pipe"],
      }, userOptions);
      const { spawn } = require("child_process");
      const child = spawn(command, args, options);
      this._children.add(child);
      let out = "";
      let err = "";
      if (child.stdout) {
        child.stdout.on("data", chunk => {
          const s = chunk.toString();
          out += s;
          process.stdout.write(s);
          if (NwtEnvironment.hasWindow) console.log(s);
        });
      }
      if (child.stderr) {
        child.stderr.on("data", chunk => {
          const s = chunk.toString();
          err += s;
          process.stderr.write(s);
          if (NwtEnvironment.hasWindow) console.error(s);
        });
      }
      child.on("exit", () => this._children.delete(child));
      const promise = new Promise((resolve, reject) => {
        child.on("error", reject); // solo spawn errors
        child.on("close", (code, signal) => {
          if (code !== 0) {
            const e = new Error("Command failed");
            e.code = code;
            e.signal = signal;
            e.stdout = out;
            e.stderr = err;
            return reject(e);
          }
          return resolve({
            subprocess: child,
            code,
            signal,
            output: out,
            error: err,
          });
        });
      });
      return Object.assign(promise, { subprocess: child });
    }


    subprocessManual(command, args = [], userOptions = {}) {
      const options = Object.assign({}, this.constructor.defaultSpawnOptions, {
        cwd: this.cwd || process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
      }, userOptions);
      const child = require("child_process").spawn(command, args, options);
      this._children.add(child);
      child.accumulatedOutput = "";
      child.accumulatedError = "";
      const handleOutput = chunk => {
        const s = chunk.toString();
        child.accumulatedOutput += s;
        process.stdout.write(s);
        if (NwtEnvironment.hasWindow) {
          console.log(s);
        }
      };
      const handleError = chunk => {
        const s = chunk.toString();
        child.accumulatedError += s;
        process.stderr.write(s);
        if (NwtEnvironment.hasWindow) {
          console.error(s);
        }
      };
      if (child.stdout) {
        child.stdout.on("data", handleOutput);
      }
      if (child.stderr) {
        child.stderr.on("data", handleError);
      }
      child.on("exit", () => this._children.delete(child));
      const promise = new Promise((resolve, reject) => {
        child.on("exit", (code, signal) => {
          if (code !== 0) {
            return reject(new Error(child.accumulatedOutput + "\n\n\n\nERROR: " + child.accumulatedError));
          }
          return resolve({
            subprocess,
            code,
            signal,
            output: child.accumulatedOutput,
            error: child.accumulatedError
          });
        });
        child.on("error", reject);
      });
      return Object.assign(promise, { subprocess: child });
    }

    terminate(signal = "SIGTERM") {
      for (const child of this._children) {
        try {
          process.kill(-child.pid, signal);
        } catch (error) {
          console.error(error);
        }
      }
      this._children.clear();
    }

  };

  return NwtShell;

});
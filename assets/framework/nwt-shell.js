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
    };

    constructor(dirpath = false) {
      this.cwd = dirpath || process.cwd();
    }

    async exec(command, userOptions = {}) {
      const { exec } = require("child_process");
      const { promisify } = require("util");
      const execAsync = promisify(exec);
      const options = Object.assign({}, this.constructor.defaultExecOptions, { cwd: this.cwd || process.cwd() }, userOptions);
      NwtToasts.show({
        title: "Ejecutando comando de consola",
        text: command,
        timeout: 5000,
      });
      const { stdout, stderr } = await execAsync(command, options);
      return {
        output: stdout,
        error: stderr
      };
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

  };

  return NwtShell;

});
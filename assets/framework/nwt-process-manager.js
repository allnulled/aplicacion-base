/**
 * 
 * # NwtProcessManager
 * 
 * API para la gestión de procesos internos de la aplicación.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtProcessManager
 * NwtFramework.ProcessManager
 * Vue.prototype.$nwt.ProcessManager
 * NwtProcessManager.dialogs // instancia
 * NwtProcessManager.boxes // instancia
 * ```
 * 
 * ## Ventajas
 * 
 * Esta API permite crear subprocesos dependientes de procesos padre, y todos gestionados por 1 mismo `ProcessManager`.
 * 
 * ```js
 * const dialogProcess = NwtProcessManager.dialogs.createProcess();
 * const dialogSubprocess1 = dialogProcess.createSubprocess();
 * const dialogSubprocess2 = dialogProcess.createSubprocess();
 * const dialogSubprocess3 = dialogProcess.createSubprocess();
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProcessManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProcessManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtProcessManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(id) {
      assertion(typeof id === "string", "Parameter «id» must be a string on «NwtProcessManager.constructor»");
      this.$id = id;
      this.$list = [];
    }

    createProcess(expander = {}) {
      return NwtProcess.create({
        manager: this,
        parent: null,
        ...expander
      });
    }

  };

  NwtProcessManager.dialogs = NwtProcessManager.create("dialogs");
  NwtProcessManager.boxes = NwtProcessManager.create("boxes");

  return NwtProcessManager;

});
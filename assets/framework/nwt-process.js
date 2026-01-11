/**
 * 
 * # Nwt Process API
 * 
 * Permite representar procesos.
 * 
 * Un proceso puede:
 * 
 *  - Guardar hijos con `$children`
 *  - Vincularse con un padre con `$parent`
 *  - Vincularse con un `ProcessManager` con `$manager`
 *  - Recordar cuándo se creó con `$createdAt`
 *  - Recordar cuándo se cerró con `$closedAt`
 *  - Ocultarse con `hide()`
 *  - Mostrarse con `show()`
 *  - Crear un subproceso con `createSubprocess(...)`
 *  - Cerrarse con `close()`
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtProcess
 * NwtFramework.Process
 * Vue.prototype.$nwt.Process
 * ```
 * 
 * ## Permite cosas como
 * 
 * ```js
 * const pr = NwtProcess.create({
 *   manager: NwtProcessManager.dialogs,
 *   parent: NwtProcessManager.dialogs.$list[0],
 * });
 * const pr2 = pr.createSubprocess({
 *   extraParams: {},
 * });
 * pr.hide();
 * pr.show();
 * pr.close();
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProcess'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProcess'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtProcess = class {

    static create(...args) {
      trace("NwtProcess.create");
      return new this(...args);
    }

    constructor(options = {}) {
      trace("NwtProcess.constructor");
      this.$id = (options.id || "Sin título") + " - " + NwtRandomizer.fromAlphabet(10);
      this.$manager = options.manager || null;
      delete options.manager;
      this.$parent = options.parent || null;
      delete options.parent;
      this.$children = [];
      this.$createdAt = new Date();
      this.$closedAt = null;
      this.$isHidden = false;
      Object.assign(this, options);
      this._addToProcessManager();
      this._addToParentProcess();
    }

    close() {
      trace("NwtProcess.prototype.close");
      if (this.$closedAt) return; // Ya cerrado, sin repetir
      // 1. Cerrar hijos primero
      for (const child of [...this.$children]) {
        child.close();
      }
      this.$children.length = 0;
      // 2. Quitarse del padre
      if (this.$parent) {
        const arr = this.$parent.$children;
        const i = arr.indexOf(this);
        if (i !== -1) arr.splice(i, 1);
      }
      // 3. Quitarse del manager
      if (this.$manager) {
        const arr = this.$manager.$list;
        const i = arr.indexOf(this);
        if (i !== -1) arr.splice(i, 1);
      }
      // 4. Marcar como cerrado:
      this.$closedAt = new Date();
    }

    _addToProcessManager() {
      trace("NwtProcess.prototype._addToProcessManager");
      this.$manager.$list.push(this);
    }

    _addToParentProcess() {
      trace("NwtProcess.prototype._addToParentProcess");
      if (this.$parent) {
        this.$parent.$children.push(this);
      }
    }

    expand(obj) {
      trace("NwtProcess.prototype.expand");
      return Object.assign(this, obj);
    }

    createSubprocess(obj = {}) {
      trace("NwtProcess.prototype.createSubprocess");
      return new this({
        ...obj,
        manager: this.$manager,
        parent: this,
      });
    }

    hide() {
      trace("NwtProcess.prototype.hide");
      this.$isHidden = true;
    }

    show() {
      trace("NwtProcess.prototype.show");
      this.$isHidden = false;
    }

  };

  return NwtProcess;

});
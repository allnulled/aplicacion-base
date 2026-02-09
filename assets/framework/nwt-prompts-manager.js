/**
 * 
 * # Nwt Prompt Manager API
 * 
 * API para gestionar los prompts.
 * 
 * ## Exposición
 * 
 * La API se expone a través de:
 * 
 * ```js
 * NwtPromptsManager
 * NwtFramework.PromptsManager
 * Vue.prototype.$nwt.PromptsManager
 * // instancias:
 * NwtPromptsManager.global 
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```js
 * NwtPromptsManager.global.resolve(...subpaths=[String,...])
 * await NwtPromptsManager.global.list(); // Busca todos los "** /PROMPT.MD"
 * await NwtPromptsManager.global.save(path:String,prompt:String); // guarda un "/PROMPT.md" en la ruta especificada
 * await NwtPromptsManager.global.pickPrompt(); // abre un <nwt-prompts-manager-viewer> en un diálogo que permite escoger un prompt ya existente
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtPromptsManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtPromptsManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtPromptsManager = class {

    static create(...args) {
      trace("NwtPromptsManager.create");
      return new this(...args);
    }

    constructor(managerPath = false) {
      trace("NwtPromptsManager.constructor");
      this.$basedir = managerPath || NwtPaths.global.registeredPrompts;
    }

    resolve(...subpaths) {
      trace("NwtPromptsManager.prototype.resolve");
      const path = require("path");
      return path.resolve(this.$basedir, ...subpaths);
    }

    async list() {
      trace("NwtPromptsManager.prototype.list");
      const fs = require("fs");
      const path = require("path");
      const fastGlob = require("fast-glob");
      const promptsGlob = path.resolve(this.$basedir, "**/PROMPT.md");
      const promptsFull = await fastGlob(promptsGlob);
      return promptsFull.sort().map(fullpath => {
        return NwtFilesystem.clearFileSeparatorOnExtremes(fullpath.replace(this.$basedir, "").replace(/PROMPT.md$/g, ""));
      });
    }

    async save(promptPath, promptContent) {
      trace("NwtPromptsManager.prototype.save");
      const path = require("path");
      const fs = require("fs-extra");
      const promptFullpath = this.resolve(promptPath, "PROMPT.md");
      await fs.ensureFile(promptFullpath);
      await fs.promises.writeFile(promptFullpath, promptContent);
    }

    async pickPrompt() {
      trace("NwtPromptsManager.prototype.pickPrompt");
      return NwtDialogs.open({
        title: "Elegir un prompt",
        template: `<nwt-prompts-manager-viewer :chooser="true" :dialog="this" />`
      });
    }

  };

  NwtPromptsManager.global = NwtPromptsManager.create();

  return NwtPromptsManager;

});
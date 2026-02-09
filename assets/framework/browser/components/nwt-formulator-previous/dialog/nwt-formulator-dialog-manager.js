(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorDialogManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorDialogManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorDialogManager = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultBasedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/dialog/for");

    constructor(formulator, basedir = this.constructor.defaultBasedir) {
      this.formulator = formulator;
      this.basedir = basedir;
    }

    for(dialogId) {
      assertion(typeof dialogId === "string", "Parameter «dialogId» must be string on «NwtFormulatorComponentManager.prototype.for»");
      const dialogComponentPath = `${this.basedir}/${dialogId}/component`;
      const dialogHtmlPath = `${dialogComponentPath}.html`;
      const dialogCssPath = `${dialogComponentPath}.css`;
      const dialogJsPath = `${dialogComponentPath}.js`;
      return NwtFormulatorLazyDialog({
        component: dialogPath,
        html: dialogHtmlPath,
        css: dialogCssPath,
        js: dialogJsPath,
      });
    }

  };

  return NwtFormulatorDialogManager;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorControlManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorControlManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorControlManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(formulator, basedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/component/for")) {
      this.formulator = formulator;
      this.basedir = basedir;
    }

    for(componentId) {
      assertion(typeof componentId === "string", "Parameter «componentId» must be string on «NwtFormulatorControlManager.prototype.for»");
      const componentPath = `${this.basedir}/${componentId}/component`;
      const componentHtmlPath = `${componentPath}.html`;
      const componentCssPath = `${componentPath}.css`;
      const componentJsPath = `${componentPath}.js`;
      return new NwtFormulatorLazyControl({
        component: componentPath,
        html: componentHtmlPath,
        css: componentCssPath,
        js: componentJsPath,
      });
    }

  };

  return NwtFormulatorControlManager;

});
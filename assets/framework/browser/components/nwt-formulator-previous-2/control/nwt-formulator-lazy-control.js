(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorLazyControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorLazyControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorLazyControl = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultBasedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator");

    constructor(id, basedir = this.constructor.defaultBasedir) {
      trace("NwtFormulatorLazyControl.constructor");
      assertion(typeof id === "string", "Parameter «id» must be string on «NwtFormulatorLazyControl.constructor»");
      assertion(typeof basedir === "string", "Parameter «basedir» must be string on «NwtFormulatorLazyControl.constructor»");
      this.id = id;
      this.basedir = basedir;
      this.loaded = false;
    }

    async load(injection = {}, scope = this) {
      trace("NwtFormulatorLazyControl.prototype.load");
      const targetComponent = `${this.basedir}/${this.id}/component`;
      const targetJs = `${this.basedir}/${this.id}/component.js`;
      const targetHtml = `${this.basedir}/${this.id}/component.html`;
      const targetCss = `${this.basedir}/${this.id}/component.css`;
      assertion(await NwtFilesystem.existsAsFile(targetJs), `Control «js» file not found at «${targetJs}» on «NwtFormulatorLazyControl.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetHtml), `Control «html» file not found at «${targetHtml}» on «NwtFormulatorLazyControl.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetCss), `Control «css» file not found at «${targetCss}» on «NwtFormulatorLazyControl.prototype.load»`);
      this.loaded = await NwtImporter.vueComponentByFilesystem(targetComponent, injection, scope);
      this.validate();
      return this.loaded;
    }

    validate(value = this.loaded) {
      trace("NwtFormulatorLazyControl.prototype.validate");
      assertion(typeof value === "object", `Required lazy control «${this.id}» to return object on «NwtFormulatorLazyControl.prototype.validate»`);
      assertion(typeof value.abstraction === "object", `Required lazy control «${this.id}» at property «abstraction» to return object on «NwtFormulatorLazyControl.prototype.validate»`);
      assertion(typeof value.abstraction.name === "string", `Required lazy control «${this.id}» at property «abstraction.name» to return string on «NwtFormulatorLazyControl.prototype.validate»`);
      assertion(typeof value.view === "object", `Required lazy control «${this.id}» at property «view» to return object on «NwtFormulatorLazyControl.prototype.validate»`);
    }

  };

  return NwtFormulatorLazyControl;

});
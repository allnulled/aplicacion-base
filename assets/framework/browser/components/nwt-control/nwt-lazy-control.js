(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLazyControl = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(id, basedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-control")) {
      trace("NwtLazyControl.constructor");
      assertion(typeof id === "string", "Required parameter «id» to be string on «NwtLazyControl.constructor»");
      assertion(typeof basedir === "string", "Required parameter «basedir» to be string on «NwtLazyControl.constructor»");
      this.id = id;
      this.basedir = basedir;
    }

    async load() {
      trace("NwtLazyControl.prototype.load");
      const targetComponent = `${this.basedir}/${this.id}/component`;
      const targetJs = `${this.basedir}/${this.id}/component.js`;
      const targetHtml = `${this.basedir}/${this.id}/component.html`;
      const targetCss = `${this.basedir}/${this.id}/component.css`;
      assertion(await NwtFilesystem.existsAsFile(targetJs), `Control «js» file not found at «${targetJs}» on «NwtFormulatorLazyControl.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetHtml), `Control «html» file not found at «${targetHtml}» on «NwtFormulatorLazyControl.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetCss), `Control «css» file not found at «${targetCss}» on «NwtFormulatorLazyControl.prototype.load»`);
      this.loaded = await NwtImporter.vueComponentByFilesystem(targetComponent);
      await this.validateLazyControl();
      return this.loaded;
    }

    async validateLazyControl(loaded = this.loaded) {
      trace("NwtLazyControl.prototype.validateLazyControl");
      assertion(typeof loaded === "object", "Required parameter «loaded» to be object on «NwtLazyControl.validateLazyControl»");
      assertion(typeof loaded.statics === "object", "Required parameter «loaded.statics» to be object on «NwtLazyControl.validateLazyControl»");
      assertion(typeof loaded.statics.id === "string", "Required parameter «loaded.statics.id» to be string on «NwtLazyControl.validateLazyControl»");
    }

  };

  return NwtLazyControl;

});
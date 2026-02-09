(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyComponent'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyComponent'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLazyComponent = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultBasedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-component/type");

    constructor(id, basedir = this.constructor.defaultBasedir) {
      trace("NwtLazyComponent.constructor");
      assertion(typeof id === "string", "Required parameter «id» to be string on «NwtLazyComponent.constructor»");
      assertion(typeof basedir === "string", "Required parameter «basedir» to be string on «NwtLazyComponent.constructor»");
      this.id = id;
      this.basedir = basedir;
    }

    async load() {
      trace("NwtLazyComponent.prototype.load");
      const targetComponent = `${this.basedir}/${this.id}/component`;
      const targetJs = `${this.basedir}/${this.id}/component.js`;
      const targetHtml = `${this.basedir}/${this.id}/component.html`;
      const targetCss = `${this.basedir}/${this.id}/component.css`;
      assertion(await NwtFilesystem.existsAsFile(targetJs), `Component «js» file not found at «${targetJs}» on «NwtFormulatorLazyComponent.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetHtml), `Component «html» file not found at «${targetHtml}» on «NwtFormulatorLazyComponent.prototype.load»`);
      assertion(await NwtFilesystem.existsAsFile(targetCss), `Component «css» file not found at «${targetCss}» on «NwtFormulatorLazyComponent.prototype.load»`);
      this.loaded = await NwtImporter.vueComponentByFilesystem(targetComponent);
      await this.validateLazyComponent();
      return this.loaded;
    }

    async validateLazyComponent(loaded = this.loaded) {
      trace("NwtLazyComponent.prototype.validateLazyComponent");
      assertion(typeof loaded === "object", "Required parameter «loaded» to be object on «NwtLazyComponent.validateLazyComponent»");
      assertion(typeof loaded.name === "string", "Required parameter «loaded.name» to be string on «NwtLazyComponent.validateLazyComponent»");
      assertion(typeof loaded.statics === "object", "Required parameter «loaded.statics» to be object on «NwtLazyComponent.validateLazyComponent»");
      assertion(typeof loaded.statics.id === "string", "Required parameter «loaded.statics.id» to be string on «NwtLazyComponent.validateLazyComponent»");
    }

  };

  return NwtLazyComponent;

});
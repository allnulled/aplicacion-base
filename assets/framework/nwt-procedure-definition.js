(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProcedureDefinition'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProcedureDefinition'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtProcedureDefinition = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(markdownPath = null) {
      trace("NwtProcedureDefinition.constructor");
      this.uid = false;
      this.vendor = false;
      this.author = false;
      this.owner = false;
      this.description = false;
      this.dependencies = false;
      this.silenciable = false;
      this.$pathTo = {};
      if (NwtEnvironment.isNWJS) {
        const path = require("path");
        const directory = path.resolve(path.dirname(markdownPath));
        Object.assign(this.$pathTo, {
          directory: directory,
          markdown: markdownPath,
          form: path.resolve(directory, "form/form"),
          viewer: path.resolve(directory, "viewer/viewer"),
          definition: path.resolve(directory, "definition.js"),
          iterable: path.resolve(directory, "iterable.js"),
        });
      }
    }

    async initialize() {
      trace("NwtProcedureDefinition.prototype.initialize");
      await this.$loadDefinition();
      await this.$loadViewer();
      await this.$loadForm();
      this.$validate();
      return this;
    }

    $validate() {
      trace("NwtProcedureDefinition.prototype.$validate");
      Parameters_by_user: {
        assertion(typeof this.uid === "string", "Parameter «this.uid» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.vendor === "string", "Parameter «this.vendor» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.author === "string", "Parameter «this.author» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.description === "string", "Parameter «this.description» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.dependencies === "object", "Parameter «this.dependencies» must be an object on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.silenciable === "boolean", "Parameter «this.silenciable» must be a boolean on «NwtProcedureDefinition.prototype.validate»");
      }
      Parameters_by_load: {
        assertion(typeof this.$pathTo === "object", "Parameter «this.$pathTo» must be an object on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.$pathTo.directory === "string", "Parameter «this.$pathTo.directory» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.$pathTo.markdown === "string", "Parameter «this.$pathTo.markdown» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.$pathTo.form === "string", "Parameter «this.$pathTo.form» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.$pathTo.viewer === "string", "Parameter «this.$pathTo.viewer» must be a string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.$pathTo.definition === "string", "Parameter «this.$pathTo.definition» must be a string on «NwtProcedureDefinition.prototype.validate»");
      }
      Parameters_by_definition: {
        assertion(typeof this.components === "object", "Parameter «this.components» must be defined on procedure's «definition.js» file as object on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.components.form === "string", "Parameter «this.components.form» must be defined on procedure's «definition.js» file as string on «NwtProcedureDefinition.prototype.validate»");
        assertion(typeof this.components.viewer === "string", "Parameter «this.components.viewer» must be defined on procedure's «definition.js» file as string on «NwtProcedureDefinition.prototype.validate»");
      }
    }

    async $loadDefinition() {
      trace("NwtProcedureDefinition.prototype.$loadDefinition");
      if (NwtEnvironment.isNWJS) {
        const definitionProperties = await NwtImporter.requireNewly(this.$pathTo.definition);
        Object.assign(this, definitionProperties);
      }
    }

    async $loadViewer() {
      trace("NwtProcedureDefinition.prototype.$loadViewer");
      if (NwtEnvironment.isNWJS) {
        const viewerName = this.components.viewer;
        if (!(viewerName in Vue.options.components)) {
          await NwtImporter.vueComponentByFilesystem(this.$pathTo.viewer);
        }
      }
    }

    async $loadForm() {
      trace("NwtProcedureDefinition.prototype.$loadForm");
      if (NwtEnvironment.isNWJS) {
        const formName = this.components.form;
        if (!(formName in Vue.options.components)) {
          await NwtImporter.vueComponentByFilesystem(this.$pathTo.form);
        }
      }
    }

    getMarkdownContents() {
      trace("NwtProcedureDefinition.prototype.getMarkdownContents");
      if (NwtEnvironment.isNWJS) {
        return fs.promises.readFile(this.$pathTo.markdown, "utf8");
      }
    }

    async startViewer(parameters = undefined) {
      trace("NwtProcedureDefinition.prototype.startViewer");
      const definition = this;
      const parentDialog = parameters?.fromDialog || NwtDialogs;
      return await parentDialog.subdialog({
        title: `${this.uid} | Visualizador`,
        template: `<${this.components.viewer} :dialog="this" />`,
        factory: {
          data: function() {
            return {
              context: {
                definition,
                parameters,
                dialog: this,
              }
            };
          }
        }
      });
    }

    async startForm() {
      trace("NwtProcedureDefinition.prototype.startForm");
      const definition = this;
      const resultado = await NwtDialogs.open({
        title: `${this.uid} | Formulario`,
        template: `<${this.components.form} :dialog="this" />`,
        factory: {
          data: function() {
            return {
              context: {
                definition,
                dialog: this,
              }
            };
          }
        }
      });
      if(typeof resultado === "undefined") {
        return;
      }
      assertion(typeof resultado === "object", `Vue component «${this.uid}» used as procedure form must return an object or undefined on «NwtProcedureDefinition.prototype.startForm»`);
      return await this.startViewer(resultado);
    }

  };

  return NwtProcedureDefinition;

});
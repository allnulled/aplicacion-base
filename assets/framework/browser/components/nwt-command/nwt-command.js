(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommand'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommand'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtCommand = class {

    static create(...args) {
      trace("NwtCommand.create");
      return new this(...args);
    }

    static fromCommandIdToComponentId(commandId, options = { asTag: false }) {
      trace("NwtCommand.fromCommandIdToComponentId");
      let commandFinalId = commandId.replace(/(\.|\/|\\)./g, match => {
        return match.substr(1).toUpperCase();
      });
      commandFinalId = commandFinalId.substr(0,1).toUpperCase() + commandFinalId.substr(1);
      if(options.asTag) {
        commandFinalId = commandFinalId.substr(0,1).toLowerCase() + commandFinalId.substr(1).replace(/[A-Z]/g, match => "-" + match.toLowerCase());
      }
      return commandFinalId;
    }

    constructor(manager, subpaths) {
      trace("NwtCommand.constructor");
      this.manager = manager;
      this.commandPath = subpaths.join("/");
    }

    resolve(...subpaths) {
      trace("NwtCommand.prototype.resolve");
      return this.manager.resolve(this.commandPath, ...subpaths);
    }

    getCommandName() {
      trace("NwtCommand.prototype.getCommandName");
      return this.commandPath;
    }

    getFormComponentName(options = { ifMissing: undefined }) {
      trace("NwtCommand.prototype.getFormComponentName");
      const formComponentName = this.constructor.fromCommandIdToComponentId(`NwtCommandFormFor/${this.getCommandName()}`);
      const formComponentTag = this.constructor.fromCommandIdToComponentId(`NwtCommandFormFor/${this.getCommandName()}`, { asTag: true });
      if(typeof options.ifMissing !== "undefined") {
        if(!(formComponentName in Vue.options.components)) {
          return options.ifMissing;
        }
      }
      return formComponentTag;
    }

    getFormComponentPath() {
      trace("NwtCommand.prototype.getFormComponentPath");
      return this.resolve("form/form");
    }

    getViewComponentName(options = { ifMissing: undefined }) {
      trace("NwtCommand.prototype.getViewComponentName");
      const viewComponentName = this.constructor.fromCommandIdToComponentId(`NwtCommandViewFor/${this.getCommandName()}`);
      const viewComponentTag = this.constructor.fromCommandIdToComponentId(`NwtCommandViewFor/${this.getCommandName()}`, { asTag: true });
      if(typeof options.ifMissing !== "undefined") {
        if(!(viewComponentName in Vue.options.components)) {
          return options.ifMissing;
        }
      }
      return viewComponentTag;
    }

    getViewComponentPath() {
      trace("NwtCommand.prototype.getViewComponentPath");
      return this.resolve("view/view");
    }

    getCommandPath() {
      trace("NwtCommand.prototype.getCommandPath");
      return this.resolve("command.js");
    }

    async installSubcomponent(componentPath = false, strongPolicy = true) {
      const existsJs = await NwtFilesystem.existsAsFile(componentPath + ".js");
      const existsHtml = await NwtFilesystem.existsAsFile(componentPath + ".html");
      const isNotValid = (!existsJs) || (!existsHtml);
      Strong_policy: {
        if(!strongPolicy) {
          break Strong_policy;
        }
        assertion(existsJs, `Parameter «\${componentPath}.js» which is now «${componentPath + ".js"}» must point to a readable «*.js» file on «NwtCommand.prototype.installSubcomponent»`);
        assertion(existsHtml, `Parameter «\${componentPath}.js» which is now «${componentPath + ".html"}» must point to a readable «*.html» file on «NwtCommand.prototype.installSubcomponent»`);
      }
      if(isNotValid) {
        return false;
      }
      await NwtImporter.vueComponentByFilesystem(componentPath);
    }

    async installFormComponent() {
      trace("NwtCommand.prototype.installFormComponent");
      return this.installSubcomponent(this.getFormComponentPath(), false);
    }

    async installViewComponent() {
      trace("NwtCommand.prototype.installViewComponent");
      return this.installSubcomponent(this.getViewComponentPath(), false);
    }

    async validateCommandExists(force = false) {
      trace("NwtCommand.prototype.validateCommandExists");
      if((!force) && this.validation) return this.validation;
      const output = {
        commandMd: this.resolve("COMMAND.md"),
        commandJs: this.getCommandPath(),
        formComponent: this.getFormComponentPath(),
        viewComponent: this.getViewComponentPath(),
      };
      Object.assign(output, {
        hasCommandMd: await NwtFilesystem.existsAsFile(output.commandMd),
        hasFormJs: await NwtFilesystem.existsAsFile(output.formComponent + ".js"),
        hasFormHtml: await NwtFilesystem.existsAsFile(output.formComponent + ".html"),
        hasViewJs: await NwtFilesystem.existsAsFile(output.viewComponent + ".js"),
        hasViewHtml: await NwtFilesystem.existsAsFile(output.viewComponent + ".html"),
        hasCommandJs: await NwtFilesystem.existsAsFile(output.commandJs),
      });
      assertion(output.hasCommandMd, `Command «${this.getCommandName()}» must have a «COMMAND.md» file on «NwtCommand.prototype.validateCommandExists»`);
      assertion(output.hasCommandJs, `Command «${this.getCommandName()}» must have a «command.js» file on «NwtCommand.prototype.validateCommandExists»`);
      this.validation = output;
      return output;
    }

    start = {
      form: async (parameters = {}) => {
        trace("NwtCommand.prototype.start.form");
        await this.validateCommandExists();
        const commandName = this.getCommandName();
        await this.installFormComponent();
        await NwtDialogs.open({
          title: `Formulario de comando: ${commandName}`,
          template: `
            <div>
              <${this.getFormComponentName({ ifMissing: "nwt-anonymous-command-form" })}
                :dialog="this"
                :command="comando"
                :parameters="parameters"
              />
            </div>
          `,
          factory: {
            data: {
              comando: this,
              parameters,
            }
          }
        });
      },
      view: async (parameters = {}) => {
        trace("NwtCommand.prototype.start.view");
        await this.validateCommandExists();
        const commandName = this.getCommandName();
        await this.installViewComponent();
        await NwtDialogs.open({
          title: `Ejecución de comando: ${commandName}`,
          template: `
            <${this.getViewComponentName({ ifMissing: "nwt-anonymous-command-view" })}
              :dialog="this"
              :command="comando"
              :parameters="parameters"
            />
          `,
          factory: {
            data: {
              comando: this,
              parameters,
            },
            mounted() {
              this.$trace("NwtCommend.prototype.start.view@dialog.mounted");
            }
          }
        });
      },
      function: async (injections = {}) => {
        trace("NwtCommand.prototype.start.function");
        await this.validateCommandExists();
        const commandFile = this.resolve("command.js");
        // @INJECTION: el assets/framework/nwt-command/registry/{vendor=nwt}/{command=util.txt.concatenation}
        const commandDefinition = await NwtImporter.asyncSource(commandFile, { command: this, ...injections });
      },
    };

  };

  return NwtCommand;

});
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommandsManager'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommandsManager'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCommandsManager = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(basedir) {
      trace("NwtCommandsManager.constructor");
      this.basedir = basedir;
    }

    getCommandNameFromMd(commandMd) {
      return commandMd.replace(this.resolve("") + "/", "").replace(/\/COMMAND\.md$/g, "")
    }

    resolve(...subpaths) {
      trace("NwtCommandsManager.prototype.resolve");
      const path = require("path");
      return path.resolve(this.basedir, ...subpaths);
    }

    async listCommands() {
      trace("NwtCommandsManager.prototype.listCommands");
      const filepaths = await NwtFilesystem.selectByGlob(this.resolve("**/COMMAND.md"));
      return filepaths;
    }

    command = (...subpaths) => NwtCommand.create(this, subpaths);

  };

  NwtCommandsManager.global = NwtCommandsManager.create(NwtPaths.global.relative("assets/framework/nwt-command/registry"));

  return NwtCommandsManager;

});
Vue.component("NwtCommandsManagerViewer", {
  name: "NwtCommandsManagerViewer",
  template: $template,
  props: {
    manager: {
      type: Object,
      default: () => NwtCommandsManager.global,
    }
  },
  mixins: [],
  data() {
    return {
      mode: "default", // also: selectable
      reloadTimeout: 1000,
      reloadTimeoutId: undefined,
      searchText: "",
      isSearching: false,
      commands: [],
      filteredCommands: [],
      openedReadmes: [],
      openedReadmeContents: {},
    };
  },
  methods: {
    async loadCommands() {
      trace("NwtCommandsManagerViewer.methods.loadCommands");
      clearTimeout(this.reloadTimeoutId);
      this.isSearching = false;
      this.commands = (await this.manager.listCommands()).map(fullpath => {
        return {
          fullpath,
          name: fullpath.replace(this.manager.basedir, "").replace(/^(\\|\/)+/g, "").replace(/(\\|\/)+COMMAND\.md$/g, "")
        };
      });
      const searchTextLowered = this.searchText.toLowerCase();
      if(!searchTextLowered) {
        this.filteredCommands = this.commands.concat([]);
        return;
      }
      this.filteredCommands = this.commands.filter(command => {
        return command.name.toLowerCase().indexOf(searchTextLowered) !== -1;
      });
    },
    delayReload() {
      trace("NwtCommandsManagerViewer.methods.delayReload");
      clearTimeout(this.reloadTimeoutId);
      this.isSearching = true;
      this.reloadTimeoutId = setTimeout(() => this.loadCommands(), this.reloadTimeout);
    },
    startForm(command) {
      trace("NwtCommandsManagerViewer.methods.startForm");
      return this.manager.command(command).start.form();
    },
    startView(command) {
      trace("NwtCommandsManagerViewer.methods.startView");
      return this.manager.command(command).start.view();
    },
    async getReadmeContent(command) {
      trace("NwtCommandsManagerViewer.methods.getReadmeContent");
      const commandFile = this.manager.resolve(command, "COMMAND.md");
      const mdContent = await NwtFilesystem.readFile(commandFile);
      const htmlContent = marked.parse(mdContent);
      return htmlContent;
    },
    async toggleReadme(command) {
      trace("NwtCommandsManagerViewer.methods.toggleReadme");
      const pos = this.openedReadmes.indexOf(command);
      if(pos === -1) {
        this.openedReadmeContents[command] = await this.getReadmeContent(command);
        this.openedReadmes.push(command);
      } else {
        delete this.openedReadmeContents[command];
        this.openedReadmes.splice(pos, 1);
      }
    },
    async openCommandsDirectory() {
      trace("NwtCommandsManagerViewer.methods.openCommandsDirectory");
      const fileExplorerBinary = await NwtSettings.global.get("nwt.binary.file-explorer");
      NwtShell.create().exec(`${JSON.stringify(fileExplorerBinary)} ${JSON.stringify(this.manager.basedir)}`);
    }
  },
  created() {},
  async mounted() {
    await this.loadCommands();
  },
});
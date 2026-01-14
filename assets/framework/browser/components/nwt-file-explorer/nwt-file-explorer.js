/**
 * 
 * # NwtFileExplorer
 * 
 * Componente vue2 para explorar sistema de ficheros. También como filepicker y directorypicker.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFileExplorer
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-file-explorer
 *   opened-by="/ruta/por/donde/quieres/que/aparezca/abierto"
 *   accept-extensions="*"
 *   accept-extensions="js,html,css,csv,json,jsonl"
 *   save-file="true"          # esta opción es para seleccionar ficheros que no existen todavía
 *   multiple="true"           # esta opción no es compatible con las opciones save-file=true ni chooser-of="none" ni chooser-of="directory"
 *   chooser-of="none"         # acepta también: "file" y "directory"
 *   :on-accept="(choosen) => doSomethingWith(choosen)"
 *   :on-cancel="() => doSomethingWith()"
 * />
 * ```
 * 
 * Por tanto, este componente puede usarse tanto para escoger ficheros, directorios, nuevos ficheros, o simplemente explorar ficheros.
 * 
 * De momento, no hace nada cuando seleccionas un fichero.
 * 
 */
Vue.component("NwtFileExplorer", {
  name: "NwtFileExplorer",
  template: $template,
  props: {
    openedBy: {
      type: String,
      default: () => process.cwd()
    },
    acceptExtensions: {
      type: String,
      default: () => "*"
    },
    saveFile: {
      type: Boolean,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    chooserOf: {
      type: String,
      default: () => "none", // also: "none", "file", "directory"
    },
    onAccept: {
      type: Function,
      default: NwtUtils.noop,
    },
    onCancel: {
      type: Function,
      default: NwtUtils.noop,
    },
  },
  mixins: [],
  data() {
    trace("NwtFileExplorer.data");
    return {
      savedFileName: "",
      acceptedExtensions: this.acceptExtensions.split(","),
      selectedNodes: [],
      openedNode: this.openedBy,
      subnodes: []
    };
  },
  methods: {
    isAcceptedExtension(nodepath) {
      trace("NwtFileExplorer.methods.isAcceptedExtension");
      if(this.acceptExtensions === "*") {
        return true;
      }
      for(let indexExtensions=0; indexExtensions<this.acceptedExtensions.length; indexExtensions++) {
        const acceptedExtension = this.acceptedExtensions[indexExtensions];
        const isAccepted = nodepath.endsWith(acceptedExtension);
        if(isAccepted) {
          return true;
        }
      }
      return false;
    },
    open(node) {
      trace("NwtFileExplorer.methods.open");
      this.openedNode = node;
      return this.loadSubnodes();
    },
    goUp() {
      trace("NwtFileExplorer.methods.goUp");
      const upperDirectory = require("path").dirname(this.openedNode);
      this.open(upperDirectory);
    },
    toggleNode(subnode) {
      trace("NwtFileExplorer.methods.toggleNode");
      const pos = this.selectedNodes.indexOf(subnode);
      if(pos === -1) {
        if(this.multiple) {
          this.selectedNodes.push(subnode);
        } else {
          this.selectedNodes = [subnode];
        }
      } else {
        this.selectedNodes.splice(pos, 1);
      }
    },
    reload() {
      trace("NwtFileExplorer.methods.reload");
      return this.loadSubnodes();
    },
    async loadSubnodes() {
      trace("NwtFileExplorer.methods.loadSubnodes");
      this.subnodes = await NwtFilesystem.readdirStats(this.openedNode, {}, true);
    },
    async validateProps() {
      trace("NwtFileExplorer.methods.validateProps");
      Opened_by_exists_as_file: {
        assertion(await NwtFilesystem.existsAsDirectory(this.openedBy), "Parameter «openedBy» must exist as directory on «NwtFileExplorer.methods.validateProps»");
      }
      Accept_extensions_is_compliant: {
        const allExtensions = this.acceptExtensions.split(",");
        for(let index=0; index<allExtensions.length; index++) {
          const extensionItem = allExtensions[index];
          assertion((extensionItem === "*") || (extensionItem.startsWith(".")), "Parameter «acceptExtensions» must be «*» or start with «.» on «NwtFileExplorer.methods.validateProps»");
        }
      }
      Chooser_of_is_compliant: {
        assertion(["none", "file", "directory"].indexOf(this.chooserOf) !== -1, "Parameter «chooserOf» must be one out of «none|file|directory» on «NwtFileExplorer.methods.validateProps»");
      }
    },
    acceptChooser() {
      trace("NwtFileExplorer.methods.acceptChooser");
      if(this.chooserOf === "file") {
        if(this.saveFile) {
          const path = require("path");
          const fullpath = path.resolve(this.openedNode, this.savedFileName);
          return this.onAccept(fullpath);
        } else {
          if(!this.multiple) {
            return this.onAccept(this.selectedNodes[0]);
          }
          return this.onAccept(this.selectedNodes);
        }
      }
      return this.onAccept(this.openedNode);
    },
    cancelChooser() {
      trace("NwtFileExplorer.methods.cancelChooser");
      return this.onCancel();
    },
    async createDirectory() {
      trace("NwtFileExplorer.methods.createDirectory");
      const dirname = await this.$dialogs.open({
        title: "Nuevo directorio",
        template: `
          <div>
            <div>Nombre del nuevo directorio:</div>
            <input class="width_100" type="text" v-model="value" v-on:keypress.enter="accept" v-focus />
            <hr />
            <div class="flex_row centered">
              <div class="flex_100"></div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="accept">Aceptar</button>
              </div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="cancel">Cancelar</button>
              </div>
            </div>
          </div>
        `,
        factory: {
          data: {}
        }
      });
      if(!dirname) return;
      const fullpath = NwtPaths.resolve(this.openedNode, dirname);
      const exists = await NwtFilesystem.exists(fullpath);
      assertion(!exists, `Filesystem already has a node on «${fullpath}» so it cannot be created on «NwtFileExplorer.methods.createDirectory»`);
      await NwtFilesystem.mkdir(fullpath);
      await this.reload();
    },
    async createFile() {
      trace("NwtFileExplorer.methods.createFile");
      const dirname = await this.$dialogs.open({
        title: "Nuevo fichero",
        template: `
          <div>
            <div>Nombre del nuevo fichero:</div>
            <input class="width_100" type="text" v-model="value" v-on:keypress.enter="accept" v-focus />
            <hr />
            <div class="flex_row centered">
              <div class="flex_100"></div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="accept">Aceptar</button>
              </div>
              <div class="flex_1 pad_left_1">
                <button v-on:click="cancel">Cancelar</button>
              </div>
            </div>
          </div>
        `,
        factory: {
          data: {}
        }
      });
      if(!dirname) return;
      const fullpath = NwtPaths.resolve(this.openedNode, dirname);
      const exists = await NwtFilesystem.exists(fullpath);
      assertion(!exists, `Filesystem already has a node on «${fullpath}» so it cannot be created on «NwtFileExplorer.methods.createDirectory»`);
      await NwtFilesystem.writeFile(fullpath, "");
      await this.reload();
    }
  },
  async created() {
    trace("NwtFileExplorer.created");
    await this.validateProps();
    await this.loadSubnodes();
  },
  mounted() {
    trace("NwtFileExplorer.mounted");
  },
});
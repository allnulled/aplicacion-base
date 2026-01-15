/**
 * 
 * # NwtPromptsManagerViewer
 * 
 * Componente para gestionar prompts guardados en local.
 * 
 * No usa la API de OpenAI para nada.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtPromptsManagerViewer
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-prompts-manager-viewer
 *   :manager="NwtPromptsManager.global"  # valor por defecto: este parámetro puede ignorarse
 *   :chooser="true"   # si se usa como prompt-picker: true, si se usa como prompt-explorer: false (por defecto)
 *   :dialog="dialog"  # diálogo externo, para cerrarlo cuando el picker haya acabado
 * />
 * ```
 * 
 */
Vue.component("NwtPromptsManagerViewer", {
  template: $template,
  props: {
    manager: {
      type: Object,
      default: () => NwtPromptsManager.global
    },
    chooser: {
      type: Boolean,
      default: () => false,
    },
    dialog: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    trace("NwtPromptsManagerViewer.data");
    return {
      state: "done",
      searchTimeout: false,
      searchText: "",
      allPromptPaths: false,
      filteredPromptPaths: false,
      selectedPrompt: false,
    };
  },

  methods: {
    
    togglePrompt(promptPath) {
      trace("NwtPromptsManagerViewer.methods.togglePrompt");
      if(this.selectedPrompt === promptPath) {
        this.selectedPrompt = false;
      } else {
        this.selectedPrompt = promptPath;
      }
    },
    async addPrompt() {
      trace("NwtPromptsManagerViewer.methods.addPrompt");
      const result = await NwtDialogs.open({
        title: "Añadir prompt",
        template: `<div>
          <div>Ruta del prompt:</div>
          <input type="text" class="width_100" v-model="value.path" />
          <div>Contenido del prompt:</div>
          <textarea class="width_100" v-model="value.content" />
          <hr />
          <div class="flex_row centered">
            <div class="flex_100"></div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="accept">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="cancel">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            value: {
              path: "",
              content: "",
            },
          }
        }
      });
      if(!result) return;
      const promptPath = this.manager.resolve(result.path, "PROMPT.md");
      await NwtFilesystem.ensureFile(promptPath);
      await NwtFilesystem.writeFile(promptPath, result.content);
      await this.reload();
    },
    async editPrompt(promptSubpath) {
      trace("NwtPromptsManagerViewer.methods.editPrompt");
      const promptFullpath = this.manager.resolve(promptSubpath, "PROMPT.md");
      const promptSource = await NwtFilesystem.readFile(promptFullpath);
      const result = await NwtDialogs.open({
        title: "Editar prompt",
        template: `<div>
          <div>Contenido del prompt:</div>
          <textarea class="width_100" v-model="value" />
          <hr />
          <div class="flex_row centered">
            <div class="flex_100"></div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="accept">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="cancel">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            value: promptSource,
          }
        }
      });
      if(!result) return;
      await NwtFilesystem.writeFile(promptFullpath, result);
      await this.reload();
    },
    async deletePrompt(promptSubpath) {
      trace("NwtPromptsManagerViewer.methods.deletePrompt");
      const promptFullpath = this.manager.resolve(promptSubpath, "PROMPT.md");
      const result = await NwtDialogs.open({
        title: "Eliminar prompt",
        template: `<div>
          <div>¿Seguro que quieres eliminar el prompt «{{ promptName }}»?</div>
          <hr />
          <div class="flex_row centered">
            <div class="flex_100"></div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="() => accept(true)">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_1">
              <button class="mini" v-on:click="cancel">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            promptName: promptSubpath
          }
        }
      });
      if(!result) return;
      await NwtFilesystem.unlink(promptFullpath);
      await this.reload();
    },
    async acceptPrompt() {
      const promptFullpath = this.manager.resolve(this.selectedPrompt, 'PROMPT.md')
      const promptContent = await NwtFilesystem.readFile(promptFullpath);
      return this.dialog.accept(promptContent);
    },
    async openPromptsFolder() {
      trace("NwtPromptsManagerViewer.methods.openPromptsFolder");
      const fileExplorerBinary = await NwtSettings.global.get("nwt.binary.file-explorer");
      const command = `${JSON.stringify(fileExplorerBinary)} ${JSON.stringify(this.manager.$basedir)}`;
      console.log(command);
      NwtShell.create().exec(command);
    },
    async reload() {
      trace("NwtPromptsManagerViewer.methods.reload");
      clearTimeout(this.searchTimeout);
      this.allPromptPaths = await this.manager.list();
      const searchLowered = this.searchText.toLowerCase();
      this.filteredPromptPaths = this.allPromptPaths.filter(promptPath => {
        return promptPath.toLowerCase().indexOf(searchLowered) !== -1;
      });
      this.state = "done";
    },
    delayedSearch() {
      trace("NwtPromptsManagerViewer.methods.delayedSearch");
      this.state = "searching";
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.reload();
      }, 1000);
    }

  },

  created() {
    trace("NwtPromptsManagerViewer.created");
  },

  async mounted() {
    trace("NwtPromptsManagerViewer.mounted");
    this.allPromptPaths = await this.manager.list();
    this.filteredPromptPaths = this.allPromptPaths.concat([]);
  },

  unmounted() {
    trace("NwtPromptsManagerViewer.unmounted");
  }

});

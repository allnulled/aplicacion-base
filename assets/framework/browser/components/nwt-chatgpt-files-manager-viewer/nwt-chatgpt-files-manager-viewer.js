/**
 * 
 * # Nwt Chatgpt Files Manager Viewer API / Componente Vue2
 * 
 * La Nwt Chatgpt Files Manager Viewer API permite consultar, subir y eliminar ficheros a los servidores de OpenAI para usar contra ChatGPT Plus.
 * 
 * ## Exposición
 * 
 * La API se expone a través del componente Vue2:
 * 
 * ```js
 * Vue.options.components.NwtChatgptFilesManagerViewer
 * ```
 * 
 * 
 * 
 */
Vue.component("NwtChatgptFilesManagerViewer", {
  template: $template,
  props: {
    
  },

  data() {
    trace("NwtChatgptFilesManagerViewer.data");
    return {
      state: "done", // also: "done", "searching", "loading", "uploading"
      searchText: "",
      searchTimeout: false,
      allFiles: false,
      filteredFiles: false,
    };
  },

  methods: {
    
    async loadFiles() {
      trace("NwtChatgptFilesManagerViewer.methods.loadFiles");
      this.state = "loading";
      this.allFiles = await NwtChatgpt.listFiles();
      this.state = "done";
    },

    async reload() {
      const searchTextLowered = this.searchText.toLowerCase();
      this.filteredFiles = this.allFiles.filter(file => {
        const matchesId = file.id.toLowerCase().indexOf(searchTextLowered) !== -1;
        const matchesFilename = file.filename.toLowerCase().indexOf(searchTextLowered) !== -1;
        return matchesId || matchesFilename;
      });
    },

    delayedSearch() {
      trace("NwtChatgptFilesManagerViewer.methods.delayedSearch");
      this.state = "searching";
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        await this.reload();
        this.state = "done";
      }, 1000);
    },

    async uploadNewFile() {
      trace("NwtChatgptFilesManagerViewer.methods.uploadNewFile");
      const files = await NwtDialogs.open({
        title: "Subir ficheros para ChatGPT",
        template: `<nwt-file-explorer
          accept-extensions="*"
          chooserOf="file"
          :multiple="true"
          :on-accept="files => accept(files)"
          :on-cancel="cancel"
        />`
      });
      if(!files) return;
      await NwtChatgpt.uploadFiles(files);
      CommonToasts.show({
        title: "Ficheros subidos a ChatGPT",
        text: `Los ${files.length} ficheros fueron subidos a ChatGPT correctamente`,
      });
      await this.fullyReload();
    },

    async downloadFile() {
      trace("NwtChatgptFilesManagerViewer.methods.downloadFile");
    },
    
    viewFile() {
      trace("NwtChatgptFilesManagerViewer.methods.viewFile");
    },

    async deleteFile(file) {
      trace("NwtChatgptFilesManagerViewer.methods.deleteFile");
      const result = await NwtDialogs.open({
        title: "Eliminar fichero de servidor de OpenAI",
        template: `<div>
          <div>Datos del fichero:</div>
          <ul>
            <li>ID: {{ file.id }}</li>
            <li>Nombre: {{ file.filename }}</li>
            <li>Fecha: {{ $nwt.Timer.fromDateToString(new Date(file.created_at)) }}</li>
            <li>Tamaño: {{ $nwt.Filesystem.formatBytes(file.bytes) }}</li>
          </ul>
          <div class="pad_top_2 pad_bottom_2">¿Seguro que quieres eliminar el fichero de los servidores de OpenAI/ChatGPT?</div>
          <hr />
          <div class="flex_row centered">
            <div class="flex_100"></div>
            <div class="flex_1 pad_left_1">
              <button class="" v-on:click="() => accept(true)">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_1">
              <button class="" v-on:click="cancel">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: { data: { file } }
      });
      if(!result) return;
      await NwtChatgpt.deleteFiles(file.id);
      await this.fullyReload();
    },

    async fullyReload() {
      trace("NwtChatgptFilesManagerViewer.methods.fullyReload");
      await this.loadFiles();
      await this.reload();
    }

  },

  async mounted() {
    trace("NwtChatgptFilesManagerViewer.mounted");
    this.fullyReload();
  },

});

/**
 * 
 * 
 * 
 * 
 */
Vue.component("MainWindow", {
  template: $template,
  props: {},
  data() {
    trace("MainWindow.data");
    return {
      state: "done", // also: "done", "searching"
      searchFilter: "",
      searchTimeout: false,
      filteredPrograms: [],
      allPrograms: [{
        text: "Procedimientos",
        event: () => this.startProcedimientos(),
      }, {
        text: "Configuraciones",
        event: () => this.startConfiguraciones(),
      }, {
        text: "Procesos",
        event: () => this.startProcesos(),
      }, {
        text: "Ficheros locales",
        event: () => this.startExploradorDeFicheros(),
      }, {
        text: "Prompts",
        event: () => this.startGestorDePrompts(),
      }, {
        text: "Ficheros de ChatGPT",
        event: () => this.startGestorDeFicherosDeChatgpt(),
      }]
    };
  },
  methods: {

    startProcedimientos() {
      trace("MainWindow.methods.startProcedimientos");
      this.$dialogs.open({
        title: "Procedimientos",
        template: `<nwt-procedures-manager-viewer :dialog="this" />`
      });
    },
    startConfiguraciones() {
      trace("MainWindow.methods.startConfiguraciones");
      this.$dialogs.open({
        title: "Configuraciones",
        template: `<nwt-settings-viewer :dialog="this" />`,
      });
    },
    startProcesos() {
      trace("MainWindow.methods.startProcesos");
      this.$dialogs.open({
        title: "Procesos",
        template: `<nwt-process-manager-viewer :dialog="this" />`,
      });
    },
    startExploradorDeFicheros() {
      trace("MainWindow.methods.startExploradorDeFicheros");
      this.$dialogs.open({
        title: "Explorador de ficheros",
        template: `<nwt-file-explorer />`,
      });
    },
    startGestorDePrompts() {
      trace("MainWindow.methods.startGestorDePrompts");
      this.$dialogs.open({
        title: "Gestor de prompts",
        template: `<nwt-prompts-manager-viewer />`,
      });
    },
    startGestorDeFicherosDeChatgpt() {
      trace("MainWindow.methods.startGestorDeFicherosDeChatgpt");
      this.$dialogs.open({
        title: "Gestor de ficheros de ChatGPT",
        template: `<nwt-chatgpt-files-manager-viewer />`,
      });
    },

    sortProgramsAlphabeticallyCallback() {
      return (a, b) => {
        trace("MainWindow.methods.sortProgramsAlphabeticallyCallback");
        if(a.text < b.text) return -1;
        if(a.text > b.text) return 1;
        return 0;
      };
    },

    reload() {
      trace("MainWindow.methods.reload");
      if(this.searchFilter) {
        this.filteredPrograms = this.allPrograms.filter(program => {
          return program.text.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1;
        }).sort(this.sortProgramsAlphabeticallyCallback());
      } else {
        this.filteredPrograms = this.allPrograms.concat([]).sort(this.sortProgramsAlphabeticallyCallback());
      }
      this.state = "done";
    },

    delayedReload() {
      trace("MainWindow.methods.delayedReload");
      this.state = "searching";
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.reload();
      }, 1000);
    }

  },
  mounted() {
    trace("MainWindow.mounted");
    Inyeccion_a_modulo_externo: {
      if (window.AppRoot && window.AppRoot.initialize) {
        window.AppRoot.initialize(this);
      }
    }
    this.reload();
  }
});
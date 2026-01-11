Vue.component("NwtProceduresManagerViewer", {
  template: $template,
  props: {},
  data() {
    trace("NwtProceduresManagerViewer.data");
    return {
      state: "done", // "searching"
      searchingTimeout: false,
      allProcedureSeeds: false,
      procedureSeeds: false,
      openedDocumentation: [],
      searchFilter: "",
    };
  },
  methods: {
    async reload() {
      trace("NwtProceduresManagerViewer.methods.reload");
      await NwtProceduresManager.global.load();
      this.allProcedureSeeds = NwtProceduresManager.global.$procedures;
      this.procedureSeeds = this.allProcedureSeeds.filter(procedureSeed => {
        return procedureSeed.id.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1;
      });
      this.state = "done";
    },
    toggleDocumentation(procedureUid) {
      trace("NwtProceduresManagerViewer.methods.toggleDocumentation");
      const pos = this.openedDocumentation.indexOf(procedureUid);
      if(pos === -1) {
        this.openedDocumentation.push(procedureUid);
      } else {
        this.openedDocumentation.splice(pos, 1);
      }
    },
    async startFormOf(procedureUid) {
      trace("NwtProceduresManagerViewer.methods.startFormOf");
      const procedureSeed = NwtProceduresManager.global.findById(procedureUid);
      await procedureSeed.startForm();
    },
    async startViewerOf(procedureUid) {
      trace("NwtProceduresManagerViewer.methods.startViewerOf");
      const procedureSeed = NwtProceduresManager.global.findById(procedureUid);
      await procedureSeed.startViewer();
    },
    delayedSearch() {
      trace("NwtProceduresManagerViewer.methods.delayedSearch");
      this.state = "searching";
      clearTimeout(this.searchingTimeout);
      this.searchingTimeout = setTimeout(() => {
        this.reload();
      }, 1000);
    },
    getCssClassFromId(id) {
      trace("NwtProceduresManagerViewer.methods.getCssClassFromId");
      if(id.toLowerCase().startsWith("flujo ")) {
        return "procedure_type_workflow";
      } else if(id.toLowerCase().startsWith("prototipo ")) {
        return "procedure_type_prototype";
      } else if(id.toLowerCase().startsWith("convertir ")) {
        return "procedure_type_converter";
      }
      return "";
    }
  },
  async mounted() {
    trace("NwtProceduresManagerViewer.mounted");
    await this.reload();
  }
});
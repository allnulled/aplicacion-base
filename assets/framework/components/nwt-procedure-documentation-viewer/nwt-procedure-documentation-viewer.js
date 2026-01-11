Vue.component("AppProcedureDocumentationViewer", {
  template: $template,
  props: {
    procedureSeed: {
      type: Object,
      required: true,
    }
  },
  data() {
    trace("AppProcedureDocumentationViewer.data");
    return {
      markdownContent: false,
      markdownContentToHtml: false,
    };
  },
  methods: {
    validate() {
      const isSeed = this.procedureSeed instanceof NwtProcedureSeed;
      // const isDefinition = this.procedureSeed instanceof NwtProcedureDefinition;
      assertion(isSeed, "Parameter «this.procedureSeed» must be an instance of «NwtProcedureSeed» on «AppProcedureDocumentationViewer.methods.validate»");
    },
    async loadMarkdown() {
      if(NwtEnvironment.isNWJS) {
        const fs = require("fs");
        const markdownContent = await fs.promises.readFile(this.procedureSeed.markdownPath, "utf8");
        this.markdownContent = markdownContent;
        this.markdownContentToHtml = marked.parse(markdownContent);
      }
    }
  },
  async mounted() {
    trace("AppProcedureDocumentationViewer.mounted");
    this.validate();
    await this.loadMarkdown();
  }
});
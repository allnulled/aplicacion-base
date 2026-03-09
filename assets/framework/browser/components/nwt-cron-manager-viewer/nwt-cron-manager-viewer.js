Vue.component("NwtCronManagerViewer", {
  name: "NwtCronManagerViewer",
  template: $template,
  props: {
    manager: {
      type: NwtCronManager,
      default: () => NwtCronManager.global,
    }
  },
  mixins: [],
  data() {
    trace("NwtCronManagerViewer.data");
    return {
      isOpened: [],
      isNewJobDialogOpen: false,
    };
  },
  methods: {
    openNewJobDialog() {
      trace("NwtCronManagerViewer.methods.openNewJobDialog");
      this.isNewJobDialogOpen = true;
    },
    toggleJob(job) {
      trace("NwtCronManagerViewer.methods.toggleJob");
      const pos = this.isOpened.indexOf(job);
      if(pos === -1) {
        this.isOpened.push(job);
      } else {
        this.isOpened.splice(pos, 1);
      }
    },
    removeJob(job) {
      trace("NwtCronManagerViewer.methods.removeJob");
      this.manager.removeJobByReference(job);
    },
    createNewBlankJob() {
      return NwtCronExpression.create({title: "Tarea en blanco"}).toPersistibleJob(NwtUtils.noop);
    }
  },
  created() {},
  mounted() {
    trace("NwtCronManagerViewer.mounted");
  },
});
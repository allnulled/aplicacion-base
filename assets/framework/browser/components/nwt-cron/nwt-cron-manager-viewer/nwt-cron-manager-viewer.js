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
      this.$local.progressBarViewer1.$el.classList.remove("hidden");
      setTimeout(() => {
        const pos = this.isOpened.indexOf(job);
        if(pos === -1) {
          this.isOpened.push(job);
        } else {
          this.isOpened.splice(pos, 1);
        }
        this.$local.progressBarViewer1.$el.classList.add("hidden");
      }, 10);
    },
    removeJob(job) {
      trace("NwtCronManagerViewer.methods.removeJob");
      this.manager.removeJobByReference(job);
    },
    runJob(job) {
      trace("NwtCronManagerViewer.methods.runJob");
      job.callback();
    },
    createNewBlankJob() {
      trace("NwtCronManagerViewer.methods.createNewBlankJob");
      return NwtCronExpression.create({title: "Sin título"}).toPersistibleJob(NwtUtils.noop);
    }
  },
  created() {
    trace("NwtCronManagerViewer.created");
    NwtVue2Toolkit.installLocal(this);
    this.$local.progressBarViewer1 = undefined;
    this.$local.progressBar1 = NwtProgressBar.create();
    this.$local.progressBar1.current = 98;
    this.$local.progressBar1.total = 100;
    this.$local.progressBar1._updatePercentage();
  },
  mounted() {
    trace("NwtCronManagerViewer.mounted");
  },
});
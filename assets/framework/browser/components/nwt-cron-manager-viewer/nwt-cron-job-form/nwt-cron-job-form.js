Vue.component("NwtCronJobForm", {
  name: "NwtCronJobForm",
  template: $template,
  props: {
    job: {
      type: NwtCronPersistibleJob,
      required: true,
    },
    onSaved: {
      type: Function,
      default: NwtUtils.noop,
    }
  },
  mixins: [],
  data() {
    trace("NwtCronJobForm.data");
    return {
      isEditingCallback: false,
    };
  },
  methods: {

    toggleCallbackEdition() {
      trace("NwtCronJobForm.methods.toggleCallbackEdition");
      this.isEditingCallback = !this.isEditingCallback;
    },

    getValueByUi() {
      trace("NwtCronJobForm.methods.getValueByUi");
      return NwtObjectUtils.cleanMapByPairs(this.$local.controls, (k,v) => {
        if(k === "callback") {
          return [k, NwtCodeComposer.hydrateFunction(v.value)]
        }
        return [k, v.value];
      });
    },

    async saveJob() {
      trace("NwtCronJobForm.methods.saveJob");
      const valueByUi = this.getValueByUi();
      this.job.title = valueByUi.title;
      if(valueByUi.callback) {
        this.job.callback = valueByUi.callback.toString();
      }
      this.job.pattern = NwtCronExpression.create(valueByUi).toString();
      await this.job.manager.save();
      this.onSaved();
    }
  },
  created() {
    trace("NwtCronJobForm.mounted");
    NwtVue2Toolkit.installLocal(this);
    this.$local.controls = {};
    this.$local.cronExpression = NwtCronExpression.fromString(this.job.pattern);
    this.$local.magnitudes = [
      {text:"📆 Año", id: "year", placeholder:"Ej: *,1984,2026-2029,*/4" },
      {text:"📆 Mes", id: "month", placeholder:"Ej: *,12,1-6,*/3" },
      {text:"📆 Día", id: "day", placeholder:"Ej: *,31,1-15,*/2" },
      {text:"📆 Semanal", id: "weekday", placeholder:"Ej: *,MON,TUE,WED,THU,FRI,SAT,SUN" },
      {text:"⌚️ Hora", id: "hour", placeholder:"Ej: *,0-12,23,*/8" },
      {text:"⌚️ Minuto", id: "minute", placeholder:"Ej: *,0-30,59,*/5" },
      {text:"⌚️ Segundo", id: "second", placeholder:"Ej: *,0-30,59,*/10" },
    ];
  },
  mounted() {},
});
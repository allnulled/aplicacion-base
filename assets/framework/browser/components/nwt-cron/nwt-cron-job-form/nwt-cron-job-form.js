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
      isLoading: true,
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
      return NwtObjectUtils.cleanMapByPairs(this.$local.controls, (k, v) => {
        if (k === "callback") {
          return [k, NwtCodeComposer.hydrateFunction(v.value)]
        }
        return [k, v.value];
      });
    },

    async saveJob() {
      trace("NwtCronJobForm.methods.saveJob");
      this.isLoading = true;
      this.$local.progressBarForLoading.total = 7;
      this.$local.progressBarForLoading.current = 0;
      this.$local.progressBarForLoading.advance();
      const valueByUi = this.getValueByUi();
      this.$local.progressBarForLoading.advance();
      this.job.title = valueByUi.title;
      if (valueByUi.callback) {
        this.job.callback = valueByUi.callback.toString();
      }
      this.$local.progressBarForLoading.advance();
      this.job.pattern = NwtCronExpression.create(valueByUi).toString();
      this.$local.progressBarForLoading.advance();
      await this.job.manager.save();
      this.$local.progressBarForLoading.advance();
      await this.job.manager.reload();
      this.$local.progressBarForLoading.advance();
      this.onSaved();
      this.$local.progressBarForLoading.advance();
      this.isLoading = false;
    },

    pastePlaceholderTemplate() {
      trace("NwtCronJobForm.methods.pastePlaceholderTemplate");
      this.$local.controls.callback.value = this.$local.controls.callback.placeholder;
    },

    setMagnitudeFromNow(magnitudeIndex) {
      trace("NwtCronJobForm.methods.setMagnitudeFromNow");
      const { id } = this.$local.magnitudes[magnitudeIndex];
      const getterMethod = this.$local.magnitudeMethods[id].getter;
      let magnitudeValueFromNow = (new Date())[getterMethod]();
      if(id === "month") {
        magnitudeValueFromNow++;
      }
      this.$local.controls[id].value = magnitudeValueFromNow;
    },

    increaseMagnitude(magnitudeIndex) {
      trace("NwtCronJobForm.methods.increaseMagnitude");
      const { id } = this.$local.magnitudes[magnitudeIndex];
      const currentValue = this.$local.controls[id].value;
      const intValue = parseInt(currentValue);
      this.$local.controls[id].value = (Number.isNaN(intValue) || intValue <= 0 ? 0 : intValue) + 1;
    },

    decreaseMagnitude(magnitudeIndex) {
      trace("NwtCronJobForm.methods.decreaseMagnitude");
      const { id } = this.$local.magnitudes[magnitudeIndex];
      const currentValue = this.$local.controls[id].value;
      const intValue = parseInt(currentValue);
      this.$local.controls[id].value = (Number.isNaN(intValue) || intValue <= 0 ? 1 : intValue) - 1;
    }

  },
  created() {
    trace("NwtCronJobForm.mounted");
    NwtVue2Toolkit.installLocal(this);
    this.$local.controls = {};
    this.$local.cronExpression = NwtCronExpression.fromString(this.job.pattern);
    this.$local.magnitudeMethods = {
      year: {
        getter: "getFullYear",
        setter: "setFullYear",
      },
      month: {
        getter: "getMonth",
        setter: "setMonth",
      },
      day: {
        getter: "getDate",
        setter: "setDate",
      },
      weekday: {
        getter: "getDay",
        setter: "setDay",
      },
      hour: {
        getter: "getHours",
        setter: "setHours",
      },
      minute: {
        getter: "getMinutes",
        setter: "setMinutes",
      },
      second: {
        getter: "getSeconds",
        setter: "setSeconds",
      },
      millisecond: {
        getter: "getMilliseconds",
        setter: "setMilliseconds",
      },
    };
    this.$local.magnitudes = [
      { text: "📆 Año", id: "year", placeholder: "Ej: *,1984,2026-2029,*/4" },
      { text: "📆 Mes", id: "month", placeholder: "Ej: *,12,1-6,*/3" },
      { text: "📆 Día", id: "day", placeholder: "Ej: *,31,1-15,*/2" },
      { text: "📆 Semanal", id: "weekday", placeholder: "Ej: *,MON,TUE,WED,THU,FRI,SAT,SUN" },
      { text: "⌚️ Hora", id: "hour", placeholder: "Ej: *,0-12,23,*/8" },
      { text: "⌚️ Minuto", id: "minute", placeholder: "Ej: *,0-30,59,*/5" },
      { text: "⌚️ Segundo", id: "second", placeholder: "Ej: *,0-30,59,*/10" },
    ];
    this.$local.progressBarForLoading = NwtProgressBar.create();
  },
  mounted() {
    this.isLoading = false;
  },
});
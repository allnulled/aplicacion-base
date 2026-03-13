NwtResource.define({
  id: "widget/for/agenda/hours-grid",
  apis: [],
  inherits: ["control/trait/for/settings"],
  traits: {},
  settingsSpec: {
    "onChange": {
      "type": Function,
      "default": NwtUtils.noop
    }
  },
  compileView: true,
  view: {
    name: "NwtWidgetForAgendaHoursGrid",
    props: {
      "settings": {
        "type": Object,
        "required": true
      },
      "agenda": {
        "type": Vue,
        "required": true
      }
    },
    template: `
      <div class="nwt_widget_for_agenda_hours_grid">
          Día: {{ $local.selectedDayAsString }}.
          <template v-if="$local.selectedDay">
              Tareas del mes:
              <pre>{{ $local.openedMonthTasks }}</pre>
          </template>
          <template v-if="$local.selectedDay">
              Tareas del dia:
              <pre>{{ $local.selectedDayTasks }}</pre>
          </template>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: widget/for/agenda/hours-grid
      Object.assign(finalData, (function() {
        trace("NwtWidgetForAgendaHoursGrid.data");
        return {};
      }).call(this));
      return finalData;
    },
    methods: {
      "onChangeWrapper": function() {
        trace("NwtWidgetForAgendaHoursGrid.methods.onChangeWrapper");
        // @OK.
      },
      "load": function() {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadDay");
        this.loadDay();
        this.loadTasks();
      },
      "loadDay": function() {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadDay");
        this.$local.selectedDayAsString = this.agenda.$local.controls.day.getSelectedDayFormatted();
        this.$local.selectedDay = NwtTimer.fromStringToDate(this.$local.selectedDayAsString);
      },
      "loadTasks": function() {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadTasks");
        const allJobs = NwtCronManager.global.jobs;
        const tasksOfMonth = {};
        const tasksOfDay = {};
        Iterating_jobs: for (let index = 0; index < allJobs.length; index++) {
          const job = allJobs[index];
          const cronExpression = job.toCronExpression();
          Cuando_son_patrones: if (!cronExpression.isUniqueMoment()) {
            // @TODO: Habría que calcular la siguiente, pero esto en estadio 2.
            continue Iterating_jobs;
          }
          Cuando_coincide_con_el_mes_abierto: if (cronExpression.isSameMonthByDate(this.agenda.$local.controls.day.dateForMonth)) {
            if (!(cronExpression.day in tasksOfMonth)) {
              tasksOfMonth[cronExpression.day] = [];
            }
            tasksOfMonth[cronExpression.day].push(job);
          }
          const selectedDay = this.agenda.$local.controls.day.getSelectedDayAsDate();
          Cuando_coincide_con_el_dia_seleccionado: if (cronExpression.isSameDayByDate(selectedDay)) {
            if (!(cronExpression.hour in tasksOfDay)) {
              tasksOfDay[cronExpression.hour] = [];
            }
            tasksOfDay[cronExpression.hour].push(job);
          }
        }
        // @TODO: coger, del cron, las tareas que coinciden con el día.
        this.$local.selectedDayTasks = tasksOfDay;
        this.$local.openedMonthTasks = tasksOfMonth;
        const monthMarks = NwtObjectUtils.cleanMapByPairs(tasksOfMonth, (k, v) => {
          return [k, v.length];
        });
        this.agenda.$local.controls.day.setMonthMarks(monthMarks);
        this.$forceUpdate(true);
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: widget/for/agenda/hours-grid
      trace("NwtWidgetForAgendaHoursGrid.created");
      NwtVue2.Toolkit.installLocal(this);
      this.$local.selectedDay = undefined;
      this.$local.selectedDayTasks = [];
      this.$local.openedMonthTasks = [];
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: widget/for/agenda/hours-grid
      trace("NwtWidgetForAgendaHoursGrid.mounted");
      this.load();
    },
  }
});
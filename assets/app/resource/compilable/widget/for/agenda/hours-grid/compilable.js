module.exports = {
  id: "widget/for/agenda/hours-grid",
  compile: true,
  compileView: true,
  apis: [],
  inherits: [
    "control/trait/for/settings",
  ],
  settingsSpec: {
    onChange: {
      type: LowCode.type.Function,
      default: LowCode.create("NwtUtils.noop"),
    },
  },
  view: {
    name: "NwtWidgetForAgendaHoursGrid",
    template: $template,
    methods: {
      onChangeWrapper: function () {
        trace("NwtWidgetForAgendaHoursGrid.methods.onChangeWrapper");
        // @OK.
      },
      load: function () {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadDay");
        this.loadDay();
        this.loadTasks();
      },
      loadDay: function () {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadDay");
        this.$local.selectedDayAsString = this.agenda.$local.controls.day.getSelectedDayFormatted();
        this.$local.selectedDay = NwtTimer.fromStringToDate(this.$local.selectedDayAsString);
      },
      loadTasks: function () {
        trace("NwtWidgetForAgendaHoursGrid.methods.loadTasks");
        const tasksOfDay = [];
        // @TODO: coger, del cron, las tareas que coinciden con el día.
        this.$local.selectedDayTasks = tasksOfDay;
        this.$forceUpdate(true);
      },
    },
    watch: {},
    created: function () {
      trace("NwtWidgetForAgendaHoursGrid.created");
      NwtVue2.Toolkit.installLocal(this);
      this.$local.selectedDay = undefined;
      this.$local.selectedDayTasks = [];
    },
    mounted: function () {
      trace("NwtWidgetForAgendaHoursGrid.mounted");
      this.load();
    },
    ///////////////////////////////////
    data: function () {
      trace("NwtWidgetForAgendaHoursGrid.data");
      return {};
    },
    computed: {},
    props: {
      agenda: {
        type: LowCode.type.Vue,
        required: true,
      },
    }
  },
};
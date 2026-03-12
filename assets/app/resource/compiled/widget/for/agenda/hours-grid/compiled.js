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
        const tasksOfDay = [];
        // @TODO: coger, del cron, las tareas que coinciden con el día.
        this.$local.selectedDayTasks = tasksOfDay;
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
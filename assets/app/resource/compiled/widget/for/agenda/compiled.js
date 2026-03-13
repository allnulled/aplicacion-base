NwtResource.define({
  id: "widget/for/agenda",
  apis: [],
  inherits: ["control/trait/for/settings"],
  traits: {},
  compileView: true,
  startDialog: function() {
    trace("@compilable/widget/for/agenda.startDialog");
    return NwtDialogs.openLayout1({
      title: "Agenda",
      body: `<div class="pad_1">
        <nwt-widget-for-agenda :dialog="this" :settings="{}" />
      </div>`,
    });
  },
  view: {
    name: "NwtWidgetForAgenda",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_widget_for_agenda">
          <nwt-view-for-type-day-picker
              :ref="$nwt.Vue2.generateRefCallback(['$local','controls','day'])"
              :settings="{
                  ...settings,
                  isShowingControl: true,
                  onChange: reload,
                  onUpdateMonthMarks: updateMonthMarksHandler,
              }"
          />
          <nwt-widget-for-agenda-hours-grid
              :ref="$nwt.Vue2.generateRefCallback(['$local','controls','hours'])"
              :settings="settings"
              :agenda="this"
          />
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: widget/for/agenda
      Object.assign(finalData, (function() {
        trace("NwtWidgetForAgenda.data");
        return {
          isLoading: true,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "reload": function() {
        trace("NwtWidgetForAgenda.methods.reload");
        this.$local.controls.hours.load();
      },
      "updateMonthMarksHandler": function() {
        trace("NwtWidgetForAgenda.methods.updateMonthMarksHandler");
        this.reload();
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: widget/for/agenda
      trace("NwtWidgetForAgenda.created");
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {
        day: undefined,
        hours: undefined,
      };
    },
    mounted: function() {
      // @COMPILED-BY: control/trait/for/settings
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
      // @COMPILED-BY: widget/for/agenda
      trace("NwtWidgetForAgenda.mounted");
      this.isLoading = false;
    },
  }
});
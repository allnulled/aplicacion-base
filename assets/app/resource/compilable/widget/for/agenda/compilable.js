module.exports = {
  id: "widget/for/agenda",
  compile: true,
  compileView: true,
  apis: [],
  inherits: [
    "control/trait/for/settings",
  ],
  settingsSpec: {},
  view: {
    name: "NwtWidgetForAgenda",
    template: $template,
    methods: {
      reload: function () {
        trace("NwtWidgetForAgenda.methods.reload");
        this.$local.controls.hours.load();
      }
    },
    watch: {},
    created: function () {
      trace("NwtWidgetForAgenda.created");
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {
        day: undefined,
        hours: undefined,
      };
    },
    mounted: function () {
      trace("NwtWidgetForAgenda.mounted");
      this.isLoading = false;
    },
    ///////////////////////////////////
    data: function () {
      trace("NwtWidgetForAgenda.data");
      return {
        isLoading: true,
      };
    },
    computed: {},
    props: {}
  },
  startDialog: function() {
    trace("@widget/for/agenda.startDialog");
    return NwtDialogs.openLayout1({
      title: "Agenda",
      body: `<div class="pad_1">
        <nwt-widget-for-agenda :dialog="this" :settings="{}" />
      </div>`,
    });
  }
};
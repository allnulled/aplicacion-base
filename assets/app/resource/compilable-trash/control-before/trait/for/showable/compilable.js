module.exports = {
  id: "control/trait/for/showable",
  apis: ["trait"],
  traits: {},
  settingsSpec: {
    isShowingControl: {
      type: LowCode.type.Boolean,
      default: true,
    }
  },
  view: {
    data: function() {
      trace("@compilable/control/trait/for/showable.data");
      return {
        isShowingControl: (typeof(this.settings?.isShowingControl) === "boolean" ) ? this.settings.isShowingControl : true,
      };
    },
    methods: {
      showControl: function () {
        trace("@compilable/control/trait/for/showable.methods.showControl");
        this.isShowingControl = true;
      },
      hideControl: function () {
        trace("@compilable/control/trait/for/showable.methods.hideControl");
        this.isShowingControl = false;
      },
      toggleControl: function() {
        trace("@compilable/control/trait/for/showable.methods.toggleControl");
        this.isShowingControl = !this.isShowingControl;
      }
    },
  }
};
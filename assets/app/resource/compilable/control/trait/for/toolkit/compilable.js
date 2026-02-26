module.exports = {
  id: "control/trait/for/toolkit",
  apis: ["trait"],
  traits: {},
  settingsSpec: {},
  view: {
    created() {
      trace("@compilable/control/trait/for/toolkit.created");
      NwtVue2.Toolkit.installToolkit(this);
    },
  }
};
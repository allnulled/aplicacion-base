module.exports = {
  id: "control/trait/for/local",
  apis: ["trait"],
  traits: {},
  settingsSpec: {},
  view: {
    created() {
      trace("@compilable/control/trait/for/local.created");
      NwtVue2.Toolkit.installLocal(this);
    },
  }
};
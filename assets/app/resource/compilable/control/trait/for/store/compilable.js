module.exports = {
  id: "control/trait/for/store",
  apis: ["trait"],
  traits: {},
  settingsSpec: {},
  view: {
    created() {
      trace("@compilable/control/trait/for/store.created");
      NwtVue2.Toolkit.installStore(this);
    },
  }
};
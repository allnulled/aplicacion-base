module.exports = {
  id: "control/trait/for/settings",
  apis: ["trait"],
  traits: {},
  view: {
    props: {
      settings: {
        type: LowCode.create("Object"),
        required: true,
      },
    },
    methods: {
      
    },
    watch: {
      value: function () {
        trace("@compilable/control/trait/for/settings.watch.value");
      },
    },
    mounted: function () {
      trace("@compilable/control/trait/for/settings.mounted");
      NwtPrototyper.initializePropertiesOf(this.settings, this.$options.statically.settingsSpec || {}, `from component «${this.$options.name}»`, false);
    },
  }
};
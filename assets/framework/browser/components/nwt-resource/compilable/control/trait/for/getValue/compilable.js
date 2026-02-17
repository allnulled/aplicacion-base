module.exports = {
  id: "control/trait/for/getValue",
  apis: ["trait"],
  traits: {},
  settingsSpec: {
    initialValue: {
      type: LowCode.type.Any,
    }
  },
  view: {
    props: {
      
    },
    data: function () {
      return {
        value: null,
      }
    },
    methods: {
      getValue: function () {
        trace("@compilable/control/trait/for/getValue.methods.getValue");
      }
    },
    watch: {
      value: function () {
        trace("@compilable/control/trait/for/getValue.watch.value");

      },
      valueOption: function () {
        trace("@compilable/control/trait/for/getValue.watch.valueOption");

      }
    },
    mounted: function () {
      trace("@compilable/control/trait/for/getValue.mounted");
      this.value = this.settings?.initialValue;
    },
  }
};
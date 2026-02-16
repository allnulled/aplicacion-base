module.exports = {
  id: "control/trait/for/getValue",
  apis: ["trait"],
  traits: {
    applyOnGetValue: function() {},
    applyOnFormatValue: function() {},
    applyOnValidateValue: function() {},
  },
  view: {
    props: function () {
      return {
        initialValue: {
          type: [String, Object],
          default: function () { return "" }
        }
      }
    },
    data: async function () {
      return {
        value: this.settings.initialValue,
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
    },
    computed: {
      overriden1: function (newVal, oldVal) {
        trace("@compilable/control/trait/for/getValue.computed.overriden1");
      }
    },
  }
};
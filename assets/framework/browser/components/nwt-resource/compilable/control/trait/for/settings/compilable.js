module.exports = {
  id: "control/trait/for/settings",
  apis: ["trait"],
  traits: {
    validateSettings: function() {

    }
  },
  view: {
    props: {
      initialValue: {
        type: [LowCode.type.String, LowCode.type.Object],
        default: function () { return "" }
      }
    },
    data: async function () {
      return {

      }
    },
    methods: {
      getSettings: function () {
        trace("@compilable/control/trait/for/settings.methods.getSettings");
      }
    },
    watch: {
      value: function () {
        trace("@compilable/control/trait/for/settings.watch.value");

      },
      valueOption: function () {
        trace("@compilable/control/trait/for/settings.watch.valueOption");

      }
    },
    mounted: function () {
      trace("@compilable/control/trait/for/settings.mounted");
    },
    computed: {
      overriden1: function (newVal, oldVal) {
        trace("@compilable/control/trait/for/settings.computed.overriden1");
      }
    },
  }
};
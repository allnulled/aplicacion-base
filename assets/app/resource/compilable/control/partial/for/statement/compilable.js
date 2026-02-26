module.exports = {
  id: "control/partial/for/statement",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [],
  settingsSpec: {},
  view: {
    name: "NwtControlPartialForStatement",
    template: $template,
    props: {
      control: {
        type: LowCode.create("Vue"),
        required: true,
      },
    },
    data: function() {
      return {
        isShowingDescription: false,
      };
    },
    methods: {
      toggleDescription: function() {
        trace("NwtControlPartialForStatement.methods.toggleDescription");
        this.isShowingDescription = !this.isShowingDescription;
      },
      saveValue: function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        const control = this.control;
        const value = control.getValueByState();
        const indexes = control.getIndexForValue();
        control.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        const control = this.control;
        const value = control.getValueByIndex();
        control.setValueByState(value);
      },
      validateValue: function() {
        trace("NwtControlPartialForStatement.methods.validateValue");
        // @TODO: validar el valor sin saber de qué tipo es
      },
      toggleControl: function() {
        trace("NwtControlPartialForStatement.methods.toggleControl");
        this.control.toggleControl();
        this.control.$forceUpdate(true);
      }
    },
    created: function() {
      this.$local = {};
    },
    mounted: function() {
      this.$local.statement = this.control.settings.hasStatement || this.control.settings.rootValueIndex?.concat([]).pop()
      this.$local.description = this.control.settings.hasDescription;
      this.$forceUpdate(true);
    }
  },
};
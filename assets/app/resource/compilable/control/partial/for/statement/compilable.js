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
        return this.control.saveValue();
      },
      loadValue: function() {
        trace("NwtControlPartialForStatement.methods.saveValue");
        return this.control.loadValue();
      },
      validateValue: function() {
        trace("NwtControlPartialForStatement.methods.validateValue");
        return this.control.validateSelfValue();
      },
      toggleControl: function() {
        trace("NwtControlPartialForStatement.methods.toggleControl");
        this.control.toggleControl();
        this.control.$forceUpdate(true);
      },
      minimizeType: function(typeText) {
        trace("NwtControlPartialForStatement.methods.minimizeType");
        return typeText.replace("control/for/type/","").replace("control/for/","");
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
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
      }
    }
  },
};
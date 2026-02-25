module.exports = {
  id: "control/partial/for/error-handler",
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
    name: "NwtControlPartialForErrorHandler",
    template: $template,
    props: {
      control: {
        type: LowCode.create("Vue"),
        required: true,
      },
    },
    methods: {
      
    }
  },
};
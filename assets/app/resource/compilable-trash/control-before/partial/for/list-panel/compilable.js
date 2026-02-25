module.exports = {
  id: "control/partial/for/list-panel",
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
    name: "NwtControlPartialForListPanel",
    template: $template,
    props: {
      control: {
        type: LowCode.create("Vue"),
        required: true,
      },
      valueFactory: {
        type: LowCode.type.Function,
        default: () => ({})
      }
    },
  },
};
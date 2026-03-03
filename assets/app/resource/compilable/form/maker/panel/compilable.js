module.exports = {
  id: "form/maker/panel",
  apis: ["trait", "control", "validation"],
  compile: true,
  compileView: true,
  view: {
    name: "NwtFormMakerPanel",
    template: $template,
    props: {
      viewer: {
        type: LowCode.type.Vue,
        required: true,
      },
      side: {
        type: LowCode.type.String,
        required: true,
      }
    },
  }
};
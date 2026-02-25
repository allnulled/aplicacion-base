module.exports = {
  id: "form/maker/viewer",
  apis: ["trait", "control", "validation"],
  compile: true,
  compileView: true,
  traits: {},
  settingsSpec: {
    
  },
  view: {
    name: "NwtFormMakerViewer",
    template: $template,
    props: {
      settings: {
        type: LowCode.type.Object,
        required: true,
      }
    },
    computed: {},
    methods: {},
    created() {
      trace("NwtFormMakerViewer.created");
      NwtVue2.Toolkit.installToolkit(this);
    },
    mounted() {
      trace("NwtFormMakerViewer.mounted");
      window.fmk = this;
    },
  }
};
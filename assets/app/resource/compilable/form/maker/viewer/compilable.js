module.exports = {
  id: "form/maker/viewer",
  apis: ["trait", "control", "validation"],
  compile: true,
  compileView: true,
  traits: {},
  settingsSpec: {
    initialValue: {
      type: LowCode.type.Any,
      required: true,
    }
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
    data: function() {
      return {
        
      };
    },
    computed: {},
    methods: {
      getValue: function(key = []) {
        return this.$store.get(key);
      },
      setValue: function(key, value) {
        return this.$store.set(key, value);
      }
    },
    created() {
      trace("NwtFormMakerViewer.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      NwtVue2.Toolkit.installStore(this);
      this.$store.set([], this.settings.initialValue);
    },
    mounted() {
      trace("NwtFormMakerViewer.mounted");
      window.fmk = this;
    },
  }
};
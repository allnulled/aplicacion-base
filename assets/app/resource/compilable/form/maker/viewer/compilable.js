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
        trace("@compilable/form/maker/viewer.view.methods.getValue");
        return this.$store.get(key);
      },
      setValue: function(key, value) {
        trace("@compilable/form/maker/viewer.view.methods.setValue");
        return this.$store.set(key, value);
      },
      toggleAll: function() {
        trace("@compilable/form/maker/viewer.view.methods.toggleAll");
        this.$refs.mainControl.toggleControl();
      },
      closeForm: function() {
        trace("@compilable/form/maker/viewer.view.methods.closeForm");
      },
      submitForm: function() {
        trace("@compilable/form/maker/viewer.view.methods.submitForm");

      }
    },
    created() {
      trace("NwtFormMakerViewer.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      NwtVue2.Toolkit.installStore(this);
      this.$store.set([], this.settings.initialValue);
      // Compile schema already:
      this.$schema = NwtPropagableStore.create(this.settings);
    },
    mounted() {
      trace("NwtFormMakerViewer.mounted");
      NwtStatic.api.control.validation.validateControlSchema(this.settings);
      window.fmk = this;
    },
  }
};
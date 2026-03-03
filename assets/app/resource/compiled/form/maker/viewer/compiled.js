NwtResource.define({
  id: "form/maker/viewer",
  apis: ["trait", "control", "validation"],
  traits: {},
  settingsSpec: {
    "initialValue": {
      "type": [String, Boolean, Number, Object, Array, Function, undefined, null],
      "required": true
    }
  },
  compileView: true,
  view: {
    name: "NwtFormMakerViewer",
    props: {
      "settings": {
        "type": Object,
        "required": true
      }
    },
    template: `
      <div class="nwt_form_maker_viewer">
          <nwt-form-maker-panel :viewer="this" side="top" />
          <component v-if="settings.type"
              ref="mainControl"
              :is="$toolkit.getComponentNameBySettings(settings)"
              :settings="{
                  ...settings,
                  isShowingControl: true,
                  rootValueIndex: [],
                  rootSchemaIndex: [],
                  rootComponentIndex: [],
              }" />
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: form/maker/viewer
      Object.assign(finalData, (function() {
        return {};
      }).call(this));
      return finalData;
    },
    methods: {
      "getValue": function(key = []) {
        trace("@compilable/form/maker/viewer.view.methods.getValue");
        return this.$store.get(key);
      },
      "setValue": function(key, value) {
        trace("@compilable/form/maker/viewer.view.methods.setValue");
        return this.$store.set(key, value);
      },
      "toggleAll": function() {
        trace("@compilable/form/maker/viewer.view.methods.toggleAll");
        this.$refs.mainControl.toggleControl();
      },
      "closeForm": function() {
        trace("@compilable/form/maker/viewer.view.methods.closeForm");
      },
      "submitForm": function() {
        trace("@compilable/form/maker/viewer.view.methods.submitForm");
      }
    },
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: form/maker/viewer
      trace("NwtFormMakerViewer.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      NwtVue2.Toolkit.installStore(this);
      this.$store.set([], this.settings.initialValue);
      // Compile schema already:
      this.$schema = NwtPropagableStore.create(this.settings);
    },
    mounted: function() {
      // @COMPILED-BY: form/maker/viewer
      trace("NwtFormMakerViewer.mounted");
      NwtStatic.api.control.validation.validateControlSchema(this.settings);
      window.fmk = this;
    },
  }
});
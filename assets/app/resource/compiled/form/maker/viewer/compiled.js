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
          <component
              v-if="settings.type"
              :is="$toolkit.getComponentNameBySettings(settings)"
              :settings="{
                  ...settings,
                  isRoot: true,
                  rootValueIndex: [],
                  rootSchemaIndex: [],
              }"
          />
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
        return this.$store.get(key);
      },
      "setValue": function(key, value) {
        return this.$store.set(key, value);
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
    },
    mounted: function() {
      // @COMPILED-BY: form/maker/viewer
      trace("NwtFormMakerViewer.mounted");
      window.fmk = this;
    },
  }
});
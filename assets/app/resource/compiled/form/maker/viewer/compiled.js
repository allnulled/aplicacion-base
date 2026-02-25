NwtResource.define({
  id: "form/maker/viewer",
  apis: ["trait", "control", "validation"],
  traits: {},
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
                  rootValue: settings.initialValue || {},
                  rootValueIndex: [],
              }"
          />
      </div>`,
    data: function() {
      const finalData = {};
      return finalData;
    },
    methods: {},
    computed: {},
    watch: {},
    created: function() {
      // @COMPILED-BY: form/maker/viewer
      trace("NwtFormMakerViewer.created");
      NwtVue2.Toolkit.installToolkit(this);
    },
    mounted: function() {
      // @COMPILED-BY: form/maker/viewer
      trace("NwtFormMakerViewer.mounted");
      window.fmk = this;
    },
  }
});
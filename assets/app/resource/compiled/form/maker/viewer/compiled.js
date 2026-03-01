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
          <div class="flex_row centered">
              <div class="flex_1">
                  <button class="mini fluid" v-on:click="toggleAll">🔸*️⃣</button>
              </div>
              <div class="flex_100 pad_left_1">{{ settings.hasTitle || "Formulario" }}</div>
          </div>
          <component
              v-if="settings.type"
              ref="mainControl"
              :is="$toolkit.getComponentNameBySettings(settings)"
              :settings="{
                  ...settings,
                  isShowingControl: true,
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
      },
      "toggleAll": function() {
        this.$refs.mainControl.toggleControl();
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
      console.log(this.settings);
      NwtStatic.api.control.validation.validateControlSchema(this.settings);
      window.fmk = this;
    },
  }
});
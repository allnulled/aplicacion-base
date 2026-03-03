NwtResource.define({
  id: "form/maker/panel",
  apis: ["trait", "control", "validation"],
  traits: {},
  compileView: true,
  view: {
    name: "NwtFormMakerPanel",
    props: {
      "viewer": {
        "type": Vue,
        "required": true
      },
      "side": {
        "type": String,
        "required": true
      }
    },
    template: `
      <div class="nwt_form_maker_panel flex_row centered">
          <template v-if="side === 'top'">
              <div class="flex_1">
                  <button class="mini fluid nowrap width_100 text_align_left"
                      v-on:click="viewer.toggleAll">🔸* </button>
              </div>
              <div class="flex_100 pad_left_1">
                  {{ viewer.settings.hasTitle || "Formulario" }}
              </div>
          </template>
          <div v-else class="flex_100"></div>
          <div class="flex_1">
              <button class="mini fluid nowrap"
                  v-on:click="viewer.closeForm">❌ Cancelar</button>
          </div>
          <div class="flex_1">
              <button class="mini fluid nowrap"
                  v-on:click="viewer.submitForm">⚡️ Aceptar</button>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      return finalData;
    },
    methods: {},
    computed: {},
    watch: {},
  }
});
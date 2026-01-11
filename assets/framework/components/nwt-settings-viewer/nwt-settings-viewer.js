/**
 * 
 * # Nwt Settings Viewer API / Componente Vue2
 * 
 * La Nwt Settings Viewer API permite sincronizar un widget gráfico con una instancia de `NwtSettings`.
 * 
 * ## Exposición
 * 
 * La API se expone a través del componente Vue2:
 * 
 * ```js
 * Vue.options.components.NwtSettingsViewer
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```html
 * <nwt-settings-viewer :settings="settings" :dialog="this" />
 * ```
 * 
 * Donde `dialog` tiene que ser una instancia de `NwtDialog`, pero dentro de la template del diálogo la accedemos con el `this`:
 * 
 * ```js
 * this.$dialogs.open({
 *   title: "Configuraciones globales",
 *   template: `<nwt-settings-viewer :settings="$nwt.Settings.global" :dialog="this" />`,
 * });
 * ```
 * 
 * Donde `settings` tiene que ser una instancia de `NwtSettings`.
 * 
 * Por ejemplo:
 * 
 * ```js
 * NwtSettings.global // instancia
 * ```
 * 
 * Se enciende un NwtSettingsViewer si pulsas ALT+L.
 * 
 */
Vue.component("NwtSettingsViewer", {
  template: $template,
  props: {
    settings: {
      type: Object,
      default: function() {
        return NwtSettings.global;
      }
    },
    dialog: {
      type: Object,
      required: true
    }
  },

  data() {
    trace("NwtSettingsViewer.data");
    return {
      state: "done", // also: "done", "searching"
      searchFilter: "",
      searchTimeout: false,
      allSettings: false,
      settingsObject: false,
    };
  },

  methods: {
    async reload() {
      trace("NwtSettingsViewer.methods.reload");
      await this.settings.load();
      this.allSettings = this.settings.$data;
      const filteredObject = NwtUtils.filterObjectProperties(this.allSettings, (key, value) => {
        return (key.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1) || (value.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1);
      });
      this.settingsObject = NwtUtils.sortObjectByKeys(filteredObject);
      this.state = "done";
      this.$forceUpdate(true);
    },
    async createNewSetting() {
      trace("NwtSettingsViewer.methods.createNewSetting");
      const settingId = await this.dialog.subdialog({
        title: "Nombre de la configuración",
        template: `<div class="pad_2">
          <div>El nombre de la configuración no se puede cambiar más adelante:</div>
          <input class="width_100" type="text" v-model="value" v-on:keypress.enter="() => accept()" />
          <hr/>
          <div class="flex_row text_align_right">
            <div class="flex_100"></div>
            <div class="flex_1 pad_left_1">
              <button v-on:click="() => accept()">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_1">
              <button v-on:click="() => cancel()">Cancelar</button>
            </div>
          </div>
        </div>`
      });
      if(typeof settingId !== "string") {
        return false;
      }
      await this.settings.set(settingId, "");
      await this.reload();
    },
    async editSetting(settingId, settingData) {
      trace("NwtSettingsViewer.methods.editSetting");
      const answer = await this.dialog.subdialog({
        title: "Cambiando valor de configuración",
        template: `<div class="pad_2">
          <div>Cambia el valor de la configuración «{{ settingId }}»:</div>
          <textarea class="width_100" v-model="value" spellcheck="false"></textarea>
          <hr />
          <div class="flex_row">
            <div class="flex_100"></div>
            <div class="flex_1">
              <button class="" v-on:click="() => accept(value)">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_2">
              <button class="" v-on:click="() => cancel()">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            settingId,
            value: typeof settingData === "string" ? settingData : NwtUtils.jsonify(settingData),
          }
        }
      });
      if(!answer) {
        return;
      }
      await this.settings.set(settingId, answer);
      await this.reload();
    },
    async deleteSetting(settingId) {
      trace("NwtSettingsViewer.methods.deleteSetting");
      const answer = await this.dialog.subdialog({
        title: "Eliminando configuración",
        template: `<div class="pad_2">
          <div>¿Seguro que quieres eliminar la configuración «{{ settingId }}»?</div>
          <hr />
          <div class="flex_row">
            <div class="flex_100"></div>
            <div class="flex_1">
              <button class="" v-on:click="() => accept(true)">Aceptar</button>
            </div>
            <div class="flex_1 pad_left_2">
              <button class="" v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        </div>`,
        factory: {
          data: {
            settingId,
          }
        }
      });
      if(!answer) {
        return;
      }
      await this.settings.delete(settingId);
      await this.reload();
    },
    async save() {
      trace("NwtSettingsViewer.methods.save");
      await this.settings.save();
    },
    delayedSearch() {
      trace("NwtSettingsViewer.methods.delayedSearch");
      this.state = "searching";
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.reload();
      }, 1000);
    },
  },

  async mounted() {
    trace("NwtSettingsViewer.mounted");
    await this.reload();
  }

});

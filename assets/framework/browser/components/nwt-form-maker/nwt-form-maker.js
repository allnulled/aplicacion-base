(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormMaker'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormMaker'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormMaker = class {

    static dialog = {
      fromSchema: (settings = {}, data = {}, title = "FormMaker") => {
        trace("NwtFormMaker.dialog.edit");
        return NwtDialogs.open({
          title: title,
          windowClasses: "no_scroll",
          template: `
            <nwt-basic-dialog-layout>
                <template v-slot:header>
                    <div class="title">{{ settings.hasTitle || "Formulario espontáneo" }}</div>
                </template>
                <template v-slot:body>
                  <div class="pad_1">
                    <nwt-form-maker-viewer :settings="settings" ref="form" />
                  </div>
                </template>
                <template v-slot:footer>
                    <hr/>
                    <div class="flex_row pad_1">
                      <div class="flex_100"></div>
                      <div class="flex_1 pad_left_1">
                        <button class="mini" v-on:click="cancel">Cancelar</button>
                      </div>
                      <div class="flex_1 pad_left_1">
                        <button class="mini" v-on:click="() => accept($refs.form.getValue())">Aceptar</button>
                      </div>
                    </div>
                </template>
            </nwt-basic-dialog-layout>
          `,
          factory: {
            data() {
              return {
                settings: {
                  ...settings,
                  dialog: this,
                  initialValue: data
                }
              };
            }
          }
        });
      }
    };

    static getIndexToString(anyIndexes) {
      if (anyIndexes.length === 0) return "";
      return ` at index «${anyIndexes.join(".")}»`;
    }

  };

  return NwtFormMaker;

});
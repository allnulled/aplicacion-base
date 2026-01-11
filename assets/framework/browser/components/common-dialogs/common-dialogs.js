/**
 * 
 * # Nwt Dialogs API
 * 
 * ## Exposición
 * 
 * Está expuesta en las globales:
 * 
 * ```js
 * CommonDialogs
 * NwtDialogs
 * NwtFramework.Dialogs
 * Vue.prototype.$nwt.Dialogs
 * Vue.prototype.$dialogs
 * ```
 * 
 * ## Crear un diálogo con formulario y extraer la respuesta
 * 
 * ```js
 * const respuesta = await CommonDialogs.open({
 *   title: "Formulario simple",
 *   template: `
 *     <div>
 *       <input type="text" v-model="user" />
 *       <input type="password" v-model="password" />
 *       <hr/>
 *       <button v-on:click="() => accept({ user, password })">Aceptar</button>
 *       <button v-on:click="cancel">Cancelar</button>
 *     </div>
 *   `,
 *   factory: {
 *     data: {
 *       user: "",
 *       password: "",
 *     }
 *   }
 * });
 * ```
 * 
 * Este componente, que se inyecta en el root de la aplicación, inyecta un evento para CTRL+SUPR que muestra un `NwtProcessManagerViewer` mediante un diálogo.
 * 
 */
Vue.component("CommonDialogs", {
  template: $template,
  props: {},
  data() {
    trace("CommonDialogs.data");
    return {
      isLoaded: false,
      processManager: NwtProcessManager.dialogs,
    };
  },
  methods: {
    open(userDialogDefinition) {
      trace("CommonDialogs.methods.open");
      const dialogDefinition = NwtDialogDefinition.create(userDialogDefinition);
      return dialogDefinition.$state.promise;
    },
    subdialog(userDialogDefinition) {
      trace("CommonDialogs.methods.subdialog");
      return this.open(userDialogDefinition);
    },
    closeDialog(currentProcess) {
      trace("CommonDialogs.methods.closeDialog");
      currentProcess.close();
      currentProcess.dialog.cancel();
    },
    focusDialog(currentProcess) {
      trace("CommonDialogs.methods.focusDialog");
      for (let index = 0; index < this.processManager.$list.length; index++) {
        const it = this.processManager.$list[index];
        it.dialog.deepness--;
      }
      currentProcess.dialog.deepness = 101;
    },
    minimizeDialog(currentProcess) {
      trace("CommonDialogs.methods.minimizeDialog");
      currentProcess.hide();
    },
    maximizeDialog(currentProcess) {
      trace("CommonDialogs.methods.maximizeDialog");
      currentProcess.show();
    },
  },
  mounted() {
    trace("CommonDialogs.mounted");
    NwtGlobalizer.exportTo("CommonDialogs", this);
    NwtGlobalizer.exportTo("NwtDialogs", this);
    Vue.prototype.$dialogs = this;
    this.isLoaded = true;
  }
})
/**
 * 
 * # Common Dialogs
 * 
 * Componente para diálogos. Permite usar diálogos programáticamente.
 * 
 * ## Especificaciones
 * 
 * Este componente vue2 se debe inyectar 1 sola vez, globalmente, en la aplicación.
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
 * ## API de diálogos
 * 
 * A continuación se explican los métodos disponibles desde el objeto `NwtDialogs` / `CommonDialogs`.
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
    /**
     * 
     * ### `NwtDialogs.open(definition:Object)`
     * 
     * Este método llamará a `NwtDialogDefinition.create(definition)` y devolverá la promesa que devuelve el valor del diálogo.
     * 
     * Esa promesa se cumple cuando se llama a `accept` o `cancel` desde el diálogo mismo, métodos que se inyectan automáticamente y están disponibles desde la plantilla del diálogo directamente.
     * 
     * Para más información, buscar en la documentación la interfaz `NwtDialogDefinition` y saber las opciones del parámetro `definition:Object`.
     * 
     * 
     */
    open(userDialogDefinition) {
      trace("CommonDialogs.methods.open");
      const dialogDefinition = NwtDialogDefinition.create(userDialogDefinition);
      return dialogDefinition.$state.promise;
    },
    /**
     * 
     * ### `NwtDialogs.confirm(definition:Object|String)`
     * 
     * Imita a window.confirm pero hace el bridge completo mediante el método `openLayout1`.
     * 
     */
    confirm(userDialogDefinition) {
      trace("CommonDialogs.methods.confirm");
      // Shortcut con string directo:
      if(typeof userDialogDefinition === "string") {
        return this.confirm({
          title: "Confirmar",
          template: userDialogDefinition,
        });
      }
      return this.openLayout1({
        ...userDialogDefinition,
        header: `<div class="title">${userDialogDefinition.title}</div>`,
        body: `<div class="pad_1">
          ${userDialogDefinition.template}
        </div>`,
        footer: `<div class="flex_row centered pad_1">
          <div class="flex_100"></div>
          <div class="flex_1 pad_left_1">
            <button v-on:click="() => accept(true)">Aceptar</button>
          </div>
          <div class="flex_1 pad_left_1">
            <button v-on:click="() => accept(false)">Cancelar</button>
          </div>
        </div>`,
      })
    },
    /**
     * 
     * ### `NwtDialogs.alert(definition:Object|String)`
     * 
     * Imita a window.alert pero hace el bridge completo mediante el método `openLayout1`.
     * 
     */
    alert(userDialogDefinition) {
      trace("CommonDialogs.methods.alert");
      // Shortcut con string directo:
      if(typeof userDialogDefinition === "string") {
        return this.alert({
          title: "Alerta",
          template: userDialogDefinition,
        });
      }
      return this.openLayout1({
        ...userDialogDefinition,
        header: `<div class="title">${userDialogDefinition.title}</div>`,
        body: `<div class="pad_1">
          ${userDialogDefinition.template}
        </div>`,
        footer: `<div class="flex_row centered pad_1">
          <div class="flex_100"></div>
          <div class="flex_1 pad_left_1">
            <button v-on:click="() => accept(true)">Aceptar</button>
          </div>
        </div>`,
      })
    },
    /**
     * 
     * ### `NwtDialogs.text(definition:Object|String)`
     * 
     * Imita a window.prompt pero hace el bridge completo mediante el método `openLayout1`.
     * 
     */
    text(userDialogDefinition) {
      trace("CommonDialogs.methods.text");
      // Shortcut con string directo:
      if(typeof userDialogDefinition === "string") {
        return this.alert({
          title: "Entrada de texto",
          template: userDialogDefinition,
        });
      }
      return this.openLayout1({
        ...userDialogDefinition,
        header: `<div class="title">${userDialogDefinition.title}</div>`,
        body: `<div class="pad_1">
          ${userDialogDefinition.template}
          <hr/>
          <textarea class="width_100" v-model="value"></textarea>
        </div>`,
        footer: `<div class="flex_row centered pad_1">
          <div class="flex_100"></div>
          <div class="flex_1 pad_left_1">
            <button v-on:click="accept">Aceptar</button>
          </div>
          <div class="flex_1 pad_left_1">
            <button v-on:click="cancel">Cancelar</button>
          </div>
        </div>`,
      })
    },
    /**
     * 
     * ### `NwtDialogs.openLayout1(definition:Object)`
     * 
     * Este método no pide la propiedad `template` (lo ignorará) pero obliga a proporcionar las propiedades:
     * 
     * - `header:String` (opcional)
     * - `body:String` (requerido)
     * - `footer:String` (opcional)
     * 
     * Y así conseguir el layout básico de diálogos mediante función js.
     * 
     */
    openLayout1(userDialogDefinition) {
      trace("CommonDialogs.methods.openLayout1");
      Patch_header_and_footer_to_be_ignored_if_falsy: {
        if(!userDialogDefinition.header) userDialogDefinition.header = "";
        if(!userDialogDefinition.footer) userDialogDefinition.footer = "";
      }
      assertion(typeof userDialogDefinition.header === "string", "Parameter «header» must be string on «CommonDialogs.methods.openLayout1»");
      assertion(typeof userDialogDefinition.body === "string", "Parameter «body» must be string on «CommonDialogs.methods.openLayout1»");
      assertion(typeof userDialogDefinition.footer === "string", "Parameter «footer» must be string on «CommonDialogs.methods.openLayout1»");
      const { header, body, footer } = userDialogDefinition;
      const template = `
        <nwt-basic-dialog-layout>
          ${header ? "<template v-slot:header>" + header +  "</template>" : ""}
          <template v-slot:body>
            ${body}
          </template>
          ${footer ? "<template v-slot:footer>" + footer +  "</template>" : ""}
        </nwt-basic-dialog-layout>
      `;
      return this.open({
        ...userDialogDefinition,
        windowClasses: "no_scroll",
        template,
      });
    },
    /**
     * 
     * ### `NwtDialogs.openByTemplateId(definition:Object)`
     * 
     * Este método difiere con `open` en 2 cosas:
     * 
     * - El parámetro `template` de la `definition:Object` no es el string de la plantilla, sino el string del fichero que contiene la plantilla.
     *    - El parámetro `template` utiliza la raíz de `assets/framework/browser/dialog-templates/${template}` para saber a qué fichero está apuntando el parámetro.
     *    - En el fichero, solo se acepta HTML, nada de JS ni CSS: solo dice dónde está la plantilla
     * - Se inyecta automáticamente, si no se sobreescribe, el parámetro `windowClasses: "no_scroll"`.
     *    - Esto pasa para que se pueda utilizar el patrón CSS del `dialog_layout`, que permite un header y un footer fijos en el diálogo, y que el contenido sea scrolleable.
     *    - Para ver un ejemplo de implementación, puedes ir a `assets/framework/browser/dialog-templates/examples/ejemplo-panel-fijo-limpio.html`, donde se utilizan las clases/estructura:
     *       - `.dialog_container`
     *       - `.dialog_container > .dialog_structure`
     *       - `.dialog_container > .dialog_structure > .dialog_header`
     *       - `.dialog_container > .dialog_structure > .dialog_body`
     *       - `.dialog_container > .dialog_structure > .dialog_body > .dialog_content`
     *       - `.dialog_container > .dialog_structure > .dialog_footer`
     * 
     * Este método, por tanto, usa `readFile` para conocer la plantilla.
     * 
     * Por lo demás, funciona exactamente igual que `open`.
     * 
     */
    openByTemplateId(userDialogDefinition) {
      trace("CommonDialogs.methods.openByTemplateId");
      const templateId = userDialogDefinition.template;
      const templatePath = NwtPaths.global.relative("assets/framework/browser/dialog-templates/", templateId);
      return new Promise((resolve, reject) => {
        require("fs").readFile(templatePath, "utf8", (error, templateContents) => {
          if(error) {
            return reject(error);
          }
          const normalizedDialogDefinition = Object.assign({
            windowClasses: "no_scroll", // En las template-id se inyecta por defecto el no_scroll
          }, userDialogDefinition, {
            template: templateContents
          });
          const dialogDefinition = NwtDialogDefinition.create(normalizedDialogDefinition);
          return resolve(dialogDefinition.$state.promise);
        });
      });
    },
    /**
     * 
     * ### `NwtDialogs.subdialog(definition:Object)` 
     *  
     * Este método no crea un subdiálogo (sino un diálogo normal, sin padre), porque no hay un diálogo padre conocido, se está usando el manager de los diálogos.
     * 
     * Su razón de existir es homogeneizar la llamada de `dialog.subdialog` y `manager.open/manager.subdialog`.
     * 
     * Esto es útil en la API de procesos. Pero si no hay necesidad, no debería usarse este método, sino `open` o `openByTemplateId`.
     * 
     * Es un método de uso interno principalmente, y su intención es solo homogeneizar.
     * 
     */
    subdialog(userDialogDefinition) {
      trace("CommonDialogs.methods.subdialog");
      return this.open(userDialogDefinition);
    },
    /**
     * 
     * ### `NwtDialogs.closeDialog(process:NwtProcess)`
     * 
     * Sirve para cerrar diálogos activos. Requiere del objeto `NwtProcess`.
     * 
     */
    closeDialog(currentProcess) {
      trace("CommonDialogs.methods.closeDialog");
      currentProcess.close();
      currentProcess.dialog.cancel();
    },
    /**
     * 
     * ### `NwtDialogs.focusDialog(process:NwtProcess)`
     * 
     * Sirve para poner en el foco un diálogo activo. Requiere del objeto `NwtProcess`.
     * 
     */
    focusDialog(currentProcess) {
      trace("CommonDialogs.methods.focusDialog");
      for (let index = 0; index < this.processManager.$list.length; index++) {
        const it = this.processManager.$list[index];
        it.dialog.deepness--;
      }
      currentProcess.dialog.deepness = 101;
    },
    /**
     * 
     * ### `NwtDialogs.minimizeDialog(process:NwtProcess)`
     * 
     * Sirve para minimizar un diálogo activo. Requiere del objeto `NetProcess`.
     * 
     */
    minimizeDialog(currentProcess) {
      trace("CommonDialogs.methods.minimizeDialog");
      currentProcess.hide();
    },
    /**
     * 
     * ### `NwtDialogs.maximizeDialog(process:NwtProcess)`
     * 
     * Sirve para maximizar (dejar de ocultar y poner en el foco) un diálogo activo. Requiere del objeto `NwtProcess`.
     * 
     */
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
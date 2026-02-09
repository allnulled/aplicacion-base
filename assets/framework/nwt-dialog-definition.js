/**
 * 
 * # Nwt Dialog Definition API
 * 
 * Permite crear definiciones abstractas de diálogos.
 * 
 * Es una API de uso interno, pero muy importante porque se instancia en la creación de diálogos.
 * 
 * Sirve para vincular:
 * 
 *  - `$original`: Definición de usuario de diálogo
 *  - `$factory`: Definición validada de diálogo
 *  - `$process`: Proceso representativo del diálogo, instancia de `NwtProcess`
 *  - `$state`: El `Promise.withResolvers()` del diálogo
 * 
 *  
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtDialogDefinition
 * NwtFramework.DialogDefinition
 * Vue.prototype.$nwt.DialogDefinition
 * ```
 * 
 * ## Ventajas
 * 
 * Permite crear definiciones de diálogo validadas:
 * 
 * ```js
 * const dialogDefinition = NwtDialogDefinition.create({
 *   // Parámetros principales:
 *   title: "Título del diálogo",
 *   template: `
 *     <div>
 *       <div>En el body del diálogo</div>
 *       <div class="flex_row">
 *         <div class="flex_100"></div>
 *         <div class="flex_1"><button v-on:click="accept">Aceptar</button></div>
 *         <div class="flex_1"><button v-on:click="cancel">Cancelar</button></div>
 *       </div>
 *     </div>
 *   `,
 *   factory: {
 *     data: {
 *       // El `data` también puede ser una función que devuelva un objeto, como normalmente sería.
 *       // Se inyectan automáticamente algunas propiedades en el data:
 *       // 
 *       // value:        "", // Por defecto, value es un String vacío
 *       // deepness:     101, // Este valor se usa como z-index y sirve para poder tener varios diálogos simultáneos, con profundidad
 *       // state:        ..., // El `Promise.withResolvers()` del diálogo/proceso, su `promise` es lo que se devuelve cuando haces `await NwtDialogs.open(...)`
 *       // process:      ..., // El `NwtProcess` correspondiente al diálogo, el cual tendrá en `nwtProcess.dialog` el componente de diálogo (no la instancia de `NwtDialogDefinition`, cuidado ahí)
 *       // definition:   ..., // El `NwtDialogDefinition`, que contiene `$original`, `$factory`, `$process` y `$state`
 *       // isMinimized:  false, // Flag que indica si el diálogo está minimizado o no. La minimización solo aplica un `v-show`, nunca `v-if`
 *       // 
 *     },
 *     methods: {
 *       // Se inyectan automáticamente algunos métodos:
 *       // 
 *       // accept: function(valor) {...}, // Cierra el diálogo y devuelve el valor especificado, o `this.value` en su defecto. Si valor es `instanceof Event`, devolverá el `this.value` igual (así se puede hacer `v-on:click="accept", más cómodo)
 *       // cancel: function() {...}, // Cierra el diálogo y devuelve `undefined`
 *       // minimize: function() {...}, // Minimiza el diálogo
 *       // maximize: function() {...}, // Maximiza el diálogo
 *       // subdialog: function() {...}, // Crea un subdiálogo (pasándole el `parent: this.process` automáticamente) usando el método `NwtDialogs.open`
 *       // subdialogByTemplateId: function() {...}, // igual, pero usando el método `NwtDialogs.openByTemplateId` en su lugar
 *       // 
 *     },
 *     watch: {},
 *     created: {},
 *     mounted: {},
 *     ...
 *   },
 *   // Parámetros avanzados (opcionales):
 *   parent: nwtProcessInstance, // Proceso (**no diálogo, cuidado**) padre, para que al cerrarse, cierre a este (**proceso, no diálogo**) hijo también.
 *   windowClasses: "no_scroll", // Clases que se quieren inyectar en `.window`
 * });
 * ```
 * 
 * Esto nos permite luego acceder a:
 * 
 * ```js
 * dialogDefinition.$original; // Parámetros originales
 * dialogDefinition.$factory; // Parámetros finales
 * dialogDefinition.$process; // Proceso vinculado al diálogo
 * dialogDefinition.$state; // Es un `Promise.withResolvers()`: `resolve`, `reject` y `promise` están dentro.
 * await CommonDialogs.open(dialogDefinition.$factory); // aunque esto no está pensado para usarse así, sino que directamente le proporcionarías el objeto de definición. Pero internamente, hará esto.
 * ```
 * 
 * Es una interfaz interna, pero su construcción se utiliza en el proceso de `NwtDialogs.open` y `NwtDialogs.openByTemplateId`, por lo cual aunque no se interactúe directamente con ella, es una interfaz importante dentro del framework, y hay que entenderla para poder explotar los diálogos al máximo.
 * 
 * Los parámetros estrictamente necesarios para la instanciación solo son:
 * 
 *  - `template:String`
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDialogDefinition'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDialogDefinition'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtDialogDefinition = class {

    static create(...args) {
      trace("NwtDialogDefinition.create");
      return new this(...args);
    }

    constructor(userDialogDefinition = {}) {
      trace("NwtDialogDefinition.constructor");
      this.$original = userDialogDefinition;
      this.$factory = {};
      this.$process = null;
      this.$state = null;
      this.validate();
    }

    fillBasics() {
      trace("NwtDialogDefinition.prototype.fillBasics");
      const that = this;
      Fill_original: {
        if (typeof this.$original !== "object") {
          throw new Error("Parameter «definition» must be an object on «NwtDialogDefinition.prototype.fillBasics»");
        }
      }
      Fill_original_title: {
        if (typeof this.$original.title === "undefined") {
          this.$original.title = "Sin título";
        }
        if (typeof this.$original.title !== "string") {
          throw new Error("Parameter «definition.title» must be a string on «NwtDialogDefinition.prototype.fillBasics»");
        }
      }
      Fill_original_template: {
        if (typeof this.$original.template === "undefined") {
          throw new Error("Parameter «definition.template» must be a string on a dialog definition on «NwtDialogDefinition.prototype.fillBasics»");
        }
        this.$factory.template = this.$original.template;
      }
      Fill_state: {
        this.$state = Promise.withResolvers();
      }
      Fill_process: {
        this.$process = NwtProcess.create({
          id: this.$original.title,
          manager: NwtProcessManager.dialogs,
          definition: this,
          parent: this.$original.parent || null,
        });
      }
      Fill_factory: {
        if (typeof this.$factory === "undefined") {
          this.$factory = this.$original.factory || {};
        } else if (typeof this.$factory !== "object") {
          throw new Error("Parameter «definition.factory» must be an object on «NwtDialogDefinition.prototype.fillBasics»");
        }
      }
      Fill_factory_name: {
        this.$factory.name = "AnonymousDialog" + NwtRandomizer.fromAlphabet(10);
      }
      Fill_factory_data: {
        this.$factory.data = function () {
          trace("NwtDialogDefinition.$factory.data");
          const userData = (() => {
            if (typeof that.$original.factory?.data === "function") {
              return that.$original.factory.data.call(this);
            } else if (typeof that.$original.factory?.data === "object") {
              return Object.assign({}, that.$original.factory.data);
            } else {
              return {};
            }
          })();
          if (typeof userData.definition !== "undefined") {
            throw new Error("Parameter «definition.factory.data.definition» cannot be fulfilled on a dialog definition on «NwtDialogDefinition.prototype.fillBasics»");
          }
          const finalData = Object.assign({}, {
            // 1. Propiedades sobreescribibles:
            value: "",
          }, {
            // 2. Propiedades no sobreescribibles:
            deepness: 101,
          }, userData, {
            state: that.$state,
            process: that.$process,
            definition: that,
            isMinimized: false,
          });
          return finalData;
        }
      }
      Fill_factory_methods: {
        this.$factory.methods = Object.assign({}, this.$original.factory?.methods || {}, {
          subdialog: function (obj) {
            trace("NwtDialogDefinition.$factory.methods.subdialog");
            return NwtDialogs.open({ ...obj, parent: this.process });
          },
          subdialogByTemplateId: function (obj) {
            trace("NwtDialogDefinition.$factory.methods.subdialog");
            return NwtDialogs.openByTemplateId({ ...obj, parent: this.process });
          },
          accept: function (val) {
            trace("NwtDialogDefinition.$factory.methods.accept");
            if (!(val instanceof Event)) {
              if (typeof val !== "undefined") {
                this.value = val;
              }
            }
            this.state.resolve(this.value);
            const processPromise = this.state.promise;
            this.process.close();
            return processPromise;
          },
          cancel: function () {
            trace("NwtDialogDefinition.$factory.methods.cancel");
            this.state.resolve(undefined);
            const processPromise = this.state.promise;
            this.process.close();
            return processPromise;
          },
          minimize: function () {
            trace("NwtDialogDefinition.$factory.methods.minimize");
            this.isMinimized = true;
          },
          maximize: function () {
            trace("NwtDialogDefinition.$factory.methods.maximize");
            this.isMinimized = false;
          }
        });
      }
      Fill_factory_lifecycle_and_other_options: {
        // Automáticamente rellenados:
        this.$factory.created = function () {
          trace("NwtDialogDefinition.$factory.created");
          this.process.expand({ dialog: this });
          if (typeof that.$original.factory?.created === "function") {
            return that.$original.factory.created.call(this);
          }
        };
        this.$factory.mounted = function () {
          trace("NwtDialogDefinition.$factory.mounted");
          NwtDialogs.focusDialog(this.process);
          if (typeof that.$original.factory?.mounted === "function") {
            return that.$original.factory.mounted.call(this);
          }
        };
        // activated
        // beforeCreate
        // beforeDestroy
        // beforeMount
        // beforeUpdate
        // comments
        // components
        // computed
        // created
        // data
        // deactivated
        // delimiters
        // directives
        // el
        // errorCaptured
        // extends
        // filters
        // functional
        // inheritAttrs
        // inject
        // mixins
        // model
        // mounted
        // name
        // parent
        // props
        // propsData
        // provide
        // render
        // renderError
        // template
        // updated
        // watch
      }
    }

    validate() {
      trace("NwtDialogDefinition.prototype.validate");
      this.fillBasics();
      assertion(typeof this.$original.title === "string", "Parameter «title» must be a string on «NwtDialogDefinition.prototype.validate»");
      assertion(typeof this.$original.template === "string", "Parameter «template» must be a string on «NwtDialogDefinition.prototype.validate»");
      assertion(typeof this.$factory === "object", "Parameter «definition.factory» must be an object on «NwtDialogDefinition.prototype.validate»");
      assertion(typeof this.$factory.methods === "object", "Parameter «definition.factory.methods» must be an object on «NwtDialogDefinition.prototype.validate»");
    }

  };

  return NwtDialogDefinition;

});
/**
 * 
 * # Nwt Dialog Definition API
 * 
 * API de uso interno.
 * 
 * Permite crear definiciones abstractas de diálogos.
 * 
 * Sirve para vincular:
 * 
 *  - `$original`: Definición de usuario de diálogo
 *  - `$factory`: Definición validada de diálogo
 *  - `$process`: Proceso representativo del diaĺogo
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
 *   title: "Título del diálogo",
 *   template: `
 *     <div>
 *       <div>En el body del diálogo</div>
 *     </div>
 *   `,
 *   factory: {
 *     data: {},
 *     methods: {},
 *     watch: {},
 *     created: {},
 *     mounted: {},
 *     ...
 *   }
 * });
 * ```
 * 
 * Esto nos permite luego acceder a:
 * 
 * ```js
 * dialogDefinition.$original; // Parámetros originales
 * dialogDefinition.$factory; // Parámetros finales
 * dialogDefinition.$process; // Proceso vinculado al diálogo
 * await CommonDialogs.open(dialogDefinition.$factory);
 * ```
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
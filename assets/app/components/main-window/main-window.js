/**
 * 
 * 
 * 
 * 
 */
Vue.component("MainWindow", {
  template: $template,
  props: {},
  data() {
    trace("MainWindow.data");
    return {
      state: "done", // also: "done", "searching"
      searchFilter: "",
      searchTimeout: false,
      filteredPrograms: [],
      allPrograms: [{
        text: "Procedimientos",
        event: () => this.startProcedimientos(),
      }, {
        text: "Configuraciones",
        event: () => this.startConfiguraciones(),
      }, {
        text: "Procesos",
        event: () => this.startProcesos(),
      }, {
        text: "Ficheros locales",
        event: () => this.startExploradorDeFicheros(),
      }, {
        text: "Prompts",
        event: () => this.startGestorDePrompts(),
      }, {
        text: "Ficheros de ChatGPT",
        event: () => this.startGestorDeFicherosDeChatgpt(),
      }, {
        text: "Temporizador",
        event: () => this.startTemporizador(),
      }, {
        text: "Tests de la aplicación",
        event: () => this.startDynamicTesterViewer(),
      }]
    };
  },
  methods: {

    startProcedimientos() {
      trace("MainWindow.methods.startProcedimientos");
      this.$dialogs.openLayout1({
        title: "Procedimientos",
        body: `<nwt-commands-manager-viewer :dialog="this" />`,
      });
    },
    startConfiguraciones() {
      trace("MainWindow.methods.startConfiguraciones");
      this.$dialogs.openLayout1({
        title: "Configuraciones",
        body: `<nwt-settings-viewer :dialog="this" />`,
      });
    },
    startProcesos() {
      trace("MainWindow.methods.startProcesos");
      this.$dialogs.openLayout1({
        title: "Procesos",
        body: `<nwt-process-manager-viewer :dialog="this" />`,
      });
    },
    startExploradorDeFicheros() {
      trace("MainWindow.methods.startExploradorDeFicheros");
      this.$dialogs.openLayout1({
        title: "Explorador de ficheros",
        body: `<nwt-file-explorer />`,
      });
    },
    startGestorDePrompts() {
      trace("MainWindow.methods.startGestorDePrompts");
      this.$dialogs.openLayout1({
        title: "Gestor de prompts",
        body: `<nwt-prompts-manager-viewer />`,
      });
    },
    startGestorDeFicherosDeChatgpt() {
      trace("MainWindow.methods.startGestorDeFicherosDeChatgpt");
      this.$dialogs.openLayout1({
        title: "Gestor de ficheros de ChatGPT",
        body: `<nwt-chatgpt-files-manager-viewer />`,
      });
    },
    startTemporizador() {
      trace("MainWindow.methods.startTemporizador");
      this.$dialogs.openLayout1({
        title: "Temporizador",
        body: `<nwt-cron-manager-viewer />`,
      });
    },
    startDynamicTesterViewer() {
      trace("MainWindow.methods.startDynamicTesterViewer");
      this.$dialogs.openLayout1({
        title: "Tests de la aplicación",
        body: `<nwt-dynamic-tester-viewer />`,
      });
    },

    sortProgramsAlphabeticallyCallback() {
      return (a, b) => {
        trace("MainWindow.methods.sortProgramsAlphabeticallyCallback");
        if (a.text < b.text) return -1;
        if (a.text > b.text) return 1;
        return 0;
      };
    },

    reload() {
      trace("MainWindow.methods.reload");
      if (this.searchFilter) {
        this.filteredPrograms = this.allPrograms.filter(program => {
          return program.text.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1;
        }).sort(this.sortProgramsAlphabeticallyCallback());
      } else {
        this.filteredPrograms = this.allPrograms.concat([]).sort(this.sortProgramsAlphabeticallyCallback());
      }
      this.state = "done";
    },

    delayedReload() {
      trace("MainWindow.methods.delayedReload");
      this.state = "searching";
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.reload();
      }, 1000);
    },

    startNewFeature() {
      trace("MainWindow.methods.startNewFeature");
      this.$dialogs.open({
        title: "Nueva feature",
        template: `<nwt-form-builder :from="{title,footer,controls,events}" />`,
        factory: {
          data: {
            title: "📜 Formulario de alta de cliente",
            footer: "❤️ Termine el formulario y envíelo para mayor seguridad.",
            events: {
              onSubmit: value => {
                trace("MainWindow.startNewFeature#form-1#events.onSubmit");
                console.log("onSubmit", value);
              },
              onSuccess: value => {
                trace("MainWindow.startNewFeature#form-1#events.onSuccess");
                console.log("onSuccess", value);
              },
              onError: value => {
                trace("MainWindow.startNewFeature#form-1#events.onError");
                console.log("onError", value);
              },
            },
            controls: [
              {
                name: "name",
                type: "text/oneline",
                props: {
                  statement: "Nombre del usuario:",
                  extraInfo: "Con el nombre del usuario podremos dirigirnos a usted por su nombre.",
                  placeholder: "Aquí el nombre",
                  initialValue: "Un nombre random",
                  buttons: [
                    {
                      text: "Btn 1",
                      click: NwtUtils.noop
                    }
                  ],
                  onValidate: function(value, assertion) {
                    trace("MainWindow.startNewFeature#form-1#controls[0].props.onValidate");
                    assertion(value !== "", "El valor no puede estar vacío");
                  }
                },
                listeners: {
                  input: (event) => {
                    trace("MainWindow.startNewFeature#form-1#controls[0].listeners.input");
                  },
                },
              },
              {
                name: "address",
                type: "text/multiline",
                props: {
                  placeholder: "Aquí el domicilio",
                  statement: "Domicilio del usuario:",
                  extraInfo: "Con el domicilio podremos ir a partirle las piernas.",
                  initialValue: "Un valor\nDe varias líneas",
                  isRequired: true,
                  buttons: [
                    {
                      text: "Btn 1",
                      click: NwtUtils.noop
                    },{
                      text: "Btn 2",
                      click: NwtUtils.noop
                    }, {
                      text: "Btn 3",
                      click: NwtUtils.noop
                    }
                  ]
                }
              },
              {
                name: "opinion",
                type: "text/oneline",
                props: {
                  placeholder: "Aquí la opinión",
                  statement: "Opinión del usuario:",
                  extraInfo: "Con la opinión del usuario podremos averiguar si interesa partirle las piernas o no.",
                }
              },
              {
                name: "notes",
                type: "group/list",
                props: {
                  statement: "Notas adjuntas",
                  controls: [{
                    type: "text/oneline",
                    props: {
                      statement: "Título de la nota:",
                      placeholder: "Aquí el título",
                      extraInfo: "Para ponerle una etiqueta general a la nota.",
                      initialValue: "Titulo random",
                    }
                  }, {
                    type: "text/multiline",
                    props: {
                      statement: "Contenido de la nota:",
                      placeholder: "Aquí el contenido",
                      extraInfo: "Para ponerle un contenido a la nota.",
                      initialValue: "Contenido random",
                    }
                  }]
                }
              }, {
                name: "details",
                type: "group/structure",
                props: {
                  statement: "Detalles adjuntos",
                  controls: {
                    reason: {
                      type: "text/oneline",
                      props: {
                        statement: "Motivo del contacto",
                        placeholder: "Aquí el motivo del contacto",
                        extraInfo: "Para poner un motivo",
                        initialValue: "Motivo random",
                      }
                    },
                    channel: {
                      type: "text/oneline",
                      props: {
                        statement: "Canal del contacto",
                        placeholder: "Aquí cómo supo de nosotros",
                        extraInfo: "Si nos conoció por redes, personas, medios, carteles, etc.",
                        initialValue: "Canal random",
                      }
                    }
                  }
                }
              }
            ],
          }
        }
      });
    },

    onValidate1: function (value, schema, component, assertion, indexes) {
      assertion(value.startsWith('c'), `Parameter «value» must start with «c» @index «${indexes.join(".")}» on «onValidate1»`);
    }

  },
  created() {
    Inyeccion_a_modulo_externo: {
      if (window.AppRoot && window.AppRoot.initialize) {
        window.AppRoot.initialize(this);
      }
    }
  },
  mounted() {
    trace("MainWindow.mounted");
    this.reload();
  }
});
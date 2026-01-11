# Documentación en fichero único

Este documento contiene toda la documentación del proyecto en un solo fichero.

Orientado a informar a un LLM desde una URL del proyecto.

Además, hace una tabla de contenidos general e imprime la estructura del proyecto.

# Tabla de contenidos

- [Nwt Dialogs API](#nwt-dialogs-api)
  - [Exposición](#exposicin)
  - [Crear un diálogo con formulario y extraer la respuesta](#crear-un-dilogo-con-formulario-y-extraer-la-respuesta)
- [Nwt Toasts API](#nwt-toasts-api)
  - [Mostrar un mensaje emergente:](#mostrar-un-mensaje-emergente)
- [Nwt Errors API](#nwt-errors-api)
  - [Exposición](#exposicin)
  - [Mostrar un error](#mostrar-un-error)
  - [Captura automática de aserciones globales](#captura-automtica-de-aserciones-globales)
- [Nwt Asserter API](#nwt-asserter-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Globalizer API](#nwt-globalizer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Importer API](#nwt-importer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Randomizer API](#nwt-randomizer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Environment API](#nwt-environment-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Json Storer API](#nwt-json-storer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Settings API](#nwt-settings-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Settings Viewer API / Componente Vue2](#nwt-settings-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Tester API](#nwt-tester-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
  - [API](#api)
  - [Test de ejemplo](#test-de-ejemplo)
- [Nwt Process API](#nwt-process-api)
  - [Exposición](#exposicin)
  - [Permite cosas como](#permite-cosas-como)
- [NwtProcessManager](#nwtprocessmanager)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Process Manager Viewer API / Componente Vue2](#nwt-process-manager-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Dialog Definition API](#nwt-dialog-definition-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Timer API](#nwt-timer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Utils API](#nwt-utils-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Lazy Loader API](#nwt-lazy-loader-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Framework API](#nwt-framework-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Progress Bar API](#nwt-progress-bar-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Progress Bar Viewer API / Componente Vue2](#nwt-progress-bar-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Common Injections API](#nwt-common-injections-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Injection API](#nwt-injection-api)
- [Nwt Shell API](#nwt-shell-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)

# Estructura del proyecto

- 📁 trash7
- 📁 trash6
  - 📄 salida-0000.csv
  - 📄 salida-0001.csv
  - 📄 salida-0002.csv
  - 📄 salida-0003.csv
  - 📄 salida-0004.csv
  - 📄 salida-0005.csv
  - 📄 salida-0006.csv
  - 📄 salida-0007.csv
  - 📄 salida-0008.csv
  - 📄 salida-0009.csv
  - 📄 salida-0010.csv
  - 📄 salida-0011.csv
  - 📄 salida-0012.csv
  - 📄 salida-0013.csv
  - 📄 salida-0014.csv
  - 📄 salida-0015.csv
  - 📄 salida-0016.csv
  - 📄 salida-0017.csv
  - 📄 salida-0018.csv
  - 📄 salida-0019.csv
- 📁 trash5
  - 📄 salida.csv
  - 📄 salida.txt
- 📁 trash4
  - 📄 trash3_僕とロボコ #02-0.part-001.md
  - 📄 trash3_僕とロボコ #02-0.part-002.md
  - 📄 trash3_僕とロボコ #02-1.part-001.md
  - 📄 trash3_僕とロボコ #02-1.part-002.md
- 📁 trash3
  - 📄 僕とロボコ #02-0.part-001.png
  - 📄 僕とロボコ #02-0.part-002.png
  - 📄 僕とロボコ #02-1.part-001.png
  - 📄 僕とロボコ #02-1.part-002.png
  - 📄 僕とロボコ #02-10.part-001.png
  - 📄 僕とロボコ #02-10.part-002.png
  - 📄 僕とロボコ #02-11.part-001.png
  - 📄 僕とロボコ #02-11.part-002.png
  - 📄 僕とロボコ #02-12.part-001.png
  - 📄 僕とロボコ #02-12.part-002.png
  - 📄 僕とロボコ #02-13.part-001.png
  - 📄 僕とロボコ #02-13.part-002.png
  - 📄 僕とロボコ #02-2.part-001.png
  - 📄 僕とロボコ #02-2.part-002.png
  - 📄 僕とロボコ #02-3.part-001.png
  - 📄 僕とロボコ #02-3.part-002.png
  - 📄 僕とロボコ #02-4.part-001.png
  - 📄 僕とロボコ #02-4.part-002.png
  - 📄 僕とロボコ #02-5.part-001.png
  - 📄 僕とロボコ #02-5.part-002.png
  - 📄 僕とロボコ #02-6.part-001.png
  - 📄 僕とロボコ #02-6.part-002.png
  - 📄 僕とロボコ #02-7.part-001.png
  - 📄 僕とロボコ #02-7.part-002.png
  - 📄 僕とロボコ #02-8.part-001.png
  - 📄 僕とロボコ #02-8.part-002.png
  - 📄 僕とロボコ #02-9.part-001.png
  - 📄 僕とロボコ #02-9.part-002.png
  - 📄 僕とロボコ #13-0.part-001.png
  - 📄 僕とロボコ #13-0.part-002.png
  - 📄 僕とロボコ #13-1.part-001.png
  - 📄 僕とロボコ #13-1.part-002.png
  - 📄 僕とロボコ #13-10.part-001.png
  - 📄 僕とロボコ #13-10.part-002.png
  - 📄 僕とロボコ #13-11.part-001.png
  - 📄 僕とロボコ #13-11.part-002.png
  - 📄 僕とロボコ #13-12.part-001.png
  - 📄 僕とロボコ #13-12.part-002.png
  - 📄 僕とロボコ #13-13.part-001.png
  - 📄 僕とロボコ #13-13.part-002.png
  - 📄 僕とロボコ #13-14.part-001.png
  - 📄 僕とロボコ #13-14.part-002.png
  - 📄 僕とロボコ #13-15.part-001.png
  - 📄 僕とロボコ #13-15.part-002.png
  - 📄 僕とロボコ #13-2.part-001.png
  - 📄 僕とロボコ #13-2.part-002.png
  - 📄 僕とロボコ #13-3.part-001.png
  - 📄 僕とロボコ #13-3.part-002.png
  - 📄 僕とロボコ #13-4.part-001.png
  - 📄 僕とロボコ #13-4.part-002.png
  - 📄 僕とロボコ #13-5.part-001.png
  - 📄 僕とロボコ #13-5.part-002.png
  - 📄 僕とロボコ #13-6.part-001.png
  - 📄 僕とロボコ #13-6.part-002.png
  - 📄 僕とロボコ #13-7.part-001.png
  - 📄 僕とロボコ #13-7.part-002.png
  - 📄 僕とロボコ #13-8.part-001.png
  - 📄 僕とロボコ #13-8.part-002.png
  - 📄 僕とロボコ #13-9.part-001.png
  - 📄 僕とロボコ #13-9.part-002.png
- 📁 trash2
  - 📄 僕とロボコ #02-0.png
  - 📄 僕とロボコ #02-1.png
  - 📄 僕とロボコ #02-10.png
  - 📄 僕とロボコ #02-11.png
  - 📄 僕とロボコ #02-12.png
  - 📄 僕とロボコ #02-13.png
  - 📄 僕とロボコ #02-2.png
  - 📄 僕とロボコ #02-3.png
  - 📄 僕とロボコ #02-4.png
  - 📄 僕とロボコ #02-5.png
  - 📄 僕とロボコ #02-6.png
  - 📄 僕とロボコ #02-7.png
  - 📄 僕とロボコ #02-8.png
  - 📄 僕とロボコ #02-9.png
  - 📄 僕とロボコ #13-0.png
  - 📄 僕とロボコ #13-1.png
  - 📄 僕とロボコ #13-10.png
  - 📄 僕とロボコ #13-11.png
  - 📄 僕とロボコ #13-12.png
  - 📄 僕とロボコ #13-13.png
  - 📄 僕とロボコ #13-14.png
  - 📄 僕とロボコ #13-15.png
  - 📄 僕とロボコ #13-2.png
  - 📄 僕とロボコ #13-3.png
  - 📄 僕とロボコ #13-4.png
  - 📄 僕とロボコ #13-5.png
  - 📄 僕とロボコ #13-6.png
  - 📄 僕とロボコ #13-7.png
  - 📄 僕とロボコ #13-8.png
  - 📄 僕とロボコ #13-9.png
- 📁 trash1
  - 📄 僕とロボコ #02.pdf
  - 📄 僕とロボコ #13.pdf
- 📁 documentation
  - 📄 asserter-api.md
  - 📄 common-injections-api.md
  - 📄 csv-api.md
  - 📄 dialog-definition-api.md
  - 📄 dialogs-api.md
  - 📄 environment-api.md
  - 📄 errors-api.md
  - 📄 globalizer-api.md
  - 📄 globals-api.md
  - 📄 importer-api.md
  - 📄 injection-api.md
  - 📄 json-storer-api.md
  - 📄 lazy-loader-api.md
  - 📄 procedure-definition-api.md
  - 📄 procedure-documentation-viewer-api.md
  - 📄 procedure-injections-api.md
  - 📄 procedure-seed-api.md
  - 📄 procedures-manager-api.md
  - 📄 procedures-manager-viewer-api.md
  - 📄 process-api.md
  - 📄 process-manager-api.md
  - 📄 process-manager-viewer-api.md
  - 📄 progress-bar-api.md
  - 📄 progress-bar-viewer-api.md
  - 📄 project-commands.md
  - 📄 randomizer-api.md
  - 📄 settings-api.md
  - 📄 settings-viewer-api.md
  - 📄 shell-api.md
  - 📄 source-viewer-api.md
  - 📄 tester-api.md
  - 📄 tester-viewer-api.md
  - 📄 timer-api.md
  - 📄 toasts-api.md
  - 📄 utils-api.md
  - 📄 v-draggable-api.md
  - 📄 v-resizable-api.md
- 📁 assets
  - 📁 framework
    - 📁 win7
      - 📄 win7-patches.css
      - 📄 win7.css
    - 📁 vue2
      - 📄 vue2.js
      - 📄 vue2.min.js
    - 📁 socket.io-client
      - 📄 socket.io-client.js
    - 📁 reloader
      - 📄 .gitignore
      - 📄 package-lock.json
      - 📄 package.json
      - 📄 reloadable.js
      - 📄 reloader.js
      - 📄 starter.js
    - 📁 papaparse
      - 📄 papaparse.js
      - 📄 papaparse.min.js
    - 📁 marked
      - 📄 marked.js
    - 📁 directives
      - 📄 v-draggable.js
      - 📄 v-focus.js
      - 📄 v-resizable-simple.js
      - 📄 v-resizable.js
    - 📁 css
      - 📁 one-framework
        - 📄 one-framework.css
      - 📁 custom
        - 📄 custom.css
    - 📁 components
      - 📁 nwt-tester-viewer
        - 📄 nwt-tester-viewer.css
        - 📄 nwt-tester-viewer.html
        - 📄 nwt-tester-viewer.js
      - 📁 nwt-tester-node
        - 📄 nwt-tester-node.css
        - 📄 nwt-tester-node.html
        - 📄 nwt-tester-node.js
      - 📁 nwt-source-viewer
        - 📄 nwt-source-viewer.css
        - 📄 nwt-source-viewer.html
        - 📄 nwt-source-viewer.js
      - 📁 nwt-settings-viewer
        - 📄 nwt-settings-viewer.css
        - 📄 nwt-settings-viewer.html
        - 📄 nwt-settings-viewer.js
      - 📁 nwt-progress-bar-viewer
        - 📄 nwt-progress-bar-viewer.css
        - 📄 nwt-progress-bar-viewer.html
        - 📄 nwt-progress-bar-viewer.js
      - 📁 nwt-process-manager-viewer
        - 📄 nwt-process-manager-viewer.css
        - 📄 nwt-process-manager-viewer.html
        - 📄 nwt-process-manager-viewer.js
      - 📁 nwt-procedures-manager-viewer
        - 📄 nwt-procedures-manager-viewer.css
        - 📄 nwt-procedures-manager-viewer.html
        - 📄 nwt-procedures-manager-viewer.js
      - 📁 nwt-procedure-documentation-viewer
        - 📄 nwt-procedure-documentation-viewer.css
        - 📄 nwt-procedure-documentation-viewer.html
        - 📄 nwt-procedure-documentation-viewer.js
      - 📁 nwt-file-explorer
        - 📄 nwt-file-explorer.css
        - 📄 nwt-file-explorer.html
        - 📄 nwt-file-explorer.js
      - 📁 nwt-code-highlighter
        - 📄 nwt-code-highlighter.css
        - 📄 nwt-code-highlighter.html
        - 📄 nwt-code-highlighter.js
      - 📁 nwt-box-viewer
        - 📄 nwt-box-viewer.css
        - 📄 nwt-box-viewer.html
        - 📄 nwt-box-viewer.js
      - 📁 common-toasts
        - 📄 common-toasts.css
        - 📄 common-toasts.html
        - 📄 common-toasts.js
      - 📁 common-injections
        - 📄 common-injections.css
        - 📄 common-injections.html
        - 📄 common-injections.js
      - 📁 common-errors
        - 📄 common-errors.css
        - 📄 common-errors.html
        - 📄 common-errors.js
      - 📁 common-dialogs
        - 📄 common-dialogs.css
        - 📄 common-dialogs.html
        - 📄 common-dialogs.js
    - 📄 nwt-asserter.js
    - 📄 nwt-boot.js
    - 📄 nwt-csv.js
    - 📄 nwt-dialog-definition.js
    - 📄 nwt-environment.js
    - 📄 nwt-file-chooser.js
    - 📄 nwt-filesystem.js
    - 📄 nwt-globalizer.js
    - 📄 nwt-importer.js
    - 📄 nwt-injection.js
    - 📄 nwt-json-storer.js
    - 📄 nwt-lazy-loader.js
    - 📄 nwt-pack.js
    - 📄 nwt-procedure-definition.js
    - 📄 nwt-procedure-injections.js
    - 📄 nwt-procedure-seed.js
    - 📄 nwt-procedures-manager.js
    - 📄 nwt-process-manager.js
    - 📄 nwt-process.js
    - 📄 nwt-progress-bar.js
    - 📄 nwt-randomizer.js
    - 📄 nwt-settings.js
    - 📄 nwt-shell.js
    - 📄 nwt-tester.js
    - 📄 nwt-timer.js
    - 📄 nwt-tracer.js
    - 📄 nwt-utils.js
  - 📁 external
    - 📁 qunit
      - 📄 qunit.css
      - 📄 qunit.js
      - 📄 qunit.min.css
      - 📄 qunit.min.js
    - 📁 highlight.js
      - 📁 syntaxes
        - 📄 css.min.js
        - 📄 javascript.min.js
        - 📄 xml.min.js
      - 📁 styles
        - 📄 default.min.css
      - 📄 highlight.min.js
  - 📁 builder
    - 📄 build-docs.js
    - 📄 bundle.js
    - 📄 bundlelist-external.js
    - 📄 bundlelist.js
    - 📄 vuebundler.js
  - 📁 app
    - 📁 procedures
      - 📁 Prototipo para tester y progressBar
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Prototipo básico
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Convertir de texto en japonés a CSV por chatgpt
        - 📄 PROCEDURE.md
      - 📁 Convertir de PNG a TXT en japonés por yomitoku
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Convertir de PNG a PNG recortado por imagemagick
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Convertir de PDF a PNG por imagemagick
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Convertir de CSV a CSV paginado por node.js
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Convertir de CSV a CSV expandido por chatgpt
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Concatenar ficheros por node.js
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
      - 📁 Concatenar ficheros CSV por node.js
        - 📁 viewer
          - 📄 viewer.css
          - 📄 viewer.html
          - 📄 viewer.js
        - 📁 form
          - 📄 form.css
          - 📄 form.html
          - 📄 form.js
        - 📄 PROCEDURE.md
        - 📄 definition.js
    - 📁 components
      - 📁 main-window
        - 📄 main-window.css
        - 📄 main-window.html
        - 📄 main-window.js
    - 📄 app-paths.js
    - 📄 app-payload.js
    - 📄 app-root.js
  - 📄 dist.css
  - 📄 dist.js
- 📄 .gitignore
- 📄 README-APP.md
- 📄 README-NWT.md
- 📄 README.md
- 📄 TODO.md
- 📄 index.html
- 📄 llm.md
- 📄 package-lock.json
- 📄 package.json






# Nwt Dialogs API

## Exposición

Está expuesta en las globales:

```js
CommonDialogs
NwtDialogs
NwtFramework.Dialogs
Vue.prototype.$nwt.Dialogs
Vue.prototype.$dialogs
```

## Crear un diálogo con formulario y extraer la respuesta

```js
const respuesta = await CommonDialogs.open({
  title: "Formulario simple",
  template: `
    <div>
      <input type="text" v-model="user" />
      <input type="password" v-model="password" />
      <hr/>
      <button v-on:click="() => accept({ user, password })">Aceptar</button>
      <button v-on:click="cancel">Cancelar</button>
    </div>
  `,
  factory: {
    data: {
      user: "",
      password: "",
    }
  }
});
```

Este componente, que se inyecta en el root de la aplicación, inyecta un evento para CTRL+SUPR que muestra un `NwtProcessManagerViewer` mediante un diálogo.





# Nwt Toasts API

Está expuesta en las globales:

```js
CommonToasts
NwtToasts
NwtFramework.Toasts
Vue.prototype.$nwt.Toasts
Vue.prototype.$toasts
```

## Mostrar un mensaje emergente:

```js
CommonToasts.show({
  title: "Titulo",
  template: "<div>Aquí va HTML</div>",
  footer: "Pie de templateo opcional",
  timeout: 5000,
});
```





# Nwt Errors API

## Exposición

Está expuesta en las globales:

```js
CommonErrors
NwtErrors
NwtFramework.Errors
Vue.prototype.$nwt.Errors
Vue.prototype.$errors
```

## Mostrar un error

```js
CommonErrors.showError(new Error("Cualquier cosa"));
```

## Captura automática de aserciones globales

El componente hace:

```js
assertion.setErrorCallback(error => this.showError(error))
```

Esto implica que las aserciones globales mostrarán su error en este widget.

# Nwt Asserter API

API para aserciones y comprobaciones de test a nivel más elemental.

## Exposición

Se expone a través de:

```js
NwtAsserter
NwtAsserter.global // instancia
assertion // instancia
NwtAsserter.global === assertion
```

## Ventajas

Se usa así:

```js
assertion(1 === 2, "1 must equal 1");
```

Para personalizar el gestor de errores y aciertos:

```js
assertion.setErrorCallback(error => {
  // Do something with the AssertionError
});
assertion.setSuccessCallback(errorMessage => {
  // Do something with the success and the non-thrown error message
});
```

Puedes crear un nuevo assertion así:

```js
const otherAssertion = NwtAsserter.createAssertionFunction((message) => {
  console.log("[*] Assertion succeded: " + message);
}, error => {
  console.log("[!] Assertion failed: " + error.message);
});
otherAssertion(true, "Assertion 1");
otherAssertion(true, "Assertion 2");
otherAssertion(false, "Assertion 3");
```

# Nwt Globalizer API

API para globalizar variables en todos los entornos.

## Exposición

La API se expone a través de:

```js
NwtGlobalizer
NwtFramework.Globalizer
Vue.prototype.$nwt.Globalizer
```

## Ventajas

La API permite algunas cosas como:

```js
NwtGlobalizer.exportTo("NombreDeGlobal", {});
```

# Nwt Importer API

API para importar scripts y estilos.

## Exposición

Se expone a través de:

```js
NwtImporter
NwtFramework.Importer
Vue.prototype.$nwt.Importer
```

## Ventajas

Puede usarse así:

```js
await NwtImporter.scriptSrc("https://domain.com/script.js");
await NwtImporter.linkStylesheet("https://domain.com/styles.css");
```

# Nwt Randomizer API

API para gestionar aleatoriedad.

## Exposición

La API se expone a través de:

```js
NwtRandomizer
NwtFramework.Randomizer
Vue.prototype.$nwt.Randomizer
```

## Ventajas

Permite algunas cosas como:

```js
NwtRandomizer.fromNumbers(0,10);
NwtRandomizer.fromList([0,1,2,3,4,5]);
NwtRandomizer.fromAlphabet(10);
NwtRandomizer.fromAlphabet(10, "abcdef".split(""));
```

# Nwt Environment API

API para poder discriminar entre diferentes entornos del JavaScript.

## Exposición

Se expone a través de:

```js
NwtEnvironment
NwtFramework.Environment
Vue.prototype.$nwt.Environment
```

## Ventajas

Puedes hacer cosas como:

```js
NwtEnvironment.summary() // Object con todas las propiedades
NwtEnvironment.isDesktop // Boolean
NwtEnvironment.isBrowser // Boolean
NwtEnvironment.isMobile // Boolean
NwtEnvironment.isLinux // Boolean
NwtEnvironment.isWindows // Boolean
NwtEnvironment.isMac // Boolean
NwtEnvironment.isAndroid // Boolean
NwtEnvironment.isIOS // Boolean
NwtEnvironment.isElectron // Boolean
NwtEnvironment.isNode // Boolean
NwtEnvironment.isCordova // Boolean
NwtEnvironment.isCapacitor // Boolean
NwtEnvironment.isNWJS // Boolean
NwtEnvironment.isTouchDevice // Boolean
NwtEnvironment.isHeadless // Boolean
NwtEnvironment.canUseLocalStorage // Boolean
NwtEnvironment.canUseFilesystem // Boolean
NwtEnvironment.hasWindow // Boolean
NwtEnvironment.hasDOM // Boolean
NwtEnvironment.hasGlobal // Boolean
NwtEnvironment.hasRequire // Boolean
```

# Nwt Json Storer API

La `Nwt Json Storer API` consiste en la gestión de 1 JSON para PC con **filesystem** y para navegador con **localStorage**.

## Exposición

La API se expone en forma de clase con:

```js
NwtJsonStorer
NwtFramework.JsonStorer
Vue.prototype.$nwt.JsonStorer
```

## Ventajas

```js
NwtJsonStorer.isNode // Boolean
NwtJsonStorer.fs // Object | null
const storer = NwtJsonStorer.create({
  file: "/path/to/your/file.json",
  storageId: "JSON_STORER_FOR_YOUR_APP_IN_LS",
});
await storer.load();
await storer.save();
await storer.initialize(key, value);
await storer.get(key, defaultValue);
await storer.set(key, value);
await storer.delete(key);
```

# Nwt Settings API

API para gestionar configuraciones globalmente.

## Exposición

La API se expone a través de:

```js
NwtSettings
NwtFramework.Settings
Vue.prototype.$nwt.Settings
NwtSettings.global // instancia
```

## Ventajas

- Guarda en el fichero indicado la caché del programa dependiendo del sistema operativo.
- Carga las configuraciones desde el fichero dependiendo del sistema operativo.
- Si está en navegador, usa localStorage

```js
NwtSettings.global // instancia
// PROPIEDADES:
NwtSettings.global.$file
NwtSettings.global.$storageId
// PERSISTENCIA:
NwtSettings.global.save()
NwtSettings.global.load()
// CRUD:
NwtSettings.global.initialize(key, value)
NwtSettings.global.get(key, defaultValue)
NwtSettings.global.set(key, value)
NwtSettings.global.delete(key)
```

# Nwt Settings Viewer API / Componente Vue2

La Nwt Settings Viewer API permite sincronizar un widget gráfico con una instancia de `NwtSettings`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtSettingsViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-settings-viewer :settings="settings" :dialog="this" />
```

Donde `dialog` tiene que ser una instancia de `NwtDialog`, pero dentro de la template del diálogo la accedemos con el `this`:

```js
this.$dialogs.open({
  title: "Configuraciones globales",
  template: `<nwt-settings-viewer :settings="$nwt.Settings.global" :dialog="this" />`,
});
```

Donde `settings` tiene que ser una instancia de `NwtSettings`.

Por ejemplo:

```js
NwtSettings.global // instancia
```

Se enciende un NwtSettingsViewer si pulsas ALT+L.

# Nwt Tester API

API para ejecutar tests asíncronos encadenados.

## Exposición

Se expone a través de:

```js
// Clase:
NwtTester
NwtFramework.Tester
Vue.prototype.$nwt.tester

// Instancia global:
NwtTester.global // instancia
Vue.prototype.$tester // instancia
Vue.prototype.$tester === NwtTester.global // instancia
```

## Ventajas

La API permite:

- encadenar un test dentro de otro con `test.define` y `test.run`
- definir un test para ejecutar luego con `test.define`
- ejecutar un test con `test.run`
- hacer una aserción con `assertion`
- enlazarlo con un widget gráfico automático con `<nwt-tester-viewer :tester="tester" />`

## API

Puedes instanciar un nuevo tester con:

```js
const tester1 = new NwtTester();
const tester2 = NwtTester.create();
```

La API se acaba exponiendo por:

```js
tester.define("Test ID", (subtest, assertion) => {
  subtest.define("Test ID", (subtest, assertion) => {
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
  });
});
await tester.run("Test ID", (subtest, assertion) => {
  subtest.define("Test ID", (subtest, assertion) => {
    assertion(false, "Assertion message"); // No lanza un error
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
  });
});
```

Así que son:

- `tester.define(name:String, callback:AsyncFunction)`
   - para definir tests tardíos
   - útil para dejar la traza de lo que se va a hacer desde el principio
   - donde el callback recibe:
      - `subtest:NwtTester`: subtest del que pueden colgar sus propios hijos
      - `assertion:Function`: método para añadir aserciones al test
- `tester.run(name:String, callback:AsyncFunction)`
   - para correr tests inmediatos
   - útil en instancias ya iniciadas, tests dinámicos y predecir mejor el comportamiento
   - donde el callback recibe lo mismo que `tester.define`
- `assertion(condition:Boolean, message:String)`


## Test de ejemplo

El test de ejemplo es este:

```js
NwtTester.global.define("1 - Test", async test => {
  await NwtTimer.timeout(1000);
  await test.run("1.0 - Test inicial", async (test, assertion) => {
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    await NwtTimer.timeout(1000);
    await test.run("1.0.1 - Test inicial 1", async (test, assertion) => {
      assertion(true, "Test suite is working 0/5");
      assertion(true, "Test suite is working 1/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 3/5");
      assertion(true, "Test suite is working 4/5");
      assertion(true, "Test suite is working 5/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.2 - Test inicial 2", async (test, assertion) => {
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.3 - Test inicial 3", async (test, assertion) => {
      assertion(true, "Test suite is working 3/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.4 - Test inicial 4", async (test, assertion) => {
      assertion(true, "Test suite is working 4/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.5 - Test inicial 5", async (test, assertion) => {
      assertion(true, "Test suite is working 5/5");
    });
  });
  test.define("1.1 - Test de globales", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.1.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.1.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.1.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.2 - Test de globales 2", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.2.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.2.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.2.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.3 - Test de globales 3", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.3.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.3.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.3.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.4 - Test de globales 4", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.4.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.4.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.4.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
});
```

# Nwt Process API

Permite representar procesos.

Un proceso puede:

 - Guardar hijos con `$children`
 - Vincularse con un padre con `$parent`
 - Vincularse con un `ProcessManager` con `$manager`
 - Recordar cuándo se creó con `$createdAt`
 - Recordar cuándo se cerró con `$closedAt`
 - Ocultarse con `hide()`
 - Mostrarse con `show()`
 - Crear un subproceso con `createSubprocess(...)`
 - Cerrarse con `close()`

## Exposición

Se expone a través de:

```js
NwtProcess
NwtFramework.Process
Vue.prototype.$nwt.Process
```

## Permite cosas como

```js
const pr = NwtProcess.create({
  manager: NwtProcessManager.dialogs,
  parent: NwtProcessManager.dialogs.$list[0],
});
const pr2 = pr.createSubprocess({
  extraParams: {},
});
pr.hide();
pr.show();
pr.close();
```

# NwtProcessManager

API para la gestión de procesos internos de la aplicación.

## Exposición

```js
NwtProcessManager
NwtFramework.ProcessManager
Vue.prototype.$nwt.ProcessManager
NwtProcessManager.dialogs // instancia
NwtProcessManager.boxes // instancia
```

## Ventajas

Esta API permite crear subprocesos dependientes de procesos padre, y todos gestionados por 1 mismo `ProcessManager`.

```js
const dialogProcess = NwtProcessManager.dialogs.createProcess();
const dialogSubprocess1 = dialogProcess.createSubprocess();
const dialogSubprocess2 = dialogProcess.createSubprocess();
const dialogSubprocess3 = dialogProcess.createSubprocess();
```

# Nwt Process Manager Viewer API / Componente Vue2

La Nwt Process Manager Viewer API permite sincronizar un widget gráfico con una instancia de `NwtProcessManager`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtProcessManagerViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-process-manager-viewer :process-manager="processManager" />
```

Donde `processManager` tiene que ser una instancia de `NwtProcessManager`.

Hay 2 gestores de procesos principales:

```js
NwtProcessManager.dialogs instanceof NwtProcessManager
NwtProcessManager.boxes instanceof NwtProcessManager
```

# Nwt Dialog Definition API

API de uso interno.

Permite crear definiciones abstractas de diálogos.

Sirve para vincular:

 - `$original`: Definición de usuario de diálogo
 - `$factory`: Definición validada de diálogo
 - `$process`: Proceso representativo del diaĺogo


## Exposición

Se expone a través de:

```js
NwtDialogDefinition
NwtFramework.DialogDefinition
Vue.prototype.$nwt.DialogDefinition
```

## Ventajas

Permite crear definiciones de diálogo validadas:

```js
const dialogDefinition = NwtDialogDefinition.create({
  title: "Título del diálogo",
  template: `
    <div>
      <div>En el body del diálogo</div>
    </div>
  `,
  factory: {
    data: {},
    methods: {},
    watch: {},
    created: {},
    mounted: {},
    ...
  }
});
```

Esto nos permite luego acceder a:

```js
dialogDefinition.$original; // Parámetros originales
dialogDefinition.$factory; // Parámetros finales
dialogDefinition.$process; // Proceso vinculado al diálogo
await CommonDialogs.open(dialogDefinition.$factory);
```

# Nwt Timer API

API para hacer gestiones relacionadas con el tiempo.

## Exposición

La API se expone a través de:

```js
NwtTimer
NwtFramework.Timer
Vue.prototype.$nwt.Timer
```

## Ventajas

Permite algunas cosas como:

```js
NwtTimer.fromDateToString(new Date())
NwtTimer.fromMillisecondsToSeconds(5500)
NwtTimer.secondsDiff(oneDate, anotherDate)
await NwtTimer.timeout(5000)
```

# Nwt Utils API

API global de utilidades residuales.

## Exposición

La API se expone a través de:

```js
NwtUtils
NwtFramework.Utils
Vue.prototype.$nwt.Utils
```

## Ventajas

Permite hacer algunas cosas como:

```js
NwtUtils.jsonify({circular JSON is accepted too});
// >> "{...}"

NwtUtils.noop();
// >> undefined

NwtUtils.sortObjectByKeys({b:0,a:1});
// >> {a:1,b:0}

NwtUtils.filterObjectProperties({a:0,b:1,c:2}, (key, value) => ["a","b"].indexOf(key) !== -1);
// >> {a:0,b:1}

NwtUtils.extractPathsFromFiles([{path:"whatever"}]);
// >> ["whatever"]
```

# Nwt Lazy Loader API

API para carga cacheable de recursos JS y CSS.

## Exposición

La API se expone a través de:

```js
NwtLazyLoader
NwtFramework.LazyLoader
Vue.prototype.$nwt.LazyLoader
```

## Ventajas

La API permite algunas cosas como:

```js
await NwtLazyLoader.lazyLoad({
  id: "jquery",
  type: "scriptSrc",
  url: "https://cdn.js/jquery.js",
  checker: typeof jQuery !== "undefined",
});
await NwtLazyLoader.lazyLoad({
  id: "styles",
  type: "linkStylesheet",
  url: "https://cdn.js/styles.css",
});
```

# Nwt Framework API

API de acceso global.

## Exposición

Está expuesta en:

```js
NwtFramework
Vue.prototype.$nwt
```
## Ventajas

Dejar accesible desde 1 objeto todas las APIs de Nwt.

Se conforma a partir de:

```js
Object.assign(NwtFramework, {
  // BOOT
  Asserter: NwtAsserter,
  Globalizer: NwtGlobalizer,
  Importer: NwtImporter,
  LazyLoader: NwtLazyLoader,
  ProcessManager: NwtProcessManager,
  Process: NwtProcess,
  ProgressBar: NwtProgressBar,
  Randomizer: NwtRandomizer,
  Settings: NwtSettings,
  Tester: NwtTester,
  Timer: NwtTimer,
  Utils: NwtUtils,
  Tracer: NwtTracer,
  // Last APIs:
  ProcedureDefinition: NwtProcedureDefinition,
  ProcedureInjections: NwtProcedureInjections,
  ProcedureSeed: NwtProcedureSeed,
  Csv: NwtCsv,
  Shell: NwtShell,
  Filesystem: NwtFilesystem,
  // Injected later:
  Errors: null,
  Dialogs: null,
  Toasts: null,
  // PACK
});
```

# Nwt Progress Bar API

API para gestionar una barra de progreso.

## Exposición

La API se expone a través de:

```js
NwtProgressBar
NwtFramework.ProgressBar
Vue.prototype.$nwt.ProgressBar
```

## Ventajas

Permite algunas cosas como:

```js
const progressBar = ProgressBar.create();
const subprogressBar = progressBar.subprogress({
  total: 5,
  current: 0,
});
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
progressBar.advance(1);
```

# Nwt Progress Bar Viewer API / Componente Vue2

La Nwt Progress Bar Viewer API permite sincronizar un widget gráfico con una instancia de `NwtProgressBar`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtProgressBarViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-progress-bar-viewer :progress-bar="progressBar" />
```

Donde `progressBar` tiene que ser una instancia de `NwtProgressBar`.

# Nwt Common Injections API

API para inyecciones globales. Se inyecta 1 componente global, `<common-injections />`.

## Exposición

Esta API no se expone, solo se inyecta en el DOM.

Pero se hace a través del componente vue2 `CommonInjections`.

## Ventajas

- Función 1 / `injectTouchability`
   - Hace que los eventos de touch (móvil) funcionen también como eventos click (PC) sin tener que cambiar el código.
- Función 2 / `injectKeyEventForProcessManager`
   - Hace que CTRL+SUPR abra un diálogo con un gestor de procesos
- Función 3 / `injectKeyEventForSettings`
   - Hace que ALT+S abra un diálogo de configuraciones globales

# Nwt Injection API

La `Nwt Injection API` consiste en la inyección al DOM.

En este paso:

- Se espera al evento `load` de la `window`
- Se inyectan las APIs en `Vue.prototype`
   - `Vue.prototype.$window`
   - `Vue.prototype.$nwt`
   - `Vue.prototype.$tracer`
   - `Vue.prototype.$trace`
- Se inicia la aplicación basándose en el componente:
   - `Vue.options.components.MainWindow`

Pero no se expone una API como tal en este punto.

# Nwt Shell API

API para instanciar una consola contextualizada.

## Exposición

La API está expuesta a través de:

```js
NwtShell
NwtFramework.Shell
Vue.prototype.$nwt.Shell
```

## Ventajas

La API permite cosas como:

```js
const shell = NwtShell.create("/path/to/directory");
await shell.exec("explorer ."); // Ejecutar comandos asíncronamente
await shell.ls();               // Listar directorios
shell.cd("..");                 // Cambiar de directorio
```










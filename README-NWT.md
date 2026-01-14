# Documentación en fichero único

Este documento contiene toda la documentación del proyecto en un solo fichero.

Orientado a informar a un LLM desde una URL del proyecto.

Además, hace una tabla de contenidos general e imprime la estructura del proyecto.

# Tabla de contenidos

- [NwtPersister](#nwtpersister)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtDirectoryPersister](#nwtdirectorypersister)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFilePersister](#nwtfilepersister)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtJsonPersister](#nwtjsonpersister)
  - [Exposición](#exposicin)
- [NwtJsonlPersister](#nwtjsonlpersister)
  - [Exposición](#exposicin)
- [NwtTemplates](#nwttemplates)
- [NwtArgumentes](#nwtargumentes)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtArrayUtils](#nwtarrayutils)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Asserter API](#nwt-asserter-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtCacheDirectory](#nwtcachedirectory)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtChatgpt](#nwtchatgpt)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtClipboard](#nwtclipboard)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Code Composer](#nwt-code-composer)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtCollectionUtils](#nwtcollectionutils)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtCsv](#nwtcsv)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtDebug](#nwtdebug)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Dialog Definition API](#nwt-dialog-definition-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtDom](#nwtdom)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Environment API](#nwt-environment-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtErrorUtils](#nwterrorutils)
  - [Exposición](#exposicin)
- [NwtErrorsManager](#nwterrorsmanager)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtExporter](#nwtexporter)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFileChooser](#nwtfilechooser)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFilesystem](#nwtfilesystem)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Globalizer API](#nwt-globalizer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Importer API](#nwt-importer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Injection API](#nwt-injection-api)
- [NwtIterableClass](#nwtiterableclass)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtIterableCommandClass](#nwtiterablecommandclass)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtIterableFunction](#nwtiterablefunction)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Json Storer API](#nwt-json-storer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Lazy Loader API](#nwt-lazy-loader-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtLiveInjector](#nwtliveinjector)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtObjectUtils](#nwtobjectutils)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Framework API](#nwt-framework-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [App Paths API](#app-paths-api)
- [NwtProcessManager](#nwtprocessmanager)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Process API](#nwt-process-api)
  - [Exposición](#exposicin)
  - [Permite cosas como](#permite-cosas-como)
- [Nwt Progress Bar API](#nwt-progress-bar-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Prompt Manager API](#nwt-prompt-manager-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtProxyChain](#nwtproxychain)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Randomizer API](#nwt-randomizer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Settings API](#nwt-settings-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Shell API](#nwt-shell-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtStringShortener](#nwtstringshortener)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtStrings](#nwtstrings)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Tester API](#nwt-tester-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
  - [API](#api)
  - [Test de ejemplo](#test-de-ejemplo)
- [Nwt Timer API](#nwt-timer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Tracer API](#nwt-tracer-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Utils API](#nwt-utils-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Vue2 API](#nwt-vue2-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Common Dialogs](#common-dialogs)
  - [Exposición](#exposicin)
  - [Crear un diálogo con formulario y extraer la respuesta](#crear-un-dilogo-con-formulario-y-extraer-la-respuesta)
- [Common Errors](#common-errors)
- [Nwt Common Injections API](#nwt-common-injections-api)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Toasts API](#nwt-toasts-api)
  - [Mostrar un mensaje emergente:](#mostrar-un-mensaje-emergente)
- [Nwt Box Viewer API / Componente Vue2](#nwt-box-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Chatgpt Files Manager Viewer API / Componente Vue2](#nwt-chatgpt-files-manager-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
- [Nwt Code Highlighter API / Componente Vue2](#nwt-code-highlighter-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFileExplorer](#nwtfileexplorer)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtMatrixBackground](#nwtmatrixbackground)
  - [Exposición](#exposicin)
  - [Uso](#uso)
- [Nwt Process Manager Viewer API / Componente Vue2](#nwt-process-manager-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Progress Bar Viewer API / Componente Vue2](#nwt-progress-bar-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtPromptsManagerViewer](#nwtpromptsmanagerviewer)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [Nwt Settings Viewer API / Componente Vue2](#nwt-settings-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtSourceViewer](#nwtsourceviewer)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtStarsBackground](#nwtstarsbackground)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtTesterNode](#nwttesternode)
- [Nwt Tester Viewer API / Componente Vue2](#nwt-tester-viewer-api-componente-vue2)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormControlPrototype](#nwtformcontrolprototype)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
  - [Propiedades HTML de un control](#propiedades-html-de-un-control)
  - [Propiedades JS de un control](#propiedades-js-de-un-control)
  - [Métodos internos de un control](#mtodos-internos-de-un-control)
  - [Convivencia con la API de v-forms](#convivencia-con-la-api-de-v-forms)
- [NwtFormElementToAny](#nwtformelementtoany)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormElementToControl](#nwtformelementtocontrol)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormElementToForm](#nwtformelementtoform)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormElementToHandler](#nwtformelementtohandler)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormUtils](#nwtformutils)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormBuilder](#nwtformbuilder)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormControlHandler](#nwtformcontrolhandler)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormControlStatement](#nwtformcontrolstatement)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)
- [NwtFormControlForTextOneline](#nwtformcontrolfortextoneline)
  - [Exposición](#exposicin)
  - [Ventajas](#ventajas)





# NwtPersister

API de persistencia en el sistema de ficheros.

## Exposición

```js
NwtPersister
NwtFramework.Persister
Vue.prototype.$nwt.Persister
```

## Ventajas

```js
NwtPersister.json === NwtJsonPersister
NwtPersister.jsonl === NwtJsonlPersister
NwtPersister.file === NwtFilePersister
NwtPersister.directory === NwtDirectoryPersister
```

Es una API conectora. Para más información, consultar las APIs contenidas.

# NwtDirectoryPersister

API para persistencia de directorios.

## Exposición

```js
NwtDirectoryPersister
NwtFramework.DirectoryPersister
Vue.prototype.$nwt.DirectoryPersister
```

## Ventajas

```js
// Métodos principales:
await NwtDirectoryPersister.has(directory:String); // returns Boolean
await NwtDirectoryPersister.init(directory:String); // mkdir si no existe ya
await NwtDirectoryPersister.get(directory:String); // devuelve los nombres de los nodos (fichero o directorio) de dentro
await NwtDirectoryPersister.set(directory:String); // mkdir
await NwtDirectoryPersister.delete(directory:String); // rmdir (no recursivo)
// Métodos drásticos:
await NwtDirectoryPersister.ensure(directory:String); // ensureDirectory, crea todos los nodos necesarios y el directorio final
await NwtDirectoryPersister.destroy(directory:String); // rmdir (recursivamente)
```

Como mucho, esta API creará o destruirá un directorio, por lo cual no hay más argumentos que la ruta al directorio.

# NwtFilePersister

API para persistencia de ficheros.

## Exposición

```js
NwtFilePersister
NwtFramework.FilePersister
Vue.prototype.$nwt.FilePersister
```

## Ventajas

```js
await NwtFilePersister.has(file:String)
await NwtFilePersister.init(file:String, content:String);
await NwtFilePersister.get(file:String);
await NwtFilePersister.set(file:String, content:String);
await NwtFilePersister.delete(file:String);
```

Esta API solo atacará a ficheros, no a directorios, ni a JSONs. Por eso, `content` debe ser un String siempre.

# NwtJsonPersister

API para la persistencia de ficheros JSON.

## Exposición

```js
await NwtJsonPersister.has(base:String|Object|Function, propertyPath:Array);
await NwtJsonPersister.init(base:String|Object|Function, propertyPath:Array, value:any);
await NwtJsonPersister.get(base:String|Object|Function, propertyPath:Array);
await NwtJsonPersister.set(base:String|Object|Function, propertyPath:Array, value:any);
await NwtJsonPersister.delete(base:String|Object|Function, propertyPath:Array)
```

En cuanto a `base`:

- Cuando `base` es un String, se considera como ruta del fichero.
- Cuando `base` es Object o Function, se considera ese como los datos de base.

En cuanto a `propertyPath`:

- Se espera un `Array<String>` con el índice de los nombres de las propiedades del JSON.
   - Si das `["items", "0", "subitems"]` apuntas a `jsonData.items["0"].subitems`
- Si omites `propertyPath`, estás apuntando al fichero entero.

En cuanto a `value`, se espera el valor a establecer en los casos de `set` e `init`.

# NwtJsonlPersister

API para la persistencia de ficheros JSONL.

## Exposición

```js
await NwtJsonlPersister.select(file:String, filter:Function);
await NwtJsonlPersister.insert(file:String, value:Object);
await NwtJsonlPersister.update(file:String, filter:Function, value:Object);
await NwtJsonlPersister.delete(file:String, filter:Function);
```

Dado que los ficheros JSONL son prácticamente una tabla (en términos SQL), los métodos son los de una tabla también.













































# NwtTemplates

API para la gestión de plantillas.

# NwtArgumentes

API para la normalización de argumentos.

## Exposición

```js
NwtArgumenter
NwtFramework.Argumenter
Vue.prototype.$nwt.Argumenter
```

## Ventajas

No es una API estable hasta que no produzca código legible.

# NwtArrayUtils

API para utilidades relacionadas con la clase Array.

## Exposición

```js
NwtArrayUtils
NwtFramework.ArrayUtils
Vue.prototype.$nwt.ArrayUtils
```

## Ventajas

```js
NwtArrayUtils.repeatBy(3, true); // returns: [true, true, true]
// Este método elimina el valor si lo encuentra, o lo añade si no lo encuentra:
NwtArrayUtils.toggleByValue(lista:Array, value:any);
```

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





# NwtCacheDirectory

API para gestionar un directorio de cacheo.

## Exposición

```js
NwtCacheDirectory
NwtFramework.CacheDirectory
Vue.prototype.$nwt.CacheDirectory
// Instancias:
NwtCacheDirectory.local // Cache de AppData, que vive más allá de los git clones
NwtCacheDirectory.installation // Cache que no vive más allá de los git clones
```

## Ventajas

```js
// Esta API está en desarrollo
```

# NwtChatgpt

API de utilidades relacionadas con ChatGPT.

## Exposición

```js
NwtChatgpt
NwtFramework.Chatgpt
Vue.prototype.$nwt.Chatgpt
```

## Ventajas

Todas las operaciones utilizan la API key que se debe colocar en:

```js
NwtSettings.global.get("nwt.api.chatgpt-plus.key");
```

Sabiendo esto, quedan los métodos:

```js
await NwtChatgpt.listFiles()
await NwtChatgpt.uploadFile(filepath:String)
await NwtChatgpt.uploadFiles(filepaths:Array<String>)
await NwtChatgpt.deleteFiles(fileIds:Array<String>)
await NwtChatgpt.callToAction(systemPrompt:String, userPrompt:String)
```

# NwtClipboard

API para copiar al clipboard solamente.

## Exposición

```js
NwtClipboard
NwtFramework.Clipboard
Vue.prototype.$nwt.Clipboard
```

## Ventajas

```js
NwtClipboard.copyText(text:String);
```

# Nwt Code Composer

API para componer fragmentos de JavaScript para plantillas y código.

## Exposición

```js
NwtCodeComposer
NwtFramework.CodeComposer
Vue.prototype.CodeComposer
```

## Ventajas

```js
NwtCodeComposer.getBlankFunctionBody(fn)
NwtCodeComposer.getBlankFunctionBodies([fn,fn,fn])
NwtCodeComposer.createAsyncFunction(js, argnames = [])
NwtCodeComposer.createSyncFunction(js, argnames = [])
NwtCodeComposer.createFunctionByBodies([fn,fn,fn])
```

# NwtCollectionUtils

API para utilidades relacionadas con colecciones.

## Exposición

```js
NwtCollectionUtils
NwtFramework.CollectionUtils
Vue.prototype.$nwt.CollectionUtils
```

## Ventajas

```js
NwtCollectionUtils.normalizeCollection(data:Array|Object); // normaliza colecciones
```

# NwtCsv

API para utilidades relacionadas con el formato de ficheros CSV.

## Exposición

```js
NwtCsv
NwtFramework.Csv
Vue.prototype.$nwt.Csv
```

## Ventajas

Principalmente, se usa para intercambiar de CSV a JSON y viceversa:

```js
await NwtCsv.fromCsvFileToJson(file);
NwtCsv.fromJsonToCsv(data, options = this.defaultParseOptions);
NwtCsv.fromCsvToJson(text, options = this.defaultUnparseOptions, asObjects = true);
NwtCsv.csvCellsToObjects(rows);
```

# NwtDebug

API para utilidades de debugging.

## Exposición

```js
NwtDebug
NwtFramework.Debug
Vue.prototype.$nwt.Debug
```

## Ventajas

```js
NwtDebug.d(...args); // solo console.log
NwtDebug.j(...args); // NwtUtils.stringify + console.log
NwtDebug.k(...args); // Object.keys + NwtUtils.stringify + console.log
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

# NwtDom

API para utilidades relacionadas con el DOM.

## Exposición

```js
NwtDom
NwtFramework.Dom
Vue.prototype.$nwt.Dom
```

## Ventajas

```js
// Métodos de selección:
// (donde String permite css selector, y Function permite js filter)
NwtDom.findFirstChildWhere(element [, String], Function);
NwtDom.findFirstChildrenWhere(element [, String], Function);
NwtDom.findClosestParentWhere(element [, String], Function);
NwtDom.removeTextContentSpaces(text);
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

# NwtErrorUtils

API para utilidades relacionadas con errores.

RECOMENDACIÓN: no usar para nada, de momento no tiene una estabilidad.

## Exposición

```js
NwtErrorUtils
NwtFramework.ErrorUtils
Vue.prototype.$nwt.ErrorUtils
```

# NwtErrorsManager

API para gestión GLOBAL de errores.

CUIDADO: Solo instanciar 1 vez en toda la aplicación. Actualmente se instancia por `<common-errors />`

## Exposición

```js
NwtErrorsManager
NwtFramework.ErrorsManager
Vue.prototype.$nwt.ErrorsManager
```

## Ventajas

Tiene varias utilidades internas. Pero la utilidad pública principal es:

```js
NwtErrorsManager.global.showError(new Error("Whatever"));
```

# NwtExporter

API para exportar APIs exportables.

Se trata de concentrar y reducir los nombres de las funciones que están esparcidas por toda la API.

Aunque principalmente se centra en la API de NwtFilesystem.

## Exposición

```js
NwtExporter
NwtFramework.Exporter
Vue.prototype.$nwt.Exporter
```

## Ventajas

```js
// Uso pensado es:
const $ = NwtExporter.export.api();
await $.read.file(...);
await $.read.directory(...);
await $.read.tree(...);
await $.read.json(...);
await $.read.property(...);
await $.write.file(...);
await $.write.directory(...);
await $.write.tree(...);
await $.write.json(...);
await $.write.property(...);
await $.ensure.file(...);
await $.ensure.directory(...);
await $.ensure.tree(...);
await $.ensure.json(...);
await $.ensure.property(...);
```

De momento, es preferible la API de Persister.

# NwtFileChooser

API para seleccionar ficheros y carpetas.

## Exposición

```js
NwtFileChooser
NwtFramework.FileChooser
Vue.prototype.$nwt.FileChooser
```

## Ventajas

```js
await NwtFileChooser.pickFile({ ... });
await NwtFileChooser.pickDirectory({ ... });
await NwtFileChooser.pickFileToSave({ ... });
```

# NwtFilesystem

API para ficheros.

## Exposición

```js
NwtFilesystem
NwtFramework.Filesystem
Vue.prototype.$nwt.Filesystem
```

## Ventajas

A continuación se exponen todos los métodos y propiedades:

```js
NwtFilesystem.fs = NwtEnvironment.isNode ? require("fs") : null;
NwtFilesystem.readFile(filepath, encoding = "utf8");
NwtFilesystem.writeFile(filepath, content, encoding = "utf8");
NwtFilesystem.appendFile(filepath, content, encoding = "utf8");
NwtFilesystem.lstat(filepath);
await NwtFilesystem.exists(filepath);
await NwtFilesystem.existsAsFile(filepath);
await NwtFilesystem.existsAsDirectory(dirpath);
await NwtFilesystem.ensureDirectory(dirpath);
await NwtFilesystem.readdir(dirpath, options = {});
await NwtFilesystem.readdirStats(dirpath, sortByType = false);
NwtFilesystem.rmdir(dirpath);
NwtFilesystem.mkdir(dirpath);
NwtFilesystem.unlink(filepath);
await NwtFilesystem.ensureFile(filepath, contents);
await NwtFilesystem.ensureJson(filepath, data);
await NwtFilesystem.existsProperty(filepath, propertypath, defaultValue = undefined);
await NwtFilesystem.ensureProperty(filepath, propertypath, value = undefined);
await NwtFilesystem.readProperty(filepath, propertypath, defaultValue = undefined);
await NwtFilesystem.writeProperty(filepath, propertypath, value = undefined);
NwtFilesystem.formatBytes(bytes);
NwtFilesystem.clearFileSeparatorOnExtremes(filepath);
await NwtFilesystem.createTemporaryDirectory(name = false);
await NwtFilesystem.clearTemporaryDirectories();
NwtFilesystem.selectByGlob(globPatterns, options = {});
await NwtFilesystem.initializeFile(filepath, content = "");
await NwtFilesystem.readJson(filepath);
await NwtFilesystem.writeJson(filepath, data, beautify = false);
await NwtFilesystem.readTree(dirPath, options = {});
NwtFilesystem.THROW_ERROR_FLAG = {};
NwtFilesystem.accessFrom(data, propertyPath = [], force = false, value = undefined, errorValue = this.THROW_ERROR_FLAG);
NwtFilesystem.setFrom(data, propertyPath = [], value = undefined, force = true);
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
// Básicos:
await NwtImporter.scriptSrc("https://domain.com/script.js");
await NwtImporter.linkStylesheet("https://domain.com/styles.css");
// Es un require pero eliminando caché:
await NwtImporter.requireNewly(subpath);
// Lee el fichero, crea una AsyncFunction y la llama:
await NwtImporter.asyncSource(subpath, parameters = {}, scope = window)
// Importa un componente Vue (.html + .js + .css) a partir de la ruta común (en runtime):
await NwtImporter.vueComponentByFilesystem(subpath)
// Inyecta estilos CSS (usando un ID para singletonear):
await NwtImporter.styleTag(cssString, id = null)
// Como asyncSource pero no usa un fichero, sino el código directamente:
await NwtImporter.asyncFunction(code, parameters = {}, scope = window)
// Como asyncFunction y asyncSource, pero solo crea la función, no la llama:
await NwtImporter.asyncFactory(code, parameters = [])
```

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

# NwtIterableClass

API para crear iterables. Object-oriented approach (no templated-code approach).

## Exposición

```js
NwtIterableClass
NwtFramework.IterableClass
Vue.prototype.$nwt.IterableClass
```

## Ventajas

```js
await NwtIterableClass.create({
  // Inyecciones: por documentar
}).run();
```

# NwtIterableCommandClass

API para el iterable de un comando. Object-oriented approach.

## Exposición

```js
NwtIterableCommandClass
NwtFramework.IterableCommandClass
Vue.prototype.$nwt.IterableCommandClass
```

## Ventajas

Extiende NwtIterableClass para dar una implementación concreta aplicable a la API de comandos.

# NwtIterableFunction

API para crear funciones iterables. Templated-code approach.

Esta API usa por debajo:

```js
await NwtTemplates.global.compile.tjs.file.to.async(
  "nwt/nwt-iterable-function/template.js", // Que está aquí: assets/framework/nwt-templates/templates/nwt/nwt-iterable-function/template.js
  { ...this.iterable.onCompiledArguments, iterable: this.iterable },
  Object.keys({ ...this.iterable.onCompiledArguments, iterable: this.iterable }),
);
```

## Exposición

```js
NwtIterableFunction
NwtFramework.IterableFunction
Vue.prototype.$nwt.IterableFunction
```

## Ventajas

```js
NwtIterableFunction.utils.fromFunctionToBodyString(callback:Function):String; // usa por debajo NwtCodeComposer.getBlankFunctionBody(...)
NwtIterableFunction.utils.fromCollectionToArray(collection:Array|Object):Array; // homogeneiza arrays y objetos
await NwtIterableFunction.run({
  onWasStarted: ...,
  onIndex: ...,
  onItem: ...,
  onKey: ...,
  onValue: ...,
  onIdentifier: ...,
  onCollection: ...,
  onCompiledArguments: ...,
  onNextIteration: ...,
  onInterlapse: ...,
  onCompileCollection: ...,
  onCompileCode: ...,
  onCondition: ...,
  onProgression: ...,
  onIteration: ...,
  onRun: ...,
  onFunctionStart: ...,
  onFunctionSuccess: ...,
  onFunctionError: ...,
  onFunctionFinally: ...,
  onFunctionEnd: ...,
  onIterationStart: ...,
  onIterationSuccess: ...,
  onIterationError: ...,
  onIterationFinally: ...,
  onIterationEnd: ...,
  onAbortion: ...,
});
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
await NwtLazyLoader.loadHighlightJs(); // carga highlight.js
await NwtLazyLoader.loadJsBeautify(); // carga js-beautify
```

# NwtLiveInjector

API para inyectar código en runtime. API para debugging.

## Exposición

```js
NwtLiveInjector
NwtFramework.LiveInjector
Vue.prototype.$nwt.LiveInjector
```

## Ventajas

```js
NwtLiveInjector.start();
// El fichero que está en el root del proyecto: `injector.js`
// se queda a la escucha de cambios
// y cuando guardas, inyecta el código que en él haya
```

# NwtObjectUtils

API para utilidades con Object.

## Exposición

```js
NwtObjectUtils
NwtFramework.ObjectUtils
Vue.prototype.$nwt.ObjectUtils
```

## Ventajas

```
NwtObjectUtils.cleanMapByPairs(object, cleaner);
// El «cleaner» recibirá (key, value, index) por cada entrada de «object»
// Si el «cleaner» devuelve «undefined», esa entrada no se devolverá
// Si el «cleaner» devuelve Array<Clave,Valor>, esa entrada será substituida por lo especificado
// Si el «cleaner» devuelve otra cosa, lanzará error
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

# App Paths API

Sirve como ejemplo de API de aplicación.

Funcionalmente, solo deja acceso a:

- `NwtPaths.projectRoot`.
- `NwtPaths.registeredProcedures`.

Pero puede usarse para añadir las rutas interesantes de la aplicación.









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

# Nwt Prompt Manager API

API para gestionar los prompts.

## Exposición

La API se expone a través de:

```js
NwtPromptsManager
NwtFramework.PromptsManager
Vue.prototype.$nwt.PromptsManager
// instancias:
NwtPromptsManager.global
```

## Ventajas

La API permite cosas como:

```js
NwtPromptsManager.global.resolve(...subpaths=[String,...])
await NwtPromptsManager.global.list(); // Busca todos los "** /PROMPT.MD"
await NwtPromptsManager.global.save(path:String,prompt:String); // guarda un "/PROMPT.md" en la ruta especificada
await NwtPromptsManager.global.pickPrompt(); // abre un <nwt-prompts-manager-viewer> en un diálogo que permite escoger un prompt ya existente
```

# NwtProxyChain

API para encadenar llamadas a métodos personalizados pasándole strings construídos con acceso a propiedades.

API experimental, no se usa en el framework.

## Exposición

La API se expone a través de:

```js
NwtProxyChain
NwtFramework.ProxyChain
Vue.prototype.$nwt.ProxyChain
```

## Ventajas

```js
proxyChain = NwtProxyChain.fromFactory(text => customActionWith(text));
proxyChain.com.utils.Array.whatever.$; // Aquí, está haciendo: customActionWith("com.utils.Array.whatever");
proxyChain.find("com.utils.Array.whatever") // Lo mismo pero con llamada explícita
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
// Propiedaes estáticas:
NwtRandomizer.alphabet
NwtRandomizer.numerical
NwtRandomizer.alphanumerical
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
shell.subprocess("comando", argumentos=["--flag"], opciones={cwd:...}); // returns una Promise (por si se quiere usar con await directamente) de la que cuelga una propiedad extra: «subprocess»
shell.terminate(); // envía signal de terminado a todos los procesos hijo (de this._children)
```

# NwtStringShortener

API para gestionar strings acortados.

## Exposición

Se expone a través de:

```js
NwtStringShortener
NwtFramework.StringShortener
Vue.prototype.$nwt.StringShortener
// Instancia:
NwtStringShortener.global // instancia creada en: "assets/framework/nwt-string-shortener/global.json"
```

## Ventajas

La API permite cosas como:

```js
// Estáticos:
NwtStringShortener.create(jsonFilepath:String);
NwtStringShortener.createUid(len=10); // returns String con un nuevo ID (PERO NO LO PERSISTE)
// De instancia:
await NwtStringShortener.global.initializeStore(); // inicializa (con NwtFilesystem.ensureFile, cuidado) el JSON si no existe
await NwtStringShortener.global.init(id, initialValue = undefined); // Inicializa un ID si no existe ya + retorna su shorteneado
await NwtStringShortener.global.get(id, defaultValue = undefined); // Devuelve el ID shorteneado de un ID, o en su defecto `defaultValue`
await NwtStringShortener.global.deleteById(id); // Elimina el ID no shorteneado proporcionado
await NwtStringShortener.global.deleteAllExceptValues(values=[]); // Elimina todos los IDs **shorteneados** que NO aparezcan en el `values=[...]`. Se usa para eliminar directorios-caché obsoletos.
await NwtStringShortener.global.add(id, value = false, silently = false); // añade el ID como nuevo shortener + si value no es false lo usa como ID shorteneado + si silently no es false no lanza error de existir ya + retorna el ID shorteneado correspondiente
```

# NwtStrings

API de utilidades relacionadas con **obtener** algunos strings específicos.

Se distingue de la API de `NwtStringUtils` (puede que todavía no exista) en que esta segunda serían métodos y utilidades relacionadas con cualquier string. `NwtStringUtils` sería para métodos de extensión de `String.prototype`.

## Exposición

```js
NwtStrings
NwtFramework.Strings
Vue.prototype.$nwt.Strings
```

## Ventajas

```js
NwtStrings.EOL; // fin de línea en el sistema operativo actual (usa node.js)
await NwtStrings.fromAssets(filename); // returns el contenido de `assets/app/strings/${filename}`
await NwtStrings.getDistJsSource(); // returns el contenido de `assets/dist.js` (que se cachea y luego puede obtenerse en sync)
await NwtStrings.getSurroundingLinesFromDistJs({line:Integer,column:Integer}, linesBefore=5, linesAfter=5); // returns as String el contenido especificado dentro de `assets/dist.js`
```

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
await NwtTimer.timeout(5000);
const chronometer = NwtTimer.Cronometer.create();
chronometer.start();
chronometer.stop(); // returns: seconds diff from created or started
```

# Nwt Tracer API

API para trazar la ejecución del programa.

## Exposición

Se expone a través de:

```js
// La clase global
NwtTracer
NwtFramework.Tracer
Vue.prototype.$nwt.Tracer

// La instancia global
NwtTracer.global // instancia
Vue.prototype.$tracer === NwtTracer.global // instancia

// La función global
trace // Función de traceo global
Vue.prototype.$trace === trace // Función de traceo
```

## Ventajas

La API permite algunas cosas como:

```js
NwtTracer.global.activate();
NwtTracer.global.deactivate();
NwtTracer.global.trace();
const traceFunction = NwtTracer.global.createTrace();
traceFunction("method", [1,2,3]);
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
NwtUtils.noop(); // >> undefined
NwtUtils.jsonify({circular JSON is accepted too}); // >> "{...}"
NwtUtils.copify({circular JSON is accepted too}); // >> {...}
NwtUtils.trify(callback, valueOnFail);
NwtUtils.sortObjectByKeys({b:0,a:1}); // >> {a:1,b:0}
NwtUtils.filterObjectProperties({a:0,b:1,c:2}, (key, value) => ["a","b"].indexOf(key) !== -1); // >> {a:0,b:1}
NwtUtils.extractPathsFromFiles([{path:"whatever"}]); // >> ["whatever"]
NwtUtils.copyToClipboard(text);
NwtUtils.getSurroundingLines(content:String, line:Number, column:Number, linesBefore = 3, linesAfter = 3);
```

# Nwt Vue2 API

API de utilidades relacionadas con Vue2.

## Exposición

La API se expone a través de:

```js
NwtVue2
NwtFramework.Vue2
Vue.prototype.$nwt.Vue2
```

## Ventajas

La API permite cosas como:

```js
// Métodos para notaciones:
NwtVue2.fromTagToIdNotation("tag-nomenclature"); // returns: "TagNomenclature"
NwtVue2.fromIdToTagNotation("TagNomenclature"); // returns: "tag-nomenclature"
// Definiciones paralelas de componentes y directivas (innecesario si usas Vue.options.components y Vue.options.directives):
NwtVue2.defined.components; // {}
NwtVue2.defined.directives; // {}
NwtVue2.define.component("component-name", {...});
NwtVue2.define.directive("directive-name", {...});
// Métodos para persistir propiedades en HTMLElement, HTMLElementDataset y Vue2Component:
NwtVue2.cross.expose.by.element(...); // equals: NwtVue2.exposeByElement(...)
NwtVue2.cross.expose.by.component(...); // equals: NwtVue2.exposeByComponent(...)
NwtVue2.exposeByElement(htmlElement, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
NwtVue2.exposeByComponent(vue2Component, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
```

Es una API de poco uso. Los métodos estrictamente necesarios son los de notaciones. Pero los otros pueden ser útiles también en algunos casos.

Los métodos de definiciones paralelas habría que eliminarlos, sin romper nada que ya esté funcionando.





# Common Dialogs

API para diálogos.

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





# Common Errors

Esta API no se está usando.

La razón es que los errores NO SE PUEDEN mostrar a través de un componente Vue, porque causa recursividad y la aplicación se bloquea.

La API de `NwtErrorsManager` es la encargada de gestionar los errores.

No se elimina todavía por si se está usando, pero debería poder eliminarse sin más problemas.





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





# Nwt Box Viewer API / Componente Vue2

La Nwt Box Viewer API permite visualizar un componente pasándole directamente una plantilla Vue2 como parámetro.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtBoxViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-box-viewer :source="<div>Aquí debe ir HTML para Vue2</div>" />
```

Donde `source` tiene que ser un string válido como plantilla para un componente Vue2 anónimo.





# Nwt Chatgpt Files Manager Viewer API / Componente Vue2

La Nwt Chatgpt Files Manager Viewer API permite consultar, subir y eliminar ficheros a los servidores de OpenAI para usar contra ChatGPT Plus.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtChatgptFilesManagerViewer
```





# Nwt Code Highlighter API / Componente Vue2

La Nwt Code Highlighter API permite visualizar un fragmento de código con la iluminación de sintaxis.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtCodeHighlighter
```

## Ventajas

La API permite cosas como:

```html
<nwt-code-highlighter syntax="html" :code="<div>Aquí debe ir el código en el lenguaje especificado</div>" />
```

Donde `syntax` tiene que ser el lenguaje de programación.

Donde `code` tiene que ser el código fuente en este lenguaje,





# NwtFileExplorer

Componente vue2 para explorar sistema de ficheros. También como filepicker y directorypicker.

## Exposición

```js
Vue.options.components.NwtFileExplorer
```

## Ventajas

```html
<nwt-file-explorer
  opened-by="/ruta/por/donde/quieres/que/aparezca/abierto"
  accept-extensions="*"
  accept-extensions="js,html,css,csv,json,jsonl"
  save-file="true"          # esta opción es para seleccionar ficheros que no existen todavía
  multiple="true"           # esta opción no es compatible con las opciones save-file=true ni chooser-of="none" ni chooser-of="directory"
  chooser-of="none"         # acepta también: "file" y "directory"
  :on-accept="(choosen) => doSomethingWith(choosen)"
  :on-cancel="() => doSomethingWith()"
/>
```

Por tanto, este componente puede usarse tanto para escoger ficheros, directorios, nuevos ficheros, o simplemente explorar ficheros.

De momento, no hace nada cuando seleccionas un fichero.





# NwtMatrixBackground

Componente de diseño para hacer el efecto de letras de Matrix.

## Exposición

```js
Vue.options.components.NwtMatrixBackground
```

## Uso

```html
<nwt-matrix-background />
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





# NwtPromptsManagerViewer

Componente para gestionar prompts guardados en local.

No usa la API de OpenAI para nada.

## Exposición

```js
Vue.options.components.NwtPromptsManagerViewer
```

## Ventajas

```html
<nwt-prompts-manager-viewer
  :manager="NwtPromptsManager.global"  # valor por defecto: este parámetro puede ignorarse
  :chooser="true"   # si se usa como prompt-picker: true, si se usa como prompt-explorer: false (por defecto)
  :dialog="dialog"  # diálogo externo, para cerrarlo cuando el picker haya acabado
/>
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





# NwtSourceViewer

Componente vue2 para renderizar plantillas vue2 en runtime.

## Exposición

```js
Vue.options.components.NwtSourceViewer
```

## Ventajas

```html
<nwt-source-viewer
  :source="codigoHtmlVue"
  :component-context="{ mounted:?, data:?, methods:?, ... }" # opcional
/>
```

Donde `codigoHtmlVue` es un String con el código de plantilla vue2 que desees.

Por debajo, creará un componente `AnonymousSourceViewer{RANDOMIZED-STRING}`.

Utilizará `component-context` para darle contexto a este componente.





# NwtStarsBackground

Componente vue2 que pinta estrellas de fondo.

## Exposición

```js
Vue.options.components.NwtStarsBackground
```

## Ventajas

```html
<nwt-stars-background />
```

Es un componente estético, nada más.





# NwtTesterNode

Componente vue2 interno. No debe usarse, lo usa `NwtTesterViewer` por debajo.





# Nwt Tester Viewer API / Componente Vue2

La Nwt Tester Viewer API permite sincronizar un widget gráfico con una instancia de `NwtTester`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtTesterViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-tester-viewer :tester="tester" title="Título de esta suite de tests" />
```

Donde `tester` tiene que ser algo como:

```js
const tester = NwtTester.global;
// o por ejemplo:
const tester = new NwtTester("Nombre del tester", async (subtest, assertion) => {
  assertion(true, "Aserción 1");
  assertion(true, "Aserción 2");
  assertion(true, "Aserción 3");
  subtest.run("Subtest 1.1", async (subtest, assertion) => {
    assertion(true, "Aserción 1");
    assertion(true, "Aserción 2");
    assertion(true, "Aserción 3");
  });
});
```

# NwtFormControlPrototype

Componente base (sin plantilla) para controles de formulario compatibles con `NwtFormBuilder`.

De este componente, heredan todos los controles de formulario.

Por lo tanto, esta lógica es común a todos los controles.

## Exposición

```js
Vue.options.components.NwtFormControlPrototype
```

## Ventajas

Este componente no está pensado para usarse por sí mismo, sino para extenderse vía la API de vue2.

Pero su API es común a todos los controles, así que es especialmente interesante documentarla.

## Propiedades HTML de un control

Las propiedades comunes a todos los controles de formulario son:

```html
<nwt-form-control-prototype
  :initial-value="anything" # valor inicial del control, en su tipo hidratado, no en String solamente
  statement="Enunciado de este control"
  extra-info="Información extra del enunciado de este control"
  is-required="false"     # si es requerido en el formulario, u opcional (false, por defecto)
  :on-change="() => {}"   # evento lanzado al cambiar el valor del control
  :on-format="() => {}"   # evento para hidratar el valor, usado cuando llamas a thi.getValue()
  :on-validate="() => {}" # creo que este no se usa, la validación corre a cuenta de la API de v-forms en su lugar
/>
```

## Propiedades JS de un control

Otras propiedades internas, desde el JS y no del HTML, son estas:

```js
this.isControl === "prototype"; // Esta propiedad debe ser sobreescrita por cada control con el nombre del {tipo/subtipo} propios
this.isShowingExtraInfo; // variable de estado
this.value === ?; // El valor, sin formatear. Suele ser un string que se puede visualizar con text-boxes.
this.validationErrors === []; // errores de validación acumulados
```

## Métodos internos de un control

```js
this.getValue(); // devuelve el valor del control, pero formateado. Este valor ya no siempre será un String, puede ser número, booleano, objeto, lo que sea.
this.toggleExtraInfo(); // muestra u oculta la información extra del control
```

Esta sería la API inicial de cualquier control.

Pero hay que saber algunas cosas más para crear tu propio control.

Dado que este componente no tiene plantilla, y aunque la tuviera no serviría de nada porque cada control la sobreescribiría a su manera, conviene consultar el primer control que se ha creado como referencia para saber cómo crear la plantilla de un control.

El primer control que se ha crea en la API es:

 - `NwtFormControlForTextOneline`: que se corresponde con un input[type=text].

Consultar ese control si vas a crear uno propio, porque para hacerlo compatible del todo, por ejemplo, hay que:

 - Ponerle un class="nwt_form_control"
 - Ponerle un `<nwt-form-control-statement :control="this" />` arriba
 - Ponerle un `<nwt-form-control-handler :control="this" />` abajo
 - Poner el control en un flex-row y a la izquierda
 - Poner en la derecha del flex-row un `<nwt-form-control-buttons :control="this" />`
 - Poner un `v-model="value"` al input, de haberlo
 - Poner un `v-on:input="e => onChange(e, this)"` o llamar al `onChange` desde `watch.value`

Y esta API todavía no está completa en el momento de esta documentación, así que puede que haya alguna cosa más.

## Convivencia con la API de v-forms

Es importante entender por qué la API de `v-forms` no va incrustada en esta hard-way.

Es decir: son controles, ¿por qué no tienen ya el `v-forms.control` incrustado a nivel de componente?

La respuesta es: porque no siempre están participando activamente como controles en un formulario.

Separar estas 2 APIs permite que puedas reutilizar todos los controles en cualquier contexto, sin necesariamente vincularlos a un formulario.

Pero, por debajo, hay compatibilidades ya pensadas para integrarse con el formulario.

Además, la vinculación con un formulario permite algunos parámetros extra que no van necesariamente con el componente de control, sino con el formulario concreto.

Por ejemplo, si quieres añadir una validación de un texto en el contexto de un formulario concreto:

- Pides un tipo `text/oneline`: eso es lógica del control
- Pero además quieres que ese `text/oneline` cumpla con un formato concreto a la hora de validarlo: eso es lógica del formulario

Por eso, hay que separar estas 2 APIs. Porque un control no siempre es control activo en un formulario.

# NwtFormElementToAny

API común de los elementos que usan la directiva `v-forms.{form,control,handler}`.

De esta clase heredan las clases:

 - NwtFormElementToForm
 - NwtFormElementToControl
 - NwtFormElementToHandler

Pero es una clase abstracta: no se debe instanciar desde ella misma, sino desde una de estas descendientes.

## Exposición

```js
NwtFormElementToAny
NwtFramework.FormElementToAny
Vue.prototype.$nwt.FormElementToAny
```

## Ventajas

```js
NwtFormElementToAny.create(element:HTMLElement, value:Object, virtualNode);
// Propiedades y métodos que deben sobreescribirse:
NwtFormElementToAny.vformType === "any";
NwtFormElementToAny.prototype.initialize(); // NwtVue2.cross.expose.by.element(this.element, this, "vformsPrototype"); Pero vformsPrototype no debería aparecer nunca
NwtFormElementToAny.prototype.getValue(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.validate(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.propagateSuccess(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.propagateErrors(error); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.submit(); // lanza un error porque es una clase abstracta
```

# NwtFormElementToControl

API de los elementos que usan la directiva `v-forms.control`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToControl
NwtFramework.FormElementToControl
Vue.prototype.$nwt.FormElementToControl
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToControl.prototype.initialize()
NwtFormElementToControl.prototype.getValue()
NwtFormElementToControl.prototype.validate(notify = false, mustThrow = true)
NwtFormElementToControl.prototype.propagateSuccess()
NwtFormElementToControl.prototype.propagateErrors(errors)
// Métodos propios:
NwtFormElementToControl.prototype.getName()
```

# NwtFormElementToForm

API de los elementos que usan la directiva `v-forms.form`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToForm
NwtFramework.FormElementToForm
Vue.prototype.$nwt.FormElementToForm
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToForm.prototype.initialize()
NwtFormElementToForm.prototype.getValue()
NwtFormElementToForm.prototype.validate(notify = false, mustThrow = true)
NwtFormElementToForm.prototype.submit()
```

# NwtFormElementToHandler

API de los elementos que usan la directiva `v-forms.handler`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToHandler
NwtFramework.FormElementToHandler
Vue.prototype.$nwt.FormElementToHandler
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToForm.prototype.initialize()
NwtFormElementToForm.prototype.setErrors(errors)
```

# NwtFormUtils

API de utilidades varias de un formulario.

Esta API se utiliza por:

 - La directiva de v-forms, para no poner toda la lógica dentro de la directiva, y tenerla reutilizable desde fuera
 - El control prototipo base, para algunas validaciones que deberían hacerse para cumplir los estándares de los Form Controls.

## Exposición

```js
NwtFormUtils
NwtFramework.FormUtils
Vue.prototype.$nwt.FormUtils
```

## Ventajas

```js
// Usados por la API de Form Controls:
NwtFormUtils.fromControlTypeToFullpath("text/oneline");          // returns "assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control"
NwtFormUtils.validateControlButtons(componenteControlVue2);      // lanzará error si el componente no cumple con la opción de buttons
NwtFormUtils.validateControlPlaceholder(componenteControlVue2);  // lanzará error si el componente no cumple con la opción de placeholder
NwtFormUtils.validateControlExtraClasses(componenteControlVue2); // lanzará error si el componente no cumple con la opción de extraClasses
NwtFormUtils.validateControlValue(componenteControlVue2);        // lanzará error si el componente no cumple con la opción de value
NwtFormUtils.validateIsControl(componenteControlVue2);           // lanzará error si el componente no cumple con la opción de isControl
// Usados por la API de v-forms:
NwtFormUtils.from.element.to.form(htmlElement);     // se aplica cuando v-forms.form y equivale a:    NwtFormElementToForm.create(...args).initialize()
NwtFormUtils.from.element.to.control(htmlElement);  // se aplica cuando v-forms.control y equivale a: NwtFormElementToControl.create(...args).initialize()
NwtFormUtils.from.element.to.handler(htmlElement);  // se aplica cuando v-forms.handler y equivale a: NwtFormElementToHandler.create(...args).initialize()
```





# NwtFormBuilder

Componente vue2 que construye formularios.

## Exposición

```js
Vue.options.components.NwtFormBuilder
```

## Ventajas

```html
<nwt-form-builder
  :from="{
    title: "Título del formulario",
    footer: "Pie del formulario",
    controls: [{
      type: "text/oneline", # El {tipo/subtipo} de control que están en assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}
      props: {},            # Propiedades que se le pasan como parámetros. Son parámetros específicos del control en sí.
      listeners: {},        # Eventos que se le pasan como parámetros. Son parámetros específicos del control en sí también.
    },{
      ...
    }]
    events: {
      onSubmit: (data) => {},
      onSuccess: (data) => {},
      onError: (data) => {},
    }
  }"
/>
```

Esta API se cruza con varias APIs:

- `assets/framework/browser/components/nwt-form/control-prototype.js`:
   - este es el componente base de todos los controles de formulario (heredan de él)
- `assets/framework/browser/directives/v-forms.js`:
   - utiliza las directivas de v-forms para componer un formulario paralelo que respeta la jerarquía del DOM
   - ese formulario paralelo permite composición de campos, validación y envío automáticamente

Y luego están todos los controles que hay bajo:

- `assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control.{html,css,js}`
   - file-chooser/directory
   - file-chooser/file
   - file-chooser/new-file
   - text/oneline
   - text/multiline

En el momento de documentar esto, estos son los controles disponibles. Para estar actualizado, revisar el directorio.











# NwtFormControlHandler

Componente para mostrar errores de validación de un Form Control.

## Exposición

```js
Vue.options.components.NwtFormControlHandler
```

## Ventajas

```html
<nwt-form-control-handler :control="controlComponent" />
```

Donde `controlComponent` tiene que ser el componente de tipo Form Control.

Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:

- `control.validationErrors`

Este componente **SÍ LLEVA INCRUSTADA** la directiva de v-forms.handler.

La razón teórica (no sé si está bien implementado todavía) es que:

  - Solo mostrará los errores de validación que se acumulen en el control proporcionado
  - Si el control proporcionado no usa v-forms.control, no acumula errores
  - Si el control proporcionado sí usa v-forms.control, sí acumula errores, entonces sí mostrará errores.





# NwtFormControlStatement

Componente para mostrar anunciados de control homogéneos.

Uso interno de las plantillas de los Form Controls.

## Exposición

```js
NwtFormControlStatement
NwtFramework.FormControlStatement
Vue.prototype.$nwt.FormControlStatement
```

## Ventajas

```html
<nwt-form-control-statement
  :control="controlComponent"
/>
```

Donde `controlComponent` tiene que ser el componente de tipo Form Control.

Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:

- `control.statement`
- `control.extraInfo`

















# NwtFormControlForTextOneline

Componente de control de formulario para textos de una sola línea.

## Exposición

```js
Vue.options.components.NwtFormControlForTextOneline
```

## Ventajas

```html
<nwt-form-control-for-text-oneline
  :buttons="[{text:'texto de boton',click:() => {}}]"
  extraClases="clase1 clase2"
  placeholder="Texto de relleno"
  v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
/>
```




























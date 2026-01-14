



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


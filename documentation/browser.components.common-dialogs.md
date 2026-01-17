



# Common Dialogs

Componente para diálogos. Permite usar diálogos programáticamente.

## Especificaciones

Este componente vue2 se debe inyectar 1 sola vez, globalmente, en la aplicación.

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

## API de diálogos

A continuación se explican los métodos disponibles desde el objeto `NwtDialogs` / `CommonDialogs`.

### `NwtDialogs.open(definition:Object)`

Este método llamará a `NwtDialogDefinition.create(definition)` y devolverá la promesa que devuelve el valor del diálogo.

Esa promesa se cumple cuando se llama a `accept` o `cancel` desde el diálogo mismo, métodos que se inyectan automáticamente y están disponibles desde la plantilla del diálogo directamente.

Para más información, buscar en la documentación la interfaz `NwtDialogDefinition` y saber las opciones del parámetro `definition:Object`.

### `NwtDialogs.openByTemplateId(definition:Object)`

Este método difiere con `open` en 2 cosas:

- El parámetro `template` de la `definition:Object` no es el string de la plantilla, sino el string del fichero que contiene la plantilla.
   - El parámetro `template` utiliza la raíz de `assets/framework/browser/dialog-templates/${template}` para saber a qué fichero está apuntando el parámetro.
   - En el fichero, solo se acepta HTML, nada de JS ni CSS: solo dice dónde está la plantilla
- Se inyecta automáticamente, si no se sobreescribe, el parámetro `windowClasses: "no_scroll"`.
   - Esto pasa para que se pueda utilizar el patrón CSS del `dialog_layout`, que permite un header y un footer fijos en el diálogo, y que el contenido sea scrolleable.
   - Para ver un ejemplo de implementación, puedes ir a `assets/framework/browser/dialog-templates/examples/ejemplo-panel-fijo-limpio.html`, donde se utilizan las clases/estructura:
      - `.dialog_container`
      - `.dialog_container > .dialog_structure`
      - `.dialog_container > .dialog_structure > .dialog_header`
      - `.dialog_container > .dialog_structure > .dialog_body`
      - `.dialog_container > .dialog_structure > .dialog_body > .dialog_content`
      - `.dialog_container > .dialog_structure > .dialog_footer`

Este método, por tanto, usa `readFile` para conocer la plantilla.

Por lo demás, funciona exactamente igual que `open`.

### `NwtDialogs.subdialog(definition:Object)`

Este método no crea un subdiálogo (sino un diálogo normal, sin padre), porque no hay un diálogo padre conocido, se está usando el manager de los diálogos.

Su razón de existir es homogeneizar la llamada de `dialog.subdialog` y `manager.open/manager.subdialog`.

Esto es útil en la API de procesos. Pero si no hay necesidad, no debería usarse este método, sino `open` o `openByTemplateId`.

Es un método de uso interno principalmente, y su intención es solo homogeneizar.

### `NwtDialogs.closeDialog(process:NwtProcess)`

Sirve para cerrar diálogos activos. Requiere del objeto `NwtProcess`.

### `NwtDialogs.focusDialog(process:NwtProcess)`

Sirve para poner en el foco un diálogo activo. Requiere del objeto `NwtProcess`.

### `NwtDialogs.minimizeDialog(process:NwtProcess)`

Sirve para minimizar un diálogo activo. Requiere del objeto `NetProcess`.

### `NwtDialogs.maximizeDialog(process:NwtProcess)`

Sirve para maximizar (dejar de ocultar y poner en el foco) un diálogo activo. Requiere del objeto `NwtProcess`.


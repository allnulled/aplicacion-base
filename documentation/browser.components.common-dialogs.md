



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


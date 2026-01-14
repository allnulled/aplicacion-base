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


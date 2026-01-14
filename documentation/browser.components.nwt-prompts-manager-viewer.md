



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


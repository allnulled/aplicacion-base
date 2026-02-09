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


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


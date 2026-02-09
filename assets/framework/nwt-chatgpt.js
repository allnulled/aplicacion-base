/**
 * 
 * # NwtChatgpt
 * 
 * API de utilidades relacionadas con ChatGPT.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtChatgpt
 * NwtFramework.Chatgpt
 * Vue.prototype.$nwt.Chatgpt
 * ```
 * 
 * ## Ventajas
 * 
 * Todas las operaciones utilizan la API key que se debe colocar en:
 * 
 * ```js
 * NwtSettings.global.get("nwt.api.chatgpt-plus.key");
 * ```
 * 
 * Sabiendo esto, quedan los métodos:
 * 
 * ```js
 * await NwtChatgpt.listFiles()
 * await NwtChatgpt.uploadFile(filepath:String)
 * await NwtChatgpt.uploadFiles(filepaths:Array<String>)
 * await NwtChatgpt.deleteFiles(fileIds:Array<String>)
 * await NwtChatgpt.callToAction(systemPrompt:String, userPrompt:String)
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtChatgpt'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtChatgpt'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtChatgpt = class {

    static async initializeCounterFile() {
      trace("NwtChatgpt.initializeCounterFile");
      const filePath = NwtPaths.global.relative("assets/app/files/chatgpt-calls.txt");
      const fileExists = await NwtFilesystem.exists(filePath);
      if(!fileExists) {
        await NwtFilesystem.writeFile(filePath, "0");
      }
    }

    static async increaseCounter() {
      trace("NwtChatgpt.increaseCounter");
      const filePath = NwtPaths.global.relative("assets/app/files/chatgpt-calls.txt");
      const fileContent = await NwtFilesystem.readFile(filePath);
      const counter = parseInt(fileContent);
      counter++;
      await NwtFilesystem.writeFile(filePath, "" + counter);
      return counter;
    }

    static async getCounter() {
      trace("NwtChatgpt.getCounter");
      const filePath = NwtPaths.global.relative("assets/app/files/chatgpt-calls.txt");
      const fileContent = await NwtFilesystem.readFile(filePath);
      const counter = parseInt(fileContent);
      return counter;
    }

    static async listFiles() {
      trace("NwtChatgpt.listFiles");
      const OpenAI = require("openai");
      const chatgptApiKey = await NwtSettings.global.get("nwt.api.chatgpt-plus.key");
      const client = new OpenAI({
        apiKey: chatgptApiKey,
        dangerouslyAllowBrowser: true,
      });
      const result = await client.files.list();
      return result.data.map(file => {
        // Esto es para que sepas cómo es la API:
        return {
          ...file,
          id: file.id,
          filename: file.filename,
          bytes: file.bytes,
          purpose: file.purpose,
          created_at: file.created_at,
        };
      });
    }

    static async uploadFile(filepath) {
      const fs = require("fs");
      const path = require("path");
      const chatgptApiKey = await NwtSettings.global.get("nwt.api.chatgpt-plus.key");
      const buffer = fs.readFileSync(filepath);
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const formData = new FormData();
      formData.append("file", blob, path.basename(filepath));
      formData.append("purpose", "assistants");
      const response = await fetch("https://api.openai.com/v1/files", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${chatgptApiKey}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      return data; // { id, filename, purpose, ... }
    }

    static async uploadFiles(filepaths) {
      trace("NwtChatgpt.uploadFiles");
      for (let index = 0; index < filepaths.length; index++) {
        const filepath = filepaths[index];
        await this.uploadFile(filepath);
        // Este tiempo de espera es NECESARIO para evitar que lance errores el servidor de OpenAI:
        await NwtTimer.timeout(1000);
      }
    }

    static async deleteFiles(fileIds) {
      trace("NwtChatgpt.deleteFiles");
      const OpenAI = require("openai");
      const chatgptApiKey = await NwtSettings.global.get("nwt.api.chatgpt-plus.key");
      const client = new OpenAI({
        apiKey: chatgptApiKey,
        dangerouslyAllowBrowser: true,
      });
      const ids = Array.isArray(fileIds) ? fileIds : [fileIds];
      const results = [];
      for (const id of ids) {
        const res = await client.files.delete(id);
        results.push({
          id,
          deleted: res.deleted
        });
      }
      return results;
    }

    static async callToAction(systemPrompt, userPrompt) {
      trace("NwtChatgpt.callToAction");
      const OpenAI = require("openai");
      const chatgptApiKey = await NwtSettings.global.get("nwt.api.chatgpt-plus.key");
      const client = new OpenAI({
        apiKey: chatgptApiKey,
        dangerouslyAllowBrowser: true,
      });
      await this.increaseCounter();
      const response = await client.chat.completions.create({
        model: "gpt-5",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      });
      return response.choices[0].message.content;
    }

  };

  return NwtChatgpt;

});
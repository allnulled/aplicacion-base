/**
 * 
 * # Nwt Importer API
 * 
 * API para importar scripts y estilos.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtImporter
 * NwtFramework.Importer
 * Vue.prototype.$nwt.Importer
 * ```
 * 
 * ## Ventajas
 * 
 * Puede usarse así:
 * 
 * ```js
 * await NwtImporter.scriptSrc("https://domain.com/script.js");
 * await NwtImporter.linkStylesheet("https://domain.com/styles.css");
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtImporter'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtImporter'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtImporter = class {

    static scriptSrc(url) {
      trace("NwtImporter.scriptSrc");
      return new Promise((resolve, reject) => {
        if (!url) return reject(new Error("URL no válida"));
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error("Error cargando script: " + url));
        document.head.appendChild(script);
      });
    }

    static linkStylesheet(url) {
      trace("NwtImporter.linkStylesheet");
      return new Promise((resolve, reject) => {
        if (!url) return reject(new Error("URL no válida"));
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error("Error cargando stylesheet: " + url));
        document.head.appendChild(link);
      });
    }

    static requireNewly(subpath) {
      trace("NwtImporter.requireNewly");
      if(NwtEnvironment.isNode) {
        const fullpath = require("path").resolve(subpath);
        delete require.cache[fullpath];
        return require(fullpath);
      }
    }

    static async asyncSource(subpath, parameters = {}, scope = window) {
      trace("NwtImporter.asyncSource");
      const fullpath = require("path").resolve(subpath);
      const content = await require("fs").promises.readFile(fullpath, "utf8");
      return this.asyncFunction(content, parameters, scope);
    }

    static async vueComponentByFilesystem(subpath) {
      trace("NwtImporter.vueComponentByFilesystem");
      if (NwtEnvironment.hasGlobal) {
        const fs = require("fs");
        const path = require("path");
        const htmlPath = path.resolve(subpath + ".html");
        const cssPath = path.resolve(subpath + ".css");
        const jsPath = path.resolve(subpath + ".js");
        const htmlContent = await fs.promises.readFile(htmlPath, "utf8");
        const cssContent = await fs.promises.readFile(cssPath, "utf8");
        const jsTemplate = await fs.promises.readFile(jsPath, "utf8");
        const htmlStringified = `\`${htmlContent.replace(/`/g, "\\`")}\``;
        const jsContent = jsTemplate.replace("$template", htmlStringified);
        const result = await this.asyncFunction(jsContent);
        this.styleTag(cssContent);
        return result;
      }
    }

    static styleTag(cssString, id = null) {
      trace("NwtImporter.styleTag");
      if (id) {
        const existing = document.getElementById(id);
        if (existing) {
          existing.textContent = cssString;
          return existing;
        }
      }
      const style = document.createElement("style");
      if (id) {
        style.id = id;
      }
      style.type = "text/css";
      style.textContent = cssString;
      document.head.appendChild(style);
      return style;
    }

    static asyncFunction(code, parameters = {}, scope = window) {
      trace("NwtImporter.asyncFunction");
      const AsyncFunction = (async () => { }).constructor;
      const keys = Object.keys(parameters);
      const values = Object.values(parameters);
      const asyncFunction = new AsyncFunction(...keys, code);
      return asyncFunction.call(scope, ...values);
    }

    static asyncFactory(code, parameters = []) {
      trace("NwtImporter.asyncFunction");
      const AsyncFunction = (async () => { }).constructor;
      const asyncFactory = new AsyncFunction(...parameters, code);
      return asyncFactory;
    }

  };

  return NwtImporter;

});
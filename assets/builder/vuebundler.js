class vuebundler {

  static create(...args) {
    return new this(...args);
  }

  static onRenderJavascriptSource(source) {
    if(typeof NwtTemplates === "undefined") {
      return source;
    }
    return NwtTemplates.renderByTjs(source, { bundler: this });
  }

  static bundle(...args) {
    return this.create().bundle(...args);
  }

  static defaultOptions = {
    ignore: [],
    _module: true,
    packMode: false,
  };

  constructor(options = {}) {
    Object.assign(this, options);
  }

  _opener(id, _module = true, packMode = false) {
    let js = "";
    if (packMode === "sync-function") {
      js += "(function(factory) {\n";
      js += "  const mod = factory();\n";
      js += "  if(typeof window !== 'undefined') {\n";
      js += "    window[" + JSON.stringify(id) + "] = mod;\n";
      js += "  }\n";
      js += "  if(typeof global !== 'undefined') {\n";
      js += "    global[" + JSON.stringify(id) + "] = mod;\n";
      js += "  }\n";
      if (_module) {
        js += "  if(typeof module !== 'undefined') {\n";
        js += "    module.exports = mod;\n";
        js += "  }\n";
      }
      js += "})(function() {\n";
    } else if(packMode === "async-function") {
      js += "(async function() {\n";
      js += "  try {\n";
    } else {
      // @OK
      js += "";
    }
    return js;
  }

  _closer(packMode = false) {
    let js = "";
    if(packMode === "sync-function") {
      js += "});\n";
    } else if(packMode === "async-function") {
      js += "  } catch(error) {\n";
      js += "    console.log(error);\n";
      js += "  }\n";
      js += "})();\n";
    } else {
      js += "";
    }
    return js;
  }

  bundle(optionsInput = {}) {
    const options = Object.assign({}, this.constructor.defaultOptions, optionsInput);
    const { list, output, id, ignore = [], module: _module = true, packMode = false } = options;
    const fs = require("fs");
    const path = require("path");
    if (typeof list !== "string") {
      throw new Error("Required parameter «list» to be a string");
    }
    if (!fs.lstatSync(list).isFile()) {
      throw new Error("Required parameter «list» to poitn to a readable file");
    }
    if (typeof output !== "string") {
      throw new Error("Required parameter «output» to be a string");
    }
    if (typeof id !== "string") {
      throw new Error("Required parameter «id» to be a string");
    }
    if (!Array.isArray(ignore)) {
      throw new Error("Required parameter «ignore» to be an array");
    }
    if (typeof _module !== "boolean") {
      throw new Error("Required parameter «module» to be a boolean");
    }
    const outputpathJs = path.resolve(output);
    const outputpathCss = path.resolve(output).replace(/\.js$/g, ".css");
    const listpath = path.resolve(list);
    const nodes = require(listpath);
    let bundlingJs = "";
    let bundlingCss = "";
    bundlingJs += this._opener(id, _module, packMode);
    IteratingFiles:
    for (let index_node = 0; index_node < nodes.length; index_node++) {
      let templateHtml = "";
      const node = nodes[index_node];
      const isJs = node.endsWith(".js");
      const isCss = node.endsWith(".css");
      const files = (isJs || isCss) ? [node] : [
        node + ".html",
        node + ".js",
        node + ".css",
      ];
      if (isJs) {
        console.log(`[${index_node}] adding js ${node}`);
      } else if (isCss) {
        console.log(`[${index_node}] adding css ${node}`);
      } else {
        console.log(`[${index_node}] adding component ${node}`);
      }
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const filepath = path.resolve(file);
        const filename = path.basename(filepath);
        Apply_ignore_filters: {
          if (ignore.indexOf(file) !== -1) {
            continue IteratingFiles;
          }
          if (ignore.indexOf(filepath) !== -1) {
            continue IteratingFiles;
          }
          if (ignore.indexOf(filename) !== -1) {
            continue IteratingFiles;
          }
        }
        if (!fs.existsSync(filepath)) {
          if (filepath.endsWith(".js")) {
            throw new Error("Could not find file «" + filepath + "» on «vuebundler.bundle»");
          }
        }
        const content = fs.readFileSync(filepath).toString();
        bundlingJs += "\n// @vuebundler[" + id + "][" + index_node + "]=" + filepath + "\n";
        bundlingCss += "\n/* @vuebundler[" + id + "][" + index_node + "]=" + filepath + "*/\n";
        if (filename.endsWith(".html")) {
          templateHtml = this.printAsString(content);
        } else if (filename.endsWith(".js")) {
          if (templateHtml.length) {
            bundlingJs += this.replaceTemplate(content, templateHtml) + "\n";
          } else {
            let output = content;
            if(id.endsWith(".js")) {
              output = this.constructor.onRenderJavascriptSource(content);
            }
            bundlingJs += output + "\n";
          }
        } else if (filename.endsWith(".css")) {
          bundlingCss += content + "\n";
        }
      }
    }
    bundlingJs += this._closer(packMode);
    console.log("[*] Generating: ");
    console.log("  - " + outputpathJs);
    console.log("  - " + outputpathCss);
    fs.writeFileSync(outputpathJs, bundlingJs, "utf8");
    fs.writeFileSync(outputpathCss, bundlingCss, "utf8");
    return this;
  }

  printAsString(text) {
    return "`" + text.replace(/`/g, "\\`").replace(/\$/g, "\\$") + "`";
  }

  replaceTemplate(text, template) {
    return text.replace("$template", template);
  }

}

module.exports = vuebundler;
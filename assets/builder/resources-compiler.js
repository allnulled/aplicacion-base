const ResourcesCompiler = class {

  static beautify = undefined;

  static allHooks = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "destroyed",
    "errorCaptured"
  ];

  static renderJson(data, space = 2) {
    const fns = [];
    const output = JSON.stringify(data, (k, v) => {
      if (typeof v === "function") {
        return `__FUNCTION_${fns.push(v.toString()) - 1}__`;
      }
      if (typeof v === "object" && typeof v.$$$type === "string" && typeof v.source === "string" && Object.keys(v).length === 2) {
        return `__LOW_CODE_${fns.push(v.source) - 1}__`;
      }
      return v;
    }, space)
    return (output || "")
      .replace(/"__FUNCTION_(\d+)__"/g, (match, id) => {
        return fns[id];
      })
      .replace(/"__LOW_CODE_(\d+)__"/g, (match, id) => {
        return fns[id];
      });
  }

  static renderValue(data) {
    if (typeof data === "undefined") return "";
    if (data === "") return "";
    return this.renderJson(data);
  }

  static renderViewObjectGroup(id, base) {
    const group = {};
    Iterating_inheritance:
    for (let index = 0; index < base.$inheritedBy.length; index++) {
      const inheritedInterface = base.$inheritedBy[index];
      if (!inheritedInterface.view) {
        continue Iterating_inheritance;
      }
      if (!inheritedInterface.view[id]) {
        continue Iterating_inheritance;
      }
      Object.assign(group, inheritedInterface.view[id]);
    }
    if (base.view && base.view[id]) {
      Object.assign(group, base.view[id]);
    }
    const output = this.renderValue(group);
    return output ? `${id}: ${output},` : "";
  };

  static renderViewReactiveGroup(id, base) {
    const sources = [
      ...base.$inheritedBy,
      base
    ];
    const bag = {};
    Iterating_sources:
    for (const src of sources) {
      const block = src.view ? src.view[id] : undefined;
      if (!block) {
        continue Iterating_sources;
      }
      for (const key of Object.keys(block)) {
        if (!bag[key]) {
          bag[key] = [];
        }
        bag[key].push(block[key]);
      }
    }
    // Transformación para salida
    const out = {};
    for (const key of Object.keys(bag)) {
      const list = bag[key];
      out[key] = list.length === 1
        ? list[0]
        : list;
    }
    const rendered = this.renderValue(out);
    return rendered ? `${id}: ${rendered},` : "";
  }

  static renderViewHooks(base) {
    const others = base.$inheritedBy;
    let code = [];
    const AsyncFunction = (async () => { }).constructor;
    Iterating_all_hooks:
    for (let indexHook = 0; indexHook < this.allHooks.length; indexHook++) {
      const hookId = this.allHooks[indexHook];
      const baseCallback = base.view ? base.view[hookId] : undefined;
      const hookCode = [];
      let hasAsyncs = false;
      Iterating_interfaces:
      for (let indexInterface = 0; indexInterface < others.length; indexInterface++) {
        const otherCallback = others[indexInterface].view ? others[indexInterface].view[hookId] : undefined;
        const isAsync = otherCallback instanceof AsyncFunction;
        if (isAsync) {
          hasAsyncs = true;
        }
        const callbackSource = this.renderValue(otherCallback);
        if (callbackSource) {
          hookCode.push(
            `// @COMPILED-BY: ${others[indexInterface].$id}\n${isAsync ? "await " : ""}(${callbackSource}).call(this);`
          );
        }
      }
      const callbackSource = this.renderValue(baseCallback);
      const isAsync = baseCallback instanceof AsyncFunction;
      if (isAsync) {
        hasAsyncs = true;
      }
      if (baseCallback) {
        hookCode.push(
          `// @COMPILED-BY: ${base.$id}\n${isAsync ? "await " : ""}(${callbackSource}).call(this);`
        );
      }
      if (hookCode.length) {
        code.push(`${hookId}: ${hasAsyncs ? "async " : ""}function() {\n`);
        code = code.concat(hookCode.join("\n").trim());
        code.push(`\n},`);
      }
    }
    code = code.filter(it => it !== "");
    if (code.length === 0) return "";
    return code.join("").trim();
  };

  static renderViewData(base, metadata) {
    const others = base.$inheritedBy;
    const hookOutput = [];
    const AsyncFunction = (async () => { }).constructor;
    let hasAsync = false;
    for (let indexInterface = 0; indexInterface < others.length; indexInterface++) {
      const otherInterface = others[indexInterface];
      const dataCallback = otherInterface.view?.data;
      const isAsync = dataCallback instanceof AsyncFunction;
      if (isAsync) {
        hasAsync = true;
      }
      const hookCode = this.renderValue(dataCallback);
      hookOutput.push({
        path: otherInterface.$id,
        data: hookCode,
        isAsync,
      });
    }
    const dataCallback = base.view?.data;
    const isAsync = dataCallback instanceof AsyncFunction;
    if (isAsync) {
      hasAsync = true;
    }
    const hookCode = this.renderValue(dataCallback);
    hookOutput.push({
      path: base.$id,
      data: hookCode,
      isAsync,
    });
    Render: {
      let dataSource = hookOutput.filter(it => it.data !== "").map(it => {
        return [
          `\n// @COMPILED-BY: ${it.path}`,
          `Object.assign(finalData, ${it.isAsync ? "await " : ""}(${it.data}).call(this));`,
        ].join("\n");
      }).join("").trim();
      dataSource = `const finalData = {};\n${dataSource}\nreturn finalData;\n`;
      dataSource = `data: ${hasAsync ? "async " : ""}function() {\n${dataSource}\n},`;
      return dataSource;
    }
  }

  static existsAsFile(filepath) {
    try {
      return require("fs").lstatSync(filepath).isFile();
    } catch (error) {
      return false;
    }
  }

  static LowCode = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(source) {
      assertion(typeof source === "string", "Parameter «source» must be string on «LowCode.constructor»");
      this.$$$type = "LowCode";
      this.source = source;
    }

    static type = {
      String: this.create("String"),
      Boolean: this.create("Boolean"),
      Number: this.create("Number"),
      Object: this.create("Object"),
      Array: this.create("Array"),
      Function: this.create("Function"),
      Undefined: this.create("undefined"),
      Null: this.create("null"),
      Vue: this.create("Vue"),
      Any: this.create([
        "[",
        "String,",
        "Boolean,",
        "Number,",
        "Object,",
        "Array,",
        "Function,",
        "undefined,",
        "null",
        "]",
      ].join("")),
      AnyExcept: (...exceptions) => {
        return this.create("[" + Object.keys(this.type).filter(it => (!it.startsWith("Any")) && (exceptions.indexOf(it) === -1)).join(",") + "]");
      },
    }

  }

  static requireLive(file, injectionsUser = {}, scope = this) {
    const fs = require("fs");
    const templateFile = file.replace(/\.js$/g, ".html");
    const hasTemplate = this.existsAsFile(templateFile);
    const injections = Object.assign({}, injectionsUser, {
      LowCode: this.LowCode,
      __dirname: require("path").dirname(file),
      __filename: file,
      module: {
        exports: undefined
      }
    });
    if(hasTemplate) {
      Object.assign(injections, {
        $template: "\n" + fs.readFileSync(templateFile, "utf8")
      });
    }
    const code = fs.readFileSync(file).toString();
    const callback = new Function(...Object.keys(injections), code);
    const result = callback.call(scope, ...Object.values(injections));
    return typeof result !== "undefined" ? result : injections.module.exports;
  }

  static resolveInheritedBy(definition, projectRoot, metadata, originalDefinition = false) {
    if (!(definition.inherits)) return;
    assertion(typeof definition.id === "string", `Configuration «id» must be string on «${metadata.id}» on «ResourcesCompiler.resolveInheritedBy»`);
    definition.$inheritedBy = [];
    definition.$id = definition.id;
    definition.$path = `assets/framework/browser/components/nwt-resource/compilable/${definition.$id}/compilable.js`;
    const compilablesDir = require("path").resolve(projectRoot, "assets/framework/browser/components/nwt-resource/compilable");
    originalDefinition ||= definition;
    for (let index = 0; index < definition.inherits.length; index++) {
      const inheritedId = definition.inherits[index];
      const inheritedInterface = this.requireLive(`${compilablesDir}/${inheritedId}/compilable.js`);
      inheritedInterface.$id = inheritedId;
      inheritedInterface.$path = `assets/framework/browser/components/nwt-resource/compilable/${definition.$id}/compilable.js`;
      this.resolveInheritedBy(inheritedInterface, projectRoot, metadata, originalDefinition);
      originalDefinition.$inheritedBy.push(inheritedInterface);
    }
  }

  static renderText(txt) {
    return `\`${txt.replace(/\`/g, "\\`").replace(/\n/g, "\n      ")}\``;
  }

  static renderViewTemplate(definition, metadata) {
    if (definition.view) return "";
    if (definition.view.template) return `template: ${this.renderText(definition.view.template)},`;
    if (!definition.$inheritedBy) return "";
    const inheritedBy = definition.$inheritedBy.reverse();
    for (let index = 0; index < inheritedBy.length; index++) {
      const ancestor = inheritedBy[index];
      if (ancestor.view?.template) {
        return `template: ${this.renderText(ancestor.view.template)},`;
      }
    }
    return "";
  }

  static renderId(definition, metadata) {
    assertion(typeof definition.id === "string", "Parameter «definition.id» must be string on «ResourcesCompiler.renderId»");
    return `id: ${JSON.stringify(definition.id)},`;
  }

  static renderApis(definition, metadata) {
    if (!definition.apis) return "";
    return `apis: ${JSON.stringify(definition.apis, null, 2)},`;
  }

  static renderInherits(definition, metadata) {
    if (!definition.inherits) return "";
    return `inherits: ${JSON.stringify(definition.$inheritedBy.map(it => it.id), null, 2)},`;
  }

  static renderTraits(definition, metadata) {
    const finalTraits = {};
    Inherited_traits: {
      if(!definition.$inheritedBy) break Inherited_traits;
      if(!definition.$inheritedBy.length) break Inherited_traits;
      Iterating_inheritance:
      for(let index=0; index<definition.$inheritedBy.length; index++) {
        const inheritedDefinition = definition.$inheritedBy[index];
        if(!inheritedDefinition.traits) continue Iterating_inheritance;
        if(!Object.keys(inheritedDefinition.traits).length) continue Iterating_inheritance;
        Object.assign(finalTraits, {
          [inheritedDefinition.id]: inheritedDefinition.traits,
        });
      }
    }
    Self_traits: {
      if(!definition.traits) break Self_traits;
      if(!Object.keys(definition.traits).length) break Self_traits;
      Object.assign(finalTraits, {
        [definition.id]: definition.traits,
      });
    }
    definition.traits = finalTraits;
    const traitsSource = this.renderValue(definition.traits);
    return traitsSource ? `traits: ${traitsSource},` : "";
  }

  static renderOtherProperties(definition, metadata) {
    const excludedProps = ["id", "apis", "inherits", "traits", "view"];
    const output = [];
    Iterating_props:
    for (let prop in definition) {
      if (excludedProps.includes(prop)) continue Iterating_props;
      if (prop.startsWith("$")) continue Iterating_props;
      output.push(`${prop}: ${this.renderValue(definition[prop])},`);
    }
    return output.join("\n");
  }

  static renderOtherViewProperties(definition, metadata) {
    const excludedProps = [
      "name",
      "props",
      "data",
      "methods",
      "computed",
      "watch",
      "template",
      ...this.allHooks,
    ];
    const output = [];
    Iterating_props:
    for (let viewProp in definition.view) {
      if (excludedProps.includes(viewProp)) continue Iterating_props;
      if (viewProp.startsWith("$")) continue Iterating_props;
      output.push(`${viewProp}: ${this.renderValue(definition.view[viewProp])},`);
    }
    return output.join("\n");
  }

  static compile(definition, projectRoot, metadata) {
    this.resolveInheritedBy(definition, projectRoot, metadata);
    const sourceBrute = [
      `NwtResource.define({`,
      this.renderId(definition, metadata),
      this.renderApis(definition, metadata),
      this.renderInherits(definition, metadata),
      this.renderTraits(definition, metadata),
      this.renderOtherProperties(definition, metadata),
      ...definition.view ? [
        `view: {`,
        "name: " + this.renderValue(definition.view?.name) + ",",
        this.renderViewObjectGroup("props", definition, metadata),
        this.renderViewTemplate(definition, metadata),
        this.renderViewData(definition, metadata),
        this.renderViewObjectGroup("methods", definition, metadata),
        this.renderViewObjectGroup("computed", definition, metadata),
        this.renderViewReactiveGroup("watch", definition, metadata),
        this.renderViewHooks(definition, metadata),
        this.renderOtherViewProperties(definition, metadata),
        `}`,
      ] : [],
      `});`,
    ].filter(Boolean).join("\n");
    try {
      const beautified = this.beautify.js(sourceBrute, {
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 1,
        preserve_newlines: false,
        brace_style: "collapse",
        wrap_line_length: 80,
      });
      return beautified;
    } catch (error) {
      return sourceBrute;
    }
  }

};

module.exports = function (projectRoot) {
  const fs = require("fs-extra");
  const path = require("path");
  const fastGlob = require("fast-glob");
  const compilablesDir = path.resolve(projectRoot, "assets/framework/browser/components/nwt-resource/compilable");
  const compiledsDir = path.resolve(projectRoot, "assets/framework/browser/components/nwt-resource/compiled");
  const compilablesGlob = path.resolve(compilablesDir, "**/compilable.js");
  const found = fastGlob.sync(compilablesGlob);
  let compileds = [];
  ResourcesCompiler.beautify = require(`${projectRoot}/assets/external/js-beautify/js-beautify.js`);
  assertion(typeof ResourcesCompiler.beautify === "object", "Required library «beautify.js» on «builder/resources-compiler.js»");
  for (let index = 0; index < found.length; index++) {
    const item = found[index];
    const id = item.replace(compilablesDir + "/", "").replace(/\/compilable\.js$/g, "");
    const definition = ResourcesCompiler.requireLive(item);
    assertion(typeof definition === "object", `Compilable source at «${id}» must return object from export function on «builder/resources-compiler.js»`);
    assertion(typeof definition.id === "string", `Compilable source at «${id}» must return property «id» as string on «builder/resources-compiler.js»`);
    assertion(Array.isArray(definition.apis), `Compilable source at «${id}» must return property «apis» as array on «builder/resources-compiler.js»`);
    definition.$id = id;
    const relativePath = item.replace(projectRoot, "");
    if (typeof definition.view?.name !== "undefined") {
      const outputPath = path.resolve(compiledsDir, id, "compiled.js");
      const outputSource = ResourcesCompiler.compile(definition, projectRoot, { id, relativePath });
      fs.ensureFileSync(outputPath, outputSource, "utf8");
      fs.writeFileSync(outputPath, outputSource, "utf8");
      compileds.push(outputPath);
    }
  }
  fs.writeFileSync(__dirname + "/bundlelist-resources.json", JSON.stringify(compileds, null, 2), "utf8");
};
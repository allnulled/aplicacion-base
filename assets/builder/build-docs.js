const path = require("path");
const fs = require("fs");
const JavadocBrute = require("@allnulled/javadoc-brute");

const main = async function () {

  const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

  const apis = [
    "browser/components/common-dialogs",
    "browser/components/common-toasts",
    "browser/components/common-errors",
    "browser/components/common-injections/common-injections.js",
    "browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer.js",
    "browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer.js",
    "browser/components/nwt-source-viewer/nwt-source-viewer.js",
    "browser/components/nwt-tester-ui/nwt-tester-viewer/nwt-tester-viewer.js",
    "browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer.js",
    "browser/components/nwt-settings-viewer/nwt-settings-viewer.js",
    "nwt-command/nwt-command.js",
    "nwt-command/nwt-commands-manager.js",
    "nwt-persister/nwt-persister.js",
    "nwt-persister/nwt-directory-persister.js",
    "nwt-persister/nwt-file-persister.js",
    "nwt-persister/nwt-json-persister.js",
    "nwt-persister/nwt-jsonl-persister.js",
    "nwt-filetree",
    "nwt-interruption",
    "nwt-js-controllers",
    "nwt-string-shortener",
    "nwt-templates/nwt-templates.js",
    "nwt-argumenter.js",
    "nwt-array-utils.js",
    "nwt-asserter.js",
    "nwt-ast-tree-class.js",
    // "nwt-ast-tree-template-source.js",
    "nwt-boot.js",
    "nwt-cache-directory.js",
    "nwt-chatgpt.js",
    "nwt-clipboard.js",
    "nwt-code-composer.js",
    "nwt-collection-utils.js",
    "nwt-csv.js",
    "nwt-debug.js",
    "nwt-dialog-definition.js",
    "nwt-dom.js",
    "nwt-environment.js",
    "nwt-error-utils.js",
    "nwt-errors-manager.js",
    "nwt-exporter.js",
    "nwt-file-chooser.js",
    "nwt-filesystem.js",
    "nwt-globalizer.js",
    "nwt-importer.js",
    "nwt-injection.js",
    "nwt-iterable-class.js",
    "nwt-iterable-command-class.js",
    "nwt-iterable-function.js",
    "nwt-json-storer.js",
    "nwt-lazy-loader.js",
    "nwt-live-injector.js",
    "nwt-object-utils.js",
    "nwt-pack.js",
    "nwt-paths.js",
    "nwt-procedure-definition.js",
    "nwt-procedure-injections.js",
    "nwt-procedure-seed.js",
    "nwt-procedures-manager.js",
    "nwt-process-manager.js",
    "nwt-process.js",
    "nwt-progress-bar.js",
    "nwt-prompts-manager.js",
    "nwt-proxy-chain.js",
    "nwt-randomizer.js",
    "nwt-settings.js",
    "nwt-shell.js",
    "nwt-string-shortener.js",
    "nwt-strings.js",
    "nwt-tester.js",
    "nwt-timer.js",
    "nwt-tracer.js",
    "nwt-utils.js",
    "nwt-vue2.js",
  ].map(id => {
    return {
      from: path.resolve(`${PROJECT_ROOT}/assets/framework/${id}`),
      to: path.resolve(`${PROJECT_ROOT}/documentation/${id.replace(/\//g, ".")}.md`),
    };
  });

  const generateMarkdownTree = function (baseDir, ignores = [], depth = 0) {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(e => !ignores.includes(e.name))
      .sort((a, b) => (a.isDirectory() ? -1 : 1)); // carpetas primero
    let md = "";
    const indent = "  ".repeat(depth);
    for (const entry of entries) {
      const prefix = entry.isDirectory() ? "📁" : "📄";
      md += `${indent}- ${prefix} ${entry.name}\n`;
      if (entry.isDirectory()) {
        const subdir = path.join(baseDir, entry.name);
        md += generateMarkdownTree(subdir, ignores, depth + 1);
      }
    }
    return md;
  };

  const generateTOCFromMarkdown = function (mdText) {
    const lines = mdText.split(/\r?\n/);
    const toc = [];
    const headingRegex = /^(#{1,6})\s+(.*)$/; // Coincide con # H1, ## H2, etc.
    for (const line of lines) {
      const match = line.match(headingRegex);
      if (match) {
        const level = match[1].length; // número de #
        let title = match[2].trim();
        // Genera un id-friendly para link ancla
        const anchor = title.toLowerCase()
          .replace(/[^\w\s-]/g, "")  // quita caracteres raros
          .replace(/\s+/g, "-");     // espacios -> guiones
        const indent = "  ".repeat(level - 1);
        toc.push(`${indent}- [${title}](#${anchor})`);
      }
    }
    return toc.join("\n");
  };

  let llmMd = "";

  for (let index = 0; index < apis.length; index++) {
    const api = apis[index];
    const javadocOptions = {
      include: [api.from],
      exclude: api.exclude || ["node_modules"],
      output: api.to,
    };
    console.log(javadocOptions);
    await JavadocBrute.extractComments(javadocOptions);
    try {
      llmMd += fs.readFileSync(api.to).toString();
    } catch (error) {
      console.log(error);
    }
  }

  const tableOfContents = generateTOCFromMarkdown(llmMd);
  const structureOfProject = generateMarkdownTree(__dirname + "/../..", ["node_modules", ".git"]);

  llmMd = `# Documentación en fichero único

Este documento contiene toda la documentación del proyecto en un solo fichero.

Orientado a informar a un LLM desde una URL del proyecto.

Además, hace una tabla de contenidos general e imprime la estructura del proyecto.

# Tabla de contenidos

${tableOfContents}

${llmMd}

`;

  fs.writeFileSync(`${PROJECT_ROOT}/README-NWT.md`, llmMd, "utf8");

};

main();
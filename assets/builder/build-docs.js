const path = require("path");
const fs = require("fs");
const JavadocBrute = require("@allnulled/javadoc-brute");

const main = async function () {

  const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

  const apis = [
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/common-dialogs`],
      to: `${PROJECT_ROOT}/documentation/dialogs-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/common-toasts`],
      to: `${PROJECT_ROOT}/documentation/toasts-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/common-errors`],
      to: `${PROJECT_ROOT}/documentation/errors-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-asserter.js`],
      to: `${PROJECT_ROOT}/documentation/asserter-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-globalizer.js`],
      to: `${PROJECT_ROOT}/documentation/globalizer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-importer.js`],
      to: `${PROJECT_ROOT}/documentation/importer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-randomizer.js`],
      to: `${PROJECT_ROOT}/documentation/randomizer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-environment.js`],
      to: `${PROJECT_ROOT}/documentation/environment-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-json-storer.js`],
      to: `${PROJECT_ROOT}/documentation/json-storer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-settings.js`],
      to: `${PROJECT_ROOT}/documentation/settings-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-settings-viewer/nwt-settings-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/settings-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-tester.js`],
      to: `${PROJECT_ROOT}/documentation/tester-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-process.js`],
      to: `${PROJECT_ROOT}/documentation/process-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-process-manager.js`],
      to: `${PROJECT_ROOT}/documentation/process-manager-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/process-manager-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-dialog-definition.js`],
      to: `${PROJECT_ROOT}/documentation/dialog-definition-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-tester-ui/nwt-tester-viewer/nwt-tester-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/tester-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-timer.js`],
      to: `${PROJECT_ROOT}/documentation/timer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-utils.js`],
      to: `${PROJECT_ROOT}/documentation/utils-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-lazy-loader.js`],
      to: `${PROJECT_ROOT}/documentation/lazy-loader-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-pack.js`],
      to: `${PROJECT_ROOT}/documentation/globals-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-progress-bar.js`],
      to: `${PROJECT_ROOT}/documentation/progress-bar-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/progress-bar-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/directives/v-draggable.js`],
      to: `${PROJECT_ROOT}/documentation/v-draggable-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/directives/v-resizable.js`],
      to: `${PROJECT_ROOT}/documentation/v-resizable-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/common-injections/common-injections.js`],
      to: `${PROJECT_ROOT}/documentation/common-injections-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-injection.js`],
      to: `${PROJECT_ROOT}/documentation/injection-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-shell.js`],
      to: `${PROJECT_ROOT}/documentation/shell-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-procedure-injections-api.js`],
      to: `${PROJECT_ROOT}/documentation/procedure-injections-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-procedure-definition-api.js`],
      to: `${PROJECT_ROOT}/documentation/procedure-definition-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-procedure-documentation-viewer-api.js`],
      to: `${PROJECT_ROOT}/documentation/procedure-documentation-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-procedure-seed-api.js`],
      to: `${PROJECT_ROOT}/documentation/procedure-seed-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-procedures-manager-api.js`],
      to: `${PROJECT_ROOT}/documentation/procedures-manager-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/procedures-manager-viewer-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/nwt-csv.js`],
      to: `${PROJECT_ROOT}/documentation/csv-api.md`
    },
    {
      from: [`${PROJECT_ROOT}/assets/framework/browser/components/nwt-source-viewer/nwt-source-viewer.js`],
      to: `${PROJECT_ROOT}/documentation/source-viewer-api.md`
    }
  ];

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
    await JavadocBrute.extractComments({
      include: api.from,
      exclude: api.exclude || [],
      output: api.to,
    });
    llmMd += fs.readFileSync(api.to).toString();
  }

  const tableOfContents = generateTOCFromMarkdown(llmMd);
  const structureOfProject = generateMarkdownTree(__dirname + "/../..", ["node_modules", ".git"]);

  llmMd = `# Documentación en fichero único

Este documento contiene toda la documentación del proyecto en un solo fichero.

Orientado a informar a un LLM desde una URL del proyecto.

Además, hace una tabla de contenidos general e imprime la estructura del proyecto.

# Tabla de contenidos

${tableOfContents}

# Estructura del proyecto

${structureOfProject}

${llmMd}

`;

  fs.writeFileSync(`${PROJECT_ROOT}/llm.md`, llmMd, "utf8");

};

main();
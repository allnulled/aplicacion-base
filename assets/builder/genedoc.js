const fs = require("fs/promises");
const path = require("path");

const ROOT = __dirname + "/../..";
const INPUT_TEMPLATE = __dirname + "/genedoc.ejs";
const OUTPUT = __dirname + "/genedoc.json";
const OUTPUT_MARKDOWN = path.resolve(ROOT, "README-API.md");
const PATTERN = /^nwt\-/g;

function diehere(...things) {
  console.log(...things);
  process.exit(1);
}

function toCamelCase(t) {
  return t.replace(/\-./g, m => m.substr(1).toUpperCase());
}

function fromCaseToCapitalized(t) {
  return t.substr(0, 1).toUpperCase() + toCamelCase(t.substr(1));
}

async function getExtraAttributesFrom(entry, relPath, entryType) {
  const extra = {};
  if (entryType === "file") {
    extra.formalName = fromCaseToCapitalized(entry.name.replace(/\.[^\.]+/g, m => "-" + m.substr(1)));
  }
  return extra;
}

function getRelativePathFrom(subpath) {
  return subpath.replace(ROOT + "/", "");
}

function generateMarkdownFor(tree) {
  return require("ejs").renderFile(INPUT_TEMPLATE, { tree }, { async: true });
}

async function decorateTree(dir, nodes = []) {
  if (dir.endsWith("node_modules")) return nodes;
  if (dir.endsWith("documentation")) return nodes;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  console.log("Analizando: " + dir);
  for (const entry of entries) {
    const isMatch = entry.name.match(PATTERN);
    const fullPath = path.join(dir, entry.name);
    const relPath = getRelativePathFrom(fullPath);
    const isDirectory = entry.isDirectory();
    const entryType = isDirectory ? "directory" : "file";
    let currentNode = undefined;
    if (isDirectory) {
      await decorateTree(fullPath, nodes);
    }
    currentNode = {
      path: relPath,
      name: entry.name,
      type: entryType,
      ...await getExtraAttributesFrom(entry, relPath, entryType),
    };
    if ((!isDirectory) && isMatch) {
      console.log("Registrando: ", currentNode);
      nodes.push(currentNode);
    }
  }
  return nodes;
}

function comprimeTree(tree) {
  const compression = [];
  const foundHtml = {};
  const foundCss = {};
  Extract_compressables:
  for (let index = 0; index < tree.nodes.length; index++) {
    const nodeName = tree.nodes[index].formalName;
    const isHtml = nodeName.endsWith("Html");
    const isCss = nodeName.endsWith("Css");
    const itsJs = nodeName.replace(/(Html|Css)$/g, "Js");
    if (isHtml || isCss) {
      let foundStore = isHtml ? foundHtml : isCss ? foundCss : false;
      foundStore[itsJs] = nodeName;
    }
  }
  // diehere(foundHtml, foundCss); // sale bien
  Inject_with_compressables:
  for (let index = 0; index < tree.nodes.length; index++) {
    const item = tree.nodes[index];
    const nodeName = item.formalName;
    const isHtml = nodeName.endsWith("Html");
    const isCss = nodeName.endsWith("Css");
    const isJs = nodeName.endsWith("Js"); // variable anecdótica, en principio,
    const hasHtml = nodeName in foundHtml;
    const hasCss = nodeName in foundCss;
    const isVue = hasHtml || hasCss;
    let output = item;
    Add_component_data:
    if (isJs && isVue) {
      let outputName = [nodeName];
      if (hasHtml) {
        outputName.push(foundHtml[nodeName]);
      }
      if (hasCss) {
        outputName.push(foundCss[nodeName]);
      }
      output = {
        ...item,
        formalName: nodeName,
        isVueComponent: true,
        componentName: outputName,
      };
    }
    Add_other_data:
    if(isJs) {
      output = {
        ...output,
        apiName: nodeName.replace(/Js$/g, ""),
      };
    }
    compression.push(output);
  }
  tree.nodes = compression;
}

function deduplicateStrings(list) {
  const out = [];
  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    if (!out.includes(item)) {
      out.push(item);
    }
  }
  return out;
}

async function addDependencies(tree) {
  for (let index = 0; index < tree.nodes.length; index++) {
    const item = tree.nodes[index];
    const fullpath = require("path").resolve(tree.root, item.path);
    const content = await require("fs").promises.readFile(fullpath, "utf8");
    let allMatches = [];
    Matches_for_nwt_dependencies: {
      const matches = content.match(/Nwt[A-Za-z0-9$_]+/g) ?? [];
      const uniqueMatches = deduplicateStrings(matches);
      allMatches = allMatches.concat(uniqueMatches);
    }
    Matches_for_requires: {
      const matches = content.match(/require\([^\)]+\)/g) ?? [];
      const uniqueMatches = deduplicateStrings(matches);
      allMatches = allMatches.concat(uniqueMatches);
    }
    Matches_for_window_and_global: {
      const matches = content.match(/[^\.\]](globalThis|global|window)\.[A-Za-z0-9_$]+/g) ?? [];
      const uniqueMatches = deduplicateStrings(matches.map(it => it.substr(1)));
      allMatches = allMatches.concat(uniqueMatches);
    }
    tree.nodes[index].dependencies = allMatches;
  }
}

async function main() {
  console.log("[+] Starting genedoc at:", OUTPUT);
  const tree = {
    root: ROOT,
    generatedAt: new Date().toISOString(),
    nodes: await decorateTree(ROOT)
  };
  await comprimeTree(tree);
  await addDependencies(tree);
  await fs.writeFile(OUTPUT, JSON.stringify(tree, null, 2), "utf8");
  console.log("[+] Genedoc tree written to:", OUTPUT);
  const mdCode = await generateMarkdownFor(tree);
  await fs.writeFile(OUTPUT_MARKDOWN, mdCode, "utf8")
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
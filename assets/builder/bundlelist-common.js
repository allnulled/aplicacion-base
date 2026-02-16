const projectRoot = require("path").resolve(__dirname, "..", "..");

Compilations: {
  const wrapInCommonModule = function(moduleId, moduleSource) {
    return `(function (factory) {
      const mod = factory();
      if (typeof window !== 'undefined') {
        window['${moduleId}'] = mod;
      }
      if (typeof global !== 'undefined') {
        global['${moduleId}'] = mod;
      }
      if (typeof module !== 'undefined') {
        module.exports = mod;
      }
    })(function () {
      ${moduleSource}
    });`;
  }
  Ast_file_tree_template_source: {
    const outFile = `${projectRoot}/assets/framework/nwt-ast-tree-template-source.js`;
    const templateFile = `${projectRoot}/assets/framework/nwt-templates/templates/nwt/nwt-ast-tree/template.js`;
    const outContent = wrapInCommonModule("NwtAstTreeTemplateSource", `return ${JSON.stringify(require("fs").readFileSync(templateFile).toString())}`);
    require("fs").writeFileSync(outFile, outContent, "utf8");
  }
}

module.exports = [
  `${projectRoot}/assets/framework/nwt-boot.js`,
  `${projectRoot}/assets/framework/nwt-tracer.js`,
  `${projectRoot}/assets/framework/nwt-environment.js`,
  `${projectRoot}/assets/framework/nwt-browser-polyfill.js`,
  `${projectRoot}/assets/framework/nwt-argumenter.js`,
  `${projectRoot}/assets/framework/nwt-asserter.js`,
  `${projectRoot}/assets/framework/nwt-debug.js`,
  `${projectRoot}/assets/framework/nwt-constrainer.js`,
  `${projectRoot}/assets/framework/nwt-errors-manager.js`,
  `${projectRoot}/assets/framework/nwt-error-utils.js`,
  `${projectRoot}/assets/framework/nwt-dialog-definition.js`,
  `${projectRoot}/assets/framework/nwt-importer.js`,
  `${projectRoot}/assets/framework/nwt-events/nwt-events-manager.js`,
  `${projectRoot}/assets/framework/nwt-events/nwt-events.js`,
  `${projectRoot}/assets/framework/nwt-paths.js`,
  `${projectRoot}/assets/framework/nwt-abort.js`,
  `${projectRoot}/assets/framework/nwt-strings.js`,
  `${projectRoot}/assets/framework/nwt-object-utils.js`,
  `${projectRoot}/assets/framework/nwt-array-utils.js`,
  `${projectRoot}/assets/framework/nwt-collection-utils.js`,
  `${projectRoot}/assets/framework/nwt-module-manager/nwt-module-manager.js`,
  `${projectRoot}/assets/framework/nwt-timer.js`,
  `${projectRoot}/assets/framework/nwt-vue2.js`,
  `${projectRoot}/assets/framework/nwt-prototyper.js`,
  `${projectRoot}/assets/framework/nwt-dom-automator.js`,
  `${projectRoot}/assets/framework/nwt-lazy-loader.js`,
  `${projectRoot}/assets/framework/nwt-json-storer.js`,
  `${projectRoot}/assets/framework/nwt-settings.js`,
  `${projectRoot}/assets/framework/nwt-accessor.js`,
  `${projectRoot}/assets/framework/nwt-js-controllers/nwt-js-controller.js`,
  `${projectRoot}/assets/framework/nwt-js-controllers/nwt-js-return-controller.js`,
  `${projectRoot}/assets/framework/nwt-js-controllers/nwt-js-throw-controller.js`,
  `${projectRoot}/assets/framework/nwt-templates/tjs-parser.js`,
  `${projectRoot}/assets/framework/nwt-templates/nwt-templates.js`,
  `${projectRoot}/assets/framework/nwt-utils.js`,
  `${projectRoot}/assets/framework/nwt-interruption/nwt-interruptible.js`,
  `${projectRoot}/assets/framework/nwt-interruption/nwt-interruption.js`,
  `${projectRoot}/assets/framework/nwt-interruption/nwt-interruption-handler.js`,
  `${projectRoot}/assets/framework/nwt-code-composer.js`,
  `${projectRoot}/assets/framework/nwt-randomizer.js`,
  `${projectRoot}/assets/framework/nwt-progress-bar.js`,
  `${projectRoot}/assets/framework/nwt-globalizer.js`,
  `${projectRoot}/assets/framework/nwt-tester.js`,
  `${projectRoot}/assets/framework/nwt-process.js`,
  `${projectRoot}/assets/framework/nwt-process-manager.js`,
  `${projectRoot}/assets/framework/nwt-procedure-seed.js`,
  `${projectRoot}/assets/framework/nwt-procedure-definition.js`,
  `${projectRoot}/assets/framework/nwt-procedures-manager.js`,
  `${projectRoot}/assets/framework/nwt-procedure-injections.js`,
  `${projectRoot}/assets/framework/nwt-csv.js`,
  `${projectRoot}/assets/framework/nwt-iterable-function.js`,
  `${projectRoot}/assets/framework/nwt-iterable-class.js`,
  `${projectRoot}/assets/framework/nwt-iterable-command-class.js`,
  `${projectRoot}/assets/framework/nwt-filesystem.js`,
  `${projectRoot}/assets/framework/nwt-file-chooser.js`,
  `${projectRoot}/assets/framework/nwt-shell.js`,
  `${projectRoot}/assets/framework/nwt-live-injector.js`,
  `${projectRoot}/assets/framework/nwt-prompts-manager.js`,
  `${projectRoot}/assets/framework/nwt-chatgpt.js`,
  `${projectRoot}/assets/framework/nwt-string-shortener/nwt-string-shortener.js`,
  `${projectRoot}/assets/framework/nwt-persister/nwt-json-persister.js`,
  `${projectRoot}/assets/framework/nwt-persister/nwt-jsonl-persister.js`,
  `${projectRoot}/assets/framework/nwt-persister/nwt-file-persister.js`,
  `${projectRoot}/assets/framework/nwt-persister/nwt-directory-persister.js`,
  `${projectRoot}/assets/framework/nwt-persister/nwt-persister.js`,
  `${projectRoot}/assets/framework/nwt-ast-tree-template-source.js`,
  `${projectRoot}/assets/framework/nwt-ast-tree-class.js`,
  `${projectRoot}/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.js`,
  `${projectRoot}/assets/framework/nwt-filetree/selector/nwt-filetree-selector.js`,
  `${projectRoot}/assets/framework/nwt-filetree/selector/nwt-filetree-selector-interpreter.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-node.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-glob.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-directory.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-file.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-json.js`,
  `${projectRoot}/assets/framework/nwt-filetree/interfaces/nwt-filetree-property.js`,
  `${projectRoot}/assets/framework/nwt-dom.js`,
  `${projectRoot}/assets/framework/nwt-exporter.js`,
  `${projectRoot}/assets/framework/nwt-clipboard.js`,
  `${projectRoot}/assets/framework/nwt-filetree/nwt-filetree.js`,
  `${projectRoot}/assets/framework/nwt-cache-directory.js`,
  `${projectRoot}/assets/framework/nwt-proxy-chain.js`,
  // Command API:
  `${projectRoot}/assets/framework/nwt-command/nwt-command-synchronizer.js`,
  `${projectRoot}/assets/framework/nwt-command/nwt-command.js`,
  `${projectRoot}/assets/framework/nwt-command/nwt-commands-manager.js`,
  // Validation API:
  `${projectRoot}/assets/framework/nwt-validation/nwt-validation-context-pointer.js`,
  `${projectRoot}/assets/framework/nwt-validation/nwt-validation-context.js`,
  `${projectRoot}/assets/framework/nwt-validation/nwt-validable-schema.js`,
  `${projectRoot}/assets/framework/nwt-validation/nwt-validator.js`,
  // Pack API:
  `${projectRoot}/assets/framework/nwt-pack.js`,
  // Injection API:
  `${projectRoot}/assets/framework/nwt-injection.js`,
];
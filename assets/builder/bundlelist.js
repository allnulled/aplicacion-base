const projectRoot = require("path").resolve(__dirname, "..", "..");
const bundlelistExternal = require(__dirname + "/bundlelist-external.js");
const bundlelistCommon = require(__dirname + "/bundlelist-common.js");

module.exports = [
  `${projectRoot}/assets/framework/browser/win7/win7.css`,
  `${projectRoot}/assets/framework/browser/win7/win7-patches.css`,
  `${projectRoot}/assets/framework/browser/vue2/vue2.js`,
  `${projectRoot}/assets/framework/browser/ejs/ejs.js`,
  `${projectRoot}/assets/framework/browser/socket.io-client/socket.io-client.js`,
  `${projectRoot}/assets/framework/browser/marked/marked.js`,
  `${projectRoot}/assets/framework/browser/papaparse/papaparse.min.js`,
  `${projectRoot}/assets/framework/browser/reloader/reloadable.js`,
  ...bundlelistCommon,
  `${projectRoot}/assets/framework/browser/directives/v-resizable.js`,
  `${projectRoot}/assets/framework/browser/directives/v-draggable.js`,
  `${projectRoot}/assets/framework/browser/directives/v-focus.js`,
  `${projectRoot}/assets/framework/browser/directives/v-forms.js`,
  `${projectRoot}/assets/framework/browser/components/common-dialogs/common-dialogs`,
  `${projectRoot}/assets/framework/browser/components/common-toasts/common-toasts`,
  `${projectRoot}/assets/framework/browser/components/common-injections/common-injections`,
  `${projectRoot}/assets/framework/browser/components/nwt-tester-viewer/nwt-tester-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-tester-node/nwt-tester-node`,
  `${projectRoot}/assets/framework/browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-box-viewer/nwt-box-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-source-viewer/nwt-source-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-settings-viewer/nwt-settings-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-procedure-documentation-viewer/nwt-procedure-documentation-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-file-explorer/nwt-file-explorer`,
  `${projectRoot}/assets/framework/browser/components/nwt-code-highlighter/nwt-code-highlighter`,
  `${projectRoot}/assets/framework/browser/components/nwt-prompts-manager-viewer/nwt-prompts-manager-viewer`,
  `${projectRoot}/assets/framework/browser/components/nwt-chatgpt-files-manager-viewer/nwt-chatgpt-files-manager-viewer`,
  // Nwt Forms API | Utilidades genéricas:
  /*
  `${projectRoot}/assets/framework/browser/components/nwt-form/nwt-form-utils.js`,
  // Nwt Forms API | Prototipos primitivos de form, control y handler:
  `${projectRoot}/assets/framework/browser/components/nwt-form/nwt-form-element-to-any.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/nwt-form-element-to-form.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/nwt-form-element-to-control.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/nwt-form-element-to-handler.js`,
  // Nwt Forms API | Prototipos de formulario y control principales:
  `${projectRoot}/assets/framework/browser/components/nwt-form/builder/builder`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-prototype.js`,
  // Nwt Forms API | Widgets comunes de controles:
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-statement/nwt-form-control-statement`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-buttons/nwt-form-control-buttons`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-handler/nwt-form-control-handler`,
  // Nwt Forms API | Widgets de controles:
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/file-chooser/directory/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/file-chooser/file/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/text/email/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/text/password/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/text/oneline/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/text/multiline/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/group/list/control`,
  `${projectRoot}/assets/framework/browser/components/nwt-form/control-for/group/structure/control`,
  //*/
  // Recursos basados en componentes NwtComponent
  `${projectRoot}/assets/framework/browser/components/nwt-resource/nwt-formulator-resource.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-resource/nwt-lazy-resource/component`,
  // Formulator: la API buena de fomularios
  `${projectRoot}/assets/framework/browser/components/nwt-component/type/control/validator/component`,
  `${projectRoot}/assets/framework/browser/components/nwt-component/nwt-lazy-component.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-component/nwt-lazy-control.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-feature/nwt-lazy-feature.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-feature/nwt-feature-statics.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-feature/nwt-feature-mixer.js`,
  `${projectRoot}/assets/framework/browser/components/nwt-formulator/form/builder/component`,
  `${projectRoot}/assets/framework/browser/components/nwt-formulator/nwt-formulator.js`,
  // Fondos exóticos:
  `${projectRoot}/assets/framework/browser/components/nwt-stars-background/nwt-stars-background`,
  `${projectRoot}/assets/framework/browser/components/nwt-matrix-background/nwt-matrix-background`,
  // Commands API:
  `${projectRoot}/assets/framework/nwt-command/components/mixins/nwt-command-context-interface.js`,
  `${projectRoot}/assets/framework/nwt-command/components/mixins/nwt-command-form-interface.js`,
  `${projectRoot}/assets/framework/nwt-command/components/mixins/nwt-command-view-interface.js`,
  `${projectRoot}/assets/framework/nwt-command/components/nwt-anonymous-command-form/nwt-anonymous-command-form`,
  `${projectRoot}/assets/framework/nwt-command/components/nwt-anonymous-command-view/nwt-anonymous-command-view`,
  `${projectRoot}/assets/framework/nwt-command/components/nwt-commands-manager-viewer/nwt-commands-manager-viewer`,
  `${projectRoot}/assets/framework/nwt-templates/templates/nwt/nwt-errors-manager/viewer/template.css`,
  // @OK
  ...bundlelistExternal,
  `${projectRoot}/assets/framework/browser/css/one-framework/one-framework.css`,
  `${projectRoot}/assets/framework/browser/css/custom/custom.css`,
];
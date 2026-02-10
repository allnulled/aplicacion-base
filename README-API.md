# `Nwt APIs Documentation`

Documentación de las APIs de Nwt.

## Indice

- [`Nwt APIs Documentation`](#nwt-apis-documentation)
  - [Indice](#indice)
  - [Lista de APIs y dependencias](#lista-de-apis-y-dependencias)
  - [Dependencias y apariciones](#dependencias-y-apariciones)
  - [El JSON original](#el-json-original)

## Lista de APIs y dependencias


- `1. The NwtAbort API`
- `2. The NwtAccessor API`
- `3. The NwtArgumenter API`
   - **@uses** `NwtArgumentes`
   - **@uses** `NwtFramework`
   - **@uses** `NwtTimer`
- `4. The NwtArrayUtils API`
   - **@uses** `NwtFramework`
- `5. The NwtAsserter API`
   - **@uses** `window.assertion`
   - **@uses** `global.assertion`
- `6. The NwtAstTreeClass API`
   - **@uses** `NwtTemplates`
   - **@uses** `NwtAstTreeTemplateSource`
- `7. The NwtAstTreeTemplateSource API`
- `8. The NwtBoot API`
   - **@uses** `NwtFramework`
- `9. The NwtCacheDirectory API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtStringShortener`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtPaths`
   - **@uses** `require("path")`
   - **@uses** `require("fs")`
- `10. The NwtChatgpt API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtSettings`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtTimer`
   - **@uses** `require("openai")`
   - **@uses** `require("fs")`
   - **@uses** `require("path")`
- `11. The NwtClipboard API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtToasts`
   - **@uses** `window.navigator`
- `12. The NwtCodeComposer API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtJsReturnController`
   - **@uses** `NwtJsController`
   - **@uses** `NwtLazyLoader`
   - **@uses** `window.beautifier`
- `13. The NwtCollectionUtils API`
   - **@uses** `NwtFramework`
- `14. The NwtCommandContextInterface API`
- `15. The NwtCommandFormInterface API`
   - **@uses** `NwtCommandContextInterface`
   - **@uses** `NwtImporter`
- `16. The NwtCommand API`
   - **@uses** `NwtCommandFormFor`
   - **@uses** `NwtCommandViewFor`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
   - **@uses** `NwtDialogs`
   - **@uses** `NwtCommend`
- `17. The NwtCommandSynchronizer API`
   - **@uses** `NwtAbort`
   - **@uses** `NwtTimer`
   - **@uses** `NwtToasts`
- `18. The NwtCommandViewInterface API`
   - **@uses** `NwtCommandContextInterface`
   - **@uses** `NwtTester`
   - **@uses** `NwtImporter`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtCacheDirectory`
- `19. The NwtCommandsManager API`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtCommand`
   - **@uses** `NwtPaths`
   - **@uses** `require("path")`
- `20. The NwtConstrainer API`
- `21. The NwtCsv API`
   - **@uses** `NwtFramework`
   - **@uses** `require("fs")`
- `22. The NwtDebug API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtUtils`
- `23. The NwtDialogDefinition API`
   - **@uses** `NwtProcess`
   - **@uses** `NwtFramework`
   - **@uses** `NwtDialogs`
   - **@uses** `NwtProcessManager`
   - **@uses** `NwtRandomizer`
- `24. The NwtDirectoryPersister API`
   - **@uses** `NwtFramework`
   - **@uses** `require("fs")`
   - **@uses** `require("path")`
- `25. The NwtDom API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtStrings`
- `26. The NwtEnvironment API`
   - **@uses** `NwtFramework`
   - **@uses** `window.cordova`
   - **@uses** `window.PhoneGap`
   - **@uses** `window.phonegap`
   - **@uses** `window.Capacitor`
   - **@uses** `window.showOpenFilePicker`
- `27. The NwtErrorUtils API`
   - **@uses** `NwtFramework`
- `28. The NwtErrorsManager API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtGlobalizer`
   - **@uses** `NwtErrors`
   - **@uses** `NwtStrings`
   - **@uses** `NwtTemplates`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
   - **@uses** `NwtUtils`
   - **@uses** `window.addEventListener`
- `29. The NwtExporter API`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtFramework`
- `30. The NwtFeatureMixer API`
   - **@uses** `NwtResource`
   - **@uses** `NwtArrayUtils`
   - **@uses** `NwtFeatureStatics`
- `31. The NwtFeatureStatics API`
   - **@uses** `NwtResource`
   - **@uses** `NwtAsserter`
- `32. The NwtFileChooser API`
   - **@uses** `NwtFramework`
- `33. The NwtFilePersister API`
   - **@uses** `NwtFramework`
   - **@uses** `require("fs")`
- `34. The NwtFilesystem API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtRandomizer`
   - **@uses** `NwtPaths`
   - **@uses** `require("fs")`
   - **@uses** `require("path")`
   - **@uses** `require("fs-extra")`
   - **@uses** `require("fast-glob")`
- `35. The NwtFiletreeDirectory API`
   - **@uses** `NwtFiletreeNode`
   - **@uses** `NwtFiletreeSelectorInterpreter`
- `36. The NwtFiletreeFile API`
   - **@uses** `NwtFiletreeNode`
- `37. The NwtFiletreeGlob API`
   - **@uses** `NwtFiletreeNode`
- `38. The NwtFiletree API`
   - **@uses** `NwtFiletreeSelector`
   - **@uses** `NwtFiletreeSelectorInterpreter`
   - **@uses** `NwtFiletreeDirectory`
   - **@uses** `NwtFiletreeFile`
   - **@uses** `NwtFiletreeJson`
   - **@uses** `NwtFiletreeProperty`
   - **@uses** `NwtFiletreeGlob`
   - **@uses** `NwtStringShortener`
   - **@uses** `NwtPaths`
   - **@uses** `require("fast-glob")`
   - **@uses** `require("path")`
- `39. The NwtFiletreeJson API`
   - **@uses** `NwtFiletreeNode`
- `40. The NwtFiletreeNode API`
   - **@uses** `NwtFiletreeSelectorInterpreter`
- `41. The NwtFiletreeProperty API`
   - **@uses** `NwtFiletreeNode`
- `42. The NwtFiletreeSelectorInterpreter API`
   - **@uses** `NwtFiletreeSelector`
   - **@uses** `NwtUtils`
   - **@uses** `NwtStringShortener`
   - **@uses** `require("fast-glob")`
- `43. The NwtFiletreeSelector API`
   - **@uses** `NwtFiletreeSelectorParser`
   - **@uses** `NwtFiletreeSelectorInterpreter`
- `44. The NwtFiletreeSelectorParserBuildSh API`
   - **@uses** `NwtFiletreeSelectorParser`
- `45. The NwtFiletreeSelectorParserDevSh API`
- `46. The NwtFiletreeSelectorParserFix API`
   - **@uses** `require("fs")`
   - **@uses** `require("path")`
- `47. The NwtFiletreeSelectorParser API`
- `48. The NwtFiletreeSelectorParserPegjs API`
- `49. The NwtFormElementToAny API`
   - **@uses** `NwtFormElementToForm`
   - **@uses** `NwtFormElementToControl`
   - **@uses** `NwtFormElementToHandler`
   - **@uses** `NwtFramework`
   - **@uses** `NwtVue2`
- `50. The NwtFormElementToControl API`
   - **@uses** `NwtFormElementToAny`
   - **@uses** `NwtFramework`
   - **@uses** `NwtFormElementToHandler`
   - **@uses** `NwtFormControlFor`
   - **@uses** `NwtVue2`
   - **@uses** `NwtAsserter`
   - **@uses** `NwtToasts`
   - **@uses** `NwtErrorUtils`
- `51. The NwtFormElementToForm API`
   - **@uses** `NwtFormElementToAny`
   - **@uses** `NwtFramework`
   - **@uses** `NwtVue2`
   - **@uses** `NwtDom`
   - **@uses** `NwtToasts`
   - **@uses** `NwtErrorUtils`
- `52. The NwtFormElementToHandler API`
   - **@uses** `NwtFormElementToAny`
   - **@uses** `NwtFramework`
   - **@uses** `NwtFormElementToForm`
   - **@uses** `NwtVue2`
   - **@uses** `NwtFormControlFor`
- `53. The NwtFormSchema API`
- `54. The NwtFormSchemaLanguagePegjs API`
- `55. The NwtFormUtils API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtFormElementToForm`
   - **@uses** `NwtFormElementToControl`
   - **@uses** `NwtFormElementToHandler`
   - **@uses** `NwtVue2`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFormBuilder`
- `56. The NwtFormulatorControlManager API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFormulatorLazyControl`
- `57. The NwtFormulatorDatabaseManager API`
- `58. The NwtFormulatorDialogManager API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFormulatorComponentManager`
   - **@uses** `NwtFormulatorLazyDialog`
- `59. The NwtFormulatorFeatureManager API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFormulatorLazyFeature`
   - **@uses** `require("path")`
- `60. The NwtFormulatorFeatureMixer API`
   - **@uses** `NwtFormulatorLazyFeature`
   - **@uses** `NwtArrayUtils`
- `61. The NwtFormulatorFeatureMixer API`
   - **@uses** `NwtFormulatorLazyFeature`
   - **@uses** `NwtArrayUtils`
- `62. The NwtFormulatorFeatureMixerPrevious API`
   - **@uses** `NwtFormulatorFeatureMixer`
   - **@uses** `NwtFormulatorLazyFeature`
   - **@uses** `NwtUtils`
- `63. The NwtFormulator API`
   - **@uses** `NwtResource`
   - **@uses** `NwtFormBuilder`
- `64. The NwtFormulator API`
   - **@uses** `NwtFormulatorUtils`
   - **@uses** `NwtFormulatorDatabaseManager`
   - **@uses** `NwtFormulatorDialogManager`
   - **@uses** `NwtFormulatorControlManager`
   - **@uses** `NwtFormulatorFeatureManager`
- `65. The NwtFormulator API`
   - **@uses** `NwtFormulatorLazyFeature`
   - **@uses** `NwtFormulatorFeatureMixer`
   - **@uses** `NwtFormulatorLazyControl`
   - **@uses** `NwtFormulatorFormBuilder`
- `66. The NwtFormulatorLazyControl API`
- `67. The NwtFormulatorLazyControl API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
- `68. The NwtFormulatorLazyDialog API`
- `69. The NwtFormulatorLazyFeature API`
   - **@uses** `NwtFormulatorFeatureManager`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
- `70. The NwtFormulatorLazyFeature API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
- `71. The NwtFormulatorUtils API`
- `72. The NwtGlobalizer API`
   - **@uses** `NwtFramework`
- `73. The NwtImporter API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `require("path")`
   - **@uses** `require(fullpath)`
   - **@uses** `require("fs")`
- `74. The NwtInjection API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtTracer`
   - **@uses** `window.addEventListener`
- `75. The NwtInterruptible API`
   - **@uses** `NwtInterruptionHandler`
- `76. The NwtInterruptionHandler API`
   - **@uses** `NwtInterruption`
- `77. The NwtInterruption API`
   - **@uses** `NwtUtils`
- `78. The NwtIterableClass API`
   - **@uses** `NwtFramework`
- `79. The NwtIterableCommandClass API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtIterableClass`
- `80. The NwtIterableFunction API`
   - **@uses** `NwtTemplates`
   - **@uses** `NwtFramework`
   - **@uses** `NwtCodeComposer`
   - **@uses** `Nwt_iterable_function_loop`
   - **@uses** `NwtToasts`
- `81. The NwtJsController API`
- `82. The NwtJsReturnController API`
   - **@uses** `NwtJsController`
   - **@uses** `NwtCodeComposer`
- `83. The NwtJsThrowController API`
   - **@uses** `NwtJsController`
   - **@uses** `NwtCodeComposer`
- `84. The NwtJsonPersister API`
   - **@uses** `require("fs")`
- `85. The NwtJsonStorer API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `require("fs")`
- `86. The NwtJsonlPersister API`
   - **@uses** `NwtFilePersister`
   - **@uses** `require("fs")`
   - **@uses** `require("readline")`
   - **@uses** `require("path")`
- `87. The NwtLazyComponent API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtFormulatorLazyComponent`
   - **@uses** `NwtImporter`
- `88. The NwtLazyControl API`
   - **@uses** `NwtLazyComponent`
   - **@uses** `NwtPaths`
- `89. The NwtLazyFeature API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtImporter`
- `90. The NwtLazyLoader API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtImporter`
   - **@uses** `window.beautifier`
- `91. The NwtLiveInjector API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtCodeComposer`
   - **@uses** `require("fs")`
- `92. The NwtModuleManager API`
   - **@uses** `NwtUtils`
   - **@uses** `NwtImporter`
   - **@uses** `NwtPaths`
   - **@uses** `require("path")`
- `93. The NwtObjectUtils API`
   - **@uses** `NwtFramework`
- `94. The NwtPack API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtAsserter`
   - **@uses** `NwtGlobalizer`
   - **@uses** `NwtImporter`
   - **@uses** `NwtLazyLoader`
   - **@uses** `NwtProcessManager`
   - **@uses** `NwtProcess`
   - **@uses** `NwtProgressBar`
   - **@uses** `NwtRandomizer`
   - **@uses** `NwtSettings`
   - **@uses** `NwtTester`
   - **@uses** `NwtTimer`
   - **@uses** `NwtUtils`
   - **@uses** `NwtTracer`
   - **@uses** `NwtProcedureDefinition`
   - **@uses** `NwtProcedureInjections`
   - **@uses** `NwtProcedureSeed`
   - **@uses** `NwtCsv`
   - **@uses** `NwtShell`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtJsonStorer`
   - **@uses** `NwtProceduresManager`
   - **@uses** `NwtPromptsManager`
   - **@uses** `NwtChatgpt`
   - **@uses** `NwtDialogDefinition`
   - **@uses** `NwtStrings`
   - **@uses** `NwtFileChooser`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtPaths`
   - **@uses** `NwtCodeComposer`
- `95. The NwtPaths API`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtFramework`
   - **@uses** `require("path")`
   - **@uses** `require("os")`
- `96. The NwtPersister API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtJsonPersister`
   - **@uses** `NwtJsonlPersister`
   - **@uses** `NwtFilePersister`
   - **@uses** `NwtDirectoryPersister`
- `97. The NwtProcedureDefinition API`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtImporter`
   - **@uses** `NwtDialogs`
   - **@uses** `require("path")`
- `98. The NwtProcedureInjections API`
   - **@uses** `NwtProceduresManager`
   - **@uses** `window.NwtProceduresManager`
- `99. The NwtProcedureSeed API`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtProcedureDefinition`
   - **@uses** `require("path")`
- `100. The NwtProceduresManager API`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtPaths`
   - **@uses** `NwtProcedureSeed`
   - **@uses** `require("fs")`
   - **@uses** `require("path")`
   - **@uses** `require("fast-glob")`
- `101. The NwtProcess API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtProcessManager`
   - **@uses** `NwtRandomizer`
- `102. The NwtProcessManager API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtProcess`
- `103. The NwtProgressBar API`
   - **@uses** `NwtFramework`
- `104. The NwtPromptsManager API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtDialogs`
   - **@uses** `require("path")`
   - **@uses** `require("fs")`
   - **@uses** `require("fast-glob")`
   - **@uses** `require("fs-extra")`
- `105. The NwtPrototyper API`
- `106. The NwtProxyChain API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtProxyChainFactory`
- `107. The NwtRandomizer API`
   - **@uses** `NwtFramework`
- `108. The NwtResource API`
   - **@uses** `NwtLazyFeature`
   - **@uses** `NwtLazyControl`
   - **@uses** `NwtLazyComponent`
   - **@uses** `NwtFeatureMixer`
- `109. The NwtSettings API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtJsonStorer`
   - **@uses** `NwtEnvironment`
   - **@uses** `require("path")`
   - **@uses** `require("os")`
   - **@uses** `require("fs-extra")`
- `110. The NwtShell API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtToasts`
   - **@uses** `NwtEnvironment`
   - **@uses** `require("path")`
   - **@uses** `require("child_process")`
   - **@uses** `require("util")`
   - **@uses** `require("fs")`
- `111. The NwtStringShortener API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtRandomizer`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtPaths`
   - **@uses** `global.json`
- `112. The NwtStrings API`
   - **@uses** `NwtStringUtils`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtPaths`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtUtils`
   - **@uses** `require("os")`
   - **@uses** `require("fs")`
- `113. The NwtTemplates API`
   - **@uses** `NwtPaths`
   - **@uses** `NwtCodeComposer`
   - **@uses** `NwtFilesystem`
   - **@uses** `require("path")`
- `114. The NwtTester API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtTimer`
   - **@uses** `NwtAsserter`
   - **@uses** `NwtTesterAssertion`
   - **@uses** `NwtToasts`
   - **@uses** `NwtProgressBar`
- `115. The NwtTimer API`
   - **@uses** `NwtFramework`
- `116. The NwtTracer API`
   - **@uses** `NwtFramework`
   - **@uses** `window.trace`
   - **@uses** `global.trace`
- `117. The NwtUtils API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtPersister`
   - **@uses** `window.navigator`
- `118. The NwtValidableSchema API`
- `119. The NwtValidationContext API`
   - **@uses** `NwtPrototyper`
   - **@uses** `NwtValidationContextPointer`
   - **@uses** `NwtConstrainer`
   - **@uses** `NwtLazyComponent`
- `120. The NwtValidationContextPointer API`
- `121. The NwtValidator API`
   - **@uses** `NwtFeatureStatics`
- `122. The NwtVue2 API`
   - **@uses** `NwtFramework`
   - **@uses** `NwtEnvironment`
   - **@uses** `NwtCommand`
- `123. [vue2] The NwtAnonymousCommandForm API`
   - **@uses** `NwtCommandFormInterface`
- `124. [vue2] The NwtAnonymousCommandView API`
   - **@uses** `NwtCommandViewInterface`
- `125. [vue2] The NwtBoxViewer API`
- `126. [vue2] The NwtChatgptFilesManagerViewer API`
   - **@uses** `NwtChatgpt`
   - **@uses** `NwtDialogs`
- `127. [vue2] The NwtCodeHighlighter API`
   - **@uses** `NwtUtils`
   - **@uses** `NwtLazyLoader`
- `128. [vue2] The NwtCommandsManagerViewer API`
   - **@uses** `NwtCommandsManager`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtSettings`
   - **@uses** `NwtShell`
- `129. [vue2] The NwtFileExplorer API`
   - **@uses** `NwtUtils`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtPaths`
   - **@uses** `require("path")`
- `130. [vue2] The NwtFormControlButtons API`
- `131. [vue2] The NwtFormControlHandler API`
- `132. [vue2] The NwtFormControlStatement API`
   - **@uses** `NwtFramework`
- `133. [vue2] The NwtMatrixBackground API`
   - **@uses** `window.innerWidth`
   - **@uses** `window.innerHeight`
- `134. [vue2] The NwtProcedureDocumentationViewer API`
   - **@uses** `NwtProcedureSeed`
   - **@uses** `NwtProcedureDefinition`
   - **@uses** `NwtEnvironment`
   - **@uses** `require("fs")`
- `135. [vue2] The NwtProceduresManagerViewer API`
   - **@uses** `NwtProceduresManager`
- `136. [vue2] The NwtProcessManagerViewer API`
   - **@uses** `NwtProcessManager`
   - **@uses** `NwtProgressBar`
- `137. [vue2] The NwtProgressBarViewer API`
   - **@uses** `NwtProgressBar`
- `138. [vue2] The NwtPromptsManagerViewer API`
   - **@uses** `NwtPromptsManager`
   - **@uses** `NwtDialogs`
   - **@uses** `NwtFilesystem`
   - **@uses** `NwtSettings`
   - **@uses** `NwtShell`
- `139. [vue2] The NwtSettingsViewer API`
   - **@uses** `NwtSettings`
   - **@uses** `NwtDialog`
   - **@uses** `NwtUtils`
- `140. [vue2] The NwtSourceViewer API`
   - **@uses** `NwtRandomizer`
- `141. [vue2] The NwtStarsBackground API`
- `142. [vue2] The NwtTesterNode API`
   - **@uses** `NwtTesterViewer`
- `143. [vue2] The NwtTesterViewer API`
   - **@uses** `NwtTester`

## Dependencias y apariciones

Esta lista es la invertida, muestra las APIs clasificadas por dependencia:


- NwtFramework ✖️ 54
   - NwtArgumenter
   - NwtArrayUtils
   - NwtBoot
   - NwtCacheDirectory
   - NwtChatgpt
   - NwtClipboard
   - NwtCodeComposer
   - NwtCollectionUtils
   - NwtCsv
   - NwtDebug
   - NwtDialogDefinition
   - NwtDirectoryPersister
   - NwtDom
   - NwtEnvironment
   - NwtErrorUtils
   - NwtErrorsManager
   - NwtExporter
   - NwtFileChooser
   - NwtFilePersister
   - NwtFilesystem
   - NwtFormElementToAny
   - NwtFormElementToControl
   - NwtFormElementToForm
   - NwtFormElementToHandler
   - NwtFormUtils
   - NwtGlobalizer
   - NwtImporter
   - NwtInjection
   - NwtIterableClass
   - NwtIterableCommandClass
   - NwtIterableFunction
   - NwtJsonStorer
   - NwtLazyLoader
   - NwtLiveInjector
   - NwtObjectUtils
   - NwtPack
   - NwtPaths
   - NwtPersister
   - NwtProcess
   - NwtProcessManager
   - NwtProgressBar
   - NwtPromptsManager
   - NwtProxyChain
   - NwtRandomizer
   - NwtSettings
   - NwtShell
   - NwtStringShortener
   - NwtStrings
   - NwtTester
   - NwtTimer
   - NwtTracer
   - NwtUtils
   - NwtVue2
   - NwtFormControlStatement
- NwtPaths ✖️ 23
   - NwtCacheDirectory
   - NwtChatgpt
   - NwtCommandsManager
   - NwtFilesystem
   - NwtFiletree
   - NwtFormUtils
   - NwtFormulatorControlManager
   - NwtFormulatorDialogManager
   - NwtFormulatorFeatureManager
   - NwtFormulatorLazyControl
   - NwtFormulatorLazyFeature
   - NwtLazyComponent
   - NwtLazyControl
   - NwtLazyFeature
   - NwtLiveInjector
   - NwtModuleManager
   - NwtPack
   - NwtProceduresManager
   - NwtPromptsManager
   - NwtStringShortener
   - NwtStrings
   - NwtTemplates
   - NwtFileExplorer
- NwtFilesystem ✖️ 21
   - NwtCacheDirectory
   - NwtChatgpt
   - NwtCommand
   - NwtCommandViewInterface
   - NwtCommandsManager
   - NwtErrorsManager
   - NwtExporter
   - NwtFormulatorLazyControl
   - NwtFormulatorLazyFeature
   - NwtFormulatorLazyFeature
   - NwtLazyComponent
   - NwtLazyFeature
   - NwtLiveInjector
   - NwtPack
   - NwtPromptsManager
   - NwtStringShortener
   - NwtStrings
   - NwtTemplates
   - NwtCommandsManagerViewer
   - NwtFileExplorer
   - NwtPromptsManagerViewer
- require("path") ✖️ 20
   - NwtCacheDirectory
   - NwtChatgpt
   - NwtCommandsManager
   - NwtDirectoryPersister
   - NwtFilesystem
   - NwtFiletree
   - NwtFiletreeSelectorParserFix
   - NwtFormulatorFeatureManager
   - NwtImporter
   - NwtJsonlPersister
   - NwtModuleManager
   - NwtPaths
   - NwtProcedureDefinition
   - NwtProcedureSeed
   - NwtProceduresManager
   - NwtPromptsManager
   - NwtSettings
   - NwtShell
   - NwtTemplates
   - NwtFileExplorer
- require("fs") ✖️ 17
   - NwtCacheDirectory
   - NwtChatgpt
   - NwtCsv
   - NwtDirectoryPersister
   - NwtFilePersister
   - NwtFilesystem
   - NwtFiletreeSelectorParserFix
   - NwtImporter
   - NwtJsonPersister
   - NwtJsonStorer
   - NwtJsonlPersister
   - NwtLiveInjector
   - NwtProceduresManager
   - NwtPromptsManager
   - NwtShell
   - NwtStrings
   - NwtProcedureDocumentationViewer
- NwtEnvironment ✖️ 14
   - NwtErrorsManager
   - NwtFilesystem
   - NwtImporter
   - NwtJsonStorer
   - NwtPack
   - NwtPaths
   - NwtProcedureDefinition
   - NwtProcedureSeed
   - NwtProceduresManager
   - NwtSettings
   - NwtShell
   - NwtStrings
   - NwtVue2
   - NwtProcedureDocumentationViewer
- NwtImporter ✖️ 13
   - NwtCommandFormInterface
   - NwtCommand
   - NwtCommandViewInterface
   - NwtErrorsManager
   - NwtFormulatorLazyControl
   - NwtFormulatorLazyFeature
   - NwtFormulatorLazyFeature
   - NwtLazyComponent
   - NwtLazyFeature
   - NwtLazyLoader
   - NwtModuleManager
   - NwtPack
   - NwtProcedureDefinition
- NwtUtils ✖️ 11
   - NwtDebug
   - NwtErrorsManager
   - NwtFiletreeSelectorInterpreter
   - NwtFormulatorFeatureMixerPrevious
   - NwtInterruption
   - NwtModuleManager
   - NwtPack
   - NwtStrings
   - NwtCodeHighlighter
   - NwtFileExplorer
   - NwtSettingsViewer
- NwtToasts ✖️ 7
   - NwtClipboard
   - NwtCommandSynchronizer
   - NwtFormElementToControl
   - NwtFormElementToForm
   - NwtIterableFunction
   - NwtShell
   - NwtTester
- NwtCodeComposer ✖️ 6
   - NwtIterableFunction
   - NwtJsReturnController
   - NwtJsThrowController
   - NwtLiveInjector
   - NwtPack
   - NwtTemplates
- NwtRandomizer ✖️ 6
   - NwtDialogDefinition
   - NwtFilesystem
   - NwtPack
   - NwtProcess
   - NwtStringShortener
   - NwtSourceViewer
- NwtDialogs ✖️ 6
   - NwtCommand
   - NwtDialogDefinition
   - NwtProcedureDefinition
   - NwtPromptsManager
   - NwtChatgptFilesManagerViewer
   - NwtPromptsManagerViewer
- NwtFormulatorLazyFeature ✖️ 5
   - NwtFormulatorFeatureManager
   - NwtFormulatorFeatureMixer
   - NwtFormulatorFeatureMixer
   - NwtFormulatorFeatureMixerPrevious
   - NwtFormulator
- NwtVue2 ✖️ 5
   - NwtFormElementToAny
   - NwtFormElementToControl
   - NwtFormElementToForm
   - NwtFormElementToHandler
   - NwtFormUtils
- NwtFiletreeNode ✖️ 5
   - NwtFiletreeDirectory
   - NwtFiletreeFile
   - NwtFiletreeGlob
   - NwtFiletreeJson
   - NwtFiletreeProperty
- require("fast-glob") ✖️ 5
   - NwtFilesystem
   - NwtFiletree
   - NwtFiletreeSelectorInterpreter
   - NwtProceduresManager
   - NwtPromptsManager
- NwtSettings ✖️ 5
   - NwtChatgpt
   - NwtPack
   - NwtCommandsManagerViewer
   - NwtPromptsManagerViewer
   - NwtSettingsViewer
- NwtTimer ✖️ 5
   - NwtArgumenter
   - NwtChatgpt
   - NwtCommandSynchronizer
   - NwtPack
   - NwtTester
- NwtProgressBar ✖️ 4
   - NwtPack
   - NwtTester
   - NwtProcessManagerViewer
   - NwtProgressBarViewer
- NwtFiletreeSelectorInterpreter ✖️ 4
   - NwtFiletreeDirectory
   - NwtFiletree
   - NwtFiletreeNode
   - NwtFiletreeSelector
- NwtAsserter ✖️ 4
   - NwtFeatureStatics
   - NwtFormElementToControl
   - NwtPack
   - NwtTester
- NwtProcessManager ✖️ 4
   - NwtDialogDefinition
   - NwtPack
   - NwtProcess
   - NwtProcessManagerViewer
- require("os") ✖️ 3
   - NwtPaths
   - NwtSettings
   - NwtStrings
- NwtProceduresManager ✖️ 3
   - NwtPack
   - NwtProcedureInjections
   - NwtProceduresManagerViewer
- NwtShell ✖️ 3
   - NwtPack
   - NwtCommandsManagerViewer
   - NwtPromptsManagerViewer
- NwtProcedureSeed ✖️ 3
   - NwtPack
   - NwtProceduresManager
   - NwtProcedureDocumentationViewer
- NwtProcedureDefinition ✖️ 3
   - NwtPack
   - NwtProcedureSeed
   - NwtProcedureDocumentationViewer
- NwtLazyComponent ✖️ 3
   - NwtLazyControl
   - NwtResource
   - NwtValidationContext
- NwtFormElementToAny ✖️ 3
   - NwtFormElementToControl
   - NwtFormElementToForm
   - NwtFormElementToHandler
- NwtFormElementToHandler ✖️ 3
   - NwtFormElementToAny
   - NwtFormElementToControl
   - NwtFormUtils
- NwtFormElementToForm ✖️ 3
   - NwtFormElementToAny
   - NwtFormElementToHandler
   - NwtFormUtils
- require("fs-extra") ✖️ 3
   - NwtFilesystem
   - NwtPromptsManager
   - NwtSettings
- NwtArrayUtils ✖️ 3
   - NwtFeatureMixer
   - NwtFormulatorFeatureMixer
   - NwtFormulatorFeatureMixer
- NwtResource ✖️ 3
   - NwtFeatureMixer
   - NwtFeatureStatics
   - NwtFormulator
- NwtStrings ✖️ 3
   - NwtDom
   - NwtErrorsManager
   - NwtPack
- NwtProcess ✖️ 3
   - NwtDialogDefinition
   - NwtPack
   - NwtProcessManager
- NwtTester ✖️ 3
   - NwtCommandViewInterface
   - NwtPack
   - NwtTesterViewer
- NwtLazyLoader ✖️ 3
   - NwtCodeComposer
   - NwtPack
   - NwtCodeHighlighter
- NwtJsController ✖️ 3
   - NwtCodeComposer
   - NwtJsReturnController
   - NwtJsThrowController
- NwtStringShortener ✖️ 3
   - NwtCacheDirectory
   - NwtFiletree
   - NwtFiletreeSelectorInterpreter
- NwtTemplates ✖️ 3
   - NwtAstTreeClass
   - NwtErrorsManager
   - NwtIterableFunction
- NwtChatgpt ✖️ 2
   - NwtPack
   - NwtChatgptFilesManagerViewer
- NwtPromptsManager ✖️ 2
   - NwtPack
   - NwtPromptsManagerViewer
- NwtJsonStorer ✖️ 2
   - NwtPack
   - NwtSettings
- NwtFilePersister ✖️ 2
   - NwtJsonlPersister
   - NwtPersister
- NwtTracer ✖️ 2
   - NwtInjection
   - NwtPack
- NwtFormulatorFeatureManager ✖️ 2
   - NwtFormulator
   - NwtFormulatorLazyFeature
- NwtFormulatorFeatureMixer ✖️ 2
   - NwtFormulatorFeatureMixerPrevious
   - NwtFormulator
- NwtFormulatorLazyControl ✖️ 2
   - NwtFormulatorControlManager
   - NwtFormulator
- NwtFormBuilder ✖️ 2
   - NwtFormUtils
   - NwtFormulator
- NwtErrorUtils ✖️ 2
   - NwtFormElementToControl
   - NwtFormElementToForm
- NwtFormControlFor ✖️ 2
   - NwtFormElementToControl
   - NwtFormElementToHandler
- NwtFormElementToControl ✖️ 2
   - NwtFormElementToAny
   - NwtFormUtils
- NwtFiletreeSelectorParser ✖️ 2
   - NwtFiletreeSelector
   - NwtFiletreeSelectorParserBuildSh
- NwtFiletreeSelector ✖️ 2
   - NwtFiletree
   - NwtFiletreeSelectorInterpreter
- NwtFeatureStatics ✖️ 2
   - NwtFeatureMixer
   - NwtValidator
- window.addEventListener ✖️ 2
   - NwtErrorsManager
   - NwtInjection
- NwtGlobalizer ✖️ 2
   - NwtErrorsManager
   - NwtPack
- NwtCommand ✖️ 2
   - NwtCommandsManager
   - NwtVue2
- NwtCommandContextInterface ✖️ 2
   - NwtCommandFormInterface
   - NwtCommandViewInterface
- window.beautifier ✖️ 2
   - NwtCodeComposer
   - NwtLazyLoader
- window.navigator ✖️ 2
   - NwtClipboard
   - NwtUtils
- NwtTesterViewer ✖️ 1
   - NwtTesterNode
- NwtDialog ✖️ 1
   - NwtSettingsViewer
- window.innerHeight ✖️ 1
   - NwtMatrixBackground
- window.innerWidth ✖️ 1
   - NwtMatrixBackground
- NwtCommandsManager ✖️ 1
   - NwtCommandsManagerViewer
- NwtCommandViewInterface ✖️ 1
   - NwtAnonymousCommandView
- NwtCommandFormInterface ✖️ 1
   - NwtAnonymousCommandForm
- NwtConstrainer ✖️ 1
   - NwtValidationContext
- NwtValidationContextPointer ✖️ 1
   - NwtValidationContext
- NwtPrototyper ✖️ 1
   - NwtValidationContext
- NwtPersister ✖️ 1
   - NwtUtils
- global.trace ✖️ 1
   - NwtTracer
- window.trace ✖️ 1
   - NwtTracer
- NwtTesterAssertion ✖️ 1
   - NwtTester
- NwtStringUtils ✖️ 1
   - NwtStrings
- global.json ✖️ 1
   - NwtStringShortener
- require("util") ✖️ 1
   - NwtShell
- require("child_process") ✖️ 1
   - NwtShell
- NwtFeatureMixer ✖️ 1
   - NwtResource
- NwtLazyControl ✖️ 1
   - NwtResource
- NwtLazyFeature ✖️ 1
   - NwtResource
- NwtProxyChainFactory ✖️ 1
   - NwtProxyChain
- window.NwtProceduresManager ✖️ 1
   - NwtProcedureInjections
- NwtDirectoryPersister ✖️ 1
   - NwtPersister
- NwtJsonlPersister ✖️ 1
   - NwtPersister
- NwtJsonPersister ✖️ 1
   - NwtPersister
- NwtFileChooser ✖️ 1
   - NwtPack
- NwtDialogDefinition ✖️ 1
   - NwtPack
- NwtCsv ✖️ 1
   - NwtPack
- NwtProcedureInjections ✖️ 1
   - NwtPack
- NwtFormulatorLazyComponent ✖️ 1
   - NwtLazyComponent
- require("readline") ✖️ 1
   - NwtJsonlPersister
- Nwt_iterable_function_loop ✖️ 1
   - NwtIterableFunction
- NwtIterableClass ✖️ 1
   - NwtIterableCommandClass
- NwtInterruption ✖️ 1
   - NwtInterruptionHandler
- NwtInterruptionHandler ✖️ 1
   - NwtInterruptible
- require(fullpath) ✖️ 1
   - NwtImporter
- NwtFormulatorFormBuilder ✖️ 1
   - NwtFormulator
- NwtFormulatorControlManager ✖️ 1
   - NwtFormulator
- NwtFormulatorDialogManager ✖️ 1
   - NwtFormulator
- NwtFormulatorDatabaseManager ✖️ 1
   - NwtFormulator
- NwtFormulatorUtils ✖️ 1
   - NwtFormulator
- NwtFormulatorLazyDialog ✖️ 1
   - NwtFormulatorDialogManager
- NwtFormulatorComponentManager ✖️ 1
   - NwtFormulatorDialogManager
- NwtDom ✖️ 1
   - NwtFormElementToForm
- NwtFiletreeGlob ✖️ 1
   - NwtFiletree
- NwtFiletreeProperty ✖️ 1
   - NwtFiletree
- NwtFiletreeJson ✖️ 1
   - NwtFiletree
- NwtFiletreeFile ✖️ 1
   - NwtFiletree
- NwtFiletreeDirectory ✖️ 1
   - NwtFiletree
- NwtErrors ✖️ 1
   - NwtErrorsManager
- window.showOpenFilePicker ✖️ 1
   - NwtEnvironment
- window.Capacitor ✖️ 1
   - NwtEnvironment
- window.phonegap ✖️ 1
   - NwtEnvironment
- window.PhoneGap ✖️ 1
   - NwtEnvironment
- window.cordova ✖️ 1
   - NwtEnvironment
- NwtCacheDirectory ✖️ 1
   - NwtCommandViewInterface
- NwtAbort ✖️ 1
   - NwtCommandSynchronizer
- NwtCommend ✖️ 1
   - NwtCommand
- NwtCommandViewFor ✖️ 1
   - NwtCommand
- NwtCommandFormFor ✖️ 1
   - NwtCommand
- NwtJsReturnController ✖️ 1
   - NwtCodeComposer
- require("openai") ✖️ 1
   - NwtChatgpt
- NwtAstTreeTemplateSource ✖️ 1
   - NwtAstTreeClass
- global.assertion ✖️ 1
   - NwtAsserter
- window.assertion ✖️ 1
   - NwtAsserter
- NwtArgumentes ✖️ 1
   - NwtArgumenter

## El JSON original

El JSON original es:

```json
{
  "root": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/builder/../..",
  "generatedAt": "2026-02-10T13:04:31.545Z",
  "nodes": [
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-abort.js",
      "name": "nwt-abort.js",
      "type": "file",
      "formalName": "NwtAbortJs",
      "apiName": "NwtAbort",
      "dependencies": [
        "NwtAbort"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-accessor.js",
      "name": "nwt-accessor.js",
      "type": "file",
      "formalName": "NwtAccessorJs",
      "apiName": "NwtAccessor",
      "dependencies": [
        "NwtAccessor"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-form/nwt-anonymous-command-form.css",
      "name": "nwt-anonymous-command-form.css",
      "type": "file",
      "formalName": "NwtAnonymousCommandFormCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-form/nwt-anonymous-command-form.html",
      "name": "nwt-anonymous-command-form.html",
      "type": "file",
      "formalName": "NwtAnonymousCommandFormHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-view/nwt-anonymous-command-view.css",
      "name": "nwt-anonymous-command-view.css",
      "type": "file",
      "formalName": "NwtAnonymousCommandViewCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-view/nwt-anonymous-command-view.html",
      "name": "nwt-anonymous-command-view.html",
      "type": "file",
      "formalName": "NwtAnonymousCommandViewHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-argumenter.js",
      "name": "nwt-argumenter.js",
      "type": "file",
      "formalName": "NwtArgumenterJs",
      "apiName": "NwtArgumenter",
      "dependencies": [
        "NwtArgumentes",
        "NwtArgumenter",
        "NwtFramework",
        "NwtTimer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-array-utils.js",
      "name": "nwt-array-utils.js",
      "type": "file",
      "formalName": "NwtArrayUtilsJs",
      "apiName": "NwtArrayUtils",
      "dependencies": [
        "NwtArrayUtils",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-asserter.js",
      "name": "nwt-asserter.js",
      "type": "file",
      "formalName": "NwtAsserterJs",
      "apiName": "NwtAsserter",
      "dependencies": [
        "NwtAsserter",
        "window.assertion",
        "global.assertion"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-ast-tree-class.js",
      "name": "nwt-ast-tree-class.js",
      "type": "file",
      "formalName": "NwtAstTreeClassJs",
      "apiName": "NwtAstTreeClass",
      "dependencies": [
        "NwtAstTreeClass",
        "NwtTemplates",
        "NwtAstTreeTemplateSource"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-ast-tree-template-source.js",
      "name": "nwt-ast-tree-template-source.js",
      "type": "file",
      "formalName": "NwtAstTreeTemplateSourceJs",
      "apiName": "NwtAstTreeTemplateSource",
      "dependencies": [
        "NwtAstTreeTemplateSource"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-boot.js",
      "name": "nwt-boot.js",
      "type": "file",
      "formalName": "NwtBootJs",
      "apiName": "NwtBoot",
      "dependencies": [
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-box-viewer/nwt-box-viewer.css",
      "name": "nwt-box-viewer.css",
      "type": "file",
      "formalName": "NwtBoxViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-box-viewer/nwt-box-viewer.html",
      "name": "nwt-box-viewer.html",
      "type": "file",
      "formalName": "NwtBoxViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-cache-directory.js",
      "name": "nwt-cache-directory.js",
      "type": "file",
      "formalName": "NwtCacheDirectoryJs",
      "apiName": "NwtCacheDirectory",
      "dependencies": [
        "NwtCacheDirectory",
        "NwtFramework",
        "NwtStringShortener",
        "NwtFilesystem",
        "NwtPaths",
        "require(\"path\")",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-chatgpt-files-manager-viewer/nwt-chatgpt-files-manager-viewer.css",
      "name": "nwt-chatgpt-files-manager-viewer.css",
      "type": "file",
      "formalName": "NwtChatgptFilesManagerViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-chatgpt-files-manager-viewer/nwt-chatgpt-files-manager-viewer.html",
      "name": "nwt-chatgpt-files-manager-viewer.html",
      "type": "file",
      "formalName": "NwtChatgptFilesManagerViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-chatgpt.js",
      "name": "nwt-chatgpt.js",
      "type": "file",
      "formalName": "NwtChatgptJs",
      "apiName": "NwtChatgpt",
      "dependencies": [
        "NwtChatgpt",
        "NwtFramework",
        "NwtSettings",
        "NwtPaths",
        "NwtFilesystem",
        "NwtTimer",
        "require(\"openai\")",
        "require(\"fs\")",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-clipboard.js",
      "name": "nwt-clipboard.js",
      "type": "file",
      "formalName": "NwtClipboardJs",
      "apiName": "NwtClipboard",
      "dependencies": [
        "NwtClipboard",
        "NwtFramework",
        "NwtToasts",
        "window.navigator"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-code-composer.js",
      "name": "nwt-code-composer.js",
      "type": "file",
      "formalName": "NwtCodeComposerJs",
      "apiName": "NwtCodeComposer",
      "dependencies": [
        "NwtCodeComposer",
        "NwtFramework",
        "NwtJsReturnController",
        "NwtJsController",
        "NwtLazyLoader",
        "window.beautifier"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-code-highlighter/nwt-code-highlighter.css",
      "name": "nwt-code-highlighter.css",
      "type": "file",
      "formalName": "NwtCodeHighlighterCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-code-highlighter/nwt-code-highlighter.html",
      "name": "nwt-code-highlighter.html",
      "type": "file",
      "formalName": "NwtCodeHighlighterHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-collection-utils.js",
      "name": "nwt-collection-utils.js",
      "type": "file",
      "formalName": "NwtCollectionUtilsJs",
      "apiName": "NwtCollectionUtils",
      "dependencies": [
        "NwtCollectionUtils",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/mixins/nwt-command-context-interface.js",
      "name": "nwt-command-context-interface.js",
      "type": "file",
      "formalName": "NwtCommandContextInterfaceJs",
      "apiName": "NwtCommandContextInterface",
      "dependencies": [
        "NwtCommandContextInterface"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/mixins/nwt-command-form-interface.js",
      "name": "nwt-command-form-interface.js",
      "type": "file",
      "formalName": "NwtCommandFormInterfaceJs",
      "apiName": "NwtCommandFormInterface",
      "dependencies": [
        "NwtCommandFormInterface",
        "NwtCommandContextInterface",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/nwt-command.js",
      "name": "nwt-command.js",
      "type": "file",
      "formalName": "NwtCommandJs",
      "apiName": "NwtCommand",
      "dependencies": [
        "NwtCommand",
        "NwtCommandFormFor",
        "NwtCommandViewFor",
        "NwtFilesystem",
        "NwtImporter",
        "NwtDialogs",
        "NwtCommend"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/nwt-command-synchronizer.js",
      "name": "nwt-command-synchronizer.js",
      "type": "file",
      "formalName": "NwtCommandSynchronizerJs",
      "apiName": "NwtCommandSynchronizer",
      "dependencies": [
        "NwtCommandSynchronizer",
        "NwtAbort",
        "NwtTimer",
        "NwtToasts"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/mixins/nwt-command-view-interface.js",
      "name": "nwt-command-view-interface.js",
      "type": "file",
      "formalName": "NwtCommandViewInterfaceJs",
      "apiName": "NwtCommandViewInterface",
      "dependencies": [
        "NwtCommandViewInterface",
        "NwtCommandContextInterface",
        "NwtTester",
        "NwtImporter",
        "NwtFilesystem",
        "NwtCacheDirectory"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/nwt-commands-manager.js",
      "name": "nwt-commands-manager.js",
      "type": "file",
      "formalName": "NwtCommandsManagerJs",
      "apiName": "NwtCommandsManager",
      "dependencies": [
        "NwtCommandsManager",
        "NwtFilesystem",
        "NwtCommand",
        "NwtPaths",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-commands-manager-viewer/nwt-commands-manager-viewer.css",
      "name": "nwt-commands-manager-viewer.css",
      "type": "file",
      "formalName": "NwtCommandsManagerViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-commands-manager-viewer/nwt-commands-manager-viewer.html",
      "name": "nwt-commands-manager-viewer.html",
      "type": "file",
      "formalName": "NwtCommandsManagerViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-constrainer.js",
      "name": "nwt-constrainer.js",
      "type": "file",
      "formalName": "NwtConstrainerJs",
      "apiName": "NwtConstrainer",
      "dependencies": [
        "NwtConstrainer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-csv.js",
      "name": "nwt-csv.js",
      "type": "file",
      "formalName": "NwtCsvJs",
      "apiName": "NwtCsv",
      "dependencies": [
        "NwtCsv",
        "NwtFramework",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-debug.js",
      "name": "nwt-debug.js",
      "type": "file",
      "formalName": "NwtDebugJs",
      "apiName": "NwtDebug",
      "dependencies": [
        "NwtDebug",
        "NwtFramework",
        "NwtUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-dialog-definition.js",
      "name": "nwt-dialog-definition.js",
      "type": "file",
      "formalName": "NwtDialogDefinitionJs",
      "apiName": "NwtDialogDefinition",
      "dependencies": [
        "NwtProcess",
        "NwtDialogDefinition",
        "NwtFramework",
        "NwtDialogs",
        "NwtProcessManager",
        "NwtRandomizer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-persister/nwt-directory-persister.js",
      "name": "nwt-directory-persister.js",
      "type": "file",
      "formalName": "NwtDirectoryPersisterJs",
      "apiName": "NwtDirectoryPersister",
      "dependencies": [
        "NwtDirectoryPersister",
        "NwtFramework",
        "require(\"fs\")",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-dom.js",
      "name": "nwt-dom.js",
      "type": "file",
      "formalName": "NwtDomJs",
      "apiName": "NwtDom",
      "dependencies": [
        "NwtDom",
        "NwtFramework",
        "NwtStrings"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-environment.js",
      "name": "nwt-environment.js",
      "type": "file",
      "formalName": "NwtEnvironmentJs",
      "apiName": "NwtEnvironment",
      "dependencies": [
        "NwtEnvironment",
        "NwtFramework",
        "window.cordova",
        "window.PhoneGap",
        "window.phonegap",
        "window.Capacitor",
        "window.showOpenFilePicker"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-error-utils.js",
      "name": "nwt-error-utils.js",
      "type": "file",
      "formalName": "NwtErrorUtilsJs",
      "apiName": "NwtErrorUtils",
      "dependencies": [
        "NwtErrorUtils",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-errors-manager.js",
      "name": "nwt-errors-manager.js",
      "type": "file",
      "formalName": "NwtErrorsManagerJs",
      "apiName": "NwtErrorsManager",
      "dependencies": [
        "NwtErrorsManager",
        "NwtFramework",
        "NwtEnvironment",
        "NwtGlobalizer",
        "NwtErrors",
        "NwtStrings",
        "NwtTemplates",
        "NwtFilesystem",
        "NwtImporter",
        "NwtUtils",
        "window.addEventListener"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-exporter.js",
      "name": "nwt-exporter.js",
      "type": "file",
      "formalName": "NwtExporterJs",
      "apiName": "NwtExporter",
      "dependencies": [
        "NwtExporter",
        "NwtFilesystem",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-feature/nwt-feature-mixer.js",
      "name": "nwt-feature-mixer.js",
      "type": "file",
      "formalName": "NwtFeatureMixerJs",
      "apiName": "NwtFeatureMixer",
      "dependencies": [
        "NwtFeatureMixer",
        "NwtResource",
        "NwtArrayUtils",
        "NwtFeatureStatics"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-feature/nwt-feature-statics.js",
      "name": "nwt-feature-statics.js",
      "type": "file",
      "formalName": "NwtFeatureStaticsJs",
      "apiName": "NwtFeatureStatics",
      "dependencies": [
        "NwtFeatureStatics",
        "NwtResource",
        "NwtAsserter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-file-chooser.js",
      "name": "nwt-file-chooser.js",
      "type": "file",
      "formalName": "NwtFileChooserJs",
      "apiName": "NwtFileChooser",
      "dependencies": [
        "NwtFileChooser",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-file-explorer/nwt-file-explorer.css",
      "name": "nwt-file-explorer.css",
      "type": "file",
      "formalName": "NwtFileExplorerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-file-explorer/nwt-file-explorer.html",
      "name": "nwt-file-explorer.html",
      "type": "file",
      "formalName": "NwtFileExplorerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-persister/nwt-file-persister.js",
      "name": "nwt-file-persister.js",
      "type": "file",
      "formalName": "NwtFilePersisterJs",
      "apiName": "NwtFilePersister",
      "dependencies": [
        "NwtFilePersister",
        "NwtFramework",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filesystem.js",
      "name": "nwt-filesystem.js",
      "type": "file",
      "formalName": "NwtFilesystemJs",
      "apiName": "NwtFilesystem",
      "dependencies": [
        "NwtFilesystem",
        "NwtFramework",
        "NwtEnvironment",
        "NwtRandomizer",
        "NwtPaths",
        "require(\"fs\")",
        "require(\"path\")",
        "require(\"fs-extra\")",
        "require(\"fast-glob\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-directory.js",
      "name": "nwt-filetree-directory.js",
      "type": "file",
      "formalName": "NwtFiletreeDirectoryJs",
      "apiName": "NwtFiletreeDirectory",
      "dependencies": [
        "NwtFiletreeDirectory",
        "NwtFiletreeNode",
        "NwtFiletreeSelectorInterpreter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-file.js",
      "name": "nwt-filetree-file.js",
      "type": "file",
      "formalName": "NwtFiletreeFileJs",
      "apiName": "NwtFiletreeFile",
      "dependencies": [
        "NwtFiletreeFile",
        "NwtFiletreeNode"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-glob.js",
      "name": "nwt-filetree-glob.js",
      "type": "file",
      "formalName": "NwtFiletreeGlobJs",
      "apiName": "NwtFiletreeGlob",
      "dependencies": [
        "NwtFiletreeGlob",
        "NwtFiletreeNode"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/nwt-filetree.js",
      "name": "nwt-filetree.js",
      "type": "file",
      "formalName": "NwtFiletreeJs",
      "apiName": "NwtFiletree",
      "dependencies": [
        "NwtFiletree",
        "NwtFiletreeSelector",
        "NwtFiletreeSelectorInterpreter",
        "NwtFiletreeDirectory",
        "NwtFiletreeFile",
        "NwtFiletreeJson",
        "NwtFiletreeProperty",
        "NwtFiletreeGlob",
        "NwtStringShortener",
        "NwtPaths",
        "require(\"fast-glob\")",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-json.js",
      "name": "nwt-filetree-json.js",
      "type": "file",
      "formalName": "NwtFiletreeJsonJs",
      "apiName": "NwtFiletreeJson",
      "dependencies": [
        "NwtFiletreeJson",
        "NwtFiletreeNode"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-node.js",
      "name": "nwt-filetree-node.js",
      "type": "file",
      "formalName": "NwtFiletreeNodeJs",
      "apiName": "NwtFiletreeNode",
      "dependencies": [
        "NwtFiletreeNode",
        "NwtFiletreeSelectorInterpreter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/interfaces/nwt-filetree-property.js",
      "name": "nwt-filetree-property.js",
      "type": "file",
      "formalName": "NwtFiletreePropertyJs",
      "apiName": "NwtFiletreeProperty",
      "dependencies": [
        "NwtFiletreeProperty",
        "NwtFiletreeNode"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-interpreter.js",
      "name": "nwt-filetree-selector-interpreter.js",
      "type": "file",
      "formalName": "NwtFiletreeSelectorInterpreterJs",
      "apiName": "NwtFiletreeSelectorInterpreter",
      "dependencies": [
        "NwtFiletreeSelectorInterpreter",
        "NwtFiletreeSelector",
        "NwtUtils",
        "NwtStringShortener",
        "require(\"fast-glob\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector.js",
      "name": "nwt-filetree-selector.js",
      "type": "file",
      "formalName": "NwtFiletreeSelectorJs",
      "apiName": "NwtFiletreeSelector",
      "dependencies": [
        "NwtFiletreeSelector",
        "NwtFiletreeSelectorParser",
        "NwtFiletreeSelectorInterpreter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.build.sh",
      "name": "nwt-filetree-selector-parser.build.sh",
      "type": "file",
      "formalName": "NwtFiletreeSelectorParserBuildSh",
      "dependencies": [
        "NwtFiletreeSelectorParser"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.dev.sh",
      "name": "nwt-filetree-selector-parser.dev.sh",
      "type": "file",
      "formalName": "NwtFiletreeSelectorParserDevSh",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.fix.js",
      "name": "nwt-filetree-selector-parser.fix.js",
      "type": "file",
      "formalName": "NwtFiletreeSelectorParserFixJs",
      "apiName": "NwtFiletreeSelectorParserFix",
      "dependencies": [
        "require(\"fs\")",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.js",
      "name": "nwt-filetree-selector-parser.js",
      "type": "file",
      "formalName": "NwtFiletreeSelectorParserJs",
      "apiName": "NwtFiletreeSelectorParser",
      "dependencies": [
        "NwtFiletreeSelectorParser"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-filetree/selector/nwt-filetree-selector-parser.pegjs",
      "name": "nwt-filetree-selector-parser.pegjs",
      "type": "file",
      "formalName": "NwtFiletreeSelectorParserPegjs",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-buttons/nwt-form-control-buttons.css",
      "name": "nwt-form-control-buttons.css",
      "type": "file",
      "formalName": "NwtFormControlButtonsCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-buttons/nwt-form-control-buttons.html",
      "name": "nwt-form-control-buttons.html",
      "type": "file",
      "formalName": "NwtFormControlButtonsHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-handler/nwt-form-control-handler.css",
      "name": "nwt-form-control-handler.css",
      "type": "file",
      "formalName": "NwtFormControlHandlerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-handler/nwt-form-control-handler.html",
      "name": "nwt-form-control-handler.html",
      "type": "file",
      "formalName": "NwtFormControlHandlerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-statement/nwt-form-control-statement.css",
      "name": "nwt-form-control-statement.css",
      "type": "file",
      "formalName": "NwtFormControlStatementCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-statement/nwt-form-control-statement.html",
      "name": "nwt-form-control-statement.html",
      "type": "file",
      "formalName": "NwtFormControlStatementHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/nwt-form-element-to-any.js",
      "name": "nwt-form-element-to-any.js",
      "type": "file",
      "formalName": "NwtFormElementToAnyJs",
      "apiName": "NwtFormElementToAny",
      "dependencies": [
        "NwtFormElementToAny",
        "NwtFormElementToForm",
        "NwtFormElementToControl",
        "NwtFormElementToHandler",
        "NwtFramework",
        "NwtVue2"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/nwt-form-element-to-control.js",
      "name": "nwt-form-element-to-control.js",
      "type": "file",
      "formalName": "NwtFormElementToControlJs",
      "apiName": "NwtFormElementToControl",
      "dependencies": [
        "NwtFormElementToControl",
        "NwtFormElementToAny",
        "NwtFramework",
        "NwtFormElementToHandler",
        "NwtFormControlFor",
        "NwtVue2",
        "NwtAsserter",
        "NwtToasts",
        "NwtErrorUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/nwt-form-element-to-form.js",
      "name": "nwt-form-element-to-form.js",
      "type": "file",
      "formalName": "NwtFormElementToFormJs",
      "apiName": "NwtFormElementToForm",
      "dependencies": [
        "NwtFormElementToForm",
        "NwtFormElementToAny",
        "NwtFramework",
        "NwtVue2",
        "NwtDom",
        "NwtToasts",
        "NwtErrorUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/nwt-form-element-to-handler.js",
      "name": "nwt-form-element-to-handler.js",
      "type": "file",
      "formalName": "NwtFormElementToHandlerJs",
      "apiName": "NwtFormElementToHandler",
      "dependencies": [
        "NwtFormElementToHandler",
        "NwtFormElementToAny",
        "NwtFramework",
        "NwtFormElementToForm",
        "NwtVue2",
        "NwtFormControlFor"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-schema/nwt-form-schema.js",
      "name": "nwt-form-schema.js",
      "type": "file",
      "formalName": "NwtFormSchemaJs",
      "apiName": "NwtFormSchema",
      "dependencies": [
        "NwtFormSchema"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-schema/nwt-form-schema-language.pegjs",
      "name": "nwt-form-schema-language.pegjs",
      "type": "file",
      "formalName": "NwtFormSchemaLanguagePegjs",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/nwt-form-utils.js",
      "name": "nwt-form-utils.js",
      "type": "file",
      "formalName": "NwtFormUtilsJs",
      "apiName": "NwtFormUtils",
      "dependencies": [
        "NwtFormUtils",
        "NwtFramework",
        "NwtFormElementToForm",
        "NwtFormElementToControl",
        "NwtFormElementToHandler",
        "NwtVue2",
        "NwtPaths",
        "NwtFormBuilder"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/control/nwt-formulator-control-manager.js",
      "name": "nwt-formulator-control-manager.js",
      "type": "file",
      "formalName": "NwtFormulatorControlManagerJs",
      "apiName": "NwtFormulatorControlManager",
      "dependencies": [
        "NwtFormulatorControlManager",
        "NwtPaths",
        "NwtFormulatorLazyControl"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/database/nwt-formulator-database-manager.js",
      "name": "nwt-formulator-database-manager.js",
      "type": "file",
      "formalName": "NwtFormulatorDatabaseManagerJs",
      "apiName": "NwtFormulatorDatabaseManager",
      "dependencies": [
        "NwtFormulatorDatabaseManager"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/dialog/nwt-formulator-dialog-manager.js",
      "name": "nwt-formulator-dialog-manager.js",
      "type": "file",
      "formalName": "NwtFormulatorDialogManagerJs",
      "apiName": "NwtFormulatorDialogManager",
      "dependencies": [
        "NwtFormulatorDialogManager",
        "NwtPaths",
        "NwtFormulatorComponentManager",
        "NwtFormulatorLazyDialog"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/feature/nwt-formulator-feature-manager.js",
      "name": "nwt-formulator-feature-manager.js",
      "type": "file",
      "formalName": "NwtFormulatorFeatureManagerJs",
      "apiName": "NwtFormulatorFeatureManager",
      "dependencies": [
        "NwtFormulatorFeatureManager",
        "NwtPaths",
        "NwtFormulatorLazyFeature",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/feature/nwt-formulator-feature-mixer.js",
      "name": "nwt-formulator-feature-mixer.js",
      "type": "file",
      "formalName": "NwtFormulatorFeatureMixerJs",
      "apiName": "NwtFormulatorFeatureMixer",
      "dependencies": [
        "NwtFormulatorFeatureMixer",
        "NwtFormulatorLazyFeature",
        "NwtArrayUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous-2/feature/nwt-formulator-feature-mixer.js",
      "name": "nwt-formulator-feature-mixer.js",
      "type": "file",
      "formalName": "NwtFormulatorFeatureMixerJs",
      "apiName": "NwtFormulatorFeatureMixer",
      "dependencies": [
        "NwtFormulatorFeatureMixer",
        "NwtFormulatorLazyFeature",
        "NwtArrayUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/feature/nwt-formulator-feature-mixer-previous.js",
      "name": "nwt-formulator-feature-mixer-previous.js",
      "type": "file",
      "formalName": "NwtFormulatorFeatureMixerPreviousJs",
      "apiName": "NwtFormulatorFeatureMixerPrevious",
      "dependencies": [
        "NwtFormulatorFeatureMixer",
        "NwtFormulatorLazyFeature",
        "NwtUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator/nwt-formulator.js",
      "name": "nwt-formulator.js",
      "type": "file",
      "formalName": "NwtFormulatorJs",
      "apiName": "NwtFormulator",
      "dependencies": [
        "NwtFormulator",
        "NwtResource",
        "NwtFormBuilder"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/nwt-formulator.js",
      "name": "nwt-formulator.js",
      "type": "file",
      "formalName": "NwtFormulatorJs",
      "apiName": "NwtFormulator",
      "dependencies": [
        "NwtFormulator",
        "NwtFormulatorUtils",
        "NwtFormulatorDatabaseManager",
        "NwtFormulatorDialogManager",
        "NwtFormulatorControlManager",
        "NwtFormulatorFeatureManager"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous-2/nwt-formulator.js",
      "name": "nwt-formulator.js",
      "type": "file",
      "formalName": "NwtFormulatorJs",
      "apiName": "NwtFormulator",
      "dependencies": [
        "NwtFormulator",
        "NwtFormulatorLazyFeature",
        "NwtFormulatorFeatureMixer",
        "NwtFormulatorLazyControl",
        "NwtFormulatorFormBuilder"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/control/nwt-formulator-lazy-control.js",
      "name": "nwt-formulator-lazy-control.js",
      "type": "file",
      "formalName": "NwtFormulatorLazyControlJs",
      "apiName": "NwtFormulatorLazyControl",
      "dependencies": [
        "NwtFormulatorLazyControl"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous-2/control/nwt-formulator-lazy-control.js",
      "name": "nwt-formulator-lazy-control.js",
      "type": "file",
      "formalName": "NwtFormulatorLazyControlJs",
      "apiName": "NwtFormulatorLazyControl",
      "dependencies": [
        "NwtFormulatorLazyControl",
        "NwtPaths",
        "NwtFilesystem",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/dialog/nwt-formulator-lazy-dialog.js",
      "name": "nwt-formulator-lazy-dialog.js",
      "type": "file",
      "formalName": "NwtFormulatorLazyDialogJs",
      "apiName": "NwtFormulatorLazyDialog",
      "dependencies": [
        "NwtFormulatorLazyDialog"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/feature/nwt-formulator-lazy-feature.js",
      "name": "nwt-formulator-lazy-feature.js",
      "type": "file",
      "formalName": "NwtFormulatorLazyFeatureJs",
      "apiName": "NwtFormulatorLazyFeature",
      "dependencies": [
        "NwtFormulatorLazyFeature",
        "NwtFormulatorFeatureManager",
        "NwtFilesystem",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous-2/feature/nwt-formulator-lazy-feature.js",
      "name": "nwt-formulator-lazy-feature.js",
      "type": "file",
      "formalName": "NwtFormulatorLazyFeatureJs",
      "apiName": "NwtFormulatorLazyFeature",
      "dependencies": [
        "NwtFormulatorLazyFeature",
        "NwtPaths",
        "NwtFilesystem",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-formulator-previous/utils/nwt-formulator-utils.js",
      "name": "nwt-formulator-utils.js",
      "type": "file",
      "formalName": "NwtFormulatorUtilsJs",
      "apiName": "NwtFormulatorUtils",
      "dependencies": [
        "NwtFormulatorUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-globalizer.js",
      "name": "nwt-globalizer.js",
      "type": "file",
      "formalName": "NwtGlobalizerJs",
      "apiName": "NwtGlobalizer",
      "dependencies": [
        "NwtGlobalizer",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-importer.js",
      "name": "nwt-importer.js",
      "type": "file",
      "formalName": "NwtImporterJs",
      "apiName": "NwtImporter",
      "dependencies": [
        "NwtImporter",
        "NwtFramework",
        "NwtEnvironment",
        "require(\"path\")",
        "require(fullpath)",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-injection.js",
      "name": "nwt-injection.js",
      "type": "file",
      "formalName": "NwtInjectionJs",
      "apiName": "NwtInjection",
      "dependencies": [
        "NwtFramework",
        "NwtTracer",
        "window.addEventListener"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-interruption/nwt-interruptible.js",
      "name": "nwt-interruptible.js",
      "type": "file",
      "formalName": "NwtInterruptibleJs",
      "apiName": "NwtInterruptible",
      "dependencies": [
        "NwtInterruptible",
        "NwtInterruptionHandler"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-interruption/nwt-interruption-handler.js",
      "name": "nwt-interruption-handler.js",
      "type": "file",
      "formalName": "NwtInterruptionHandlerJs",
      "apiName": "NwtInterruptionHandler",
      "dependencies": [
        "NwtInterruptionHandler",
        "NwtInterruption"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-interruption/nwt-interruption.js",
      "name": "nwt-interruption.js",
      "type": "file",
      "formalName": "NwtInterruptionJs",
      "apiName": "NwtInterruption",
      "dependencies": [
        "NwtInterruption",
        "NwtUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-iterable-class.js",
      "name": "nwt-iterable-class.js",
      "type": "file",
      "formalName": "NwtIterableClassJs",
      "apiName": "NwtIterableClass",
      "dependencies": [
        "NwtIterableClass",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-iterable-command-class.js",
      "name": "nwt-iterable-command-class.js",
      "type": "file",
      "formalName": "NwtIterableCommandClassJs",
      "apiName": "NwtIterableCommandClass",
      "dependencies": [
        "NwtIterableCommandClass",
        "NwtFramework",
        "NwtIterableClass"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-iterable-function.js",
      "name": "nwt-iterable-function.js",
      "type": "file",
      "formalName": "NwtIterableFunctionJs",
      "apiName": "NwtIterableFunction",
      "dependencies": [
        "NwtIterableFunction",
        "NwtTemplates",
        "NwtFramework",
        "NwtCodeComposer",
        "Nwt_iterable_function_loop",
        "NwtToasts"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-js-controllers/nwt-js-controller.js",
      "name": "nwt-js-controller.js",
      "type": "file",
      "formalName": "NwtJsControllerJs",
      "apiName": "NwtJsController",
      "dependencies": [
        "NwtJsController"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-js-controllers/nwt-js-return-controller.js",
      "name": "nwt-js-return-controller.js",
      "type": "file",
      "formalName": "NwtJsReturnControllerJs",
      "apiName": "NwtJsReturnController",
      "dependencies": [
        "NwtJsReturnController",
        "NwtJsController",
        "NwtCodeComposer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-js-controllers/nwt-js-throw-controller.js",
      "name": "nwt-js-throw-controller.js",
      "type": "file",
      "formalName": "NwtJsThrowControllerJs",
      "apiName": "NwtJsThrowController",
      "dependencies": [
        "NwtJsThrowController",
        "NwtJsController",
        "NwtCodeComposer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-persister/nwt-json-persister.js",
      "name": "nwt-json-persister.js",
      "type": "file",
      "formalName": "NwtJsonPersisterJs",
      "apiName": "NwtJsonPersister",
      "dependencies": [
        "NwtJsonPersister",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-json-storer.js",
      "name": "nwt-json-storer.js",
      "type": "file",
      "formalName": "NwtJsonStorerJs",
      "apiName": "NwtJsonStorer",
      "dependencies": [
        "NwtJsonStorer",
        "NwtFramework",
        "NwtEnvironment",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-persister/nwt-jsonl-persister.js",
      "name": "nwt-jsonl-persister.js",
      "type": "file",
      "formalName": "NwtJsonlPersisterJs",
      "apiName": "NwtJsonlPersister",
      "dependencies": [
        "NwtJsonlPersister",
        "NwtFilePersister",
        "require(\"fs\")",
        "require(\"readline\")",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-component/nwt-lazy-component.js",
      "name": "nwt-lazy-component.js",
      "type": "file",
      "formalName": "NwtLazyComponentJs",
      "apiName": "NwtLazyComponent",
      "dependencies": [
        "NwtLazyComponent",
        "NwtPaths",
        "NwtFilesystem",
        "NwtFormulatorLazyComponent",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-component/nwt-lazy-control.js",
      "name": "nwt-lazy-control.js",
      "type": "file",
      "formalName": "NwtLazyControlJs",
      "apiName": "NwtLazyControl",
      "dependencies": [
        "NwtLazyControl",
        "NwtLazyComponent",
        "NwtPaths"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-feature/nwt-lazy-feature.js",
      "name": "nwt-lazy-feature.js",
      "type": "file",
      "formalName": "NwtLazyFeatureJs",
      "apiName": "NwtLazyFeature",
      "dependencies": [
        "NwtLazyFeature",
        "NwtPaths",
        "NwtFilesystem",
        "NwtImporter"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-lazy-loader.js",
      "name": "nwt-lazy-loader.js",
      "type": "file",
      "formalName": "NwtLazyLoaderJs",
      "apiName": "NwtLazyLoader",
      "dependencies": [
        "NwtLazyLoader",
        "NwtFramework",
        "NwtImporter",
        "window.beautifier"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-live-injector.js",
      "name": "nwt-live-injector.js",
      "type": "file",
      "formalName": "NwtLiveInjectorJs",
      "apiName": "NwtLiveInjector",
      "dependencies": [
        "NwtLiveInjector",
        "NwtFramework",
        "NwtPaths",
        "NwtFilesystem",
        "NwtCodeComposer",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-matrix-background/nwt-matrix-background.css",
      "name": "nwt-matrix-background.css",
      "type": "file",
      "formalName": "NwtMatrixBackgroundCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-matrix-background/nwt-matrix-background.html",
      "name": "nwt-matrix-background.html",
      "type": "file",
      "formalName": "NwtMatrixBackgroundHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-module-manager/nwt-module-manager.js",
      "name": "nwt-module-manager.js",
      "type": "file",
      "formalName": "NwtModuleManagerJs",
      "apiName": "NwtModuleManager",
      "dependencies": [
        "NwtModuleManager",
        "NwtUtils",
        "NwtImporter",
        "NwtPaths",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-object-utils.js",
      "name": "nwt-object-utils.js",
      "type": "file",
      "formalName": "NwtObjectUtilsJs",
      "apiName": "NwtObjectUtils",
      "dependencies": [
        "NwtObjectUtils",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-pack.js",
      "name": "nwt-pack.js",
      "type": "file",
      "formalName": "NwtPackJs",
      "apiName": "NwtPack",
      "dependencies": [
        "NwtFramework",
        "NwtAsserter",
        "NwtGlobalizer",
        "NwtImporter",
        "NwtLazyLoader",
        "NwtProcessManager",
        "NwtProcess",
        "NwtProgressBar",
        "NwtRandomizer",
        "NwtSettings",
        "NwtTester",
        "NwtTimer",
        "NwtUtils",
        "NwtTracer",
        "NwtProcedureDefinition",
        "NwtProcedureInjections",
        "NwtProcedureSeed",
        "NwtCsv",
        "NwtShell",
        "NwtFilesystem",
        "NwtJsonStorer",
        "NwtProceduresManager",
        "NwtPromptsManager",
        "NwtChatgpt",
        "NwtDialogDefinition",
        "NwtStrings",
        "NwtFileChooser",
        "NwtEnvironment",
        "NwtPaths",
        "NwtCodeComposer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-paths.js",
      "name": "nwt-paths.js",
      "type": "file",
      "formalName": "NwtPathsJs",
      "apiName": "NwtPaths",
      "dependencies": [
        "NwtPaths",
        "NwtEnvironment",
        "NwtFramework",
        "require(\"path\")",
        "require(\"os\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-persister/nwt-persister.js",
      "name": "nwt-persister.js",
      "type": "file",
      "formalName": "NwtPersisterJs",
      "apiName": "NwtPersister",
      "dependencies": [
        "NwtPersister",
        "NwtFramework",
        "NwtJsonPersister",
        "NwtJsonlPersister",
        "NwtFilePersister",
        "NwtDirectoryPersister"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-procedure-definition.js",
      "name": "nwt-procedure-definition.js",
      "type": "file",
      "formalName": "NwtProcedureDefinitionJs",
      "apiName": "NwtProcedureDefinition",
      "dependencies": [
        "NwtProcedureDefinition",
        "NwtEnvironment",
        "NwtImporter",
        "NwtDialogs",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedure-documentation-viewer/nwt-procedure-documentation-viewer.css",
      "name": "nwt-procedure-documentation-viewer.css",
      "type": "file",
      "formalName": "NwtProcedureDocumentationViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedure-documentation-viewer/nwt-procedure-documentation-viewer.html",
      "name": "nwt-procedure-documentation-viewer.html",
      "type": "file",
      "formalName": "NwtProcedureDocumentationViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-procedure-injections.js",
      "name": "nwt-procedure-injections.js",
      "type": "file",
      "formalName": "NwtProcedureInjectionsJs",
      "apiName": "NwtProcedureInjections",
      "dependencies": [
        "NwtProcedureInjections",
        "NwtProceduresManager",
        "window.NwtProceduresManager"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-procedure-seed.js",
      "name": "nwt-procedure-seed.js",
      "type": "file",
      "formalName": "NwtProcedureSeedJs",
      "apiName": "NwtProcedureSeed",
      "dependencies": [
        "NwtProcedureSeed",
        "NwtEnvironment",
        "NwtProcedureDefinition",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-procedures-manager.js",
      "name": "nwt-procedures-manager.js",
      "type": "file",
      "formalName": "NwtProceduresManagerJs",
      "apiName": "NwtProceduresManager",
      "dependencies": [
        "NwtProceduresManager",
        "NwtEnvironment",
        "NwtPaths",
        "NwtProcedureSeed",
        "require(\"fs\")",
        "require(\"path\")",
        "require(\"fast-glob\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer.css",
      "name": "nwt-procedures-manager-viewer.css",
      "type": "file",
      "formalName": "NwtProceduresManagerViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer.html",
      "name": "nwt-procedures-manager-viewer.html",
      "type": "file",
      "formalName": "NwtProceduresManagerViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-process.js",
      "name": "nwt-process.js",
      "type": "file",
      "formalName": "NwtProcessJs",
      "apiName": "NwtProcess",
      "dependencies": [
        "NwtProcess",
        "NwtFramework",
        "NwtProcessManager",
        "NwtRandomizer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-process-manager.js",
      "name": "nwt-process-manager.js",
      "type": "file",
      "formalName": "NwtProcessManagerJs",
      "apiName": "NwtProcessManager",
      "dependencies": [
        "NwtProcessManager",
        "NwtFramework",
        "NwtProcess"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer.css",
      "name": "nwt-process-manager-viewer.css",
      "type": "file",
      "formalName": "NwtProcessManagerViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer.html",
      "name": "nwt-process-manager-viewer.html",
      "type": "file",
      "formalName": "NwtProcessManagerViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-progress-bar.js",
      "name": "nwt-progress-bar.js",
      "type": "file",
      "formalName": "NwtProgressBarJs",
      "apiName": "NwtProgressBar",
      "dependencies": [
        "NwtProgressBar",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer.css",
      "name": "nwt-progress-bar-viewer.css",
      "type": "file",
      "formalName": "NwtProgressBarViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer.html",
      "name": "nwt-progress-bar-viewer.html",
      "type": "file",
      "formalName": "NwtProgressBarViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-prompts-manager.js",
      "name": "nwt-prompts-manager.js",
      "type": "file",
      "formalName": "NwtPromptsManagerJs",
      "apiName": "NwtPromptsManager",
      "dependencies": [
        "NwtPromptsManager",
        "NwtFramework",
        "NwtPaths",
        "NwtFilesystem",
        "NwtDialogs",
        "require(\"path\")",
        "require(\"fs\")",
        "require(\"fast-glob\")",
        "require(\"fs-extra\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-prompts-manager-viewer/nwt-prompts-manager-viewer.css",
      "name": "nwt-prompts-manager-viewer.css",
      "type": "file",
      "formalName": "NwtPromptsManagerViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-prompts-manager-viewer/nwt-prompts-manager-viewer.html",
      "name": "nwt-prompts-manager-viewer.html",
      "type": "file",
      "formalName": "NwtPromptsManagerViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-prototyper.js",
      "name": "nwt-prototyper.js",
      "type": "file",
      "formalName": "NwtPrototyperJs",
      "apiName": "NwtPrototyper",
      "dependencies": [
        "NwtPrototyper"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-proxy-chain.js",
      "name": "nwt-proxy-chain.js",
      "type": "file",
      "formalName": "NwtProxyChainJs",
      "apiName": "NwtProxyChain",
      "dependencies": [
        "NwtProxyChain",
        "NwtFramework",
        "NwtProxyChainFactory"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-randomizer.js",
      "name": "nwt-randomizer.js",
      "type": "file",
      "formalName": "NwtRandomizerJs",
      "apiName": "NwtRandomizer",
      "dependencies": [
        "NwtRandomizer",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-resource/nwt-resource.js",
      "name": "nwt-resource.js",
      "type": "file",
      "formalName": "NwtResourceJs",
      "apiName": "NwtResource",
      "dependencies": [
        "NwtResource",
        "NwtLazyFeature",
        "NwtLazyControl",
        "NwtLazyComponent",
        "NwtFeatureMixer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-settings.js",
      "name": "nwt-settings.js",
      "type": "file",
      "formalName": "NwtSettingsJs",
      "apiName": "NwtSettings",
      "dependencies": [
        "NwtSettings",
        "NwtFramework",
        "NwtJsonStorer",
        "NwtEnvironment",
        "require(\"path\")",
        "require(\"os\")",
        "require(\"fs-extra\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-settings-viewer/nwt-settings-viewer.css",
      "name": "nwt-settings-viewer.css",
      "type": "file",
      "formalName": "NwtSettingsViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-settings-viewer/nwt-settings-viewer.html",
      "name": "nwt-settings-viewer.html",
      "type": "file",
      "formalName": "NwtSettingsViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-shell.js",
      "name": "nwt-shell.js",
      "type": "file",
      "formalName": "NwtShellJs",
      "apiName": "NwtShell",
      "dependencies": [
        "NwtShell",
        "NwtFramework",
        "NwtToasts",
        "NwtEnvironment",
        "require(\"path\")",
        "require(\"child_process\")",
        "require(\"util\")",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-source-viewer/nwt-source-viewer.css",
      "name": "nwt-source-viewer.css",
      "type": "file",
      "formalName": "NwtSourceViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-source-viewer/nwt-source-viewer.html",
      "name": "nwt-source-viewer.html",
      "type": "file",
      "formalName": "NwtSourceViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-stars-background/nwt-stars-background.css",
      "name": "nwt-stars-background.css",
      "type": "file",
      "formalName": "NwtStarsBackgroundCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-stars-background/nwt-stars-background.html",
      "name": "nwt-stars-background.html",
      "type": "file",
      "formalName": "NwtStarsBackgroundHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-string-shortener/nwt-string-shortener.js",
      "name": "nwt-string-shortener.js",
      "type": "file",
      "formalName": "NwtStringShortenerJs",
      "apiName": "NwtStringShortener",
      "dependencies": [
        "NwtStringShortener",
        "NwtFramework",
        "NwtRandomizer",
        "NwtFilesystem",
        "NwtPaths",
        "global.json"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-strings.js",
      "name": "nwt-strings.js",
      "type": "file",
      "formalName": "NwtStringsJs",
      "apiName": "NwtStrings",
      "dependencies": [
        "NwtStrings",
        "NwtStringUtils",
        "NwtFramework",
        "NwtEnvironment",
        "NwtPaths",
        "NwtFilesystem",
        "NwtUtils",
        "require(\"os\")",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-templates/nwt-templates.js",
      "name": "nwt-templates.js",
      "type": "file",
      "formalName": "NwtTemplatesJs",
      "apiName": "NwtTemplates",
      "dependencies": [
        "NwtTemplates",
        "NwtPaths",
        "NwtCodeComposer",
        "NwtFilesystem",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-tester.js",
      "name": "nwt-tester.js",
      "type": "file",
      "formalName": "NwtTesterJs",
      "apiName": "NwtTester",
      "dependencies": [
        "NwtTester",
        "NwtFramework",
        "NwtTimer",
        "NwtAsserter",
        "NwtTesterAssertion",
        "NwtToasts",
        "NwtProgressBar"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-node/nwt-tester-node.css",
      "name": "nwt-tester-node.css",
      "type": "file",
      "formalName": "NwtTesterNodeCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-node/nwt-tester-node.html",
      "name": "nwt-tester-node.html",
      "type": "file",
      "formalName": "NwtTesterNodeHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-viewer/nwt-tester-viewer.css",
      "name": "nwt-tester-viewer.css",
      "type": "file",
      "formalName": "NwtTesterViewerCss",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-viewer/nwt-tester-viewer.html",
      "name": "nwt-tester-viewer.html",
      "type": "file",
      "formalName": "NwtTesterViewerHtml",
      "dependencies": []
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-timer.js",
      "name": "nwt-timer.js",
      "type": "file",
      "formalName": "NwtTimerJs",
      "apiName": "NwtTimer",
      "dependencies": [
        "NwtTimer",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-tracer.js",
      "name": "nwt-tracer.js",
      "type": "file",
      "formalName": "NwtTracerJs",
      "apiName": "NwtTracer",
      "dependencies": [
        "NwtTracer",
        "NwtFramework",
        "window.trace",
        "global.trace"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-utils.js",
      "name": "nwt-utils.js",
      "type": "file",
      "formalName": "NwtUtilsJs",
      "apiName": "NwtUtils",
      "dependencies": [
        "NwtUtils",
        "NwtFramework",
        "NwtPersister",
        "window.navigator"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-validation/nwt-validable-schema.js",
      "name": "nwt-validable-schema.js",
      "type": "file",
      "formalName": "NwtValidableSchemaJs",
      "apiName": "NwtValidableSchema",
      "dependencies": [
        "NwtValidableSchema"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-validation/nwt-validation-context.js",
      "name": "nwt-validation-context.js",
      "type": "file",
      "formalName": "NwtValidationContextJs",
      "apiName": "NwtValidationContext",
      "dependencies": [
        "NwtValidationContext",
        "NwtPrototyper",
        "NwtValidationContextPointer",
        "NwtConstrainer",
        "NwtLazyComponent"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-validation/nwt-validation-context-pointer.js",
      "name": "nwt-validation-context-pointer.js",
      "type": "file",
      "formalName": "NwtValidationContextPointerJs",
      "apiName": "NwtValidationContextPointer",
      "dependencies": [
        "NwtValidationContextPointer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-validation/nwt-validator.js",
      "name": "nwt-validator.js",
      "type": "file",
      "formalName": "NwtValidatorJs",
      "apiName": "NwtValidator",
      "dependencies": [
        "NwtValidator",
        "NwtFeatureStatics"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-vue2.js",
      "name": "nwt-vue2.js",
      "type": "file",
      "formalName": "NwtVue2Js",
      "apiName": "NwtVue2",
      "dependencies": [
        "NwtVue2",
        "NwtFramework",
        "NwtEnvironment",
        "NwtCommand"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-form/nwt-anonymous-command-form.js",
      "name": "nwt-anonymous-command-form.js",
      "type": "file",
      "formalName": "NwtAnonymousCommandFormJs",
      "isVueComponent": true,
      "componentName": [
        "NwtAnonymousCommandFormJs",
        "NwtAnonymousCommandFormHtml",
        "NwtAnonymousCommandFormCss"
      ],
      "apiName": "NwtAnonymousCommandForm",
      "dependencies": [
        "NwtAnonymousCommandForm",
        "NwtCommandFormInterface"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-anonymous-command-view/nwt-anonymous-command-view.js",
      "name": "nwt-anonymous-command-view.js",
      "type": "file",
      "formalName": "NwtAnonymousCommandViewJs",
      "isVueComponent": true,
      "componentName": [
        "NwtAnonymousCommandViewJs",
        "NwtAnonymousCommandViewHtml",
        "NwtAnonymousCommandViewCss"
      ],
      "apiName": "NwtAnonymousCommandView",
      "dependencies": [
        "NwtAnonymousCommandView",
        "NwtCommandViewInterface"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-box-viewer/nwt-box-viewer.js",
      "name": "nwt-box-viewer.js",
      "type": "file",
      "formalName": "NwtBoxViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtBoxViewerJs",
        "NwtBoxViewerHtml",
        "NwtBoxViewerCss"
      ],
      "apiName": "NwtBoxViewer",
      "dependencies": [
        "NwtBoxViewer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-chatgpt-files-manager-viewer/nwt-chatgpt-files-manager-viewer.js",
      "name": "nwt-chatgpt-files-manager-viewer.js",
      "type": "file",
      "formalName": "NwtChatgptFilesManagerViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtChatgptFilesManagerViewerJs",
        "NwtChatgptFilesManagerViewerHtml",
        "NwtChatgptFilesManagerViewerCss"
      ],
      "apiName": "NwtChatgptFilesManagerViewer",
      "dependencies": [
        "NwtChatgptFilesManagerViewer",
        "NwtChatgpt",
        "NwtDialogs"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-code-highlighter/nwt-code-highlighter.js",
      "name": "nwt-code-highlighter.js",
      "type": "file",
      "formalName": "NwtCodeHighlighterJs",
      "isVueComponent": true,
      "componentName": [
        "NwtCodeHighlighterJs",
        "NwtCodeHighlighterHtml",
        "NwtCodeHighlighterCss"
      ],
      "apiName": "NwtCodeHighlighter",
      "dependencies": [
        "NwtCodeHighlighter",
        "NwtUtils",
        "NwtLazyLoader"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/nwt-command/components/nwt-commands-manager-viewer/nwt-commands-manager-viewer.js",
      "name": "nwt-commands-manager-viewer.js",
      "type": "file",
      "formalName": "NwtCommandsManagerViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtCommandsManagerViewerJs",
        "NwtCommandsManagerViewerHtml",
        "NwtCommandsManagerViewerCss"
      ],
      "apiName": "NwtCommandsManagerViewer",
      "dependencies": [
        "NwtCommandsManagerViewer",
        "NwtCommandsManager",
        "NwtFilesystem",
        "NwtSettings",
        "NwtShell"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-file-explorer/nwt-file-explorer.js",
      "name": "nwt-file-explorer.js",
      "type": "file",
      "formalName": "NwtFileExplorerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtFileExplorerJs",
        "NwtFileExplorerHtml",
        "NwtFileExplorerCss"
      ],
      "apiName": "NwtFileExplorer",
      "dependencies": [
        "NwtFileExplorer",
        "NwtUtils",
        "NwtFilesystem",
        "NwtPaths",
        "require(\"path\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-buttons/nwt-form-control-buttons.js",
      "name": "nwt-form-control-buttons.js",
      "type": "file",
      "formalName": "NwtFormControlButtonsJs",
      "isVueComponent": true,
      "componentName": [
        "NwtFormControlButtonsJs",
        "NwtFormControlButtonsHtml",
        "NwtFormControlButtonsCss"
      ],
      "apiName": "NwtFormControlButtons",
      "dependencies": [
        "NwtFormControlButtons"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-handler/nwt-form-control-handler.js",
      "name": "nwt-form-control-handler.js",
      "type": "file",
      "formalName": "NwtFormControlHandlerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtFormControlHandlerJs",
        "NwtFormControlHandlerHtml",
        "NwtFormControlHandlerCss"
      ],
      "apiName": "NwtFormControlHandler",
      "dependencies": [
        "NwtFormControlHandler"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-form-anterior/control-statement/nwt-form-control-statement.js",
      "name": "nwt-form-control-statement.js",
      "type": "file",
      "formalName": "NwtFormControlStatementJs",
      "isVueComponent": true,
      "componentName": [
        "NwtFormControlStatementJs",
        "NwtFormControlStatementHtml",
        "NwtFormControlStatementCss"
      ],
      "apiName": "NwtFormControlStatement",
      "dependencies": [
        "NwtFormControlStatement",
        "NwtFramework"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-matrix-background/nwt-matrix-background.js",
      "name": "nwt-matrix-background.js",
      "type": "file",
      "formalName": "NwtMatrixBackgroundJs",
      "isVueComponent": true,
      "componentName": [
        "NwtMatrixBackgroundJs",
        "NwtMatrixBackgroundHtml",
        "NwtMatrixBackgroundCss"
      ],
      "apiName": "NwtMatrixBackground",
      "dependencies": [
        "NwtMatrixBackground",
        "window.innerWidth",
        "window.innerHeight"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedure-documentation-viewer/nwt-procedure-documentation-viewer.js",
      "name": "nwt-procedure-documentation-viewer.js",
      "type": "file",
      "formalName": "NwtProcedureDocumentationViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtProcedureDocumentationViewerJs",
        "NwtProcedureDocumentationViewerHtml",
        "NwtProcedureDocumentationViewerCss"
      ],
      "apiName": "NwtProcedureDocumentationViewer",
      "dependencies": [
        "NwtProcedureSeed",
        "NwtProcedureDefinition",
        "NwtEnvironment",
        "require(\"fs\")"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-procedures-manager-viewer/nwt-procedures-manager-viewer.js",
      "name": "nwt-procedures-manager-viewer.js",
      "type": "file",
      "formalName": "NwtProceduresManagerViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtProceduresManagerViewerJs",
        "NwtProceduresManagerViewerHtml",
        "NwtProceduresManagerViewerCss"
      ],
      "apiName": "NwtProceduresManagerViewer",
      "dependencies": [
        "NwtProceduresManagerViewer",
        "NwtProceduresManager"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-process-manager-viewer/nwt-process-manager-viewer.js",
      "name": "nwt-process-manager-viewer.js",
      "type": "file",
      "formalName": "NwtProcessManagerViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtProcessManagerViewerJs",
        "NwtProcessManagerViewerHtml",
        "NwtProcessManagerViewerCss"
      ],
      "apiName": "NwtProcessManagerViewer",
      "dependencies": [
        "NwtProcessManager",
        "NwtProcessManagerViewer",
        "NwtProgressBar"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-progress-bar-viewer/nwt-progress-bar-viewer.js",
      "name": "nwt-progress-bar-viewer.js",
      "type": "file",
      "formalName": "NwtProgressBarViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtProgressBarViewerJs",
        "NwtProgressBarViewerHtml",
        "NwtProgressBarViewerCss"
      ],
      "apiName": "NwtProgressBarViewer",
      "dependencies": [
        "NwtProgressBar",
        "NwtProgressBarViewer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-prompts-manager-viewer/nwt-prompts-manager-viewer.js",
      "name": "nwt-prompts-manager-viewer.js",
      "type": "file",
      "formalName": "NwtPromptsManagerViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtPromptsManagerViewerJs",
        "NwtPromptsManagerViewerHtml",
        "NwtPromptsManagerViewerCss"
      ],
      "apiName": "NwtPromptsManagerViewer",
      "dependencies": [
        "NwtPromptsManagerViewer",
        "NwtPromptsManager",
        "NwtDialogs",
        "NwtFilesystem",
        "NwtSettings",
        "NwtShell"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-settings-viewer/nwt-settings-viewer.js",
      "name": "nwt-settings-viewer.js",
      "type": "file",
      "formalName": "NwtSettingsViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtSettingsViewerJs",
        "NwtSettingsViewerHtml",
        "NwtSettingsViewerCss"
      ],
      "apiName": "NwtSettingsViewer",
      "dependencies": [
        "NwtSettings",
        "NwtSettingsViewer",
        "NwtDialog",
        "NwtUtils"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-source-viewer/nwt-source-viewer.js",
      "name": "nwt-source-viewer.js",
      "type": "file",
      "formalName": "NwtSourceViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtSourceViewerJs",
        "NwtSourceViewerHtml",
        "NwtSourceViewerCss"
      ],
      "apiName": "NwtSourceViewer",
      "dependencies": [
        "NwtSourceViewer",
        "NwtRandomizer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-stars-background/nwt-stars-background.js",
      "name": "nwt-stars-background.js",
      "type": "file",
      "formalName": "NwtStarsBackgroundJs",
      "isVueComponent": true,
      "componentName": [
        "NwtStarsBackgroundJs",
        "NwtStarsBackgroundHtml",
        "NwtStarsBackgroundCss"
      ],
      "apiName": "NwtStarsBackground",
      "dependencies": [
        "NwtStarsBackground"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-node/nwt-tester-node.js",
      "name": "nwt-tester-node.js",
      "type": "file",
      "formalName": "NwtTesterNodeJs",
      "isVueComponent": true,
      "componentName": [
        "NwtTesterNodeJs",
        "NwtTesterNodeHtml",
        "NwtTesterNodeCss"
      ],
      "apiName": "NwtTesterNode",
      "dependencies": [
        "NwtTesterNode",
        "NwtTesterViewer"
      ]
    },
    {
      "path": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/assets/framework/browser/components/nwt-tester-viewer/nwt-tester-viewer.js",
      "name": "nwt-tester-viewer.js",
      "type": "file",
      "formalName": "NwtTesterViewerJs",
      "isVueComponent": true,
      "componentName": [
        "NwtTesterViewerJs",
        "NwtTesterViewerHtml",
        "NwtTesterViewerCss"
      ],
      "apiName": "NwtTesterViewer",
      "dependencies": [
        "NwtTester",
        "NwtTesterViewer"
      ]
    }
  ]
}
```
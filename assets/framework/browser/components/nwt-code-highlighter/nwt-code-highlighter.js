/**
 * 
 * # Nwt Code Highlighter API / Componente Vue2
 * 
 * La Nwt Code Highlighter API permite visualizar un fragmento de código con la iluminación de sintaxis.
 * 
 * ## Exposición
 * 
 * La API se expone a través del componente Vue2:
 * 
 * ```js
 * Vue.options.components.NwtCodeHighlighter
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```html
 * <nwt-code-highlighter syntax="html" :code="<div>Aquí debe ir el código en el lenguaje especificado</div>" />
 * ```
 * 
 * Donde `syntax` tiene que ser el lenguaje de programación.
 * 
 * Donde `code` tiene que ser el código fuente en este lenguaje,
 * 
 * 
 */
Vue.component("NwtCodeHighlighter", {
  template: $template,
  props: {
    syntax: {
      type: String,
      default: () => "html",
    },
    code: {
      type: String,
      default: () => "",
    }
  },

  data() {
    trace("NwtCodeHighlighter.data");
    return {
      
    };
  },

  methods: {
    
    copyCode() {
      trace("NwtCodeHighlighter.methods.copyCode");
      const code = this.code || this.$slots.default[0]?.text || "";
      NwtUtils.copyToClipboard(code);
    }

  },

  async mounted() {
    trace("NwtCodeHighlighter.mounted");
    await NwtLazyLoader.loadHighlightJs();
    Load_languages: {
      break Load_languages;
      if(this.syntax === "javascript") {
        await NwtLazyLoader.loadHighlightJsForJavascript();
      } else if(this.syntax === "css") {
        await NwtLazyLoader.loadHighlightJsForCss();
      }
    }
    hljs.highlightElement(this.$refs.code_highlighter_box);
  },

});

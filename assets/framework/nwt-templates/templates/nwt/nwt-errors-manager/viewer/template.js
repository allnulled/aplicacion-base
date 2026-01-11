(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtErrorsManagerViewerUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtErrorsManagerViewerUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtErrorsManagerViewerUtils = class {

    static dispatchSelectError(selectedIndex) {
      trace("NwtErrorsManager.dispatchSelectError");
      const buttons = document.querySelector(".global_nwt_errors_manager").querySelectorAll(".selectable_common_error_button");
      const errors = document.querySelector(".global_nwt_errors_manager").querySelectorAll(".selectable_common_error_block");
      const showAll = selectedIndex === "*";
      if (showAll) {
        for (let index = 0; index < errors.length; index++) {
          const item = errors[index];
          buttons[index].classList.remove("active");
          item.classList.remove("display_none");
        }
      } else {
        for (let index = 0; index < errors.length; index++) {
          const item = errors[index];
          if (index !== selectedIndex) {
            item.classList.add("display_none");
            buttons[index].classList.remove("active");
          } else {
            item.classList.remove("display_none");
            buttons[index].classList.add("active");
          }
        }
      }
    }

    static dispatchCopyErrors() {
      trace("NwtErrorsManager.dispatchCopyErrors");
      const elements = document.querySelectorAll(".global_nwt_errors_manager .copiable");
      console.log(elements);
      let content = "";
      for(let index=0; index<elements.length; index++) {
        const element = elements[index];
        content += "----------------------\n";
        content += element.textContent + "\n";
      }
      const formatted = content;
      NwtClipboard.copyText(formatted);
    }

    static dispatchToggleFocus() {
      trace("NwtErrorsManager.dispatchToggleFocus");
      document.querySelector(".global_nwt_errors_manager > .window").classList.toggle("focused");
    }

    static dispatchLoseFocus() {
      trace("NwtErrorsManager.dispatchLoseFocus");
      document.querySelector(".global_nwt_errors_manager > .window").classList.remove("focused");
    }
    static dispatchGainFocus() {
      trace("NwtErrorsManager.dispatchGainFocus");
      document.querySelector(".global_nwt_errors_manager > .window").classList.add("focused");
    }

  };

  return NwtErrorsManagerViewerUtils;

});

Initialization_on_dom: {
    try {
      const rootElement = manager.htmlElement;
      if (typeof hljs === "undefined") await NwtLazyLoader.loadHighlightJs();
      const jsBoxes = [...rootElement.querySelectorAll("pre.js")];
      jsBoxes.forEach(box => hljs.highlightElement(box));
    } catch (error) {
      console.error(error);
    }
  }
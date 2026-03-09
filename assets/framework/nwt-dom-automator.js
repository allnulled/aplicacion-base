(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtDomAutomator'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtDomAutomator'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtDomAutomator = class {

    static find(baseElement, selector, text = false) {
      trace("NwtDomAutomator.find");
      const matchedBySelector = baseElement.querySelectorAll(selector);
      if (text === false) {
        return matchedBySelector;
      }
      const matchedByText = [...matchedBySelector].filter(el => {
        return el.textContent.trim().toLowerCase().includes(text.toLowerCase());
      });
      const deepest = matchedByText.filter(el => {
        return !matchedByText.some(other => {
          return (other !== el) && el.contains(other);
        });
      });
      return deepest;
    }

    static async abrirTestsDeLaAplicacion() {
      trace("NwtDomAutomator.abrirTestsDeLaAplicacion");
      NwtDomAutomator.find(document.body, "*", "Tests de la aplicación")[0].click();
    }

    static async abrirTemporizador() {
      trace("NwtDomAutomator.abrirTemporizador");
      NwtDomAutomator.find(document.body, "*", "Temporizador")[0].click();
    }

    static async abrirTodosLosTestsDeLaAplicacion() {
      trace("NwtDomAutomator.abrirTodosLosTestsDeLaAplicacion");
      await this.abrirTestsDeLaAplicacion();
      await NwtTimer.timeout(100);
      const selectedTest = NwtDomAutomator.find(document.body, "*", "Tests dinámicos")[0];
      selectedTest.nextElementSibling.children[0].click();
    }
    
    static async followTheRabbit(base = document.body, start = 1) {
      let current = start;
      for (;;) {
        await NwtTimer.timeout(500);
        const selector = [`[data-rabbit="${current}"]`];
        const el = base.querySelector(selector);
        if (!el) break;
        el.click();
        current++;
      }
    }

  };

  return NwtDomAutomator;

});
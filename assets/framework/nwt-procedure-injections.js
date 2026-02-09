(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtProcedureInjections'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtProcedureInjections'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtProcedureInjections = class {

    static injectKeyEventForProceduresManager() {
      if(typeof document === "undefined") {
        return;
      }
      document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key === "j") {
          CommonDialogs.open({
            title: "Gestor de procedimientos",
            template: `
              <nwt-procedures-manager-viewer
                :manager="$window.NwtProceduresManager.global"
                :dialog="this"
              />
            `,
          });
        }
      });
    }

  };

  NwtProcedureInjections.injectKeyEventForProceduresManager();

  return NwtProcedureInjections;

});
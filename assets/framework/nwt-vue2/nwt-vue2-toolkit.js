(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtVue2Toolkit'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtVue2Toolkit'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtVue2Toolkit = {

    installToolkit: function(component) {
      if(component.$toolkit) return false;
      component.$toolkit = NwtProxyChain.installTeleporter(component, NwtVue2Toolkit);
      component.$toolkit.installLocal(component);
      return true;
    },

    installLocal: function(component) {
      if(component.$local) return false;
      component.$local = {};
      return true;
    },

    installStore: function(component) {
      if(component.$store) return false;
      component.$store = NwtPropagableStore.create();
      return true;
    },

    // Ejemplo de API indexada:
    install: NwtProxyChain.Nexer.create({
      store: function() {
        return this.$toolkit.installStore(this);
      },
      local: function() {
        return this.$toolkit.installLocal(this);
      }
    }),

    ...NwtVue2ToolkitFormControlInterface

  };

  return NwtVue2Toolkit;

});
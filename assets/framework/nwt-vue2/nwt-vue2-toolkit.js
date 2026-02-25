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
      component.$toolkit.installStore();
      component.$toolkit.installLocal();
      return true;
    },

    getSettings: function() {
      assertion(typeof this.settings === "object", "Component property «settings» must be object on «NwtVue2Toolkit.getSettings»");
      return this.settings;
    },

    getRoot: function() {
      assertion(typeof this.settings === "object", "Component property «settings» must be object on «NwtVue2Toolkit.getRoot»");
      assertion(typeof this.settings.root === "object", "Component property «settings.root» must be object on «NwtVue2Toolkit.getRoot»");
      return this.settings.root;
    },

    getRootValueByIndex: function() {

    },

    getRootValueIndex: function() {
      return this.settings.rootValueIndex ? this.settings.rootValueIndex : [];
    },

    installStore: function() {
      if(this.$store) return false;
      this.$store = NwtPropagableStore.create();
    },

    installLocal: function() {
      if(this.$local) return false;
      this.$local = {};
    },

    // Ejemplo de API indexada:
    install: NwtProxyChain.Nexer.create({
      store: function() {
        return this.$toolkit.installStore();
      },
      local: function() {
        return this.$toolkit.installLocal();
      }
    }),

    getComponentNameBySettings(settings = this.settings) {
      assertion(typeof settings === "object", "Parameter «settings» must be object on «NwtVue2Toolkit.getComponentNameBySettings»");
      assertion(typeof settings.type === "string", "Parameter «settings.type» must be object on «NwtVue2Toolkit.getComponentNameBySettings»");
      return "nwt-" + NwtVue2.fromIdToTagNotation(settings.type);
    },

  };

  return NwtVue2Toolkit;

});
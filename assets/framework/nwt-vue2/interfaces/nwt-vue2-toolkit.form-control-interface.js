(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtVue2ToolkitFormControlInterface'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtVue2ToolkitFormControlInterface'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtVue2ToolkitFormControlInterface = {

    getSettings: function() {
      assertion(typeof this.settings === "object", "Component property «settings» must be object on «NwtVue2Toolkit.getSettings»");
      return this.settings;
    },

    getRoot: function() {
      if(this.$options.name === "NwtFormMakerViewer") return this;
      return NwtVue2.getFirstParentWhere(this, it => it.$options.name === "NwtFormMakerViewer");
    },

    getValueByIndex: function() {
      if(this.settings.hasFixedValue) return this.settings.hasFixedValue;
      const selector = this.$toolkit.getIndexForValue();
      const value = this.$toolkit.getRoot().getValue();
      let output = value;
      for(let index=0; index<selector.length; index++) {
        const prop = selector[index];
        output = output[prop];
      }
      return output;
    },

    getIndexForValue: function() {
      return this.settings.rootValueIndex ? this.settings.rootValueIndex : [];
    },

    getIndexForSchema: function() {
      return this.settings.rootSchemaIndex ? this.settings.rootSchemaIndex : [];
    },

    getComponentNameBySettings: function(settings = this.settings) {
      assertion(typeof settings === "object", "Parameter «settings» must be object on «NwtVue2Toolkit.getComponentNameBySettings»");
      assertion(typeof settings.type === "string", "Parameter «settings.type» must be object on «NwtVue2Toolkit.getComponentNameBySettings»");
      return "nwt-" + NwtVue2.fromIdToTagNotation(settings.type);
    },

    adaptTypeNameToUser: function(txt = this.settings.type) {
      return txt.replace("control/for/", "");
    }

  };

  return NwtVue2ToolkitFormControlInterface;

});
NwtResourceApi.register({
  namespace: "settings",
  getSettingsSpec: function() {
    return this.settingsSpec;
  },
  validateSettings: function(settings) {
    return NwtPrototyper.initializePropertiesOf(settings, this.settingsSpec || {});
  }
});
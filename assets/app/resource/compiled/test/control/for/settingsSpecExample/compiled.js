NwtResource.define({
  id: "test/control/for/settingsSpecExample",
  apis: ["settings", "test"],
  inherits: ["test/control/trait/for/settings", "test/control/trait/for/settingsSpecTraitExample", "test/control/trait/for/staticExample"],
  traits: {
    "test/control/trait/for/settingsSpecTraitExample": {
      "customTrait": 500
    }
  },
  settingsSpec: {
    "name": {
      "type": String,
      "default": "",
      "validator": function(val) {
        if (val.length === 0) throw new Error(`Text cannot be empty at property «name» due to «settingsSpec» in «${this.id}» on «@Resource.settingsSpec.name.validator»`);
        if (!val.substr(0, 1).match(/[A-Z]/g)) throw new Error(`Propiedad name debe empezar por mayúsculas on «name» due to «settingsSpec» in «${this.id}» on «@Resource.settingsSpec.name.validator»`);
      }
    }
  },
  hello: NwtStatic.api.test.control.trait.for.staticExample.hello,
});
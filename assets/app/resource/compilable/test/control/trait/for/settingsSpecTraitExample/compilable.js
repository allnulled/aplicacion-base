module.exports = {
  id: "test/control/trait/for/settingsSpecTraitExample",
  apis: [],
  inherits: [],
  traits: {
    customTrait: 500,
  },
  settingsSpec: {
    name: {
      type: LowCode.create("String"),
      default: "",
      validator: function(val) {
        if(val.length === 0) throw new Error(`Text cannot be empty at property «name» due to «settingsSpec» in «${this.id}» on «@Resource.settingsSpec.name.validator»`);
        if(!val.substr(0,1).match(/[A-Z]/g)) throw new Error(`Propiedad name debe empezar por mayúsculas on «name» due to «settingsSpec» in «${this.id}» on «@Resource.settingsSpec.name.validator»`);
      }
    }
  }
};
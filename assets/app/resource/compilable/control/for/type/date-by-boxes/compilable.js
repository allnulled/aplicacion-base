module.exports = {
  id: "control/for/type/date-by-boxes",
  subtypeOf: "structure",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [
    "control/trait/for/showable",
    "control/trait/for/getValue",
    "control/trait/for/remoteValue",
    "control/trait/for/remoteSchema",
    "control/trait/for/remoteComponent",
    "control/trait/for/settings",
  ],
  settingsSpec: {
    isShowingControl: {
      type: LowCode.type.Boolean,
      default: true,
    },
    initialValue: {
      type: LowCode.type.Any,
      default: function() {
        return new Date();
      },
    },
  },
  view: {
    name: "NwtControlForTypeDateByBoxes",
    template: $template,
    methods: {
      getValueByDom: function() {
        trace("NwtControlForTypeDateByBoxes.methods.getValueByDom");
        if(!this.$local.control) {
          return this.getValueBySchema();
        }
        return this.$local.control.value;
      },
      setValueByDom: function(value) {
        trace("NwtControlForTypeDateByBoxes.methods.setValueByDom");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = value;
      },
      reloadValue: function() {
        return this.loadValue();
      },
      saveValue: function() {
        trace("NwtControlForTypeDateByBoxes.methods.saveValue");
        const value = this.getValueByDom();
        const indexes = this.getIndexForValue();
        console.log("Saving:", indexes, value);
        this.$toolkit.getRoot().$store.set(indexes, value);
      },
      loadValue: function() {
        trace("NwtControlForTypeDateByBoxes.methods.loadValue");
        if(!this.$local.control) {
          return false;
        }
        this.$local.control.value = this.getValueBySchema();
      },
      onValidate: function () {
        trace("NwtControlForTypeDateByBoxes.methods.onValidate");
        console.log("Validation at component-level on control/for/type/date-by-boxes");
      },
    },
    created: function() {
      trace("NwtControlForTypeDateByBoxes.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
    },
    mounted: function() {
      trace("NwtControlForTypeDateByBoxes.mounted");
      this.reloadValue();
    }
  },
  control: {
    schema: {
      year: {
        type: "control/for/text",
        hasStatement: "Año de creación",
      },
      month: {
        type: "control/for/text",
        hasStatement: "Mes de creación",
      },
      day: {
        type: "control/for/text",
        hasStatement: "Día de creación",
      },
      hour: {
        type: "control/for/text",
        hasStatement: "Hora de creación",
      },
      minute: {
        type: "control/for/text",
        hasStatement: "Minuto de creación",
      },
      second: {
        type: "control/for/text",
        hasStatement: "Segundo de creación",
      },
    },
    onValidate: function(value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      trace("@compilable/control/for/type/date-by-boxes.control.onValidate");
      console.log("Validation at resource-level on control/for/type/date-by-boxes");
    },
  },
};
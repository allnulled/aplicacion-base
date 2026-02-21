module.exports = {
  id: "control/for/list",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [
    "control/trait/for/getValue",
    "control/trait/for/settings",
    "control/trait/for/validate",
  ],
  settingsSpec: {
    schema: {
      type: [LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForList",
    template: $template,
  },
  control: {
    primitiveType: "list",
    // Validate by statically (1st):
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(Array.isArray(value), `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be array not only object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(typeof settings.schema.type === "string", `Parameter «settings.schema.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/list').control.onValidate»`);
      assertion(NwtResource.isDefined(settings.schema.type), `Parameter «settings.schema.type» which is «${settings.schema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/list').control.onValidate»`);
      const resource = NwtResource.for(settings.schema.type);
      const errors = [];
      const isRoot = indexes.length === 0;
      const discriminators = [];
      for(let index=0; index<value.length; index++) {
        const subvalue = value[index];
        const validation = resource.api.control.validation.validateValue(subvalue, settings.schema, component, indexes.concat([index]), assertion);
        if(validation.error === true) {
          errors.push(validation.data);
        } else if(isRoot && validation.discriminator) {
          discriminators[propId] = discriminator;
        }
      }
      if(errors.length) {
        throw NwtErrorUtils.unifyErrors(errors);
      }
      return isRoot ? discriminators : true;
    }
  },
};
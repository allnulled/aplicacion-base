module.exports = {
  id: "control/for/option",
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
    name: "NwtControlForOption",
    template: $template,
  },
  control: {
    primitiveType: "option",
    // Validate by statically (1st):
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      // assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/option').control.onValidate»`);
      assertion(Array.isArray(settings.schema), `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be array not only object on «NwtResource.for('control/for/option').control.onValidate»`);
      Checking_schema_types:
      for(let index=0; index<settings.schema.length; index++) {
        const optionSchema = settings.schema[index];
        assertion(typeof optionSchema === "object", `Parameter «settings.schema[${index}]»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object but «${typeof optionSchema}» found on «NwtResource.for('control/for/option').control.onValidate»`);
        assertion(typeof optionSchema.type === "string", `Parameter «settings.schema[${index}].type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string but «${typeof optionSchema.type}» found on «NwtResource.for('control/for/option').control.onValidate»`);
        assertion(NwtResource.isDefined(settings.schema.type), `Parameter «settings.schema.type» which is «${settings.schema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/option').control.onValidate»`);
      }
      const resource = NwtResource.for(settings.schema.type);
      const errors = [];
      const isRoot = indexes.length === 0;
      const discriminators = true;
      Checking_value_type:
      for(let index=0; index<settings.schema.length; index++) {
        const subschema = settings.schema[index];
        const validation = resource.api.control.validation.validateValue(subvalue, subschema, component, indexes, assertion);
        if(validation.error === true) {
          errors.push(validation.data);
        } else if(isRoot && validation.discriminator) {
          discriminators = validation.discriminator;
        }
      }
      if(errors.length) {
        throw NwtErrorUtils.unifyErrors(errors);
      }
      return isRoot ? discriminators : true;
    }
  },
};
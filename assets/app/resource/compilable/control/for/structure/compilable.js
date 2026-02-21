module.exports = {
  id: "control/for/structure",
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
    name: "NwtControlForStructure",
    template: $template,
  },
  control: {
    primitiveType: "structure",
    // Validate by statically (1st):
    onValidate: function (value, settings, component, indexes = [], assertion = NwtAsserter.global) {
      assertion(typeof value === "object", `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
      assertion(typeof settings.schema.type === "undefined", `Parameter «settings.schema.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} can lead to misunderstanding because this object is not aimed to define a type but a map of types on «NwtResource.for('control/for/structure').control.onValidate»`);
      const schema = settings.schema;
      const props = Object.keys(schema);
      const errors = [];
      const discriminators = {};
      const isRoot = indexes.length === 0;
      for (let indexId = 0; indexId < props.length; indexId++) {
        const propId = props[indexId];
        const propValue = value[propId];
        assertion(propId in schema, `Property «${propId}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} is not declared on «settings.schema» on «NwtResource.for('control/for/structure').control.onValidate»`);
        const propSchema = schema[propId];
        assertion(typeof propSchema === "object", `Parameter «settings.schema[${propId}]»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtResource.for('control/for/structure').control.onValidate»`);
        assertion(typeof propSchema.type === "string", `Parameter «settings.schema[${propId}].type» which is type of «typeof ${propId}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtResource.for('control/for/structure').control.onValidate»`);
        assertion(NwtResource.isDefined(propSchema.type), `Parameter «settings.schema[${propId}].type» which is «${propSchema.type}»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be a defined resource on «NwtResource.for('control/for/structure').control.onValidate»`);
        const propValidation = NwtResource.for(propSchema.type).api.control.validation.validateValue(propValue, propSchema, component, indexes.concat([propId]), assertion);
        if(propValidation.error) {
          errors.push(propValidation.data);
        } else if(isRoot && typeof propValidation.data === "number") {
          // Si (es válido y) es root y tiene discriminador adjunto:
          discriminators[propId] = propValidation.data;
        }

      }
      if(errors.length) {
        throw NwtErrorUtils.unifyErrors(errors);
      }
      return isRoot ? discriminators : true;
    }
  },
};
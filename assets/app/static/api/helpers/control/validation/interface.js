NwtStatic.api.expand("control.validation.interface", {
  utils: {
    getIndexesErrorMessage(indexes) {
      assertion(Array.isArray(indexes), "Parameter «indexes» must be array on «NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage»");
      if(!indexes.length) {
        return "";
      }
      return ` on index «${indexes.join(".")}»`;
    }
  },
  statically: {
    validateControlSchema: function(settings, indexes = [], assertion = NwtAsserter.global) {
      trace("NwtStatic.api.control.validation.interface.statically.validateControlSchema");
      assertion(typeof settings === "object", `Parameter «settings»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
      assertion(typeof settings.type === "string", `Parameter «settings.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be string on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
      assertion(NwtResource.isDefined(settings.type), `Parameter «settings.type»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} which is «${settings.type}» must be a defined NwtResource on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
      const isPrimitiveWithSchema = ["control/for/structure", "control/for/list", "control/for/option"].includes(settings.type);
      const mustHaveSchema = isPrimitiveWithSchema;
      if(mustHaveSchema) {
        assertion(typeof settings.schema === "object", `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object because it is a primite type with schema on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
        if(settings.type === "control/for/structure") {
          assertion(!Array.isArray(settings.schema), `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object but not array because it specifies type structure on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
          for(let prop in settings.schema) {
            NwtStatic.api.control.validation.interface.statically.validateControlSchema(settings.schema[prop], indexes.concat(["schema", prop]), assertion);
          }
        } else if(settings.type === "control/for/list") {
          assertion(!Array.isArray(settings.schema), `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be object but not array because it specifies type list on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
          NwtStatic.api.control.validation.interface.statically.validateControlSchema(settings.schema, indexes.concat(["schema", "*"]), assertion);
        } else if(settings.type === "control/for/option") {
          assertion(Array.isArray(settings.schema), `Parameter «settings.schema»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must be array because it specifies type option on «NwtStatic.api.control.validation.interface.statically.validateControlSchema»`);
          for(let index = 0; index < settings.schema.length; index++) {
            NwtStatic.api.control.validation.interface.statically.validateControlSchema(settings.schema[index], indexes.concat(["schema", index]), assertion);
          }
        }
      }
    },
    validateValue: function(resource, value, settings = false, component = false, indexes = [], customAsserter = NwtAsserter.silently) {
      trace("NwtStatic.api.control.validation.interface.statically.validateValue");
      const validation = NwtStatic.api.control.validation.result.class.create();
      try {
        const validationCallbackByStatically = resource.control?.onValidate || NwtUtils.noop;
        const validationCallbackByView = component?.onValidate || NwtUtils.noop;
        const validationCallbackBySettings = settings?.onValidate || NwtUtils.noop;
        let output = undefined;
        let temp = validationCallbackByStatically.call(resource, value, settings, component, indexes, customAsserter);
        if(typeof temp !== "undefined") {
          output = temp;
        }
        temp = validationCallbackByView.call(component, value, settings, component, indexes, customAsserter);
        if(typeof temp !== "undefined") {
          output = temp;
        }
        temp = validationCallbackBySettings.call(component, value, settings, component, indexes, customAsserter);
        if(typeof temp !== "undefined") {
          output = temp;
        }
        validation.setSuccess(output);
      } catch (error) {
        validation.setError(error);
      }
      return validation;
    },
    updateValidationErrors: function(resource, component) {
      assertion(resource instanceof NwtResource, "Parameter «resource» must be instance of NwtResource on «NwtStatic.api.control.validation.interface.statically.updateValidationErrors»");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtStatic.api.control.validation.interface.statically.updateValidationErrors»");
      NwtStatic.api.control.validation.interface.validateControlSchema(component.settings);
      const formattedValue = component.getValue();
      const validation = NwtStatic.api.control.validation.interface.validateValue(formattedValue);
      if(validation.success) {
        component.validationErrors = false;
      } else {
        component.validationErrors = validation.data;
      }
    }
  },
  view: {
    methods: {
      
    }
  }
});
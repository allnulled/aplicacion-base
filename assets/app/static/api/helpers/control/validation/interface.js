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
    validateValue: function(resource, value, settings = false, component = false, indexes = [], customAsserter = NwtAsserter.silently) {
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
    }
  },
  view: {
    methods: {
      
    }
  }
});
NwtFeature_vue2_binding: {

  Injection_by_signature_on_vue_component: {
    Vue.componentOriginalCallback = Vue.component;
    Vue.component = function (...args) {
      const isFeaturingSignature = true
        && (typeof args[0] === "string")
        && (typeof args[1] === "object")
        && (typeof args[1].statics === "object")
        && (typeof args[1].statics.inherits === "object")
        && (Array.isArray(args[1].statics.inherits))
        && (args[1].statics.inherits.length > 0);
      if (isFeaturingSignature) {
        return (async function () {
          const featureChain = args[1].statics.inherits.concat([args[1]]);
          const componentDefinition = await NwtFeatureMixer.mix(featureChain);
          Vue.componentOriginalCallback(args[0], componentDefinition);
        })();
      } else {
        Vue.componentOriginalCallback(...args);
      }
      return Vue.options.components[args[0]];
    }
  }

}
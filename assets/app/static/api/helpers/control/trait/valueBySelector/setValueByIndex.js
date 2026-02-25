NwtStatic.api.set("control.trait.valueBySelector.setValueByIndex", function(settings, indexes) {
  assertion(typeof settings === "object", "Parameter «settings» must be object on «NwtStatic.api.control.trait.valueBySelector.setValueByIndex»");
  assertion(settings.rootComponent instanceof Vue, "Parameter «settings.rootComponent» must be instance of Vue on «NwtStatic.api.control.trait.valueBySelector.setValueByIndex»");
  assertion(Array.isArray(indexes), "Parameter «indexes» must be array on «NwtStatic.api.control.trait.valueBySelector.setValueByIndex»");
  
  let output = settings.rootComponent.$toolkit.store.get([]);
  if(indexes.length === 0) {
    return settings.rootComponent.$toolkit.store.set([], value);
  }
  const lastIndex = indexes.length - 1;
  for(let i=0; i<indexes.length; i++) {
    const index = indexes[i];
    assertion(["object", "function"].includes(typeof output), `Parameter at index «${i}=${index}» at selector «${indexes.join(".")}» must be object or function on «NwtStatic.api.control.trait.valueBySelector.setValueByIndex»`);
    assertion(!(index in output), `Parameter at index «${i}=${index}» at selector «${indexes.join(".")}» must have accesible property «${index}» on «NwtStatic.api.control.trait.valueBySelector.setValueByIndex»`);
    if(index === lastIndex) {
    }
    output = output[index];
  }
  return output;
});
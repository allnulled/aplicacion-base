NwtStatic.api.set("control.trait.valueBySelector.getValueByIndex", function(value, indexes) {
  assertion(Array.isArray(indexes), "Parameter «indexes» must be array on «NwtStatic.api.control.trait.valueBySelector.getValueByIndex»");
  let output = value;
  for(let i=0; i<indexes.length; i++) {
    const index = indexes[i];
    assertion(["object", "function"].includes(typeof output), `Parameter at index «${i}=${index}» at selector «${indexes.join(".")}» must be object or function on «NwtStatic.api.control.trait.valueBySelector.getValueByIndex»`);
    assertion(!(index in output), `Parameter at index «${i}=${index}» at selector «${indexes.join(".")}» must have accesible property «${index}» on «NwtStatic.api.control.trait.valueBySelector.getValueByIndex»`);
    output = output[index];
  }
  return output;
});
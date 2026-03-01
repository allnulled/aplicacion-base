NwtStatic.api.set("control.validation.onValidateForText", function(...args) {
  trace("NwtStatic.api.control.validation.onValidateForText");
  const [subvalue, subschema, value, schema, controlComponent = false, valueIndex = [], schemaIndex = [], assertion = NwtAsserter.silently] = args;
  assertion(typeof subvalue === "string", `Value must be string because it is subtype of «text» but type «${typeof subvalue}» was found at index «${valueIndex.join(".") || "[]"}» at schema index «${schemaIndex.join(".")||"[]"}» on «NwtStatic.api.control.validation.onValidateForText»`);
});
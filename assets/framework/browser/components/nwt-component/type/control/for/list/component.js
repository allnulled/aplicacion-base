return await NwtFeatureMixer.component({
  name: "NwtControlForList",
  statics: {
    id: "@control/for/list",
    inherits: [
      "@feature/for/control/trait/statics",
      "@feature/for/control/trait/settings",
      "@feature/for/control/trait/getValue",
      "@feature/for/control/trait/isExpanded",
      "@feature/for/control/trait/hasDescription",
      "@feature/for/control/trait/hasPlaceholder",
      "@feature/for/control/trait/hasStatement",
      "@feature/for/control/trait/validate",
    ],
    traits: {
      "@control/for/list": {
        onValidate: async function(value, schema, component = {}, assertion, indexes) {
          trace("NwtControlForList.statics.traits['@control/for/list'].onValidate");
          assertion(typeof value === "object", "Parameter «value» must be object on «NwtControlForList.statics.traits['@control/for/list'].onValidate»");
          assertion(Array.isArray(value), "Parameter «value» must be array on «NwtControlForList.statics.traits['@control/for/list'].onValidate»");
          assertion(typeof schema === "object", "Parameter «schema» must be object on «NwtControlForList.statics.traits['@control/for/list'].onValidate»");
          assertion(typeof schema.type === "string", "Parameter «schema.type» must be string on «NwtControlForList.statics.traits['@control/for/list'].onValidate»");
          assertion(typeof schema.controls === "object", "Parameter «schema.controls» must be object on «NwtControlForList.statics.traits['@control/for/list'].onValidate»");
          for(let index=0; index<value.length; index++) {
            const subvalue = value[index];
            const subschema = schema.controls;
            await this.api.validate(subvalue, subschema, component, indexes.concat([index]));
          }
        }
      }
    },
  },
  template: $template,
  props: {},
  mixins: [],
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
});
return await NwtFeatureMixer.component({
  name: "NwtControlForStructure",
  statics: {
    id: "@control/for/structure",
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
      "@control/for/structure": {
        onValidate: async function(value, schema, component = {}, assertion, indexes) {
          trace("NwtControlForStructure.statics.traits['@control/for/structure'].onValidate");
          assertion(typeof value === "object", `Parameter «value» must be object @index «${indexes.join(".")}» on «NwtControlForStructure.statics.traits['@control/for/structure'].onValidate»`);
          assertion(typeof schema === "object", `Parameter «schema» must be object @index «${indexes.join(".")}» on «NwtControlForStructure.statics.traits['@control/for/structure'].onValidate»`);
          assertion(typeof schema.type === "string", `Parameter «schema.type» must be string @index «${indexes.join(".")}» on «NwtControlForStructure.statics.traits['@control/for/structure'].onValidate»`);
          assertion(typeof schema.controls === "object", `Parameter «schema.controls» must be object @index «${indexes.join(".")}» on «NwtControlForStructure.statics.traits['@control/for/structure'].onValidate»`);
          for(let prop in schema.controls) {
            const subvalue = value[prop];
            const subschema = schema.controls[prop];
            await this.api.validate(subvalue, subschema, component, indexes.concat([prop]));
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
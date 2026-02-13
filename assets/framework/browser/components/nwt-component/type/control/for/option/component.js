return await NwtFeatureMixer.component({
  name: "NwtControlForOption",
  statics: {
    id: "@control/for/option",
    inherits: [
      "@feature/for/control/trait/statics",
      "@feature/for/control/trait/settings",
      "@feature/for/control/trait/getValue",
      "@feature/for/control/trait/getRootForm",
      "@feature/for/control/trait/isExpanded",
      "@feature/for/control/trait/hasDescription",
      "@feature/for/control/trait/hasPlaceholder",
      "@feature/for/control/trait/hasStatement",
      "@feature/for/control/trait/validate",
    ],
    traits: {
      "@control/for/option": {
        onValidate: async function(value, schema, component = {}, assertion, indexes) {
          trace("NwtControlForOption.statics.traits['@control/for/option'].onValidate");
          assertion(typeof value === "object", "Parameter «value» must be object on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
          assertion(typeof schema === "object", "Parameter «schema» must be object on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
          assertion(typeof schema.type === "string", "Parameter «schema.type» must be string on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
          assertion(typeof schema.controls === "object", "Parameter «schema.controls» must be object on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
          assertion(Array.isArray(schema.controls), "Parameter «schema.controls» must be array on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
          const mce = NwtConstrainer.MultipleConstraintErrors.create();
          let finalControl = false;
          First_validation_wins:
          for(let index=0; index<schema.controls.length; index++) {
            const subschema = schema.controls[index];
            const subvalue = value;
            try {
              await this.api.validate(subvalue, subschema, component, indexes.concat([]));
              finalControl = subschema;
              break First_validation_wins;
            } catch (error) {
              mce.add(error);
            }
          }
          if(!finalControl) {
            if(!mce.errors.length) {
              assertion(false, "Parameter «value» does not match any option on «NwtControlForOption.statics.traits['@control/for/option'].onValidate»");
            }
            throw mce;
          }
          return finalControl;
        }
      }
    },
  },
  template: $template,
  props: {},
  mixins: [],
  data() {
    return {
      isLoadingControl: false,
      hasSelectedOption: 0,
      hasStatement: this.settings.hasStatement || this.settings.parentKey || "",
    };
  },
  methods: {
    reloadControl() {
      this.isLoadingControl = true;
      this.$nextTick(() => {
        this.isLoadingControl = false;
      });
    }
  },
  watch: {
    hasSelectedOption() {
      this.reloadControl();
    }
  },
  created() {},
  mounted() {},
});
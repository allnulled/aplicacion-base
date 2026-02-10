return await NwtFeatureMixer.component({
  name: "NwtControlForPoint",
  statics: {
    id: "@control/for/class/point",
    inherits: [
      "@control/for/structure",
    ],
    traits: {
      "@control/for/class/point": {
        controls: {
          type: "@control/for/structure",
          controls: {
            x: {
              type: "@control/for/number"
            },
            y: {
              type: "@control/for/number"
            }
          }
        },
        onValidate: async function (value, schema, component = {}, assertion) {
          trace("NwtControlForPoint.statics.traits['@control/for/class/point'].onValidate");
          console.log("OKKKK:", this);
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
  created() { },
  mounted() { },
});
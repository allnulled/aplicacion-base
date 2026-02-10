return await NwtFeatureMixer.component({
  name: "NwtControlForPoint3d",
  statics: {
    id: "@control/for/class/point3d",
    inherits: [
      "@control/for/class/point",
    ],
    traits: {
      "@control/for/class/point3d": {
        controls: function (ancestor) {
          trace("NwtControlForPoint3d.statics.traits['@control/for/class/point3d'].controls");
          return {
            type: "@control/for/structure",
            controls: {
              // @INHERITANCE ALREADY ALLOWED LIKE THIS:
              ...this.traits["@control/for/class/point"].controls.controls,
              // Lo que equivaldría a:
              /*
              x: {
                type: "@control/for/number"
              },
              y: {
                type: "@control/for/number"
              },
              //*/
              z: {
                type: "@control/for/number"
              }
            }
          };
        },
        onValidate: async function (value, schema, component = {}, assertion) {
          trace("NwtControlForPoint3d.statics.traits['@control/for/class/point3d'].onValidate");
          // @TO-SEE: extra checks, if any
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
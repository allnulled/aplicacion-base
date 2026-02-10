Vue.component("NwtLazyResource", {
  name: "NwtLazyResource",
  template: $template,
  props: {
    controls: {
      type: Object,
      required: true,
    },
  },
  mixins: [],
  data() {
    return {
      loaded: false,
      isLoaded: false,
    };
  },
  methods: {},
  created() {
    trace("NwtLazyResource.created");
    assertion(typeof this.controls === "object", "Property «controls» must be object on «NwtLazyResource.created»");
    assertion(typeof this.controls.type === "string", "Property «controls.type» must be string on «NwtLazyResource.created»");
  },
  async mounted() {
    trace("NwtLazyResource.mounted");
    this.loaded = await NwtResource.load(this.controls.type);
    this.isLoaded = true;
  },
});
Vue.component("NwtLazyResource", {
  name: "NwtLazyResource",
  template: $template,
  props: {
    type: {
      type: String,
      required: true,
    },
    settings: {
      type: Object,
      default: () => ({})
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
  created() {},
  async mounted() {
    trace("NwtLazyResource.mounted");
    this.loaded = await NwtResource.load(this.type);
    this.isLoaded = true;
  },
});
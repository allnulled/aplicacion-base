Vue.component("NwtControlLoader", {
  name: "NwtControlLoader",
  render(h) {
    if (!this.isLoaded) {
      return h("div", "Loading modules...")
    }
    return h("div", "Loaded modules!");
  },
  props: {
    for: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isLoaded: false,
      loaded: [],
    };
  },
  methods: {
    
  },
  async created() {
    trace("NwtControlLoader.created");
    this.loaded = await NwtFormulator.resource.list.load(this.for);
    this.isLoaded = true;
  },
});
return {
  statics: {
    id: "feature/for/control/trait/isLongText",
    inherits: [],
    settings: {
      $once: {
        isLongText: [Boolean, false],
      }
    },
  },
  data() {
    trace("trait/isLongText.data");
    return {
      isLongText: this.settings.isLongText,
    };
  },
  methods: {
    toggleTextLength() {
      trace("trait/isLongText.methods.toggleTextLength");
      this.isLongText = !this.isLongText;
    },
    activateLongText() {
      trace("trait/isLongText.methods.activateLongText");
      this.isLongText = true;
    },
    deactivateLongText() {
      trace("trait/isLongText.methods.deactivateLongText");
      this.isLongText = false;
    }
    /*
    toggleTextLength() {
      trace("trait/isLongText.methods.toggleTextLength");
      this.isShown = false;
      this.$nextTick(() => {
        this.isLongText = !this.isLongText;
        this.isShown = true;
      });
    },
    activateLongText() {
      trace("trait/isLongText.methods.activateLongText");
      this.isShown = false;
      this.$nextTick(() => {
        this.isLongText = true;
        this.isShown = true;
      });
    },
    deactivateLongText() {
      trace("trait/isLongText.methods.deactivateLongText");
      this.isShown = false;
      this.$nextTick(() => {
        this.isLongText = false;
        this.isShown = true;
      });
    }
    //*/
  },
  mounted() {
    trace("trait/isLongText.mounted");
    this.isLongText = this.settings.isLongText;
  }
};
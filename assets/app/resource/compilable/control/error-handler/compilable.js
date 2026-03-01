module.exports = {
  id: "control/error-handler",
  compile: true,
  compileView: true,
  apis: [],
  inherits: [],
  view: {
    name: "NwtControlErrorHandler",
    template: $template,
    props: {
      control: {
        type: LowCode.type.Vue,
        required: true,
      }
    },
    data: function() {
      trace("NwtControlErrorHandler.data");
      return {
        isLoading: false,
      };
    },
    methods: {
      reload: function() {
        trace("NwtControlErrorHandler.methods.reload");
        this.isLoading = true;
        this.$nextTick(() => this.isLoading = false);
      }
    },
  },
};
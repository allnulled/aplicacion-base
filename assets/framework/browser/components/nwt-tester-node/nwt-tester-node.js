/**
 * 
 * # NwtTesterNode
 * 
 * Componente vue2 interno. No debe usarse, lo usa `NwtTesterViewer` por debajo.
 * 
 */
Vue.component("NwtTesterNode", {
  template: $template,
  props: {
    node: {
      type: Object,
      required: true,
    },
    viewer: {
      type: Object,
      required: true,
    },
    hasParent: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    trace("NwtTesterNode.data");
    return {};
  },
  mounted() {
    this.viewer.$refs.viewerBox.scrollTop = this.viewer.$refs.viewerBox.scrollHeight - this.viewer.$refs.viewerBox.clientHeight;
  }
});

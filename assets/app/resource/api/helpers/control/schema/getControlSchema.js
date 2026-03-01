NwtResourceApi.set(["control","schema","getControlSchema"], function() {
  return Object.assign({}, { type: this.id }, this.control?.schema ? { schema: this.control.schema } : {});
});
NwtResource.define({
  id: "control/error-handler",
  apis: [],
  inherits: [],
  traits: {},
  compileView: true,
  view: {
    name: "NwtControlErrorHandler",
    props: {
      "control": {
        "type": Vue,
        "required": true
      }
    },
    template: `
      <div class="nwt_control_error_handler">
          <div class="error_handler_box position_relative" v-if="(!isLoading) && control.validationError">
              <!--div class="flex_row">
                  <div class="flex_100"></div>
                  <div class="flex_1">
                      <button class="mini fluid float_right" v-on:click="control.clearValidationError">❎</button>
                  </div>
              </div-->
              <button class="mini fluid position_absolute_top_right" style="top:4px;right:4px;left:auto;bottom:auto;" v-on:click="control.clearValidationError">❎</button>
              <pre class="width_100">{{ control.validationError.name }}: {{ control.validationError.message }} [{{ control.validationError.stack }}] [{{ control.validationError.expandedStack }}]</pre>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      // @COMPILED-BY: control/error-handler
      Object.assign(finalData, (function() {
        trace("NwtControlErrorHandler.data");
        return {
          isLoading: false,
        };
      }).call(this));
      return finalData;
    },
    methods: {
      "reload": function() {
        trace("NwtControlErrorHandler.methods.reload");
        this.isLoading = true;
        this.$nextTick(() => this.isLoading = false);
      }
    },
    computed: {},
    watch: {},
  }
});
NwtResource.define({
  id: "control/partial/for/list-panel",
  apis: ["control", "view", "validation"],
  inherits: [],
  traits: {},
  compileView: true,
  view: {
    name: "NwtControlPartialForListPanel",
    props: {
      "control": {
        "type": Vue,
        "required": true
      },
      "valueFactory": {
        "type": Function,
        "default": () => ({})
      }
    },
    template: `
      <div class="nwt_control_partial_for_list_panel flex_row height_100">
          <div class="flex_100">
              <button class="mini width_100 height_100" v-on:click="() => control.showControl() || control.createItem()">➕</button>
          </div>
          <div class="flex_1 pad_left_1">
              <button class="mini width_100 height_100":class="{active:control.validationErrors.length}"  v-on:click="control.validateValue">💡</button>
          </div>
      </div>`,
    data: function() {
      const finalData = {};
      return finalData;
    },
    methods: {},
    computed: {},
    watch: {},
  }
});
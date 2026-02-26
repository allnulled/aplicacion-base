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
              <button class="mini fluid" v-on:click="() => control.addItem()">➕</button>
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
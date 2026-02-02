/*
const result = await NwtFeatureMixer.component({
  name: "SomeNewComponent",
  statics: {
    id: "in/memory/SomeNewComponent",
    inherits: [
      "control/for/text",
    ]
  },
});

console.log(result);
console.log(Vue.options.components.SomeNewComponent.options);

//*/

await NwtDialogs.open({
  title: "Testeando",
  template: `
    <div>
      <nwt-lazy-resource type="@control/for/text" :settings="{}" />
      <nwt-lazy-resource type="@control/for/advanced-text" :settings="{}" />
      <nwt-lazy-resource type="@control/for/list" :settings="{}" />
      <nwt-lazy-resource type="@control/for/structure" :settings="{}" />
      <nwt-lazy-resource type="@control/for/option" :settings="{}" />
    </div>
  `
});
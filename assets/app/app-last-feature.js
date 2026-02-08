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
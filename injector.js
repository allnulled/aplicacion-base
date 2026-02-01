// const textFeature = await NwtFormulatorFeatureManager.global.for("control/text").load();
const textFeature = await NwtFormulatorFeatureMixer.mix([
  await NwtFormulatorLazyFeature.create("control/text").load(),
]);

window.tmp1 = textFeature;

textFeature.name = "feature-one";
textFeature.template = `
  <div>Feature one here!</div>
`;

Vue.component("feature-one", textFeature);

await NwtDialogs.open({
  template: `
    <div class="">
      <feature-one :settings="{}" />
      <hr/>
      <button v-on:click="cancel">Cancelar</button>
    </div>
  `,
})
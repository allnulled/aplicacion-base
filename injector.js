await NwtDialogs.open({
  template: `
    <div class="">
      <nwt-control-validator :control="this" />
      <hr/>
      <button v-on:click="cancel">Cancelar</button>
    </div>
  `,
})
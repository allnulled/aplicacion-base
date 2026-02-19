Resource_api_control: {
  const Nexer = NwtResourceApi.Nexer;
  NwtResourceApi.register({
    namespace: "control",
    getId() {
      return this.id;
    },
    /*
    // Ejemplo de uso de Nexer:
    from: Nexer.create({
      normal: Nexer.create({
        basis() {
          console.log("From normal basis", this);
        }
      })
    })
    //*/
  });
}
module.exports = {
  uid: "Convertir de PNG a PNG recortado por imagemagick",
  vendor: "nwt",
  author: "https://github.com/allnulled",
  description: `Convierte un fichero PNG a PNG recortado por imagemagick.`,
  dependencies: ["imagemagick"],
  components: {
    form: "ProcedureConvertirDePngAPngRecortadoPorImagemagickForm",
    viewer: "ProcedureConvertirDePngAPngRecortadoPorImagemagickViewer",
  }
};
module.exports = {
  uid: "Convertir de PDF a PNG por imagemagick",
  vendor: "nwt",
  author: "https://github.com/allnulled",
  description: `Convierte un fichero PDF a PNG por imagemagick.`,
  dependencies: ["imagemagick"],
  components: {
    form: "ProcedureConvertirDePdfAPngPorImagemagickForm",
    viewer: "ProcedureConvertirDePdfAPngPorImagemagickViewer",
  }
};
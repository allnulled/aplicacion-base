return [{
  type: "file-chooser/new-file",
  props: {
    statement: "Fichero de salida:",
    extraInfo: "El fichero donde se imprime la salida de la concatenación",
    placeholder: "Seleccionar directorio aquí",
  }
}, {
  type: "group/list",
  props: {
    statement: "Lista de ficheros:",
    extraInfo: "La lista de los ficheros de texto a concatenar",
    controls: [{ type: "file-chooser/file" }]
  }
}];
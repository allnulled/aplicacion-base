return [{
  control: "text/multiline",
  label: "Nombre de algo:",
  description: "El nombre de una cosa llamada algo",
  placeholder: "Nombre aquí",
}, {
  control: "text/multiline",
  label: "Descripción de algo:",
  description: "La descripción de esa cosa",
  placeholder: "Describir aquí",
}, {
  control: "file-chooser/file",
  label: "Ficheros de entrada:",
  description: "Los ficheros de entrada",
  placeholder: "Seleccionar ficheros aquí",
  // control specific:
  multiple: true,
}, {
  control: "file-chooser/directory",
  label: "Directorio de salida:",
  description: "El directorio donde se guardarán los ficheros de salida",
  placeholder: "Seleccionar directorio aquí",
  // control specific:
  multiple: false,
}];
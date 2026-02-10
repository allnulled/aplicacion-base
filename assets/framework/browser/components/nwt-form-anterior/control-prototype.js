/**
 * 
 * # NwtFormControlPrototype
 * 
 * Componente base (sin plantilla) para controles de formulario compatibles con `NwtFormBuilder`.
 * 
 * De este componente, heredan todos los controles de formulario.
 * 
 * Por lo tanto, esta lógica es común a todos los controles.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormControlPrototype
 * ```
 * 
 * ## Ventajas
 * 
 * Este componente no está pensado para usarse por sí mismo, sino para extenderse vía la API de vue2.
 * 
 * Pero su API es común a todos los controles, así que es especialmente interesante documentarla.
 * 
 * ## Propiedades HTML de un control
 * 
 * Las propiedades comunes a todos los controles de formulario son:
 * 
 * ```html
 * <nwt-form-control-prototype
 *   :initial-value="anything" # valor inicial del control, en su tipo hidratado, no en String solamente
 *   statement="Enunciado de este control"
 *   extra-info="Información extra del enunciado de este control"
 *   is-required="false"     # si es requerido en el formulario, u opcional (false, por defecto)
 *   :on-change="() => {}"   # evento lanzado al cambiar el valor del control
 *   :on-format="() => {}"   # evento para hidratar el valor, usado cuando llamas a thi.getValue()
 *   :on-validate="() => {}" # creo que este no se usa, la validación corre a cuenta de la API de v-forms en su lugar
 * />
 * ```
 * 
 * ## Propiedades JS de un control
 * 
 * Otras propiedades internas, desde el JS y no del HTML, son estas:
 * 
 * ```js
 * this.isControl === "prototype"; // Esta propiedad debe ser sobreescrita por cada control con el nombre del {tipo/subtipo} propios
 * this.isShowingExtraInfo; // variable de estado
 * this.value === ?; // El valor, sin formatear. Suele ser un string que se puede visualizar con text-boxes.
 * this.validationErrors === []; // errores de validación acumulados
 * ```
 * 
 * ## Métodos internos de un control
 * 
 * ```js
 * this.getValue(); // devuelve el valor del control, pero formateado. Este valor ya no siempre será un String, puede ser número, booleano, objeto, lo que sea.
 * this.toggleExtraInfo(); // muestra u oculta la información extra del control
 * ```
 * 
 * Esta sería la API inicial de cualquier control.
 * 
 * Pero hay que saber algunas cosas más para crear tu propio control.
 * 
 * Dado que este componente no tiene plantilla, y aunque la tuviera no serviría de nada porque cada control la sobreescribiría a su manera, conviene consultar el primer control que se ha creado como referencia para saber cómo crear la plantilla de un control.
 * 
 * El primer control que se ha crea en la API es:
 * 
 *  - `NwtFormControlForTextOneline`: que se corresponde con un input[type=text].
 * 
 * Consultar ese control si vas a crear uno propio, porque para hacerlo compatible del todo, por ejemplo, hay que:
 * 
 *  - Ponerle un class="nwt_form_control"
 *  - Ponerle un `<nwt-form-control-statement :control="this" />` arriba
 *  - Ponerle un `<nwt-form-control-handler :control="this" />` abajo
 *  - Poner el control en un flex-row y a la izquierda
 *  - Poner en la derecha del flex-row un `<nwt-form-control-buttons :control="this" />`
 *  - Poner un `v-model="value"` al input, de haberlo
 *  - Poner un `v-on:input="e => onChange(e, this)"` o llamar al `onChange` desde `watch.value`
 * 
 * Y esta API todavía no está completa en el momento de esta documentación, así que puede que haya alguna cosa más.
 * 
 * ## Convivencia con la API de v-forms
 * 
 * Es importante entender por qué la API de `v-forms` no va incrustada en esta hard-way.
 * 
 * Es decir: son controles, ¿por qué no tienen ya el `v-forms.control` incrustado a nivel de componente?
 * 
 * La respuesta es: porque no siempre están participando activamente como controles en un formulario.
 * 
 * Separar estas 2 APIs permite que puedas reutilizar todos los controles en cualquier contexto, sin necesariamente vincularlos a un formulario.
 * 
 * Pero, por debajo, hay compatibilidades ya pensadas para integrarse con el formulario.
 * 
 * Además, la vinculación con un formulario permite algunos parámetros extra que no van necesariamente con el componente de control, sino con el formulario concreto.
 * 
 * Por ejemplo, si quieres añadir una validación de un texto en el contexto de un formulario concreto:
 * 
 * - Pides un tipo `text/oneline`: eso es lógica del control
 * - Pero además quieres que ese `text/oneline` cumpla con un formato concreto a la hora de validarlo: eso es lógica del formulario
 * 
 * Por eso, hay que separar estas 2 APIs. Porque un control no siempre es control activo en un formulario.
 * 
 */
Vue.component("NwtFormControlPrototype", {
  name: "NwtFormControlPrototype",
  props: {
    initialValue: {
      type: [Boolean,Number,String,Array,Object,Function,undefined],
      default: () => "",
    },
    statement: {
      type: String,
      default: () => "",
    },
    extraInfo: {
      type: String,
      default: () => "",
    },
    isRequired: {
      type: Boolean,
      default: () => false,
    },
    onChange: {
      type: Function,
      default: function(event) {
        trace("NwtFormControlPrototype.props.onChange");
        return this.$emit("input", event);
      },
    },
    onFormat: {
      type: Function,
      default: value => value,
    },
    onValidate: {
      type: Function,
      default: () => NwtUtils.noop()
    },
  },
  data() {
    return {
      isControl: "prototype",
      isShowingExtraInfo: false,
      value: this.initialValue,
      validationErrors: [],
    };
  },
  methods: {
    toggleExtraInfo() {
      trace("NwtFormControlPrototype.methods.toggleExtraInfo");
      this.isShowingExtraInfo = !this.isShowingExtraInfo;
    },
    getValue() {
      trace("NwtFormControlPrototype.methods.getValue");
      const formattedValue = this.onFormat(this.value);
      return formattedValue;
    },
  }
});
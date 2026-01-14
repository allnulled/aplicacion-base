# Nwt Vue2 API

API de utilidades relacionadas con Vue2.

## Exposición

La API se expone a través de:

```js
NwtVue2
NwtFramework.Vue2
Vue.prototype.$nwt.Vue2
```

## Ventajas

La API permite cosas como:

```js
// Métodos para notaciones:
NwtVue2.fromTagToIdNotation("tag-nomenclature"); // returns: "TagNomenclature"
NwtVue2.fromIdToTagNotation("TagNomenclature"); // returns: "tag-nomenclature"
// Definiciones paralelas de componentes y directivas (innecesario si usas Vue.options.components y Vue.options.directives):
NwtVue2.defined.components; // {}
NwtVue2.defined.directives; // {}
NwtVue2.define.component("component-name", {...});
NwtVue2.define.directive("directive-name", {...});
// Métodos para persistir propiedades en HTMLElement, HTMLElementDataset y Vue2Component:
NwtVue2.cross.expose.by.element(...); // equals: NwtVue2.exposeByElement(...)
NwtVue2.cross.expose.by.component(...); // equals: NwtVue2.exposeByComponent(...)
NwtVue2.exposeByElement(htmlElement, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
NwtVue2.exposeByComponent(vue2Component, {props:"values"}, "$propertyName", [toElement=true, toDataset=true, toComponent=true]);
```

Es una API de poco uso. Los métodos estrictamente necesarios son los de notaciones. Pero los otros pueden ser útiles también en algunos casos.

Los métodos de definiciones paralelas habría que eliminarlos, sin romper nada que ya esté funcionando.


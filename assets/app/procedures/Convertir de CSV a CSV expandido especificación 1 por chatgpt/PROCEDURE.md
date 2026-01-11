# Convertir de CSV a CSV expandido especificación 1 por chatgpt

Procedimiento para convertir de CSV a CSV expandido (especificación 1) por ChatGPT.

## Identificador

> `Convertir de CSV a CSV expandido especificación 1 por chatgpt`

## Especificación

Este procedimiento no es de uso universal: tiene una especificación.

La especificación consiste en que:

- El CSV de entrada espera tener las columnas:
   - `página`
   - `línea`
   - `contexto`
   - `actor`
   - `texto`
- La expansión del CSV también está especificada en el (texto que se usa como) prompt que se encuentra en:
   - `assets/app/strings/Prompt para 2.md`

Esto hace que **no cualquier CSV** sea susceptible de usarse como fichero de entrada.

Esto hace que **no cualquier expansión de CSV** sea expectable como fichero de salida.

Por tanto, este **no es un procedimiento genérico** para expandir columnas de cualquier CSV mediante ChatGPT.

*No hay un procedimiento genérico para esto actualmente.*

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Convertir de CSV a CSV expandido especificación 1 por chatgpt").startViewer({
  
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros CSV a convertir
- Tipo: `Array<String>`
- Requerido: sí
- Requisitos:
   - Debe tener las columnas especificadas:
      - página
      - línea
      - contexto
      - actor
      - texto

### Parámetro `output`

- Función: directorio de salida
- Tipo: `String`
- Requerido: sí


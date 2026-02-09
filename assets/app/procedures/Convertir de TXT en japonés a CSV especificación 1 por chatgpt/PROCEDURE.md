# Convertir de TXT en japonés a CSV especificación 1 por chatgpt

Procedimiento para convertir TXT en japonés a un CSV (especificación 1) por ChatGPT.

## Identificador

> `Convertir de TXT en japonés a CSV especificación 1 por chatgpt`

## Especificación

Este procedimiento no es de uso universal: tiene una especificación.

La especificación consiste en que:

- El CSV resultante espera tener las columnas:
   - `página`
   - `línea`
   - `contexto`
   - `actor`
   - `texto`

Esto hace que **no cualquier texto en japonés** sea susceptible de usarse como fichero de entrada.

## Uso vía API

Un ejemplo de uso es este:

```js

```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros TXT a convertir
- Tipo: `Array<String>`
- Requerido: sí

### Parámetro `output`

- Función: fichero de salida
- Tipo: `String`
- Requerido: sí


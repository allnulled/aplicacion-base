# Flujo desde PDF en japonés hasta CSV con traducción y análisis gramatical

Este procedimiento toma un PDF en japonés (específico) y concatena varios procedimientos hasta obtener un CSV con la traducción y un análisis gramatical de cada línea.

## Identificador

> `Flujo desde PDF en japonés hasta CSV con traducción y análisis gramatical`

## Subprocedimientos por orden

1. Convertir de PDF a PNG por imagemagick
2. Convertir de PNG a PNG recortado por imagemagick
3. Convertir de PNG a TXT en japonés por yomitoku
4. Concatenar ficheros por node.js
5. Convertir de TXT en japonés a CSV de especificación 1 por chatgpt
6. Convertir de CSV a CSV paginado por node.js
7. Convertir de CSV a CSV expandido de especificación 1 por chatgpt
8. Concatenar ficheros CSV por node.js
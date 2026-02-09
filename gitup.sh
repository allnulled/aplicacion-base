#!/bin/bash

npm run build:docs

git add . 
git status

echo "Mensaje del commit:"
read -r mensaje

if [ -z "$mensaje" ]; then
  echo "El mensaje está vacío. Abortando."
  exit 1
fi

git commit -m "$mensaje" && git push

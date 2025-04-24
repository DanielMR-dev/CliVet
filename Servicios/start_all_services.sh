#!/bin/bash

# Activar modo verboso opcional
set -e

# Listado de carpetas
folders=("admin_api" "citas_api" "mascotas_api" "usuario_api")

# Directorio raíz
root_dir="$(pwd)"

for folder in "${folders[@]}"; do
    echo "================================================================="
    echo "Starting $folder"
    cd "$root_dir/$folder" || { echo "No se pudo acceder a $folder"; exit 1; }

    echo "Executing: docker-compose build"
    docker compose build

    echo "Executing: docker-compose up -d"
    docker compose up -d

    echo "Finished $folder"
    echo "================================================================="
done

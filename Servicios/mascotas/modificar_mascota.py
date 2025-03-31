from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, update
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE MODIFICAR UNA MASCOTA

FUNCIONALIDADES
    1. Recibir un JSON con la información de una mascota y modificarla en base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.put("/mascotas/{id}")
async def modificar_mascota(id: int, request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        mascotas = Table("mascota", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Remover 'id' si está en los datos (no se debe actualizar)
        data.pop("id", None)

        # Si no hay datos para actualizar, devolver error
        if not data:
            return {"error": "No se enviaron datos para actualizar"}

        # Crear la sentencia insert
        query = update(mascotas).where(mascotas.c.id == id).values(**data)

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Mascota modificada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al modificar la mascota: {str(e)}"} # Cambiar 
    
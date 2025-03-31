from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, update
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE MODIFICAR COLABORADORES

FUNCIONALIDADES
    1. Recibir un JSON con la información modificada de un colaborador y actualizarlo en base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.put("/colaboradores/{id}")
async def crear_colaborador(id:int, request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        colaboradores = Table("colaborador", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Remover el id si esta en los datos, ya que no se debe actualizar
        data.pop("id", None)

        # Si no hay datos para actualizar, devolver error
        if not data:
            return {"error": "No se enviaron datos para actualizar"}

        # Crear la sentencia insert
        query = update(colaboradores).where(colaboradores.c.id == id).values(**data)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Colaborador no encontrado"}

        return {"mensaje": "Colaborador actualizado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al actualizar al colaborador: {str(e)}"} # Cambiar 
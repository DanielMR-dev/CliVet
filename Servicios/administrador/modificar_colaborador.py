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

# Si no se van a manejar modelos, lo mejor es que la request tenga el JSON con la informacion de todas las columnas
@app.put("/colaboradores/{id}")
async def crear_colaborador(id:int, request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        colaboradores = Table("colaborador", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = update(
            colaboradores
            ).where(
                colaboradores.c.id == id
                ).values(
                    id=data.get("id"),
                    nombre_completo=data.get("nombre_completo"),
                    id_tipo=data.get("id_tipo"),
                    email=data.get("email"),
                    telefono=data.get("telefono"),
                    direccion=data.get("direccion")
                    )

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Colaborador no encontrado"}

        return {"mensaje": "Colaborador actualizado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al actualizar al colaborador: {str(e)}"} # Cambiar 
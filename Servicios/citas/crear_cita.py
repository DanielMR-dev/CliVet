from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, insert, select
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE CREAR COLABORADORES

FUNCIONALIDADES
    1. Recibir un JSON con la información de un nuevo colaborador y añadirlo a base de datos
    2. Recibir un JSON con las credenciales de un médico para añadirlo a base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.post("/crear_cita")
async def crear_colaborador(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        cita = Table("cita", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(cita).values(
            id=data.get("id"),
            id_tipo=data.get("id_tipo"),
            id_mascota=data.get("id_mascota"),
            id_colaborador=data.get("id_colaborador"),
            fecha_hora=data.get("fecha_hora"),
            modificable_por_usuario=data.get("modificable_por_usuario")
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "cita creada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar la cita: {str(e)}"} # Cambiar 

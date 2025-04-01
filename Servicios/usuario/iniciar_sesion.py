from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, insert, select
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE REGISTRAR NUEVOS USUARIOS

FUNCIONALIDADES
    1. Recibir un JSON con la información de un nuevo cliente y añadirlo a base de datos
    2. Recibir un ID de usuario y retornar si este usuario existe o no en base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.get("/iniciar_sesion")
async def buscar_usuario(request: Request):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)    

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la consulta
        query = select(clientes).where(
            (clientes.c.id == data.get("id")) &
            (clientes.c.clave == data.get("clave").encode())
            )

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"message": "Credenciales invalidas"}

        return {"message": "Credenciales validas"}

    except Exception as e:
        return {"error": f"Error al buscar cliente: {str(e)}"}
from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, update
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE EDITAR USUARIOS

FUNCIONALIDADES
    1. Recibir un JSON con la información de un cliente existente y actualizar base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.put("/usuarios/{id}")
async def registrar_usuario(id: int, request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        clientes = Table("cliente", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = update(
            clientes
            ).where(
                clientes.c.id == id
                ).values(
                    id=data.get("id"),
                    nombre_completo=data.get("nombre_completo"),
                    fecha_nacimiento=datetime.strptime(data.get("fecha_nacimiento"), "%d-%m-%Y"),
                    clave=data.get("clave").encode(),
                    email=data.get("email"),
                    telefono=data.get("telefono"),
                    direccion=data.get("direccion")
                    )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Cliente editado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al editar al cliente: {str(e)}"} # Cambiar 
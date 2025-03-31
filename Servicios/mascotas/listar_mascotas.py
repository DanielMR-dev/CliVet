from fastapi import FastAPI, Query
from sqlalchemy import create_engine, MetaData, Table, select
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE LISTAR MASCOTAS

FUNCIONALIDADES
    1. Retornar un JSON con todas las mascotas
    2. Retornar un JSON con las mascotas de un solo cliente
    3. Retornar un JSON con la informacion de una mascota en especifico

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()
    
@app.get("/mascotas")
async def listar_todas_las_mascotas():
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@app.get("/mascotas/por-usuario")
async def get_proceso_id(id_usuario: int = Query(...)):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id_propietario == id_usuario)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@app.get("/mascotas/por-id")
async def get_proceso_id(id_mascota: int = Query(...)):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id == id_mascota)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
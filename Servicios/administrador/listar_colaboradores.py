from fastapi import FastAPI, Query
from sqlalchemy import create_engine, MetaData, Table, select
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE LISTAR COLABORADORES

FUNCIONALIDADES
    1. Retornar un JSON con todos los colaboradores
    2. Retornar un JSON con la informacion de un colaborador en especifico

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()
    
@app.get("/colaboradores")
async def get_procesos():
    colaboradores = Table("colaborador", metadata, autoload_with=engine)
    query = select(colaboradores)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/colaboradores/por-id?id_colaborador=2
'''
@app.get("/colaboradores/por-id")
async def get_proceso_id(id_colaborador: int = Query(...)):
    colaboradores = Table("colaborador", metadata, autoload_with=engine)
    query = select(colaboradores).where(colaboradores.c.id == id_colaborador)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
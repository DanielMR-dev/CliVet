from fastapi import FastAPI, Query
from sqlalchemy import create_engine, MetaData, Table, select
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.environ.get("DATABASE_URL")


'''
CODIGO ENFOCADO AL SERVICIO DE LISTAR PROCESOS

FUNCIONALIDADES
    1. Retornar un JSON con todos los procesos
    2. Retornar un JSON con la informacion de un proceso en especifico

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(str(DATABASE_URL))

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()
    
@app.get("/procesos")
async def get_procesos():
    procesos = Table("proceso", metadata, autoload_with=engine)
    query = select(procesos)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/procesos/por-id?id_proceso=1
'''
@app.get("/procesos/por-id")
async def get_proceso_id(id_proceso: int = Query(...)):
    procesos = Table("proceso", metadata, autoload_with=engine)
    query = select(procesos).where(procesos.c.id == id_proceso)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
from fastapi import FastAPI
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
        print('hola')
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@app.get("/procesos/{id}")
async def get_proceso_id(id: int):
    procesos = Table("proceso", metadata, autoload_with=engine)
    query = select(procesos).where(procesos.c.id == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
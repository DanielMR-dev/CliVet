from fastapi import APIRouter, Query
from sqlalchemy import Table, select
from administrador.database import engine, metadata, SessionLocal

router = APIRouter()

procesos = Table("proceso", metadata, autoload_with=engine)

@router.get("/procesos")
async def listar_procesos():
    query = select(procesos)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()
    return [dict(row._mapping) for row in rows]



'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/procesos/por-id?id_proceso=1
'''
@router.get("/procesos/por-id")
async def get_proceso_id(id_proceso: int = Query(...)):
    procesos = Table("proceso", metadata, autoload_with=engine)
    query = select(procesos).where(procesos.c.id == id_proceso)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]

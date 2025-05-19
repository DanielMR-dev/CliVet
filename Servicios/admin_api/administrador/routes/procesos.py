from fastapi import APIRouter
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

@router.get("/procesos/{id}")
async def obtener_proceso(id: int):
    query = select(procesos).where(procesos.c.id == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

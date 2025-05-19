from fastapi import APIRouter
from sqlalchemy import Table, select
from mascotas.database import engine, metadata

router = APIRouter()
    
@router.get("/mascotas")
async def get_procesos():
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@router.get("/mascotas/usuario/{id}")
async def get_proceso_id(id: int):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id_propietario == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@router.get("/mascotas/{id}")
async def get_proceso_id(id: int):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
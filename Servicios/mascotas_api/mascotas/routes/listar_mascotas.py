from fastapi import APIRouter, Query
from sqlalchemy import Table, select
from mascotas.database import engine, metadata

router = APIRouter()
    
@router.get("/listar")
async def get_procesos():
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/mascotas/listar/por-usuario?id_usuario=1
'''
@router.get("/listar/por-usuario")
async def get_mascota_id_usuario(id_usuario: int = Query(...)):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id_propietario == id_usuario)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@router.get("/listar/{id}")
async def get_mascota_id(id: int):
    mascotas = Table("mascota", metadata, autoload_with=engine)
    query = select(mascotas).where(mascotas.c.id == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]
    
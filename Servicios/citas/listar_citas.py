from fastapi import FastAPI, Query
from sqlalchemy import create_engine, MetaData, Table, select
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)

app = FastAPI()


@app.get("/citas")
async def listar_todas_las_citas():
    """ Lista todas las citas. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita)
    
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()
    
    return [dict(row._mapping) for row in rows]


@app.get("/citas/por-fecha-tipo")
async def listar_por_fecha_tipo(fecha: str = Query(...), id_tipo: int = Query(...)):
    """ Lista citas filtrando por fecha y tipo. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where((cita.c.fecha_hora == fecha) & (cita.c.id_tipo == id_tipo))

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@app.get("/citas/por-tipo")
async def listar_por_tipo(id_tipo: int = Query(...)):
    """ Lista citas filtrando por tipo. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where(cita.c.id_tipo == id_tipo)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@app.get("/citas/por-colaborador")
async def listar_por_colaborador(id_colaborador: int = Query(...)):
    cita = Table("cita", metadata, autoload_with=engine)

    query = select(cita).where(cita.c.id_colaborador == id_colaborador)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@app.get("/citas/por-cliente")
async def listar_por_cliente(id_cliente: int = Query(...)):
    """ Lista citas filtrando por cliente. """
    cita = Table("cita", metadata, autoload_with=engine)
    mascota = Table("mascota", metadata, autoload_with=engine)

    # Obtener las mascotas del cliente
    subquery = select(mascota.c.id).where(mascota.c.id_propietario == id_cliente)

    # Buscar todas las citas donde aparecen esas mascotas
    query = select(cita).where(cita.c.id_mascota.in_(subquery))

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]


@app.get("/citas/por-mascota")
async def listar_por_mascota(id_mascota: int = Query(...)):
    """ Lista citas filtrando por mascota. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where(cita.c.id_mascota == id_mascota)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]

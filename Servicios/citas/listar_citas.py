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

from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, MetaData, Table, select, and_
from datetime import datetime, time, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

metadata = MetaData()
metadata.reflect(bind=engine)

app = FastAPI()

@app.get("/citas/disponibles/{fecha}/{id_tipo}")
async def obtener_horarios_disponibles(fecha: str, id_tipo: int):
    """ Obtiene los horarios disponibles para una cita en una fecha dada. """
    try:
        fecha_obj = datetime.strptime(fecha, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de fecha inválido. Use YYYY-MM-DD.")
    
    # Definir los horarios permitidos según el día de la semana
    dia_semana = fecha_obj.weekday()
    if dia_semana < 5:  # Lunes a viernes
        inicio, fin = time(7, 0), time(18, 0)
    elif dia_semana == 5:  # Sábado
        inicio, fin = time(7, 0), time(14, 0)
    else:  # Domingo no hay disponibilidad
        return {"disponibles": []}
    
    # Generar todos los horarios posibles en intervalos de 1 hora
    horarios_disponibles = []
    hora_actual = datetime.combine(fecha_obj, inicio)
    fin_horario = datetime.combine(fecha_obj, fin)
    while hora_actual < fin_horario:
        horarios_disponibles.append(hora_actual.time())
        hora_actual += timedelta(hours=1)
    
    # Obtener las citas ya agendadas para ese tipo en la fecha dada
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita.c.fecha_hora).where(
        and_(
            cita.c.id_tipo == id_tipo,
            cita.c.fecha_hora >= datetime.combine(fecha_obj, inicio),
            cita.c.fecha_hora < datetime.combine(fecha_obj, fin)
        )
    )
    
    with engine.connect() as connection:
        result = connection.execute(query)
        citas_ocupadas = {row.fecha_hora.time() for row in result.fetchall()}
    
    # Filtrar horarios disponibles
    horarios_libres = [hora.strftime("%H:%M") for hora in horarios_disponibles if hora not in citas_ocupadas]
    
    return {"fecha": fecha, "horarios_disponibles": horarios_libres}
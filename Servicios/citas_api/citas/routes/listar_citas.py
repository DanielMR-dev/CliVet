from fastapi import APIRouter, Query, HTTPException
from sqlalchemy import Table, select, and_,or_
import os
from datetime import datetime, time, timedelta
from citas.database import engine, metadata

# Diccionario que relaciona a los diferentes tipos de colaboradores con los tipos de citas
colaboradores_citas = {
    1: [1, 2], # Medico - Revision y cirugia
    2: None, # Inventario - None (no atienden citas)
    3: None, # Proveedor - None (no atienden citas)
    4: 3, # Peluqueria - Peluqueria
    5: None, # Guarderia - None (el tipo de cita de este colaborador tiene un manejo distinto)
    6: 4 # Enfermeria - Vacunas
}


router = APIRouter()

@router.get("/listar")
async def listar_todas_las_citas():
    """ Lista todas las citas. """
    citas = Table("cita", metadata, autoload_with=engine)
    query = select(citas)
    
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()
    
    return [dict(row._mapping) for row in rows]



@router.get("/listar/por-fecha-tipo")
async def listar_por_fecha_tipo(fecha: str = Query(...), id_tipo: int = Query(...)):
    """ Lista citas filtrando por fecha y tipo. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where((cita.c.fecha_hora == fecha) & (cita.c.id_tipo == id_tipo))

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@router.get("/listar/por-tipo")
async def listar_por_tipo(id_tipo: int = Query(...)):
    """ Lista citas filtrando por tipo. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where(cita.c.id_tipo == id_tipo)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@router.get("/listar/por-colaborador")
async def listar_por_colaborador(id_colaborador: int = Query(...)):
    cita = Table("cita", metadata, autoload_with=engine)

    query = select(cita).where(cita.c.id_colaborador == id_colaborador)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@router.get("/listar/por-cliente")
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



@router.get("/listar/por-mascota")
async def listar_por_mascota(id_mascota: int = Query(...)):
    """ Lista citas filtrando por mascota. """
    cita = Table("cita", metadata, autoload_with=engine)
    query = select(cita).where(cita.c.id_mascota == id_mascota)

    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



  # Asegúrate de tener esto según tu proyecto

# Diccionario de qué tipo de colaborador puede atender cada tipo de cita
colaboradores_citas = {
    1: [1, 2],  # Médico: Revisión y cirugía
    2: None,    # Inventario: no aplica
    3: None,    # Proveedor: no aplica
    4: [3],     # Peluquería: tipo colaborador 3
    5: None,    # Guardería: se maneja aparte
    6: [4]      # Enfermería: vacunas
}

@router.get("/listar/disponibles/{fecha}/{id_tipo}")
async def obtener_horarios_disponibles(fecha: str, id_tipo: int):
    try:
        fecha_obj = datetime.strptime(fecha, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de fecha inválido. Use YYYY-MM-DD.")
    
    # Validar que el tipo de cita tenga colaboradores asociados
    tipos_colab = colaboradores_citas.get(id_tipo)
    if not tipos_colab:
        return {"mensaje": "Este tipo de cita no requiere colaboradores o se gestiona de otra manera", "disponibles": []}

    # Determinar franja horaria según el día
    dia_semana = fecha_obj.weekday()
    if dia_semana < 5:
        inicio, fin = time(7, 0), time(18, 0)
    elif dia_semana == 5:
        inicio, fin = time(7, 0), time(14, 0)
    else:
        return {"disponibles": []}

    # Crear horarios en intervalos de 1 hora
    horarios_disponibles = []
    hora_actual = datetime.combine(fecha_obj, inicio)
    fin_horario = datetime.combine(fecha_obj, fin)
    while hora_actual < fin_horario:
        horarios_disponibles.append(hora_actual.time())
        hora_actual += timedelta(hours=1)

    # Tablas necesarias
    cita = Table("cita", metadata, autoload_with=engine)
    colaborador = Table("colaborador", metadata, autoload_with=engine)

    with engine.connect() as connection:
        # Obtener colaboradores con tipo permitido
        query_colabs = select(colaborador.c.id, colaborador.c.nombre_completo).where(
            colaborador.c.id_tipo.in_(tipos_colab)
        )
        colaboradores_validos = connection.execute(query_colabs).fetchall()
        if not colaboradores_validos:
            return {"mensaje": "No hay colaboradores disponibles para este tipo de cita", "disponibles": []}

        colaboradores_ids = [colab.id for colab in colaboradores_validos]

        # Obtener citas ya asignadas para esos colaboradores en la fecha
        inicio_dia = datetime.combine(fecha_obj, inicio)
        fin_dia = datetime.combine(fecha_obj, fin)
        query_citas = select(cita.c.id_colaborador, cita.c.fecha_hora).where(
            and_(
                cita.c.id_colaborador.in_(colaboradores_ids),
                cita.c.fecha_hora >= inicio_dia,
                cita.c.fecha_hora < fin_dia
            )
        )
        citas = connection.execute(query_citas).fetchall()

    # Organizar las citas ocupadas por colaborador
    ocupados_por_colab = {}
    for cita_item in citas:
        hora = cita_item.fecha_hora.time()
        colab_id = cita_item.id_colaborador
        if colab_id not in ocupados_por_colab:
            ocupados_por_colab[colab_id] = set()
        ocupados_por_colab[colab_id].add(hora)

    # Armar la respuesta: para cada hora, listar los colaboradores disponibles
    resultado = []
    for hora in horarios_disponibles:
        colaboradores_disponibles = []
        for colab in colaboradores_validos:
            if hora not in ocupados_por_colab.get(colab.id, set()):
                colaboradores_disponibles.append({
                    "id": colab.id,
                    "nombre": colab.nombre_completo
                })
        if colaboradores_disponibles:
            resultado.append({
                "hora": hora.strftime("%H:%M"),
                "colaboradores_disponibles": colaboradores_disponibles
            })

    return {"fecha": fecha, "disponibilidad": resultado}

from fastapi import Request, Query, APIRouter
from sqlalchemy import Table, insert
from citas.database import engine, metadata
from datetime import datetime


'''
CODIGO ENFOCADO AL SERVICIO DE CREAR COLABORADORES

FUNCIONALIDADES
    1. Recibir un JSON con la información de un nuevo colaborador y añadirlo a base de datos
    2. Recibir un JSON con las credenciales de un médico para añadirlo a base de datos

'''

router = APIRouter()

@router.post("/crear_cita")
async def crear_cita(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        cita = Table("cita", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(cita).values(
            id=data.get("id"),
            id_tipo=data.get("id_tipo"),
            id_mascota=data.get("id_mascota"),
            id_colaborador=data.get("id_colaborador"),
            fecha_hora=data.get("fecha_hora"),
            modificable_por_usuario=data.get("modificable_por_usuario")
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "cita creada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar la cita: {str(e)}"} # Cambiar 



@router.post("/crear_estadia_guarderia")
async def crear_estadia_guarderia(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        reservas_guarderia = Table("reserva_guarderia", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Calcular numero de horas
        fecha_ingreso = datetime.strptime(data.get("fecha_ingreso"), "%Y-%m-%d %H")
        fecha_recogida = datetime.strptime(data.get("fecha_recogida"), "%Y-%m-%d %H")

        diferencia = fecha_recogida - fecha_ingreso
        numero_horas = int(diferencia.total_seconds() / 3600)

        # Crear la sentencia insert
        query = insert(reservas_guarderia).values(
            fecha_ingreso=fecha_ingreso,
            fecha_recogida=fecha_recogida,
            numero_horas=numero_horas,
            id_mascota=data.get("id_mascota"),
            observaciones=data.get("observaciones"),
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Reserva en guarderia creada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar la reserva en guarderia: {str(e)}"} # Cambiar 
    


'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/estimar_costo_guarderia?fecha_hora_inicio=2025-04-01%2014&fecha_hora_fin=2025-04-02%2014&peso_mascota=6
'''
@router.get("/estimar_costo_guarderia")
async def crear_estadia_guarderia(fecha_hora_inicio: str = Query(...), fecha_hora_fin: str = Query(...), peso_mascota: int = Query(...)):
    try:

        # Retorna el valor de la estadía basado en el número de horas y en el peso de la mascota
        precio_por_peso = {
            10000: range(0, 6),
            15000: range(6, 11),
            20000: range(11, 16),
            25000: range(16, 21),
            30000: range(21, 31),
            40000: range(31, 100)
        }

        # Se establece un precio base de 50000 en caso de que el peso sea mayor a 100
        precio_hora = 50000

        # Se calcula el precio por hora con base al peso de la mascota
        for precio in precio_por_peso.keys():
            if peso_mascota in precio_por_peso[precio]:
                precio_hora = precio

        
        # Se calcula el numero de horas entre la fecha de inicio y la fecha de finalizacion
        fecha_inicio = datetime.strptime(fecha_hora_inicio, "%Y-%m-%d %H")
        fecha_fin = datetime.strptime(fecha_hora_fin, "%Y-%m-%d %H")

        diferencia = fecha_fin - fecha_inicio
        horas = diferencia.total_seconds() / 3600

        precio_total = precio_hora * horas

        return {"precio_total": precio_total}

    except Exception as e:
        return {"error": f"Error al registrar la cita: {str(e)}"} # Cambiar 
from fastapi import APIRouter, Request
from sqlalchemy import Table, update
from citas.database import engine, metadata


router = APIRouter()


@router.put("/{id}")
async def actualizar_cita(id: int, request: Request):
    try:
        # Obtener la tabla
        cita = Table("cita", metadata, autoload_with=engine)

        # Recuperar los datos del JSON
        data = await request.json()

        # Remover 'id' si está en los datos (no se debe actualizar)
        data.pop("id", None)

        # Si no hay datos para actualizar, devolver error
        if not data:
            return {"error": "No se enviaron datos para actualizar",
                    "status" : 400}

        # Crear la consulta de actualización con solo los valores presentes
        query = update(cita).where(cita.c.id == id).values(**data)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cita no encontrada",
                    "status" : 404}

        return {"mensaje": "Cita actualizada correctamente",
                "status" : 200}

    except Exception as e:
        return {"error": f"Error al actualizar la cita: {str(e)}",
                "status" : 500}

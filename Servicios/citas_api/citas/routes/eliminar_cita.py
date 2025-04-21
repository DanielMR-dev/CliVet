from fastapi import APIRouter
from sqlalchemy import Table, delete
from citas.database import engine, metadata

router = APIRouter()

@router.delete("/{id}")
async def eliminar_colaborador(id: int):
    try:
        cita = Table("cita", metadata, autoload_with=engine)        

        # Crear la consulta DELETE
        query = delete(cita).where(cita.c.id == id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cita no encontrada",
                    "status" : 404}
        
        return {"mensaje": "cita eliminada correctamente",
                "status" : 200}

    except Exception as e:
        return {"error": f"Error al eliminar la cita: {str(e)}",
                "status" : 500}
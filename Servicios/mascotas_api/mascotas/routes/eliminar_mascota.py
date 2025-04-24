from fastapi import APIRouter
from sqlalchemy import Table, delete
from mascotas.database import engine, metadata

router = APIRouter()

@router.delete("/{id}")
async def eliminar_mascota(id: int):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)        

        query = delete(mascotas).where(mascotas.c.id == id)

        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Mascota no encontrada",
                    "status" : 404}
        
        return {"mensaje": "Mascota eliminada correctamente",
                "status" : 200}

    except Exception as e:
        return {"error": f"Error al eliminar mascota: {str(e)}",
                "status" : 500}
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
            return {"error": "Mascota no encontrada"}
        
        return {"mensaje": "Mascota eliminada correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar mascota: {str(e)}"}
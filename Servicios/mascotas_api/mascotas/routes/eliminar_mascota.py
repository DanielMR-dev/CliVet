from fastapi import APIRouter
from sqlalchemy import Table, delete
from mascotas.database import engine, metadata

router = APIRouter()

@router.delete("/{cliente_id}")
async def eliminar_mascota(cliente_id: int):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)        

        query = delete(mascotas).where(mascotas.c.id == cliente_id)

        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Mascota no encontrada"}
        
        return {"mensaje": "Mascota eliminada correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar mascota: {str(e)}"}
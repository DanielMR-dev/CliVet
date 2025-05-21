from fastapi import APIRouter, Request
from sqlalchemy import Table, update
from mascotas.database import engine, metadata

router = APIRouter()

@router.put("/{id}")
async def modificar_mascota(id: int, request: Request):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)

        data = await request.json()

        query = update(mascotas).where(mascotas.c.id == id).values(**data)

        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Mascota modificada correctamente",
                "status" : 200}

    except Exception as e:
        return {"error": f"Error al modificar la mascota: {str(e)}",
                "status" : 500}
    
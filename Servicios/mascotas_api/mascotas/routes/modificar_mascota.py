from fastapi import APIRouter, Request
from sqlalchemy import Table, update
from mascotas.database import engine, metadata

router = APIRouter()

@router.put("/mascotas/{id}")
async def modificar_mascota(id: int, request: Request):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)

        data = await request.json()

        query = update(
            mascotas
            ).where(
                mascotas.c.id == id
                ).values(
                    id=data.get("id"),
                    nombre=data.get("nombre"),
                    edad=data.get("edad"),
                    id_propietario=data.get("id_propietario"),
                    agresividad=data.get("agresividad"),
                    peso=data.get("peso"),
                    direccion=data.get("direccion"),
                    id_especie=data.get("id_especie")
                    )

        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Mascota modificada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al modificar la mascota: {str(e)}"} # Cambiar 
    
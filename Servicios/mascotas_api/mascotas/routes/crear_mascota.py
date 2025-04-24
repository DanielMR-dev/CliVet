from fastapi import APIRouter, Request
from sqlalchemy import Table, insert
from mascotas.database import engine, metadata

router = APIRouter()

@router.post("/")
async def registrar_mascota(request: Request):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)
        data = await request.json()

        query = insert(mascotas).values(
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

        return {"mensaje": "Mascota registrada correctamente",
                "status" : 200}
    except Exception as e:
        return {"error": f"Error al registrar la mascota: {str(e)}",
                "status" : 500}
from fastapi import APIRouter, Request
from sqlalchemy import Table, insert
from administrador.database import engine, metadata, SessionLocal

router = APIRouter()

medicos = Table("empleados", metadata, autoload_with=engine)

@router.post("/medico")
async def crear_medico(request: Request):
    try:
        data = await request.json()
        query = insert(medicos).values(
            id=data.get("id"),
            nombre_completo=data.get("nombre_completo"),
            clave=data.get("clave").encode(),
            id_rol=data.get("id_rol")
        )
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()
        return {"mensaje": "Médico registrado correctamente",
                "status" : 200}
    except Exception as e:
        return {"error" : f"Error al registrar al médico: {str(e)}",
                "status" : 500}

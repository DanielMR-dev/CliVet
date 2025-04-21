from fastapi import APIRouter, Request
from sqlalchemy import Table, insert, select
from usuarios.database import engine, metadata
from datetime import datetime

router = APIRouter()

@router.post("/registrar")
async def registrar_usuario(request: Request):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)

        data = await request.json()

        query = insert(clientes).values(
            id=data.get("id"),
            nombre_completo=data.get("nombre_completo"),
            fecha_nacimiento=datetime.strptime(data.get("fecha_nacimiento"), "%Y-%m-%d"),
            clave=data.get("clave").encode(),
            email=data.get("email"),
            telefono=data.get("telefono"),
            direccion=data.get("direccion")
        )

        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Cliente registrado correctamente",
                "status" : 200}

    except Exception as e:
        return {"error": f"Error al registrar al cliente: {str(e)}",
                "status" : 500}
    


@router.get("/{cliente_id}")
async def buscar_usuario(cliente_id: int):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)    

        query = select(clientes).where(clientes.c.id == cliente_id)

        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cliente no encontrado",
                    "status" : 400}
        
        rows = result.fetchall()
        return [dict(row._mapping) for row in rows]

    except Exception as e:
        return {"error": f"Error al buscar cliente: {str(e)}",
                "status" : 500}
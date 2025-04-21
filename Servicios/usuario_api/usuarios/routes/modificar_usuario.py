from fastapi import APIRouter, Request
from sqlalchemy import Table, update
from usuarios.database import engine, metadata
from datetime import datetime

router = APIRouter()

@router.put("/{id}")
async def registrar_usuario(id: int, request: Request):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)
        data = await request.json()
        
        campos_actualizar = {}

        for campo, valor in data.items():
            if campo == "clave":
                campos_actualizar["clave"] = valor.encode() 
            elif campo == "fecha_nacimiento":

                campos_actualizar["fecha_nacimiento"] = datetime.strptime(valor, "%Y-%m-%d")
            else:
                campos_actualizar[campo] = valor 

        query = update(clientes).where(clientes.c.id == id).values(**campos_actualizar)

        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Cliente editado correctamente",
                "status": 200}

    except Exception as e:
        return {"error": f"Error al editar al cliente: {str(e)}",
                "status" : 500}

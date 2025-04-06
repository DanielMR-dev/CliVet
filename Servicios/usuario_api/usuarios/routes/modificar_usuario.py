from fastapi import APIRouter, Request
from sqlalchemy import Table, update
from usuarios.database import engine, metadata
from datetime import datetime

router = APIRouter()

@router.put("/modificar/{id}")
async def registrar_usuario(id: int, request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        clientes = Table("cliente", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = update(
            clientes
            ).where(
                clientes.c.id == id
                ).values(
                    id=data.get("id"),
                    nombre_completo=data.get("nombre_completo"),
                    fecha_nacimiento=datetime.strptime(data.get("fecha_nacimiento"), "%d-%m-%Y"),
                    clave=data.get("clave").encode(),
                    email=data.get("email"),
                    telefono=data.get("telefono"),
                    direccion=data.get("direccion")
                    )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Cliente editado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al editar al cliente: {str(e)}"} # Cambiar 
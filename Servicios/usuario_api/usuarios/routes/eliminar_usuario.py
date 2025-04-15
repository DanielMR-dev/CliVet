from fastapi import APIRouter
from sqlalchemy import Table, delete, select
from usuarios.database import engine, metadata

router = APIRouter()

@router.delete("/{id}")
async def eliminar_colaborador(id: int):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)        

        query = delete(clientes).where(clientes.c.id == id)

        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cliente no encontrado"}
        
        return {"mensaje": "Cliente eliminado correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar al cliente: {str(e)}"}
    
    
'''@router.get("/usuarios")
async def get_users():
    usuarios = Table("cliente", metadata, autoload_with=engine)
    query = select(usuarios)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]'''
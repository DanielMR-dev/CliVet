from fastapi import APIRouter, Request, Depends, Query
from sqlalchemy import Table, insert, select, update, delete
from administrador.database import engine, metadata, SessionLocal

router = APIRouter()

colaboradores = Table("colaborador", metadata, autoload_with=engine)

@router.post("/crear_colaborador")
async def crear_colaborador(request: Request):
    try:
        data = await request.json()
        query = insert(colaboradores).values(
            id=data.get("id"),
            nombre_completo=data.get("nombre_completo"),
            id_tipo=data.get("id_tipo"),
            email=data.get("email"),
            telefono=data.get("telefono"),
            direccion=data.get("direccion")
        )
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()
        return {"mensaje": "Colaborador registrado correctamente"}
    except Exception as e:
        return {"error": f"Error al registrar al colaborador: {str(e)}"}



@router.get("/colaboradores")
async def listar_colaboradores():
    query = select(colaboradores)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()
    return [dict(row._mapping) for row in rows]



'''
EJEMPLO DE SOLICITUD:
    http://127.0.0.1:8000/colaboradores/por-id?id_colaborador=2
'''
@router.get("/colaboradores/por-id")
async def get_colaborador_id(id_colaborador: int = Query(...)):
    colaboradores = Table("colaborador", metadata, autoload_with=engine)
    query = select(colaboradores).where(colaboradores.c.id == id_colaborador)
    with engine.connect() as connection:
        result = connection.execute(query)
        rows = result.fetchall()

    return [dict(row._mapping) for row in rows]



@router.put("/colaboradores/{id}")
async def modificar_colaborador(id: int, request: Request):
    try:
        data = await request.json()
        query = update(colaboradores).where(colaboradores.c.id == id).values(
            nombre_completo=data.get("nombre_completo"),
            id_tipo=data.get("id_tipo"),
            email=data.get("email"),
            telefono=data.get("telefono"),
            direccion=data.get("direccion")
        )
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()
        if result.rowcount == 0:
            return {"error": "Colaborador no encontrado"}
        return {"mensaje": "Colaborador actualizado correctamente"}
    except Exception as e:
        return {"error": f"Error al actualizar al colaborador: {str(e)}"}



@router.delete("/colaboradores/{id}")
async def eliminar_colaborador(id: int):
    query = delete(colaboradores).where(colaboradores.c.id == id)
    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()
    if result.rowcount == 0:
        return {"error": "Colaborador no encontrado"}
    return {"mensaje": "Colaborador eliminado correctamente"}
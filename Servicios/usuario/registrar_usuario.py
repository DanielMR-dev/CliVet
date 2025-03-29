from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, insert, select
from datetime import datetime

'''
CODIGO ENFOCADO AL SERVICIO DE CREAR COLABORADORES

FUNCIONALIDADES
    1. Recibir un JSON con la información de un nuevo cliente y añadirlo a base de datos
    2. Recibir un ID de usuario y retornar si este usuario existe o no en base de datos

'''

# Conexión a la base de datos (ajustar URL)
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.post("/registrar_usuario")
async def registrar_usuario(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        clientes = Table("cliente", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(clientes).values(
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

        return {"mensaje": "Cliente registrado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar al cliente: {str(e)}"} # Cambiar 
    


@app.get("/{cliente_id}")
async def buscar_usuario(cliente_id: int):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)    

        # Crear la consulta DELETE
        query = select(clientes).where(clientes.c.id == cliente_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cliente no encontrado"}
        
        rows = result.fetchall()
        return [dict(row._mapping) for row in rows]

    except Exception as e:
        return {"error": f"Error al buscar cliente: {str(e)}"}